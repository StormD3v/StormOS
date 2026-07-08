import { SocialLink } from '@/types';

/**
 * Social links content.
 *
 * This is the single source of truth for all social presence.
 *
 * - url: null when no public profile URL exists. Discord has no linkable
 *   profile URL — the username is displayed as plain text instead.
 * - username: the display name for platforms without a linkable URL.
 * - showOnHomepage: false entries are excluded from the homepage Contact
 *   section and the Footer social row.
 */

export interface SocialLinkExtended extends SocialLink {
  showOnHomepage: boolean;
}

export const socialLinks: SocialLinkExtended[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/StormD3v',
    icon: 'github',
    showOnHomepage: true,
  },
  {
    platform: 'X',
    url: 'https://x.com/Storm_D3V',
    icon: 'twitter',
    showOnHomepage: true,
  },
  {
    platform: 'Discord',
    url: null,
    username: 'storm_d3v',
    icon: 'discord',
    showOnHomepage: true,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/stormd3v',
    icon: 'linkedin',
    showOnHomepage: false, // Set to true when LinkedIn profile is ready to share publicly
  },
];
