# Toast

## Description

Non-modal notifications that appear temporarily or persistently in the bottom-right corner of the viewport. Toasts provide feedback for background operations, confirmations, errors, and other transient messages without interrupting the user's work.

## When to Use

- **Progress updates**: Show status during sync, export, import operations with progress bar
- **Success confirmations**: Briefly notify user of completed action
- **Error notifications**: Display error messages that persist until dismissed
- **Async operations**: Inform user of background operations (file uploads, API calls)
- **Quick feedback**: Non-modal alerts that don't require immediate action

Do not use toasts for critical errors or actions requiring user input; use modals instead.

## Variants

| Type | Background | Icon | Behavior | Use |
|------|-----------|------|----------|-----|
| **Progress** | --border or neutral | Spinner | Persistent with bar | Sync, export, import operations |
| **Success** | --success (green) | Checkmark | Auto-dismiss ~3s | Action completed successfully |
| **Error** | --danger (red) | Alert icon | Persistent | Operation failed, requires attention |
| **Info** | --accent or neutral | Info icon | Auto-dismiss | Informational message |

## Anatomy

```
<div class="toast-container">
  <div class="toast toast-progress" role="status" aria-live="polite">
    <div class="toast-header">
      <span class="toast-spinner"></span>
      <span class="toast-title">Syncing library...</span>
    </div>
    <div class="toast-progress-bar">
      <div class="toast-progress-fill" style="width: 65%;"></div>
    </div>
  </div>

  <div class="toast toast-success" role="status" aria-live="polite">
    <svg class="toast-icon"><!-- checkmark --></svg>
    <span class="toast-message">Export completed successfully</span>
    <button class="toast-close" aria-label="Close notification">×</button>
  </div>

  <div class="toast toast-error" role="status" aria-live="assertive">
    <svg class="toast-icon"><!-- alert icon --></svg>
    <span class="toast-message">Failed to sync: connection timeout</span>
    <button class="toast-close" aria-label="Close notification">×</button>
  </div>
</div>
```

**Structure:**
- Container `.toast-container` positioned fixed bottom-right
- Individual `.toast` elements for each notification
- `.toast-title` or `.toast-message` for content
- Optional `.toast-icon` (spinner for progress, checkmark for success, etc.)
- Optional `.toast-progress-bar` for progress toast
- Optional `.toast-close` button for dismissible toasts
- Stacking toasts upward with gap between them

## Token Usage

- **Container position**: Fixed, bottom-right (12px from edges)
- **Toast background**: White or --background
- **Toast border**: 1px solid --border
- **Toast border radius**: 6px
- **Toast shadow**: `0 2px 8px rgba(0, 0, 0, 0.1)`
- **Toast padding**: 12px
- **Toast gap**: 8px (stacking)
- **Font**: 13px monospace
- **Colors**:
  - Success: `--success` (#16a34a green)
  - Error: `--danger` (#dc2626 red)
  - Info: `--accent` (#E8915A orange) or neutral
- **Icon size**: 16px
- **Progress bar height**: 4px
- **Progress bar background**: --border
- **Progress bar fill**: --accent
- **Close button**: Monospace ×, 20px

## HTML Example

### Progress Toast
```html
<div class="toast toast-progress" role="status" aria-live="polite">
  <div class="toast-header">
    <div class="toast-spinner"></div>
    <span class="toast-title">Syncing library to folder...</span>
  </div>
  <div class="toast-progress-bar">
    <div class="toast-progress-fill" style="width: 65%;"></div>
  </div>
</div>
```

### Success Toast
```html
<div class="toast toast-success" role="status" aria-live="polite">
  <svg class="toast-icon" width="16" height="16" viewBox="0 0 16 16">
    <polyline
      points="2,8 6,12 14,4"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <span class="toast-message">Library exported successfully</span>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Error Toast
```html
<div class="toast toast-error" role="status" aria-live="assertive">
  <svg class="toast-icon" width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="8" y="10" text-anchor="middle" font-size="12" font-weight="bold">!</text>
  </svg>
  <span class="toast-message">Failed to sync: connection timeout</span>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Info Toast
```html
<div class="toast toast-info" role="status" aria-live="polite">
  <svg class="toast-icon" width="16" height="16" viewBox="0 0 16 16">
    <!-- Info icon -->
  </svg>
  <span class="toast-message">3 new notes added to library</span>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

## CSS Example

```css
.toast-container {
  position: fixed;
  bottom: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2000;
  max-width: 400px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: var(--font-family-mono);
  font-size: 13px;
  color: var(--foreground);
  pointer-events: auto;
  animation: toast-slide-in 0.2s ease-out;
  max-width: 400px;
}

.toast-progress {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 12px;
}

.toast-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.toast-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.toast-title {
  flex: 1;
  color: var(--foreground);
}

.toast-progress-bar {
  width: 100%;
  height: 4px;
  background-color: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.toast-progress-fill {
  height: 100%;
  background-color: var(--accent);
  transition: width 0.3s ease;
}

.toast-success {
  background-color: rgba(22, 163, 74, 0.1);
  border-color: var(--success);
}

.toast-success .toast-icon {
  color: var(--success);
}

.toast-error {
  background-color: rgba(220, 38, 38, 0.1);
  border-color: var(--danger);
}

.toast-error .toast-icon {
  color: var(--danger);
}

.toast-info {
  background-color: rgba(232, 145, 90, 0.1);
  border-color: var(--accent);
}

.toast-info .toast-icon {
  color: var(--accent);
}

.toast-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  stroke-width: 2px;
}

.toast-message {
  flex: 1;
  color: var(--foreground);
}

.toast-close {
  padding: 0;
  margin-left: 8px;
  background: none;
  border: none;
  color: var(--color-muted);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.15s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  color: var(--foreground);
}

/* Animations */
@keyframes toast-slide-in {
  from {
    transform: translateX(420px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-fade-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(420px);
    opacity: 0;
  }
}

.toast.toast-removing {
  animation: toast-fade-out 0.2s ease-out forwards;
}

/* Stacking multiple toasts */
.toast-container > .toast:nth-child(2) {
  max-width: 380px;
}

.toast-container > .toast:nth-child(3) {
  max-width: 360px;
}
```

## JSX Example

```jsx
// Toast Context and Provider
const ToastContext = createContext();

const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', options = {}) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type,
      progress: options.progress || 0,
      ...options,
    };

    setToasts((prev) => [...prev, toast]);

    // Auto-dismiss for success and info
    if (type === 'success' || type === 'info') {
      const timeout = setTimeout(
        () => removeToast(id),
        options.duration || 3000
      );
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateProgress = (id, progress) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, progress } : t))
    );
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, updateProgress }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => (
  <div className="toast-container">
    {toasts.map((toast) => (
      <Toast
        key={toast.id}
        {...toast}
        onRemove={() => onRemove(toast.id)}
      />
    ))}
  </div>
);

