'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { UnifiedCard, getStatusBadge } from '@/components/ui/project-card';
import { projects } from '@/content/projects';

export function ProjectsGrid() {
    if (projects.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-neutral-400 text-lg">Projects coming soon</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {projects.map((project, index) => {
                const badge = getStatusBadge(project.status);
                const card = (
                    <UnifiedCard project={project} badge={badge} navigable={Boolean(project.route || project.links?.external)} compact />
                );

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.215, 0.61, 0.355, 1],
                        }}
                        className="h-full"
                    >
                        {project.route ? (
                            <Link
                                href={project.route}
                                className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                            >
                                {card}
                            </Link>
                        ) : project.links?.external ? (
                            <a
                                href={project.links.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-2xl"
                            >
                                {card}
                            </a>
                        ) : (
                            <div className="h-full">{card}</div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
