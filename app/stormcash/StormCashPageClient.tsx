'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import { DesktopPageHero } from '@/components/ui/desktop-page-hero';

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

export function StormCashPageClient() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 sm:pt-40 pb-32 px-6 sm:overflow-visible overflow-hidden">
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
              className="text-xs font-semibold tracking-widest uppercase text-accent-purple/70 mb-8 max-sm:text-accent-purple/60 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
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
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                A payment prototype built around settlement finality.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                A transfer either completes fully or never starts.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What it is */}
      <section className="py-32 px-6">
        <Container>
          <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p {...inView()} className="text-sm font-semibold tracking-widest uppercase text-neutral-300 sm:text-neutral-300 mb-10 flex items-center gap-3 max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <span className="w-8 h-px bg-accent-purple/50"></span>
              <span>What it is</span>
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                StormCash is a financial technology prototype exploring what payment infrastructure would look like if settlement finality were the primary design constraint.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                {TRANSFER_PROBLEM_TEXT}
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                StormCash prototypes an architecture that treats this as a solvable problem: atomic transfers, observable settlement stages, and an experience that approaches the simplicity of sending a message.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Architecture */}
      <section className="py-32 px-6">
        <Container>
          <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p {...inView()} className="text-sm font-semibold tracking-widest uppercase text-neutral-300 sm:text-neutral-300 mb-10 flex items-center gap-3 max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <span className="w-8 h-px bg-accent-purple/50"></span>
              <span>Architecture</span>
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                Django handles identity. FastAPI handles money. Both services share one PostgreSQL database and the same JWT secret — tokens issued by Django are validated by FastAPI on every request.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                Balances are never stored. They are always computed from the sum of ledger entries. This mirrors how real bank ledgers work and ensures consistency across all operations.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                The system supports user authentication, account creation, deposits, withdrawals, and cross-user transfers with real-time settlement UI. Concurrent transfer safety is enforced through database-level locking.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What's real vs simulated */}
      <section className="py-32 px-6">
        <Container>
          <div className="max-w-2xl relative">
            {/* Soft dark radial gradient behind content on mobile */}
            <div
              className="absolute left-0 right-0 -top-20 -bottom-20 sm:hidden -z-10"
              style={{
                background: 'radial-gradient(closest-side, rgba(7,6,11,0.55) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <motion.p {...inView()} className="text-sm font-semibold tracking-widest uppercase text-neutral-300 sm:text-neutral-300 mb-10 flex items-center gap-3 max-sm:text-neutral-300 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <span className="w-8 h-px bg-accent-purple/50"></span>
              <span>{WHATS_REAL_SECTION_TITLE}</span>
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty sm:text-neutral-300 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                This is a concept demonstrator and portfolio project. It does not move real money and is not a regulated financial service.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                What works: user authentication, account creation, deposits, withdrawals, cross-user transfers, concurrent transfer safety, double-entry ledger, and real-time settlement UI. The transaction explorer shows blockchain settlement details, but the blockchain itself is simulated.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                {WHAT_DOESNT_TEXT}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* View the code */}
      <section className="relative py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
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
            <motion.p {...inView(0.1)} className="text-neutral-400 leading-relaxed text-pretty mb-12 sm:text-neutral-400 sm:!text-shadow-none max-sm:text-neutral-200 max-sm:text-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              The entire prototype is open source. Explore the architecture, see how the settlement engine works, and understand the design decisions.
            </motion.p>
            <motion.div {...inView(0.2)} className="flex flex-col sm:flex-row gap-4">
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
                  Create an Account
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
          </div>
        </Container>
      </section>
    </>
  );
}
