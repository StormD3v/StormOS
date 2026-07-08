'use client';

import { useScrollProgress } from '@/hooks/use-scroll-progress';

/**
 * Fixed 2px progress bar at the top of the viewport.
 * - When progress is null (prefers-reduced-motion): renders a static full-width bar.
 * - When progress is a number [0,1]: animates width in real time.
 * z-index is above navigation (z-sticky = 1020, this uses 9999).
 */
export function ScrollProgress() {
    const progress = useScrollProgress();

    if (progress === null) {
        // Reduced motion: static full-width bar — visible but no animation
        return (
            <div
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-600 z-[9999]"
            />
        );
    }

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 h-[2px] bg-neutral-600 z-[9999] transition-[width] duration-100 ease-out"
            style={{ width: `${progress * 100}%` }}
        />
    );
}
