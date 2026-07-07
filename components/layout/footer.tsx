import Link from 'next/link';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { socialLinks } from '@/content/social-links';
import { cn } from '@/lib/utils';

// Icon map — footer shows all social links regardless of showOnHomepage flag.
// Discord uses MessageCircle. X uses FaXTwitter from react-icons/fa6.
const iconMap: Record<string, React.ElementType> = {
  github: Github,
  twitter: FaXTwitter,
  discord: MessageCircle,
  linkedin: Linkedin,
};

const navLinks = [
  { name: 'What I\'m Building', href: '/#building' },
  { name: 'WorldForge', href: '/worldforge' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      role="contentinfo"
      className={cn('bg-neutral-950 border-t border-neutral-800/60', className)}
    >
      <div className="mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-base font-bold text-neutral-100 tracking-tight mb-3">StormOS</p>
            <p className="text-neutral-500 text-sm leading-relaxed">
              {/* [PLACEHOLDER: replace with final tagline] */}
              Everything I build, in one place.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-neutral-100 text-sm transition-colors duration-fast"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social — footer shows all links including LinkedIn */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
              Elsewhere
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon.toLowerCase()];
                if (!Icon) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${link.platform} profile`}
                    className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:border-neutral-700 transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-storm-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Storm. All rights reserved.
          </p>
          <p className="text-neutral-700 text-xs">
            {/* [PLACEHOLDER: add privacy policy / legal link before launch] */}
          </p>
        </div>
      </div>
    </footer>
  );
}
