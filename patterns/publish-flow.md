# Publication Flow

## Description

How content gets published from Dirigible to the web. The publication flow is a streamlined process that takes notes from private to public in a few clicks, with a dedicated panel for managing publication settings.

## Publication Flow

### Step 1: Access Publication Settings

User opens a note and initiates the publication flow by:
- Clicking the green "Published" badge (if already published), or
- Clicking the kebab menu (⋮) and selecting "Publication"

### Step 2: Publication Panel Appears

A dropdown panel appears below the breadcrumb with the following fields:

**Panel Header:**
- Title: "PUBLICATION" in uppercase monospace
- Close button (X) to dismiss

**Panel Content:**

1. **Toggle: Include in site**
   - Label: "INCLUDE IN SITE"
   - Toggle switch with label on the right
   - On = note is publicly accessible
   - Off = note is private again

2. **URL Slug**
   - Label: "URL SLUG"
   - Read-only display of: `subdomain.dirigible.app/collection/slug`
   - Shows the public URL structure
   - User can edit the slug portion if needed

3. **Cover Image**
   - Label: "COVER IMAGE"
   - Upload area with dashed border
   - Text: "Upload cover image"
   - Used for post listings and social media previews

4. **Excerpt**
   - Label: "EXCERPT"
   - Textarea input
   - Description text for post listing pages
   - Secondary importance

5. **Copy URL Button**
   - Text button: "Copy URL"
   - Copies the public URL to clipboard
   - Shows success toast when clicked

**Panel Footer:**
- Primary button: "Save" (only shown if changes exist)
- Secondary button: "Cancel"

### Step 3: Toggle to Publish

When "Include in site" is toggled ON:
- Note becomes publicly accessible
- Green dot appears next to the note in the sidebar
- Green "Published" badge appears in the breadcrumb area
- URL becomes active and shareable

### Step 4: View Published

After publishing, user can:
- Click "Visit site" in the kebab menu to open the published page
- Click "Copy URL" to share the link
- The published URL follows the pattern: `username.dirigible.app/collection-slug/note-slug`

### Step 5: Unpublish

Toggle "Include in site" OFF to:
- Make the note private again
- Green dot disappears from sidebar
- Green badge disappears from breadcrumb
- URL is no longer accessible to the public

## Components Involved

- **Toggle** (Include in site switch)
- **Input** (URL slug, excerpt)
- **Upload Area** (cover image)
- **Badge** (Published status indicator)
- **Popover/Panel** (publication settings container)
- **Button** (primary: Save, secondary: Copy URL)
- **Toast** (copy success notification)

## Design Details

### Publication Panel Structure

```html
<div class="publication-panel">
  <div class="panel-header">
    <h2 class="panel-title">PUBLICATION</h2>
    <button class="panel-close" aria-label="Close">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="2" />
        <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" stroke-width="2" />
      </svg>
    </button>
  </div>

  <form class="panel-form">
    <!-- Toggle: Include in Site -->
    <div class="form-group form-toggle">
      <label class="toggle-label">
        <input type="checkbox" class="toggle-switch" id="include-in-site" />
        <span class="toggle-track">
          <span class="toggle-thumb"></span>
        </span>
        <span class="toggle-text">INCLUDE IN SITE</span>
      </label>
    </div>

    <!-- URL Slug -->
    <div class="form-group" id="url-slug-group" hidden>
      <label for="url-slug" class="form-label">URL SLUG</label>
      <div class="url-slug-display">
        <code class="url-slug-prefix">username.dirigible.app/collection/</code>
        <input id="url-slug" type="text" class="form-input url-slug-input" value="note-slug" />
      </div>
    </div>

    <!-- Cover Image -->
    <div class="form-group" id="cover-image-group" hidden>
      <label for="cover-image" class="form-label">COVER IMAGE</label>
      <div class="upload-area">
        <input id="cover-image" type="file" class="upload-input" accept="image/*" />
        <div class="upload-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span>Upload cover image</span>
        </div>
      </div>
    </div>

    <!-- Excerpt -->
    <div class="form-group" id="excerpt-group" hidden>
      <label for="excerpt" class="form-label">EXCERPT</label>
      <textarea id="excerpt" class="form-input" rows="3" placeholder="Brief description for post listings"></textarea>
    </div>

    <!-- Copy URL Button -->
    <div class="form-group form-actions" id="copy-url-group" hidden>
      <button type="button" class="btn btn-text" data-action="copy-url">
        Copy URL
      </button>
    </div>
  </form>

  <div class="panel-footer">
    <button type="button" class="btn btn-secondary">Cancel</button>
    <button type="submit" class="btn btn-primary">Save</button>
  </div>
</div>
```

