'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Navigation } from './navigation';
import { Footer } from './footer';

interface PageWrapperProps {
  children: ReactNode;
  mobileBackground?: string;
}

export function PageWrapper({ children, mobileBackground }: PageWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pause animations when tab is hidden
    const handleVisibilityChange = () => {
      if (containerRef.current) {
        if (document.hidden) {
          containerRef.current.style.animationPlayState = 'paused';
        } else {
          containerRef.current.style.animationPlayState = 'running';
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative isolate overflow-x-clip">
      {mobileBackground && (
        <>
          {/* Solid dark fallback */}
          <div className="fixed inset-0 z-0 bg-neutral-950" />
          {/* Fixed full-screen wallpaper with dark tint and living effects - only for inner pages */}
          <div
            ref={containerRef}
            className="fixed inset-0 sm:hidden z-0 overflow-hidden"
            style={{ animationPlayState: 'paused' }}
          >
            <Image
              src={mobileBackground}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover object-center pointer-events-none"
              style={{ animation: 'breathe 28s ease-in-out infinite' }}
            />
            {/* Light dark tint */}
            <div className="absolute inset-0 bg-neutral-950/25" aria-hidden="true" />
            {/* Drifting light dots */}
            {!reducedMotion.current && Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full blur-sm"
                style={{
                  width: `${2 + Math.random() * 2}px`,
                  height: `${2 + Math.random() * 2}px`,
                  background: i % 3 === 0 ? 'rgba(191,90,242,0.6)' : i % 3 === 1 ? 'rgba(10,132,255,0.6)' : 'rgba(251,191,36,0.6)',
                  bottom: `${10 + Math.random() * 40}%`,
                  left: `${5 + Math.random() * 25}%`,
                  animation: `drift ${12 + Math.random() * 8}s ease-out infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
                aria-hidden="true"
              />
            ))}
            {/* Light sweep */}
            {!reducedMotion.current && (
              <div
                className="absolute inset-0 mix-blend-screen"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(191,90,242,0.12) 50%, transparent 100%)',
                  animation: 'sweep 18s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
            )}
            <style jsx global>{`
              @keyframes breathe {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }
              @keyframes drift {
                0% {
                  transform: translateY(0) scale(1);
                  opacity: 0.6;
                }
                100% {
                  transform: translateY(-150px) scale(0.5);
                  opacity: 0;
                }
              }
              @keyframes sweep {
                0% {
                  transform: translateX(-100%) translateY(-100%);
                }
                100% {
                  transform: translateX(100%) translateY(100%);
                }
              }
            `}</style>
          </div>
        </>
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-neutral-100 focus:text-neutral-950 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" role="main" className="flex-1 pt-16 overflow-x-clip relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
