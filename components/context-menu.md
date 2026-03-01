# Context Menu

## Description

A comprehensive dropdown menu accessed via the kebab (⋮) button on note breadcrumbs. The context menu contains theme selection, metadata display, quick actions, version history controls, and destructive operations. It's similar to a popover but with more structured sections and dividers.

## When to Use

- **Note options**: Accessed from the kebab menu on the note breadcrumb
- **Theme selection**: Radio-button-like list of theme options with the current theme marked with a checkmark
- **Metadata display**: Show read-only information (word count, character count, size, dates)
- **Quick actions**: Bookmark, download, print, publication options
- **Version history**: Save version, view history
- **Destructive actions**: Delete (shown in red in the "danger zone")

Do not use context menus for primary actions; keep them for secondary/tertiary interactions.

## Variants

| Section | Content | Purpose |
|---------|---------|---------|
| **Theme** | Radio list (Monospace ✓, Serif, Sans, Raw) with icons | Select the note's display theme |
| **Metadata** | Word count, character count, size, created, modified | Show read-only stats |
| **Actions** | Bookmark, Download, Print with icons | Quick interactive commands |
| **More** | Publication, Visit site | Secondary actions |
| **Version** | Save version, Version history | Manage note versions |
| **Danger Zone** | Delete (red text) | Destructive operation |

## Anatomy

```
<div class="context-menu-container">
  <button class="kebab-button" aria-label="More options">⋮</button>

  <div class="context-menu" data-state="open">
    <div class="context-menu-arrow"></div>

    <!-- Theme Section -->
    <div class="context-menu-section">
      <h3 class="context-menu-section-title">THEME</h3>
      <button class="context-menu-item context-menu-item-active">
        <svg class="context-menu-icon"><!-- monospace icon --></svg>
        <span>Monospace</span>
        <span class="context-menu-check">✓</span>
      </button>
      <!-- More theme items -->
    </div>

    <div class="context-menu-divider"></div>

    <!-- Metadata Section -->
    <div class="context-menu-section">
      <div class="context-menu-metadata">
        <div class="metadata-row">
          <span class="metadata-label">Word count</span>
          <span class="metadata-value">3,847</span>
        </div>
        <!-- More metadata rows -->
      </div>
    </div>

    <div class="context-menu-divider"></div>

    <!-- Actions Section -->
    <div class="context-menu-section">
      <button class="context-menu-item">
        <svg class="context-menu-icon"><!-- bookmark icon --></svg>
        <span>Bookmark</span>
      </button>
      <!-- More action items -->
    </div>

    <div class="context-menu-divider"></div>

    <!-- Danger Zone -->
    <button class="context-menu-item context-menu-item-danger">
      <svg class="context-menu-icon"><!-- trash icon --></svg>
      <span>Delete</span>
    </button>
  </div>
</div>
```

**Structure:**
- Container div for relative positioning
- Kebab button (⋮) that toggles the menu
- `.context-menu` panel with sections separated by dividers
- Theme section with radio-style items (current selection marked with ✓)
- Metadata section with label-value pairs
- Action items with icons
- Version section with save/history links
- Danger zone with delete action (in --danger color)

## Token Usage

