# Badge

## Description

Small visual indicators used to highlight status, categories, or state information throughout the app. The system uses badges for published status (green pill), status dots (colored circles), and type labels (small text tags).

## When to Use

- **Published status**: Green pill indicating a note is published to the web
- **Status indicators**: Small colored dots showing sync status, modifications, or publishing state
- **Type labels**: Small text labels for note/document types
- **Quick visual feedback**: Any place where a small, non-interactive indicator would help

Do not use badges for interactive elements; use buttons or links instead.

## Variants

| Type | Style | Size | Color | Use Case |
|------|-------|------|-------|----------|
| **Published Badge** | Pill + icon + text | 28px height | Green (#16a34a) | Indicates published/live status |
| **Status Dot** | Small circle | 8px | Multiple colors | Indicates state (published, modified, synced) |
| **Type Label** | Small text | 12px font | Monospace | Note type or category labels |

## Anatomy

### Published Badge
```
<button class="published-badge">
  <svg class="badge-icon"><!-- checkmark --></svg>
  Published
</button>
```

**Structure:**
- `<button>` with class `.published-badge`
- Icon (checkmark) using SVG with stroke
- Text label "Published"
- Fully rounded pill shape (9999px radius)
- Clickable to open publication settings

### Status Dot
```
<span class="status-dot status-dot-published"></span>
```

**Structure:**
- Simple `<span>` with class `.status-dot`
- Optional variant class for color (`.status-dot-published`, `.status-dot-modified`, etc.)
- Always circular (8px diameter)
- No text, just colored circle

### Type Label
```
<span class="type-label">Note</span>
```

**Structure:**
- Simple `<span>` with class `.type-label`
- Small monospace text (12px)
- Optional background for contrast

## Token Usage

### Published Badge
- **Background**: `--success` (#16a34a) green
- **Text color**: `#ffffff` white
- **Font**: 13px monospace, semibold
- **Padding**: 4px 8px
- **Border radius**: 9999px (fully rounded pill)
- **Height**: ~28px
- **Icon size**: 16px

### Status Dots
- **Size**: 8px × 8px circular
- **Border radius**: 50% (fully circular)
- **Colors**:
  - Published: `--success` (#16a34a green)
  - Modified/Pending: `--warning` (#f59e0b orange)
  - Error/Conflict: `--danger` (#dc2626 red)
  - Active/Selected: `--accent` (#E8915A orange)
  - Bookmarked: `#000` (black)
  - Synced: `--success` (green)

### Type Labels
- **Font**: 12px monospace
- **Color**: `--foreground` (#181716)
- **Background**: Optional `--background-secondary` for contrast
- **Padding**: 2px 4px (minimal)
- **Border radius**: 2px

## HTML Example

### Published Badge
```html
<button class="published-badge" title="Edit publication settings">
  <svg class="badge-icon" width="16" height="16" viewBox="0 0 16 16">
    <polyline
      points="2,8 6,12 14,4"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <span>Published</span>
</button>
```

### Status Dots in Context
```html
<!-- In a table row -->
<td class="table-cell">
  <span class="status-dot status-dot-published" title="Published"></span>
  Note
</td>

<!-- Multiple dots for multiple states -->
<div class="status-indicators">
  <span class="status-dot status-dot-published" title="Published"></span>
  <span class="status-dot status-dot-modified" title="Has unsaved changes"></span>
</div>

<!-- Standalone status dot -->
<span class="status-dot status-dot-synced" title="Synced to folder"></span>
```

### Type Labels
```html
<!-- In breadcrumb or table -->
<span class="type-label">Note</span>
<span class="type-label">Music</span>
<span class="type-label">Document</span>

<!-- With background for contrast -->
<span class="type-label type-label-filled">Note</span>
```

## CSS Example

```css
/* Published Badge */
.published-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--success);
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-family: var(--font-family-mono);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}

.published-badge:hover {
  opacity: 0.85;
}

.published-badge:active {
  opacity: 0.7;
}

.badge-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2px;
  flex-shrink: 0;
}

/* Status Dots */
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-muted);
  flex-shrink: 0;
}

.status-dot-published {
  background-color: var(--success);
}

.status-dot-modified {
  background-color: var(--warning);
}

.status-dot-pending {
  background-color: var(--warning);
}

.status-dot-error {
  background-color: var(--danger);
}

.status-dot-conflict {
  background-color: var(--danger);
}

.status-dot-active {
  background-color: var(--accent);
}

.status-dot-selected {
  background-color: var(--accent);
}

.status-dot-bookmarked {
  background-color: #000;
}

.status-dot-synced {
  background-color: var(--success);
}

/* Type Labels */
.type-label {
  display: inline-block;
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--foreground);
  padding: 2px 4px;
  border-radius: 2px;
  white-space: nowrap;
}

.type-label-filled {
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
}

/* Status indicators grouped together */
.status-indicators {
  display: flex;
  gap: 4px;
  align-items: center;
}
```

## JSX Example

```jsx
// Published Badge Component
const [isPublished, setIsPublished] = useState(true);

const handlePublishedClick = () => {
  openPublicationPanel();
};

{isPublished && (
  <button
    className="published-badge"
    onClick={handlePublishedClick}
    title="Edit publication settings"
  >
    <svg
      className="badge-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <polyline
        points="2,8 6,12 14,4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>Published</span>
  </button>
)}

// Status Dot Component (in Table Row)
const [status, setStatus] = useState('published');

const getStatusDotClass = (status) => {
  switch (status) {
    case 'published':
      return 'status-dot-published';
    case 'modified':
      return 'status-dot-modified';
    case 'error':
      return 'status-dot-error';
    case 'synced':
      return 'status-dot-synced';
    default:
      return '';
  }
};

<td className="table-cell">
  {status && (
    <span
      className={`status-dot ${getStatusDotClass(status)}`}
      title={status}
    ></span>
  )}
  Note
</td>

// Multiple Status Indicators
const [note, setNote] = useState({
  published: true,
  hasChanges: true,
  synced: false,
});

<div className="status-indicators">
  {note.published && (
    <span
      className="status-dot status-dot-published"
      title="Published to web"
    ></span>
  )}
  {note.hasChanges && (
    <span
      className="status-dot status-dot-modified"
      title="Unsaved changes"
    ></span>
  )}
  {note.synced && (
    <span
      className="status-dot status-dot-synced"
      title="Synced to folder"
    ></span>
  )}
</div>

// Type Label Component
const noteType = 'Note';

<span className="type-label">{noteType}</span>

// Type Label with Background
<span className="type-label type-label-filled">Document</span>

// Badge in Breadcrumb (See Breadcrumb component)
<div className="breadcrumb-right">
  {isPublished && (
    <button className="published-badge" onClick={handlePublishClick}>
      <CheckmarkIcon width="16" height="16" />
      Published
    </button>
  )}
  <span className="breadcrumb-date">{currentDate}</span>
  {hasModifications && (
    <span className="status-dot status-dot-modified"></span>
  )}
</div>
```

## Do's and Don'ts

### Do
- Use the published badge in breadcrumbs and note headers
- Use status dots to indicate state at a glance
- Keep status dots small (8px) and unobtrusive
- Use the correct color for each status (green for published, orange for modified, etc.)
- Include titles/tooltips on status indicators to explain their meaning
- Place status dots inline with text when they relate to that element
- Make the published badge clickable to open publication panel
- Use monospace font for all badge text (12-13px)
- Group multiple status indicators with 4px gap
- Keep badge text short and clear (e.g., "Published", not "This note is published")

### Don't
- Use badges for interactive actions (use buttons instead)
- Change status dot colors arbitrarily (stick to the defined color system)
- Make status dots larger than 8px
- Use badges with overlapping information
- Add borders to status dots
- Use multiple fonts or sizes in badge text
- Make status dots interactive; they're display-only
- Forget to add title/tooltip explaining what the badge means
- Use status dots to replace buttons or other interactive elements
- Create custom badge styles outside the defined variants

## Rules Specific to Badges

1. **Published badge is green pill**: Always uses --success (#16a34a) background with white text
2. **Published badge is clickable**: Opens publication settings panel on click
3. **Status dots are 8px circles**: Fully circular (50% border-radius), no text, display only
4. **Status dot colors are fixed**: Green (published), Orange (modified), Red (error), Black (bookmarked), Accent (active)
5. **Type labels use monospace**: Always 12px JetBrains Mono font
6. **Badges are lightweight**: Minimal padding and no heavy styling
7. **No borders on dots**: Status dots are solid colored circles only
8. **Published badge has icon**: Checkmark SVG on the left of "Published" text
9. **Fully rounded badge**: Published badge uses 9999px radius for pill shape
10. **Inline display**: Badges display inline and flow with surrounding text
11. **No shadow or depth**: Badges are flat with no shadow effects
12. **Titles/tooltips required**: All badges should have title attributes or aria-labels explaining their meaning
