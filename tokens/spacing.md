# Spacing

Spacing and layout design tokens for the design system. The system uses a 4px base unit grid for all spacing, borders, and radius values, creating a cohesive and predictable layout system.

## Spacing Scale

All spacing values are multiples of 4px, ensuring perfect alignment to the base grid:

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | No gap (adjacent elements) |
| `space-1` | 4px | Tight gaps: icon-to-label padding, inline spacing |
| `space-2` | 8px | **Default gap**: between list items, form field padding, section padding |
| `space-3` | 12px | Medium padding: card inner padding, section spacing |
| `space-4` | 16px | **Major section gaps**: modal padding, large spacing between regions |
| `space-5` | 24px | Page-level padding, hero areas, large section gaps |
| `space-6` | 32px | Maximum spacing, largest hero areas |

### CSS Custom Properties
```css
:root {
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
}
```

## Spacing Examples

### Tight Spacing (4px)
Used for inline elements and icon-to-label gaps:

```css
/* Icon beside label */
.icon-label {
  display: flex;
  gap: var(--space-1);
  align-items: center;
}

/* Inline button group */
.button-group {
  display: flex;
  gap: var(--space-1);
}
```

### Default Spacing (8px)
The workhorse spacing value used throughout the interface:

```css
/* List items */
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Form fields */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Sidebar padding */
.sidebar {
  padding: var(--space-2);
}

/* Item padding */
.sidebar-item {
  padding: var(--space-2) var(--space-2);
}
```

### Medium Spacing (12px)
Used for card inner padding and section spacing:

```css
/* Card padding */
.card {
  padding: var(--space-3);
  border: 2px solid var(--border);
  border-radius: 6px;
}
```

### Major Section Spacing (16px)
Used for modal padding and large spacing between regions:

```css
/* Modal padding */
.modal {
  padding: var(--space-4);
  border-radius: 8px;
}

/* Major gap between sections */
.section-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
```

### Large Spacing (24px)
Used for page-level padding and hero areas:

```css
/* Page padding */
.page {
  padding: var(--space-5);
}
```

## Borders

### Border Width
The system uses two distinct border widths:

| Type | Width | Usage |
|------|-------|-------|
| Interactive | 2px | Buttons, inputs, cards, toggles, focus states |
| Divider | 1px | Horizontal rules, table borders, separators, sidebar dividers |

### Border Properties
- **Style**: Always `solid`. Never use dashed or dotted.
- **Color**: Always `var(--border)` for consistency.
- **Radius**: Applies to interactive elements (see section below).

### CSS Examples

```css
/* Interactive element border */
.button, .input, .card {
  border: 2px solid var(--border);
}

/* Divider line */
.divider {
  border-top: 1px solid var(--border);
}

/* Table borders */
table {
  border-collapse: collapse;
}

table td, table th {
  border: 1px solid var(--border);
}
```

## Border Radius

The system uses four radius sizes for different UI elements:

| Token | Value | Usage |
|-------|-------|-------|
| Small | 4px | Buttons, inputs, badges, small UI elements |
| Medium | 6px | Cards, dropdowns, popovers, panels |
| Large | 8px | Modals, dialogs, large overlays |
| Full | 9999px | Pills, tags, avatars, fully rounded shapes |

### CSS Examples

```css
/* Button radius - small */
.button {
  border-radius: 4px;
  border: 2px solid var(--border);
}

/* Input radius - small */
input, textarea, select {
  border-radius: 4px;
  border: 2px solid var(--border);
}

/* Badge radius - small */
.badge {
  border-radius: 4px;
}

/* Card radius - medium */
.card {
  border-radius: 6px;
  border: 2px solid var(--border);
}

/* Dropdown radius - medium */
.dropdown {
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Modal radius - large */
.modal {
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Pill button - full */
.pill-button {
  border-radius: 9999px;
}

/* Avatar - full */
.avatar {
  border-radius: 9999px;
  width: 32px;
  height: 32px;
}

/* Tag - full */
.tag {
  border-radius: 9999px;
  padding: var(--space-1) var(--space-2);
}
```

