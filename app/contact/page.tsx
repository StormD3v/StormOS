'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { ContactForm } from '@/components/sections/contact-form';
import { Mail, Github, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { socialLinks } from '@/content/social-links';

// [PLACEHOLDER: replace with real email before launch]
const CONTACT_EMAIL = 'hello@example.com';

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  twitter: FaXTwitter,
  discord: MessageCircle,
};

// On the contact page, show GitHub, X, and Discord only
const CONTACT_PAGE_ORDER = ['GitHub', 'X', 'Discord'];
const contactPageSocials = CONTACT_PAGE_ORDER
  .map((name) => socialLinks.find((l) => l.platform === name))
  .filter(Boolean) as typeof socialLinks;

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export default function ContactPage() {
  return (
    <PageWrapper>
      <Container className="py-32 px-6">

        {/* Page label */}
        <motion.p
          {...stagger(0)}
          className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
        >
          Contact
        </motion.p>

        {/* Heading */}
        <motion.h1
          {...stagger(0.05)}
          className="text-5xl md:text-6xl font-bold text-neutral-100 mb-5 leading-tight"
        >
          Let&apos;s build something meaningful.
        </motion.h1>

        {/* Framing */}
        <motion.div {...stagger(0.1)} className="mb-16 max-w-xl space-y-4">
          <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
            If something here connects with what you&apos;re building, or you&apos;re simply
            curious about what comes next, I&apos;d love to hear from you.
          </p>
          <p className="text-base text-neutral-500 leading-relaxed">
            This isn&apos;t a place for generic project requests.
            It&apos;s for conversations about ambitious ideas.
          </p>
        </motion.div>

        <motion.div
          {...stagger(0.15)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Contact form */}
          <Card variant="elevated">
            <ContactForm />
          </Card>

          {/* Direct contact */}
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

            {/* Social */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
                Elsewhere
              </p>
              <div className="flex items-center gap-3" role="list" aria-label="Social profiles">
                {contactPageSocials.map((link) => {
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
        </motion.div>

      </Container>
    </PageWrapper>
  );
}
