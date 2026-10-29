'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';
import { ArrowUpRight } from 'lucide-react';
import { MobileBackground } from '@/components/ui/mobile-background';
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
        <section id="building" className="py-28 px-6 relative">
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
                <motion.div {...sectionEntrance} className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                        Active Projects
                    </h2>
                    <p className="text-lg text-neutral-500 max-w-xl leading-relaxed sm:text-neutral-500 sm:!text-shadow-none max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
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
                            <div className="rounded-2xl border border-dashed border-neutral-800 p-7 relative">
                                {/* Soft dark radial gradient behind text on mobile */}
                                <div
                                    className="absolute inset-0 sm:hidden -z-10"
                                    style={{
                                        background: 'radial-gradient(closest-side, rgba(7,6,11,0.65) 0%, transparent 100%)',
                                    }}
                                    aria-hidden="true"
                                />
                                <h3 className="text-lg font-medium text-neutral-200 sm:text-neutral-200 mb-2 relative z-10 max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                                    More coming
                                </h3>
                                <p className="text-neutral-300 text-base leading-relaxed sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)] relative z-10">
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
                'group relative h-full min-h-[260px] sm:min-h-[360px] rounded-2xl bg-neutral-900 max-sm:bg-white/[0.06] max-sm:backdrop-blur-md',
                'border border-accent-purple/20 max-sm:border-white/15 p-8 overflow-hidden',
                isNavigable && 'transition-all duration-300 group-hover:border-accent-purple/50 group-hover:-translate-y-1 group-hover:shadow-[0_0_40px_rgba(191,90,242,0.10)] sm:group-hover:shadow-[0_0_50px_rgba(191,90,242,0.15)] hover-orbit'
            )}
        >
            {/* Ambient purple atmosphere (mobile only) */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent pointer-events-none sm:hidden"
                aria-hidden="true"
            />

            {/* Desktop background image */}
            <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 transition-transform duration-500 sm:group-hover:scale-[1.03] motion-reduce:transform-none"
                >
                    <Image
                        src="/images/wallpaper-worldforge.webp"
                        alt=""
                        fill
                        sizes="100%"
                        className="object-cover opacity-70"
                        aria-hidden="true"
                    />
                </div>
                {/* Bottom-only dark gradient for text readability */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0) 100%)',
                    }}
                    aria-hidden="true"
                />
            </div>

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

                <p className="text-neutral-200 text-base leading-relaxed max-w-md mt-auto sm:text-neutral-200 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.7)] sm:text-lg">
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
    // Map project ID to wallpaper image
    const wallpaperMap: Record<string, string> = {
        lumicast: '/images/wallpaper-lumicast.webp',
        stormcash: '/images/wallpaper-stormcash.webp',
    };
    const wallpaperSrc = wallpaperMap[project.id];

    return (
        <div
            className={cn(
                'group relative h-full min-h-[140px] rounded-2xl bg-neutral-900 max-sm:bg-white/[0.06] max-sm:backdrop-blur-md border border-neutral-800 max-sm:border-white/15 p-7 overflow-hidden',
                navigable && 'transition-all duration-300 group-hover:border-accent-purple/40 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_30px_rgba(191,90,242,0.08)] hover-orbit'
            )}
            role={navigable ? undefined : 'article'}
        >
            {/* Desktop background image */}
            {wallpaperSrc && (
                <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 transition-transform duration-500 sm:group-hover:scale-[1.03] motion-reduce:transform-none"
                    >
                        <Image
                            src={wallpaperSrc}
                            alt=""
                            fill
                            sizes="100%"
                            className="object-cover opacity-20"
                            aria-hidden="true"
                        />
                    </div>
                    {/* Left-to-right dark gradient for text readability */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.25) 100%)',
                        }}
                        aria-hidden="true"
                    />
                </div>
            )}

            <div className="relative">
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
                <h3 className="text-xl font-bold text-white mb-3">
                    {project.displayName ?? project.title}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    {project.description}
                </p>
            </div>
        </div>
    );
}
