'use client';

import { useEffect, useRef } from 'react';

/**
 * DesktopBackground
 *
 * CSS-only atmospheric desktop background for sm: and up breakpoints.
 * Mobile is completely unaffected - this component never renders on mobile.
 *
 * Features:
 * - Base: #0a0a0a
 * - Violet radial glow (#6D28D9 at 32% opacity) at 50% 25% (70% viewport width)
 * - Indigo radial glow (#4338CA at 24% opacity) at 85% 75% (smaller)
 * - Computational grid: thin lines (1px), 14% opacity (violet-tinted), 64px spacing
 * - Radial mask to fade grid toward edges
 * - Slow drift animation (30s duration) - transform and opacity only
 * - Respects prefers-reduced-motion (no animation)
 * - Continuous behind all sections (fixed positioning at z-0)
 * - No scroll or layout impact (pointer-events-none, fixed inset-0)
 */
export function DesktopBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // IntersectionObserver to pause animations when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (containerRef.current) {
            if (entry.isIntersecting) {
              containerRef.current.style.animationPlayState = 'running';
            } else {
              containerRef.current.style.animationPlayState = 'paused';
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (reducedMotion.current) {
    return (
      <div
        ref={containerRef}
        className="hidden sm:block fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: `
            radial-gradient(ellipse 70% 70% at 50% 25%, rgba(109, 40, 217, 0.32) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 85% 75%, rgba(67, 56, 202, 0.24) 0%, transparent 60%),
            linear-gradient(rgba(109, 40, 217, 0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(109, 40, 217, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 64px 64px, 64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="hidden sm:block fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          radial-gradient(ellipse 70% 70% at 50% 25%, rgba(109, 40, 217, 0.32) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 85% 75%, rgba(67, 56, 202, 0.24) 0%, transparent 60%),
          linear-gradient(rgba(109, 40, 217, 0.14) 1px, transparent 1px),
          linear-gradient(90deg, rgba(109, 40, 217, 0.14) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 64px 64px, 64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        animation: 'driftLighting 30s ease-in-out infinite',
        animationPlayState: 'paused',
      }}
    >
      <style jsx global>{`
        @keyframes driftLighting {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
