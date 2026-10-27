'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface MobileBackgroundProps {
  src: string;
  objectPosition?: 'center' | 'bottom';
  effects?: 'embers' | 'none';
  priority?: boolean;
  extend?: boolean;
}

/**
 * MobileBackground
 *
 * Wraps a background image with:
 * - CSS mask for seamless top/bottom fading
 * - 96px extension past section boundaries for crossfade (optional)
 * - Subtle living animations (breathing, glow, embers)
 * - Pauses when off-screen (IntersectionObserver)
 * - Respects prefers-reduced-motion
 */
export function MobileBackground({ src, objectPosition = 'center', effects = 'none', priority = false, extend = true }: MobileBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
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
      <div className={`absolute inset-0 sm:hidden -z-20 ${extend ? '-top-24 -bottom-24' : ''}`}>
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover pointer-events-none ${
            objectPosition === 'bottom' ? 'object-bottom' : 'object-center'
          }`}
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 sm:hidden -z-20 ${extend ? '-top-24 -bottom-24' : ''}`}
      style={{ animationPlayState: 'paused' }}
    >
      {/* Base image with breathing animation */}
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        priority={priority}
        sizes="100vw"
        className={`object-cover pointer-events-none ${
          objectPosition === 'bottom' ? 'object-bottom' : 'object-center'
        }`}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          animation: 'breathe 24s ease-in-out infinite',
        }}
      />

      {/* Waterfall shimmer - only for embers effect */}
      {effects === 'embers' && (
        <>
          <div
            className="absolute w-1 h-20 rounded-full blur-sm mix-blend-screen"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
              top: '20%',
              left: '15%',
              animation: 'waterfallShimmer 4s ease-in-out infinite',
              animationDelay: '0s',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute w-1 h-16 rounded-full blur-sm mix-blend-screen"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)',
              top: '35%',
              left: '18%',
              animation: 'waterfallShimmer 4s ease-in-out infinite',
              animationDelay: '1.5s',
            }}
            aria-hidden="true"
          />
          {/* Embers */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-sm"
              style={{
                width: `${2 + Math.random() * 2}px`,
                height: `${2 + Math.random() * 2}px`,
                background: i % 2 === 0 ? 'rgba(251,191,36,0.6)' : 'rgba(191,90,242,0.6)',
                bottom: '5%',
                left: `${20 + Math.random() * 60}%`,
                animation: `emberFloat ${10 + Math.random() * 6}s ease-out infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </>
      )}
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
        @keyframes waterfallShimmer {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(60px);
            opacity: 0;
          }
        }
        @keyframes emberFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
