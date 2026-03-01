# Typography

Type system design tokens for the design system. The system uses a carefully curated font stack optimized for code-first applications with proportional typography for published content.

## Font Stacks

The system supports four font families, each with specific use cases:

| Font Stack | CSS Variable | Primary Usage |
|-----------|--------------|---------------|
| SF Mono, Cascadia Code, Fira Code, JetBrains Mono, Menlo, monospace | `--font-mono` | Default UI, code blocks, sidebar, buttons, labels |
| IBM Plex Sans, system-ui, sans-serif | `--font-sans` | Published content body text, blog/wiki pages |
| Crimson Pro, Georgia, serif | `--font-serif` | Published content body text, blog/wiki pages |
| Lucida Grande, system-ui, sans-serif | (inline) | Music library table, data grids |

### CSS Custom Properties
```css
:root {
  --font-mono: 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
  --font-sans: 'IBM Plex Sans', system-ui, sans-serif;
  --font-serif: 'Crimson Pro', Georgia, serif;
}
```

> **Note:** SF Mono is the primary monospace font. It ships with macOS and is preferred for its compact, clean letterforms. The fallback chain ensures consistent rendering across platforms. Lucida Grande is used specifically for the music library data grid (see `table.md`) and is applied inline rather than via a CSS variable.

## Type Scale

The type scale is based on a consistent 4px baseline grid with specific line height relationships optimized for code and content readability.

### Scale Table

| Size | Font Size | Line Height | Usage |
|------|-----------|-------------|-------|
| `xs` | 11px | 16px | Fine print, badges, metadata, button text |
| `sm` | 13px | 20px | **Default UI text**, sidebar items, form labels, input text |
| `base` | 14px | 22px | Note body text, form inputs, code comments |
| `md` | 16px | 24px | Published content body, blog posts, wiki text |
| `lg` | 18px | 28px | Section headers, content subheadings |
| `xl` | 24px | 32px | Page titles, modal headers |
| `2xl` | 32px | 40px | Hero titles (published sites only) |

### CSS Examples

```css
/* Tiny badge or metadata text */
.badge {
  font-size: 11px;
  line-height: 16px;
  font-family: var(--font-mono);
}

/* Default UI text - the workhorse */
.label {
  font-size: 13px;
  line-height: 20px;
  font-family: var(--font-mono);
}

/* Note body */
.note-body {
  font-size: 14px;
  line-height: 22px;
  font-family: var(--font-mono);
}

/* Published content */
.blog-post {
  font-size: 16px;
  line-height: 24px;
  font-family: var(--font-sans);
}

/* Section header */
.section-heading {
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
  font-family: var(--font-mono);
}

/* Page title */
.page-title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  font-family: var(--font-mono);
}
```

## Font Weights

The system uses three font weight levels for clear typographic hierarchy:

| Weight | Value | Usage |
|--------|-------|-------|
| Normal | 400 | Body text, default labels, regular content |
| Medium | 500 | Subtle emphasis, secondary headings, active states |
| Semibold | 600 | Primary headings, strong labels, accent states |

### CSS Examples

```css
/* Body text */
body {
  font-weight: 400;
}

/* Subtle emphasis */
.sidebar-item.active {
  font-weight: 500;
}

/* Heading */
h1, h2, h3 {
  font-weight: 600;
}

/* Strong label */
.button-primary {
  font-weight: 600;
}
```

## Design Rules

### Monospace is Default
- **13px is the workhorse.** The vast majority of UI text uses 13px SF Mono.
- This includes: buttons, labels, form fields, sidebar items, tabs, dialogs, and settings.
- Monospace ensures code examples and command output blend naturally with the interface.

### Data Grid Exception
- The music library table uses **Lucida Grande** at **11px** with **18px row height** — not monospace.
- This is a deliberate density optimization: proportional type fits more data per row.
- Applied inline via `font-family: 'Lucida Grande', system-ui, sans-serif`.

### Minimum Size
- **Never go below 11px.** This is the absolute minimum for badges and metadata only.
- Use 13px for all user-facing interactive text.

### Headings are Semantic
- Headings are defined by weight + size combinations, **never** by `text-transform` or letter-spacing.
- Use `font-weight: 600` to create heading emphasis, paired with larger sizes.
- Example: `h2 { font-size: 18px; font-weight: 600; }` (not `text-transform: uppercase`).

### Published Content is Larger
- Notes, blog posts, and wiki pages use a larger proportional type scale.
- **Base font size is 16px** (vs. 13px for UI).
- Use proportional fonts (`--font-sans` or `--font-serif`) for extended reading.
- The scale maintains consistent line-height ratios for comfortable reading.

### Per-Note Theme Selector
- Note view includes a **per-note theme selector** allowing users to choose typography:
  - **Raw** — Monospace rendering (code-like)
  - **Monospace** — Monospace font (SF Mono)
  - **Serif** — Serif proportional font (Crimson Pro)
  - **Sans** — Sans-serif proportional font (IBM Plex Sans)
- Respect user selection. These are personal reading preferences.

### Line Height Relationships
- Line height is always tied to a 4px grid:
  - 11px text → 16px line height (45% extra)
  - 13px text → 20px line height (54% extra)
  - 14px text → 22px line height (57% extra)
  - 16px text → 24px line height (50% extra)
- Larger text uses slightly tighter ratios for elegance.

## Usage Examples

### UI Button
```css
.button {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 20px;
  font-weight: 600;
}
```

### Form Label
```css
.form-label {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--foreground);
}
```

### Blog Post Body
```css
.blog-content {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: var(--foreground);
}
```

### Modal Header
```css
.modal-header {
  font-family: var(--font-mono);
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: var(--foreground);
}
```

### Sidebar Item
```css
.sidebar-item {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
}

.sidebar-item.active {
  font-weight: 500;
}
```

## Accessibility Notes

- All font sizes maintain proper contrast ratios when paired with semantic colors.
- Line heights (1.45–2.0) ensure readability for extended text.
- Monospace fonts aid users with dyslexia and improve code clarity.
- Proportional fonts for published content follow standard web typography best practices.
