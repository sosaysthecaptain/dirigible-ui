# Modal

## Description

A full-screen overlay container used for important user interactions that require focused attention. Modals present content in a centered white card above a semi-transparent dark backdrop. Common uses include file selection, theme customization, sync settings, and confirmation dialogs.

## When to Use

- **Focused dialogs**: Actions that require full user attention (sync to folder, import backup)
- **Theme/configuration panels**: Multi-step or complex settings (themes modal with preview)
- **Confirmations**: Destructive actions or important yes/no decisions
- **File selection**: Browse and choose folders or files
- **Data entry**: Multi-field forms that need isolation from the main UI

Do not use modals for simple notifications; use toasts instead.

## Variants

| Type | Content Structure | Max Width | Examples |
|------|------------------|-----------|----------|
| **Simple Dialog** | Title + description + footer buttons | 400-500px | "Import from backup", "Choose folder" |
| **Multi-column Layout** | Divided sections side-by-side | 90% viewport | Themes modal (list \| preview \| elements) |
| **Form Modal** | Input fields + footer buttons | 500px | Settings, configuration modals |

## Anatomy

```
<div class="modal-backdrop">
  <div class="modal-card">
    <div class="modal-header">
      <div class="modal-title-wrapper">
        [Optional Icon]
        <h2 class="modal-title">Modal Title</h2>
      </div>
      <button class="modal-close" aria-label="Close modal">×</button>
    </div>

    <div class="modal-body">
      [Content: text, lists, inputs, etc.]
    </div>

    <div class="modal-footer">
      <button class="btn btn-text">Secondary action</button>
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Primary action</button>
    </div>
  </div>
</div>
```

**Structure:**
- Full-screen `.modal-backdrop` with semi-transparent overlay
- Centered `.modal-card` containing the modal content
- `.modal-header`: Optional icon + bold title + close button (top-right)
- `.modal-body`: Main content area with consistent padding
- `.modal-footer`: Right-aligned button group with actions

## Token Usage

- **Backdrop**: `rgba(0, 0, 0, 0.5)` semi-transparent dark overlay
- **Card background**: `--background` (#fefefe light / #181716 dark)
- **Card border radius**: `8px`
- **Card shadow**: `0 10px 40px rgba(0, 0, 0, 0.2)`
- **Title font**: 13px monospace, bold weight (700), `--foreground`
- **Body padding**: `16px`
- **Footer padding**: `16px`, top border `1px solid --border`
- **Button layout**: Right-aligned, gap `8px` between buttons
- **Z-index**: `1000` (ensure modal is above all other content)

## HTML Example

### Simple Dialog Modal
```html
<div class="modal-backdrop">
  <div class="modal-card">
    <div class="modal-header">
      <div class="modal-title-wrapper">
        <svg class="modal-icon" width="20" height="20" viewBox="0 0 20 20">
          <!-- Cloud download icon -->
        </svg>
        <h2 class="modal-title">Sync to Local Folder</h2>
      </div>
      <button class="modal-close" aria-label="Close modal">×</button>
    </div>

    <div class="modal-body">
      <p>Download your Dirigible library to a local folder for backup and offline access.</p>
      <ul>
        <li>Creates a .dirigible folder with all notes and metadata</li>
        <li>Syncs only on demand—no continuous syncing</li>
        <li>Choose any folder: Desktop, Documents, external drive</li>
      </ul>
    </div>

    <div class="modal-footer">
      <button class="btn btn-text">Import from backup</button>
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Choose folder</button>
    </div>
  </div>
</div>
```

### Multi-column Themes Modal
```html
<div class="modal-backdrop">
  <div class="modal-card modal-card-wide">
    <div class="modal-header">
      <div class="modal-title-wrapper">
        <svg class="modal-icon" width="20" height="20" viewBox="0 0 20 20">
          <!-- Settings/themes icon -->
        </svg>
        <h2 class="modal-title">Themes</h2>
      </div>
      <button class="modal-close" aria-label="Close modal">×</button>
    </div>

    <div class="modal-body modal-body-grid">
      <!-- Left column: theme list -->
      <div class="themes-list">
        <button class="theme-item theme-item-active">
          <span class="theme-swatch" style="background: #fefefe;"></span>
          Light
        </button>
        <button class="theme-item">
          <span class="theme-swatch" style="background: #181716;"></span>
          Dark
        </button>
      </div>

      <!-- Middle column: preview -->
      <div class="themes-preview">
        <!-- Preview of selected theme -->
      </div>

      <!-- Right column: color elements -->
      <div class="themes-colors">
        <div class="color-swatch-group">
          <!-- Color swatches for current theme -->
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Apply theme</button>
    </div>
  </div>
</div>
```

### Form Modal
```html
<div class="modal-backdrop">
  <div class="modal-card">
    <div class="modal-header">
      <h2 class="modal-title">Settings</h2>
      <button class="modal-close" aria-label="Close modal">×</button>
    </div>

    <div class="modal-body">
      <div class="input-wrapper">
        <label class="input-label">Library Name</label>
        <input type="text" class="input" placeholder="My Library" />
      </div>

      <div class="input-wrapper">
        <label class="input-label">Author</label>
        <input type="text" class="input" placeholder="Your name" />
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Save settings</button>
    </div>
  </div>
</div>
```

## CSS Example

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background-color: var(--background);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-card-wide {
  max-width: 90vw;
  aspect-ratio: 16 / 9;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-bottom: 1px solid var(--border);
}

.modal-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-icon {
  width: 20px;
  height: 20px;
  color: var(--foreground);
  flex-shrink: 0;
}

.modal-title {
  font-family: var(--font-family-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
  line-height: 1.4;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--color-muted);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
}

.modal-close:hover {
  color: var(--foreground);
}

.modal-body {
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}

.modal-body-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 16px;
  padding: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

.modal-footer .btn-text {
  margin-right: auto;
}

/* Animation */
@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-backdrop {
  animation: modal-fade-in 0.15s ease;
}

.modal-card {
  animation: modal-scale-in 0.15s ease;
}
```

## JSX Example

```jsx
// Simple Modal with State Management
const [isOpen, setIsOpen] = useState(false);

const handleOpenModal = () => setIsOpen(true);
const handleCloseModal = () => setIsOpen(false);
const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    handleCloseModal();
  }
};

