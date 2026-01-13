import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "@/lib/scroll";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      return;
    }

    const duration = 550;
    smoothScrollTo(0, { duration, easing: "easeInOutCubic" });

    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, duration + 50);

    return () => window.clearTimeout(timeoutId);
  }, [location.key]);

  return null;
};

export default ScrollToTop;
