'use client';

import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WaitlistForm } from '@/components/sections/waitlist-form';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Clock, Zap } from 'lucide-react';

export default function WorldForgePage() {
  const features = [
    {
      icon: Zap,
      title: 'Real-Time Collaboration',
      description: 'Work together with your team in real-time, seeing changes as they happen.',
    },
    {
      icon: Sparkles,
      title: 'Procedural Generation',
      description: 'Generate vast, unique worlds with our advanced procedural generation algorithms.',
    },
    {
      icon: CheckCircle,
      title: 'Cross-Platform',
      description: 'Access your worlds from any device, anywhere, with full feature parity.',
    },
  ];

  const roadmap = [
    {
      phase: 'Phase 1',
      status: 'completed',
      title: 'Foundation',
      items: ['Core architecture', 'Basic world generation', 'User authentication'],
    },
    {
      phase: 'Phase 2',
      status: 'in-progress',
      title: 'Collaboration',
      items: ['Real-time sync', 'Multiplayer support', 'Chat system'],
    },
    {
      phase: 'Phase 3',
      status: 'planned',
      title: 'AI Integration',
      items: ['AI-assisted creation', 'Smart suggestions', 'Automated testing'],
    },
  ];

  return (
    <PageWrapper>
      <Container className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Badge */}
          <Badge variant="info" className="bg-accent-purple/20 text-accent-purple border-accent-purple/30 mb-6">
            <Sparkles size={14} className="mr-1" />
            Flagship Project
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-accent-purple mb-6">
            WorldForge
          </h1>
          <p className="text-xl text-neutral-400 mb-12 max-w-3xl">
            Building the future of collaborative world-building. Create, share, and collaborate on immersive worlds together.
          </p>

          {/* Vision */}
          <Card variant="elevated" className="border-accent-purple/30 mb-12">
            <h2 className="text-2xl font-semibold text-accent-purple mb-4">Our Vision</h2>
            <p className="text-neutral-400 leading-relaxed">
              WorldForge is a revolutionary platform that enables creators to build, share, and collaborate on immersive worlds together. We believe that creativity is a collaborative process, and our tools are designed to bring people together to create something greater than the sum of its parts.
            </p>
          </Card>

          {/* Features */}
          <h2 className="text-3xl font-bold text-neutral-100 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <Card variant="elevated" className="border-accent-purple/30 h-full">
                  <feature.icon className="w-8 h-8 text-accent-purple mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Roadmap */}
          <h2 className="text-3xl font-bold text-neutral-100 mb-6">Roadmap</h2>
          <div className="space-y-6 mb-12">
            {roadmap.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <Card variant="elevated" className="border-accent-purple/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {item.status === 'completed' && (
                        <CheckCircle className="w-6 h-6 text-success" />
                      )}
                      {item.status === 'in-progress' && (
                        <Clock className="w-6 h-6 text-warning" />
                      )}
                      {item.status === 'planned' && (
                        <div className="w-6 h-6 rounded-full border-2 border-neutral-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-neutral-100">
                          {item.title}
                        </h3>
                        <Badge variant="default">{item.phase}</Badge>
                      </div>
                      <ul className="space-y-1 text-neutral-400">
                        {item.items.map((roadmapItem) => (
                          <li key={roadmapItem}>• {roadmapItem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <Card variant="elevated" className="border-accent-purple/30 text-center">
            <h2 className="text-2xl font-semibold text-accent-purple mb-4">
              Join the Waitlist
            </h2>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Be the first to know when WorldForge launches. Get early access and exclusive updates.
            </p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </Card>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
