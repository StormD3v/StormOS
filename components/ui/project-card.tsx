'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Derive badge text and styling from project status
export function getStatusBadge(status: string) {
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
        case 'available':
            return {
                label: 'Available',
                className: 'bg-success/15 text-success border border-success/30',
            };
        case 'planned':
            return {
                label: 'Planned',
                className: 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50',
            };
        case 'prototype':
            return {
                label: 'Prototype',
                className: 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50',
            };
        default:
            return {
                label: 'Unknown',
                className: 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50',
            };
    }
}

// Unified card for desktop - used by homepage and projects page
export function UnifiedCard({
    project,
    badge,
    navigable,
    compact = false,
    mobile = false,
}: {
    project: any;
    badge: ReturnType<typeof getStatusBadge>;
    navigable: boolean;
    compact?: boolean;
    mobile?: boolean;
}) {
    const isNavigable = Boolean(project.route || project.links?.external);
    const isWorldForge = project.id === 'worldforge';

    // Map project ID to wallpaper image (reuse existing images for new projects)
    const wallpaperMap: Record<string, string> = {
        worldforge: '/images/wallpaper-worldforge.webp',
        lumicast: '/images/wallpaper-lumicast.webp',
        stormcash: '/images/wallpaper-stormcash.webp',
        'cookie-chain': '/images/wallpaper-stormcash.webp',
        stormframe: '/images/wallpaper-lumicast.webp',
    };
    const wallpaperSrc = wallpaperMap[project.id] || '/images/wallpaper-worldforge.webp';

    // Tag limiting for compact and mobile modes
    const maxTags = (compact || mobile) ? 3 : Infinity;
    const visibleTags = project.tags?.slice(0, maxTags) || [];
    const remainingTags = project.tags?.length - maxTags || 0;

    return (
        <div
            className={cn(
                'group relative h-full rounded-2xl bg-neutral-900 overflow-hidden',
                'border border-accent-purple/20',
                mobile ? 'min-h-[300px] p-6' : (compact ? 'min-h-[220px] p-5' : 'min-h-[380px] p-6'),
                !mobile && isNavigable && 'transition-all duration-300 group-hover:border-accent-purple/50 group-hover:-translate-y-1 group-hover:shadow-[0_0_40px_rgba(191,90,242,0.10)] sm:group-hover:shadow-[0_0_50px_rgba(191,90,242,0.15)] hover-orbit'
            )}
        >
            {/* Background image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        'absolute inset-0',
                        !mobile && 'transition-transform duration-500 sm:group-hover:scale-[1.03] motion-reduce:transform-none'
                    )}
                >
                    <Image
                        src={wallpaperSrc}
                        alt=""
                        fill
                        sizes="100%"
                        className="object-cover opacity-70"
                        aria-hidden="true"
                    />
                </div>
                {/* Bottom-only dark gradient for text readability - stronger on mobile */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: mobile
                            ? 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.2) 100%)'
                            : 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0) 100%)',
                    }}
                    aria-hidden="true"
                />
            </div>

            <div className="relative flex flex-col h-full">
                <div className={cn('flex items-start justify-between', mobile ? 'mb-4' : (compact ? 'mb-3' : 'mb-4'))}>
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
                            size={mobile ? 18 : (compact ? 16 : 18)}
                            className="text-neutral-600 group-hover:text-accent-purple transition-colors duration-200"
                            aria-hidden="true"
                        />
                    )}
                </div>

                <h3 className={cn(
                    'font-bold leading-tight',
                    mobile ? 'text-2xl mb-3' : (compact ? 'text-lg mb-2' : 'text-2xl mb-3'),
                    isWorldForge ? 'text-accent-purple' : 'text-white'
                )}>
                    {project.displayName ?? project.title}
                </h3>

                <p className={cn(
                    'text-neutral-200 leading-relaxed',
                    mobile ? 'text-sm mb-4' : (compact ? 'text-sm line-clamp-2 mb-3' : 'text-sm mb-4')
                )}>
                    {project.description}
                </p>

                {/* Tech stack chips - only if tags exist */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {visibleTags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800/50 text-neutral-300 border border-neutral-700/50"
                            >
                                {tag}
                            </span>
                        ))}
                        {remainingTags > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800/50 text-neutral-300 border border-neutral-700/50">
                                +{remainingTags}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
