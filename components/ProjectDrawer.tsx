'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
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

interface ProjectDrawerProps {
  sections: Section[];
  links?: Link[];
  currentSlug?: string;
}

export function ProjectDrawer({ sections, links, currentSlug }: ProjectDrawerProps) {
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
    setIsOpen(false);
  }

  function handleLinkClick() {
    setIsOpen(false);
  }

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Tab */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 lg:hidden w-8 h-16 rounded-l-full bg-accent-purple flex items-center justify-center shadow-[0_0_20px_rgba(191,90,242,0.4)] hover:shadow-[0_0_30px_rgba(191,90,242,0.6)] transition-shadow duration-fast z-40 pr-safe-right"
          aria-label="Open project menu"
          aria-expanded={isOpen}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-[85vw] max-w-sm bg-neutral-950/95 border-l border-white/10 pt-20 p-6 z-50 lg:hidden transition-transform duration-300 overflow-y-auto overscroll-contain ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${reducedMotion ? 'transition-none' : ''}`}
        style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top))' }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="space-y-8">
          {/* Links */}
          {links && links.length > 0 && (
            <div>
              <p className="section-label mb-4 text-white text-readable">Links</p>
              <div className="space-y-3">
                {links.map((link) => (
                  link.onClick ? (
                    <Button
                      key={link.href}
                      size="md"
                      variant="primary"
                      onClick={() => {
                        link.onClick?.();
                        handleLinkClick();
                      }}
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
                      onClick={handleLinkClick}
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
            <p className="section-label mb-4 text-white text-readable">On this page</p>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-neutral-100 text-readable hover:text-accent-purple transition-colors text-left w-full"
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
      </div>
    </>
  );
}
