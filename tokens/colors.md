# Colors

Design tokens for the design system color palette. The system supports 20+ built-in themes with a comprehensive semantic color system and extensive syntax highlighting support.

## Semantic Colors

The core semantic color tokens define the default style. These provide the foundation for all UI elements and should be used as the primary color reference.

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--foreground` | `#1a1a1a` | Primary text, headings, foreground elements |
| `--background` | `#faf9f7` | Main background, page surface |
| `--border` | `#e0ddd8` | Dividers, borders, subtle separators |
| `--muted` | `#8a8580` | Disabled text, secondary labels, metadata |
| `--hover` | `#f0eeea` | Hover states, subtle background highlights |
| `--accent` | `#E8915A` | Primary actions, interactive elements (warm orange) |
| `--accent-hover` | `#d4804a` | Accent hover state, pressed buttons |
| `--danger` | `#dc2626` | Destructive actions, errors, alerts |
| `--success` | `#16a34a` | Successful states, confirmations, valid inputs |
| `--warning` | `#f59e0b` | Cautions, warnings, non-critical alerts |

### Dark Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--foreground` | `#f2f0ed` | Primary text, headings, foreground elements |
| `--background` | `#181716` | Main background, page surface |
| `--border` | `#302e2b` | Dividers, borders, subtle separators |
| `--muted` | `#999795` | Disabled text, secondary labels, metadata |
| `--hover` | `#232120` | Hover states, subtle background highlights |
| `--accent` | `#E8915A` | Primary actions, interactive elements (warm orange) |
| `--accent-hover` | `#d4804a` | Accent hover state, pressed buttons |
| `--danger` | `#ef4444` | Destructive actions, errors, alerts |
| `--success` | `#4ec9b0` | Successful states, confirmations, valid inputs |
| `--warning` | `#ce9178` | Cautions, warnings, non-critical alerts |

## Theme CSS Variables

The system includes a built-in themes system that provides complete CSS variable sets for each theme. The actual runtime implementation uses the following variables (shown for Light and Dark themes):

### Light Theme Variables
```css
:root[data-theme="light"] {
  --background: #fefefe;
  --foreground: #1a1a1a;
  --accent: #0066cc;
  --accent-muted: #3d8bd4;
  --selection: #0066cc;
  --muted: #777777;
  --border: #e8e6e3;
  --sidebar-bg: #faf9f8;
  --editor-bg: #fefefe;
  --hover: #f5f4f2;
  --success: #22c55e;
  --warning: #f59e0b;
  --pdf-bg: #eae8e4;
  --btn-primary-bg: #1a1a1a;
  --btn-primary-fg: #ffffff;
  --btn-secondary-bg: #ffffff;
  --btn-secondary-fg: #1a1a1a;
  --danger: #dc2626;
  --context-menu-bg: #ffffff;
  --context-menu-border: #e0e0e0;
  --context-menu-divider: #e0e0e0;
  --context-menu-hover: rgba(0, 0, 0, 0.08);
  --code-bg: #f5f5f5;
  --code-fg: #1f2937;
  --code-muted: #6b7280;
  --link: #0969da;
  --link-underline: rgba(9, 105, 218, 0.4);
  --scrollbar-thumb: #ccc;
  --scrollbar-track: #faf9f8;
}
```

### Dark Theme Variables
```css
:root[data-theme="dark"] {
  --background: #181716;
  --foreground: #f2f0ed;
  --accent: #6ba3d6;
  --accent-muted: #3d6a8a;
  --selection: #3d6a8a;
  --muted: #999795;
  --border: #302e2b;
  --sidebar-bg: #1e1d1b;
  --editor-bg: #181716;
  --hover: #232120;
  --success: #4ec9b0;
  --warning: #ce9178;
  --pdf-bg: #252320;
  --btn-primary-bg: #e5e5e5;
  --btn-primary-fg: #1a1a1a;
  --btn-secondary-bg: #1a1a1a;
  --btn-secondary-fg: #e5e5e5;
  --danger: #ef4444;
  --context-menu-bg: #252525;
  --context-menu-border: #444444;
  --context-menu-divider: #333333;
  --context-menu-hover: rgba(255, 255, 255, 0.1);
  --code-bg: #1e1e1e;
  --code-fg: #d4d4d4;
  --code-muted: #858585;
  --link: #58a6ff;
  --link-underline: rgba(88, 166, 255, 0.4);
  --scrollbar-thumb: #444;
  --scrollbar-track: #1e1d1b;
}
```

