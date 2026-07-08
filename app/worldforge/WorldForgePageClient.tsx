'use client';

import { useRef } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { WaitlistForm } from '@/components/sections/waitlist-form';
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
                            Flagship Project
                        </motion.p>
                        <motion.h1
                            {...reveal(0.08)}
                            className="text-6xl md:text-7xl font-bold text-accent-purple mb-10 leading-tight"
                        >
                            WorldForge
                        </motion.h1>
                        <motion.div {...reveal(0.16)} className="space-y-5">
                            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
                                WorldForge is a living world, built around permanence.
                            </p>
                            <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                                Every decision you make becomes part of its history.
                                Every person who enters leaves a legacy that outlasts them.
                            </p>
                            <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                                People do not simply visit WorldForge. They become part of it.
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
                                WorldForge is a persistent social world. It continues whether you are
                                present or not.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                The kind of world that accumulates. Where a decision made in the first month
                                still matters in the third year. Where civilizations rise, collapse, and leave
                                traces that future people inherit without knowing it. Your choices do not
                                exist in isolation. They become part of a shared, permanent history.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                Who you are inside WorldForge is not what you claim. It is what you have done,
                                what you have built, and what you have left behind. Legacy is the only currency
                                that survives.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                There are no resets. There is only history.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Where it is now */}
            <section className="py-32 px-6 bg-neutral-900/30 border-t border-neutral-800/60">
                <Container>
                    <div className="max-w-2xl">
                        <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
                            Where it is now
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-6">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                                WorldForge is in active development. It is not finished, and it may not be
                                finished for a long time.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                The core systems are being designed and built to support the permanence model.
                                That means getting the foundations right before anything else. World state.
                                History. Identity. The mechanics that make consequences real.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                There is no beta date. There is no launch window. What exists right now is a
                                growing system being built with the patience the concept requires.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                The First Crossing is the name for the initial group of people who will enter
                                WorldForge before it opens to the public. That group is small by design.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Waitlist — The First Crossing */}
            <section
                id="waitlist"
                className="relative py-36 px-6 overflow-hidden border-t border-neutral-800/60"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
                <Container>
                    <div className="max-w-xl">
                        <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-accent-purple/70 mb-10">
                            The First Crossing
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-5 mb-12">
                            <p className="text-2xl md:text-3xl font-bold text-accent-purple leading-tight">
                                Join the First Crossing.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
                                A small group will enter WorldForge before it opens publicly. They will shape
                                the first histories, build the first civilizations, and leave the first legacies.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
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
                </Container>
            </section>

            {/* Follow development */}
            <section className="py-32 px-6 border-t border-neutral-800/60">
                <Container>
                    <div className="max-w-xl">
                        <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
                            Follow development
                        </motion.p>
                        <motion.div {...inView(0.1)} className="space-y-5 mb-12">
                            <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                                WorldForge is being built in public, seriously and without a deadline.
                            </p>
                            <p className="text-neutral-400 leading-relaxed text-pretty">
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
                </Container>
            </section>
        </>
    );
}
