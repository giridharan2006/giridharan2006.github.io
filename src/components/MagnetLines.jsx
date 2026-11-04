import { useEffect, useRef } from 'react';

/**
 * Full-page "magnet lines" background, adapted from the MagnetLines component of the
 * Mini Compiler web UI (itself after React Bits' MagnetLines).
 *
 * A grid of short lines, each turned to lie tangent to the pointer so the field swirls
 * around it. Angles ease toward their targets (shortest way round), lines near the
 * pointer brighten toward the accent colour, and after 4 s without pointer movement the
 * focus point drifts on its own. One canvas, fixed behind the whole site, with
 * pointer-events disabled so it never blocks scrolling, clicks, hovering or selection.
 *
 * Kept from the original: canvas rendering, DPR handling, responsive resize, pointer
 * tracking, smooth interpolation, idle drift, pausing in hidden tabs, reduced motion,
 * requestAnimationFrame only while something is actually changing.
 * Adapted: portfolio colour tokens (--ml-*), a slightly finer grid on small screens, a
 * cheaper resize path for mobile URL-bar height changes, and touch devices start in the
 * idle drift so the field moves without a mouse.
 */
export default function MagnetLines({ spacing = 48, length = 20, width = 1.4, radius = 240 }) {
  const canvas = useRef(null);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, cols = 0, rows = 0, gap = spacing, len = length;
    let angles = new Float32Array(0), targets = new Float32Array(0);
    let px = innerWidth * 0.62, py = innerHeight * 0.32, lastMove = -1e9, raf = 0, colors;

    const hex = (h) => { const n = parseInt(h.trim().replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        line: hex(cs.getPropertyValue('--ml-line') || '#ffffff'),
        glow: hex(cs.getPropertyValue('--ml-glow') || '#8ea2e6'),
        alpha: parseFloat(cs.getPropertyValue('--ml-alpha')) || 0.07,
        peak: parseFloat(cs.getPropertyValue('--ml-peak')) || 0.3,
      };
    };

    // each line is perpendicular to the direction from its centre to the pointer
    const aim = () => {
      const ox = (W - (cols - 1) * gap) / 2, oy = (H - (rows - 1) * gap) / 2;
      for (let r = 0, i = 0; r < rows; r++) for (let c = 0; c < cols; c++, i++) {
        targets[i] = Math.atan2(py - (oy + r * gap), px - (ox + c * gap)) + Math.PI / 2;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = width; ctx.lineCap = 'round';
      const ox = (W - (cols - 1) * gap) / 2, oy = (H - (rows - 1) * gap) / 2, half = len / 2;
      const { line, glow, alpha, peak } = colors;
      for (let r = 0, i = 0; r < rows; r++) for (let c = 0; c < cols; c++, i++) {
        const x = ox + c * gap, y = oy + r * gap;
        const d = Math.hypot(px - x, py - y), k = Math.max(0, 1 - d / radius) ** 2;
        const cr = line[0] + (glow[0] - line[0]) * k, cg = line[1] + (glow[1] - line[1]) * k, cb = line[2] + (glow[2] - line[2]) * k;
        ctx.strokeStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha + (peak - alpha) * k})`;
        const h = half * (1 + 0.12 * k), dx = Math.cos(angles[i]) * h, dy = Math.sin(angles[i]) * h;
        ctx.beginPath(); ctx.moveTo(x - dx, y - dy); ctx.lineTo(x + dx, y + dy); ctx.stroke();
      }
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const nW = innerWidth, nH = innerHeight;
      gap = nW < 640 ? Math.round(spacing * 0.8) : spacing;
      len = nW < 640 ? Math.round(length * 0.85) : length;
      const nCols = Math.ceil(nW / gap) + 1, nRows = Math.ceil(nH / gap) + 1;
      W = nW; H = nH;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // only rebuild the grid when its shape changes (mobile URL bars resize height constantly)
      if (nCols !== cols || nRows !== rows) {
        cols = nCols; rows = nRows;
        angles = new Float32Array(cols * rows); targets = new Float32Array(cols * rows);
        aim(); angles.set(targets);
      } else aim();
      draw();
    };

    // ease every line toward its target angle; when the pointer is idle, let it drift slowly
    const tick = (t) => {
      raf = 0;
      const idle = t - lastMove > 4000;
      if (idle) {
        px = W * (0.5 + 0.3 * Math.cos(t / 5200)); py = H * (0.42 + 0.22 * Math.sin(t / 3700));
        aim();
      }
      let moving = false;
      for (let i = 0; i < angles.length; i++) {
        let diff = targets[i] - angles[i];
        diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // shortest way round
        if (Math.abs(diff) > 0.002) { angles[i] += diff * 0.16; moving = true; } else angles[i] = targets[i];
      }
      draw();
      if ((moving || idle) && !document.hidden) raf = requestAnimationFrame(tick);
      // Lines have settled around a still pointer: the loop stops here (nothing to draw), so
      // wake it up again once the pointer has been idle for 4 s and the drift should begin.
      // (In the original the drift only ran until the first pointer move.)
      else if (!idle && !document.hidden) {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(kick, Math.max(0, 4000 - (performance.now() - lastMove)) + 30);
      }
    };
    let idleTimer = 0;
    const kick = () => { if (!raf && !reduce && !document.hidden) raf = requestAnimationFrame(tick); };

    const onMove = (e) => {
      // touch: follow the finger while it moves, then fall back to the drift
      px = e.clientX; py = e.clientY; lastMove = performance.now(); aim(); kick();
    };
    let rz = 0;
    const onResize = () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { resize(); kick(); }); };

    readColors(); resize(); kick();
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', kick);
    if (!reduce) addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf); cancelAnimationFrame(rz); clearTimeout(idleTimer);
      removeEventListener('resize', onResize); removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', kick);
    };
  }, [spacing, length, width, radius]);

  return (
    <div className="bg-field" aria-hidden="true">
      <canvas ref={canvas} />
      <div className="bg-vignette" />
    </div>
  );
}
