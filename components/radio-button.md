# Radio Button

## Description

A single-select control for choosing one option from a set. The system uses radio buttons in two forms: standard circle radios for simple lists, and card-style radios for rich options with icons and descriptions (like the Blog/Wiki selector in the publish modal).

## When to Use

- **Publish modal**: Blog vs. Wiki selection
- **Font theme selector**: Monospace / Serif / Sans / Raw
- **Any mutually exclusive choice**: Where only one option can be active

Do not use radio buttons for binary on/off (use toggles) or multi-select (use checkboxes).

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| **Circle** | Standard radio dot, 16px diameter | Simple lists of text options |
| **Card** | Bordered card with icon + description | Rich options like Blog/Wiki in publish modal |

## Anatomy

### Circle Radio
```html
<label class="radio-wrapper">
  <span class="radio-circle radio-checked">
    <span class="radio-dot"></span>
  </span>
  <span class="radio-label">Option text</span>
</label>
```

### Card Radio
```html
<div class="radio-card radio-card-selected">
  <svg class="radio-card-icon"><!-- icon --></svg>
  <span class="radio-card-title">Blog</span>
  <span class="radio-card-description">Posts by date</span>
</div>
```

## Token Usage

- **Circle size**: 16px diameter, 2px border
- **Dot size**: 8px when selected
- **Selected border**: var(--accent) (#0066cc)
- **Unselected border**: var(--border)
- **Dot fill**: var(--accent)
- **Card border (selected)**: 2px solid var(--accent)
- **Card border (unselected)**: 1px solid var(--border)
- **Card background (selected)**: color-mix(in srgb, var(--accent) 8%, var(--bg))
- **Label font**: 13px monospace
- **Gap between radio and label**: 8px
- **Card padding**: 12px
- **Card gap**: 8px between cards

## Rules Specific to Radio Buttons

1. **Accent color for selection**: Selected state uses var(--accent) for border and dot
2. **Circle radios are 16px**: Consistent with checkbox sizing
3. **Card radios for rich content**: Use when options need icons or descriptions
4. **Always group radios**: Never use a single radio button alone
5. **Immediate effect**: Selection applies instantly, no submit needed
6. **Disabled state**: 50% opacity, cursor:not-allowed
