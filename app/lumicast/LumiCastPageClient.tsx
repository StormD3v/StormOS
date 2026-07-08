'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

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

export function LumiCastPageClient() {
    const reducedMotion = useReducedMotion();

    return (
        <>
            {/* Hero */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-950 -z-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10" />
                <motion.div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-3xl -z-10"
                    initial={{ opacity: 0.3 }}
                    animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.3, 0.5, 0.3] }}
                    transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                />
                <Container>
                    <div className="max-w-2xl">
                        <motion.p
                            {...reveal(0)}
                            className="text-xs font-semibold tracking-widest uppercase text-accent-purple/70 mb-8"
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
                            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
                                Weather, translated into decisions.
                            </p>
                            <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                                Not raw data. Not a radar map. Just what you actually need to know
                                before you leave the house.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* What it is */}
            <section className="py-32 px-6 border-t border-neutral-800/60">
                <Container>
                    <div className="max-w-2xl">
                        <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
                            What it is
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-6">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                                LumiCast is a weather application built around one question: what
                                should I actually do today?
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                Most weather apps present information. LumiCast presents decisions.
                                It takes the forecast and translates it into plain language — carry an
                                umbrella, leave early, skip the run. The kind of guidance you used to
                                get from someone who had already checked.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                The interface is clean by design. No radar loops, no hourly graphs,
                                no probability percentages. Just the day ahead, clearly stated.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Why it exists */}
            <section className="py-32 px-6 bg-neutral-900/30 border-t border-neutral-800/60">
                <Container>
                    <div className="max-w-2xl">
                        <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
                            Why it exists
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-6">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                                Weather data is abundant. Useful weather communication is not.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                The gap between knowing the forecast and knowing what to do about it
                                is surprisingly wide. LumiCast was built to close that gap — not by
                                adding more data, but by doing the interpretation work upfront so
                                you do not have to.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                It is also a proof of concept for a broader idea: that software can
                                be genuinely helpful without being complicated. LumiCast is small,
                                focused, and finished.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Where it is going */}
            <section className="py-32 px-6 border-t border-neutral-800/60">
                <Container>
                    <div className="max-w-2xl">
                        <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
                            Where it is going
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-6">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                                LumiCast is live and working. It is not under heavy active development
                                right now. Most of the current focus is on WorldForge.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                That said, the core idea has room to grow. Location-aware defaults,
                                smarter decision framing, a cleaner mobile experience. None of these
                                are imminent. They will happen when the time is right.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                For now, it does what it was built to do.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Launch LumiCast */}
            <section className="relative py-36 px-6 overflow-hidden border-t border-neutral-800/60">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
                <Container>
                    <div className="max-w-xl">
                        <motion.h2 {...inView()} className="text-4xl md:text-5xl font-bold text-accent-purple mb-6 leading-tight">
                            Launch LumiCast
                        </motion.h2>
                        <motion.p {...inView(0.1)} className="text-neutral-400 leading-relaxed text-pretty mb-12">
                            The application is live. See what the day is actually asking of you.
                        </motion.p>
                        <motion.div {...inView(0.2)}>
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
                </Container>
            </section>
        </>
    );
}