### Publication Panel CSS

```css
.publication-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--background);
  border: 2px solid var(--border);
  border-top: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  max-width: 400px;
  margin-left: 16px;
  margin-right: 16px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 2px solid var(--border);
}

.panel-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--foreground);
  margin: 0;
}

.panel-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: 2px solid var(--border);
  color: var(--foreground);
  cursor: pointer;
  border-radius: 0;
  transition: all 150ms ease-out;
}

.panel-close:hover {
  border-color: var(--accent);
  background: var(--hover);
}

.panel-form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.url-slug-display {
  display: flex;
  align-items: center;
  gap: 0;
  border: 2px solid var(--border);
  background: var(--editor-bg);
  border-radius: 0;
  overflow: hidden;
}

.url-slug-prefix {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--muted);
  padding: 8px 12px;
  background: var(--hover);
  border-right: 2px solid var(--border);
  white-space: nowrap;
  flex-shrink: 0;
}

.url-slug-input {
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  background: var(--editor-bg);
  color: var(--foreground);
}

.url-slug-input:focus {
  outline: none;
  background: var(--hover);
}

.panel-footer {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 2px solid var(--border);
  justify-content: flex-end;
}

.panel-footer .btn {
  min-width: 80px;
}
```

### Published Badge Styles

```css
.badge-published {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--success);
  color: var(--background);
  padding: 4px 12px;
  border-radius: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 12px;
}

.badge-published::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.sidebar-item.is-published::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--success);
  border-radius: 50%;
  margin-left: 4px;
  flex-shrink: 0;
}
```

## User Flow Diagram

```
Open Note
    ↓
Click "Published" badge OR kebab → Publication
    ↓
Publication Panel Appears
    ├─ Toggle: "Include in site" (OFF)
    ├─ URL Slug (hidden until ON)
    ├─ Cover Image (hidden until ON)
    └─ Excerpt (hidden until ON)
    ↓
Toggle "Include in site" ON
    ↓
Fields Become Visible & Editable
    ├─ Enter custom URL slug
    ├─ Upload cover image
    └─ Write excerpt
    ↓
Click "Save"
    ↓
Note is Published
    ├─ Green dot appears in sidebar
    ├─ Green "Published" badge in breadcrumb
    ├─ Public URL is now active
    └─ User can "Visit site" or "Copy URL"
```

## Published URL Patterns

```
User can access the published note at:
https://username.dirigible.app/collection-slug/note-slug

Examples:
https://sarah.dirigible.app/design-notes/button-states
https://alex.dirigible.app/music-library/jazz-albums
https://jane.dirigible.app/receipts/coffee-shops
```

## Design Rules

1. **Publication panel is a dropdown below the breadcrumb**, not a modal.
2. **Fields only appear when "Include in site" is ON** to minimize cognitive load.
3. **URL slug is always shown as a read-only prefix + editable portion** for clarity.
4. **Green success color is used for the "Published" badge and published indicators**.
5. **Cover image upload area uses a dashed border** to distinguish it as special.
6. **"Copy URL" button provides immediate feedback** with a success toast.
7. **Save button only appears if changes exist** to prevent accidental double-saves.
8. **Published notes show a green dot in the sidebar** for quick visual identification.
9. **The public URL structure is always visible** so users understand what they're sharing.
10. **Publication settings can be accessed and modified anytime** without leaving the note.
