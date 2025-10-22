import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Ensure the canvas visually fills the viewport
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Backing store size for crisp rendering on zoom/high-DPI
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);

      // Use CSS pixel coordinates for drawing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // Initialize size before creating particles
    setCanvasSize();
    let prevDisplayWidth = canvas.clientWidth;
    let prevDisplayHeight = canvas.clientHeight;

    // Observers and listeners for robust zoom/resize handling
    let ro: ResizeObserver | null = null;
    const vv = (window as any).visualViewport as VisualViewport | undefined;
    let dprInterval: number | null = null;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1,
      });
    }

    let rafId = 0;

    const animate = () => {
      const widthCss = canvas.clientWidth;
      const heightCss = canvas.clientHeight;
      ctx.clearRect(0, 0, widthCss, heightCss);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges in CSS pixel space
        if (particle.x < 0) particle.x = widthCss;
        if (particle.x > widthCss) particle.x = 0;
        if (particle.y < 0) particle.y = heightCss;
        if (particle.y > heightCss) particle.y = 0;

        // Draw particle
        const isDark = document.documentElement.classList.contains("dark");
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(59, 130, 246, ${0.5 + Math.random() * 0.4})`
          : `rgba(37, 99, 235, ${0.4 + Math.random() * 0.3})`;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = isDark ? 'rgba(59, 130, 246, 0.6)' : 'rgba(37, 99, 235, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 150) * 0.35;
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${opacity})`
              : `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        const oldW = prevDisplayWidth;
        const oldH = prevDisplayHeight;

        setCanvasSize();
        prevDisplayWidth = canvas.clientWidth;
        prevDisplayHeight = canvas.clientHeight;

        const scaleX = oldW ? prevDisplayWidth / oldW : 1;
        const scaleY = oldH ? prevDisplayHeight / oldH : 1;
        // Keep particle distribution proportional to new size
        particles.forEach((p) => {
          p.x *= scaleX;
          p.y *= scaleY;
        });
      }, 100);
    };

    // Window resize and orientation
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // VisualViewport resize/zoom events
    if (vv) {
      vv.addEventListener("resize", handleResize);
      vv.addEventListener("scroll", handleResize);
    }

    // ResizeObserver on canvas size
    ro = new ResizeObserver(() => handleResize());
    ro.observe(canvas);

    // Watch devicePixelRatio changes
    let lastDPR = window.devicePixelRatio;
    dprInterval = window.setInterval(() => {
      if (window.devicePixelRatio !== lastDPR) {
        lastDPR = window.devicePixelRatio;
        handleResize();
      }
    }, 200);


    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (vv) {
        vv.removeEventListener("resize", handleResize);
        vv.removeEventListener("scroll", handleResize);
      }
      if (ro) ro.disconnect();
      if (dprInterval) clearInterval(dprInterval);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;
