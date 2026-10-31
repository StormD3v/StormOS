# Future Ideas

## Project Search

Add a filter box on the projects list that matches part of a project name. Client-side only, no backend. Build when there are about 10 projects.

## Send Contact Messages by Email

Use a service such as Resend to send contact messages by email. Messages are only logged now.

## Upgrade Next.js to Patched Version

Upgrade Next.js to a patched 15.x/16.x on a separate branch to address critical RCE vulnerabilities. Check every page after upgrade.

## Headings Visual Hierarchy

Make section headings clearly bigger than body text, or a different color, consistently on every page. Use a shared class in styles/globals.css, like .section-label.

## Hamburger Menu Drawer on Phone

Consider moving the site menu (Core, Projects, Identity, Contact) into a side drawer on phone, similar to the project drawer. This is a big change and requires checking every page.

## Contact Form Rate Limit with Shared Store

The in-memory rate limit counter resets when the server restarts and is weak behind proxies. Replace it with a shared store (for example Upstash) when real email sending is added. The 6th-message test was never run.

## Content-Security-Policy Header

The CSP header was not added yet because it can break fonts, scripts and videos. Add it carefully and test every page after adding.

## Remaining Audit Findings

Build-time packages such as browserslist, js-yaml, postcss have vulnerabilities. Run npm audit fix without --force on its own branch and check the build.

## Desktop Empty Space on Project Pages

The far right of project pages has empty space. Consider centering the text and the side card as one block, or adding a panel for the Contact and About pages.

## WorldForge Panel Behavior Check

The WorldForge page now uses the shared ProjectSidePanel. Check the Join the waitlist button and the section highlight again after any future changes.

## Visual Content for Other Project Pages

Only WorldForge has a demo video. LumiCast could get one real screenshot because it is live. StormCash has no live backend.
