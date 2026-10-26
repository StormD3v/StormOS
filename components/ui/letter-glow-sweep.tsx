'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

// Exported so property tests can verify stagger is strictly increasing
export function getLetterDelay(index: number): number {
    return 1.1 + index * 0.08;
}

interface LetterGlowSweepProps {
    text: string;
    className?: string;
}

/**
 * LetterGlowSweep
 *
 * Reusable component that applies the electric pulse glow-sweep animation
 * to text letter by letter, matching the arrival overlay's effect.
 *
 * Normal motion: loops continuously while in view, pauses when scrolled out, resumes when back.
 * Reduced motion: static purple-accented text, no running animation.
 */
export function LetterGlowSweep({ text, className = '' }: LetterGlowSweepProps) {
    const reducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    const letters = text.split('');

    return (
        <div ref={ref} className={className}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    style={{
                        color: reducedMotion ? '#BF5AF2' : '#a3a3a3',
                    }}
                    {...(!reducedMotion && {
                        animate: isInView
                            ? {
                                  color: ['#a3a3a3', '#bf5af2', '#f5f5f5', '#a3a3a3'],
                                  textShadow: [
                                      'none',
                                      '0 0 18px rgba(191,90,242,0.55)',
                                      '0 0 32px rgba(245,245,245,0.3)',
                                      'none',
                                  ],
                              }
                            : { color: '#a3a3a3', textShadow: 'none' },
                        transition: {
                            duration: 0.55,
                            delay: getLetterDelay(i),
                            ease: 'easeInOut',
                            times: [0, 0.3, 0.62, 1],
                            repeat: isInView ? Infinity : 0,
                            repeatType: 'loop',
                            repeatDelay: 2.5,
                        },
                    })}
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    );
}
