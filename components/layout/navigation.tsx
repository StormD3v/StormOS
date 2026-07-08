'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/use-active-section';

const navLinks = [
  { name: 'Projects', href: '/#building', sectionId: 'building' },
  { name: 'WorldForge', href: '/worldforge', sectionId: undefined },
  { name: 'LumiCast', href: '/lumicast', sectionId: undefined },
  { name: 'Identity', href: '/about', sectionId: undefined },
  { name: 'Contact', href: '/contact', sectionId: undefined },
];

// Determines active state — uses section intersection on homepage, pathname elsewhere.
// When on the homepage and no section is active yet (null), no link is highlighted
// until the observer fires. This is intentional — the arrival overlay covers the
// page briefly, after which the hero section becomes active naturally.
function isActive(link: typeof navLinks[0], pathname: string, activeSection: string | null): boolean {
  if (pathname === '/' && link.sectionId) {
    return activeSection === link.sectionId;
  }
  if (link.href.startsWith('/#')) return pathname === '/';
  return pathname === link.href;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(['hero', 'building', 'worldforge', 'about', 'contact']);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus trap + Escape handler
  function handleMenuKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      menuButtonRef.current?.focus();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex="0"]'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-sticky bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/60"
    >
      <div className="mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            aria-label="StormD3v — home"
            className="text-lg font-bold text-neutral-100 tracking-tight hover:text-neutral-100 transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm"
          >
            StormD3v
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link, pathname, activeSection);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-fast',
                    'hover:text-neutral-100',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                    'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm',
                    'pb-0.5',
                    active
                      ? 'text-neutral-100 border-b border-neutral-500'
                      : 'text-neutral-500'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-neutral-400 hover:text-neutral-100 transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="md:hidden bg-neutral-950 border-t border-neutral-800/60"
            onKeyDown={handleMenuKeyDown}
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link, pathname, activeSection);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block px-3 py-2.5 rounded-lg text-sm font-medium',
                      'transition-colors duration-fast',
                      'hover:text-neutral-100 hover:bg-neutral-900',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                      'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                      active
                        ? 'text-neutral-100 bg-neutral-900/60 border-l-2 border-neutral-500'
                        : 'text-neutral-500'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