// Close on Escape key
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen) {
      handleCloseModal();
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [isOpen]);

{isOpen && (
  <div className="modal-backdrop" onClick={handleBackdropClick}>
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-title-wrapper">
          <SyncIcon className="modal-icon" />
          <h2 className="modal-title">Sync to Local Folder</h2>
        </div>
        <button
          className="modal-close"
          aria-label="Close modal"
          onClick={handleCloseModal}
        >
          ×
        </button>
      </div>

      <div className="modal-body">
        <p>Download your Dirigible library to a local folder for backup and offline access.</p>
        <ul>
          <li>Creates a .dirigible folder with all notes and metadata</li>
          <li>Syncs only on demand—no continuous syncing</li>
          <li>Choose any folder: Desktop, Documents, external drive</li>
        </ul>
      </div>

      <div className="modal-footer">
        <button className="btn btn-text" onClick={handleImportBackup}>
          Import from backup
        </button>
        <button className="btn btn-secondary" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleChooseFolder}>
          Choose folder
        </button>
      </div>
    </div>
  </div>
)}

// Themes Modal with Tab-like Sections
const [selectedTheme, setSelectedTheme] = useState('light');

{isOpen && (
  <div className="modal-backdrop" onClick={handleBackdropClick}>
    <div className="modal-card modal-card-wide">
      <div className="modal-header">
        <div className="modal-title-wrapper">
          <SettingsIcon className="modal-icon" />
          <h2 className="modal-title">Themes</h2>
        </div>
        <button className="modal-close" onClick={handleCloseModal}>
          ×
        </button>
      </div>

      <div className="modal-body modal-body-grid">
        <div className="themes-list">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-item ${selectedTheme === theme.id ? 'theme-item-active' : ''}`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <span
                className="theme-swatch"
                style={{ backgroundColor: theme.primaryColor }}
              />
              {theme.name}
            </button>
          ))}
        </div>

        <ThemePreview theme={themes.find((t) => t.id === selectedTheme)} />

        <div className="themes-colors">
          <ColorSwatchGroup theme={themes.find((t) => t.id === selectedTheme)} />
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => applyTheme(selectedTheme)}>
          Apply theme
        </button>
      </div>
    </div>
  </div>
)}
```

## Do's and Don'ts

### Do
- Center the modal card on the screen using flexbox
- Use a semi-transparent dark backdrop (rgba(0, 0, 0, 0.5))
- Place the close button (×) in the top-right corner
- Include a title in the modal header with optional icon
- Right-align footer buttons with "Cancel" on the left, primary action on the right
- Close the modal on Escape key press
- Close the modal on backdrop click
- Use appropriate icons in the header (cloud icon for sync, settings icon for themes)
- Limit max-width to keep content readable (400-500px for simple dialogs)
- Prevent body scrolling when a modal is open

### Don't
- Use modals for simple notifications or confirmations that could be toasts
- Place modals without a backdrop
- Left-align buttons in the footer (always right-align)
- Use modals for navigation or page transitions
- Create modals without a clear close mechanism
- Forget to handle the Escape key for closing
- Use multiple nested modals (stack them sequentially)
- Place unrelated actions in the same modal
- Make modal content scrollable within the footer area
- Use decorative icons that don't relate to the modal purpose

## Rules Specific to Modals

1. **Full-screen backdrop**: Modal backdrop covers the entire viewport and is fixed positioned
2. **Centered card**: Modal card is centered both horizontally and vertically on the screen
3. **Z-index 1000**: Ensures modal appears above all other page elements
4. **Close on Escape**: Modal closes when user presses Escape key
5. **Close on backdrop click**: Clicking the semi-transparent backdrop closes the modal
6. **Close button (×)**: Always present in the top-right corner of the header
7. **Title in header**: Every modal has a clear, bold title (monospace 13px font-weight 700)
8. **Right-aligned footer**: Footer buttons are right-aligned; text buttons appear on the left
9. **Subtle top border on footer**: A thin 1px border separates the body from footer
10. **Max-width limits**: Simple dialogs max 500px, complex layouts max 90vw
11. **No overflow hidden**: Body should be scrollable if content exceeds viewport height
12. **Smooth animations**: Modal appears with fade-in and slight scale animation (0.15s)
