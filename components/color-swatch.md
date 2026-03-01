# Color Swatch

## Description

Small visual color patches used to display color values in theme editors and settings. Color swatches show the actual color with an optional label, and may be clickable to open a color picker for customization.

## When to Use

- **Theme editor**: Show all colors in a theme (background, foreground, accent, etc.)
- **Theme list**: Display a small swatch beside each theme name
- **Color customization**: Allow users to edit theme colors via color picker
- **Color legend**: Show what each color in the theme represents
- **Color comparison**: Compare colors between different themes

Do not use color swatches for standalone color indicators; use status dots instead.

## Variants

| Type | Size | Labels | Interactive | Use Case |
|------|------|--------|-------------|----------|
| **Theme swatch** | 16px square | None | No | Next to theme name in list |
| **Swatch grid** | 16px square | Below/beside | Optional | Full theme color display |
| **Large swatch** | 32px square | Beside | Optional | Theme preview or editor |
| **Editable swatch** | 24px square | Below | Yes (click opens picker) | Color customization |

## Anatomy

### Standard Swatch
```
<div class="color-swatch-item">
  <div class="color-swatch" style="background-color: #fefefe;"></div>
  <span class="color-swatch-label">Background</span>
</div>
```

**Structure:**
- Outer container `.color-swatch-item`
- Inner colored box `.color-swatch`
- Optional label text below or beside
- Optional input/picker hidden until clicked

### Swatch Grid
```
<div class="color-swatch-grid">
  <div class="color-swatch-item">
    <div class="color-swatch"><!-- color --></div>
    <span class="color-swatch-label">BG</span>
  </div>
  <!-- More swatches -->
</div>
```

**Structure:**
- Container grid with multiple swatch items
- Each item is independently styled
- Labels abbreviated or full text
- Can be arranged 2-column, 3-column, or 1-column

## Token Usage

