# Breadcrumb

## Description

A top-navigation bar showing the current location in the app hierarchy as a series of linked segments separated by angle brackets (›). The breadcrumb helps users understand where they are and navigate back to parent items. On the right side, it displays status information, filters, and quick actions.

## When to Use

- **Location navigation**: Show current path (all › collection › item)
- **Context awareness**: Help users understand their position in the hierarchy
- **Quick navigation back**: Allow clicking any parent segment to jump back
- **Status display**: Show published state, modification status, and date
- **Quick actions**: Provide filters, preview, and settings access

## Anatomy

```
<div class="breadcrumb-bar">
  <!-- Left: Path Navigation -->
  <div class="breadcrumb-left">
    <button class="breadcrumb-back">+ New</button>
    <nav class="breadcrumb-path">
      <a class="breadcrumb-link" href="#">all</a>
      <span class="breadcrumb-separator"> › </span>
      <a class="breadcrumb-link" href="#">collection-name</a>
      <span class="breadcrumb-separator"> › </span>
      <span class="breadcrumb-current">item-name</span>
      <button class="breadcrumb-menu" aria-label="More options">⋮</button>
    </nav>
  </div>

  <!-- Right: Status & Actions -->
  <div class="breadcrumb-right">
    <button class="breadcrumb-icon-button" title="Preview">
      <svg><!-- eye icon --></svg>
    </button>
    <input class="breadcrumb-filter" placeholder="Q Filter..." />
    <button class="breadcrumb-icon-button" title="Settings">
      <svg><!-- gear icon --></svg>
    </button>
    <button class="published-badge">
      <svg><!-- checkmark --></svg>
      Published
    </button>
    <span class="breadcrumb-date">Mar 15, 1872</span>
    <span class="status-dot status-dot-modified"></span>
    <button class="breadcrumb-icon-button" title="Fullscreen">
      <svg><!-- expand icon --></svg>
    </button>
  </div>
</div>
```

**Structure:**
- Container `.breadcrumb-bar` spanning full width
- Left section with back/new button and path navigation
- Path links separated by › symbols
- Current item (not a link) in bold
- Kebab menu (⋮) following current item
- Right section with status info and action buttons
- Icon buttons for preview, settings, fullscreen
- Published badge (clickable)
- Date display
- Modification status indicator dot

## Token Usage

