'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { DesktopPageHero } from '@/components/ui/desktop-page-hero';
import { ProjectSidePanel } from '@/components/ProjectSidePanel';
import { ProjectPager } from '@/components/ProjectPager';
import { ProjectDrawer } from '@/components/ProjectDrawer';

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
    { id: 'why-it-exists', label: 'Why it exists' },
    { id: 'where-it-is-going', label: 'Where it is going' },
];

const links = [
    { label: 'Launch LumiCast', href: 'https://real-weather-rho.vercel.app/', external: true },
];

export function LumiCastPageClient() {
    const reducedMotion = useReducedMotion();

    return (
        <>
            {/* Hero */}
            <section className="relative pt-10 max-sm:pt-14 sm:pt-40 pb-32 sm:pb-12 max-sm:pb-8 px-6 sm:overflow-visible overflow-hidden">
                <DesktopPageHero src="/images/lumicast-desktop.webp" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10 sm:bg-transparent" />
                <motion.div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-3xl -z-10 sm:hidden"
                    initial={{ opacity: 0.3 }}
                    animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.3, 0.5, 0.3] }}
                    transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                />
                <Container>
                    <div className="max-w-2xl relative">
                        {/* Soft dark radial gradient behind content on mobile */}
                        <div
                            className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                            style={{
                                background: 'radial-gradient(closest-side, rgba(7,6,11,0.6) 0%, transparent 100%)',
                            }}
                            aria-hidden="true"
                        />
                        <motion.p
                            {...reveal(0)}
                            className="section-label mb-8 max-sm:mb-4"
                        >
                            Available Now
                        </motion.p>
                        <motion.h1
                            {...reveal(0.08)}
                            className="text-6xl md:text-7xl font-bold text-accent-purple mb-10 leading-tight"
                        >
                            LumiCast
                        </motion.h1>
                        <motion.div {...reveal(0.16)} className="space-y-5">
                            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-readable">
                                Weather, translated into decisions.
                            </p>
                            <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-200 sm:text-readable max-sm:text-neutral-200 max-sm:text-readable">
                                Not raw data. Not a radar map. Just what you actually need to know
                                before you leave the house.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Content sections with sticky side panel */}
            <Container className="lg:grid lg:grid-cols-[minmax(0,48rem)_300px] lg:gap-20 px-6">
                {/* Main content */}
                <div>
                    {/* What it is */}
                    <section id="what-it-is" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
                        <div className="max-w-2xl relative">
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
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                LumiCast is a weather application built around one question: what
                                should I actually do today?
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                Most weather apps present information. LumiCast presents decisions.
                                It takes the forecast and translates it into plain language — carry an
                                umbrella, leave early, skip the run. The kind of guidance you used to
                                get from someone who had already checked.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                The interface is clean by design. No radar loops, no hourly graphs,
                                no probability percentages. Just the day ahead, clearly stated.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Why it exists */}
                <section id="why-it-exists" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
                    <div className="max-w-2xl relative">
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
                            <span>Why it exists</span>
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-6">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                Weather data is abundant. Useful weather communication is not.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                The gap between knowing the forecast and knowing what to do about it
                                is surprisingly wide. LumiCast was built to close that gap — not by
                                adding more data, but by doing the interpretation work upfront so
                                you do not have to.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                It is also a proof of concept for a broader idea: that software can
                                be genuinely helpful without being complicated. LumiCast is small,
                                focused, and finished.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Where it is going */}
                <section id="where-it-is-going" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
                    <div className="max-w-2xl relative">
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
                            <span>Where it is going</span>
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-6">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                                LumiCast is live and working. It is not under heavy active development
                                right now. Most of the current focus is on WorldForge.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                That said, the core idea has room to grow. Location-aware defaults,
                                smarter decision framing, a cleaner mobile experience. None of these
                                are imminent. They will happen when the time is right.
                            </p>
                            <p className="text-neutral-400 leading-relaxed sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                                For now, it does what it was built to do.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Launch LumiCast */}
                <section className="relative py-36 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
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
                        <motion.h2 {...inView()} className="text-4xl md:text-5xl font-bold text-accent-purple mb-6 leading-tight">
                            Launch LumiCast
                        </motion.h2>
                        <motion.p {...inView(0.1)} className="text-neutral-400 leading-relaxed text-pretty mb-12 sm:text-neutral-200 sm:text-readable max-sm:text-neutral-200 max-sm:text-readable">
                            The application is live. See what the day is actually asking of you.
                        </motion.p>
                        <motion.div {...inView(0.2)} className="lg:hidden">
                            <a
                                href="https://real-weather-rho.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="lg"
                                    variant="primary"
                                    className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
                                >
                                    Launch LumiCast
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </section>
                </div>

                {/* Sticky side panel */}
                <ProjectSidePanel sections={sections} links={links} currentSlug="lumicast" />
            </Container>

            {/* Mobile drawer */}
            <ProjectDrawer sections={sections} links={links} currentSlug="lumicast" />
        </>
    );
}
