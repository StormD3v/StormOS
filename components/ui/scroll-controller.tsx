'use client';

import { useEffect } from 'react';

/**
 * ScrollController
 *
 * Handles scroll behavior:
 * - Sets scrollRestoration to manual to prevent browser scroll restoration
 * - Scrolls to top on page load
 * - Removes hash from URL after first load to prevent jumping on refresh
 */
export function ScrollController() {
  useEffect(() => {
    // Set scroll restoration to manual
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Scroll to top on load
    window.scrollTo(0, 0);

    // Remove hash after first load if present
    if (window.location.hash) {
      const urlWithoutHash = window.location.href.split('#')[0];
      history.replaceState(null, '', urlWithoutHash);
    }
  }, []);

  return null;
}
