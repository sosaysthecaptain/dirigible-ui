# Button

## Description

A versatile interactive element used to trigger actions throughout the Dirigible app. Buttons come in three distinct variants (Primary, Secondary, Danger) to clearly communicate the importance and nature of the action they represent.

## When to Use

- **Primary**: Main calls-to-action like "Choose folder", "Set as default light theme", or form submissions
- **Secondary**: Alternative actions like "Cancel", "Browse all", or non-critical navigation
- **Danger**: Destructive confirmations like "Delete folder" or "Permanently remove"
- **Text-only**: Lightweight actions in modal footers, "Import from backup", "Close"

Buttons should use sentence case, never uppercase. Do not include icons inside buttons; icons are separate interactive elements.

## Variants

| Variant | Background | Text Color | Border | Use Case |
|---------|-----------|-----------|--------|----------|
| **Primary** | #1a1a1a (dark gray/black) | #ffffff (white) | 2px solid #1a1a1a | Main action, affirmative choice |
| **Secondary** | transparent/white | #181716 (dark text) | 2px solid --border (#e8e6e3) | Alternative actions, cancel |
| **Danger** | #dc2626 (red) | #ffffff (white) | 2px solid #dc2626 | Destructive actions only |
| **Text-only** | none | #181716 | none | Supplementary actions, links |

### States

All button variants support these interactive states:

- **Default**: Base styling as defined above
- **Hover**: Background slightly lighter (Primary) or darker (Secondary); Danger hover at #b91c1c
- **Active/Pressed**: Background darkens further, slight inset shadow
- **Disabled**: Opacity 0.5, `cursor: not-allowed`, no pointer events

## Anatomy

```
<button class="btn btn-primary">
  [Label Text]
</button>
```

**Structure:**
- Outer `<button>` element with class `btn` and variant class (`btn-primary`, `btn-secondary`, `btn-danger`, `btn-text`)
- Inner text content (no nested elements)
- No icons; icon-buttons are separate components
- No aria-labels needed if text is clear; add for icon-only buttons (not applicable here)

## Token Usage

- **Font**: `--font-family-mono` (JetBrains Mono), `--font-size-base` (13px)
- **Colors**:
  - Primary: `--color-bg-primary` (#1a1a1a), `--color-text-light` (#ffffff)
  - Secondary: `--color-bg-secondary` (transparent), `--color-border` (#e8e6e3), `--color-text-dark` (#181716)
  - Danger: `--color-danger` (#dc2626), `--color-text-light` (#ffffff)
  - Text-only: `--color-text-dark`, `--color-border` (on hover)
- **Spacing**: Padding `4px 12px`
- **Border**: `2px solid`
- **Radius**: `4px`
- **Line height**: Inherit from 13px base (typically 1.4 = ~18px)

## HTML Example

### Primary Button
```html
<button class="btn btn-primary">Choose folder</button>
```

### Secondary Button
```html
<button class="btn btn-secondary">Cancel</button>
```

### Danger Button
```html
<button class="btn btn-danger">Delete permanently</button>
```

### Text-Only Button (in modal footer)
```html
<div class="modal-footer">
  <button class="btn btn-text">Import from backup</button>
  <button class="btn btn-secondary">Cancel</button>
  <button class="btn btn-primary">Choose folder</button>
</div>
```

## CSS Example

```css
.btn {
  font-family: var(--font-family-mono);
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.15s ease;
  line-height: 1.4;
}

.btn-primary {
  background-color: #1a1a1a;
  color: #ffffff;
  border-color: #1a1a1a;
}

.btn-primary:hover {
  background-color: #2d2d2d;
  border-color: #2d2d2d;
}

.btn-primary:active {
  background-color: #0f0f0f;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: #181716;
  border-color: #e8e6e3;
}

.btn-secondary:hover {
  background-color: #f7f5f2;
  border-color: #d4d1ce;
}

.btn-danger {
  background-color: #dc2626;
  color: #ffffff;
  border-color: #dc2626;
}

.btn-danger:hover {
  background-color: #b91c1c;
  border-color: #b91c1c;
}

.btn-text {
  background: none;
  border: none;
  color: #181716;
  padding: 4px 0;
  text-decoration: none;
}

.btn-text:hover {
  text-decoration: underline;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## JSX Example

```jsx
// Primary button
<button className="btn btn-primary" onClick={handleChooseFolder}>
  Choose folder
</button>

// Secondary button
<button className="btn btn-secondary" onClick={handleCancel}>
  Cancel
</button>

// Danger button with confirmation pattern
const [confirmDelete, setConfirmDelete] = useState(false);

{!confirmDelete ? (
  <button className="btn btn-danger" onClick={() => setConfirmDelete(true)}>
    Delete
  </button>
) : (
  <>
    <span>Are you sure?</span>
    <button className="btn btn-danger" onClick={handleConfirmDelete}>
      Yes, delete
    </button>
    <button className="btn btn-secondary" onClick={() => setConfirmDelete(false)}>
      Cancel
    </button>
  </>
)}

// Text-only button
<button className="btn btn-text" onClick={handleImportBackup}>
  Import from backup
</button>
```

## Do's and Don'ts

### Do
- Use **Primary** buttons for the main action on a page or modal
- Use **Secondary** buttons for alternative or cancel actions
- Use **Danger** buttons only for destructive operations
- Implement a two-click confirmation pattern for destructive actions (first click reveals "Are you sure?", second click confirms)
- Use sentence case: "Set as default light theme" not "SET AS DEFAULT LIGHT THEME"
- Keep button labels short and action-oriented: "Choose", "Save", "Delete", not "Click here to choose"
- Use consistent padding (4px 12px) across all buttons for visual uniformity

### Don't
- Mix button styles in a single action group (primary should be the dominant action)
- Place icons inside buttons; use separate icon-button components instead
- Use Danger buttons for non-destructive actions
- Use all-caps text in buttons
- Create custom button styles outside these three variants
- Skip the destructive confirmation pattern; always require two clicks for dangerous actions
- Use buttons for navigation; use links instead (unless it's a form submission)
- Make button text longer than ~30 characters

## Rules Specific to Buttons

1. **Monospace-only**: All button text uses JetBrains Mono at 13px; no other fonts
2. **Two-click destructive pattern**: Danger buttons must hide their action on first click and show a confirmation state before the second click executes
3. **No nested elements**: Buttons contain only text nodes; no `<span>`, `<i>`, or child elements
4. **Consistent sizing**: All buttons use the same padding and font size regardless of content
5. **Border always 2px**: No thinner borders, no outlines; only solid 2px borders
6. **Text-only buttons are not primary**: Text buttons should never be the main CTA; they're supplementary
7. **Disabled state**: Use `disabled` attribute on the button element; never use a separate "disabled" class on a parent
