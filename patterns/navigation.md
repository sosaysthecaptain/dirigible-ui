# Navigation

## Description

How users move through the Dirigible app. Navigation is hierarchical and always visible, supporting fast movement through deep collections and libraries.

## Patterns

### Sidebar File Tree

The primary navigation structure. Users expand folders and click items to navigate.

**Structure:**
- Always visible (collapsible but present)
- Click folder icon or folder name to expand/collapse
- Disclosure triangles point right (collapsed) or down (expanded)
- Click item to open and highlight it
- Active item gets `--accent` background highlight
- Folders contain both files and subfolders in the same list

**Example:**

```html
<nav class="sidebar-tree">
  <ul class="tree-list">
    <li class="tree-item">
      <button class="tree-toggle" aria-expanded="false">
        <svg class="tree-disclosure" width="12" height="12" viewBox="0 0 12 12">
          <path d="M3 4.5L8.5 9" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
      <span class="tree-label">Collections</span>
      <ul class="tree-list" hidden>
        <li class="tree-item">
          <span class="tree-label tree-active">My Notes</span>
        </li>
        <li class="tree-item">
          <span class="tree-label">Archived</span>
        </li>
      </ul>
    </li>
    <li class="tree-item">
      <button class="tree-toggle" aria-expanded="false">
        <svg class="tree-disclosure" width="12" height="12" viewBox="0 0 12 12">
          <path d="M3 4.5L8.5 9" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
      <span class="tree-label">Music</span>
    </li>
  </ul>
</nav>
```

**CSS:**

```css
.sidebar-tree {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  user-select: none;
}

.tree-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
}

.tree-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--muted);
  flex-shrink: 0;
}

.tree-disclosure {
  width: 12px;
  height: 12px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 150ms ease-out;
}

.tree-toggle[aria-expanded="true"] .tree-disclosure {
  transform: rotate(90deg);
}

.tree-label {
  flex: 1;
  padding: 4px 8px;
  color: var(--foreground);
  cursor: pointer;
  border-radius: 0;
  text-transform: capitalize;
  transition: background-color 150ms ease-out;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tree-label:hover {
  background: var(--hover);
}

.tree-label.tree-active {
  background: var(--accent);
  color: var(--background);
  font-weight: 500;
}

.tree-item .tree-list {
  padding-left: 8px;
  margin-top: 2px;
}
```

### Breadcrumb Trail

Shows the current location path and enables quick navigation to parent levels.

**Structure:**
- Format: "all › collection › item"
- Each segment is clickable and navigates to that level
- Kebab menu (⋮) at the end provides item-level actions
- Breadcrumbs always start with "all"
- Active/current item is not clickable

**Example:**

```html
<div class="breadcrumb">
  <nav class="breadcrumb-nav" aria-label="breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <a href="/" class="breadcrumb-link">all</a>
        <span class="breadcrumb-sep">›</span>
      </li>
      <li class="breadcrumb-item">
        <a href="/notes" class="breadcrumb-link">notes</a>
        <span class="breadcrumb-sep">›</span>
      </li>
      <li class="breadcrumb-item breadcrumb-current">
        <span>my-first-note</span>
      </li>
    </ol>
  </nav>

  <button class="breadcrumb-menu" aria-label="More actions">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="3" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    </svg>
  </button>
</div>
```

**CSS:**

```css
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 16px;
  height: 40px;
  border-bottom: 2px solid var(--border);
  background: var(--background);
}

.breadcrumb-nav {
  flex: 1;
  overflow: hidden;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.breadcrumb-link {
  color: var(--foreground);
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 0;
  transition: background-color 150ms ease-out;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
}

.breadcrumb-link:hover {
  background: var(--hover);
}

.breadcrumb-sep {
  color: var(--muted);
  padding: 0 4px;
  flex-shrink: 0;
}

.breadcrumb-current {
  color: var(--muted);
  padding: 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: 2px solid var(--border);
  cursor: pointer;
  color: var(--foreground);
  flex-shrink: 0;
  border-radius: 0;
  transition: all 150ms ease-out;
}

.breadcrumb-menu:hover {
  border-color: var(--accent);
  background: var(--hover);
}
```

### View Switching

Toolbar icons that let users switch between different content views.

**Views:**
- List: Single-column list of items
- Card: Grid of card-based items with images
- Table: Multi-column table with details
- Grid: Image-heavy grid (for libraries)

**Example:**

```html
<div class="view-switcher">
  <button class="view-button view-list is-active" aria-label="List view" aria-pressed="true">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <line x1="2" y1="2" x2="14" y2="2" stroke="currentColor" stroke-width="2" />
      <line x1="2" y1="7" x2="14" y2="7" stroke="currentColor" stroke-width="2" />
      <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" stroke-width="2" />
    </svg>
  </button>
  <button class="view-button view-card" aria-label="Card view">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="2" y="2" width="5" height="5" stroke="currentColor" stroke-width="2" />
      <rect x="9" y="2" width="5" height="5" stroke="currentColor" stroke-width="2" />
    </svg>
  </button>
  <button class="view-button view-table" aria-label="Table view">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="2" y="2" width="12" height="4" stroke="currentColor" stroke-width="2" />
      <rect x="2" y="6" width="12" height="4" stroke="currentColor" stroke-width="2" />
      <rect x="2" y="10" width="12" height="4" stroke="currentColor" stroke-width="2" />
    </svg>
  </button>
</div>
```

