# Technical Architecture

## Overview

The StormOS technical architecture provides the foundation for building a performant, scalable, and maintainable immersive portfolio experience. This document specifies all technical decisions, technology choices, and implementation patterns.

## Architecture Principles

1. **Performance First:** Optimize for Core Web Vitals and perceived performance
2. **Progressive Enhancement:** Ensure core functionality works without JavaScript
3. **Accessibility by Default:** All features accessible to all users
4. **Developer Experience:** Maintainable codebase with clear patterns
5. **Future-Proof:** Architecture that evolves with requirements

---

## Technology Stack

### Frontend Framework

**React 18+**
- **Reason:** Component-based architecture, large ecosystem, excellent performance with concurrent features
- **Version:** 18.2.0 or later
- **Features Used:** Concurrent rendering, Suspense, Transitions
- **Implementation:** Client-side rendering with static generation where possible

**Next.js 14+**
- **Reason:** Built-in optimization, excellent developer experience, automatic code splitting
- **Version:** 14.0.0 or later
- **Rendering Strategy:** Hybrid - Static generation for content, client-side for interactivity
- **Features Used:** App Router, Server Components, Image optimization, Font optimization

### Styling

**Tailwind CSS 3.4+**
- **Reason:** Utility-first approach, consistent with design system, excellent performance
- **Version:** 3.4.0 or later
- **Configuration:** Custom config with design tokens
- **Implementation:** CSS-in-JS via Tailwind CSS, no runtime CSS-in-JS library

**Framer Motion 10+**
- **Reason:** Declarative animations, excellent performance, React integration
- **Version:** 10.16.0 or later
- **Usage:** Complex animations, layout transitions, gesture handling

### State Management

**Zustand 4+**
- **Reason:** Lightweight, simple API, excellent performance, no boilerplate
- **Version:** 4.4.0 or later
- **Usage:** Global state (theme, user preferences, modal states)
- **Alternative:** React Context for component-level state

**React Query (TanStack Query) 5+**
- **Reason:** Server state management, caching, background updates
- **Version:** 5.0.0 or later
- **Usage:** API calls, data fetching, caching
- **Features:** Automatic caching, refetching, optimistic updates

### Data Fetching

**Fetch API**
- **Reason:** Native browser API, no additional dependencies
- **Usage:** Simple API calls
- **Wrapper:** Custom fetch wrapper with error handling and retry logic

**Axios (Optional)**
- **Reason:** Advanced features (interceptors, request cancellation)
- **Version:** 1.6.0 or later
- **Usage:** Complex API requirements
- **Implementation:** Only if Fetch API insufficient

### Form Handling

**React Hook Form 7+**
- **Reason:** Excellent performance, minimal re-renders, simple API
- **Version:** 7.48.0 or later
- **Usage:** All forms (contact, newsletter, waitlist)
- **Validation:** Zod integration

**Zod 3+**
- **Reason:** Type-safe validation, TypeScript-first, excellent DX
- **Version:** 3.22.0 or later
- **Usage:** Form validation, API response validation
- **Integration:** React Hook Form resolver

### Routing

**Next.js App Router**
- **Reason:** Built into Next.js, excellent performance, file-based routing
- **Version:** Next.js 14+
- **Features:** Dynamic routes, route groups, middleware
- **Implementation:** File-based routing in app/ directory

### Icons

**Lucide React 0.300+**
- **Reason:** Consistent icon style, tree-shakeable, React components
- **Version:** 0.300.0 or later
- **Usage:** All icons throughout the application
- **Customization:** Custom icons as SVG components

### Typography

**Next.js Font Optimization**
- **Reason:** Automatic font optimization, no layout shift
- **Implementation:** next/font module
- **Fonts:** Inter (primary), JetBrains Mono (monospace)

**Google Fonts (Fallback)**
- **Reason:** CDN delivery, wide browser support
- **Usage:** Fallback if Next.js font optimization unavailable
- **Implementation:** Google Fonts CDN with font-display: swap

### Analytics

**Vercel Analytics**
- **Reason:** Built into Vercel, privacy-focused, Web Vitals tracking
- **Version:** Latest
- **Usage:** Page views, Web Vitals, custom events
- **Privacy:** No personal data, GDPR compliant

**Google Analytics 4 (Optional)**
- **Reason:** Advanced analytics, custom tracking
- **Version:** GA4
- **Usage:** Detailed user behavior tracking
- **Privacy:** Cookie consent required

### Deployment

**Vercel**
- **Reason:** Excellent Next.js integration, automatic HTTPS, edge functions
- **Features:** Preview deployments, automatic builds, edge caching
- **Configuration:** vercel.json for custom settings