### Sidebar Exception
Sidebar items and sidebar-related UI **do not use border-radius**. They use square (0px) corners to maintain a tight, list-like feel:

```css
/* Sidebar item - NO radius */
.sidebar-item {
  border-radius: 0;
  padding: var(--space-2);
  border: none;
}

/* Sidebar divider - sharp corners */
.sidebar-divider {
  border-top: 1px solid var(--border);
  margin: var(--space-2) 0;
}
```

## Shadows

The system uses subtle shadows for depth on truly elevated elements. Shadows are used sparingly to create clear visual hierarchy.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth for cards, popovers |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | Modals, dropdowns, elevated panels |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.15)` | Elevated dialogs, largest overlays |

### CSS Examples

```css
/* Subtle card shadow */
.card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Dropdown/popover shadow */
.dropdown, .popover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Modal shadow */
.modal {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* No shadow for list items */
.list-item {
  /* no box-shadow */
}
```

### No Shadows for Depth
**Important:** Do not use box-shadows for general depth on list items, sidebar items, or inline elements. Shadows are reserved for true elevation (modals, dropdowns, popovers). Use background color and borders instead for other visual distinction.

```css
/* Wrong: shadow on list item */
.list-item {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Don't do this */
}

/* Right: background and border for list item */
.list-item {
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
}
```

## Design Rules

### 4px Grid Foundation
- **Everything aligns to 4px.** All spacing, borders, and radius values are multiples of 4px.
- This creates visual harmony and simplifies layout calculations.
- When in doubt, use 8px or 16px as the default.

### 8px Default Gap
- **8px (`space-2`) is the default gap** between most UI elements.
- Use this for: list items, form field groups, button groups, section spacing.
- Most flex/grid gaps should be 8px unless there's a specific reason otherwise.

### 16px Modal/Card Padding
- **16px (`space-4`) is the standard padding** for modals, dialogs, and large cards.
- Inner elements within modals should use 8px or 12px spacing.

### 2px Borders on Interactive Elements
- **2px is the signature border width** for buttons, inputs, and other interactive elements.
- Dividers and subtle separators use 1px.
- Always pair with appropriate border-radius (usually 4px for small elements).

### Dividers are 1px
- Horizontal rules, table borders, and separators are **always 1px solid**.
- Use `var(--border)` for the color to respect themes.

### Sidebar Styling
- Sidebar items have **no border-radius** (square corners, 0px radius).
- Sidebar maintains a compact, list-like appearance without rounded corners.
- Use 1px dividers between items if needed.
- Padding is typically 8px for sidebar items.

### No Shadows for Inline Elements
- **Shadows are only for true elevation**: modals, dropdowns, popovers.
- Do not add shadows to list items, buttons, or inline UI elements.
- Use borders and background colors for visual distinction instead.

## Layout Example

```css
/* Full page layout */
.page {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Section within page */
.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Form layout */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* Button group */
.button-group {
  display: flex;
  gap: var(--space-2);
}

/* List layout */
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.list-item {
  padding: var(--space-2);
  border-bottom: 1px solid var(--border);
}

.list-item:last-child {
  border-bottom: none;
}

/* Card */
.card {
  padding: var(--space-3);
  border: 2px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Modal */
.modal {
  padding: var(--space-4);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

## Responsive Notes

The 4px grid scales consistently across all screen sizes. Adjust padding/margin at breakpoints if needed, but always in 4px increments:

```css
/* Mobile: tighter spacing */
@media (max-width: 640px) {
  .page {
    padding: var(--space-3);
  }
}

/* Desktop: generous spacing */
@media (min-width: 1024px) {
  .page {
    padding: var(--space-5);
  }
}
```
