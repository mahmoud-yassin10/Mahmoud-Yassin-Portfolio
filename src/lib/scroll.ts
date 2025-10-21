// Smooth scroll utilities with easing and offset
export type Easing = "linear" | "easeInOutCubic";

export interface SmoothScrollOptions {
  duration?: number; // ms
  offset?: number; // px
  easing?: Easing;
}

const easings: Record<Easing, (t: number) => number> = {
  linear: (t: number) => t,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

export function smoothScrollTo(targetY: number, opts: SmoothScrollOptions = {}) {
  const { duration = 700, easing = "easeInOutCubic" } = opts;
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const ease = easings[easing];

  let startTime: number | null = null;

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(1, elapsed / duration);
    const eased = ease(t);

    window.scrollTo({ top: startY + distance * eased, behavior: "auto" });

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function smoothScrollToId(id: string, opts: SmoothScrollOptions = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = opts.offset ?? 80; // account for fixed navbar
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + (window.scrollY || window.pageYOffset) - offset;
  smoothScrollTo(targetY, opts);
}
