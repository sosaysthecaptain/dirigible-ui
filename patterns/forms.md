# Forms

## Description

How form elements are laid out and validated in Dirigible. Forms follow a clean, monospace-first approach with clear hierarchy and error handling.

## Patterns

### Stacked Form

The default form layout used in modals and panels.

**Structure:**
- Label above input
- 8px gap between label and input
- 16px gap between separate fields
- Labels are 13px JetBrains Mono, uppercase, `--muted` color
- Example labels: "URL SLUG", "COVER IMAGE", "EXCERPT", "TITLE"

**Example:**

```html
<form class="form-stack">
  <div class="form-group">
    <label for="title" class="form-label">TITLE</label>
    <input id="title" type="text" class="form-input" />
  </div>

  <div class="form-group">
    <label for="slug" class="form-label">URL SLUG</label>
    <input id="slug" type="text" class="form-input" />
  </div>

  <div class="form-group">
    <label for="excerpt" class="form-label">EXCERPT</label>
    <textarea id="excerpt" class="form-input"></textarea>
  </div>
</form>
```

**CSS:**

```css
.form-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
}

.form-input {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  border: 2px solid var(--border);
  border-radius: 0;
  padding: 8px 12px;
  background: var(--editor-bg);
  color: var(--foreground);
  transition: border-color 150ms ease-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
}
```

### Inline Form

Used for simple single-field forms where label and input share a row.

**Use cases:**
- Filter input in table headers
- Quick search overlays
- Simple toggle controls with labels

**Example:**

```html
<form class="form-inline">
  <label for="filter" class="form-label">SEARCH</label>
  <input id="filter" type="text" class="form-input" placeholder="notes, albums..." />
</form>
```

**CSS:**

```css
.form-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-inline .form-label {
  white-space: nowrap;
}

.form-inline .form-input {
  flex: 1;
  min-width: 0;
}
```

### Validation

Error states are indicated with color and messaging, never with inline icons.

**Error State:**
- Border changes to `--danger` color
- Error message appears below input
- Message is 11px JetBrains Mono in `--danger` color
- Label remains unchanged

**Example:**

```html
<div class="form-group">
  <label for="email" class="form-label">EMAIL</label>
  <input id="email" type="email" class="form-input is-invalid" value="invalid" />
  <span class="form-error">Invalid email format</span>
</div>
```

**CSS:**

```css
.form-input.is-invalid {
  border-color: var(--danger);
}

.form-error {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--danger);
  margin-top: 4px;
  display: block;
}
```

### Upload Area

Used for file uploads, particularly cover images in the publication panel.

**Design:**
- Dashed 2px border in `--border` color
- Centered text "Upload cover image"
- Click-to-browse interaction
- Accepts drag-and-drop

**Example:**

```html
<div class="form-group">
  <label for="cover" class="form-label">COVER IMAGE</label>
  <div class="upload-area">
    <input id="cover" type="file" class="upload-input" accept="image/*" />
    <div class="upload-placeholder">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <span>Upload cover image</span>
    </div>
  </div>
</div>
```

**CSS:**

```css
.upload-area {
  border: 2px dashed var(--border);
  border-radius: 0;
  padding: 32px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 150ms ease-out;
  background: var(--editor-bg);
}

.upload-area:hover {
  border-color: var(--accent);
  background: var(--hover);
}

.upload-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--muted);
}

.upload-area:hover .upload-placeholder {
  color: var(--accent);
}
```

### Toggle with Label

Toggle switch paired with descriptive label text.

**Use cases:**
- "Include in site" in publication panel
- Boolean settings throughout the app

**Example:**

```html
<div class="form-group form-toggle">
  <label class="toggle-label">
    <input type="checkbox" class="toggle-switch" />
    <span class="toggle-track">
      <span class="toggle-thumb"></span>
    </span>
    <span class="toggle-text">INCLUDE IN SITE</span>
  </label>
</div>
```

**CSS:**

```css
.form-toggle {
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  text-transform: uppercase;
  color: var(--muted);
}

.toggle-switch {
  display: none;
}

.toggle-track {
  display: inline-flex;
  width: 32px;
  height: 16px;
  background: var(--border);
  border: 2px solid var(--border);
  position: relative;
  border-radius: 0;
  transition: background-color 150ms ease-out;
  flex-shrink: 0;
}

.toggle-thumb {
  display: block;
  width: 8px;
  height: 8px;
  background: var(--foreground);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 150ms ease-out;
}

.toggle-switch:checked + .toggle-track {
  background: var(--accent);
  border-color: var(--accent);
}

.toggle-switch:checked + .toggle-track .toggle-thumb {
  left: 16px;
}

.toggle-text {
  flex: 1;
}
```

## Design Rules

1. **Labels are always uppercase monospace** in panels and modals. Never use sentence case.
2. **Never use placeholder text as a label substitute.** Placeholders are optional hints only.
3. **Group related fields with 16px gap** between groups (indicated by increased spacing).
4. **Submit/primary buttons are always at the bottom, right-aligned** within forms.
5. **All form inputs use the same base style:** JetBrains Mono 13px, 2px border, 4px grid alignment.
6. **Focus state is consistent:** border changes to `--accent` color, no visible outline.
7. **Error handling is explicit:** red border + red text message, no icons.
8. **Upload areas use dashed borders** to distinguish them from regular inputs.
9. **Maintain 8px gap between label and input** in stacked layouts for proper hierarchy.
10. **All form padding aligns to the 4px grid:** Use multiples of 4 (4px, 8px, 12px, 16px, 20px, etc.).
