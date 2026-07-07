'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

// Section entrance
const sectionEntrance = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
};

// Card entrance with stagger
const cardEntrance = (index: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: {
        duration: 0.6,
        delay: 0.1 + index * 0.12,
        ease: [0.215, 0.61, 0.355, 1] as const,
    },
});

export function Building() {
    return (
        <section id="building" className="py-32 px-6">
            <Container>
                {/* Section header */}
                <motion.div {...sectionEntrance} className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-5 leading-tight">
                        What I&apos;m Building
                    </h2>
                    <p className="text-lg text-neutral-500 max-w-xl leading-relaxed">
                        Every project begins with a question worth answering.
                        <br className="hidden sm:block" />
                        Some answers take years.
                    </p>
                </motion.div>

                {/* Product grid — asymmetric: WorldForge spans 2 cols on lg */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* WorldForge — featured, spans 2 columns */}
                    <motion.div {...cardEntrance(0)} className="lg:col-span-2">
                        <Link
                            href="/worldforge"
                            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                        >
                            <div className="relative h-full min-h-[260px] rounded-2xl bg-neutral-900 border border-accent-purple/20 p-8 overflow-hidden transition-all duration-[300ms] group-hover:border-accent-purple/50 group-hover:-translate-y-1 group-hover:shadow-[0_0_40px_rgba(191,90,242,0.12)]">
                                {/* Ambient purple gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent pointer-events-none" />

                                <div className="relative flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <Badge
                                            variant="info"
                                            className="bg-accent-purple/15 text-accent-purple border-accent-purple/30 text-xs font-medium"
                                        >
                                            In Development
                                        </Badge>
                                        <ArrowUpRight
                                            size={18}
                                            className="text-neutral-600 group-hover:text-accent-purple transition-colors duration-[200ms]"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="text-3xl font-bold text-accent-purple mb-4 leading-tight">
                                        WorldForge
                                    </h3>

                                    <p className="text-neutral-400 text-base leading-relaxed max-w-md mt-auto">
                                        A living world where people build identities, civilizations, and legacies
                                        that outlive them.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Right column — Real Weather + More coming */}
                    <div className="flex flex-col gap-5">

                        {/* Real Weather */}
                        <motion.div {...cardEntrance(1)} className="flex-1">
                            <div className="group h-full min-h-[140px] rounded-2xl bg-neutral-900 border border-neutral-800 p-7 transition-all duration-[300ms] hover:border-neutral-700 hover:-translate-y-1">
                                <div className="flex items-start justify-between mb-5">
                                    <Badge
                                        variant="success"
                                        asStatus
                                        className="text-xs font-medium"
                                    >
                                        Available
                                    </Badge>
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-100 mb-3">
                                    Real Weather
                                </h3>
                                <p className="text-neutral-500 text-sm leading-relaxed">
                                    Real Weather turns forecasts into decisions.
                                </p>
                            </div>
                        </motion.div>

                        {/* More coming — dashed, lower visual weight */}
                        <motion.div {...cardEntrance(2)}>
                            <div className="rounded-2xl border border-dashed border-neutral-800 p-7 opacity-50">
                                <h3 className="text-base font-medium text-neutral-500 mb-2">
                                    More coming&hellip;
                                </h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">
                                    Some ideas need more time.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
