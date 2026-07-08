'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
      className="min-h-screen flex items-center justify-center px-6 pt-32 pb-40 relative overflow-hidden bg-neutral-950"
      aria-labelledby="hero-headline"
    >
      {/* Ambient glow — near-invisible purple atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-accent-purple/6 rounded-full blur-3xl -z-10"
        style={{ opacity: reducedMotion ? 0 : 0.12 }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <motion.h1
          id="hero-headline"
          {...entrance(0)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-100 mb-8 leading-[1.05] tracking-tight"
        >
          StormD3v
        </motion.h1>

        {/* Subline */}
        <motion.p
          {...entrance(0.15)}
          className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed text-pretty"
        >
          Some ideas deserve years. This is where they get them.
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
