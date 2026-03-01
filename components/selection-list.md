# Selection List

## Description

A vertical list of selectable items used as a sidebar navigation panel inside modals and settings views. Each item can optionally include an icon or colored swatch. The selected item is highlighted with an accent tint. Items are grouped under uppercase section labels.

## When to Use

- **Themes modal**: Left pane listing all 23 themes with color swatches
- **Settings navigation**: Left pane with Account, Appearance, Preferences, Sync sections
- **Any modal or panel** that needs a vertical list of selectable options with a detail view on the right

Do not use for dropdowns (use a select or popover) or for tree navigation (use the sidebar folder tree).

## Variants

| Variant | Description |
|---------|-------------|
| **With swatches** | Each item has a 14x14 colored square (theme picker) |
| **With icons** | Each item has a 14px icon (settings nav) |
| **Plain text** | Items with no leading visual |

## Anatomy

```html
<div class="selection-list">
  <div class="selection-list-section-label">LIGHT</div>
  <div class="selection-list-item selection-list-item-selected">
    <div class="selection-list-swatch" style="background: #f0eeeb;"></div>
    <span>Dirigible Light</span>
  </div>
  <div class="selection-list-item">
    <div class="selection-list-swatch" style="background: #f0f0f0;"></div>
    <span>Alabaster</span>
  </div>
  <div class="selection-list-section-label">DARK</div>
  <!-- More items... -->
</div>
```

## Token Usage

- **Panel width**: 210px (themes modal) or flexible
- **Panel background**: var(--sidebar-bg)
- **Section labels**: 11px uppercase, color var(--muted), padding 4px 12px
- **Item padding**: 6px 12px
- **Item font**: 13px monospace
- **Item gap (icon/swatch to text)**: 8px
- **Selected item background**: color-mix(in srgb, var(--accent) 15%, transparent)
- **Selected item text**: var(--accent)
- **Swatch size**: 14x14px, border-radius 3px
- **Swatch border**: 1.5px solid (slightly darker than swatch color)
- **Hover**: var(--hover) background
- **Border-right** (when used as left panel): 1px solid var(--border)

## Rules Specific to Selection List

1. **Section labels**: Always uppercase, 11px, muted color
2. **Single selection**: Only one item highlighted at a time
3. **Accent highlight**: Selected row uses accent at 15% opacity background + accent text color
4. **Swatches represent themes**: Each swatch shows the theme's sidebar-bg color
5. **Scrollable**: List should scroll vertically if items exceed container height
6. **No border on items**: Items have no individual borders — they sit flush in the panel
7. **Pairs with detail panel**: Almost always used alongside a content panel on the right
