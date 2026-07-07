'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'What I\'m Building', href: '/#building' },
  { name: 'WorldForge', href: '/worldforge' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Determines active state — handles both page routes and hash anchors on homepage
function isActivePath(linkHref: string, pathname: string): boolean {
  if (linkHref === '/#building') return pathname === '/';
  return pathname === linkHref;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
            aria-label="StormOS — home"
            className="text-lg font-bold text-neutral-100 tracking-tight hover:text-storm-blue transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm"
          >
            StormOS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isActivePath(link.href, pathname);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-fast',
                    'hover:text-neutral-100',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue',
                    'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm',
                    'pb-0.5',
                    isActive
                      ? 'text-neutral-100 border-b border-neutral-400'
                      : 'text-neutral-500'
                  )}
                  aria-current={isActive ? 'page' : undefined}
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
            className="md:hidden p-2 rounded-md text-neutral-400 hover:text-neutral-100 transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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
                const isActive = isActivePath(link.href, pathname);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'block px-3 py-2.5 rounded-lg text-sm font-medium',
                      'transition-colors duration-fast',
                      'hover:text-neutral-100 hover:bg-neutral-900',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue',
                      'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                      isActive
                        ? 'text-neutral-100 bg-neutral-900/60 border-l-2 border-neutral-400'
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
