'use client';

import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Container } from '@/components/layout/container';
import { CONTACT_EMAIL } from '@/lib/constants';

export function About() {
  return (
    <section id="about" className="py-24 px-6">
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
            About StormD3v
          </motion.p>

          {/* Why StormD3v exists — first and primary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-6 mb-16"
          >
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
              My name is Friday Gift Chinechenum Azunda. Online, I go by StormD3v.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              I build under StormOS, a personal philosophy and working environment for ideas
              that deserve more than a sprint. WorldForge and LumiCast are the current work.
              More will come when they are ready.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty">
              There is no roadmap here, and no release schedule. Work earns its way into existence.
            </p>
          </motion.div>

          {/* Contact row — GitHub, X, Discord username, email */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-wrap items-center gap-3"
            aria-label="Contact and social links"
          >
            <a
              href="https://github.com/StormD3v"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
              className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://x.com/Storm_D3V"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View X profile"
              className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <FaXTwitter size={18} aria-hidden="true" />
            </a>

            {/* Discord: username only — no public profile URL */}
            <span
              aria-label="Discord username: storm_d3v"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-default"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span className="text-sm text-neutral-500">storm_d3v</span>
            </span>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={`Send email to ${CONTACT_EMAIL}`}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <Mail size={18} aria-hidden="true" />
              <span className="text-sm">{CONTACT_EMAIL}</span>
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
