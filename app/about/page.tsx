'use client';

import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <PageWrapper>
      <Container className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-6">
            About Me
          </h1>
          <p className="text-xl text-neutral-400 mb-12 max-w-3xl">
            I&apos;m a software engineer passionate about building products that make a difference
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card variant="elevated">
              <h2 className="text-2xl font-semibold text-storm-blue mb-4">My Philosophy</h2>
              <p className="text-neutral-400 leading-relaxed">
                I believe in writing clean, maintainable code that scales. Every line of code should have a purpose, and every feature should solve a real problem. I strive for simplicity over cleverness, and I believe that the best code is code that others can easily understand and maintain.
              </p>
            </Card>

            <Card variant="elevated">
              <h2 className="text-2xl font-semibold text-storm-blue mb-4">My Background</h2>
              <p className="text-neutral-400 leading-relaxed">
                {/* [PLACEHOLDER: replace "years of experience" and "millions of people" with real figures] */}
                With years of experience in software engineering, I&apos;ve worked on everything from early-stage startups to enterprise applications. I&apos;ve led teams, mentored junior developers, and shipped products used by millions of people. Technical excellence is only half the equation. Communication and collaboration matter just as much.
              </p>
            </Card>
          </div>

          <Card variant="elevated" className="mb-12">
            <h2 className="text-2xl font-semibold text-storm-blue mb-4">My Approach</h2>
            <p className="text-neutral-400 leading-relaxed">
              I take a user-first approach to development. Before writing a single line of code, I seek to understand the problem deeply. I believe in iterative development, continuous feedback, and data-driven decisions. I&apos;m not just building software. I&apos;m building solutions that improve people&apos;s lives.
            </p>
          </Card>

          <Card variant="elevated">
            <h2 className="text-2xl font-semibold text-storm-blue mb-4">What I&apos;m Working On</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Currently, I&apos;m focused on WorldForge, my flagship project that aims to revolutionize how creators build and collaborate on immersive worlds. It&apos;s an ambitious project, but I believe it has the potential to change the landscape of creative tools.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open source, or sharing my knowledge through writing and speaking.
            </p>
          </Card>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