## Syntax Highlighting Colors

Markdown and code syntax highlighting tokens for the light theme:

| Token | Value | Usage |
|-------|-------|-------|
| `--syntax-text` | `#005661` | Default text color |
| `--syntax-caret` | `#005661` | Cursor/caret color |
| `--syntax-heading` | `#ff5792` | Markdown headings |
| `--syntax-emphasis` | `#fa8900` | Italics, emphasis |
| `--syntax-strong` | `#fa8900` | Bold text |
| `--syntax-strikethrough` | `#8ca6a6` | Strikethrough text |
| `--syntax-code` | `#00b368` | Inline code |
| `--syntax-code-bg` | `rgba(0, 179, 104, 0.08)` | Inline code background |
| `--syntax-link` | `#00bdd6` | Link text |
| `--syntax-url` | `#0095a8` | URLs and anchors |
| `--syntax-quote` | `#8ca6a6` | Block quotes |
| `--syntax-meta` | `#5842ff` | Metadata, attributes |
| `--syntax-label` | `#b3694d` | Labels, tags |
| `--syntax-selection` | `rgba(0, 149, 168, 0.2)` | Selected text background |
| `--syntax-selection-focused` | `rgba(0, 149, 168, 0.3)` | Selected text (focused) |
| `--syntax-active-line` | `rgba(0, 86, 97, 0.06)` | Active line background |

## Available Themes

The system includes 22 built-in themes:

1. Dirigible Light
2. Alabaster
3. Dirigible Dark
4. Amber Terminal
5. Green Terminal
6. Catppuccin Mocha
7. Tokyo Night
8. Catppuccin Frappé
9. Gruvbox Dark
10. Rosé Pine
11. Nord
12. Dracula
13. Ayu Dark
14. Kanagawa
15. Vesper
16. Monokai Pro
17. Nightfox
18. Solarized Dark
19. Catppuccin Macchiato
20. GitHub Dark
21. Poimandres
22. Everforest
23. Desert

## Usage

### CSS Variables
Apply colors using CSS custom properties:

```css
/* Text and backgrounds */
color: var(--foreground);
background-color: var(--background);

/* Interactive elements */
background-color: var(--accent);
border-color: var(--border);

/* States */
background-color: var(--hover);
color: var(--muted);

/* Semantic colors */
background-color: var(--success);
background-color: var(--danger);
background-color: var(--warning);
```

### Theme Switching
Themes are applied via `data-theme` attribute on the root element:

```html
<html data-theme="light">
  <!-- Light theme applied -->
</html>

<html data-theme="dark">
  <!-- Dark theme applied -->
</html>
```

## Design Notes

- **Semantic vs. Theme System**: The design system provides semantic color tokens (foreground, background, accent, etc.) as the primary language. The runtime theme system extends these with specialized variables for UI components (buttons, context menus, code blocks, etc.).
- **Accent Colors**: The default accent color is a muted blue (`#3d8ad3`). Individual themes can override this with their own accent colors.
- **Light & Dark**: Always use CSS variables rather than hardcoded colors. This ensures proper theme support across all 22+ built-in themes.
- **Contrast**: All color combinations meet WCAG AA accessibility standards for text and interactive elements.
- **Syntax Highlighting**: The syntax colors are designed for markdown and code readability. They adapt per theme automatically.
