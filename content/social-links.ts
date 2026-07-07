import { SocialLink } from '@/types';

/**
 * Social links content.
 *
 * Each entry follows the SocialLink interface from @/types.
 * Fields marked [PLACEHOLDER] must be replaced with real URLs before launch.
 *
 * - icon: lucide-react icon name (used in footer and contact section)
 * - platform: display name (used in aria-label as "View {platform} profile")
 * - showOnHomepage: when false, the link is available in the footer but not
 *   shown in the homepage contact section. Set LinkedIn to true when the
 *   profile is ready to expose publicly.
 */

export interface SocialLinkExtended extends SocialLink {
  showOnHomepage: boolean;
}

export const socialLinks: SocialLinkExtended[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com', // [PLACEHOLDER: replace with https://github.com/yourusername]
    icon: 'github',
    showOnHomepage: true,
  },
  {
    platform: 'X',
    url: 'https://x.com', // [PLACEHOLDER: replace with https://x.com/yourusername]
    icon: 'twitter',
    showOnHomepage: true,
  },
  {
    platform: 'Discord',
    url: 'https://discord.com', // [PLACEHOLDER: replace with your Discord server or profile invite URL]
    icon: 'discord',
    showOnHomepage: true,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com', // [PLACEHOLDER: replace with https://linkedin.com/in/yourusername]
    icon: 'linkedin',
    showOnHomepage: false, // Set to true when LinkedIn profile is ready
  },
];
