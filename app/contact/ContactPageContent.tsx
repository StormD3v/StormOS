'use client';

import { motion } from 'framer-motion';
import { Mail, Github, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/sections/contact-form';
import { CONTACT_EMAIL } from '@/lib/constants';
import { socialLinks } from '@/content/social-links';

const CONTACT_PAGE_ORDER = ['GitHub', 'X', 'Discord'];

const iconMap: Record<string, React.ElementType> = {
    github: Github,
    twitter: FaXTwitter,
    discord: MessageCircle,
};

const contactPageSocials = CONTACT_PAGE_ORDER
    .map((name) => socialLinks.find((l) => l.platform === name))
    .filter(Boolean) as typeof socialLinks;

const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export function ContactPageContent() {
    return (
        <Container className="py-32 px-6">
            {/* Page label */}
            <motion.p
                {...reveal(0)}
                className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
            >
                Contact
            </motion.p>

            {/* Heading */}
            <motion.h1
                {...reveal(0.05)}
                className="text-5xl md:text-6xl font-bold text-neutral-100 mb-6 leading-tight"
            >
                Say hello
            </motion.h1>

            {/* Framing — an invitation, not a pitch */}
            <motion.div {...reveal(0.1)} className="mb-16 max-w-lg space-y-4">
                <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                    If something here caught your attention, reach out. Conversations about
                    real ideas are always welcome.
                </p>
            </motion.div>

            <motion.div
                {...reveal(0.15)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            >
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

                    {/* Social */}
                    <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-600 mb-3">
                            Elsewhere
                        </p>
                        <div className="flex items-center gap-2.5" role="list" aria-label="Social profiles">
                            {contactPageSocials.map((link) => {
                                const Icon = iconMap[link.icon.toLowerCase()];
                                if (!Icon) return null;

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
            </motion.div>
        </Container>
    );
}
