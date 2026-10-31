'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import { DesktopPageHero } from '@/components/ui/desktop-page-hero';
import { ProjectSidePanel } from '@/components/ProjectSidePanel';
import { ProjectPager } from '@/components/ProjectPager';
import { ProjectDrawer } from '@/components/ProjectDrawer';

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

// Text constants to avoid JSX apostrophe escaping
const TRANSFER_PROBLEM_TEXT = "Modern bank transfers were built around 1970s batch processing infrastructure. The result is a gap that affects every person who has ever sent money internationally: money leaves the sender's account before it arrives at the destination, users have no visibility into where their money is during transit, and a failed transfer can leave funds in an indeterminate state for days.";

const WHATS_REAL_SECTION_TITLE = "What's real vs simulated";

const WHAT_DOESNT_TEXT = "What doesn't: real blockchain connectivity, real fiat on/off ramps, and multi-currency support. These are explicitly marked as vision items in the project roadmap.";

const sections = [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'whats-real', label: "What's real vs simulated" },
];

const links = [
    { label: 'Open the live app', href: 'https://stormcash.vercel.app/', external: true },
    { label: 'GitHub Repository', href: 'https://github.com/StormD3v/StormCash', external: true },
];

export function StormCashPageClient() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 max-sm:pt-14 sm:pt-40 pb-32 sm:pb-12 max-sm:pb-8 px-6 sm:overflow-visible overflow-hidden">
        <DesktopPageHero src="/images/stormcash-desktop.webp" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10 sm:bg-transparent" />
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-3xl -z-10 sm:hidden"
          initial={{ opacity: 0.3 }}
          animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.3, 0.5, 0.3] }}
          transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <Container>
          <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.6) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p
              {...reveal(0)}
              className="section-label mb-8 max-sm:mb-4"
            >
              Prototype
            </motion.p>
            <motion.h1
              {...reveal(0.08)}
              className="text-6xl md:text-7xl font-bold text-accent-purple mb-10 leading-tight"
            >
              StormCash
            </motion.h1>
            <motion.div {...reveal(0.16)} className="space-y-5">
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-readable">
                A payment prototype built around settlement finality.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-200 sm:text-readable max-sm:text-neutral-200 max-sm:text-readable">
                A transfer either completes fully or never starts.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Content sections with sticky side panel */}
      <Container className="lg:grid lg:grid-cols-[minmax(0,48rem)_300px] lg:gap-20 px-6">
        {/* Main content */}
        <div>
          {/* What it is */}
          <section id="what-it-is" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
            <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-purple/50 sm:hidden"></span>
              <span>What it is</span>
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                StormCash is a financial technology prototype exploring what payment infrastructure would look like if settlement finality were the primary design constraint.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                {TRANSFER_PROBLEM_TEXT}
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                StormCash prototypes an architecture that treats this as a solvable problem: atomic transfers, observable settlement stages, and an experience that approaches the simplicity of sending a message.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
          <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-purple/50 sm:hidden"></span>
              <span>Architecture</span>
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                Django handles identity. FastAPI handles money. Both services share one PostgreSQL database and the same JWT secret — tokens issued by Django are validated by FastAPI on every request.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                Balances are never stored. They are always computed from the sum of ledger entries. This mirrors how real bank ledgers work and ensures consistency across all operations.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                The system supports user authentication, account creation, deposits, withdrawals, and cross-user transfers with real-time settlement UI. Concurrent transfer safety is enforced through database-level locking.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What's real vs simulated */}
        <section id="whats-real" className="py-32 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
          <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p {...inView()} className="section-label mb-10 max-sm:mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-accent-purple/50 sm:hidden"></span>
              <span>{WHATS_REAL_SECTION_TITLE}</span>
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-100 sm:text-readable max-sm:text-neutral-50 max-sm:text-lg max-sm:text-readable">
                This is a concept demonstrator and portfolio project. It does not move real money and is not a regulated financial service.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                What worked when it was live: user authentication, account creation, deposits, withdrawals, cross-user transfers, concurrent transfer safety, double-entry ledger, and real-time settlement UI. The transaction explorer shows blockchain settlement details, but the blockchain itself is simulated.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-lg sm:text-neutral-200 sm:text-readable max-sm:text-neutral-100 max-sm:text-[17px] max-sm:leading-relaxed max-sm:text-readable">
                {WHAT_DOESNT_TEXT}
              </p>
            </motion.div>
          </div>
        </section>

        {/* View the code */}
        <section className="relative py-36 sm:py-16 max-sm:py-8 border-t border-neutral-800/60 sm:border-t-0 max-sm:border-t-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
          <div className="max-w-xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.h2 {...inView()} className="text-4xl md:text-5xl font-bold text-accent-purple mb-6 leading-tight">
              View the code
            </motion.h2>
            <motion.p {...inView(0.1)} className="text-neutral-400 leading-relaxed text-pretty mb-12 sm:text-neutral-200 sm:text-readable max-sm:text-neutral-200 max-sm:text-readable">
              The entire prototype is open source. Explore the architecture, see how the settlement engine works, and understand the design decisions.
            </motion.p>
            <motion.div {...inView(0.2)} className="flex flex-col sm:flex-row gap-4 lg:hidden">
              <a
                href="https://stormcash.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Button
                  size="lg"
                  variant="primary"
                  className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Open the live app
                </Button>
              </a>
              <a
                href="https://github.com/StormD3v/StormCash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="border border-neutral-700 hover:border-neutral-600"
                >
                  <Github size={18} className="mr-2" />
                  GitHub Repository
                </Button>
              </a>
            </motion.div>
            <motion.p {...inView(0.25)} className="text-neutral-400 text-sm leading-relaxed mt-4">
              The backend is offline to save hosting costs, so sign-up won&apos;t work right now. See the code and screenshots on <a href="https://github.com/StormD3v/StormCash" target="_blank" rel="noopener noreferrer" className="text-neutral-300 underline hover:text-neutral-200">GitHub</a>.
            </motion.p>
          </div>
        </section>
        </div>

        {/* Sticky side panel */}
        <ProjectSidePanel sections={sections} links={links} currentSlug="stormcash" />
      </Container>

      {/* Mobile drawer */}
      <ProjectDrawer sections={sections} links={links} currentSlug="stormcash" />
    </>
  );
}