**Alternative: Netlify**
- **Reason:** Excellent alternative with similar features
- **Usage:** If Vercel unavailable or preferred

---

## Project Structure

```
stormos/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── about/                   # About section
│   ├── projects/               # Projects section
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/             # Project detail
│   │       └── page.tsx        # Individual project
│   ├── worldforge/             # WorldForge section
│   │   └── page.tsx
│   ├── contact/                # Contact section
│   │   └── page.tsx
│   └── api/                    # API routes
│       ├── contact/            # Contact form submission
│       │   └── route.ts
│       ├── newsletter/         # Newsletter signup
│       │   └── route.ts
│       └── waitlist/           # Waitlist signup
│           └── route.ts
├── components/                  # React components
│   ├── ui/                     # UI components (buttons, inputs, etc.)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/                 # Layout components
│   │   ├── navigation.tsx
│   │   ├── footer.tsx
│   │   └── container.tsx
│   ├── sections/              # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── ...
│   └── features/               # Feature-specific components
│       ├── project-card.tsx
│       ├── skill-grid.tsx
│       └── ...
├── lib/                        # Utility functions
│   ├── utils.ts               # General utilities
│   ├── api.ts                 # API client
│   ├── validations.ts         # Zod schemas
│   └── constants.ts           # Constants
├── hooks/                      # Custom React hooks
│   ├── use-scroll.ts          # Scroll hooks
│   ├── use-media-query.ts     # Media query hooks
│   └── use-animation.ts       # Animation hooks
├── store/                      # Zustand stores
│   ├── ui-store.ts            # UI state
│   └── preferences-store.ts   # User preferences
├── types/                      # TypeScript types
│   ├── index.ts               # Main types file
│   ├── project.ts             # Project types
│   └── api.ts                 # API types
├── styles/                     # Additional styles
│   └── animations.css         # Custom animations
├── public/                     # Static assets
│   ├── images/                # Images
│   ├── icons/                 # Custom icons
│   └── fonts/                 # Font files (if self-hosted)
├── content/                    # Content data
│   ├── projects.ts            # Projects data
│   ├── skills.ts              # Skills data
│   └── timeline.ts            # Timeline data
├── middleware.ts               # Next.js middleware
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # Project README
```

---

## Component Architecture

### Component Patterns

**Presentational Components:**
- Pure UI components with no side effects
- Receive data via props
- No direct API calls or state management
- Example: Button, Card, Badge

**Container Components:**
- Handle data fetching and state management
- Pass data to presentational components
- Handle business logic
- Example: ProjectList, SkillGrid

**Layout Components:**
- Structure and layout only
- No business logic
- Example: Navigation, Footer, Container

**Feature Components:**
- Combine presentational and container patterns
- Self-contained features
- Example: ProjectCard, ContactForm

### Component Composition

**Composition over Inheritance:**
- Build complex components from simple ones
- Use children prop for flexibility
- Avoid deep component hierarchies (max 4-5 levels)

**Props Design:**
- Required props first, optional props last
- Use TypeScript interfaces for type safety
- Provide default values for optional props
- Use object props for related values

**Example:**
```typescript
interface ProjectCardProps {
  // Required
  project: Project;
  
  // Optional with defaults
  variant?: 'default' | 'featured';
  showTags?: boolean;
  
  // Events
  onClick?: (project: Project) => void;
  
  // Children
  actions?: React.ReactNode;
}
```

### State Management Strategy

**Local State (useState):**
- Component-specific state
- UI state (modals, dropdowns, toggles)
- Form state (managed by React Hook Form)

**Global state (Zustand):**
- Cross-component state
- User preferences (theme, language)
- Application state (loading, error)

**Server state (React Query):**
- API data
- Cached data
- Background updates

**URL state (Next.js):**
- Search params (filters, sorting)
- Route params (project slug)
- Navigation state

---

## Data Architecture

### Content Management

**File-Based Content:**
- Content stored in TypeScript/JSON files
- Type-safe with TypeScript interfaces
- Easy to version control
- Fast build times

**Content Structure:**
```typescript
// content/projects.ts
import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'worldforge',
    title: 'WorldForge',
    description: '...',
    technologies: ['React', 'TypeScript', 'Node.js'],
    featured: true,
    // ...
  },
  // ...
];
```

**Alternative: Headless CMS**
- Consider for dynamic content needs
- Options: Contentful, Sanity, Strapi
- API-based content delivery
- Real-time content updates

### API Architecture

**API Routes (Next.js):**
- Serverless functions for API endpoints
- Type-safe request/response handling
- Error handling and validation
- Rate limiting

