"use client";

import { useEffect, useRef } from "react";

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const RENDER_SCALE = 0.75;
const MAX_RENDER_PIXELS = 850_000;
const INPUT_IDLE_DELAY = 160;

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

const vec3 C0 = vec3(0.235, 0.145, 0.164);
const vec3 C1 = vec3(0.596, 0.380, 0.396);
const vec3 C2 = vec3(0.816, 0.576, 0.447);
const vec3 C3 = vec3(0.937, 0.792, 0.616);
const vec3 C4 = vec3(0.980, 0.949, 0.874);

vec3 palette(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.25) return mix(C0, C1, smoothstep(0.0, 0.25, t));
  if (t < 0.50) return mix(C1, C2, smoothstep(0.25, 0.50, t));
  if (t < 0.75) return mix(C2, C3, smoothstep(0.50, 0.75, t));
  return mix(C3, C4, smoothstep(0.75, 1.0, t));
}

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
  // Four octaves preserve the soft liquid shapes while cutting a third of
  // the most expensive fragment-shader work from the original six passes.
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 1.9;
    amp *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.09;

  vec2 q = vec2(
    fbm(p * 1.3 + vec2(0.0, t)),
    fbm(p * 1.3 + vec2(5.2, -t * 0.9))
  );
  vec2 r = vec2(
    fbm(p * 1.3 + q * 1.4 + vec2(1.7, 9.2) + t * 0.7),
    fbm(p * 1.3 + q * 1.4 + vec2(8.3, 2.8) - t * 0.6)
  );
  float f = fbm(p * 1.1 + r * 1.6);

  float rise = smoothstep(0.0, 1.0, uv.y);
  float base = mix(0.24, 0.95, rise);
  float d = distance(vec2(uv.x * aspect, uv.y), vec2(0.5 * aspect, 0.0));
  float dn = clamp(d / 0.8, 0.0, 1.0);
  base = mix(base * 0.7, base, smoothstep(0.0, 1.0, dn));

  vec3 col = palette(base + (f - 0.5) * 0.45);
  float grain = hash(gl_FragCoord.xy) - 0.5;
  gl_FragColor = vec4(col + grain * 0.025, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "LiquidGradient shader compile failed:",
      gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function LiquidGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      desynchronized: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const vertexShader = compile(gl, gl.VERTEX_SHADER, VERT);
    const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        "LiquidGradient program link failed:",
        gl.getProgramInfoLog(program),
      );
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_res");
    const time = gl.getUniformLocation(program, "u_time");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let isVisible = false;
    let isPageVisible = !document.hidden;
    let isInteracting = false;
    let contextLost = false;
    let elapsed = 0;
    let lastTick = 0;
    let lastDraw = -FRAME_INTERVAL;

    const resize = () => {
      const cssWidth = Math.max(1, canvas.clientWidth);
      const cssHeight = Math.max(1, canvas.clientHeight);
      const pixelBudgetScale = Math.sqrt(
        MAX_RENDER_PIXELS / (cssWidth * cssHeight),
      );
      // This is a soft, intentionally blurred surface, so rendering below CSS
      // resolution is visually lossless while dramatically reducing fill rate.
      const scale = Math.min(RENDER_SCALE, pixelBudgetScale);
      const width = Math.max(1, Math.round(cssWidth * scale));
      const height = Math.max(1, Math.round(cssHeight * scale));

      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const draw = () => {
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const canAnimate = () =>
      !reduceMotion &&
      isVisible &&
      isPageVisible &&
      !isInteracting &&
      !contextLost;

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastTick = 0;
    };

    const render = (now: number) => {
      animationFrame = 0;
      if (!canAnimate()) return;

      if (!lastTick) lastTick = now;
      elapsed += Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;

      if (now - lastDraw >= FRAME_INTERVAL) {
        draw();
        lastDraw = now;
      }
      animationFrame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!animationFrame && canAnimate()) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const pauseForInput = () => {
      if (!isVisible || reduceMotion) return;
      isInteracting = true;
      stop();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        isInteracting = false;
        start();
      }, INPUT_IDLE_DELAY);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        resize();
        start();
      } else {
        stop();
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (isVisible || reduceMotion) draw();
    });

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else stop();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stop();
    };

    resize();
    draw();
    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("wheel", pauseForInput, { passive: true });
    window.addEventListener("touchmove", pauseForInput, { passive: true });
    window.addEventListener("scroll", pauseForInput, { passive: true });
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      stop();
      if (resumeTimer) clearTimeout(resumeTimer);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("wheel", pauseForInput);
      window.removeEventListener("touchmove", pauseForInput);
      window.removeEventListener("scroll", pauseForInput);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
