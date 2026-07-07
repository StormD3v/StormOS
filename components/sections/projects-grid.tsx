'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
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
                    >
                        <Card variant="interactive" className="h-full flex flex-col">
                            {project.status === 'completed' && (
                                <Badge variant="success" asStatus className="self-start mb-3">
                                    Completed
                                </Badge>
                            )}
                            {project.status === 'in-progress' && (
                                <Badge variant="warning" asStatus className="self-start mb-3">
                                    In progress
                                </Badge>
                            )}

                            <h3 className="text-xl font-semibold text-neutral-100 mb-2">{project.title}</h3>
                            <p className="text-neutral-400 mb-4 flex-1">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {visibleTags.map((tag) => (
                                    <Badge key={tag} variant="default">{tag}</Badge>
                                ))}
                                {overflow > 0 && (
                                    <Badge variant="default">+{overflow} more</Badge>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {project.links.live && (
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        className="flex-1"
                                        onClick={() => window.open(project.links.live, '_blank')}
                                    >
                                        <ExternalLink size={16} className="mr-2" />
                                        Live
                                    </Button>
                                )}
                                {project.links.github && (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => window.open(project.links.github, '_blank')}
                                        aria-label={`View ${project.title} on GitHub`}
                                    >
                                        <Github size={16} />
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
