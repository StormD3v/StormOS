/**
 * Breakpoint constants for responsive design
 */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;

/**
 * Animation duration constants (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 300,
  SLOW: 500,
  SLOWER: 700,
} as const;

/**
 * Easing function constants
 */
export const EASING = {
  OUT: [0.215, 0.61, 0.355, 1] as const,
  IN: [0.55, 0.055, 0.675, 0.19] as const,
  IN_OUT: [0.645, 0.045, 0.355, 1] as const,
  SPRING: [0.175, 0.885, 0.32, 1.275] as const,
} as const;

/**
 * Z-index scale constants
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;

/**
 * Maximum content width constants
 */
export const MAX_WIDTH = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
  FULL: '100%',
} as const;

/**
 * Container padding constants
 */
export const CONTAINER_PADDING = {
  MOBILE: '1rem',
  TABLET: '2rem',
  DESKTOP: '4rem',
} as const;
