# Tag Input

## Description

An interactive input component for managing tags on notes. Tags are displayed as small pill-shaped chips that can be removed individually. The input supports creating new tags by pressing Enter or comma, with autocomplete suggestions from existing tags.

## When to Use

- **Note tagging**: Add/remove tags from notes in the note header or settings
- **Bulk categorization**: Apply multiple categories to a single note
- **Tag management**: Edit existing tags or remove unwanted tags
- **Search/filter**: Filter notes by tags

## Variants

| Style | Display | Interaction | Use |
|-------|---------|-------------|-----|
| **Expanded** | Full tag pills visible, input visible | Full edit capability | In note headers, tag editors |
| **Collapsed** | Dots only, expandable | Click to expand | In table cells, compact views |
| **Read-only** | Tag pills displayed | View only, no editing | In previews or locked items |

## Anatomy

```
<div class="tag-input-wrapper">
  <div class="tag-list">
    <span class="tag-pill">
      <span class="tag-text">Writing</span>
      <button class="tag-remove" aria-label="Remove tag">×</button>
    </span>
    <span class="tag-pill">
      <span class="tag-text">Tutorial</span>
      <button class="tag-remove">×</button>
    </span>
  </div>

  <div class="tag-input-field">
    <input
      type="text"
      class="tag-input"
      placeholder="Add tags..."
      autocomplete="off"
    />
    <ul class="tag-suggestions" role="listbox">
      <li class="tag-suggestion" role="option">Documentation</li>
    </ul>
  </div>
</div>
```

**Structure:**
- Container `.tag-input-wrapper`
- `.tag-list` containing individual tag pills
- Each tag is a `.tag-pill` with text and remove button
- `.tag-input-field` containing the input box and autocomplete dropdown
- Autocomplete suggestions displayed below input

## Token Usage

