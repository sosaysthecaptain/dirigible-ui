# Theme System

## Description

How the app's theming works, from tokens to runtime switching. The theme system provides 23 built-in themes and allows users to customize colors while maintaining a consistent visual language.

## Architecture

### Theme Implementation

All colors in the app are defined as CSS custom properties on the `:root` element. Themes are swapped by replacing these property values at runtime.

**Key Principle:** Components never use raw colors — always reference theme tokens via `var(--token-name)`.

### Theme Variants

- **2 built-in light themes** (default light + alternatives)
- **21 built-in dark themes** (includes default dark)
- **Total: 23 themes**

### Theme Switching

Users can toggle between their default light and dark theme with a moon/sun icon in the sidebar bottom bar. The full theme browser is accessible via the paint palette icon in the sidebar bottom bar.

## Semantic Color Tokens

Every theme must define the following semantic tokens:

```css
:root {
  /* Core Colors */
  --background: #f5f5f5;
  --foreground: #1a1a1a;
  --accent: #2563eb;
  --accent-muted: #93c5fd;
  --selection: #dbeafe;
  --muted: #6b7280;
  --border: #d1d5db;

  /* Layout Colors */
  --sidebar-bg: #ffffff;
  --editor-bg: #fafafa;
  --hover: #f3f4f6;

  /* State Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;

  /* Component Colors */
  --pdf-bg: #ffffff;
  --btn-primary-bg: #2563eb;
  --btn-primary-fg: #ffffff;
  --btn-secondary-bg: #e5e7eb;
  --btn-secondary-fg: #1f2937;

  /* Context Menu */
  --context-menu-bg: #ffffff;
  --context-menu-border: #e5e7eb;
  --context-menu-divider: #f3f4f6;
  --context-menu-hover: #f9fafb;

  /* Code Block */
  --code-bg: #f3f4f6;
  --code-fg: #1f2937;
  --code-muted: #6b7280;

  /* Links */
  --link: #2563eb;
  --link-underline: #dbeafe;

  /* Scrollbar */
  --scrollbar-thumb: #cbd5e1;
  --scrollbar-track: transparent;

  /* Syntax Highlighting (Code Editor) */
  --syntax-keyword: #7c3aed;
  --syntax-string: #059669;
  --syntax-number: #ea580c;
  --syntax-function: #0369a1;
  --syntax-comment: #6b7280;
  --syntax-operator: #7c3aed;
}
```

### Token Organization

| Category | Tokens |
|----------|--------|
| **Core** | `--background`, `--foreground`, `--accent`, `--accent-muted`, `--selection`, `--muted`, `--border` |
| **Layout** | `--sidebar-bg`, `--editor-bg`, `--hover` |
| **Feedback** | `--success`, `--warning`, `--danger` |
| **Components** | `--pdf-bg`, `--btn-primary-bg`, `--btn-primary-fg`, `--btn-secondary-bg`, `--btn-secondary-fg` |
| **Context Menus** | `--context-menu-bg`, `--context-menu-border`, `--context-menu-divider`, `--context-menu-hover` |
| **Code** | `--code-bg`, `--code-fg`, `--code-muted` |
| **Links** | `--link`, `--link-underline` |
| **Scrollbar** | `--scrollbar-thumb`, `--scrollbar-track` |
| **Syntax** | `--syntax-keyword`, `--syntax-string`, `--syntax-number`, `--syntax-function`, `--syntax-comment`, `--syntax-operator` |

## Themes Modal

Accessible via the paint palette icon in the sidebar bottom bar.

### Modal Layout

**Header:**
- Title: "THEMES"
- Paint palette icon
- Close button (X)

**Content Tabs:**
1. **Swatches Tab** (default)
   - Grid of color swatches showing the theme colors
   - Each swatch is labeled with its token name
   - Live preview of the selected theme
   - "Set as default light/dark theme" button in footer

2. **CSS Tab**
   - Raw CSS variable declarations
   - Monospace font
   - Copy-able code block
   - Shows all `--token` definitions

