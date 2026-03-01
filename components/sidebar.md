# Sidebar

## Description

A collapsible left navigation panel containing the app name, search functionality, view toggles, file tree navigation, and bottom status bar. The sidebar provides quick access to all collections, folders, and documents in the Dirigible library.

## When to Use

The sidebar is the primary navigation structure. It's always visible on desktop layouts (unless collapsed) and contains:

- App branding and identity
- Quick search across all items
- View mode toggles (list, card, table, grid)
- Hierarchical file/folder tree with disclosure triangles
- Quick status indicators (published, bookmarked)
- Bottom utilities (sync status, theme toggle, user account)

## Anatomy

```
<aside class="sidebar">
  <!-- Header -->
  <div class="sidebar-header">
    <div class="sidebar-logo">
      <svg class="sidebar-logo-icon"><!-- dirigible icon --></svg>
      <h1 class="sidebar-app-name">Dirigible</h1>
    </div>
    <button class="sidebar-new-button" aria-label="Create new item">+</button>
  </div>

  <!-- Search -->
  <div class="sidebar-search">
    <svg class="sidebar-search-icon" width="16" height="16"><!-- magnifying glass --></svg>
    <input type="text" class="sidebar-search-input" placeholder="Search..." />
  </div>

  <!-- View Toggles -->
  <div class="sidebar-view-toggles">
    <button class="view-toggle" data-view="list" title="List view">
      <svg width="16" height="16"><!-- list icon --></svg>
    </button>
    <button class="view-toggle" data-view="card" title="Card view">
      <svg width="16" height="16"><!-- card icon --></svg>
    </button>
    <button class="view-toggle" data-view="table" title="Table view">
      <svg width="16" height="16"><!-- table icon --></svg>
    </button>
    <button class="view-toggle" data-view="grid" title="Grid view">
      <svg width="16" height="16"><!-- grid icon --></svg>
    </button>
  </div>

  <!-- File Tree -->
  <nav class="sidebar-tree">
    <ul class="tree-list">
      <li class="tree-item">
        <button class="tree-toggle">
          <svg class="tree-chevron"><!-- disclosure triangle --></svg>
        </button>
        <svg class="tree-icon"><!-- folder icon --></svg>
        <span class="tree-label">Notes</span>
        <span class="tree-badge tree-badge-published"></span>
      </li>
    </ul>
  </nav>

  <!-- Bottom Bar -->
  <div class="sidebar-bottom">
    <button class="sidebar-icon-button" title="Sync">
      <svg width="16" height="16"><!-- cloud sync icon --></svg>
    </button>
    <button class="sidebar-icon-button" title="Publish">
      <svg width="16" height="16"><!-- publish icon --></svg>
    </button>
    <button class="sidebar-icon-button" title="Theme">
      <svg width="16" height="16"><!-- moon/sun icon --></svg>
    </button>
    <button class="sidebar-icon-button" title="Account">
      <svg width="16" height="16"><!-- user icon --></svg>
    </button>
  </div>

  <!-- Collapse button -->
  <button class="sidebar-collapse" aria-label="Collapse sidebar">◀</button>
</aside>
```

**Structure:**
- `<aside>` element with class `.sidebar`
- Header section with app logo, name, and "+" new button
- Search bar with icon prefix
- View toggle buttons (horizontal row)
- File tree navigation with nested list structure
- Bottom bar with utility buttons
- Collapse arrow button on right edge

## Token Usage

- **Width**: 180-200px
- **Background**: `--sidebar-bg` (slightly different from main background)
- **Font**: 13px monospace for labels
- **Padding**: 12px horizontal, 8px vertical on sections
- **Gap**: 8px between items
- **Border radius**: 4px on buttons and tree items
- **Icon size**: 16px for most icons
- **Colors**:
  - Active item: `--accent` background with white text
  - Hover: Slight background highlight
  - Badges: Green (--success) for published, Black for bookmarked
  - Text: `--foreground` for active, `--color-muted` for inactive
- **Line height**: 1.4 (18px at 13px font)

## HTML Example

