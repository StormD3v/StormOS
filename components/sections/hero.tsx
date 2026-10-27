'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LetterGlowSweep } from '@/components/ui/letter-glow-sweep';
import { MobileBackground } from '@/components/ui/mobile-background';

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
      className="min-h-screen flex flex-col px-6 relative"
      aria-labelledby="hero-headline"
    >
      {/* Solid dark background fallback */}
      <div className="absolute inset-0 bg-neutral-950 -z-30" />

      {/* Mobile background image with seamless blending */}
      <MobileBackground src="/images/hero-mobile.webp" objectPosition="bottom" priority />

      {/* Ambient glow — near-invisible purple atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-accent-purple/6 rounded-full blur-3xl -z-10"
        style={{ opacity: reducedMotion ? 0 : 0.12 }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center mt-[33vh] sm:mt-[40vh] relative z-10">
        {/* Soft dark radial gradient behind text block on mobile */}
        <div
          className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
          style={{
            background: 'radial-gradient(closest-side, rgba(7,6,11,0.65) 0%, transparent 100%)',
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
          <span className="hidden sm:block text-neutral-400">
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
            onClick={() => scrollTo('building')}
            aria-label="See what is being built"
          >
            The work
          </Button>
          <Button
            size="lg"
            variant="secondary"
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
