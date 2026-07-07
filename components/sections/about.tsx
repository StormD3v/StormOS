'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <Container>
        <div className="max-w-2xl">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
          >
            About StormOS
          </motion.p>

          {/* Main narrative — single column, no cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-6"
          >
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
              StormOS wasn&apos;t created to become a company.
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
              It began as a place where everything I build could finally live together.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              Some ideas take weeks.
              Some take years.
              Some may never be finished.
              That&apos;s okay.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              I&apos;d rather spend years building something worth remembering than weeks
              building something forgettable.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              Over time, this becomes the record.
            </p>
          </motion.div>

          {/* Identity sentence — separated with generous vertical space, no decoration */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-20 text-base text-neutral-500 leading-relaxed"
          >
            I enjoy building the kinds of things people usually dismiss as impossible,
            unnecessary, or too ambitious.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
