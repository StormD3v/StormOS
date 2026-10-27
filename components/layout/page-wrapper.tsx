'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { DesktopBackground } from '@/components/ui/desktop-background';

interface PageWrapperProps {
  children: ReactNode;
  mobileBackgrounds?: string[];
  enableDesktopBackground?: boolean;
}

export function PageWrapper({ children, mobileBackgrounds, enableDesktopBackground }: PageWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);
  const [tileCount, setTileCount] = useState(2);

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

  // Calculate tile count based on page height
  useEffect(() => {
    if (!mobileBackgrounds || mobileBackgrounds.length === 0) return;

    const updateTileCount = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const tileHeight = vh;
      const tilesNeeded = Math.ceil(pageHeight / tileHeight);
      setTileCount(Math.max(tilesNeeded, 1));
    };

    const resizeObserver = new ResizeObserver(() => {
      updateTileCount();
    });

    resizeObserver.observe(document.body);
    updateTileCount();

    return () => resizeObserver.disconnect();
  }, [mobileBackgrounds]);

  // Parallax effect removed to prevent extending scroll height beyond footer

  return (
    <div className="min-h-screen flex flex-col relative isolate overflow-x-clip">
      {mobileBackgrounds && mobileBackgrounds.length > 0 && (
        <>
          {/* Solid dark fallback */}
          <div className="fixed inset-0 z-0 bg-neutral-950 sm:hidden" />
          {/* Tiled wallpaper stack container - positioned absolutely to not affect document height */}
          <div className="absolute top-0 left-0 right-0 bottom-0 sm:hidden z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0">
              {Array.from({ length: tileCount }).map((_, i) => {
                const imageIndex = i % mobileBackgrounds.length;
                const imageSrc = mobileBackgrounds[imageIndex];
                return (
                  <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${i * 100}svh`,
                      height: '100svh',
                    }}
                  >
                    <Image
                      src={imageSrc}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="100vw"
                      className="object-cover object-center pointer-events-none"
                      style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        animation: reducedMotion.current ? 'none' : `breathe 20s ease-in-out infinite`,
                        animationDelay: `${i * 2}s`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {/* Light dark tint */}
            <div className="absolute inset-0 bg-neutral-950/25" aria-hidden="true" />
            {/* Drifting light dots - reduced to 6 and dimmer */}
            {!reducedMotion.current && Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full blur-sm"
                style={{
                  width: `${2 + Math.random() * 2}px`,
                  height: `${2 + Math.random() * 2}px`,
                  background: i % 3 === 0 ? 'rgba(191,90,242,0.3)' : i % 3 === 1 ? 'rgba(10,132,255,0.3)' : 'rgba(251,191,36,0.3)',
                  bottom: `${10 + Math.random() * 40}%`,
                  left: `${5 + Math.random() * 25}%`,
                  animation: `drift ${12 + Math.random() * 8}s ease-out infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
                aria-hidden="true"
              />
            ))}
            <style jsx global>{`
              @keyframes breathe {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.06);
                }
              }
              @keyframes drift {
                0% {
                  transform: translateY(0) scale(1);
                  opacity: 0.3;
                }
                100% {
                  transform: translateY(-150px) scale(0.5);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        </>
      )}
      {enableDesktopBackground && <DesktopBackground />}
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
