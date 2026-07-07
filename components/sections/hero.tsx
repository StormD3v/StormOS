'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

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
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 -z-10" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-storm-blue/15 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0.25, scale: 1 }}
        animate={
          reducedMotion
            ? { opacity: 0.25, scale: 1 }
            : { opacity: [0.25, 0.4, 0.25], scale: [1, 1.15, 1] }
        }
        transition={
          reducedMotion
            ? {}
            : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="max-w-3xl mx-auto text-center">
        {/* Headline — StormOS is the subject */}
        <motion.h1
          id="hero-headline"
          {...entrance(0)}
          className="text-6xl md:text-7xl lg:text-[80px] font-bold text-neutral-100 mb-8 leading-[1.05] tracking-tight"
        >
          StormOS
        </motion.h1>

        {/* Subline — approved copy, untouched */}
        <motion.p
          {...entrance(0.15)}
          className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed text-pretty"
        >
          Where impossible ideas are given enough time to become real.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...entrance(0.3)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={() => scrollTo('building')}
            aria-label="See what I'm building — scroll to projects"
          >
            See what I&apos;m building
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollTo('contact')}
            aria-label="Follow the journey — scroll to contact"
          >
            Follow the journey
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={
            reducedMotion ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="text-neutral-600"
        >
          <ArrowDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
