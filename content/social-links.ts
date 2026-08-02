import { SocialLink } from '@/types';

/**
 * Social links content.
 *
 * This is the single source of truth for all social presence.
 *
 * - url: the public profile URL for the platform.
 * - username: the display name for platforms (optional, for reference).
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
    url: 'https://discord.com/users/1134320474126561322',
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
