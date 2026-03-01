# Popover

## Description

A lightweight dropdown panel that attaches to a trigger element (button, link, or badge). Popovers are used for secondary actions, quick settings, or additional information that doesn't require a full modal. They close when clicking outside or pressing Escape.

## When to Use

- **Publication settings**: Drops from the "Published" badge to configure URL, cover image, excerpt
- **Collection info**: Shows metadata and actions from a kebab menu on breadcrumbs
- **Quick actions**: Any secondary or tertiary actions attached to a specific trigger element
- **Inline editing**: Quick edit fields for titles, tags, or metadata

Do not use popovers for primary actions or complex multi-step workflows; use modals instead.

## Variants

| Type | Content | Anchor | Max Width |
|------|---------|--------|-----------|
| **Publication Panel** | Toggle, URL input, image upload, excerpt, copy link | "Published" badge | 340px |
| **Collection Info** | Metadata list, bookmark/delete actions | Kebab menu | 280px |
| **Action Menu** | Simple list of clickable actions | Button or trigger | 200px |

## Anatomy

```
<div class="popover-container">
  <button class="popover-trigger">Published</button>

  <div class="popover" data-state="open">
    <div class="popover-arrow"></div>
    <div class="popover-content">
      [Content: toggles, inputs, actions, etc.]
    </div>
  </div>
</div>
```

**Structure:**
- Container div to manage positioning (positioned relative)
- Trigger element (button, link, or badge) that opens the popover
- `.popover` panel with `data-state="open"` or `data-state="closed"`
- Optional `.popover-arrow`: Small triangle pointing to the trigger
- `.popover-content`: Scrollable content area

## Token Usage

