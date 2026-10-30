'use client';

import { useRef } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { WaitlistForm } from '@/components/sections/waitlist-form';
import { MobileBackground } from '@/components/ui/mobile-background';

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
      className="relative py-36 max-sm:pt-12 sm:pt-16 sm:pb-24 px-6"
      aria-labelledby="worldforge-heading"
    >
      {/* Solid dark background fallback */}
      <div className="absolute inset-0 bg-neutral-950 -z-30" />

      {/* Mobile background image with seamless blending and effects */}
      <MobileBackground src="/images/hollow-world.webp" effects="embers" />

      {/* Dark purple ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-20" />

      {/* Soft dark gradient behind text block and form on mobile */}
      <div
        className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
        style={{
          background: 'radial-gradient(closest-side, rgba(7,6,11,0.65) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

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
        {/* Module label - centered above grid */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-xs font-semibold tracking-widest uppercase text-accent-purple/60 max-sm:text-accent-purple max-sm:text-lg max-sm:font-extrabold max-sm:mb-6 sm:text-accent-purple sm:text-2xl sm:font-extrabold text-center mb-8"
        >
          Flagship
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
          {/* Left column: text, button, and form */}
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

            {/* Core copy — describe a place, not software */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="space-y-7 max-sm:space-y-4 mb-14"
            >
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-xl max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                WorldForge is a living world, built around permanence.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-base max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                Every decision you make becomes part of its history, and every person who
                enters leaves a legacy that outlasts them. Civilizations rise, collapse, and
                leave traces that future people inherit. Nothing is erased. Nothing resets.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-base max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                Identity here is not what you claim. It is what you do, over time,
                in a world that remembers.
              </p>
              <p className="text-base text-neutral-500 leading-relaxed sm:text-neutral-500 sm:!text-shadow-none max-sm:text-base max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                Some worlds deserve to last. WorldForge is being built to be one of them.
              </p>
            </motion.div>

            {/* Mobile demo video */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
              className="sm:hidden mb-10"
            >
              <video
                src="/worldforge-demo-mobile.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="mx-auto w-[70%] max-w-[280px] rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(191,90,242,0.15)]"
              />
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

          {/* Right column: demo video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="hidden sm:block self-center"
          >
            <video
              src="/worldforge-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full rounded-2xl border border-white/10 object-cover shadow-[0_0_40px_rgba(191,90,242,0.15)]"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
