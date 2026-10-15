import { useEffect, useRef } from "react";
import { usePerformance } from "../../context/PerformanceContext";

// Decorative node graph behind the hero: a few dozen drifting points, joined when close.
// Plain canvas, no library. Lite mode (toggle or prefers-reduced-motion) draws one still
// frame; otherwise it animates only while it is on screen and the tab is visible.
const COUNT = 60;
const LINK = 120;

export default function HeroVisual() {
  const canvasRef = useRef(null);
  const { isLiteMode } = usePerformance();

  useEffect(() => {
    let cleanup = () => {};
    // Set up once the page is idle so the graph never competes with first paint and input.
    const schedule = window.requestIdleCallback
      ? (fn) => {
          const id = window.requestIdleCallback(fn, { timeout: 2000 });
          return () => window.cancelIdleCallback(id);
        }
      : (fn) => {
          const id = setTimeout(fn, 300);
          return () => clearTimeout(id);
        };
    const cancel = schedule(() => {
      cleanup = init();
    });
    return () => {
      cancel();
      cleanup();
    };

    function init() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rgb = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim()
        .split(" ")
        .join(",");

      // Fixed seed so the layout is the same on every load.
      let seed = 11;
      const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const pts = Array.from({ length: COUNT }, () => ({
        x: 0.48 + rand() * 0.52,
        y: rand(),
        vx: (rand() - 0.5) * 0.00007,
        vy: (rand() - 0.5) * 0.00007,
        r: rand() > 0.82 ? 3 : 1.6,
      }));

      let w = 0;
      let h = 0;
      let raf = 0;
      let onScreen = true;

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < COUNT; i++) {
          const a = pts[i];
          for (let j = i + 1; j < COUNT; j++) {
            const b = pts[j];
            const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
            if (d < LINK) {
              ctx.strokeStyle = `rgba(${rgb},${(1 - d / LINK) * 0.45})`;
              ctx.beginPath();
              ctx.moveTo(a.x * w, a.y * h);
              ctx.lineTo(b.x * w, b.y * h);
              ctx.stroke();
            }
          }
        }
        for (const p of pts) {
          ctx.fillStyle = `rgba(${rgb},${p.r > 2 ? 0.95 : 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, p.r, 0, 6.2832);
          ctx.fill();
        }
      };

      let last = 0;
      const tick = (t) => {
        const dt = Math.min(t - last, 50);
        last = t;
        for (const p of pts) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < 0.48 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
        }
        draw();
        raf = onScreen && !document.hidden ? requestAnimationFrame(tick) : 0;
      };
      const start = () => {
        if (!raf && !isLiteMode && onScreen && !document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineWidth = 1;
        draw();
      };

      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      const visibility = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        start();
      });
      visibility.observe(canvas);
      document.addEventListener("visibilitychange", start);
      start();

      return () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        visibility.disconnect();
        document.removeEventListener("visibilitychange", start);
      };
    }
  }, [isLiteMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(to_right,transparent_30%,#000_65%)] md:opacity-100"
    />
  );
}
