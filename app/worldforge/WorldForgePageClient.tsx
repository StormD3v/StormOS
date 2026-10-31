'use client';

import { useRef, useState, useEffect } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { WaitlistForm } from '@/components/sections/waitlist-form';
import { DesktopPageHero } from '@/components/ui/desktop-page-hero';
import { ProjectPager } from '@/components/ProjectPager';
import { ProjectDrawer } from '@/components/ProjectDrawer';
import { ProjectSidePanel } from '@/components/ProjectSidePanel';
import Link from 'next/link';

const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

const inView = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

const sections = [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'where-it-is-now', label: 'Where it is now' },
    { id: 'waitlist', label: 'The First Crossing' },
    { id: 'follow-development', label: 'Follow development' },
];

export function WorldForgePageClient() {
    const reducedMotion = useReducedMotion();
    const waitlistRef = useRef<HTMLDivElement>(null);

    function handleJoinClick() {
        if (!waitlistRef.current) return;
        waitlistRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            const input = waitlistRef.current?.querySelector<HTMLInputElement>('input[type="email"]');
            input?.focus({ preventScroll: true });
        }, 400);
    }

    const links = [
        { label: 'Join the waitlist', href: '#waitlist', onClick: handleJoinClick },
        { label: 'Join the community', href: 'https://chat.whatsapp.com/BLkZaFtyXzNEgt5WFH63hA', external: true },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-40 pb-32 sm:pb-12 px-6 lg:px-0 max-sm:pt-14 max-sm:pb-8 sm:overflow-visible overflow-hidden">
                <DesktopPageHero src="/images/worldforge-desktop.webp" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10 sm:bg-transparent" />
                <motion.div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-3xl -z-10 sm:hidden"
                    initial={{ opacity: 0.3 }}
                    animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.3, 0.5, 0.3] }}
                    transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                />
                <Container>
                    <div className="grid sm:grid-cols-2 gap-12 items-center">
                        {/* Left column: label, heading, and text */}
                        <div className="max-w-2xl relative max-sm:text-center">
                            {/* Soft dark radial gradient behind content on mobile */}
                            <div
                                className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                                }}
                                aria-hidden="true"
                            />
                            <motion.p
                                {...reveal(0)}
                                className="section-label mb-8 max-sm:mb-4"
                            >
                                Flagship Project
                            </motion.p>
                            <motion.h1
                                {...reveal(0.08)}
                                className="text-6xl md:text-7xl font-bold text-accent-purple mb-10 leading-tight max-sm:text-5xl"
                            >
                                WorldForge
                            </motion.h1>
                            <motion.div {...reveal(0.16)} className="space-y-5">
                                <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                    WorldForge is a living world, built around permanence.
                                </p>
                                <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    Every decision you make becomes part of its history.
                                    Every person who enters leaves a legacy that outlasts them.
                                </p>
                                <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    People do not simply visit WorldForge. They become part of it.
                                </p>
                            </motion.div>

                            {/* Mobile demo video */}
                            <motion.div
                                {...reveal(0.24)}
                                className="sm:hidden mt-10"
                            >
                                <video
                                    src="/worldforge-demo-mobile.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="mx-auto w-[70%] max-w-[280px] rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(191,90,242,0.15)]"
                                />
                            </motion.div>
                        </div>

                        {/* Right column: desktop demo video */}
                        <motion.div
                            {...reveal(0.2)}
                            className="hidden sm:block"
                        >
                            <video
                                src="/worldforge-demo.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(191,90,242,0.15)]"
                            />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Content sections with sticky side panel */}
            <Container className="lg:grid lg:grid-cols-[minmax(0,48rem)_300px] lg:gap-20 lg:px-8 px-6">
                {/* Main content */}
                <div>
                    {/* What it is */}
                    <section id="what-it-is" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
                        <div className="max-w-4xl relative">
                            {/* Soft dark radial gradient behind content on mobile */}
                            <div
                                className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                                }}
                                aria-hidden="true"
                            />
                            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4 flex items-center gap-3">
                                <span className="w-8 h-px bg-accent-purple/50 sm:hidden"></span>
                                <span>What it is</span>
                            </motion.p>
                            <motion.div {...inView(0.1)} className="space-y-6">
                                <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-lg sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                    WorldForge is a persistent social world. It continues whether you are
                                    present or not.
                                </p>
                                <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    The kind of world that accumulates. Where a decision made in the first month
                                    still matters in the third year. Where civilizations rise, collapse, and leave
                                    traces that future people inherit without knowing it. Your choices do not
                                    exist in isolation. They become part of a shared, permanent history.
                                </p>
                                <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    Who you are inside WorldForge is not what you claim. It is what you have done,
                                    what you have built, and what you have left behind. Legacy is the only currency
                                    that survives.
                                </p>
                                <p className="text-neutral-400 leading-relaxed sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    There are no resets. There is only history.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Where it is now */}
                    <section id="where-it-is-now" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
                        <div className="max-w-4xl relative">
                            {/* Soft dark radial gradient behind content on mobile */}
                            <div
                                className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                                }}
                                aria-hidden="true"
                            />
                            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4 flex items-center gap-3">
                                <span className="w-8 h-px bg-accent-purple/50 sm:hidden"></span>
                                <span>Where it is now</span>
                            </motion.p>
                            <motion.div {...inView(0.1)} className="space-y-6">
                                <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-lg sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                    WorldForge is in active development. It is not finished, and it may not be
                                    finished for a long time.
                                </p>
                                <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    The core systems are being designed and built to support the permanence model.
                                    That means getting the foundations right before anything else. World state.
                                    History. Identity. The mechanics that make consequences real.
                                </p>
                                <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    There is no beta date. There is no launch window. What exists right now is a
                                    growing system being built with the patience the concept requires.
                                </p>
                                <p className="text-neutral-400 leading-relaxed sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    The First Crossing is the name for the initial group of people who will enter
                                    WorldForge before it opens to the public. That group is small by design.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Waitlist — The First Crossing */}
                    <section
                        id="waitlist"
                        className="relative py-36 max-sm:py-10 overflow-hidden border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
                        <div className="max-w-xl relative">
                            {/* Soft dark radial gradient behind content on mobile */}
                            <div
                                className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                                }}
                                aria-hidden="true"
                            />
                            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4">
                                The First Crossing
                            </motion.p>
                            <motion.div {...inView(0.1)} className="space-y-5 mb-12">
                                <p className="text-2xl md:text-3xl font-bold text-accent-purple leading-tight">
                                    Join the First Crossing.
                                </p>
                                <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    A small group will enter WorldForge before it opens publicly. They will shape
                                    the first histories, build the first civilizations, and leave the first legacies.
                                </p>
                                <p className="text-neutral-400 leading-relaxed sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    Leave your email. We will reach out when the time comes.
                                </p>
                            </motion.div>
                            <motion.div
                                ref={waitlistRef}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <WaitlistForm />
                            </motion.div>
                        </div>
                    </section>

                    {/* Follow development */}
                    <section id="follow-development" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
                        <div className="max-w-xl relative">
                            {/* Soft dark radial gradient behind content on mobile */}
                            <div
                                className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                                }}
                                aria-hidden="true"
                            />
                            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4">
                                Follow development
                            </motion.p>
                            <motion.div {...inView(0.1)} className="space-y-5 mb-12">
                                <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                    WorldForge is being built in public, seriously and without a deadline.
                                </p>
                                <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                    Not a steady stream of updates. Just occasional signals when something real
                                    happens. If you want to follow along without committing to anything, the
                                    contact page is the right place.
                                </p>
                            </motion.div>
                            <motion.div {...inView(0.2)} className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={handleJoinClick}
                                    className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
                                >
                                    Join the First Crossing
                                </Button>
                                <Link href="/contact">
                                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                        Get in touch
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </div>

                {/* Sticky side panel */}
                <ProjectSidePanel sections={sections} links={links} currentSlug="worldforge" />
            </Container>

            {/* Enter WorldForge */}
            <section className="relative py-36 sm:py-16 px-6 overflow-hidden border-t border-neutral-800/60 sm:border-t-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
                <Container>
                    <div className="max-w-xl relative">
                        {/* Soft dark radial gradient behind content on mobile */}
                        <div
                            className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                            style={{
                                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
                            }}
                            aria-hidden="true"
                        />
                        <motion.h2 {...inView()} className="text-4xl md:text-5xl font-bold text-accent-purple mb-6 leading-tight">
                            Enter WorldForge
                        </motion.h2>
                        <motion.p {...inView(0.1)} className="text-neutral-400 leading-relaxed text-pretty mb-12 sm:text-neutral-200 sm:text-readable max-sm:text-neutral-200 max-sm:text-readable">
                            The current build is live. Explore the world as it exists today — unfinished,
                            growing, and already permanent.
                        </motion.p>
                        <motion.div {...inView(0.2)}>
                            <a
                                href="https://worldforge-phi.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="lg"
                                    variant="primary"
                                    className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
                                >
                                    Enter WorldForge
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Mobile drawer */}
            <ProjectDrawer sections={sections} links={links} currentSlug="worldforge" />
        </>
    );
}
