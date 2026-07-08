'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';
import { ArrowUpRight } from 'lucide-react';
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

// Derive badge text and styling from project status
function getStatusBadge(status: string) {
    switch (status) {
        case 'in-progress':
            return {
                label: 'In Development',
                className: 'bg-accent-purple/15 text-accent-purple border border-accent-purple/30',
            };
        case 'completed':
            return {
                label: 'Available',
                className: 'bg-success/15 text-success border border-success/30',
            };
        case 'planned':
            return {
                label: 'Planned',
                className: 'bg-neutral-800 text-neutral-400 border border-neutral-700',
            };
        default:
            return {
                label: status,
                className: 'bg-neutral-800 text-neutral-400 border border-neutral-700',
            };
    }
}

export function Building() {
    // Flagship: the first featured in-progress project. When this changes in
    // content/projects.ts, the layout adapts automatically.
    const flagship = projects.find(p => p.featured && p.status === 'in-progress');
    const others = projects.filter(p => p !== flagship);

    return (
        <section id="building" className="py-28 px-6">
            <Container>
                {/* Section header */}
                <motion.div {...sectionEntrance} className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-5 leading-tight">
                        Active Projects
                    </h2>
                    <p className="text-lg text-neutral-500 max-w-xl leading-relaxed">
                        Two projects in active development. Others are forming.
                    </p>
                </motion.div>

                {/* Asymmetric grid — flagship spans 2 cols on large viewports */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Flagship item */}
                    {flagship && (
                        <motion.div
                            {...cardEntrance(0)}
                            className="lg:col-span-2"
                            data-project-id={flagship.id}
                        >
                            {flagship.route ? (
                                <Link
                                    href={flagship.route}
                                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                                >
                                    <FlagshipCard project={flagship} />
                                </Link>
                            ) : (
                                <div className="h-full">
                                    <FlagshipCard project={flagship} />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Secondary items + placeholder */}
                    <div className="flex flex-col gap-6">
                        {others.map((project, index) => {
                            const badge = getStatusBadge(project.status);
                            return (
                                <motion.div
                                    key={project.id}
                                    {...cardEntrance(index + 1)}
                                    className="flex-1 opacity-70"
                                    data-project-id={project.id}
                                >
                                    {project.route ? (
                                        <Link
                                            href={project.route}
                                            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                                        >
                                            <SecondaryCard project={project} badge={badge} navigable />
                                        </Link>
                                    ) : (
                                        <div className="h-full" role="article">
                                            <SecondaryCard project={project} badge={badge} navigable={false} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}

                        {/* Quiet future-ideas placeholder */}
                        <motion.div {...cardEntrance(others.length + 1)}>
                            <div className="rounded-2xl border border-dashed border-neutral-800 p-7 opacity-50">
                                <h3 className="text-base font-medium text-neutral-500 mb-2">
                                    More coming
                                </h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">
                                    Some things need more time.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

// Extracted to keep JSX readable — only used by flagship slot
function FlagshipCard({ project }: { project: typeof projects[0] }) {
    const badge = getStatusBadge(project.status);
    const isNavigable = Boolean(project.route);

    return (
        <div
            className={cn(
                'group relative h-full min-h-[260px] rounded-2xl bg-neutral-900',
                'border border-accent-purple/20 p-8 overflow-hidden',
                isNavigable && 'transition-all duration-300 group-hover:border-accent-purple/50 group-hover:-translate-y-1 group-hover:shadow-[0_0_40px_rgba(191,90,242,0.10)]'
            )}
        >
            {/* Ambient purple atmosphere */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <span
                        className={cn(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            badge.className
                        )}
                        role="status"
                    >
                        {badge.label}
                    </span>
                    {isNavigable && (
                        <ArrowUpRight
                            size={18}
                            className="text-neutral-600 group-hover:text-accent-purple transition-colors duration-200"
                            aria-hidden="true"
                        />
                    )}
                </div>

                <h3 className="text-3xl font-bold text-accent-purple mb-4 leading-tight">
                    {project.displayName ?? project.title}
                </h3>

                <p className="text-neutral-400 text-base leading-relaxed max-w-md mt-auto">
                    {project.description}
                </p>
            </div>
        </div>
    );
}

// Secondary card — used by non-flagship items
function SecondaryCard({
    project,
    badge,
    navigable,
}: {
    project: typeof projects[0];
    badge: ReturnType<typeof getStatusBadge>;
    navigable: boolean;
}) {
    return (
        <div
            className={cn(
                'group h-full min-h-[140px] rounded-2xl bg-neutral-900 border border-neutral-800 p-7',
                navigable && 'transition-all duration-300 group-hover:border-accent-purple/40 group-hover:-translate-y-0.5'
            )}
            role={navigable ? undefined : 'article'}
        >
            <div className="mb-5 flex items-center justify-between">
                <span
                    className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        badge.className
                    )}
                    role="status"
                >
                    {badge.label}
                </span>
                {navigable && (
                    <ArrowUpRight
                        size={16}
                        className="text-neutral-600 group-hover:text-accent-purple transition-colors duration-200"
                        aria-hidden="true"
                    />
                )}
            </div>
            <h3 className="text-xl font-semibold text-neutral-100 mb-3">
                {project.displayName ?? project.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
                {project.description}
            </p>
        </div>
    );
}
