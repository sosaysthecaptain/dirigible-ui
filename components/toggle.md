# Toggle

## Description

A pill-shaped switch component that represents an on/off or enabled/disabled state. The toggle is used for binary choices where the user needs to see the current state and toggle it with a single click.

## When to Use

- **Publication settings**: "Include in site" toggle in the publication panel
- **Feature flags**: Enable/disable sync, notifications, or other features
- **Binary choices**: Any yes/no, on/off setting that needs visual feedback

Do not use toggles for multi-state options; use radio buttons or select dropdowns instead.

## Variants

| State | Background | Circle Position | Text | Use |
|-------|-----------|-----------------|------|-----|
| **Enabled** | #3b82f6 (blue) or --success | Right (70% from left) | Optional "on" label | Feature is active |
| **Disabled** | --muted (#777777) or --border (#e8e6e3) | Left (30% from left) | Optional "off" label | Feature is inactive |

## Anatomy

```
<label class="toggle-wrapper">
  <input type="checkbox" class="toggle-input" />
  <span class="toggle-track">
    <span class="toggle-circle"></span>
  </span>
  <span class="toggle-label">Include in site</span>
</label>
```

**Structure:**
- Outer `<label>` wrapping the entire component for keyboard accessibility
- Hidden `<input type="checkbox">` to track state and handle keyboard interaction
- `.toggle-track`: The pill-shaped background container
- `.toggle-circle`: The animated white circle that slides left/right
- Optional `.toggle-label`: Text label to the right of the toggle

## Token Usage

- **Width**: 40px
- **Height**: 22px
- **Circle diameter**: 18px
- **Border radius**: `9999px` (fully rounded pill shape)
- **Colors**:
  - Enabled background: `--accent` (#E8915A)
  - Disabled background: `--color-muted` (#777777) or `--border` (#e8e6e3)
  - Circle: `#ffffff` (white, always)
  - Label text: `--foreground` (#181716), 13px monospace
- **Animation**: Smooth 0.2s transition when toggling
- **Cursor**: `pointer` on hover

## HTML Example

### Basic Toggle
```html
<label class="toggle-wrapper">
  <input type="checkbox" class="toggle-input" />
  <span class="toggle-track">
    <span class="toggle-circle"></span>
  </span>
</label>
```

### Toggle with Label
```html
<label class="toggle-wrapper">
  <input type="checkbox" class="toggle-input" />
  <span class="toggle-track">
    <span class="toggle-circle"></span>
  </span>
  <span class="toggle-label">Include in site</span>
</label>
```

### Toggle Disabled
```html
<label class="toggle-wrapper toggle-disabled">
  <input type="checkbox" class="toggle-input" disabled />
  <span class="toggle-track">
    <span class="toggle-circle"></span>
  </span>
  <span class="toggle-label">Include in site</span>
</label>
```

### Toggle Checked/Enabled
```html
<label class="toggle-wrapper">
  <input type="checkbox" class="toggle-input" checked />
  <span class="toggle-track toggle-checked">
    <span class="toggle-circle"></span>
  </span>
  <span class="toggle-label">Include in site</span>
</label>
```

## CSS Example

```css
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.toggle-input {
  appearance: none;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
}

.toggle-track {
  display: flex;
  align-items: center;
  width: 40px;
  height: 22px;
  border-radius: 9999px;
  background-color: var(--color-muted);
  padding: 2px 2px;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.toggle-circle {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background-color: #ffffff;
  transition: transform 0.2s ease;
  transform: translateX(0);
}

/* Checked/Enabled State */
.toggle-input:checked + .toggle-track {
  background-color: #3b82f6;
}

.toggle-input:checked + .toggle-track .toggle-circle {
  transform: translateX(16px);
}

/* Disabled State */
.toggle-input:disabled + .toggle-track {
  background-color: var(--color-muted);
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-wrapper:has(.toggle-input:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Focus State (for keyboard navigation) */
.toggle-input:focus + .toggle-track {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Label */
.toggle-label {
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--foreground);
  line-height: 1.4;
}

/* Hover State */
.toggle-wrapper:not(:has(.toggle-input:disabled)):hover .toggle-track {
  opacity: 0.85;
}
```

## JSX Example

```jsx
// Basic controlled toggle
const [includeInSite, setIncludeInSite] = useState(false);

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

// Toggle with async update
const [isSync, setIsSync] = useState(true);
const [isSyncing, setIsSyncing] = useState(false);

const handleSyncToggle = async (checked) => {
  setIsSyncing(true);
  try {
    await updateSyncSetting(checked);
    setIsSync(checked);
  } catch (error) {
    console.error('Failed to update sync setting', error);
  } finally {
    setIsSyncing(false);
  }
};

<label className={`toggle-wrapper ${isSyncing ? 'toggle-disabled' : ''}`}>
  <input
    type="checkbox"
    className="toggle-input"
    checked={isSync}
    onChange={(e) => handleSyncToggle(e.target.checked)}
    disabled={isSyncing}
  />
  <span className="toggle-track">
    <span className="toggle-circle"></span>
  </span>
  <span className="toggle-label">Auto-sync enabled</span>
</label>

// Uncontrolled toggle
<label className="toggle-wrapper">
  <input
    type="checkbox"
    className="toggle-input"
    defaultChecked={false}
    onChange={(e) => console.log('Toggle state:', e.target.checked)}
  />
  <span className="toggle-track">
    <span className="toggle-circle"></span>
  </span>
</label>
```

## Do's and Don'ts

### Do
- Use toggles for binary on/off or enabled/disabled states
- Place the label to the right of the toggle for better readability
- Keep labels short and clear: "Include in site", "Auto-sync enabled"
- Use the toggle within a labeled section or field group in forms
- Provide immediate visual feedback when toggling
- Support keyboard interaction (Space/Enter to toggle)
- Show the current state clearly (left circle = off, right circle = on)
- Use the accent color (#E8915A) for the enabled state
- Disable toggles with the `disabled` attribute when the option is unavailable

### Don't
- Use toggles for multi-state options (use dropdowns or radio buttons instead)
- Hide the current state or use ambiguous styling
- Use only text labels without the visual toggle component
- Mix toggle styles or colors outside of the defined variants
- Use toggles for navigation or page changes
- Create a toggle with border or outline styling; keep it minimal
- Use toggles inside buttons or complex nested components
- Place labels inline with the toggle circle; labels go to the right
- Forget to wrap the toggle in a `<label>` for accessibility

## Rules Specific to Toggles

1. **Fully rounded pill shape**: Always use `border-radius: 9999px`
2. **White circle**: The toggle circle is always #ffffff, regardless of state
3. **Circle position**: Left edge when disabled (~30%), right edge when enabled (~70%)
4. **Smooth animation**: Toggle uses 0.2s ease transition for circle movement
5. **Blue when enabled**: Use `#3b82f6` (blue) for the enabled state background — not the accent color
6. **Muted color when disabled**: Use `--color-muted` or `--border` for the disabled state background
7. **Size consistency**: 40px wide, 22px tall, 18px circle diameter—no variations
8. **Keyboard accessibility**: Always wrap in `<label>` and use `<input type="checkbox">` for native keyboard support
9. **No text overlay**: Do not place "ON/OFF" or "YES/NO" text inside the toggle track; use optional label text beside
10. **Accessible disabled state**: Use the `disabled` attribute on the checkbox input; never use class-only disabled states