- **Background**: `--background` (same as main content area)
- **Border**: `1px solid --border` at bottom
- **Font**: 13px monospace for path, 12px for metadata
- **Height**: ~40px
- **Padding**: 8px horizontal, 6px vertical
- **Gap**: 8px between elements
- **Separator**: " › " text in --muted color
- **Current text**: Bold (#181716 or --foreground)
- **Link color**: --foreground, underline on hover
- **Badge colors**: --success for published, --warning for modified
- **Icon size**: 16px

## HTML Example

### Breadcrumb Navigation
```html
<div class="breadcrumb-bar">
  <!-- Left Side -->
  <div class="breadcrumb-left">
    <!-- Back/New button -->
    <button class="breadcrumb-back" aria-label="Create new item">+</button>

    <!-- Navigation path -->
    <nav class="breadcrumb-path">
      <a class="breadcrumb-link" href="/">all</a>
      <span class="breadcrumb-separator"> › </span>

      <a class="breadcrumb-link" href="/collections/personal">Personal</a>
      <span class="breadcrumb-separator"> › </span>

      <span class="breadcrumb-current">Daily notes</span>

      <button class="breadcrumb-menu" aria-label="More options">⋮</button>
    </nav>
  </div>

  <!-- Right Side -->
  <div class="breadcrumb-right">
    <!-- Preview button -->
    <button class="breadcrumb-icon-button" title="Preview" aria-label="Open preview">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <!-- Eye icon -->
      </svg>
    </button>

    <!-- Filter input -->
    <input
      type="text"
      class="breadcrumb-filter"
      placeholder="Q Filter..."
      aria-label="Filter notes"
    />

    <!-- Settings button -->
    <button class="breadcrumb-icon-button" title="Settings" aria-label="Open settings">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <!-- Gear icon -->
      </svg>
    </button>

    <!-- Published badge -->
    <button class="published-badge" title="Edit publication settings">
      <svg width="16" height="16">
        <!-- Checkmark icon -->
      </svg>
      Published
    </button>

    <!-- Date -->
    <span class="breadcrumb-date">Mar 15, 1872</span>

    <!-- Modification status -->
    <span class="status-dot status-dot-modified" title="Unsaved changes"></span>

    <!-- Fullscreen button -->
    <button class="breadcrumb-icon-button" title="Fullscreen" aria-label="Toggle fullscreen">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <!-- Expand icon -->
      </svg>
    </button>
  </div>
</div>
```

## CSS Example

```css
.breadcrumb-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--foreground);
  gap: 8px;
}

.breadcrumb-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.breadcrumb-back {
  padding: 4px 12px;
  background: none;
  border: 2px solid var(--border);
  border-radius: 4px;
  color: var(--foreground);
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.breadcrumb-back:hover {
  background-color: var(--hover-bg);
  border-color: var(--foreground);
}

.breadcrumb-path {
  display: flex;
  align-items: center;
  gap: 0;
  min-width: 0;
  flex-wrap: nowrap;
  overflow: hidden;
}

.breadcrumb-link {
  color: var(--foreground);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.breadcrumb-link:hover {
  text-decoration: underline;
  color: var(--accent);
}

.breadcrumb-separator {
  color: var(--color-muted);
  margin: 0 4px;
  white-space: nowrap;
}

.breadcrumb-current {
  font-weight: 700;
  color: var(--foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb-menu {
  padding: 4px 8px;
  margin-left: 4px;
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  font-size: 16px;
  transition: color 0.15s ease;
  flex-shrink: 0;
}

.breadcrumb-menu:hover {
  color: var(--foreground);
}

.breadcrumb-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.breadcrumb-icon-button {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  transition: color 0.15s ease;
}

.breadcrumb-icon-button:hover {
  color: var(--foreground);
}

.breadcrumb-icon-button svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5px;
}

.breadcrumb-filter {
  font-family: var(--font-family-mono);
  font-size: 13px;
  padding: 4px 8px;
  border: 2px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--foreground);
  width: 140px;
  transition: border-color 0.15s ease;
}

.breadcrumb-filter::placeholder {
  color: var(--color-muted);
}

.breadcrumb-filter:focus {
  outline: none;
  border-color: var(--accent);
}

.published-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--success);
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-family: var(--font-family-mono);
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.published-badge:hover {
  opacity: 0.85;
}

.published-badge svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2px;
}

.breadcrumb-date {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-muted);
  white-space: nowrap;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent);
  display: inline-block;
}

.status-dot-modified {
  background-color: var(--warning);
}

/* Responsive: hide some elements on small screens */
@media (max-width: 768px) {
  .breadcrumb-date {
    display: none;
  }

  .breadcrumb-filter {
    width: 100px;
  }

  .breadcrumb-path {
    /* Could truncate path here if needed */
  }
}
```

## JSX Example

```jsx
// Breadcrumb Component
const [filterQuery, setFilterQuery] = useState('');
const [isPublished, setIsPublished] = useState(true);
const [hasChanges, setHasChanges] = useState(false);

const breadcrumbs = [
  { label: 'all', path: '/' },
  { label: 'Personal', path: '/personal' },
];

const currentItem = 'Daily notes';
const currentDate = 'Mar 15, 1872';

const handleNavigate = (path) => {
  navigate(path);
};

const handlePublishedClick = () => {
  openPublicationPanel();
};

const handleSettingsClick = () => {
  openSettingsModal();
};

const handleFullscreenToggle = () => {
  toggleFullscreenMode();
};

<div className="breadcrumb-bar">
  {/* Left Side */}
  <div className="breadcrumb-left">
    <button className="breadcrumb-back" onClick={() => openCreateModal()}>
      +
    </button>

    <nav className="breadcrumb-path">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} style={{ display: 'flex', alignItems: 'center' }}>
          <a
            className="breadcrumb-link"
            onClick={() => handleNavigate(crumb.path)}
            href="#"
          >
            {crumb.label}
          </a>
          {index < breadcrumbs.length - 1 && (
            <span className="breadcrumb-separator"> › </span>
          )}
        </div>
      ))}

      <span className="breadcrumb-separator"> › </span>
      <span className="breadcrumb-current">{currentItem}</span>

      <button
        className="breadcrumb-menu"
        onClick={() => openContextMenu()}
        aria-label="More options"
      >
        ⋮
      </button>
    </nav>
  </div>

  {/* Right Side */}
  <div className="breadcrumb-right">
    <button
      className="breadcrumb-icon-button"
      title="Preview"
      onClick={() => togglePreview()}
    >
      <EyeIcon width="16" height="16" />
    </button>

    <input
      type="text"
      className="breadcrumb-filter"
      placeholder="Q Filter..."
      value={filterQuery}
      onChange={(e) => setFilterQuery(e.target.value)}
      aria-label="Filter notes"
    />

    <button
      className="breadcrumb-icon-button"
      title="Settings"
      onClick={handleSettingsClick}
    >
      <GearIcon width="16" height="16" />
    </button>

    {isPublished && (
      <button
        className="published-badge"
        onClick={handlePublishedClick}
        title="Edit publication settings"
      >
        <CheckmarkIcon width="16" height="16" />
        Published
      </button>
    )}

    <span className="breadcrumb-date">{currentDate}</span>

    {hasChanges && (
      <span
        className="status-dot status-dot-modified"
        title="Unsaved changes"
      ></span>
    )}

    <button
      className="breadcrumb-icon-button"
      title="Fullscreen"
      onClick={handleFullscreenToggle}
    >
      <ExpandIcon width="16" height="16" />
    </button>
  </div>
</div>
```

## Do's and Don'ts

### Do
- Show the full path from root (all › collection › item)
- Use › (right-pointing angle bracket) as separator
- Make all parent links clickable for quick navigation
- Bold the current/active item (not a link)
- Place kebab menu after the current item
- Show published state via green badge
- Display the modification date
- Use icons for preview, settings, and fullscreen
- Keep filter input visible and ready for use
- Show modification status via small colored dot

### Don't
- Truncate the path without reason (expand if needed)
- Use different separators or symbols (always use ›)
- Make the current item a link
- Forget the kebab menu for quick actions
- Use colorful backgrounds for breadcrumb elements
- Hide the filter input in a submenu
- Left-align right-side elements (use flex justification)
- Use breadcrumbs for horizontal scrolling lists
- Mix button styles in the breadcrumb
- Omit publication or modification status

## Rules Specific to Breadcrumbs

1. **Path always starts with "all"**: First segment is the root "all" view
2. **Segments separated by ›**: Use the right-pointing single angle bracket symbol
3. **Current item is bold**: Not a link, and in bold monospace 13px
4. **Kebab menu after current**: ⋮ button follows the item name
5. **Click parents to navigate**: All breadcrumb links except current are clickable
6. **Published badge is green**: Uses --success color for published state
7. **Modification dot is orange**: Uses --warning color for unsaved changes
8. **Filter is always visible**: Search/filter input on the right side
9. **Icon buttons are small**: 16px icons in a minimal style
10. **Right-aligned status**: Published badge, date, and fullscreen button on the right
11. **Top border**: Breadcrumb bar has 1px bottom border separating it from content
12. **Fixed height**: Breadcrumb bar is ~40px tall, always visible at top
