'use client';

import { useRef } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { WaitlistForm } from '@/components/sections/waitlist-form';
import Link from 'next/link';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export default function WorldForgePage() {
  const reducedMotion = useReducedMotion();
  const waitlistRef = useRef<HTMLDivElement>(null);

  function handleJoinClick() {
    if (!waitlistRef.current) return;
    waitlistRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      const input = waitlistRef.current?.querySelector<HTMLInputElement>('input[type="email"]');
      input?.focus({ preventScroll: true });
    }, 400);
  }

  return (
    <PageWrapper>

      {/* Hero — purple ambient environment */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10" />
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-3xl -z-10"
          initial={{ opacity: 0.3 }}
          animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.3, 0.5, 0.3] }}
          transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Container>
          <div className="max-w-2xl">
            <motion.p
              {...stagger(0)}
              className="text-xs font-semibold tracking-widest uppercase text-accent-purple/70 mb-8"
            >
              Flagship Project
            </motion.p>

            <motion.h1
              {...stagger(0.08)}
              className="text-6xl md:text-7xl font-bold text-accent-purple mb-10 leading-tight"
            >
              WorldForge
            </motion.h1>

            <motion.div {...stagger(0.16)} className="space-y-5">
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
                Most platforms ask you to build a profile.
              </p>
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
                WorldForge asks you to build a life.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                Every decision becomes history. Every alliance matters.
                Every citizen leaves a legacy.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Because people don&apos;t simply use WorldForge.
                <br />
                They live inside it.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What it is */}
      <section className="py-32 px-6 border-t border-neutral-800/60">
        <Container>
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
            >
              What it is
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="space-y-6"
            >
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                WorldForge is a world-building platform built around permanence.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                Not the kind of world you build in an afternoon and abandon by the weekend.
                The kind of world that accumulates. Where a decision made in the first month
                still matters in the third year. Where civilizations rise, collapse, and leave
                traces that future players inherit.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                Identity is the foundation. Who you are inside WorldForge is defined by
                what you do, not what you claim. Your legacy is written by the choices you make,
                the alliances you build, and the things you leave behind.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                There are no resets. There is only history.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Where it is now */}
      <section className="py-32 px-6 bg-neutral-900/30 border-t border-neutral-800/60">
        <Container>
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
            >
              Where it is now
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="space-y-6"
            >
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                WorldForge is in active development. It is not finished. It may not be
                finished for a long time.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                The core systems are being designed and built to support the permanence
                model. That means getting the foundations right before anything else.
                World state. History. Identity. The mechanics that make consequences real.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                There is no beta date yet. There is no launch window. What exists right
                now is a growing system being built with the patience the concept requires.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                The First Crossing is the name for the initial group of people who will
                enter WorldForge before it opens to the public. That group is small by
                design. The list below is how you get on it.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="relative py-36 px-6 overflow-hidden border-t border-neutral-800/60"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" />
        <Container>
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-xs font-semibold tracking-widest uppercase text-accent-purple/70 mb-10"
            >
              The First Crossing
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="space-y-5 mb-12"
            >
              <p className="text-2xl md:text-3xl font-bold text-accent-purple leading-tight">
                Join the First Crossing.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                A small group of people will enter WorldForge before it opens publicly.
                They will shape the first histories, build the first civilizations,
                and leave the first legacies.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Leave your email. We&apos;ll reach out when the time comes.
              </p>
            </motion.div>

            <motion.div
              ref={waitlistRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WaitlistForm />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Follow development */}
      <section className="py-32 px-6 border-t border-neutral-800/60">
        <Container>
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
            >
              Follow development
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="space-y-5 mb-12"
            >
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                WorldForge is being built in public, slowly and seriously.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                Not a steady stream of updates. Not a newsletter. Just occasional signals
                when something real happens. If you want to watch it grow without
                committing to anything, the contact page is the right place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                variant="primary"
                onClick={handleJoinClick}
                className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
              >
                Join the First Crossing
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get in touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

    </PageWrapper>
  );
}