```html
<aside class="sidebar">
  <!-- Header -->
  <div class="sidebar-header">
    <div class="sidebar-logo">
      <svg class="sidebar-logo-icon" width="20" height="20" viewBox="0 0 20 20">
        <!-- Dirigible icon -->
      </svg>
      <h1 class="sidebar-app-name">Dirigible</h1>
    </div>
    <button class="sidebar-new-button" aria-label="Create new item">+</button>
  </div>

  <!-- Search -->
  <div class="sidebar-search">
    <svg class="sidebar-search-icon" width="16" height="16">
      <!-- Magnifying glass icon -->
    </svg>
    <input
      type="text"
      class="sidebar-search-input"
      placeholder="Search..."
      aria-label="Search library"
    />
  </div>

  <!-- View Toggles -->
  <div class="sidebar-view-toggles">
    <button
      class="view-toggle view-toggle-active"
      data-view="list"
      title="List view"
      aria-label="Switch to list view"
    >
      <svg width="16" height="16"><!-- list icon --></svg>
    </button>
    <button class="view-toggle" data-view="card" title="Card view">
      <svg width="16" height="16"><!-- card icon --></svg>
    </button>
    <button class="view-toggle" data-view="table" title="Table view">
      <svg width="16" height="16"><!-- table icon --></svg>
    </button>
    <button class="view-toggle" data-view="grid" title="Grid view">
      <svg width="16" height="16"><!-- grid icon --></svg>
    </button>
  </div>

  <!-- File Tree -->
  <nav class="sidebar-tree">
    <ul class="tree-list">
      <!-- Collapsible folder -->
      <li class="tree-item">
        <button class="tree-toggle" aria-label="Toggle folder">
          <svg class="tree-chevron" width="12" height="12">
            <!-- Disclosure triangle pointing right -->
          </svg>
        </button>
        <svg class="tree-icon" width="16" height="16"><!-- folder icon --></svg>
        <span class="tree-label">Archive</span>
      </li>

      <!-- Expanded folder with children -->
      <li class="tree-item tree-item-expanded">
        <button class="tree-toggle" aria-label="Toggle folder">
          <svg class="tree-chevron tree-chevron-down" width="12" height="12">
            <!-- Disclosure triangle pointing down -->
          </svg>
        </button>
        <svg class="tree-icon" width="16" height="16"><!-- folder icon --></svg>
        <span class="tree-label">Personal</span>
        <span class="tree-badge tree-badge-published"></span>

        <ul class="tree-list tree-list-nested">
          <!-- Child items -->
          <li class="tree-item">
            <svg class="tree-icon" width="16" height="16"><!-- document icon --></svg>
            <span class="tree-label">Life goals</span>
            <span class="tree-badge tree-badge-bookmarked"></span>
          </li>

          <li class="tree-item tree-item-active">
            <svg class="tree-icon" width="16" height="16"><!-- document icon --></svg>
            <span class="tree-label">Daily notes</span>
            <span class="tree-badge tree-badge-published"></span>
          </li>
        </ul>
      </li>

      <!-- Music collection -->
      <li class="tree-item">
        <button class="tree-toggle">
          <svg class="tree-chevron"><!-- disclosure triangle --></svg>
        </button>
        <svg class="tree-icon" width="16" height="16"><!-- music note icon --></svg>
        <span class="tree-label">Music</span>
      </li>
    </ul>
  </nav>

  <!-- Bottom Bar -->
  <div class="sidebar-bottom">
    <button
      class="sidebar-icon-button"
      title="Sync to folder"
      aria-label="Sync library"
    >
      <svg width="16" height="16"><!-- cloud down arrow --></svg>
    </button>
    <button class="sidebar-icon-button" title="Publish">
      <svg width="16" height="16"><!-- publish/globe icon --></svg>
    </button>
    <button
      class="sidebar-icon-button"
      title="Toggle theme"
      aria-label="Toggle dark/light mode"
    >
      <svg width="16" height="16"><!-- moon/sun icon --></svg>
    </button>
    <button class="sidebar-icon-button" title="Account">
      <svg width="16" height="16"><!-- user icon --></svg>
    </button>
  </div>

  <!-- Collapse button -->
  <button class="sidebar-collapse" aria-label="Collapse sidebar">◀</button>
</aside>
```

## CSS Example

