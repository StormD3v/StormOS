'use client';

import { motion } from 'framer-motion';
import { Mail, Github, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/sections/contact-form';
import { CONTACT_EMAIL } from '@/lib/constants';
import { socialLinks } from '@/content/social-links';

// Display order for homepage contact social links
const CONTACT_SOCIALS = ['GitHub', 'X', 'Discord'];

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  twitter: FaXTwitter,
  discord: MessageCircle,
};

const visibleSocials = CONTACT_SOCIALS
  .map((name) => socialLinks.find((l) => l.platform === name && l.showOnHomepage))
  .filter(Boolean) as typeof socialLinks;

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="max-w-2xl"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6 leading-tight">
            Say hello
          </h2>

          {/* One short paragraph — an invitation, not a pitch */}
          <p className="text-lg text-neutral-400 mb-16 max-w-lg leading-relaxed text-pretty">
            If something here caught your attention, reach out. Conversations about
            real ideas are always welcome.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact form — no Card wrapper */}
            <ContactForm />

            {/* Direct contact */}
            <div className="flex flex-col gap-8 pt-1">

              {/* Email */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-neutral-600 mb-3">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label={`Send email to ${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 text-neutral-400 hover:text-neutral-100 transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span className="text-sm">{CONTACT_EMAIL}</span>
                </a>
              </div>

              {/* Social — from content configuration */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-neutral-600 mb-3">
                  Elsewhere
                </p>
                <div className="flex items-center gap-2.5" role="list" aria-label="Social profiles">
                  {visibleSocials.map((link) => {
                    const Icon = iconMap[link.icon.toLowerCase()];
                    if (!Icon) return null;

                    // Discord has no public URL — render as non-interactive span
                    if (link.url === null) {
                      return (
                        <span
                          key={link.platform}
                          role="listitem"
                          aria-label={`Discord username: ${link.username ?? link.platform}`}
                          className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-default"
                        >
                          <Icon size={18} aria-hidden="true" />
                        </span>
                      );
                    }

                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        role="listitem"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${link.platform} profile`}
                        className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                      >
                        <Icon size={18} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
