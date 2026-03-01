# Slider

## Description

A range input for selecting a numeric value within a defined range. Uses the native `<input type="range">` element styled with `accent-color`. Found in the publication modal for favicon size adjustment and anywhere a numeric value needs a visual scrubber.

## When to Use

- **Favicon size**: Adjusting publication favicon dimensions (16–64px)
- **Image quality**: Setting export quality percentage
- **Any bounded numeric value**: Where a scrubber is more intuitive than a text input

Do not use for unbounded numbers or precise values that need exact keyboard entry (use a numeric input instead).

## Variants

| State | Description |
|-------|-------------|
| **Default** | Track with thumb at current value |
| **With value label** | Displays current value beside the slider |
| **With bounds** | Shows min/max labels at each end |
| **Disabled** | 50% opacity, cursor:not-allowed |

## Anatomy

```html
<div class="slider-wrapper">
  <input type="range" min="16" max="64" value="32" class="slider" />
  <span class="slider-value">32px</span>
</div>
```

## Token Usage

- **Track height**: 4px
- **Accent color**: var(--accent) via `accent-color` CSS property
- **Thumb**: Browser default, tinted by accent-color
- **Value label**: 13px monospace, right-aligned
- **Bounds labels**: 11px, color var(--muted)
- **Disabled**: opacity 0.5, cursor:not-allowed
- **Gap between slider and value**: 12px

## Rules Specific to Slider

1. **Native element**: Always use `<input type="range">`, not a custom implementation
2. **accent-color**: Set via `accent-color: var(--accent)` — no custom track/thumb styling
3. **Track height**: Use `height: 4` in Tailwind or `height: 4px` in CSS
4. **Always show current value**: Display the value beside the slider or below it
5. **Disabled state**: 50% opacity on the entire wrapper, cursor:not-allowed on the input
6. **Keyboard accessible**: Native range inputs support arrow keys by default
