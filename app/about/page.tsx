'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';

const entrance = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
};

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export default function AboutPage() {
  return (
    <PageWrapper>
      <Container className="py-32 px-6">
        <div className="max-w-2xl">

          {/* Page label */}
          <motion.p
            {...stagger(0)}
            className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
          >
            About StormOS
          </motion.p>

          {/* Page heading */}
          <motion.h1
            {...stagger(0.05)}
            className="text-5xl md:text-6xl font-bold text-neutral-100 mb-14 leading-tight"
          >
            StormOS
          </motion.h1>

          {/* Core narrative */}
          <motion.div {...stagger(0.1)} className="space-y-6 mb-16">
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
              StormOS wasn&apos;t created to become a company.
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
              It began as a place where everything I build could finally live together.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              Some ideas take weeks. Some take years. Some may never be finished.
              That&apos;s okay.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              I&apos;d rather spend years building something worth remembering than weeks
              building something forgettable.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Over time, this becomes the record.
            </p>
          </motion.div>

          {/* Identity sentence */}
          <motion.p
            {...stagger(0.2)}
            className="text-base text-neutral-500 leading-relaxed mb-20"
          >
            I enjoy building the kinds of things people usually dismiss as impossible,
            unnecessary, or too ambitious.
          </motion.p>

          {/* WorldForge context */}
          <motion.div {...stagger(0.25)} className="border-t border-neutral-800/60 pt-16 space-y-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
              Right now
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
              Most of my focus is on WorldForge.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              It&apos;s a long-running project. Not the kind of thing that ships in a sprint
              and gets called done. It&apos;s the kind of project that earns its way into
              existence over time.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              When I&apos;m not building, I&apos;m thinking about what to build next.
            </p>
          </motion.div>

        </div>
      </Container>
    </PageWrapper>
  );
}