// Individual Toast Component
const Toast = ({ id, message, type, progress, onRemove }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckmarkIcon width="16" height="16" />;
      case 'error':
        return <AlertIcon width="16" height="16" />;
      case 'info':
        return <InfoIcon width="16" height="16" />;
      default:
        return null;
    }
  };

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      {type === 'progress' ? (
        <>
          <div className="toast-header">
            <div className="toast-spinner"></div>
            <span className="toast-title">{message}</span>
          </div>
          <div className="toast-progress-bar">
            <div className="toast-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </>
      ) : (
        <>
          {getIcon() && <span className="toast-icon">{getIcon()}</span>}
          <span className="toast-message">{message}</span>
          {(type === 'success' || type === 'error') && (
            <button
              className="toast-close"
              aria-label="Close notification"
              onClick={onRemove}
            >
              ×
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Usage Example
const SyncButton = () => {
  const { addToast, updateProgress } = useToast();

  const handleSync = async () => {
    const toastId = addToast('Syncing library...', 'progress');

    try {
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        updateProgress(toastId, i);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      addToast('Library synced successfully', 'success');
    } catch (error) {
      addToast(`Failed to sync: ${error.message}`, 'error');
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSync}>
      Sync
    </button>
  );
};

// Export Example
const ExportButton = () => {
  const { addToast, updateProgress } = useToast();

  const handleExport = async () => {
    const toastId = addToast('Exporting library...', 'progress');

    try {
      const data = await exportLibrary((progress) => {
        updateProgress(toastId, Math.round(progress * 100));
      });

      addToast('Export completed successfully', 'success', {
        duration: 5000,
      });
    } catch (error) {
      addToast(`Export failed: ${error.message}`, 'error');
    }
  };

  return (
    <button className="btn btn-secondary" onClick={handleExport}>
      Export
    </button>
  );
};
```

## Do's and Don'ts

### Do
- Position toasts in the bottom-right corner
- Use progress toasts for long-running operations
- Auto-dismiss success toasts after ~3 seconds
- Keep error toasts persistent until dismissed
- Use appropriate icons for each toast type
- Include a close button (×) on dismissible toasts
- Animate toasts in from the right
- Stack multiple toasts vertically
- Use monospace font for all toast text
- Provide clear, concise messages

### Don't
- Use toasts for critical information requiring immediate action
- Cover important UI elements with toasts
- Use toasts for errors that prevent further use (use modals instead)
- Make toasts too wide (max ~400px)
- Use bright or distracting colors
- Stack more than 3-4 toasts at once
- Auto-dismiss error toasts
- Use toasts for form validation (use inline error messages)
- Forget to include role and aria-live attributes
- Leave toasts on-screen indefinitely without user action

## Rules Specific to Toasts

1. **Fixed position bottom-right**: Toasts appear in the lower-right corner, 12px from edges
2. **Stacking upward**: Multiple toasts stack vertically with 8px gap
3. **Auto-dismiss success**: Success toasts disappear after ~3 seconds
4. **Persistent errors**: Error toasts stay until user closes them
5. **Progress toasts are persistent**: Show progress bar and spinner, no auto-dismiss
6. **Slide-in animation**: Toasts slide in from the right in ~0.2s
7. **Monospace font**: All text is 13px JetBrains Mono
8. **Subtle shadow**: Use `0 2px 8px rgba(0,0,0,0.1)` for depth
9. **6px border radius**: Slightly rounded corners, not sharp
10. **Max width 400px**: Prevent toasts from being too wide
11. **Color-coded backgrounds**: Light tinted background matching type (success, error, info)
12. **Icons always present**: Success, error, and info toasts include appropriate icons
13. **Close button on non-progress**: Error and success toasts have × close button
14. **Z-index 2000**: Toasts appear above all other content
