import { useEffect, useRef } from "react";

type Coin = { x: number; y: number; r: number; speed: number; sway: number; phase: number; alpha: number; glyph: string };

const GLYPHS = ["E£", "%", "+", "E£", "↗"];

/**
 * Finance-themed backdrop: flowing market lines with soft areas, plus coins that drift upward.
 * Cheap on purpose (a few hundred points a frame), paused when hidden, and still under reduced motion.
 */
export default function FlousyBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let dark = root.classList.contains("dark");
    const observer = new MutationObserver(() => { dark = root.classList.contains("dark"); });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    const lines = [
      { base: 0.72, amp: 0.07, f1: 0.0042, f2: 0.011, speed: 0.00022, alpha: 0.5, trend: -0.1 },
      { base: 0.58, amp: 0.09, f1: 0.0031, f2: 0.0087, speed: -0.00017, alpha: 0.32, trend: -0.14 },
      { base: 0.84, amp: 0.05, f1: 0.0058, f2: 0.0135, speed: 0.0003, alpha: 0.22, trend: -0.06 }
    ];
    let coins: Coin[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 700 ? 6 : 11;
      coins = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width, y: Math.random() * height, r: 12 + Math.random() * 14, speed: 0.12 + Math.random() * 0.22,
        sway: 10 + Math.random() * 22, phase: Math.random() * Math.PI * 2, alpha: 0.1 + Math.random() * 0.16, glyph: GLYPHS[i % GLYPHS.length]
      }));
    };

    const draw = (time: number) => {
      const rgb = dark ? "120, 154, 255" : "36, 87, 232";
      ctx.clearRect(0, 0, width, height);
      const step = 14;
      for (const line of lines) {
        const phase = time * line.speed;
        ctx.beginPath();
        for (let x = -step; x <= width + step; x += step) {
          const t = x / width;
          const y = (line.base + line.trend * t + Math.sin(x * line.f1 + phase * 6) * line.amp + Math.sin(x * line.f2 - phase * 9) * line.amp * 0.45) * height;
          if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${rgb}, ${line.alpha * 0.55})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineTo(width + step, height); ctx.lineTo(-step, height); ctx.closePath();
        const fill = ctx.createLinearGradient(0, height * 0.4, 0, height);
        fill.addColorStop(0, `rgba(${rgb}, ${line.alpha * 0.16})`);
        fill.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = fill;
        ctx.fill();
      }
      ctx.font = "600 12px Poppins, Cairo, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const coin of coins) {
        coin.y -= coin.speed;
        if (coin.y < -coin.r * 2) { coin.y = height + coin.r * 2; coin.x = Math.random() * width; }
        const x = coin.x + Math.sin(time * 0.0006 + coin.phase) * coin.sway;
        ctx.beginPath();
        ctx.arc(x, coin.y, coin.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${coin.alpha * 0.35})`;
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(${rgb}, ${coin.alpha + 0.12})`;
        ctx.stroke();
        ctx.fillStyle = `rgba(${rgb}, ${coin.alpha + 0.25})`;
        ctx.fillText(coin.glyph, x, coin.y + 0.5);
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const onVisibility = () => { if (!document.hidden && !reduced.matches) { cancelAnimationFrame(frame); frame = requestAnimationFrame(loop); } };

    resize();
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <canvas ref={ref} className="fl-bg" aria-hidden />;
}
