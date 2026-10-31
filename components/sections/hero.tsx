'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LetterGlowSweep } from '@/components/ui/letter-glow-sweep';
import { MobileBackground } from '@/components/ui/mobile-background';
import Image from 'next/image';

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col px-6 relative sm:overflow-visible max-sm:min-h-[100svh] max-sm:pb-0"
      aria-labelledby="hero-headline"
    >
      {/* Solid dark background fallback */}
      <div className="absolute inset-0 bg-neutral-950 -z-30 sm:hidden" />

      {/* Desktop background image - wide hero background with living animation */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none -z-20 overflow-hidden"
        style={{
          bottom: '-25svh',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 62%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 62%, transparent 100%)',
        }}
      >
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
            src="/images/hero-desktop.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Desktop floating particles - above background, below scrim */}
      {!reducedMotion && (
        <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -15 }}>
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

      {/* Mobile background image with seamless blending */}
      <div className="sm:hidden">
        <MobileBackground src="/images/hero-mobile.webp" objectPosition="bottom" priority />
      </div>

      {/* Ambient glow — near-invisible purple atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-accent-purple/6 rounded-full blur-3xl -z-10"
        style={{ opacity: reducedMotion ? 0 : 0.12 }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center mt-[33vh] sm:mt-[17vh] max-sm:mt-[25vh] relative z-10">
        {/* Soft dark radial gradient behind text block on mobile */}
        <div
          className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
          style={{
            background: 'radial-gradient(closest-side, rgba(7,6,11,0.65) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Dark radial scrim behind text block on desktop */}
        <div
          className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.35) 45%, transparent 75%)',
          }}
          aria-hidden="true"
        />
        {/* Headline */}
        <motion.h1
          id="hero-headline"
          {...entrance(0)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.05] tracking-tight"
        >
          <LetterGlowSweep text="StormD3v" />
        </motion.h1>

        {/* Subline */}
        <motion.p
          {...entrance(0.15)}
          className="text-xl md:text-2xl mb-12 max-w-xl mx-auto leading-relaxed text-pretty"
        >
          <span className="text-neutral-200 sm:hidden" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            Long-term ideas, designed and built inside Storm-OS.
          </span>
          <span className="hidden sm:block text-neutral-400" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
            Long-term ideas, designed and built inside Storm-OS.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...entrance(0.3)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            variant="secondary"
            className="bg-accent-purple text-white font-bold rounded-lg shadow-[0_0_24px_rgba(168,85,247,0.5)] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)] hover-ripple"
            onClick={() => scrollTo('building')}
            aria-label="See what is being built"
          >
            The work
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-transparent border border-accent-purple text-white shadow-[0_0_24px_rgba(168,85,247,0.5)] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)] hover-ripple"
            onClick={() => scrollTo('contact')}
            aria-label="Get in touch"
          >
            Get in touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
