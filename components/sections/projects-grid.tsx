'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/content/projects';
import { truncateTags } from '@/lib/utils';

export function ProjectsGrid() {
    if (projects.length === 0) {
        return (
            <Card variant="elevated" className="text-center py-16">
                <p className="text-neutral-400 text-lg">Projects coming soon</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
                const { visible: visibleTags, overflow } = truncateTags(project.tags);
                const card = (
                    <Card variant="interactive" className="h-full flex flex-col group">
                        {project.status === 'completed' && (
                            <Badge variant="success" asStatus className="self-start mb-3">
                                Available
                            </Badge>
                        )}
                        {project.status === 'in-progress' && (
                            <Badge variant="warning" asStatus className="self-start mb-3">
                                In development
                            </Badge>
                        )}

                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-neutral-100">{project.displayName ?? project.title}</h3>
                            {project.route && (
                                <ArrowUpRight
                                    size={17}
                                    className="text-neutral-600 group-hover:text-accent-purple transition-colors duration-200 shrink-0 ml-2 mt-0.5"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                        <p className="text-neutral-400 mb-4 flex-1">{project.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {visibleTags.map((tag) => (
                                <Badge key={tag} variant="default">{tag}</Badge>
                            ))}
                            {overflow > 0 && (
                                <Badge variant="default">+{overflow} more</Badge>
                            )}
                        </div>
                    </Card>
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
                        ) : (
                            card
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