**Live Preview:**
- Sidebar mockup showing the theme in use
- Content area showing how text and UI elements appear
- Updates in real-time as user browses themes

**Footer:**
- Left: "Set as default light/dark theme" button (context-aware)
- Right: "Cancel" button

### Example Theme Structure

```javascript
const themes = {
  "default-light": {
    name: "Default Light",
    variant: "light",
    colors: {
      background: "#ffffff",
      foreground: "#1a1a1a",
      accent: "#2563eb",
      // ... all tokens
    },
    syntax: {
      keyword: "#7c3aed",
      string: "#059669",
      // ... all syntax tokens
    }
  },
  "default-dark": {
    name: "Default Dark",
    variant: "dark",
    colors: {
      background: "#1a1a1a",
      foreground: "#ffffff",
      accent: "#3b82f6",
      // ... all tokens
    },
    syntax: {
      // ... syntax tokens
    }
  },
  // ... 21 more dark themes
};
```

### Themes Modal HTML

```html
<div class="modal modal-themes" role="dialog" aria-labelledby="themes-title">
  <div class="modal-header">
    <svg class="modal-icon" width="24" height="24" viewBox="0 0 24 24">
      <!-- Paint palette icon -->
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
    </svg>
    <h1 id="themes-title" class="modal-title">THEMES</h1>
    <button class="modal-close" aria-label="Close">✕</button>
  </div>

  <div class="tabs">
    <div class="tabs-header">
      <button class="tab-button is-active" data-tab="swatches">SWATCHES</button>
      <button class="tab-button" data-tab="css">CSS</button>
    </div>

    <div class="tabs-content">
      <!-- Swatches Tab -->
      <div id="swatches" class="tab-pane is-active">
        <div class="themes-grid">
          <div class="theme-card" data-theme="default-light">
            <div class="theme-preview">
              <div class="preview-sidebar"></div>
              <div class="preview-content"></div>
            </div>
            <span class="theme-name">Default Light</span>
            <span class="theme-variant">light</span>
          </div>

          <div class="theme-card is-selected" data-theme="default-dark">
            <div class="theme-preview">
              <div class="preview-sidebar"></div>
              <div class="preview-content"></div>
            </div>
            <span class="theme-name">Default Dark</span>
            <span class="theme-variant">dark</span>
          </div>

          <!-- More theme cards -->
        </div>

        <div class="color-swatches">
          <div class="swatch-group">
            <h3 class="swatch-group-title">CORE COLORS</h3>
            <div class="swatches-list">
              <div class="swatch">
                <div class="swatch-preview" style="background: var(--background);"></div>
                <span class="swatch-token">--background</span>
              </div>
              <div class="swatch">
                <div class="swatch-preview" style="background: var(--foreground);"></div>
                <span class="swatch-token">--foreground</span>
              </div>
              <!-- More swatches -->
            </div>
          </div>
        </div>
      </div>

      <!-- CSS Tab -->
      <div id="css" class="tab-pane">
        <pre class="css-code"><code>
:root {
  --background: #1a1a1a;
  --foreground: #ffffff;
  --accent: #3b82f6;
  /* ... all tokens ... */
}
        </code></pre>
      </div>
    </div>
  </div>

  <div class="modal-footer">
    <button class="btn btn-primary">Set as default dark theme</button>
    <button class="btn btn-secondary">Cancel</button>
  </div>
</div>
```

### Themes Modal CSS

