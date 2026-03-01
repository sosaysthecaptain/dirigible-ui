# Icon

## Description

A consistent set of outline-style SVG icons used throughout the app for visual communication. Icons are always outline/stroke-based (not filled), sized to fit within 16-20px boxes, and inherit color from their context.

## When to Use

- **Content type indicators**: Document, music note, photo, folder icons
- **Action buttons**: Download, delete, print, bookmark
- **Status indicators**: Cloud sync, publish, visibility
- **Navigation**: Disclosure triangles, chevrons, back arrows
- **UI chrome**: Search magnifying glass, settings gear, user account
- **Breadcrumb and menu**: Tree navigation and more actions (kebab)

Icons are NOT used inside text buttons. Icon-only buttons use icons with appropriate accessible labels.

## Icon Set

| Name | Use Case | Notes |
|------|----------|-------|
| Cloud with down arrow | Sync/backup operations | Indicates download/import |
| Document/page | Note/text file | Outline rectangle with horizontal lines |
| Music note | Audio file/collection | Musical note symbol |
| Photo/image | Photo album or image file | Frame or landscape outline |
| Folder | Collection or directory | Folder outline |
| Magnifying glass | Search | Circle with handle |
| Plus (+) | Create new item | Simple plus symbol |
| X / Close | Dismiss/close modal | Simple X or ✕ |
| Kebab (⋮) | More options menu | Three dots |
| Chevron/triangle | Disclosure/expand | Right-pointing arrow, rotates when expanded |
| Eye | Preview/visibility | Eye outline |
| Moon/Sun | Theme toggle (dark/light) | Crescent moon or sun rays |
| User/person | Account/profile | Simple head outline |
| Bookmark | Saved/pinned item | Ribbon or flag outline |
| Download arrow | Download/export | Down arrow with line |
| Printer | Print document | Printer outline |
| Globe/link | Visit site / URL | Globe or link chain |
| Clock/history | Version history | Clock face |
| Checkmark | Confirmed/published | Simple check mark |
| Trash/delete | Delete item | Trash can outline (red color) |
| Gear/settings | Settings/configuration | Gear/cog outline |
| Refresh | Restore defaults | Circular arrow |
| List | List view toggle | Three horizontal lines |
| Card | Card view toggle | Rounded rectangle or grid card |
| Table | Table view toggle | Grid of squares |
| Grid | Grid view toggle | 2×2 or larger grid |

## Anatomy

All icons follow this structure:

```
<svg class="icon" width="16" height="16" viewBox="0 0 16 16">
  <path
    d="M..."
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

**Structure:**
- SVG element with explicit width and height (16px or 20px)
- viewBox="0 0 16 16" or "0 0 20 20"
- Path or shape elements using stroke (not fill)
- `stroke="currentColor"` to inherit color from parent
- `stroke-width="1.5"` for consistent stroke weight
- `fill="none"` (outline, not filled)
- `stroke-linecap="round"` and `stroke-linejoin="round"` for softer appearance

## Token Usage

- **Size**: 16px or 20px square box (consistent aspect ratio)
- **Stroke weight**: 1.5px (consistent across all icons)
- **Color**: Inherits from `currentColor` (CSS property)
- **Default color**: `--foreground` (#181716)
- **Muted color**: `--color-muted` (#777777) for inactive icons
- **Danger color**: `--danger` (#dc2626) for delete icon only
- **Accent color**: `--accent` (#E8915A) for highlighted/active icons
- **Viewbox**: 16×16 or 20×20 logical units
- **Padding**: No internal padding; strokes should reach near viewBox edges

## HTML Example

### Icon in a Button
```html
<!-- Icon-only button (search) -->
<button class="breadcrumb-icon-button" title="Search">
  <svg class="icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5" />
    <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</button>

<!-- Icon with text (breadcrumb published badge) -->
<button class="published-badge">
  <svg class="icon" width="16" height="16" viewBox="0 0 16 16">
    <polyline points="2,8 6,12 14,4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <span>Published</span>
</button>

<!-- Icon in tree (file type) -->
<svg class="tree-icon" width="16" height="16" viewBox="0 0 16 16">
  <path d="M2,2 H14 V14 H2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
  <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" stroke-width="1.5" />
  <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" stroke-width="1.5" />
  <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.5" />
</svg>
```

### Common Icon Patterns
```html
<!-- Disclosure triangle (expand/collapse) -->
<svg class="tree-chevron" width="12" height="12" viewBox="0 0 12 12">
  <polyline points="3,1 9,6 3,11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

<!-- Kebab menu (three dots) -->
<button class="breadcrumb-menu" aria-label="More options">⋮</button>
<!-- Or as SVG -->
<svg width="16" height="16" viewBox="0 0 16 16">
  <circle cx="8" cy="2" r="1" fill="currentColor" />
  <circle cx="8" cy="8" r="1" fill="currentColor" />
  <circle cx="8" cy="14" r="1" fill="currentColor" />
</svg>

<!-- Spinner (animated) -->
<div class="toast-spinner"></div>
<!-- CSS creates the spinning animation -->

<!-- Delete/trash (red) -->
<svg class="icon" width="16" height="16" viewBox="0 0 16 16">
  <path d="M2,4 H14 M4,4 V13 H12 V4 M6,4 V2 H10 V4 M6,6 V11 M10,6 V11 M8,6 V11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

