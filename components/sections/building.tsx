'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';
import { MobileBackground } from '@/components/ui/mobile-background';
import { Button } from '@/components/ui/button';
import { UnifiedCard, getStatusBadge } from '@/components/ui/project-card';
import { projects } from '@/content/projects';

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
        <section id="building" className="py-28 max-sm:pt-8 max-sm:pb-8 sm:pt-20 sm:pb-12 px-6 relative">
            {/* Solid dark background fallback */}
            <div className="absolute inset-0 bg-neutral-950 -z-30 sm:bg-transparent" />

            {/* Mobile background image with seamless blending and effects */}
            <MobileBackground src="/images/descent-projects.webp" effects="none" />

            {/* Soft dark gradient behind project cards on mobile */}
            <div
                className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
                style={{
                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.6) 0%, transparent 100%)',
                }}
                aria-hidden="true"
            />

            <Container>
                {/* Section header */}
                <motion.div {...sectionEntrance} className="mb-10 max-sm:mb-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                        Preview
                    </h2>
                </motion.div>

                {/* Desktop: equal cards in grid */}
                <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
                    {projects.filter(p => p.featured).slice(0, 5).map((project, index) => {
                        const badge = getStatusBadge(project.status);
                        return (
                            <motion.div
                                key={project.id}
                                {...cardEntrance(index)}
                                data-project-id={project.id}
                            >
                                {project.route ? (
                                    <Link
                                        href={project.route}
                                        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                                    >
                                        <UnifiedCard project={project} badge={badge} navigable />
                                    </Link>
                                ) : project.links?.external ? (
                                    <a
                                        href={project.links.external}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                                    >
                                        <UnifiedCard project={project} badge={badge} navigable />
                                    </a>
                                ) : (
                                    <div className="h-full" role="article">
                                        <UnifiedCard project={project} badge={badge} navigable={false} />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Desktop: slim full-width dashed bar */}
                <motion.div {...cardEntrance(projects.filter(p => p.featured).length)} className="hidden sm:block">
                    <div className="rounded-2xl border border-dashed border-neutral-800 p-4 relative">
                        <div className="flex items-center justify-center gap-3">
                            <h3 className="text-base font-medium text-neutral-200">More coming</h3>
                            <p className="text-neutral-300 text-sm">Some things need more time.</p>
                        </div>
                    </div>
                </motion.div>

                {/* View all projects button - desktop */}
                <motion.div {...cardEntrance(projects.filter(p => p.featured).length + 1)} className="hidden sm:flex justify-center mt-8">
                    <Link href="/projects">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="border border-neutral-700"
                        >
                            View all projects
                        </Button>
                    </Link>
                </motion.div>

                {/* Mobile: horizontal swipeable row */}
                <div className="sm:hidden flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory -mx-6 px-6 py-4 scrollbar-hide">
                    {projects.filter(p => p.featured).slice(0, 5).map((project, index) => {
                        const badge = getStatusBadge(project.status);
                        return (
                            <motion.div
                                key={project.id}
                                {...cardEntrance(index)}
                                data-project-id={project.id}
                                className="w-[82%] shrink-0 snap-center"
                            >
                                {project.route ? (
                                    <Link
                                        href={project.route}
                                        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                                    >
                                        <UnifiedCard project={project} badge={badge} navigable mobile />
                                    </Link>
                                ) : project.links?.external ? (
                                    <a
                                        href={project.links.external}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                                    >
                                        <UnifiedCard project={project} badge={badge} navigable mobile />
                                    </a>
                                ) : (
                                    <div className="h-full" role="article">
                                        <UnifiedCard project={project} badge={badge} navigable={false} mobile />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Mobile placeholder - last card in row */}
                    <motion.div {...cardEntrance(projects.filter(p => p.featured).length)} className="w-[82%] shrink-0 snap-center">
                        <div className="rounded-2xl border border-dashed border-neutral-800 p-7 relative">
                            <div
                                className="absolute inset-0 -z-10"
                                style={{
                                    background: 'radial-gradient(closest-side, rgba(7,6,11,0.65) 0%, transparent 100%)',
                                }}
                                aria-hidden="true"
                            />
                            <h3 className="text-lg font-medium text-neutral-200 mb-2 relative z-10 max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                More coming
                            </h3>
                            <p className="text-neutral-300 text-base leading-relaxed max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)] relative z-10">
                                Some things need more time.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* View all projects button - mobile */}
                <motion.div {...cardEntrance(projects.filter(p => p.featured).length + 2)} className="sm:hidden mt-6">
                    <Link href="/projects" className="flex justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="border border-neutral-700"
                        >
                            View all projects
                        </Button>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
