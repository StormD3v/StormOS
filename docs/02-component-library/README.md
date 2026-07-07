# Component Library

## Overview

The StormOS Component Library provides reusable, implementation-ready UI components that maintain visual consistency and behavioral predictability across the entire experience.

Every component specification includes:
- Purpose and usage guidelines
- Visual specifications with exact values
- All interactive states with behaviors
- Accessibility requirements
- Implementation notes

## Component Categories

1. **Navigation Components** - Navigation, menus, breadcrumbs
2. **Action Components** - Buttons, links, calls-to-action
3. **Input Components** - Forms, inputs, selectors
4. **Display Components** - Cards, panels, containers
5. **Feedback Components** - Alerts, toasts, modals
6. **Data Components** - Tables, lists, grids
7. **Media Components** - Images, icons, avatars
8. **Layout Components** - Grids, spacers, dividers

---

## Navigation Components

### Primary Navigation (Desktop)

**Purpose:** Main navigation for desktop viewport, provides access to all major sections

**Visual Specifications:**
- Background: `--color-storm-dark` (#1C1C1E)
- Height: 64px
- Border: Bottom border 1px solid `--color-gray-900` (#2C2C2E)
- Padding: Horizontal 24px
- Logo: StormOS text in Display 2 (48px), weight 700, color `--color-storm-light`
- Navigation items: Horizontal list, 16px spacing between items

**Navigation Items:**
- Font: Body (16px), weight 500
- Color: `--color-gray-500` (#8E8E93) default
- Hover: `--color-storm-light` (#F5F5F7)
- Active: `--color-storm-blue` (#0A84FF)
- Active indicator: Bottom border 2px solid `--color-storm-blue`
- Transition: Color 150ms ease-out, border 150ms ease-out

**States:**
- Default: Gray text, no indicator
- Hover: Light text, no indicator
- Active: Blue text, blue bottom indicator
- Focus: Blue outline 2px, offset 2px

**Accessibility:**
- Role: navigation
- ARIA label: "Main navigation"
- Keyboard navigation: Tab through items, Enter to activate
- Focus visible: 2px blue outline

**Implementation Notes:**
- Sticky positioning on scroll
- Backdrop blur: 20px for content behind
- Mobile: Converts to hamburger menu (see Mobile Navigation)

---

### Mobile Navigation

**Purpose:** Navigation for mobile viewport (< 768px)

**Visual Specifications:**
- Background: `--color-storm-dark` (#1C1C1E)
- Height: 56px
- Border: Bottom border 1px solid `--color-gray-900` (#2C2C2E)
- Padding: Horizontal 16px

**Hamburger Button:**
- Size: 40x40px
- Icon: Three horizontal lines, 2px stroke, color `--color-storm-light`
- Hover: Background `--color-gray-800` (#3A3A3C)
- Active: Background `--color-gray-700` (#48484A)
- Transition: Background 150ms ease-out

**Mobile Menu (Open State):**
- Background: `--color-storm-dark` (#1C1C1E)
- Position: Fixed, top 56px, full width
- Animation: Slide down from top, 300ms ease-out
- Items: Vertical stack, 48px height each
- Item padding: Horizontal 16px
- Item border: Bottom border 1px solid `--color-gray-900` (#2C2C2E)
- Close button: X icon in top right, 40x40px

**States:**
- Closed: Menu hidden, hamburger visible
- Open: Menu visible, hamburger becomes X
- Item hover: Background `--color-gray-800` (#3A3A3C)
- Item active: Background `--color-gray-700` (#48484A), text `--color-storm-blue`

**Accessibility:**
- Button aria-expanded: true/false
- Menu role: menu
- Menu items role: menuitem
- Escape key closes menu
- Click outside closes menu

**Implementation Notes:**
- Prevent body scroll when menu open
- Animate with transform for performance
- Use React Portal for menu container

---

### Breadcrumb Navigation

**Purpose:** Secondary navigation showing user's current location in hierarchy

**Visual Specifications:**
- Font: Body Small (14px)
- Color: `--color-gray-500` (#8E8E93)
- Separator: "/" character, color `--color-gray-400` (#AEAEB2)
- Spacing: 8px between items
- Padding: 16px horizontal

**Breadcrumb Items:**
- Link: Hover color `--color-storm-blue` (#0A84FF)
- Current: Color `--color-storm-light` (#F5F5F7), not clickable
- Transition: Color 150ms ease-out

**States:**
- Default: Gray text
- Hover (link): Blue text
- Current: Light text, no hover state

**Accessibility:**
- Role: navigation
- ARIA label: "Breadcrumb"
- Current item: aria-current="page"
- Keyboard navigation: Tab through links

**Implementation Notes:**
- Maximum 5 levels to prevent overflow
- Truncate middle levels with ellipsis if > 5
- Use on sub-pages only, not homepage

---

## Action Components

### Primary Button

**Purpose:** Primary call-to-action for most important actions

**Visual Specifications:**
- Background: `--color-storm-blue` (#0A84FF)
- Text color: `--color-storm-light` (#F5F5F7)
- Font: Body (16px), weight 600
- Height: 44px
- Padding: Horizontal 24px
- Border radius: `--radius-2` (8px)
- Border: None
- Shadow: `--shadow-2` (0 4px 6px rgba(0, 0, 0, 0.07))

**States:**
- Default: Blue background, light text
- Hover: Background darken to #0066CC, shadow `--shadow-3`
- Active: Background darken to #0055AA, shadow `--shadow-1`, scale 0.98
- Disabled: Background `--color-gray-700` (#48484A), text `--color-gray-500` (#8E8E93), no shadow
- Loading: Show spinner, disable interaction
- Focus: Blue outline 2px, offset 2px

**Transitions:**
- Background: 150ms ease-out
- Shadow: 150ms ease-out
- Transform: 150ms ease-out

**Accessibility:**
- Type: button
- Disabled: aria-disabled="true"
- Loading: aria-busy="true"
- Keyboard: Enter/Space to activate
- Focus visible: 2px blue outline

**Implementation Notes:**
- Use for primary actions only
- Maximum 1-2 per screen
- Include icon on left if applicable (16px icon, 8px spacing)

---

### Secondary Button

**Purpose:** Secondary actions, less important than primary

**Visual Specifications:**
- Background: Transparent
- Text color: `--color-storm-light` (#F5F5F7)
- Font: Body (16px), weight 600
- Height: 44px
- Padding: Horizontal 24px
- Border radius: `--radius-2` (8px)
- Border: 1px solid `--color-gray-700` (#48484A)
- Shadow: None

**States:**
- Default: Transparent, light text, gray border
- Hover: Background `--color-gray-800` (#3A3A3C), border `--color-gray-600` (#636366)
- Active: Background `--color-gray-700` (#48484A), border `--color-gray-500` (#8E8E93), scale 0.98
- Disabled: Text `--color-gray-500` (#8E8E93), border `--color-gray-400` (#AEAEB2)
- Focus: Blue outline 2px, offset 2px

**Transitions:**
- Background: 150ms ease-out
- Border: 150ms ease-out
- Transform: 150ms ease-out

**Accessibility:**
- Same as Primary Button

**Implementation Notes:**
- Use for secondary actions
- Can have multiple per screen
- Good for "Cancel", "Back", etc.

---

### Ghost Button

**Purpose:** Tertiary actions, minimal visual weight

**Visual Specifications:**
- Background: Transparent
- Text color: `--color-storm-blue` (#0A84FF)
- Font: Body (16px), weight 500
- Height: 44px
- Padding: Horizontal 16px
- Border radius: `--radius-2` (8px)
- Border: None
- Shadow: None

**States:**
- Default: Transparent, blue text
- Hover: Background `--color-gray-800` (#3A3A3C), text lighten to #32ADE6
- Active: Background `--color-gray-700` (#48484A), scale 0.98
- Disabled: Text `--color-gray-500` (#8E8E93)
- Focus: Blue outline 2px, offset 2px

**Transitions:**
- Background: 150ms ease-out
- Color: 150ms ease-out
- Transform: 150ms ease-out

**Accessibility:**
- Same as Primary Button

**Implementation Notes:**
- Use for low-priority actions
- Good for "Learn more", "View details"
- Can be used inline with text

---

### Link

**Purpose:** Text-based navigation to other content

**Visual Specifications:**
- Color: `--color-storm-blue` (#0A84FF)
- Font: Inherit
- Text decoration: None
- Border bottom: 1px solid transparent

**States:**
- Default: Blue text, transparent border
- Hover: Text lighten to #32ADE6, border bottom 1px solid `--color-storm-blue`
- Active: Text darken to #0066CC
- Focus: Blue outline 2px, offset 2px

**Transitions:**
- Color: 150ms ease-out
- Border: 150ms ease-out

**Accessibility:**
- Role: link
- External links: aria-label with "opens in new tab"
- Keyboard: Enter to activate

**Implementation Notes:**
- Use for inline navigation
- Don't use for primary actions (use button instead)
- External links show external icon on hover

---

## Input Components

### Text Input

**Purpose:** Single-line text input for forms and data entry

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border: 1px solid `--color-gray-700` (#48484A)
- Border radius: `--radius-2` (8px)
- Height: 44px
- Padding: Horizontal 16px
- Font: Body (16px)
- Color: `--color-storm-light` "#F5F5F7)
- Placeholder: `--color-gray-500` (#8E8E93)

**States:**
- Default: Gray background, gray border
- Focus: Border `--color-storm-blue` (#0A84FF), shadow 0 0 0 3px rgba(10, 132, 255, 0.2)
- Error: Border `--color-error` (#FF453A), shadow 0 0 0 3px rgba(255, 69, 58, 0.2)
- Disabled: Background `--color-gray-900` (#2C2C2E), border `--color-gray-400` (#AEAEB2), text `--color-gray-500`

**Transitions:**
- Border: 150ms ease-out
- Shadow: 150ms ease-out
- Background: 150ms ease-out

**Accessibility:**
- Type: text (or email, password, etc.)
- Required: aria-required="true"
- Error: aria-invalid="true", aria-describedby with error message
- Label: Associated with for attribute

**Implementation Notes:**
- Always include visible label
- Show character count for maxLength
- Clear button on right for non-required fields

---

### Textarea

**Purpose:** Multi-line text input for longer content

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border: 1px solid `--color-gray-700` (#48484A)
- Border radius: `--radius-2` (8px)
- Min height: 120px
- Padding: 16px
- Font: Body (16px)
- Color: `--color-storm-light` (#F5F5F7)
- Placeholder: `--color-gray-500` (#8E8E93)
- Resize: Vertical only

**States:**
- Same as Text Input

**Accessibility:**
- Same as Text Input
- Rows attribute for initial height

**Implementation Notes:**
- Auto-expand on content (optional enhancement)
- Show character count for maxLength
- Consider rich text editor for complex needs

---

### Select Dropdown

**Purpose:** Selection from predefined options

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border: 1px solid `--color-gray-700` (#48484A)
- Border radius: `--radius-2` (8px)
- Height: 44px
- Padding: Horizontal 16px, right 40px (for chevron)
- Font: Body (16px)
- Color: `--color-storm-light` (#F5F5F7)
- Chevron: Down arrow on right, 16px, color `--color-gray-500`

**Dropdown Menu (Open):**
- Background: `--color-gray-800` (#3A3A3C)
- Border: 1px solid `--color-gray-700` (#48484A)
- Border radius: `--radius-2` (8px)
- Shadow: `--shadow-3`
- Max height: 240px
- Overflow: Auto
- Position: Absolute below input

**Dropdown Items:**
- Height: 40px
- Padding: Horizontal 16px
- Hover: Background `--color-gray-700` (#48484A)
- Selected: Background `--color-gray-700` (#48484A), checkmark icon
- Disabled: Text `--color-gray-500` (#8E8E93), no hover

**States:**
- Default: Gray background, gray border
- Focus: Border `--color-storm-blue` (#0A84FF), shadow 0 0 0 3px rgba(10, 132, 255, 0.2)
- Open: Border `--color-storm-blue`, dropdown visible
- Disabled: Background `--color-gray-900` (#2C2C2E), border `--color-gray-400` (#AEAEB2)

**Transitions:**
- Border: 150ms ease-out
- Shadow: 150ms ease-out
- Dropdown: 200ms ease-out

**Accessibility:**
- Role: combobox
- aria-expanded: true/false
- aria-selected: true/false for items
- Keyboard: Arrow keys to navigate, Enter to select, Escape to close

**Implementation Notes:**
- Use native select for simple cases
- Custom dropdown for complex styling needs
- Search/filter for long option lists

---

### Checkbox

**Purpose:** Binary selection for options

**Visual Specifications:**
- Box size: 20x20px
- Border: 2px solid `--color-gray-600` (#636366)
- Border radius: `--radius-1` (4px)
- Background: Transparent
- Checkmark: White, 12px, visible when checked

**States:**
- Default: Transparent, gray border
- Hover: Border `--color-storm-blue` (#0A84FF)
- Checked: Background `--color-storm-blue`, white checkmark
- Focus: Blue outline 2px, offset 2px
- Disabled: Border `--color-gray-400` (#AEAEB2), background `--color-gray-900` (#2C2C2E)
- Disabled checked: Background `--color-gray-700` (#48484A), checkmark `--color-gray-500`

**Transitions:**
- Border: 150ms ease-out
- Background: 150ms ease-out

**Accessibility:**
- Type: checkbox
- Checked: aria-checked="true"
- Required: aria-required="true"
- Label: Associated with for attribute

**Implementation Notes:**
- Click label to toggle
- Use for independent options
- Use Radio Group for mutually exclusive options

---

### Radio Button

**Purpose:** Single selection from mutually exclusive options

**Visual Specifications:**
- Circle size: 20x20px
- Border: 2px solid `--color-gray-600` (#636366)
- Border radius: Full (50%)
- Background: Transparent
- Inner circle: 8px, visible when selected

**States:**
- Default: Transparent, gray border
- Hover: Border `--color-storm-blue` (#0A84FF)
- Selected: Border `--color-storm-blue`, inner circle `--color-storm-blue`
- Focus: Blue outline 2px, offset 2px
- Disabled: Border `--color-gray-400` (#AEAEB2), background `--color-gray-900` (#2C2C2E)
- Disabled selected: Border `--color-gray-500` (#8E8E93), inner circle `--color-gray-500`

**Transitions:**
- Border: 150ms ease-out
- Background: 150ms ease-out

**Accessibility:**
- Type: radio
- Name: Same for all options in group
- Checked: aria-checked="true"
- Required: aria-required="true"
- Label: Associated with for attribute

**Implementation Notes:**
- Use Radio Group component for multiple options
- Click label to select
- Always have one option selected by default

---

## Display Components

### Card

**Purpose:** Container for related content with elevation

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border radius: `--radius-3` (12px)
- Padding: 24px
- Border: 1px solid `--color-gray-700` (#48484A)
- Shadow: `--shadow-2`

**Card Variants:**

**Elevated Card:**
- Shadow: `--shadow-3`
- Hover: Shadow `--shadow-4`, translateY -2px
- Transition: Shadow 200ms ease-out, transform 200ms ease-out

**Flat Card:**
- Shadow: None
- Border: 1px solid `--color-gray-700`
- Hover: Border `--color-gray-600`

**Interactive Card:**
- Cursor: Pointer
- Hover: Background `--color-gray-700` (#48484A), shadow `--shadow-3`
- Active: Scale 0.98

**States:**
- Default: Base specifications
- Hover: Variant-specific
- Active: Scale 0.98 for interactive
- Disabled: Opacity 0.5, pointer-events none

**Transitions:**
- Shadow: 200ms ease-out
- Background: 150ms ease-out
- Transform: 200ms ease-out

**Accessibility:**
- Interactive: role="button", tabindex="0"
- Disabled: aria-disabled="true"

**Implementation Notes:**
- Use for grouping related content
- Consistent padding within sections
- Consider max-width for readability

---

### Panel

**Purpose:** Larger container for sections or major content areas

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border radius: `--radius-3` (12px)
- Padding: 32px
- Border: 1px solid `--color-gray-700` (#48484A)
- Shadow: `--shadow-2`

**Panel Header (Optional):**
- Border bottom: 1px solid `--color-gray-700`
- Padding bottom: 24px
- Margin bottom: 24px
- Font: Heading 2 (28px), weight 600

**States:**
- Same as Card

**Transitions:**
- Same as Card

**Accessibility:**
- Header: role="heading", appropriate level

**Implementation Notes:**
- Use for major content sections
- Can contain multiple cards
- Consider collapsible for long content

---

### Badge

**Purpose:** Small indicator for status, counts, or categories

**Visual Specifications:**
- Height: 24px
- Padding: Horizontal 8px
- Border radius: `--radius-full` (9999px)
- Font: Caption (12px), weight 600
- Display: Inline-flex
- Align items: Center

**Badge Variants:**

**Default Badge:**
- Background: `--color-gray-700` (#48484A)
- Color: `--color-storm-light` (#F5F5F7)

**Primary Badge:**
- Background: `--color-storm-blue` (#0A84FF)
- Color: `--color-storm-light` (#F5F5F7)

**Success Badge:**
- Background: `--color-success` (#30D158)
- Color: `--color-storm-light` (#F5F5F7)

**Warning Badge:**
- Background: `--color-warning` (#FFD60A)
- Color: `--color-storm-dark` (#1C1C1E)

**Error Badge:**
- Background: `--color-error` (#FF453A)
- Color: `--color-storm-light` (#F5F5F7)

**States:**
- Default: Variant-specific
- Hover: Opacity 0.8
- Active: Scale 0.95

**Transitions:**
- Opacity: 150ms ease-out
- Transform: 150ms ease-out

**Accessibility:**
- Status: aria-label with status text
- Count: aria-label with count

**Implementation Notes:**
- Use for status indicators
- Use for notification counts
- Keep text short (max 8 characters)

---

## Feedback Components

### Alert

**Purpose:** Dismissible messages for feedback, warnings, or errors

**Visual Specifications:**
- Padding: 16px
- Border radius: `--radius-2` (8px)
- Border left: 4px solid
- Display: Flex
- Align items: Flex-start
- Gap: 12px

**Alert Variants:**

**Info Alert:**
- Background: rgba(10, 132, 255, 0.1)
- Border color: `--color-storm-blue` (#0A84FF)
- Icon: Info icon, blue
- Text: `--color-storm-light` (#F5F5F7)

**Success Alert:**
- Background: rgba(48, 209, 88, 0.1)
- Border color: `--color-success` (#30D158)
- Icon: Check icon, green
- Text: `--color-storm-light` (#F5F5F7)

**Warning Alert:**
- Background: rgba(255, 214, 10, 0.1)
- Border color: `--color-warning` (#FFD60A)
- Icon: Warning icon, amber
- Text: `--color-storm-light` (#F5F5F7)

**Error Alert:**
- Background: rgba(255, 69, 58, 0.1)
- Border color: `--color-error` (#FF453A)
- Icon: Error icon, red
- Text: `--color-storm-light` (#F5F5F7)

**Close Button:**
- Size: 24x24px
- Icon: X, 16px
- Color: `--color-gray-500` (#8E8E93)
- Hover: Color `--color-storm-light` (#F5F5F7)
- Margin left: Auto

**States:**
- Default: Variant-specific
- Close button hover: Light text
- Dismissing: Fade out, 300ms ease-out

**Transitions:**
- Opacity: 300ms ease-out
- Transform: 300ms ease-out

**Accessibility:**
- Role: alert
- Variant: aria-live="polite" for info/success, "assertive" for warning/error
- Dismissible: Button with aria-label="Close alert"

**Implementation Notes:**
- Auto-dismiss after 5 seconds (optional)
- Stack multiple alerts vertically
- Use for non-critical feedback

---

### Toast Notification

**Purpose:** Temporary notifications for actions or system events

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border: 1px solid `--color-gray-700` (#48484A)
- Border radius: `--radius-2` (8px)
- Padding: 16px
- Shadow: `--shadow-4`
- Min width: 300px
- Max width: 500px
- Position: Fixed, bottom right, 24px from edges

**Toast Content:**
- Icon: 20px, left side
- Title: Body (16px), weight 600, color `--color-storm-light`
- Message: Body Small (14px), color `--color-gray-400`
- Close button: Right side, 24x24px

**Toast Variants:**

**Default Toast:**
- Icon: Info icon, `--color-storm-blue`

**Success Toast:**
- Icon: Check icon, `--color-success`

**Error Toast:**
- Icon: Error icon, `--color-error`

**States:**
- Entering: Slide in from right, 300ms ease-out
- Default: Visible
- Hover: Shadow `--shadow-5`
- Exiting: Slide out to right, 300ms ease-out

**Transitions:**
- Transform: 300ms ease-out
- opacity: 300ms ease-out
- shadow: 150ms ease-out

**Accessibility:**
- Role: alertdialog
- aria-live: "polite"
- aria-atomic: "true"
- Focus trap when keyboard focused

**Implementation Notes:**
- Auto-dismiss after 4 seconds
- Stack multiple toasts vertically
- Maximum 3 toasts visible at once
- Pause auto-dismiss on hover

---

### Modal

**Purpose:** Overlay for focused content or actions

**Visual Specifications:**

**Overlay:**
- Background: rgba(0, 0, 0, 0.7)
- Position: Fixed, inset 0
- Z-index: 30
- Backdrop blur: 4px

**Modal Container:**
- Background: `--color-gray-800` (#3A3A3C)
- Border radius: `--radius-3` (12px)
- Border: 1px solid `--color-gray-700` (#48484A)
- Shadow: `--shadow-4`
- Max width: 600px
- Max height: 80vh
- Margin: Auto
- Position: Relative

**Modal Header:**
- Padding: 24px
- Border bottom: 1px solid `--color-gray-700`
- Display: Flex
- Align items: Center
- Gap: 16px

**Modal Title:**
- Font: Heading 2 (28px), weight 600
- Color: `--color-storm-light`

**Modal Close Button:**
- Size: 32x32px
- Icon: X, 20px
- Color: `--color-gray-500`
- Hover: Color `--color-storm-light`, background `--color-gray-700`
- Border radius: `--radius-1` (4px)

**Modal Body:**
- Padding: 24px
- Overflow: Auto

**Modal Footer (Optional):**
- Padding: 24px
- Border top: 1px solid `--color-gray-700`
- Display: Flex
- Justify content: Flex-end
- Gap: 12px

**States:**
- Entering: Scale 0.95, opacity 0, animate to scale 1, opacity 1, 300ms ease-out
- Default: Visible
- Exiting: Scale 0.95, opacity 0, 300ms ease-out

**Transitions:**
- Transform: 300ms ease-out
- opacity: 300ms ease-out

**Accessibility:**
- Role: dialog
- aria-modal: "true"
- aria-labelledby: Modal title
- Focus trap inside modal
- Escape key closes modal
- Click overlay closes modal

**Implementation Notes:**
- Focus first focusable element on open
- Return focus to trigger on close
- Prevent body scroll when open
- Use React Portal for container

---

## Data Components

### Table

**Purpose:** Display structured data in rows and columns

**Visual Specifications:**
- Background: `--color-gray-800` (#3A3A3C)
- Border radius: `--radius-2` (8px)
- Border: 1px solid `--color-gray-700` (#48484A)
- Overflow: Hidden

**Table Header:**
- Background: `--color-gray-900` (#2C2C2E)
- Border bottom: 1px solid `--color-gray-700`
- Font: Body Small (14px), weight 600
- Color: `--color-gray-400` (#AEAEB2)
- Text transform: Uppercase
- Letter spacing: 0.05em

**Header Cell:**
- Padding: 12px 16px
- Text align: Left (unless specified)
- Sortable: Cursor pointer, hover color `--color-storm-light`

**Table Body:**
- Font: Body (16px)
- Color: `--color-storm-light` (#F5F5F7)

**Table Row:**
- Border bottom: 1px solid `--color-gray-700`
- Hover: Background `--color-gray-700` (#48484A)
- Selected: Background rgba(10, 132, 255, 0.1)

**Table Cell:**
- Padding: 16px
- Vertical align: Middle

**States:**
- Default: Base specifications
- Row hover: Darker background
- Row selected: Blue tint background
- Sortable header: Cursor pointer, hover indicator

**Transitions:**
- Background: 150ms ease-out

**Accessibility:**
- Role: table
- Caption: Table description (hidden visually)
- Headers: scope="col"
- Sortable: aria-sort="ascending/descending/none"
- Keyboard: Arrow keys to navigate rows

**Implementation Notes:**
- Sticky header for long tables
- Horizontal scroll for wide tables
- Pagination for large datasets
- Sort indicators in headers

---

### List

**Purpose:** Display items in vertical sequence

**Visual Specifications:**
- Background: Transparent
- Padding: 0
- Margin: 0
- List style: None

**List Item:**
- Padding: 16px
- Border bottom: 1px solid `--color-gray-700` (#48484A)
- Display: Flex
- Align items: Center
- Gap: 12px

**List Item (Last):**
- Border bottom: None

**List Item (Interactive):**
- Cursor: Pointer
- Hover: Background `--color-gray-800` (#3A3A3C)
- Active: Background `--color-gray-700` (#48484A)

**States:**
- Default: Transparent, border
- Interactive hover: Darker background
- Interactive active: Even darker background

**Transitions:**
- Background: 150ms ease-out

**Accessibility:**
- Role: list
- Items: role="listitem"
- Interactive: role="button", tabindex="0"

**Implementation Notes:**
- Use for simple item lists
- Consider Card for complex items
- Add drag handles for reordering

---

## Media Components

### Avatar

**Purpose:** Display user or entity profile image

**Visual Specifications:**
- Size: 40x40px (default)
- Border radius: `--radius-full` (9999px)
- Background: `--color-gray-700` (#48484A)
- Border: 2px solid `--color-gray-600` (#636366)
- Object fit: Cover

**Avatar Sizes:**

**Small:** 32x32px
**Medium:** 40x40px (default)
**Large:** 56x56px
**XLarge:** 80x80px

**Avatar States:**
- Default: Base specifications
- Hover: Border `--color-storm-blue` (#0A84FF)
- Active: Scale 0.95

**Avatar with Initials:**
- Font: Heading 3 (22px), weight 600
- Color: `--color-storm-light` (#F5F5F7)
- Text transform: Uppercase
- Display: Flex
- Align items: Center
- Justify content: Center

**Transitions:**
- Border: 150ms ease-out
- Transform: 150ms ease-out

**Accessibility:**
- Alt text: User name or description
- Initials: aria-label with full name

**Implementation Notes:**
- Use initials when no image
- Generate consistent colors from name
- Show online status indicator (optional)

---

### Icon

**Purpose:** Visual symbols for actions, concepts, or navigation

**Visual Specifications:**
- Size: 24x24px (default)
- Color: `--color-storm-light` (#F5F5F7)
- Stroke width: 2px

**Icon Sizes:**

**XSmall:** 16x16px
**Small:** 20x20px
**_medium:** 24x24px (default)
**Large:** 32x32px
**XLarge:** 48x48px

**Icon Colors:**

**Default:** `--color-storm-light` (#F5F5F7)
**Muted:** `--color-gray-500` (#8E8E93)
**Primary:** `--color-storm-blue` (#0A84FF)
**Success:** `--color-success` (#30D158)
**Warning:** `--color-warning` (#FFD60A)
**Error:** `--color-error` (#FF453A)

**Icon States:**
- Default: Base color
- Hover: Lighten by 10%
- Active: Darken by 10%
- Disabled: `--color-gray-500` (#8E8E93)

**Transitions:**
- Color: 150ms ease-out

**Accessibility:**
- Decorative: aria-hidden="true"
- Meaningful: aria-label with description
- Button icons: aria-label on button

**Implementation Notes:**
- Use Lucide Icons library
- SVG format for scalability
- Consider icon font for performance

---

## Layout Components

### Container

**Purpose:** Constrain content width and center on page

**Visual Specifications:**
- Max width: 1200px
- Margin: 0 auto
- Padding: Horizontal 24px

**Container Variants:**

**Narrow:** Max width 800px
**Default:** Max width 1200px
**Wide:** Max width 1400px
**Full:** Max width 100%

**Responsive:**
- Mobile (< 768px): Padding horizontal 16px
- Tablet (768-1024px): Padding horizontal 20px
- Desktop (> 1024px): Padding horizontal 24px

**Implementation Notes:**
- Use for page-level layout
- Nest containers for complex layouts
- Combine with Grid for structure

---

### Grid

**Purpose:** Create responsive grid layouts

**Visual Specifications:**
- Display: Grid
- Gap: 24px (default)

**Grid Variants:**

**2 Columns:** Grid template columns repeat(2, 1fr)
**3 Columns:** Grid template columns repeat(3, 1fr)
**4 Columns:** Grid template columns repeat(4, 1fr)
**Auto Fit:** Grid template columns repeat(auto-fit, minmax(250px, 1fr))

**Grid Gap:**

**Tight:** 16px
**Default:** 24px
**Loose:** 32px

**Responsive Behavior:**
- Mobile (< 768px): 1 column
- Tablet (768-1024px): 2 columns
- Desktop (> 1024px): Specified columns

**Implementation Notes:**
- Use for card layouts
- Use for feature grids
- Consider CSS Grid for complex layouts

---

### Spacer

**Purpose:** Add vertical or horizontal spacing

**Visual Specifications:**
- Height/Width: Based on spacing scale
- Background: Transparent

**Spacer Sizes:**

**Space 1:** 4px
**Space 2:** 8px
**Space 3:** 12px
**Space 4:** 16px
**Space 5:** 24px
**Space 6:** 32px
**Space 7:** 48px
**Space 8:** 64px

**Spacer Direction:**

**Vertical:** Height based on size
**Horizontal:** Width based on size

**Implementation Notes:**
- Use for consistent spacing
- Prefer margin/padding on components
- Use sparingly, consider layout alternatives

---

### Divider

**Purpose:** Visual separation between content sections

**Visual Specifications:**
- Height: 1px
- Background: `--color-gray-700` (#48484A)
- Width: 100%
- Margin: 24px 0 (default)

**Divider Variants:**

**Vertical:** Width 1px, height 100%, margin 0 24px
**With Label:** Centered text with horizontal lines

**Divider Margin:**

**Tight:** 16px 0
**Default:** 24px 0
**Loose:** 32px 0

**Implementation Notes:**
- Use for section separation
- Consider using whitespace instead
- Use with label for clarity

---

## Component Implementation Guidelines

### General Principles

1. **Composition over inheritance:** Build complex components from simple ones
2. **Props over configuration:** Use component props for customization
3. **Accessibility first:** Ensure all components are accessible by default
4. **Performance aware:** Use React.memo, lazy loading where appropriate
5. **Type safety:** Use TypeScript for all components
6. **Consistent styling:** Use design tokens for all values
7. **Responsive design:** Mobile-first approach
8. **Error boundaries:** Wrap components in error boundaries

### Component Structure

```typescript
interface ComponentProps {
  // Required props
  required: string;
  
  // Optional props with defaults
  optional?: string;
  
  // Variant props
  variant?: 'default' | 'primary' | 'secondary';
  
  // State props
  disabled?: boolean;
  loading?: boolean;
  
  // Event handlers
  onClick?: () => void;
  
  // Children
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({
  required,
  optional = 'default',
  variant = 'default',
  disabled = false,
  loading = false,
  onClick,
  children,
}) => {
  // Component logic
  return (
    // JSX with design tokens
  );
};
```

### Testing Requirements

1. **Unit tests:** Test component rendering and props
2. **Interaction tests:** Test user interactions and state changes
3. **Accessibility tests:** Test keyboard navigation and screen readers
4. **Visual regression tests:** Test component appearance across viewports
5. **Performance tests:** Test component rendering performance

---

**Next:** [User Journey Documentation](../03-user-journey/README.md)
