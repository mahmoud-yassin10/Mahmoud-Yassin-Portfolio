import { useEffect } from "react";

// Lightweight analytics loader (Plausible). Set VITE_PLAUSIBLE_DOMAIN to enable.
const Analytics = () => {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  const enabled = Boolean(domain);

  useEffect(() => {
    if (!enabled) return;
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", domain!);
    script.src = "https://plausible.io/js/script.js";
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [enabled, domain]);

  return null;
};

export default Analytics;
