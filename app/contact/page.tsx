'use client';

import { PageWrapper } from '@/components/layout/page-wrapper';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <PageWrapper>
      <Container className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-neutral-400 mb-12 max-w-3xl">
            Have a project in mind? Let&apos;s talk about how we can work together.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card variant="elevated">
              <h2 className="text-2xl font-semibold text-storm-blue mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Message
                  </label>
                  <Textarea id="message" rows={6} placeholder="Tell me about your project..." />
                </div>
                <Button size="lg" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card variant="elevated">
                <h2 className="text-2xl font-semibold text-storm-blue mb-4">Let&apos;s Connect</h2>
                <p className="text-neutral-400 mb-6">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the channels below.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-center gap-3 text-neutral-300 hover:text-storm-blue transition-colors"
                  >
                    <Mail size={20} />
                    hello@example.com
                  </a>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <MapPin size={20} />
                    Remote / Worldwide
                  </div>
                </div>
              </Card>

              <Card variant="elevated">
                <h2 className="text-2xl font-semibold text-storm-blue mb-4">Follow Me</h2>
                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-neutral-800 text-neutral-300 hover:text-storm-blue hover:bg-neutral-700 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-neutral-800 text-neutral-300 hover:text-storm-blue hover:bg-neutral-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-neutral-800 text-neutral-300 hover:text-storm-blue hover:bg-neutral-700 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={24} />
                  </a>
                </div>
              </Card>

              <Card variant="elevated">
                <h2 className="text-2xl font-semibold text-storm-blue mb-4">Availability</h2>
                <p className="text-neutral-400">
                  I&apos;m currently open to new opportunities and freelance projects. If you have something exciting in mind, let&apos;s chat!
                </p>
              </Card>
            </div>
          </div>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
