# Input

## Description

Text input fields and related form controls used for user data entry across the app. All inputs follow a consistent 2px border, monospace font, and focus state that highlights the active field with the accent color.

## When to Use

- **Text Input**: General text entry, titles, names, or single-line data
- **Search Input**: Find items in the sidebar or within lists
- **Filter Input**: Search within table data (labeled "Q Filter...")
- **URL Slug Input**: Configure publication URL paths with domain prefix
- **Textarea**: Multi-line text for excerpts, descriptions, or longer content

## Variants

| Variant | Context | Placeholder | Icon | Width |
|---------|---------|-------------|------|-------|
| **Text Input** | General forms, note titles, settings | Varies | None | Full parent width |
| **Search Input** | Sidebar header | "Search..." | Magnifying glass | Sidebar width |
| **Filter Input** | Table header bar | "Q Filter..." | Search/filter icon | ~200px or flexible |
| **URL Slug Input** | Publication panel | None | Domain prefix text | Flexible minus prefix |
| **Textarea** | Publication excerpt, long content | Placeholder text | None | Full parent width |

### States

All input variants support these states:

- **Default**: 2px border in --border color (#e8e6e3), placeholder text in --muted color
- **Focus**: Border color changes to --accent (#E8915A), no outer outline glow (border is the indicator)
- **Disabled**: Background color slightly grayed, `cursor: not-allowed`, opacity 0.6
- **Error**: Border color changes to --danger (#dc2626), with optional error message below

## Anatomy

```
<div class="input-wrapper">
  [Optional Label]
  <div class="input-field">
    [Optional Icon Prefix]
    <input type="text" class="input" placeholder="..." />
  </div>
  [Optional Error Message]
</div>
```

**Structure:**
- Optional `<label>` element above input (13px monospace, --muted color, sometimes uppercase)
- Outer `.input-field` wrapper for layout control
- Inner `<input>` element with class `.input`
- Optional icon prefix (via ::before pseudo-element or separate element)
- Optional error text below the input (12px, --danger color)

## Token Usage

- **Font**: `--font-family-mono` (JetBrains Mono), `--font-size-base` (13px) for text input, `--font-size-sm` (14px) for some contexts
- **Border**: `2px solid`
- **Border Color**: `--border` (#e8e6e3) default, `--accent` (#E8915A) on focus, `--danger` (#dc2626) on error
- **Placeholder**: `--color-muted` (#777777)
- **Padding**: `6px 8px` (text input), `6px 8px` (textarea)
- **Radius**: `4px`
- **Background**: `--background` (off-white #fefefe light, #181716 dark) or transparent
- **Line height**: 1.4 (~18px at 13px font)

## HTML Example

### Text Input (Basic)
```html
<div class="input-wrapper">
  <label class="input-label">Note Title</label>
  <input type="text" class="input" placeholder="Enter title..." />
</div>
```

### Search Input (Sidebar)
```html
<div class="input-wrapper input-search">
  <svg class="input-icon" width="16" height="16" viewBox="0 0 16 16">
    <!-- magnifying glass icon -->
  </svg>
  <input type="text" class="input" placeholder="Search..." />
</div>
```

### Filter Input (Table Header)
```html
<div class="input-wrapper input-filter">
  <svg class="input-icon" width="16" height="16" viewBox="0 0 16 16">
    <!-- filter/search icon -->
  </svg>
  <input type="text" class="input" placeholder="Q Filter..." />
</div>
```

### URL Slug Input (Publication Panel)
```html
<div class="input-wrapper">
  <label class="input-label">URL SLUG</label>
  <div class="input-field input-prefix">
    <span class="input-prefix-text">https://mysite.com/</span>
    <input type="text" class="input" placeholder="my-note" />
  </div>
</div>
```

### Textarea (Excerpt)
```html
<div class="input-wrapper">
  <label class="input-label">EXCERPT</label>
  <textarea class="input input-textarea" placeholder="Brief summary of the note..."></textarea>
</div>
```

### Input with Error
```html
<div class="input-wrapper">
  <label class="input-label">Email</label>
  <input type="email" class="input input-error" placeholder="user@example.com" />
  <p class="input-error-message">Please enter a valid email address</p>
</div>
```

## CSS Example

```css
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.input-label {
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.4;
  font-weight: 500;
}

.input-field {
  display: flex;
  align-items: center;
  position: relative;
}

.input {
  width: 100%;
  font-family: var(--font-family-mono);
  font-size: 13px;
  padding: 6px 8px;
  border: 2px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.4;
  transition: border-color 0.15s ease;
}

.input::placeholder {
  color: var(--color-muted);
}

.input:focus {
  outline: none;
  border-color: var(--accent);
}

.input:disabled {
  background-color: var(--background-disabled);
  opacity: 0.6;
  cursor: not-allowed;
}

.input.input-error {
  border-color: var(--danger);
}

.input-error-message {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--danger);
  margin-top: 2px;
}

/* Icon prefix styling */
.input-icon {
  position: absolute;
  left: 8px;
  width: 16px;
  height: 16px;
  color: var(--color-muted);
  pointer-events: none;
}

.input-field.input-search .input {
  padding-left: 28px;
}

/* Text prefix styling (for URL slug) */
.input-prefix-text {
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--color-muted);
  padding: 6px 8px;
  background-color: var(--background-secondary);
  border-radius: 4px 0 0 4px;
  white-space: nowrap;
}

.input-field.input-prefix .input {
  border-radius: 0 4px 4px 0;
  padding-left: 6px;
}

/* Textarea */
.input-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: var(--font-family-mono);
}
```

## JSX Example

```jsx
// Text Input
const [title, setTitle] = useState('');

<div className="input-wrapper">
  <label className="input-label">Note Title</label>
  <input
    type="text"
    className="input"
    placeholder="Enter title..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
</div>

// Search Input with Icon
<div className="input-wrapper input-search">
  <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="2" />
  </svg>
  <input
    type="text"
    className="input"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

// URL Slug Input
const [slug, setSlug] = useState('');

<div className="input-wrapper">
  <label className="input-label">URL SLUG</label>
  <div className="input-field input-prefix">
    <span className="input-prefix-text">https://mysite.com/</span>
    <input
      type="text"
      className="input"
      placeholder="my-note"
      value={slug}
      onChange={(e) => setSlug(e.target.value)}
    />
  </div>
</div>

// Textarea
const [excerpt, setExcerpt] = useState('');

<div className="input-wrapper">
  <label className="input-label">EXCERPT</label>
  <textarea
    className="input input-textarea"
    placeholder="Brief summary of the note..."
    value={excerpt}
    onChange={(e) => setExcerpt(e.target.value)}
  />
</div>

// Input with Error State
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<div className="input-wrapper">
  <label className="input-label">Email</label>
  <input
    type="email"
    className={`input ${error ? 'input-error' : ''}`}
    placeholder="user@example.com"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      setError('');
    }}
  />
  {error && <p className="input-error-message">{error}</p>}
</div>
```

## Do's and Don'ts

### Do
- Use 2px solid borders on all inputs for consistency
- Change border color to --accent on focus (not outline or glow)
- Use --muted color for placeholder and label text
- Label all inputs with descriptive labels above the field
- Keep placeholder text short and helpful: "Search...", "my-note", not "Enter the note title here"
- Use textarea for multi-line input (excerpts, descriptions)
- Show error messages below the input in --danger color when validation fails
- Use monospace 13px for all input text and labels
- Disable inputs with the `disabled` attribute when they're not applicable

### Don't
- Use outlines or glows for focus states; only change the border color
- Place labels inline with inputs (labels go above)
- Use placeholder text as a label substitute; always include a proper label
- Mix font families or sizes in inputs
- Create custom border colors outside of --border, --accent, and --danger
- Use thin or thick borders; always use 2px
- Disable inputs by graying them out with opacity without the `disabled` attribute
- Use inputs for display-only text; use plain text or static fields
- Add icons inside the input element; place them outside or use ::before

## Rules Specific to Inputs

1. **Always 2px borders**: No thinner borders, no outlines—only 2px solid borders
2. **Focus = border color change**: The border changes from --border to --accent; no additional styling
3. **Monospace-only**: All input text, labels, and prefixes use JetBrains Mono 13px
4. **Label above field**: Labels always appear above inputs, not floating or inline
5. **Error state uses --danger**: Validation errors show as a 2px --danger border and error message text
6. **Padding consistency**: 6px vertical, 8px horizontal for all input types
7. **4px radius**: All inputs have 4px border-radius, matching the design system
8. **Icon prefixes are read-only**: Icon prefixes (magnifying glass, filter icon) are decorative and not interactive
9. **Text prefixes are separate**: URL slug prefixes use separate text spans, not nested HTML
10. **Textarea minimum height**: Set min-height to at least 100px for textarea variants
