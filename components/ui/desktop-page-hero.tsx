'use client';

import { useReducedMotion, motion } from 'framer-motion';
import Image from 'next/image';

interface DesktopPageHeroProps {
  src: string;
  alt?: string;
}

export function DesktopPageHero({ src, alt = '' }: DesktopPageHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="hidden sm:block absolute top-0 left-0 right-0 h-[110svh] overflow-hidden pointer-events-none"
      style={{
        zIndex: -15,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 50%, transparent 100%)',
      }}
    >
      {/* Top fade overlay for blend under nav */}
      <div
        className="absolute top-0 left-0 right-0 h-[8%] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0a0a0a, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Background image with breathing animation */}
      <motion.div
        className="absolute inset-0"
        animate={
          reducedMotion
            ? {}
            : {
                scale: [1, 1.09, 1],
              }
        }
        transition={
          reducedMotion
            ? {}
            : {
                duration: 18,
                ease: 'easeInOut',
                repeat: Infinity,
              }
        }
        style={{ transformOrigin: 'center' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-top pointer-events-none"
        />
      </motion.div>

      {/* Left dark scrim for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.45) 35%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => {
            const isLeft = i % 2 === 0;
            const leftPos = isLeft ? `${8 + Math.random() * 24}%` : `${68 + Math.random() * 24}%`;
            const topPos = `${40 + Math.random() * 55}%`;
            const size = 4 + Math.random() * 2;
            const duration = 12 + Math.random() * 8;
            const delay = Math.random() * 5;
            const color = Math.random() > 0.5 ? 'rgba(167, 139, 250,' : 'rgba(96, 165, 250,';
            const opacity = 0.5 + Math.random() * 0.5;
            const floatDistance = 250 + Math.random() * 200;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: leftPos,
                  top: topPos,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: `${color}${opacity})`,
                  boxShadow: `0 0 10px 2px ${color}${opacity})`,
                }}
                animate={{
                  y: [-floatDistance, -floatDistance - 250],
                  opacity: [0, opacity, 0],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
