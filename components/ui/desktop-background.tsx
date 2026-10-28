'use client';

/**
 * DesktopBackground
 *
 * Solid desktop background for sm: and up breakpoints.
 * Mobile is completely unaffected - this component never renders on mobile.
 *
 * Features:
 * - Base: #0a0a0a
 * - Continuous behind all sections (fixed positioning at z-0)
 * - No scroll or layout impact (pointer-events-none, fixed inset-0)
 */
export function DesktopBackground() {
  return (
    <div
      className="hidden sm:block fixed inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundColor: '#0a0a0a',
        zIndex: -30,
      }}
    />
  );
}
