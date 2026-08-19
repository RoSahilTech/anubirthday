import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const StageContainer = ({ children, className = '' }) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create background stars
    const starCount = Math.floor((width * height) / 8000);
    const stars = Array.from({ length: Math.min(150, starCount) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      color: Math.random() > 0.3 ? '#F472B6' : Math.random() > 0.5 ? '#C084FC' : '#FBBF24',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.alpha += star.speed;
          if (star.alpha > 1 || star.alpha < 0) {
            star.speed = -star.speed;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-midnight-900 via-midnight-800 to-midnight-900 text-slate-100">
      {/* Background canvas for starry particles */}
      <canvas ref={canvasRef} id="star-canvas" className="pointer-events-none" />

      {/* Decorative ambient glowing radial circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-lavender-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <main className={`relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-12 ${className}`}>
        {children}
      </main>
    </div>
  );
};
