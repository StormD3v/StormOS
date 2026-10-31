'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProjectPager } from '@/components/ProjectPager';

interface Section {
  id: string;
  label: string;
}

interface Link {
  label: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
}

interface ProjectSidePanelProps {
  sections: Section[];
  links?: Link[];
  currentSlug?: string;
}

export function ProjectSidePanel({ sections, links, currentSlug }: ProjectSidePanelProps) {
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('');

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block self-start lg:sticky lg:top-28">
      <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 space-y-8">
        {/* Links */}
        {links && links.length > 0 && (
          <div>
            <p className="section-label mb-4">Links</p>
            <div className="space-y-3">
              {links.map((link) => (
                link.onClick ? (
                  <Button
                    key={link.href}
                    size="md"
                    variant="primary"
                    onClick={link.onClick}
                    className="w-full bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
                  >
                    {link.label}
                  </Button>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <Button size="md" variant="secondary" className="w-full">
                      {link.label}
                    </Button>
                  </a>
                )
              ))}
            </div>
          </div>
        )}

        {/* On this page */}
        <div>
          <p className="section-label mb-4">On this page</p>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm transition-colors duration-fast ${
                    activeSection === section.id
                      ? 'text-accent-purple font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Project navigation */}
        {currentSlug && <ProjectPager currentSlug={currentSlug} />}
      </div>
    </aside>
  );
}
