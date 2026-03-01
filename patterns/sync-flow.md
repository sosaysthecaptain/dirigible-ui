# Sync Flow

## Description

How Dirigible syncs content to a local folder on the user's computer. The sync feature enables users to back up their entire library, work offline, or integrate with external tools.

## Sync Flow

### Step 1: Initiate Sync

User clicks the cloud download icon (↓) in the sidebar bottom bar.

**Icon location:** Bottom right of sidebar, next to theme and settings controls.

### Step 2: Sync Modal Opens

A modal window appears with the following content:

**Modal Header:**
- Icon: Cloud with download arrow
- Title: "Sync to Local Folder"

**Modal Body:**

Description paragraph:
> "Export your Dirigible library to a folder on your computer."

Bullet list explaining what gets synced:
- Notes are saved as .md (Markdown) files
- Albums are saved as folders of images + metadata
- Music libraries keep their artist/album structure
- Documents (PDF/EPUB) are downloaded as-is
- Subsequent syncs only update what changed

**Modal Footer:**

Three buttons:
1. "Import from backup" (text link) — allows restoring from a previous sync
2. "Cancel" (secondary button) — close without syncing
3. "Choose folder" (primary button) — opens file picker to select destination

### Step 3: Select Destination Folder

User clicks "Choose folder" button → native file picker opens.

**File Picker Behavior:**
- Starts in home directory or last-used directory
- User selects an empty folder (or Dirigible creates one)
- Folder path is confirmed

### Step 4: Sync Begins

Once folder is selected, sync starts immediately.

**Progress Indicator:**
- A dismissible toast appears at the bottom of the screen
- Shows: progress bar, item count (e.g., "Syncing 247 items...")
- Progress bar fills from left to right
- Bar uses `--accent` color

**During Sync:**
- User can continue using Dirigible
- Cannot cancel mid-sync
- Other modals are disabled

### Step 5: Sync Completes

When sync finishes:

**Success Toast:**
- Message: "Synced X items to /path/to/folder"
- Icon: Checkmark in `--success` color
- Auto-dismisses after 4 seconds
- User can click to dismiss earlier

### Step 6: Subsequent Syncs

The next time user syncs:
- If the same folder is used, it shows "Syncing X new/updated items"
- Only changed files are transferred (incremental sync)
- Much faster than initial sync

**Resuming Sync:**
- If Dirigible is closed during sync, next sync continues from where it left off
- "Import from backup" link allows recovering from previous syncs

## Components Involved

- **Modal** (sync container with centered layout)
- **Button** (primary: Choose folder, secondary: Cancel, text: Import from backup)
- **Toast** (progress indicator and success notification)
- **Progress Bar** (visual sync progress)
- **Icon** (cloud with download arrow)
- **File Picker** (native OS file selection)

## Design Details

### Sync Modal Structure

```html
<div class="modal modal-sync" role="dialog" aria-labelledby="sync-title">
  <div class="modal-header">
    <svg class="modal-icon" width="24" height="24" viewBox="0 0 24 24">
      <!-- Cloud with download arrow -->
      <path d="M19 13v6H5v-6M12 5v8M9 10l3 3 3-3" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
    <h1 id="sync-title" class="modal-title">Sync to Local Folder</h1>
  </div>

  <div class="modal-body">
    <p class="modal-description">Export your Dirigible library to a folder on your computer.</p>

    <ul class="sync-details">
      <li>Notes are saved as <code>.md</code> (Markdown) files</li>
      <li>Albums are saved as folders of images + metadata</li>
      <li>Music libraries keep their artist/album structure</li>
      <li>Documents (PDF/EPUB) are downloaded as-is</li>
      <li>Subsequent syncs only update what changed</li>
    </ul>
  </div>

  <div class="modal-footer">
    <button class="btn btn-text" data-action="import-backup">
      Import from backup
    </button>

    <div class="modal-actions">
      <button class="btn btn-secondary" data-action="cancel">
        Cancel
      </button>
      <button class="btn btn-primary" data-action="choose-folder">
        Choose folder
      </button>
    </div>
  </div>
</div>
```

### Sync Modal CSS

