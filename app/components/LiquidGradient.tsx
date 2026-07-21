"use client";

import { useEffect, useRef } from "react";

/**
 * Animated liquid gradient, a port of the look of Framer's "Liquid Gradient"
 * shader tuned to biu's warm palette. Domain-warped fbm noise blends the
 * colour stops; the warp field translates in time so the colour bands visibly
 * drift across the surface (liquid flow), with a light grain dither.
 */

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

// warm palette sampled from the biu hero
const vec3 C0 = vec3(0.235, 0.145, 0.164); // #3c2529 deep maroon
const vec3 C1 = vec3(0.596, 0.380, 0.396); // #986165 dusty mauve
const vec3 C2 = vec3(0.816, 0.576, 0.447); // #d09372 clay/terracotta
const vec3 C3 = vec3(0.937, 0.792, 0.616); // #efca9d apricot
const vec3 C4 = vec3(0.980, 0.949, 0.874); // #faf2df cream

vec3 palette(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.25) return mix(C0, C1, smoothstep(0.0, 0.25, t));
  if (t < 0.50) return mix(C1, C2, smoothstep(0.25, 0.50, t));
  if (t < 0.75) return mix(C2, C3, smoothstep(0.50, 0.75, t));
  return mix(C3, C4, smoothstep(0.75, 1.0, t));
}

// value noise
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.6;
  for (int i = 0; i < 6; i++) {
    v += amp * noise(p);
    p *= 1.9;
    amp *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * 0.18;

  // domain warp for the liquid feel - the warp field translates in time so
  // the colour bands visibly drift instead of morphing in place
  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)),
                fbm(p * 1.3 + vec2(5.2, -t * 0.9)));
  vec2 r = vec2(fbm(p * 1.3 + q * 1.4 + vec2(1.7, 9.2) + t * 0.7),
                fbm(p * 1.3 + q * 1.4 + vec2(8.3, 2.8) - t * 0.6));
  float f = fbm(p * 1.1 + r * 1.6);

  // mauve pools in the top-left corner; the rest stays warm peach -> cream
  float d = distance(vec2(uv.x * aspect, uv.y), vec2(0.0, 1.0));
  float dn = clamp(d / 0.7, 0.0, 1.0);
  float warm = clamp(uv.x * 0.45 + (1.0 - uv.y) * 0.28 + 0.5, 0.0, 1.0);
  float base = mix(0.22, warm, smoothstep(0.0, 1.0, dn));
  float mixv = base + (f - 0.5) * 0.45;

  vec3 col = palette(mixv);

  // grain
  float g = hash(gl_FragCoord.xy + u_time) - 0.5;
  col += g * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("LiquidGradient shader compile failed:", gl.getShaderInfoLog(sh));
  }
  return sh;
}

export default function LiquidGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("LiquidGradient program link failed:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // honour users who prefer less motion: draw a single static frame
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const draw = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const render = () => {
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      draw(0);
    } else {
      render();
    }

    // keep animating after a GPU context loss/restore (e.g. tab backgrounded)
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onLost);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