## CSS Example

```css
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: var(--foreground);
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

/* Icon sizes */
.icon-sm {
  width: 12px;
  height: 12px;
}

.icon-md {
  width: 16px;
  height: 16px;
}

.icon-lg {
  width: 20px;
  height: 20px;
}

/* Icon colors */
.icon-muted {
  color: var(--color-muted);
}

.icon-accent {
  color: var(--accent);
}

.icon-danger {
  color: var(--danger);
}

.icon-success {
  color: var(--success);
}

/* Icon in buttons */
.btn svg.icon {
  /* Inherits color from button */
}

.breadcrumb-icon-button .icon {
  color: var(--color-muted);
  transition: color 0.15s ease;
}

.breadcrumb-icon-button:hover .icon {
  color: var(--foreground);
}

/* Animated spinner */
.toast-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tree chevron rotation */
.tree-chevron {
  transition: transform 0.2s ease;
}

.tree-chevron-down {
  transform: rotate(90deg);
}
```

## SVG Template Examples

### Magnifying Glass (Search)
```svg
<svg width="16" height="16" viewBox="0 0 16 16">
  <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

### Plus (Create)
```svg
<svg width="16" height="16" viewBox="0 0 16 16">
  <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

### Folder
```svg
<svg width="16" height="16" viewBox="0 0 16 16">
  <path d="M2,3 H6 L8,2 H14 V13 H2 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

### Checkmark (Published)
```svg
<svg width="16" height="16" viewBox="0 0 16 16">
  <polyline points="2,8 6,12 14,4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Eye (Preview)
```svg
<svg width="16" height="16" viewBox="0 0 16 16">
  <path d="M8,2 C3,2 0,8 0,8 C0,8 3,14 8,14 C13,14 16,8 16,8 C16,8 13,2 8,2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
</svg>
```

### Moon (Dark Theme)
```svg
<svg width="16" height="16" viewBox="0 0 16 16">
  <path d="M2,8 A6,6 0 0 0 12,14 A5.5,5.5 0 0 1 2,8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
```

## JSX Example

```jsx
// Icon Component Wrapper
const Icon = ({ name, size = 16, color = 'currentColor', className = '' }) => {
  const icons = {
    magnifyingGlass: (
      <svg width={size} height={size} viewBox="0 0 16 16" className={`icon ${className}`}>
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 16 16" className={`icon ${className}`}>
        <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 16 16" className={`icon ${className}`}>
        <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    checkmark: (
      <svg width={size} height={size} viewBox="0 0 16 16" className={`icon ${className}`}>
        <polyline
          points="2,8 6,12 14,4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 16 16" className={`icon icon-danger ${className}`}>
        <path
          d="M2,4 H14 M4,4 V13 H12 V4 M6,4 V2 H10 V4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    folder: (
      <svg width={size} height={size} viewBox="0 0 16 16" className={`icon ${className}`}>
        <path
          d="M2,3 H6 L8,2 H14 V13 H2 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return icons[name] || null;
};

// Usage in Components
<button className="breadcrumb-icon-button" title="Search">
  <Icon name="magnifyingGlass" size={16} />
</button>

<button className="sidebar-new-button">
  <Icon name="plus" size={16} />
</button>

<button className="toast-close">
  <Icon name="close" size={18} />
</button>

<button className="context-menu-item context-menu-item-danger">
  <Icon name="trash" size={16} />
  <span>Delete</span>
</button>
```

## Do's and Don'ts

### Do
- Use outline/stroke style (never filled)
- Keep stroke weight consistent (1.5px)
- Use `stroke="currentColor"` to inherit color from context
- Size icons to 16px or 20px in a square viewBox
- Include appropriate titles/aria-labels on icon-only buttons
- Use round linecaps and linejoins for softer appearance
- Color icons to match their context (default foreground, danger for delete, etc.)
- Keep icon set consistent in style and weight
- Use proper viewBox for scalability
- Include icons in tooltips or aria-labels

### Don't
- Use filled/solid icons (always outline)
- Mix stroke weights across icons
- Create icons with thick strokes (stick to 1.5px)
- Use icons inside text buttons (only in icon-only buttons)
- Change icon colors arbitrarily (use the color system)
- Create oversized or undersized icons
- Use colored fills instead of strokes
- Include text inside SVG icons
- Create decorative-only icons
- Forget accessibility labels on icon-only buttons

## Rules Specific to Icons

1. **Outline only**: All icons use stroke (fill="none"), never filled shapes
2. **Consistent stroke weight**: 1.5px across all icons
3. **Inherits color**: Uses `stroke="currentColor"` to inherit from parent
4. **Square viewBox**: All icons use 16×16 or 20×20 logical units
5. **Rounded appearance**: Uses `stroke-linecap="round"` and `stroke-linejoin="round"`
6. **16px default**: Standard icon size is 16×16 pixels
7. **20px for large**: Larger contexts (headers) use 20×20 pixels
8. **No internal padding**: Strokes should reach near viewBox edges
9. **Color by context**: Delete icons are --danger, inactive are --muted, active are --accent
10. **Accessible labels**: Icon-only buttons always have title or aria-label attributes
11. **Consistent style**: All icons in the set follow same design language
12. **No embedded text**: Icons never contain text or numbers
13. **Flexible sizing**: Proper viewBox allows scaling without quality loss