```css
.modal-sync {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background);
  border: 2px solid var(--border);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  z-index: 200;
  max-width: 480px;
  width: 90vw;
  max-height: 80vh;
  border-radius: 0;
  overflow: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-bottom: 2px solid var(--border);
}

.modal-icon {
  color: var(--accent);
  flex-shrink: 0;
}

.modal-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--foreground);
  margin: 0;
}

.modal-body {
  padding: 24px;
}

.modal-description {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--foreground);
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.sync-details {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}

.sync-details li {
  position: relative;
  padding-left: 20px;
}

.sync-details li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.sync-details code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  background: var(--code-bg);
  color: var(--code-fg);
  padding: 2px 6px;
  border-radius: 0;
}

.modal-footer {
  padding: 24px;
  border-top: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions .btn {
  min-width: 120px;
}

.btn-text {
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  text-decoration: underline;
  padding: 0;
  transition: color 150ms ease-out;
}

.btn-text:hover {
  color: var(--foreground);
}
```

### Progress Toast

```html
<div class="toast toast-progress" role="status" aria-live="polite">
  <div class="toast-content">
    <span class="toast-message">Syncing 247 items...</span>
  </div>

  <div class="toast-progress-bar">
    <div class="progress-fill" style="width: 42%"></div>
  </div>
</div>
```

### Progress Toast CSS

```css
.toast-progress {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--background);
  border: 2px solid var(--border);
  border-radius: 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  overflow: hidden;
  z-index: 150;
}

.toast-content {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-message {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--foreground);
}

.toast-progress-bar {
  height: 4px;
  background: var(--border);
  width: 100%;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 300ms ease-out;
  display: block;
}
```

### Success Toast

```html
<div class="toast toast-success" role="status" aria-live="polite">
  <div class="toast-content">
    <svg class="toast-icon" width="20" height="20" viewBox="0 0 20 20">
      <path d="M2 10l5 5L18 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="toast-message">Synced 247 items to ~/Dirigible</span>
  </div>
</div>
```

### Success Toast CSS

```css
.toast-success {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--background);
  border: 2px solid var(--success);
  border-radius: 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  padding: 16px 20px;
  z-index: 150;
  animation: slideIn 300ms ease-out;
}

.toast-success .toast-icon {
  color: var(--success);
  flex-shrink: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-success {
  animation: slideIn 300ms ease-out, slideOut 300ms ease-out 3.7s forwards;
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

## User Flow Diagram

```
Click cloud ↓ icon in sidebar
    ↓
Sync Modal Opens
    ├─ Title: "Sync to Local Folder"
    ├─ Description: "Export your library..."
    ├─ Details bullet list
    └─ Footer: Import / Cancel / Choose folder
    ↓
Click "Choose folder"
    ↓
Native File Picker Opens
    ├─ User selects or creates destination folder
    └─ Confirms selection
    ↓
Sync Begins
    ├─ Progress toast appears
    ├─ Shows "Syncing X items..."
    ├─ Progress bar fills (0% → 100%)
    └─ User can continue using app
    ↓
Sync Completes
    ├─ Success toast appears
    ├─ Shows "Synced X items to /path"
    ├─ Checkmark icon in green
    └─ Auto-dismisses after 4 seconds
    ↓
Next Sync (Same Folder)
    ├─ Shows "Syncing X new/updated items"
    ├─ Much faster (incremental)
    └─ Only changed files transferred
```

## Export Structure

When syncing to a local folder, the structure looks like:

```
Dirigible/
├── notes/
│   ├── my-first-note.md
│   ├── project-planning.md
│   └── ideas/
│       ├── feature-ideas.md
│       └── design-thoughts.md
├── albums/
│   ├── summer-2025/
│   │   ├── metadata.json
│   │   ├── photo-1.jpg
│   │   ├── photo-2.jpg
│   │   └── ...
│   └── travel/
│       ├── metadata.json
│       └── ...
├── music/
│   ├── Artists/
│   │   ├── Miles Davis/
│   │   │   └── Kind of Blue/
│   │   │       ├── metadata.json
│   │   │       ├── track-1.mp3
│   │   │       └── ...
│   │   └── ...
├── documents/
│   ├── manual.pdf
│   ├── guide.epub
│   └── ...
└── .dirigible-sync
    ├── last-sync.json
    └── sync-log.json
```

## Design Rules

1. **Sync modal is centered and modal** — prevents accidental interaction during sync setup.
2. **Progress toast is non-blocking** — user can continue working during sync.
3. **Progress bar is always visible** during sync — provides clear feedback.
4. **Success toast auto-dismisses** — no need for user to close it.
5. **File picker uses native OS dialog** — respects system conventions.
6. **Subsequent syncs are incremental** — significant performance improvement for updates.
7. **Sync can be resumed** — if app closes, next sync continues from checkpoint.
8. **Import from backup is accessible** — users can restore from previous syncs.
9. **Detailed bullet list explains what's included** — manages expectations about what gets synced.
10. **Cloud icon in sidebar bottom bar is consistent** with other utility controls (theme, settings).