- **Standard size**: 16px × 16px square
- **Large size**: 32px × 32px square
- **Edit size**: 24px × 24px square
- **Border**: 1px solid --border (#e8e6e3)
- **Border radius**: 2px
- **Label font**: 11px monospace
- **Label color**: `--color-muted` (#777777)
- **Gap**: 4px between swatch and label
- **Spacing**: 8px between swatch items in grid
- **Cursor**: `pointer` on clickable swatches

## HTML Example

### Single Swatch
```html
<div class="color-swatch-item">
  <div class="color-swatch" style="background-color: #fefefe;">
    <!-- Color display -->
  </div>
  <span class="color-swatch-label">Background</span>
</div>
```

### Swatch Grid (Theme Colors)
```html
<div class="color-swatch-grid">
  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #fefefe;"></div>
    <span class="color-swatch-label">Background</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #181716;"></div>
    <span class="color-swatch-label">Foreground</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #E8915A;"></div>
    <span class="color-swatch-label">Accent</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #777777;"></div>
    <span class="color-swatch-label">Muted</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #e8e6e3;"></div>
    <span class="color-swatch-label">Border</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #16a34a;"></div>
    <span class="color-swatch-label">Success</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #f59e0b;"></div>
    <span class="color-swatch-label">Warning</span>
  </div>

  <div class="color-swatch-item">
    <div class="color-swatch" style="background-color: #dc2626;"></div>
    <span class="color-swatch-label">Danger</span>
  </div>
</div>
```

### Theme List with Swatches
```html
<div class="themes-list">
  <button class="theme-item theme-item-active">
    <span class="theme-swatch" style="background-color: #fefefe;"></span>
    <span class="theme-name">Light</span>
  </button>

  <button class="theme-item">
    <span class="theme-swatch" style="background-color: #181716;"></span>
    <span class="theme-name">Dark</span>
  </button>

  <button class="theme-item">
    <span class="theme-swatch" style="background-color: #e8e6e3;"></span>
    <span class="theme-name">Neutral</span>
  </button>
</div>
```

### Editable Swatch Grid
```html
<div class="color-swatch-grid color-swatch-grid-editable">
  <div class="color-swatch-item">
    <button
      class="color-swatch color-swatch-editable"
      style="background-color: #fefefe;"
      title="Click to edit background color"
      aria-label="Edit background color"
      data-color-key="background"
    >
      <!-- Clickable swatch -->
    </button>
    <span class="color-swatch-label">Background</span>
    <input
      type="color"
      class="color-swatch-picker"
      value="#fefefe"
      style="display: none;"
    />
  </div>
  <!-- More editable swatches -->
</div>
```

## CSS Example

```css
.color-swatch-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border);
  border-radius: 2px;
  flex-shrink: 0;
}

.color-swatch-label {
  font-family: var(--font-family-mono);
  font-size: 11px;
  color: var(--color-muted);
  text-align: center;
  line-height: 1.2;
  max-width: 60px;
  word-wrap: break-word;
}

/* Swatch Grid */
.color-swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 12px;
  padding: 12px;
}

@media (max-width: 600px) {
  .color-swatch-grid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 8px;
  }
}

/* Large swatches */
.color-swatch-large {
  width: 32px;
  height: 32px;
}

.color-swatch-item.color-swatch-item-large {
  gap: 6px;
}

.color-swatch-item.color-swatch-item-large .color-swatch-label {
  font-size: 12px;
}

/* Editable swatches */
.color-swatch-editable {
  cursor: pointer;
  transition: all 0.15s ease;
}

.color-swatch-editable:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.color-swatch-editable:active {
  transform: scale(0.95);
}

.color-swatch-picker {
  display: none;
  cursor: pointer;
}

/* Theme list swatches */
.theme-swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid var(--border);
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: 6px;
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
}

.theme-item:hover {
  background-color: var(--hover-bg);
}

.theme-item-active {
  background-color: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
}

.theme-item-active .theme-swatch {
  border-color: rgba(255, 255, 255, 0.5);
}

.theme-name {
  font-family: var(--font-family-mono);
  font-size: 13px;
  flex: 1;
  text-align: left;
}

/* Multiple columns for theme editor */
.color-swatch-grid-wide {
  grid-template-columns: repeat(3, 1fr);
}
```

## JSX Example

```jsx
// Color Swatch Component
const ColorSwatch = ({
  color,
  label,
  size = 'sm',
  editable = false,
  onColorChange,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const sizeClass = {
    sm: 'color-swatch',
    md: 'color-swatch color-swatch-md',
    lg: 'color-swatch color-swatch-large',
  }[size];

  const handleSwatchClick = () => {
    if (editable) {
      pickerRef.current?.click();
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    onColorChange?.(newColor);
  };

  return (
    <div className="color-swatch-item">
      <div
        className={editable ? `${sizeClass} color-swatch-editable` : sizeClass}
        style={{ backgroundColor: color }}
        onClick={handleSwatchClick}
        title={editable ? 'Click to edit color' : undefined}
      />
      {label && <span className="color-swatch-label">{label}</span>}
      {editable && (
        <input
          ref={pickerRef}
          type="color"
          value={color}
          onChange={handleColorChange}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

// Theme Color Grid
const ThemeColorGrid = ({ theme, onColorChange }) => {
  const colors = [
    { key: 'background', label: 'Background', value: theme.background },
    { key: 'foreground', label: 'Foreground', value: theme.foreground },
    { key: 'accent', label: 'Accent', value: theme.accent },
    { key: 'muted', label: 'Muted', value: theme.muted },
    { key: 'border', label: 'Border', value: theme.border },
    { key: 'success', label: 'Success', value: theme.success },
    { key: 'warning', label: 'Warning', value: theme.warning },
    { key: 'danger', label: 'Danger', value: theme.danger },
  ];

  return (
    <div className="color-swatch-grid">
      {colors.map((colorDef) => (
        <ColorSwatch
          key={colorDef.key}
          color={colorDef.value}
          label={colorDef.label}
          editable={true}
          onColorChange={(newColor) => onColorChange(colorDef.key, newColor)}
        />
      ))}
    </div>
  );
};

// Theme List with Swatches
const ThemeList = ({ themes, selectedTheme, onThemeSelect }) => {
  return (
    <div className="themes-list">
      {themes.map((theme) => (
        <button
          key={theme.id}
          className={`theme-item ${selectedTheme.id === theme.id ? 'theme-item-active' : ''}`}
          onClick={() => onThemeSelect(theme)}
        >
          <span
            className="theme-swatch"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <span className="theme-name">{theme.name}</span>
        </button>
      ))}
    </div>
  );
};

// Usage Example
const ThemeEditor = () => {
  const [currentTheme, setCurrentTheme] = useState({
    background: '#fefefe',
    foreground: '#181716',
    accent: '#E8915A',
    muted: '#777777',
    border: '#e8e6e3',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#dc2626',
  });

  const handleColorChange = (colorKey, newColor) => {
    setCurrentTheme((prev) => ({
      ...prev,
      [colorKey]: newColor,
    }));
  };

  return (
    <div>
      <h2>Theme Colors</h2>
      <ThemeColorGrid theme={currentTheme} onColorChange={handleColorChange} />
    </div>
  );
};
```

## Do's and Don'ts

### Do
- Use small swatches (16px) by default
- Include descriptive labels for each color
- Place labels below or beside swatches
- Show actual color values without filters
- Use 1px subtle borders on swatches
- Keep swatch borders consistent (2px radius)
- Group related colors in grids
- Make swatches clickable only if editable
- Use monospace font for labels (11px)
- Provide clear visual feedback on hover/click

### Don't
- Use oversized swatches in compact views
- Hide color values or approximate colors
- Make swatches appear as buttons unless editable
- Use thick borders on swatches
- Display too many swatches in a single row
- Change swatch styling outside the defined variants
- Use colorful backgrounds behind swatches
- Forget to label swatches
- Mix label positions (keep consistent)
- Use swatches for status indicators (use status dots instead)

## Rules Specific to Color Swatches

1. **Standard size 16px**: Small square color patches are 16×16 pixels
2. **2px border radius**: Swatches have slightly rounded corners (2px radius)
3. **1px subtle border**: All swatches have 1px solid --border
4. **11px monospace labels**: Labels use 11px JetBrains Mono, --muted color
5. **4px gap**: Gap between swatch and label is 4px
6. **Grid layout**: Multiple swatches use CSS grid (3-column or flexible)
7. **8px item spacing**: Gap between swatch items in grid is 8px
8. **No shadow**: Swatches are flat, no drop shadows (except on editable hover)
9. **Exact color display**: Show the actual hex/RGB color value without filters
10. **Editable swatches scale**: Clickable swatches grow 10% on hover, shrink on click
11. **Color picker hidden**: Native color picker input is hidden, triggered by swatch click
12. **Consistent placement**: Labels always below or beside, not mixed
