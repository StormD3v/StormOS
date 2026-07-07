'use client';

import { useRef } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { WaitlistForm } from '@/components/sections/waitlist-form';

export function WorldForge() {
  const reducedMotion = useReducedMotion();
  const waitlistRef = useRef<HTMLDivElement>(null);

  function handleJoinClick() {
    if (!waitlistRef.current) return;
    waitlistRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Focus the email input after scroll settles
    setTimeout(() => {
      const input = waitlistRef.current?.querySelector<HTMLInputElement>('input[type="email"]');
      input?.focus({ preventScroll: true });
    }, 400);
  }

  return (
    <section
      id="worldforge"
      className="relative py-36 px-6 overflow-hidden"
      aria-labelledby="worldforge-heading"
    >
      {/* Dark purple ambient background */}
      <div className="absolute inset-0 bg-neutral-950 -z-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10" />

      {/* Deep ambient glow — positioned top-left, stays out of the way of text */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0.4 }}
        animate={
          reducedMotion
            ? { opacity: 0.4 }
            : { opacity: [0.4, 0.6, 0.4] }
        }
        transition={
          reducedMotion
            ? {}
            : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <Container>
        <div className="max-w-2xl">
          {/* Heading */}
          <motion.h2
            id="worldforge-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-5xl md:text-6xl font-bold text-accent-purple mb-10 leading-tight"
          >
            WorldForge
          </motion.h2>

          {/* Core emotional copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-6 mb-14"
          >
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
              Most platforms ask you to build a profile.
            </p>
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
              WorldForge asks you to build a life.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
              Every decision becomes history.
              Every alliance matters.
              Every citizen leaves a legacy.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
              Because people don&apos;t simply use WorldForge.
              <br />
              They live inside it.
            </p>
          </motion.div>

          {/* CTA — scrolls to and focuses the waitlist form below */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            className="mb-12"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={handleJoinClick}
              className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
            >
              Join the First Crossing
            </Button>
          </motion.div>

          {/* Waitlist form — inline, no surrounding card */}
          <motion.div
            ref={waitlistRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