**API Endpoints:**

**POST /api/contact**
- Purpose: Submit contact form
- Validation: Name, email, subject, message
- Rate limit: 1 per 5 minutes per email
- Response: Success/error message
- Email: Send via email service (Resend, SendGrid)

**POST /api/newsletter**
- Purpose: Subscribe to newsletter
- Validation: Email format
- Rate limit: 1 per hour per email
- Response: Success/error message
- Integration: Newsletter service (ConvertKit, Mailchimp)

**POST /api/waitlist**
- Purpose: Join WorldForge waitlist
- Validation: Email format
- Rate limit: 1 per hour per email
- Response: Success/error message
- Storage: Database or spreadsheet

**GET /api/projects**
- Purpose: Fetch projects data
- Response: Projects array
- Caching: 1 hour cache
- Filters: Query params for filtering

**External APIs:**

**GitHub API**
- Purpose: Fetch repository data, commit history
- Authentication: Personal access token (server-side)
- Rate limit: 5000 requests/hour
- Caching: 1 hour cache

**YouTube API (Optional)**
- Purpose: Fetch video data, statistics
- Authentication: API key
- Rate limit: 10,000 units/day
- Caching: 24 hour cache

### Data Validation

**Zod Schemas:**
- Type-safe validation
- Client and server-side validation
- Clear error messages

**Example:**
```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});
```

---

## Performance Architecture

### Rendering Strategy

**Static Generation (Default):**
- Pre-render at build time
- Fast page loads
- CDN caching
- Usage: Homepage, About, Projects listing

**Server-Side Rendering (SSR):**
- Render on each request
- Dynamic content
- Usage: Pages with real-time data

**Client-Side Rendering (CSR):**
- Render in browser
- Interactive features
- Usage: Modals, filters, forms

**Incremental Static Regeneration (ISR):**
- Static generation with updates
- Revalidate on interval
- Usage: Projects page (revalidate every hour)

### Code Splitting

**Route-Based Splitting:**
- Automatic with Next.js App Router
- Each route is separate bundle
- Load only required code

**Component-Based Splitting:**
- React.lazy for heavy components
- Dynamic imports for optional features
- Example: Video player, complex visualizations

**Example:**
```typescript
const VideoPlayer = dynamic(() => import('@/components/video-player'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### Image Optimization

**Next.js Image Component:**
- Automatic optimization
- Responsive images
- Lazy loading
- WebP/AVIF format

**Image Strategy:**
- Use next/image for all images
- Provide appropriate sizes
- Use priority for above-fold images
- Implement blur placeholder for large images

**Example:**
```typescript
<Image
  src="/images/project-screenshot.jpg"
  alt="Project screenshot"
  width={1200}
  height={800}
  priority
  placeholder="blur"
/>
```

### Font Optimization

**Next.js Font Optimization:**
- Automatic font optimization
- No layout shift
- Self-hosting optional

**Implementation:**
```typescript
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

### Caching Strategy

**Static Assets:**
- Cache duration: 1 year
- Cache headers: public, max-age=31536000, immutable
- CDN: Vercel Edge Network

**API Responses:**
- Cache duration: 1 hour (configurable)
- Cache headers: public, max-age=3600
- Revalidation: stale-while-revalidate

**HTML Pages:**
- Cache duration: No cache or short cache
- Cache headers: no-cache or max-age=60
- Revalidation: On every request

---

## Security Architecture

### Authentication

**No Authentication Required:**
- Public portfolio
- No user accounts
- No protected routes

**Optional: Admin Panel:**
- If content management needed
- NextAuth.js for authentication
- Protected API routes
- Environment variables for secrets

### Data Protection

**Environment Variables:**
- Store secrets in .env.local
- Never commit to version control
- Use Vercel environment variables in production

**API Keys:**
- Server-side only for external APIs
- Never expose in client code
- Rotate keys regularly

**Input Validation:**
- Validate all user inputs
- Sanitize data before storage
- Use prepared statements for database queries

### HTTPS

**Automatic HTTPS:**
- Provided by Vercel
- Automatic SSL certificate
- HTTP to HTTPS redirect

### Content Security Policy (CSP)

**CSP Headers:**
- Restrict script sources
- Restrict style sources
- Restrict image sources
- Restrict connect sources

**Implementation:**
```javascript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https:;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};
```

---

## Accessibility Architecture

### Semantic HTML

**Landmarks:**
- Use semantic HTML elements
- ARIA landmarks where needed
- Proper heading hierarchy