- **Background**: `--background` (#fefefe light / #181716 dark)
- **Border**: `1px solid --border` (#e8e6e3)
- **Border radius**: `6px`
- **Shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Padding**: 4px on items, 8px sections
- **Font**: 13px monospace for items, 11px for metadata labels
- **Section title**: 11px monospace, uppercase, --muted color, font-weight 600
- **Divider**: 1px solid --border
- **Icon color**: --foreground default, --danger for delete
- **Checkmark color**: --accent
- **Hover background**: Slight background highlight

## HTML Example

### Complete Context Menu
```html
<div class="context-menu-container">
  <button class="kebab-button" aria-label="More options">⋮</button>

  <div class="context-menu" data-state="open">
    <div class="context-menu-arrow"></div>

    <!-- THEME Section -->
    <div class="context-menu-section">
      <h3 class="context-menu-section-title">THEME</h3>

      <button class="context-menu-item context-menu-item-active">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- monospace icon -->
        </svg>
        <span class="context-menu-label">Monospace</span>
        <span class="context-menu-check">✓</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- serif icon -->
        </svg>
        <span class="context-menu-label">Serif</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- sans icon -->
        </svg>
        <span class="context-menu-label">Sans</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- raw icon -->
        </svg>
        <span class="context-menu-label">Raw</span>
      </button>
    </div>

    <div class="context-menu-divider"></div>

    <!-- METADATA Section -->
    <div class="context-menu-section">
      <div class="context-menu-metadata">
        <div class="metadata-row">
          <span class="metadata-label">Word count</span>
          <span class="metadata-value">3,847</span>
        </div>
        <div class="metadata-row">
          <span class="metadata-label">Char count</span>
          <span class="metadata-value">23,104</span>
        </div>
        <div class="metadata-row">
          <span class="metadata-label">Size</span>
          <span class="metadata-value">22.5 KB</span>
        </div>
        <div class="metadata-row">
          <span class="metadata-label">Created</span>
          <span class="metadata-value">Mar 15, 2025</span>
        </div>
        <div class="metadata-row">
          <span class="metadata-label">Modified</span>
          <span class="metadata-value">Mar 18, 2025</span>
        </div>
      </div>
    </div>

    <div class="context-menu-divider"></div>

    <!-- ACTIONS Section -->
    <div class="context-menu-section">
      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- bookmark icon -->
        </svg>
        <span class="context-menu-label">Bookmark</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- download icon -->
        </svg>
        <span class="context-menu-label">Download</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- printer icon -->
        </svg>
        <span class="context-menu-label">Print</span>
      </button>
    </div>

    <div class="context-menu-divider"></div>

    <!-- MORE ACTIONS Section -->
    <div class="context-menu-section">
      <button class="context-menu-item">
        <span class="context-menu-label">Publication</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- globe/link icon -->
        </svg>
        <span class="context-menu-label">Visit site</span>
      </button>
    </div>

    <div class="context-menu-divider"></div>

    <!-- VERSION Section -->
    <div class="context-menu-section">
      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- save icon -->
        </svg>
        <span class="context-menu-label">Save version</span>
      </button>

      <button class="context-menu-item">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- history icon -->
        </svg>
        <span class="context-menu-label">Version history</span>
      </button>
    </div>

    <div class="context-menu-divider"></div>

    <!-- DANGER ZONE -->
    <div class="context-menu-section">
      <button class="context-menu-item context-menu-item-danger">
        <svg class="context-menu-icon" width="16" height="16">
          <!-- trash icon -->
        </svg>
        <span class="context-menu-label">Delete</span>
      </button>
    </div>
  </div>
</div>
```

## CSS Example

```css
.context-menu-container {
  position: relative;
  display: inline-block;
}

.kebab-button {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--foreground);
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.15s ease;
}

.kebab-button:hover {
  color: var(--accent);
}

.context-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 240px;
  max-width: 300px;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.15s ease;
  pointer-events: none;
  overflow: hidden;
}

.context-menu[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.context-menu-arrow {
  position: absolute;
  top: -6px;
  right: 12px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--background);
}

.context-menu-section {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px 4px;
}

.context-menu-section-title {
  font-family: var(--font-family-mono);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-muted);
  padding: 4px 8px;
  margin: 0;
  margin-bottom: 4px;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--foreground);
  font-family: var(--font-family-mono);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.1s ease;
}

.context-menu-item:hover {
  background-color: var(--hover-bg);
}

.context-menu-item-active {
  background-color: var(--hover-bg);
  font-weight: 600;
}

.context-menu-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--foreground);
  stroke-width: 1.5px;
  fill: none;
  stroke: currentColor;
}

.context-menu-label {
  flex: 1;
}

.context-menu-check {
  color: var(--accent);
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.context-menu-item-danger {
  color: var(--danger);
}

.context-menu-item-danger .context-menu-icon {
  color: var(--danger);
  stroke: var(--danger);
}

.context-menu-item-danger:hover {
  background-color: rgba(220, 38, 38, 0.1);
}

.context-menu-divider {
  height: 1px;
  background-color: var(--border);
  margin: 4px 0;
}

.context-menu-metadata {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 8px;
}

.metadata-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metadata-label {
  font-family: var(--font-family-mono);
  font-size: 11px;
  color: var(--color-muted);
  font-weight: 500;
}

.metadata-value {
  font-family: var(--font-family-mono);
  font-size: 11px;
  color: var(--foreground);
  font-weight: 600;
}
```

## JSX Example

```jsx
// Context Menu with State
const [isOpen, setIsOpen] = useState(false);
const [selectedTheme, setSelectedTheme] = useState('monospace');
const [metadata, setMetadata] = useState({
  wordCount: 3847,
  charCount: 23104,
  size: '22.5 KB',
  created: 'Mar 15, 2025',
  modified: 'Mar 18, 2025',
});
const menuRef = useRef(null);

const themes = [
  { id: 'monospace', name: 'Monospace', icon: MonospaceIcon },
  { id: 'serif', name: 'Serif', icon: SerifIcon },
  { id: 'sans', name: 'Sans', icon: SansIcon },
  { id: 'raw', name: 'Raw', icon: RawIcon },
];

// Close on click outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isOpen]);

// Close on Escape
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };
  if (isOpen) {
    document.addEventListener('keydown', handleEscape);
  }
  return () => document.removeEventListener('keydown', handleEscape);
}, [isOpen]);

const handleThemeSelect = (themeId) => {
  setSelectedTheme(themeId);
  updateNoteTheme(themeId);
};

<div className="context-menu-container" ref={menuRef}>
  <button
    className="kebab-button"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="More options"
  >
    ⋮
  </button>

  <div className="context-menu" data-state={isOpen ? 'open' : 'closed'}>
    <div className="context-menu-arrow"></div>

    {/* Theme Section */}
    <div className="context-menu-section">
      <h3 className="context-menu-section-title">Theme</h3>
      {themes.map((theme) => {
        const IconComponent = theme.icon;
        return (
          <button
            key={theme.id}
            className={`context-menu-item ${
              selectedTheme === theme.id ? 'context-menu-item-active' : ''
            }`}
            onClick={() => handleThemeSelect(theme.id)}
          >
            <IconComponent className="context-menu-icon" width="16" height="16" />
            <span className="context-menu-label">{theme.name}</span>
            {selectedTheme === theme.id && (
              <span className="context-menu-check">✓</span>
            )}
          </button>
        );
      })}
    </div>

    <div className="context-menu-divider"></div>

    {/* Metadata Section */}
    <div className="context-menu-section">
      <div className="context-menu-metadata">
        <div className="metadata-row">
          <span className="metadata-label">Word count</span>
          <span className="metadata-value">{metadata.wordCount.toLocaleString()}</span>
        </div>
        <div className="metadata-row">
          <span className="metadata-label">Char count</span>
          <span className="metadata-value">{metadata.charCount.toLocaleString()}</span>
        </div>
        <div className="metadata-row">
          <span className="metadata-label">Size</span>
          <span className="metadata-value">{metadata.size}</span>
        </div>
        <div className="metadata-row">
          <span className="metadata-label">Created</span>
          <span className="metadata-value">{metadata.created}</span>
        </div>
        <div className="metadata-row">
          <span className="metadata-label">Modified</span>
          <span className="metadata-value">{metadata.modified}</span>
        </div>
      </div>
    </div>

    <div className="context-menu-divider"></div>

    {/* Actions Section */}
    <div className="context-menu-section">
      <button className="context-menu-item" onClick={handleBookmark}>
        <BookmarkIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Bookmark</span>
      </button>
      <button className="context-menu-item" onClick={handleDownload}>
        <DownloadIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Download</span>
      </button>
      <button className="context-menu-item" onClick={handlePrint}>
        <PrinterIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Print</span>
      </button>
    </div>

    <div className="context-menu-divider"></div>

    {/* More Actions */}
    <div className="context-menu-section">
      <button className="context-menu-item" onClick={handlePublication}>
        <span className="context-menu-label">Publication</span>
      </button>
      <button className="context-menu-item" onClick={handleVisitSite}>
        <GlobeIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Visit site</span>
      </button>
    </div>

    <div className="context-menu-divider"></div>

    {/* Version Section */}
    <div className="context-menu-section">
      <button className="context-menu-item" onClick={handleSaveVersion}>
        <SaveIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Save version</span>
      </button>
      <button className="context-menu-item" onClick={handleVersionHistory}>
        <HistoryIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Version history</span>
      </button>
    </div>

    <div className="context-menu-divider"></div>

    {/* Danger Zone */}
    <div className="context-menu-section">
      <button className="context-menu-item context-menu-item-danger" onClick={handleDelete}>
        <TrashIcon className="context-menu-icon" width="16" height="16" />
        <span className="context-menu-label">Delete</span>
      </button>
    </div>
  </div>
</div>
```

## Do's and Don'ts

### Do
- Use kebab (⋮) button to trigger the context menu
- Organize menu items into logical sections with dividers
- Show section titles in uppercase (THEME, METADATA, etc.)
- Mark the active/selected item with a checkmark
- Use icons for actionable items (download, delete, etc.)
- Keep metadata labels brief and right-aligned with values
- Close the menu on click outside
- Close the menu on Escape key press
- Use --danger color only for destructive actions (Delete)
- Position the menu appropriately (usually top-right or right-aligned)

### Don't
- Use context menus for primary actions on a page
- Place unrelated items in the same section without dividers
- Use context menus without a clear trigger button
- Forget to close the menu on click outside or Escape
- Mix actionable items with read-only metadata without clear visual separation
- Use icons that don't match the item's action or meaning
- Overload the menu with too many items (use submenus for large lists)
- Change the order of sections dynamically
- Use context menus as the only way to access important features
- Place the menu in a way that covers important content

## Rules Specific to Context Menus

1. **Triggered by kebab button**: Menu opens/closes via ⋮ button click
2. **Organized by sections**: Related items grouped with dividers separating sections
3. **Section titles in uppercase**: "THEME", "METADATA", "ACTIONS" in small caps/uppercase, 11px monospace
4. **Checkmark for active item**: Current selection in a section shows ✓ in --accent color
5. **Metadata is read-only**: Metadata rows are display-only, not clickable
6. **Icons on action items**: Interactive items have left icons; metadata items don't
7. **Danger items in red**: Delete and other destructive actions use --danger color
8. **Click-outside to close**: Menu closes when user clicks outside the menu or trigger
9. **Escape key to close**: Menu closes when user presses Escape
10. **Right-aligned positioning**: Menu typically appears to the right and below the kebab button
11. **Subtle arrow**: Optional small triangle pointing from menu toward trigger
12. **6px radius**: Slightly more rounded than buttons (6px not 4px)
