import { useEffect, useMemo, useRef, useState } from "react";

const NUMBER = /(\d[\d,]*(?:\.\d+)?)/g;

type Token = { text: string; value?: number; decimals: number; grouped: boolean };

function tokenize(value: string): Token[] {
  return value.split(NUMBER).filter((part) => part !== "").map((part) => {
    if (!/^\d/.test(part)) return { text: part, decimals: 0, grouped: false };
    const decimals = part.split(".")[1]?.length ?? 0;
    return { text: part, value: parseFloat(part.replace(/,/g, "")), decimals, grouped: part.includes(",") };
  });
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const render = (tokens: Token[], progress: number) =>
  tokens
    .map((token) =>
      token.value === undefined
        ? token.text
        : (token.value * progress).toLocaleString("en-US", {
            minimumFractionDigits: token.decimals,
            maximumFractionDigits: token.decimals,
            useGrouping: token.grouped
          })
    )
    .join("");

/** Counts every number in `value` up from zero the first time it scrolls into view. */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const tokens = useMemo(() => tokenize(value), [value]);
  const animatable = tokens.some((token) => token.value !== undefined);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!animatable) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setProgress(ease(t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [animatable, duration, value]);

  if (!animatable) return <bdi>{value}</bdi>;
  return <span ref={ref} aria-label={value}><bdi aria-hidden>{render(tokens, progress)}</bdi></span>;
}
