'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

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
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent-purple/3 to-transparent -z-10" />
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-3xl -z-10"
          initial={{ opacity: 0.3 }}
          animate={reducedMotion ? { opacity: 0.3 } : { opacity: [0.3, 0.5, 0.3] }}
          transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <Container>
          <div className="max-w-2xl">
            <motion.p
              {...reveal(0)}
              className="text-xs font-semibold tracking-widest uppercase text-accent-purple/70 mb-8"
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
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed text-pretty">
                A payment prototype built around settlement finality.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                A transfer either completes fully or never starts.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What it is */}
      <section className="py-32 px-6 border-t border-neutral-800/60">
        <Container>
          <div className="max-w-2xl">
            <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
              What it is
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                StormCash is a financial technology prototype exploring what payment infrastructure would look like if settlement finality were the primary design constraint.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                {TRANSFER_PROBLEM_TEXT}
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                StormCash prototypes an architecture that treats this as a solvable problem: atomic transfers, observable settlement stages, and an experience that approaches the simplicity of sending a message.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Architecture */}
      <section className="py-32 px-6 bg-neutral-900/30 border-t border-neutral-800/60">
        <Container>
          <div className="max-w-2xl">
            <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
              Architecture
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                Django handles identity. FastAPI handles money. Both services share one PostgreSQL database and the same JWT secret — tokens issued by Django are validated by FastAPI on every request.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                Balances are never stored. They are always computed from the sum of ledger entries. This mirrors how real bank ledgers work and ensures consistency across all operations.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                The system supports user authentication, account creation, deposits, withdrawals, and cross-user transfers with real-time settlement UI. Concurrent transfer safety is enforced through database-level locking.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What's real vs simulated */}
      <section className="py-32 px-6 border-t border-neutral-800/60">
        <Container>
          <div className="max-w-2xl">
            <motion.p {...inView()} className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-10">
              {WHATS_REAL_SECTION_TITLE}
            </motion.p>
            <motion.div {...inView(0.1)} className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed text-pretty">
                This is a concept demonstrator and portfolio project. It does not move real money and is not a regulated financial service.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                What works: user authentication, account creation, deposits, withdrawals, cross-user transfers, concurrent transfer safety, double-entry ledger, and real-time settlement UI. The transaction explorer shows blockchain settlement details, but the blockchain itself is simulated.
              </p>
              <p className="text-neutral-400 leading-relaxed text-pretty">
                {WHAT_DOESNT_TEXT}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* View the code */}
      <section className="relative py-36 px-6 overflow-hidden border-t border-neutral-800/60">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-xl">
            <motion.h2 {...inView()} className="text-4xl md:text-5xl font-bold text-accent-purple mb-6 leading-tight">
              View the code
            </motion.h2>
            <motion.p {...inView(0.1)} className="text-neutral-400 leading-relaxed text-pretty mb-12">
              The entire prototype is open source. Explore the architecture, see how the settlement engine works, and understand the design decisions.
            </motion.p>
            <motion.div {...inView(0.2)}>
              <a
                href="https://github.com/StormD3v/StormCash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Button
                  size="lg"
                  variant="primary"
                  className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple"
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
