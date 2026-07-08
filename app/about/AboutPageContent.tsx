'use client';

import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Container } from '@/components/layout/container';
import { CONTACT_EMAIL } from '@/lib/constants';

const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export function AboutPageContent() {
    return (
        <Container className="py-32 px-6">
            <div className="max-w-2xl">

                {/* Page label */}
                <motion.p
                    {...reveal(0)}
                    className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10"
                >
                    Identity
                </motion.p>

                {/* Page heading */}
                <motion.h1
                    {...reveal(0.05)}
                    className="text-5xl md:text-6xl font-bold text-neutral-100 mb-14 leading-tight"
                >
                    Friday Gift Chinechenum Azunda
                </motion.h1>

                {/* Identity — person first, alias second, philosophy third */}
                <motion.div {...reveal(0.1)} className="space-y-6 mb-16">
                    <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                        Known online as StormD3v.
                    </p>
                    <p className="text-neutral-400 leading-relaxed text-pretty">
                        Storm-OS is the personal environment through which long-term ideas are designed,
                        built and maintained. Some ideas cannot be rushed without losing what makes them
                        worth building. Storm-OS is the framework that makes patience possible.
                    </p>
                    <p className="text-neutral-400 leading-relaxed text-pretty">
                        WorldForge and LumiCast are the active projects within that environment.
                        Future work appears when it is ready, not before.
                    </p>
                </motion.div>

                {/* Right now */}
                <motion.div {...reveal(0.18)} className="border-t border-neutral-800/60 pt-12 space-y-6 mb-16">
                    <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
                        Right now
                    </p>
                    <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                        Most of the current focus is on WorldForge.
                    </p>
                    <p className="text-neutral-400 leading-relaxed text-pretty">
                        It is a long-running project, the kind that cannot be rushed without losing
                        what makes it worth building. When it is ready, it will feel that way.
                    </p>
                </motion.div>

                {/* Contact row */}
                <motion.div
                    {...reveal(0.25)}
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
                    {/* Discord: username only, no public profile URL */}
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
    );
}