- **Pill background**: `--background-secondary` or light gray
- **Pill text**: `--foreground` (#181716), 13px monospace
- **Pill border**: Optional `1px solid --border`
- **Pill padding**: 4px 8px
- **Pill border radius**: 9999px (rounded pill shape)
- **Remove button**: Monospace ×, color `--color-muted`, hover darker
- **Input font**: 13px monospace
- **Input border**: 2px solid `--border`, 4px radius
- **Autocomplete background**: `--background`, `1px solid --border`
- **Suggestion hover**: `--hover-bg`
- **Gap between pills**: 4px

## HTML Example

### Tag Input in Note Header
```html
<div class="tag-input-wrapper">
  <label class="tag-input-label">Tags</label>

  <div class="tag-list">
    <span class="tag-pill">
      <span class="tag-text">Writing</span>
      <button
        class="tag-remove"
        aria-label="Remove tag Writing"
        onClick="removeTag('Writing')"
      >
        ×
      </button>
    </span>

    <span class="tag-pill">
      <span class="tag-text">Tutorial</span>
      <button
        class="tag-remove"
        aria-label="Remove tag Tutorial"
        onClick="removeTag('Tutorial')"
      >
        ×
      </button>
    </span>

    <span class="tag-pill">
      <span class="tag-text">Documentation</span>
      <button class="tag-remove" aria-label="Remove tag Documentation">
        ×
      </button>
    </span>
  </div>

  <div class="tag-input-field">
    <input
      type="text"
      class="tag-input"
      placeholder="Add more tags..."
      autocomplete="off"
      aria-label="Enter new tag"
    />

    <ul class="tag-suggestions" role="listbox">
      <li class="tag-suggestion" role="option">Community</li>
      <li class="tag-suggestion" role="option">Workflow</li>
      <li class="tag-suggestion" role="option">Tips</li>
    </ul>
  </div>
</div>
```

### Collapsed Tag View (in Table)
```html
<td class="table-cell">
  <div class="tag-list-collapsed">
    <span class="tag-dot" title="Writing"></span>
    <span class="tag-dot" title="Tutorial"></span>
    <span class="tag-dot" title="Documentation"></span>
  </div>
</td>
```

## CSS Example

```css
.tag-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-family-mono);
  font-size: 13px;
}

.tag-input-label {
  font-size: 13px;
  color: var(--color-muted);
  font-weight: 500;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: 9999px;
  color: var(--foreground);
  font-family: var(--font-family-mono);
  font-size: 13px;
  white-space: nowrap;
}

.tag-text {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-remove {
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  transition: color 0.15s ease;
  flex-shrink: 0;
}

.tag-remove:hover {
  color: var(--foreground);
}

.tag-input-field {
  position: relative;
  display: flex;
  align-items: flex-start;
}

.tag-input {
  width: 100%;
  font-family: var(--font-family-mono);
  font-size: 13px;
  padding: 6px 8px;
  border: 2px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--foreground);
  transition: border-color 0.15s ease;
}

.tag-input::placeholder {
  color: var(--color-muted);
}

.tag-input:focus {
  outline: none;
  border-color: var(--accent);
}

.tag-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  display: none;
  z-index: 10;
}

.tag-suggestions.visible {
  display: block;
}

.tag-suggestion {
  padding: 6px 8px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--foreground);
}

.tag-suggestion:hover {
  background-color: var(--hover-bg);
}

.tag-suggestion.selected {
  background-color: var(--accent);
  color: #ffffff;
}

/* Collapsed view */
.tag-list-collapsed {
  display: flex;
  gap: 4px;
  align-items: center;
}

.tag-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-muted);
  flex-shrink: 0;
}
```

## JSX Example

```jsx
// Tag Input Component
const [tags, setTags] = useState(['Writing', 'Tutorial', 'Documentation']);
const [inputValue, setInputValue] = useState('');
const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const [allAvailableTags] = useState([
  'Writing', 'Tutorial', 'Documentation', 'Community', 'Workflow',
  'Tips', 'Python', 'JavaScript', 'Design', 'Research'
]);

const handleInputChange = (e) => {
  const value = e.target.value;
  setInputValue(value);

  if (value.trim()) {
    const filtered = allAvailableTags.filter(
      (tag) =>
        !tags.includes(tag) &&
        tag.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  } else {
    setShowSuggestions(false);
  }
};

const handleAddTag = (tag) => {
  if (!tags.includes(tag) && tag.trim()) {
    setTags([...tags, tag.trim()]);
    setInputValue('');
    setShowSuggestions(false);
  }
};

const handleKeyDown = (e) => {
  if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
    e.preventDefault();
    handleAddTag(inputValue);
  } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
    setTags(tags.slice(0, -1));
  }
};

const handleRemoveTag = (tagToRemove) => {
  setTags(tags.filter((tag) => tag !== tagToRemove));
};

const handleSuggestionClick = (suggestion) => {
  handleAddTag(suggestion);
};

<div className="tag-input-wrapper">
  <label className="tag-input-label">Tags</label>

  <div className="tag-list">
    {tags.map((tag) => (
      <span key={tag} className="tag-pill">
        <span className="tag-text">{tag}</span>
        <button
          className="tag-remove"
          aria-label={`Remove tag ${tag}`}
          onClick={() => handleRemoveTag(tag)}
        >
          ×
        </button>
      </span>
    ))}
  </div>

  <div className="tag-input-field">
    <input
      type="text"
      className="tag-input"
      placeholder="Add more tags..."
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={() => setShowSuggestions(suggestions.length > 0)}
      aria-label="Enter new tag"
      autoComplete="off"
    />

    {showSuggestions && (
      <ul className="tag-suggestions visible" role="listbox">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="tag-suggestion"
            role="option"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

// Collapsed Tag View (in Table)
<div className="tag-list-collapsed">
  {tags.slice(0, 3).map((tag) => (
    <span key={tag} className="tag-dot" title={tag}></span>
  ))}
  {tags.length > 3 && (
    <span className="tag-count" title={`${tags.length - 3} more tags`}>
      +{tags.length - 3}
    </span>
  )}
</div>
```

## Do's and Don'ts

### Do
- Display tags as rounded pill shapes with consistent styling
- Support adding tags via Enter or comma keys
- Autocomplete suggestions from existing tags
- Allow removing tags with × button in each pill
- Support keyboard deletion (Backspace removes last tag)
- Show autocomplete dropdown when user types
- Use monospace font for all tag text
- Make tag pills easily scannable and removable
- Organize tags inline with wrapping
- Provide visual feedback on hover

### Don't
- Use tags for non-categorical data
- Create tags that are too long (truncate if needed)
- Hide the remove button on tags
- Autocomplete unrelated or system-only tags
- Make tag pills look like buttons
- Use different colors for different tags (keep styling consistent)
- Allow duplicate tags in the same input
- Forget to show suggestions when user types
- Use tags where buttons or separate input fields would be clearer
- Make tag input too wide or cramped

## Rules Specific to Tag Inputs

1. **Pill shape**: Tags are fully rounded (9999px border-radius) rounded pills
2. **Monospace throughout**: All tag text is 13px JetBrains Mono
3. **Remove button always visible**: × button appears on every tag pill
4. **Auto-suggest on input**: Suggestions appear as user types
5. **Add on Enter/comma**: Both keys create a new tag
6. **Backspace to remove**: Pressing Backspace when input is empty removes last tag
7. **No duplicate tags**: Input prevents adding the same tag twice
8. **Autocomplete from existing**: Suggestions only include existing tags that aren't already added
9. **Wrapping layout**: Tags wrap to next line, not horizontal scroll
10. **4px gap between pills**: Consistent spacing between tag pills
11. **Collapsed dots in tables**: Compact view shows small dots instead of full pills
12. **Monospace input**: Input field uses same monospace font as tag pills
