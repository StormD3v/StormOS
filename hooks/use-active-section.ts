'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Tracks which of the given section IDs is currently most prominent
 * in the viewport, based on IntersectionObserver.
 *
 * Only active on the homepage (pathname === '/'). Returns null on all
 * other routes so navigation can fall back to pathname-based matching.
 *
 * @param sectionIds - ordered list of HTML id attributes to observe
 * @param options    - optional IntersectionObserver configuration
 * @returns the id of the most-visible section, or null when inactive
 */
export function useActiveSection(
    sectionIds: string[],
    options?: IntersectionObserverInit
): string | null {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Track the latest intersectionRatio for each observed section.
    // Using a ref avoids re-creating the observer on every render.
    const ratiosRef = useRef<Map<string, number>>(new Map());

    useEffect(() => {
        // Only observe on the homepage
        if (pathname !== '/') {
            setActiveSection(null);
            return;
        }

        const resolvedOptions: IntersectionObserverInit = {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
            rootMargin: '-10% 0px -10% 0px',
            ...options,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
            });

            // The active section is the one with the highest current ratio
            let bestId: string | null = null;
            let bestRatio = 0;

            ratiosRef.current.forEach((ratio, id) => {
                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestId = id;
                }
            });

            if (bestId !== null) {
                setActiveSection(bestId);
            }
        }, resolvedOptions);

        // Observe each section element, skipping any that don't exist in the DOM yet
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                ratiosRef.current.set(id, 0);
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
            ratiosRef.current.clear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return activeSection;
}
