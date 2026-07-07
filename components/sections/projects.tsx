'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/content/projects';
import { truncateTags } from '@/lib/utils';

const featuredProjects = projects.filter((p) => p.featured);

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 bg-neutral-900/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl">
            A selection of my recent work and personal projects
          </p>

          {featuredProjects.length === 0 ? (
            <Card variant="elevated" className="text-center py-16">
              <p className="text-neutral-400 text-lg">Projects coming soon</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => {
                const { visible: visibleTags, overflow } = truncateTags(project.tags);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                  >
                    <Card variant="interactive" className="h-full flex flex-col">
                      {/* Status badge */}
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

                      <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 mb-4 flex-1">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {visibleTags.map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                        {overflow > 0 && (
                          <Badge variant="default">+{overflow} more</Badge>
                        )}
                      </div>

                      {/* Links */}
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
          )}

          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button size="lg" variant="secondary">
                View All Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
