'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Exported so property tests can verify stagger is strictly increasing
export function getLetterDelay(index: number): number {
    return 1.1 + index * 0.08;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    driftX: number;
    driftY: number;
    duration: number;
}

function generateParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 2,
        opacity: 0.08 + Math.random() * 0.22,
        driftX: (Math.random() - 0.5) * 28,
        driftY: -(4 + Math.random() * 14),
        duration: 9 + Math.random() * 8,
    }));
}

const LETTERS = 'StormD3v'.split('');

/**
 * ArrivalOverlay
 *
 * The visitor crosses a threshold. The site is already beneath this overlay —
 * it simply introduces the space, then lifts.
 *
 * Normal motion:
 *   near-black → purple atmosphere → particles → StormD3v fades in →
 *   electric pulse left to right → "Built by StormD3v" → overlay fades out
 *
 * Reduced motion: short cross-fade, no particles, no pulse.
 */
export function ArrivalOverlay() {
    const reducedMotion = useReducedMotion();
    const [phase, setPhase] = useState<'visible' | 'exiting' | 'gone'>('visible');

    const particles = useMemo(
        () => (reducedMotion ? [] : generateParticles(22)),
        [reducedMotion]
    );

    useEffect(() => {
        if (reducedMotion) {
            // Short cross-fade only
            const t = setTimeout(() => setPhase('exiting'), 50);
            return () => clearTimeout(t);
        }
        // Trigger exit after the full sequence: glow (0.8s) + text (0.6s) +
        // pulse (8 letters × 0.08s + 0.6s = 1.24s) + subtitle (0.4s) + hold (0.3s)
        // = ~3.3s total, capped at 2.6s so it feels swift not slow
        const t = setTimeout(() => setPhase('exiting'), 2600);
        return () => clearTimeout(t);
    }, [reducedMotion]);

    if (phase === 'gone') return null;

    return (
        <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#030303' }}
            animate={phase === 'exiting' ? { opacity: 0 } : { opacity: 1 }}
            transition={
                phase === 'exiting'
                    ? { duration: reducedMotion ? 0.3 : 0.55, ease: 'easeOut' }
                    : { duration: 0 }
            }
            onAnimationComplete={() => {
                if (phase === 'exiting') setPhase('gone');
            }}
        >
            {/* Purple atmospheric glow */}
            {!reducedMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 55% 45% at 42% 52%, rgba(191,90,242,0.11) 0%, transparent 70%)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    aria-hidden="true"
                />
            )}

            {/* Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    data-particle="true"
                    aria-hidden="true"
                    className="absolute rounded-full bg-neutral-500 pointer-events-none"
                    style={{
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    }}
                    animate={{ x: [0, p.driftX, 0], y: [0, p.driftY, 0] }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Central identity */}
            <div className="relative z-10 text-center select-none px-6">
                {/* "StormD3v" */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: reducedMotion ? 0.15 : 0.6,
                        delay: reducedMotion ? 0 : 0.8,
                        ease: 'easeOut',
                    }}
                    className="mb-5"
                >
                    <div
                        className="text-[5rem] sm:text-[6.5rem] md:text-[8rem] font-bold leading-none tracking-tight"
                        aria-label="StormD3v"
                    >
                        {LETTERS.map((letter, i) => (
                            <motion.span
                                key={i}
                                data-pulse-letter="true"
                                style={{ color: '#a3a3a3' }}
                                {...(!reducedMotion && {
                                    animate: {
                                        color: ['#a3a3a3', '#bf5af2', '#f5f5f5', '#a3a3a3'],
                                        textShadow: [
                                            'none',
                                            '0 0 18px rgba(191,90,242,0.55)',
                                            '0 0 32px rgba(245,245,245,0.3)',
                                            'none',
                                        ],
                                    },
                                    transition: {
                                        duration: 0.55,
                                        delay: getLetterDelay(i),
                                        ease: 'easeInOut',
                                        times: [0, 0.3, 0.62, 1],
                                    },
                                })}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* "Built by StormD3v" */}
                <motion.p
                    className="text-xs tracking-[0.25em] uppercase text-neutral-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: reducedMotion ? 0.15 : 0.45,
                        delay: reducedMotion ? 0.05 : 1.95,
                        ease: 'easeOut',
                    }}
                >
                    Built by StormD3v
                </motion.p>
            </div>
        </motion.div>
    );
}
