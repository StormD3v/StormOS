'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { SiDiscord } from 'react-icons/si';
import { Container } from '@/components/layout/container';
import { CONTACT_EMAIL } from '@/lib/constants';
import { socialLinks } from '@/content/social-links';
import { MobileBackground } from '@/components/ui/mobile-background';

// Display order for Identity section social links
const IDENTITY_SOCIALS = ['GitHub', 'X', 'Discord'];

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  twitter: FaXTwitter,
  discord: SiDiscord,
};

const visibleSocials = IDENTITY_SOCIALS
  .map((name) => socialLinks.find((l) => l.platform === name && l.showOnHomepage))
  .filter(Boolean) as typeof socialLinks;

export function About() {
  return (
    <section id="about" className="py-24 max-sm:py-8 px-6 relative">
      {/* Solid dark background fallback */}
      <div className="absolute inset-0 bg-neutral-950 -z-30" />

      {/* Mobile background image */}
      <MobileBackground src="/images/wallpaper-identity.webp" effects="none" />

      {/* Soft dark radial gradient behind content on mobile */}
      <div
        className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
        style={{
          background: 'radial-gradient(closest-side, rgba(7,6,11,0.6) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-2xl relative z-10">

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="section-label mb-10 max-sm:mb-4"
          >
            Identity
          </motion.p>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="mb-12"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-neutral-800">
              <Image
                src="/images/friday-gift-azunda-v2.jpg"
                alt="Portrait of Friday Gift Chinechenum Azunda, known online as StormD3v"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 82%' }}
                priority
              />
            </div>
          </motion.div>

          {/* Identity — person first, alias second, philosophy third */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-6 mb-16"
          >
            <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Friday Gift Chinechenum Azunda. Known online as StormD3v.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Storm-OS is the personal environment through which long-term ideas are designed,
              built and maintained. WorldForge, LumiCast, and StormCash are the active projects within it.
              Future work appears when it is ready.
            </p>
            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              No roadmap. No release schedule. Work earns its way into existence.
            </p>
          </motion.div>

          {/* Contact row — from content configuration */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-wrap items-center gap-3"
            aria-label="Contact and social links"
          >
            {visibleSocials.map((link) => {
              const Icon = iconMap[link.icon.toLowerCase()];
              if (!Icon) return null;

              // Discord now has a public URL
              if (link.url === null) {
                return (
                  <span
                    key={link.platform}
                    aria-label={`Discord username: ${link.username ?? link.platform}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 sm:text-neutral-500 cursor-default"
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="text-sm text-neutral-500 sm:text-neutral-500">{link.username}</span>
                  </span>
                );
              }

              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${link.platform} profile`}
                  className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email Storm"
              className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