- **Background**: `--background` (#fefefe light / #181716 dark)
- **Border**: `1px solid --border` (#e8e6e3)
- **Border radius**: `6px`
- **Shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Padding**: `12px` default, `16px` for content areas
- **Max width**: 280-340px depending on variant
- **Position**: Absolute, positioned relative to trigger element
- **Arrow**: Small solid triangle (8px × 8px) pointing toward trigger
- **Z-index**: `999` (below modals, above page content)
- **Animation**: Fade-in 0.1s, slide-up 0.15s

## HTML Example

### Publication Panel Popover
```html
<div class="popover-container">
  <button class="published-badge">
    <svg width="16" height="16"><!-- checkmark icon --></svg>
    Published
  </button>

  <div class="popover" data-state="open">
    <div class="popover-arrow"></div>
    <div class="popover-content">
      <!-- Toggle: Include in site -->
      <label class="toggle-wrapper">
        <input type="checkbox" class="toggle-input" checked />
        <span class="toggle-track">
          <span class="toggle-circle"></span>
        </span>
        <span class="toggle-label">Include in site</span>
      </label>

      <!-- URL Slug Input -->
      <div class="input-wrapper">
        <label class="input-label">URL SLUG</label>
        <div class="input-field input-prefix">
          <span class="input-prefix-text">https://mysite.com/</span>
          <input type="text" class="input" placeholder="my-note" />
        </div>
      </div>

      <!-- Cover Image Upload -->
      <div class="input-wrapper">
        <label class="input-label">COVER IMAGE</label>
        <div class="upload-area">
          <svg width="20" height="20"><!-- image icon --></svg>
          <p>Click to upload or drag image here</p>
          <input type="file" accept="image/*" />
        </div>
      </div>

      <!-- Excerpt Textarea -->
      <div class="input-wrapper">
        <label class="input-label">EXCERPT</label>
        <textarea class="input input-textarea" placeholder="Brief summary..."></textarea>
      </div>

      <!-- Copy URL Link -->
      <button class="btn btn-text">Copy URL</button>
    </div>
  </div>
</div>
```

### Collection Info Popover
```html
<div class="popover-container">
  <button class="popover-trigger" aria-label="More options">⋮</button>

  <div class="popover" data-state="open">
    <div class="popover-arrow"></div>
    <div class="popover-content">
      <!-- Metadata -->
      <div class="popover-section">
        <div class="metadata-item">
          <span class="metadata-label">Songs</span>
          <span class="metadata-value">12</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Duration</span>
          <span class="metadata-value">45m 23s</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Size</span>
          <span class="metadata-value">340 MB</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Created</span>
          <span class="metadata-value">Mar 15, 2025</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Modified</span>
          <span class="metadata-value">Mar 18, 2025</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="popover-divider"></div>

      <!-- Actions -->
      <button class="popover-action">
        <svg width="16" height="16"><!-- bookmark icon --></svg>
        Remove bookmark
      </button>

      <!-- Danger Action -->
      <button class="popover-action popover-action-danger">
        <svg width="16" height="16"><!-- trash icon --></svg>
        Delete
      </button>
    </div>
  </div>
</div>
```

## CSS Example

```css
.popover-container {
  position: relative;
  display: inline-block;
}

.popover-trigger {
  /* Styled as button or badge; see Button/Badge components */
}

.popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  min-width: 200px;
  max-width: 340px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.15s ease;
  pointer-events: none;
}

.popover[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.popover-arrow {
  position: absolute;
  top: -6px;
  left: 12px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--background);
}

.popover[data-state="open"] .popover-arrow {
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.05);
}

.popover-content {
  padding: 12px;
  max-height: 80vh;
  overflow-y: auto;
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--foreground);
}

.popover-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popover-divider {
  height: 1px;
  background-color: var(--border);
  margin: 8px 0;
}

.metadata-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 12px;
}

.metadata-label {
  color: var(--color-muted);
  font-weight: 500;
}

.metadata-value {
  color: var(--foreground);
  font-weight: 600;
}

.popover-action {
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

.popover-action:hover {
  background-color: var(--hover-bg);
}

.popover-action svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  stroke-width: 1.5px;
}

.popover-action-danger {
  color: var(--danger);
}

.popover-action-danger svg {
  stroke: var(--danger);
}

.popover-action-danger:hover {
  background-color: var(--danger-hover-bg);
}

/* Popover with input fields */
.popover-content .input-wrapper {
  margin-bottom: 12px;
}

.popover-content .input-wrapper:last-of-type {
  margin-bottom: 0;
}

.popover-content .toggle-wrapper {
  margin-bottom: 12px;
}
```

## JSX Example

```jsx
// Publication Panel Popover
const [isOpen, setIsOpen] = useState(false);
const [includeInSite, setIncludeInSite] = useState(true);
const [urlSlug, setUrlSlug] = useState('my-note');
const [excerpt, setExcerpt] = useState('');
const popoverRef = useRef(null);

// Close on click outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
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

const handleCopyURL = () => {
  const url = `https://mysite.com/${urlSlug}`;
  navigator.clipboard.writeText(url);
};

<div className="popover-container" ref={popoverRef}>
  <button
    className="published-badge"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Publication settings"
  >
    <CheckmarkIcon width="16" height="16" />
    Published
  </button>

  <div className="popover" data-state={isOpen ? 'open' : 'closed'}>
    <div className="popover-arrow"></div>
    <div className="popover-content">
      <label className="toggle-wrapper">
        <input
          type="checkbox"
          className="toggle-input"
          checked={includeInSite}
          onChange={(e) => setIncludeInSite(e.target.checked)}
        />
        <span className="toggle-track">
          <span className="toggle-circle"></span>
        </span>
        <span className="toggle-label">Include in site</span>
      </label>

      <div className="input-wrapper">
        <label className="input-label">URL SLUG</label>
        <div className="input-field input-prefix">
          <span className="input-prefix-text">https://mysite.com/</span>
          <input
            type="text"
            className="input"
            placeholder="my-note"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
          />
        </div>
      </div>

      <div className="input-wrapper">
        <label className="input-label">EXCERPT</label>
        <textarea
          className="input input-textarea"
          placeholder="Brief summary..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <button className="btn btn-text" onClick={handleCopyURL}>
        Copy URL
      </button>
    </div>
  </div>
</div>

// Collection Info Popover
const [isOpen, setIsOpen] = useState(false);
const [isBookmarked, setIsBookmarked] = useState(false);
const popoverRef = useRef(null);

<div className="popover-container" ref={popoverRef}>
  <button
    className="kebab-menu"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Collection options"
  >
    ⋮
  </button>

  <div className="popover" data-state={isOpen ? 'open' : 'closed'}>
    <div className="popover-arrow"></div>
    <div className="popover-content">
      <div className="popover-section">
        <div className="metadata-item">
          <span className="metadata-label">Songs</span>
          <span className="metadata-value">12</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Duration</span>
          <span className="metadata-value">45m 23s</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Size</span>
          <span className="metadata-value">340 MB</span>
        </div>
      </div>

      <div className="popover-divider"></div>

      <button
        className="popover-action"
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        <BookmarkIcon width="16" height="16" />
        {isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      </button>

      <button className="popover-action popover-action-danger" onClick={handleDelete}>
        <TrashIcon width="16" height="16" />
        Delete
      </button>
    </div>
  </div>
</div>
```

## Do's and Don'ts

### Do
- Anchor the popover to a clear trigger element (badge, button, icon)
- Close the popover on click outside
- Close the popover on Escape key press
- Include an optional arrow pointing to the trigger
- Use appropriate max-widths based on content (280-340px)
- Keep content concise and scannable
- Group related content with dividers
- Include icons in action items for clarity
- Position the popover near the trigger (8px offset)
- Use subtle shadows for depth

### Don't
- Place popovers without a clear trigger element
- Use popovers for primary or destructive actions (use modals instead)
- Create popovers that persist without user interaction
- Nest popovers inside other popovers
- Use popovers for multi-step workflows
- Place unrelated actions or content in the same popover
- Make popover content wider than 340px
- Forget to add a close mechanism (click outside or Escape)
- Use bright or contrasting colors for popover backgrounds
- Stack multiple popovers on the same page simultaneously

## Rules Specific to Popovers

1. **Click-outside to close**: Popover closes when user clicks outside the popover and trigger
2. **Escape key to close**: Popover closes when user presses Escape
3. **Attached to trigger**: Popover positions relative to its trigger element
4. **Optional arrow**: Small triangle points from popover toward the trigger
5. **Subtle shadow**: Use `0 4px 12px rgba(0, 0, 0, 0.15)` for depth
6. **6px border radius**: Slightly more rounded than inputs/buttons (6px not 4px)
7. **1px border**: Thin solid border using --border color
8. **Max-width limits**: Publication panel 340px, info popovers 280px
9. **Smooth animation**: Fade-in and slide-up over 0.15s
10. **Z-index 999**: Below modals (1000), above regular page content
11. **No overflow hidden on body**: Content should scroll if it exceeds viewport height
12. **Padding consistency**: 12px default, 16px for content sections
