'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { SiDiscord } from 'react-icons/si';
import { Container } from '@/components/layout/container';
import { DesktopPageHero } from '@/components/ui/desktop-page-hero';
import { CONTACT_EMAIL } from '@/lib/constants';
import { socialLinks } from '@/content/social-links';
import { projects } from '@/content/projects';

// Display order for Identity page social links
const IDENTITY_SOCIALS = ['GitHub', 'X', 'Discord'];

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  twitter: FaXTwitter,
  discord: SiDiscord,
};

const visibleSocials = IDENTITY_SOCIALS
  .map((name) => socialLinks.find((l) => l.platform === name && l.showOnHomepage))
  .filter(Boolean) as typeof socialLinks;

// Platform tags to separate from project tags
const PLATFORM_TAGS = ['Vercel', 'Supabase', 'Railway'];

// Extract unique tags from all projects, excluding platform tags
const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();

const builtWithTags = allTags.filter((tag) => !PLATFORM_TAGS.includes(tag));

const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export function AboutPageContent() {
    return (
        <>
            <DesktopPageHero src="/images/about-desktop.webp" />
            <Container className="py-10 sm:py-32 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {/* Left column: existing text, photo, social icons */}
                    <div className="max-w-2xl relative">
                        {/* Soft dark radial gradient behind content on mobile */}
                        <div
                            className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                            style={{
                                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                            }}
                            aria-hidden="true"
                        />

                        {/* Page label */}
                        <motion.p
                            {...reveal(0)}
                            className="text-xs font-semibold tracking-widest uppercase text-neutral-500 sm:text-neutral-500 mb-10 max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
                        >
                            Identity
                        </motion.p>

                        {/* Portrait */}
                        <motion.div {...reveal(0.04)} className="mb-12">
                            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-neutral-800">
                                <Image
                                    src="/images/friday-gift-azunda-v2.jpg"
                                    alt="Portrait of Friday Gift Chinechenum Azunda, known online as StormD3v"
                                    width={176}
                                    height={176}
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: '50% 82%' }}
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Page heading */}
                        <motion.h1
                            {...reveal(0.05)}
                            className="text-5xl md:text-6xl font-bold text-neutral-100 mb-14 leading-tight"
                        >
                            Friday Gift Chinechenum Azunda
                        </motion.h1>

                        {/* Identity — person first, alias second, philosophy third */}
                        <motion.div {...reveal(0.1)} className="space-y-6 mb-16">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                Known online as StormD3v.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                Storm-OS is the personal environment through which long-term ideas are designed,
                                built and maintained. Some ideas cannot be rushed without losing what makes them
                                worth building. Storm-OS is the framework that makes patience possible.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                WorldForge, LumiCast, and StormCash are the active projects within that environment.
                                Future work appears when it is ready, not before.
                            </p>
                        </motion.div>

                        {/* Right now */}
                        <motion.div {...reveal(0.18)} className="pt-12 space-y-6 mb-16">
                            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 sm:text-neutral-500 max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                Right now
                            </p>
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                Most of the current focus is on WorldForge.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                It is a long-running project, the kind that cannot be rushed without losing
                                what makes it worth building. When it is ready, it will feel that way.
                            </p>
                        </motion.div>

                        {/* Contact row — from content configuration */}
                        <motion.div
                            {...reveal(0.25)}
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
                                    className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 hover-ripple"
                                >
                                    <Icon size={18} aria-hidden="true" />
                                </a>
                              );
                            })}
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                aria-label="Email Storm"
                                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 hover-ripple"
                            >
                                <Mail size={18} aria-hidden="true" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right column: Tech I work with panel */}
                    <motion.div
                        {...reveal(0.15)}
                        className="hidden sm:block relative self-start"
                    >
                        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 sm:sticky sm:top-28">
                            <h3 className="text-lg font-bold text-white mb-4">
                                Tech I work with
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase text-neutral-400 mb-2">Built with</p>
                                    <div className="flex flex-wrap gap-2">
                                        {builtWithTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800/50 text-neutral-300 border border-neutral-700/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-neutral-400 mb-2">Deployed on</p>
                                    <div className="flex flex-wrap gap-2">
                                        {PLATFORM_TAGS.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800/50 text-neutral-300 border border-neutral-700/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </>
    );
}
