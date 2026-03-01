# Theme Picker

## Description

A popover that opens from the palette icon in the sidebar bottom bar, allowing users to switch between 23 built-in color themes. Displays themes in Light/Dark sections with colored swatches next to each name. Also includes a light/dark mode toggle button in the header.

## When to Use

- **Theme switching**: User wants to change the overall color scheme of the app
- **Appearance customization**: Accessed via the palette icon in the sidebar bottom bar

Do not use the theme picker for per-note font themes (those are in the context menu).

## Variants

| Variant | Description |
|---------|-------------|
| **Built-in themes** | 23 pre-defined themes (2 light, 21 dark) |
| **Custom themes** | User-created themes with CSS editor (advanced) |

## Anatomy

```
<div class="theme-picker">
  <div class="theme-picker-header">
    <span class="theme-picker-title">Themes</span>
    <button class="theme-picker-mode-toggle"><!-- moon/sun icon --></button>
  </div>
  <div class="theme-picker-section-label">LIGHT</div>
  <div class="theme-picker-item theme-picker-item-selected">
    <div class="theme-picker-swatch" style="background: #f0eeeb;"></div>
    <span>Dirigible Light</span>
  </div>
  <div class="theme-picker-item">
    <div class="theme-picker-swatch" style="background: #f0f0f0;"></div>
    <span>Alabaster</span>
  </div>
  <div class="theme-picker-section-label">DARK</div>
  <!-- Dark theme items... -->
</div>
```

**Structure:**
- Popover container anchored to the palette button in sidebar bottom bar
- Header with "Themes" title and moon/sun toggle
- Section labels: "LIGHT" and "DARK"
- Each theme item has a 16x16 swatch square and theme name
- Selected theme gets accent background highlight
- Scrollable list for the full 23 themes

## Token Usage

- **Swatch size**: 16x16px, border-radius 4px
- **Swatch color**: Uses each theme's `sidebar-bg` color as the swatch fill
- **Swatch border**: 1.5px solid, slightly darker than the swatch color
- **Selected item**: Background uses `color-mix(in srgb, var(--accent) 15%, transparent)`
- **Section labels**: 11px uppercase, muted color
- **Item padding**: 6px 12px
- **Item font**: 13px monospace
- **Popover width**: ~240px
- **Popover border-radius**: 6px
- **Popover shadow**: `0 4px 16px rgba(0,0,0,0.12)`

## Rules Specific to Theme Picker

1. **Swatch represents theme**: Each swatch shows the theme's sidebar-bg color
2. **Light/Dark sections**: Always separate themes into appearance groups
3. **Single selection**: Only one theme active at a time
4. **Instant preview**: Theme applies immediately on click (no confirm button)
5. **Moon/Sun toggle**: Switches between light and dark appearance independently
6. **Popover positioning**: Anchored above the palette icon, opens upward
7. **23 built-in themes**: 2 light (Dirigible Light, Alabaster) + 21 dark
