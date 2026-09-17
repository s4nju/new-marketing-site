// Versioned worker asset. Bump the filename whenever the renderer changes.
let gl, canvas, program, buffer, vertex, fragment, resolution, time;
let active = false;
let frame = 0;
let elapsed = 0;
let lastTick = 0;
let lastDraw = -1000 / 30;

function compile(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error('Gradient shader compilation failed');
  }
  return shader;
}

function resize(width, height) {
  const scale = Math.min(0.75, Math.sqrt(850000 / (width * height)));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }
}

function draw() {
  gl.uniform2f(resolution, canvas.width, canvas.height);
  gl.uniform1f(time, elapsed);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function render(now) {
  frame = 0;
  if (!active) return;
  if (lastTick) elapsed += Math.min((now - lastTick) / 1000, 0.05);
  lastTick = now;
  if (now - lastDraw >= 1000 / 30) {
    draw();
    lastDraw = now;
  }
  frame = requestAnimationFrame(render);
}

self.onmessage = ({ data }) => {
  try {
    if (data.type === 'init') {
      canvas = data.canvas;
      gl = canvas.getContext('webgl', {
        alpha: false, antialias: false, depth: false, stencil: false,
        desynchronized: true, powerPreference: 'low-power',
      });
      if (!gl) throw new Error('WebGL unavailable');
      vertex = compile(gl.VERTEX_SHADER, data.vertexSource);
      fragment = compile(gl.FRAGMENT_SHADER, data.fragmentSource);
      program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Gradient link failed');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      resolution = gl.getUniformLocation(program, 'u_res');
      time = gl.getUniformLocation(program, 'u_time');
      resize(data.width, data.height);
      draw();
      canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        active = false;
        if (frame) cancelAnimationFrame(frame);
        self.postMessage({ type: 'error' });
      });
      self.postMessage({ type: 'ready' });
    } else if (data.type === 'resize' && gl) {
      resize(data.width, data.height);
      if (active) draw();
    } else if (data.type === 'active' && gl) {
      active = data.value;
      if (active && !frame) frame = requestAnimationFrame(render);
      if (!active) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        lastTick = 0;
      }
    }
  } catch {
    active = false;
    if (frame) cancelAnimationFrame(frame);
    self.postMessage({ type: 'error' });
  }
};