**Example:**
```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation -->
  </nav>
</header>

<main role="main">
  <!-- Main content -->
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

### Keyboard Navigation

**Focus Management:**
- Logical tab order
- Focus visible styles
- Focus trap in modals
- Skip to content link

**Keyboard Shortcuts:**
- Escape: Close modals/dropdowns
- Tab/Shift+Tab: Navigate
- Enter/Space: Activate
- Arrow keys: Navigate lists

### Screen Reader Support

**ARIA Labels:**
- Descriptive labels for interactive elements
- aria-label for icons without text
- aria-describedby for additional context

**Live Regions:**
- aria-live for dynamic content
- aria-atomic for complete updates
- aria-busy for loading states

### Color Contrast

**WCAG Compliance:**
- AA compliance minimum (4.5:1 for text)
- AAA compliance where possible (7:1 for text)
- Test with color blindness simulators

---

## Testing Architecture

### Unit Testing

**Jest + React Testing Library:**
- Component testing
- Hook testing
- Utility function testing

**Coverage Goals:**
- Components: 80%+
- Hooks: 90%+
- Utilities: 100%

**Example:**
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

**Playwright:**
- End-to-end testing
- Cross-browser testing
- User flow testing

**Test Scenarios:**
- Navigation flows
- Form submissions
- Modal interactions
- Responsive behavior

**Example:**
```typescript
import { test, expect } from '@playwright/test';

test('user can submit contact form', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('textarea[name="message"]', 'Hello');
  await page.click('button[type="submit"]');
  await expect(page.getByText('Message sent successfully')).toBeVisible();
});
```

### Visual Regression Testing

**Percy or Chromatic:**
- Visual testing
- Screenshot comparison
- Cross-device testing

### Performance Testing

**Lighthouse CI:**
- Performance scores
- Accessibility scores
- Best practices scores

**Core Web Vitals:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## Deployment Architecture

### Build Process

**Next.js Build:**
- Static generation for pages
- Code splitting
- Asset optimization
- TypeScript compilation

**Build Commands:**
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

### Environment Configuration

**Development:**
- .env.local for local development
- Hot reloading
- Source maps

**Production:**
- Environment variables in Vercel
- Optimized builds
- Minified code
- No source maps

### CI/CD Pipeline

**GitHub Actions:**
- Run tests on push
- Run linting on push
- Build on pull request
- Deploy on merge to main

**Example Workflow:**
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
```

### Monitoring

**Vercel Analytics:**
- Page views
- Web Vitals
- Custom events

**Sentry (Optional):**
- Error tracking
- Performance monitoring
- Release tracking

---

## Scalability Considerations

### Content Scalability

**File-Based Content:**
- Easy to scale for moderate content
- Consider CMS for large content sets
- Implement pagination for large lists

**API Scalability:**
- Rate limiting
- Caching strategies
- Database optimization (if using database)

### Performance Scalability

**CDN:**
- Vercel Edge Network
- Global distribution
- Automatic scaling

**Serverless Functions:**
- Auto-scaling
- Pay-per-use
- Cold start optimization

### Traffic Scalability

**Vercel:**
- Automatic scaling
- DDoS protection
- Load balancing

**Database (if needed):**
- Connection pooling
- Read replicas
- Caching layer

---

## Maintenance Strategy

### Dependencies

**Regular Updates:**
- Monthly dependency updates
- Security patches immediately
- Major version updates carefully

**Dependency Management:**
- Use npm-check-updates
- Review breaking changes
- Test thoroughly before updating

### Code Quality

**Linting:**
- ESLint for JavaScript/TypeScript
- Prettier for formatting
- Husky for pre-commit hooks

**Code Review:**
- Pull request required
- Automated checks
- Manual review for complex changes

### Documentation

**Code Documentation:**
- JSDoc for complex functions
- TypeScript for type documentation
- README for components

**Architecture Documentation:**
- Keep this document updated
- Document architectural decisions
- Record lessons learned

---

## Technical Debt Management

### Identification

**Code Smells:**
- Duplicate code
- Long functions
- Complex components
- Poor naming

**Performance Issues:**
- Slow page loads
- Large bundle sizes
- Memory leaks

### Prioritization

**High Priority:**
- Security vulnerabilities
- Performance regressions
- Accessibility issues

**Medium Priority:**
- Code duplication
- Technical debt
- Refactoring opportunities

**Low Priority:**
- Nice-to-have improvements
- Optimization opportunities
- Code style consistency

### Remediation

**Refactoring:**
- Regular refactoring sprints
- Focus on high-impact areas
- Test thoroughly

**Rewrite:**
- Consider for severely outdated code
- Plan migration carefully
- Maintain functionality during rewrite

---

**Next:** [Animation and Motion Design Documentation](../05-animation-motion/README.md)