```css
.modal-themes {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background);
  border: 2px solid var(--border);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  z-index: 200;
  max-width: 700px;
  width: 90vw;
  max-height: 80vh;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  padding: 24px;
  overflow-y: auto;
}

.theme-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: 2px solid var(--border);
  border-radius: 0;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.theme-card:hover {
  border-color: var(--accent);
  background: var(--hover);
}

.theme-card.is-selected {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--background);
}

.theme-preview {
  width: 100%;
  height: 80px;
  background: var(--editor-bg);
  border: 2px solid var(--border);
  border-radius: 0;
  display: flex;
  overflow: hidden;
}

.preview-sidebar {
  width: 30%;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
}

.preview-content {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.theme-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.theme-variant {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
}

.color-swatches {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.swatch-group {
  margin-bottom: 24px;
}

.swatch-group:last-child {
  margin-bottom: 0;
}

.swatch-group-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 12px 0;
}

.swatches-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.swatch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.swatch-preview {
  width: 100%;
  height: 48px;
  border: 2px solid var(--border);
  border-radius: 0;
}

.swatch-token {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  word-break: break-word;
}

.css-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  background: var(--code-bg);
  border: 2px solid var(--border);
  padding: 16px;
  border-radius: 0;
  overflow: auto;
  margin: 0;
  color: var(--code-fg);
}
```

## Per-Note Font Themes

Separate from color themes. Controls the font family used in the note reading view.

**Access:** Kebab menu (⋮) → THEME section

**Options:**
- Raw (monospace, like JetBrains Mono)
- Monospace (system monospace)
- Serif (Georgia, similar serif)
- Sans (system sans-serif)

**Scope:** Only affects note content reading view, not the app chrome.

### Font Theme HTML

```html
<div class="font-theme-selector">
  <span class="selector-label">FONT THEME</span>
  <div class="font-options">
    <button class="font-option is-active" data-font="raw">Raw</button>
    <button class="font-option" data-font="monospace">Monospace</button>
    <button class="font-option" data-font="serif">Serif</button>
    <button class="font-option" data-font="sans">Sans</button>
  </div>
</div>
```

### Font Theme CSS

```css
.font-theme-selector {
  padding: 12px 0;
  border-top: 1px solid var(--border);
}

.selector-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--muted);
  display: block;
  margin-bottom: 8px;
}

.font-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.font-option {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  background: none;
  border: none;
  padding: 8px 12px;
  color: var(--foreground);
  cursor: pointer;
  text-align: left;
  transition: all 150ms ease-out;
  border-left: 2px solid transparent;
}

.font-option:hover {
  background: var(--hover);
}

.font-option.is-active {
  background: var(--hover);
  border-left-color: var(--accent);
  color: var(--accent);
}

/* Apply font theme to note content */
.note-content.font-raw {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.note-content.font-monospace {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.note-content.font-serif {
  font-family: Georgia, serif;
  font-size: 15px;
  line-height: 1.8;
}

.note-content.font-sans {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.8;
}
```

## Example Theme Implementation

```javascript
// Applying a theme at runtime
function applyTheme(themeId) {
  const theme = themes[themeId];
  const root = document.documentElement;

  // Set color tokens
  Object.entries(theme.colors).forEach(([token, value]) => {
    root.style.setProperty(`--${token}`, value);
  });

  // Set syntax tokens
  Object.entries(theme.syntax).forEach(([token, value]) => {
    root.style.setProperty(`--syntax-${token}`, value);
  });

  // Save user preference
  localStorage.setItem('preferred-theme', themeId);
}

// On app load
const savedTheme = localStorage.getItem('preferred-theme') || 'default-dark';
applyTheme(savedTheme);
```

## Design Rules

1. **All colors are CSS custom properties** on `:root` — never use raw color values in components.
2. **Theme tokens are semantic** — `--accent` means "primary interactive color", not just "blue".
3. **Syntax highlighting has dedicated tokens** — `--syntax-keyword`, `--syntax-string`, etc.
4. **Light and dark themes both supported** — users can set defaults for each.
5. **Themes can be toggled with moon/sun icon** — quick light/dark switch without modal.
6. **Full theme browser is modal-based** — paint palette icon in sidebar bottom bar.
7. **Theme preview shows sidebar + content** — users see how theme looks in context.
8. **Font themes are per-note** — separate from color themes.
9. **Font theme selection is in kebab menu** — doesn't clutter main UI.
10. **Theme switching is instant** — CSS property updates trigger immediate re-render.
11. **User preferences are persisted** — localStorage saves theme and font choices.
12. **23 total themes provided** — 2 light, 21 dark for variety.