```css
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 100vh;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  transition: width 0.3s ease;
  z-index: 100;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-logo-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--accent);
}

.sidebar-app-name {
  font-family: var(--font-family-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
}

.sidebar-new-button {
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--foreground);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s ease;
}

.sidebar-new-button:hover {
  background-color: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.sidebar-search {
  position: relative;
  margin: 8px 12px;
}

.sidebar-search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-muted);
  pointer-events: none;
}

.sidebar-search-input {
  width: 100%;
  font-family: var(--font-family-mono);
  font-size: 13px;
  padding: 6px 8px 6px 28px;
  border: 2px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--foreground);
  transition: border-color 0.15s ease;
}

.sidebar-search-input::placeholder {
  color: var(--color-muted);
}

.sidebar-search-input:focus {
  outline: none;
  border-color: var(--accent);
}

.sidebar-view-toggles {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
}

.view-toggle {
  flex: 1;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.view-toggle:hover {
  color: var(--foreground);
  border-color: var(--foreground);
}

.view-toggle-active {
  background-color: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.sidebar-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.tree-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tree-list-nested {
  margin-left: 20px;
  padding-top: 4px;
}

.tree-item {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  min-height: 28px;
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--foreground);
  cursor: pointer;
  transition: background-color 0.1s ease;
  user-select: none;
}

.tree-item:hover {
  background-color: var(--hover-bg);
}

.tree-item-active {
  background-color: var(--accent);
  color: #ffffff;
  border-radius: 4px;
}

.tree-item-active .tree-icon {
  color: #ffffff;
}

.tree-toggle {
  width: 20px;
  height: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-muted);
}

.tree-chevron {
  width: 12px;
  height: 12px;
  transition: transform 0.2s ease;
  color: inherit;
}

.tree-chevron-down {
  transform: rotate(90deg);
}

.tree-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  flex-shrink: 0;
  color: var(--color-muted);
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5px;
}

.tree-item-active .tree-icon {
  color: #ffffff;
}

.tree-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 4px;
  flex-shrink: 0;
}

.tree-badge-published {
  background-color: var(--success);
}

.tree-badge-bookmarked {
  background-color: #000;
}

.sidebar-bottom {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  border-top: 1px solid var(--border);
}

.sidebar-icon-button {
  flex: 1;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  transition: color 0.15s ease;
}

.sidebar-icon-button:hover {
  color: var(--foreground);
}

.sidebar-icon-button svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5px;
}

.sidebar-collapse {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--color-muted);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.15s ease;
}

.sidebar-collapse:hover {
  color: var(--foreground);
}

/* Collapsed sidebar state */
.sidebar-collapsed .sidebar-app-name,
.sidebar-collapsed .sidebar-search-input,
.sidebar-collapsed .view-toggle,
.sidebar-collapsed .tree-label {
  display: none;
}

.sidebar-collapsed .sidebar-header {
  flex-direction: column;
  gap: 8px;
}

.sidebar-collapsed .sidebar-logo-icon {
  margin: 0;
}
```

## JSX Example

```jsx
// Sidebar Component
const [isCollapsed, setIsCollapsed] = useState(false);
const [currentView, setCurrentView] = useState('list');
const [searchQuery, setSearchQuery] = useState('');
const [items, setItems] = useState([
  {
    id: 'archive',
    name: 'Archive',
    type: 'folder',
    children: [],
    published: false,
    bookmarked: false,
  },
  {
    id: 'personal',
    name: 'Personal',
    type: 'folder',
    children: [
      {
        id: 'life-goals',
        name: 'Life goals',
        type: 'document',
        published: false,
        bookmarked: true,
      },
      {
        id: 'daily-notes',
        name: 'Daily notes',
        type: 'document',
        published: true,
        bookmarked: false,
      },
    ],
    published: true,
    bookmarked: false,
  },
  {
    id: 'music',
    name: 'Music',
    type: 'folder',
    children: [],
    published: false,
    bookmarked: false,
  },
]);
const [expandedFolders, setExpandedFolders] = useState(new Set(['personal']));
const [activeItemId, setActiveItemId] = useState('daily-notes');

const toggleFolder = (folderId) => {
  const newExpanded = new Set(expandedFolders);
  if (newExpanded.has(folderId)) {
    newExpanded.delete(folderId);
  } else {
    newExpanded.add(folderId);
  }
  setExpandedFolders(newExpanded);
};

const getIconForType = (type) => {
  switch (type) {
    case 'folder':
      return <FolderIcon width="16" height="16" />;
    case 'document':
      return <DocumentIcon width="16" height="16" />;
    case 'music':
      return <MusicNoteIcon width="16" height="16" />;
    default:
      return null;
  }
};

const renderTreeItem = (item, isChild = false) => (
  <li
    key={item.id}
    className={`tree-item ${activeItemId === item.id ? 'tree-item-active' : ''}`}
    onClick={() => setActiveItemId(item.id)}
  >
    {item.children && item.children.length > 0 && (
      <button
        className="tree-toggle"
        onClick={(e) => {
          e.stopPropagation();
          toggleFolder(item.id);
        }}
      >
        <svg
          className={`tree-chevron ${expandedFolders.has(item.id) ? 'tree-chevron-down' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <polyline points="3,1 9,6 3,11" fill="none" stroke="currentColor" />
        </svg>
      </button>
    )}
    {getIconForType(item.type)}
    <span className="tree-label">{item.name}</span>
    {item.published && <span className="tree-badge tree-badge-published"></span>}
    {item.bookmarked && <span className="tree-badge tree-badge-bookmarked"></span>}

    {item.children && expandedFolders.has(item.id) && (
      <ul className="tree-list tree-list-nested">
        {item.children.map((child) => renderTreeItem(child, true))}
      </ul>
    )}
  </li>
);

<aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
  {/* Header */}
  <div className="sidebar-header">
    <div className="sidebar-logo">
      <DirigibleIcon className="sidebar-logo-icon" width="20" height="20" />
      <h1 className="sidebar-app-name">Dirigible</h1>
    </div>
    <button
      className="sidebar-new-button"
      aria-label="Create new item"
      onClick={() => openCreateModal()}
    >
      +
    </button>
  </div>

  {/* Search */}
  <div className="sidebar-search">
    <MagnifyingGlassIcon className="sidebar-search-icon" width="16" height="16" />
    <input
      type="text"
      className="sidebar-search-input"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      aria-label="Search library"
    />
  </div>

  {/* View Toggles */}
  <div className="sidebar-view-toggles">
    {['list', 'card', 'table', 'grid'].map((view) => (
      <button
        key={view}
        className={`view-toggle ${currentView === view ? 'view-toggle-active' : ''}`}
        data-view={view}
        title={`${view} view`}
        onClick={() => setCurrentView(view)}
      >
        {getViewIcon(view)}
      </button>
    ))}
  </div>

  {/* File Tree */}
  <nav className="sidebar-tree">
    <ul className="tree-list">
      {items.map((item) => renderTreeItem(item))}
    </ul>
  </nav>

  {/* Bottom Bar */}
  <div className="sidebar-bottom">
    <button className="sidebar-icon-button" title="Sync to folder">
      <CloudSyncIcon width="16" height="16" />
    </button>
    <button className="sidebar-icon-button" title="Publish">
      <PublishIcon width="16" height="16" />
    </button>
    <button className="sidebar-icon-button" title="Toggle theme">
      <MoonIcon width="16" height="16" />
    </button>
    <button className="sidebar-icon-button" title="Account">
      <UserIcon width="16" height="16" />
    </button>
  </div>

  {/* Collapse Button */}
  <button
    className="sidebar-collapse"
    aria-label="Collapse sidebar"
    onClick={() => setIsCollapsed(!isCollapsed)}
  >
    {isCollapsed ? '▶' : '◀'}
  </button>
</aside>
```

## Do's and Don'ts

### Do
- Keep the sidebar 180-200px wide for readability
- Use icons consistently to indicate content type (folder, document, music)
- Use disclosure triangles for expandable folders
- Show active item with accent background highlight
- Provide search functionality at the top
- Include quick view toggles (list, card, table, grid)
- Use small colored badges to indicate state (published, bookmarked)
- Support collapsing to a narrow icon-only sidebar
- Organize items hierarchically with indentation
- Use monospace font for all labels (13px)

### Don't
- Make the sidebar wider than 200px (hard to scan)
- Use text labels for all bottom buttons; icons are sufficient
- Nest folders too deeply (3+ levels becomes hard to navigate)
- Use colorful or contrasting backgrounds for tree items (only accent for active)
- Hide critical items in a collapsed sidebar without tooltips
- Forget to show publication/bookmark status via badges
- Use different fonts or sizes in the tree labels
- Make the sidebar non-scrollable if content exceeds viewport height
- Leave horizontal overflow in tree labels (use text-overflow: ellipsis)
- Disable keyboard navigation in the file tree

## Rules Specific to Sidebars

1. **Fixed width**: Sidebar is 180-200px wide when expanded, ~60px when collapsed
2. **Monospace labels**: All tree labels use JetBrains Mono 13px
3. **Disclosure triangles**: Folders have collapsible toggles with rotating chevrons
4. **Active item highlight**: Current item has --accent background with white text
5. **Status badges**: Small colored dots indicate published (green) or bookmarked (black)
6. **Icons for types**: Each item shows icon for its type (folder, document, music, etc.)
7. **Nestable structure**: Folders can contain other items with 20px left indentation
8. **Sticky header and footer**: Header and bottom bar remain visible when tree scrolls
9. **Collapse arrow**: Right edge has small button to collapse sidebar
10. **Search always at top**: Search bar is visible and accessible at the top
11. **View toggles**: Four quick-toggle buttons for list/card/table/grid views
12. **Bottom utilities**: Sync, publish, theme, and account buttons in bottom bar
