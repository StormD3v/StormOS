'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { ContactForm } from '@/components/sections/contact-form';
import { Mail, Github, Twitter, MessageCircle } from 'lucide-react';
import { socialLinks } from '@/content/social-links';

// [PLACEHOLDER: replace with real email before launch]
const CONTACT_EMAIL = 'hello@example.com';

// Icon map for homepage social icons
// Discord doesn't have a lucide icon — using MessageCircle as the closest semantic fit
const iconMap: Record<string, React.ElementType> = {
  github: Github,
  twitter: Twitter,   // used for X
  discord: MessageCircle,
};

// Only show homepage-approved social links, in a defined display order
const HOMEPAGE_ORDER = ['GitHub', 'X', 'Discord'];
const homepageSocials = HOMEPAGE_ORDER
  .map((name) => socialLinks.find((l) => l.platform === name && l.showOnHomepage))
  .filter(Boolean) as typeof socialLinks;

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-5 leading-tight">
            Let&apos;s build something meaningful.
          </h2>

          {/* Framing — filters audience toward the right conversations */}
          <p className="text-lg text-neutral-400 mb-6 max-w-xl leading-relaxed text-pretty">
            If something here connects with what you&apos;re building—or you&apos;re simply
            curious about what comes next—I&apos;d love to hear from you.
          </p>
          <p className="text-base text-neutral-500 mb-16 max-w-xl leading-relaxed">
            This isn&apos;t a place for generic project requests.
            It&apos;s for conversations about ambitious ideas.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <Card variant="elevated">
              <ContactForm />
            </Card>

            {/* Reach out directly */}
            <div className="flex flex-col gap-10 pt-2">
              {/* Email */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label={`Send email to ${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-3 text-neutral-300 hover:text-storm-blue transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue rounded-sm"
                >
                  <Mail size={18} aria-hidden="true" />
                  <span className="text-base">{CONTACT_EMAIL}</span>
                </a>
              </div>

              {/* Social icons — no "Follow Me" heading */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
                  Elsewhere
                </p>
                <div className="flex items-center gap-3" role="list" aria-label="Social profiles">
                  {homepageSocials.map((link) => {
                    const Icon = iconMap[link.icon.toLowerCase()];
                    if (!Icon) return null;
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        role="listitem"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${link.platform} profile`}
                        className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-storm-blue hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                      >
                        <Icon size={20} aria-hidden="true" />
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
