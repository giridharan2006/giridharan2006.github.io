import { useEffect, useRef } from 'react';

/*
 * The deck's signature background: a field of short dashes that curl into
 * concentric vortices. Rendered on a canvas, it drifts very slowly and
 * stops when it is off-screen or when the visitor prefers reduced motion.
 */
export default function DashField({ vortices = [{ x: 0.74, y: 0.42 }], spacing = 26, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, visible = true, t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (now) => {
      const t = reduce ? 0 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const sp = w < 640 ? spacing * 0.85 : spacing;
      const len = sp * 0.36;
      const reach = Math.max(w, h) * 0.55;
      for (let y = sp / 2; y < h; y += sp) {
        for (let x = sp / 2; x < w; x += sp) {
          let ang = 0, wsum = 0, near = 0;
          vortices.forEach((v, i) => {
            const vx = v.x * w, vy = v.y * h;
            const dx = x - vx, dy = y - vy;
            const d = Math.hypot(dx, dy) + 1;
            const wt = 1 / (d * d);
            // tangent to the circle around the vortex, with a slow swirl
            const a = Math.atan2(dy, dx) + Math.PI / 2 + Math.sin(d / 46 - t * 0.35 + i) * 0.35;
            ang += a * wt; wsum += wt;
            near = Math.max(near, 1 - Math.min(d / reach, 1));
          });
          ang /= wsum;
          const alpha = 0.05 + near * near * 0.32;
          ctx.strokeStyle = `rgba(150, 156, 190, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.1;
          const cx = Math.cos(ang) * len / 2, cy = Math.sin(ang) * len / 2;
          ctx.beginPath(); ctx.moveTo(x - cx, y - cy); ctx.lineTo(x + cx, y + cy); ctx.stroke();
        }
      }
    };

    const loop = (now) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    resize();
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [vortices, spacing]);

  return <canvas ref={ref} className={`dash-field ${className}`} aria-hidden="true" />;
}
