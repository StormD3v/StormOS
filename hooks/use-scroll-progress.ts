'use client';

import { useState, useEffect } from 'react';

/**
 * Calculates scroll progress as a value in [0, 1].
 * Pure function — extracted for testability.
 *
 * @param scrollY      - Current scroll position (window.scrollY)
 * @param scrollHeight - Total document scroll height (document.documentElement.scrollHeight)
 * @param viewportHeight - Visible viewport height (window.innerHeight)
 */
export function calculateScrollProgress(
    scrollY: number,
    scrollHeight: number,
    viewportHeight: number
): number {
    const scrollable = scrollHeight - viewportHeight;
    if (scrollable <= 0) return 0;
    return Math.min(1, Math.max(0, scrollY / scrollable));
}

/**
 * Returns scroll depth as a number in [0, 1], or null when
 * prefers-reduced-motion is active (component renders a static bar instead).
 *
 * Throttled to one update per animation frame (~16ms), capped via a
 * 100ms gate so rapid scrolls don't flood state updates.
 */
export function useScrollProgress(): number | null {
    const [progress, setProgress] = useState<number | null>(null);

    useEffect(() => {
        // Respect reduced motion: return null so the consumer can show a static bar.
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            setProgress(null);
            return;
        }

        let rafId: number | null = null;
        let lastUpdate = 0;
        const THROTTLE_MS = 100;

        function onScroll() {
            const now = Date.now();
            if (now - lastUpdate < THROTTLE_MS) return;
            if (rafId !== null) return;

            rafId = requestAnimationFrame(() => {
                setProgress(
                    calculateScrollProgress(
                        window.scrollY,
                        document.documentElement.scrollHeight,
                        window.innerHeight
                    )
                );
                lastUpdate = Date.now();
                rafId = null;
            });
        }

        // Set initial value
        setProgress(
            calculateScrollProgress(
                window.scrollY,
                document.documentElement.scrollHeight,
                window.innerHeight
            )
        );

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return progress;
}