**CSS:**

```css
.view-switcher {
  display: flex;
  gap: 4px;
  align-items: center;
}

.view-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: 2px solid var(--border);
  color: var(--foreground);
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 0;
  transition: all 150ms ease-out;
}

.view-button:hover {
  border-color: var(--accent);
  background: var(--hover);
}

.view-button.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--background);
}
```

### Back Navigation

Simple navigation to go up one level in the hierarchy.

**Patterns:**
- Clicking "all" in breadcrumb goes to library root
- Clicking parent collection goes up one level
- Sidebar active item automatically updates when navigating

**Rule:** No separate "back" button needed — breadcrumbs and sidebar structure provide context and navigation.

### "Browse All" Landing

The home screen when no item is selected.

**Layout:**
- Centered vertical layout
- Dirigible logo at top
- "Browse all" button below
- Empty state message

**Example:**

```html
<div class="empty-state">
  <div class="empty-state-icon">
    <svg width="48" height="48" viewBox="0 0 48 48">
      <!-- Dirigible logo SVG -->
    </svg>
  </div>
  <h1 class="empty-state-title">Dirigible</h1>
  <p class="empty-state-message">Your notes and library in one place</p>
  <button class="btn btn-primary">Browse all</button>
</div>
```

**CSS:**

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 24px;
  background: var(--background);
}

.empty-state-icon {
  color: var(--accent);
}

.empty-state-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
}

.empty-state-message {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}
```

### Search

Global and scoped search functionality.

**Patterns:**
- Global search in sidebar header (magnifying glass + monospace input)
- Scoped filter in table/list header (filters current collection)
- Both use same visual style and icon

**Example:**

```html
<!-- Global search in sidebar -->
<div class="search-input-wrapper">
  <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="2" fill="none" />
    <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" stroke-width="2" />
  </svg>
  <input type="text" class="search-input" placeholder="search..." />
</div>

<!-- Scoped filter in header -->
<div class="filter-input-wrapper">
  <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="2" fill="none" />
    <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" stroke-width="2" />
  </svg>
  <input type="text" class="search-input" placeholder="filter..." />
</div>
```

**CSS:**

```css
.search-input-wrapper,
.filter-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border: 2px solid var(--border);
  background: var(--editor-bg);
  border-radius: 0;
}

.search-icon {
  color: var(--muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  background: none;
  border: none;
  color: var(--foreground);
  min-width: 0;
  outline: none;
}

.search-input::placeholder {
  color: var(--muted);
}

.search-input-wrapper:focus-within,
.filter-input-wrapper:focus-within {
  border-color: var(--accent);
}
```

### Tab-like Navigation

Content switching within a modal or panel.

**Use cases:**
- Themes modal: "Swatches" and "CSS" tabs
- Note theme selector in kebab menu: "Raw", "Monospace", "Serif", "Sans"

**Example:**

```html
<div class="tabs">
  <div class="tabs-header">
    <button class="tab-button is-active" data-tab="swatches">SWATCHES</button>
    <button class="tab-button" data-tab="css">CSS</button>
  </div>

  <div class="tabs-content">
    <div id="swatches" class="tab-pane is-active">
      <!-- Swatch grid content -->
    </div>
    <div id="css" class="tab-pane">
      <!-- CSS code block -->
    </div>
  </div>
</div>
```

**CSS:**

```css
.tabs-header {
  display: flex;
  gap: 0;
  border-bottom: 2px solid var(--border);
  background: var(--background);
}

.tab-button {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  text-transform: uppercase;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 12px 16px;
  cursor: pointer;
  color: var(--muted);
  transition: all 150ms ease-out;
}

.tab-button:hover {
  color: var(--foreground);
}

.tab-button.is-active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-pane {
  display: none;
  padding: 16px;
}

.tab-pane.is-active {
  display: block;
}
```

## Design Rules

1. **Sidebar is always visible** except when explicitly collapsed. Never hide navigation entirely.
2. **Breadcrumbs always show the full path** starting from "all".
3. **Active/selected items use `--accent` highlight** consistently across all navigation contexts.
4. **No nested navigation deeper than 3 levels.** Flatten deep structures with search or filtering.
5. **Tree disclosure triangles rotate 90° when expanded** for smooth visual feedback.
6. **All navigation text is uppercase monospace** for consistency with the design system.
7. **Hover states use `--hover` background** to indicate clickability.
8. **Search inputs must appear in both global and local contexts** for discoverability.
9. **View switcher buttons are always available** in collection headers.
10. **Tab navigation uses underline for active state**, never background fills.
