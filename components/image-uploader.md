# Image Uploader

## Description

A file upload component for images, used for cover photos, moodboard entries, and album art. Features a dashed-border drop zone that accepts drag-and-drop or click-to-browse, with preview, progress, and replace/remove actions.

## When to Use

- **Cover images**: Blog post and wiki page cover photos
- **Moodboard entries**: Adding photos to a moodboard
- **Album art**: Editing metadata for music albums
- **Profile photos**: User avatar upload

Do not use for non-image files (documents, music). Use a standard file input for those.

## Variants

| State | Description |
|-------|-------------|
| **Empty** | Dashed border drop zone with icon and helper text |
| **Hover / Dragover** | Border changes to accent color, subtle tinted background |
| **Uploading** | Spinner with filename and percentage |
| **Preview** | Thumbnail with filename, size, Replace and Remove buttons |

## Anatomy

```html
<!-- Empty state -->
<div class="image-uploader">
  <svg class="image-uploader-icon"><!-- image icon --></svg>
  <span class="image-uploader-text">Drop image here or click to browse</span>
  <span class="image-uploader-hint">PNG, JPG, WebP · Max 5 MB</span>
  <input type="file" class="image-uploader-input" accept="image/*" />
</div>

<!-- Preview state -->
<div class="image-uploader-preview">
  <img class="image-uploader-thumb" src="..." />
  <div class="image-uploader-meta">
    <span class="image-uploader-filename">cover.webp · 245 KB</span>
    <button class="image-uploader-replace">Replace</button>
    <button class="image-uploader-remove">Remove</button>
  </div>
</div>
```

## Token Usage

- **Drop zone border**: 2px dashed var(--border)
- **Drop zone border (hover)**: 2px dashed var(--accent)
- **Drop zone background (hover)**: color-mix(in srgb, var(--accent) 4%, var(--bg))
- **Drop zone padding**: 32px vertical
- **Drop zone border-radius**: 4px
- **Icon size**: 24px, color var(--muted)
- **Helper text**: 13px, color var(--muted)
- **Hint text**: 11px, color var(--muted)
- **Preview border**: 1px solid var(--border), border-radius 4px
- **Action buttons**: 11px, 1px border, 3px border-radius
- **Remove button**: color var(--danger)

## Processing

- Images are converted to WebP format on upload
- Thumbnails are generated client-side via canvas
- Uploaded to B2 (Backblaze) cloud storage
- Maximum file size: 5 MB

## Rules Specific to Image Uploader

1. **Dashed border**: Always 2px dashed, not solid
2. **Accent on hover**: Border and subtle bg tint change on hover/dragover
3. **Hidden file input**: Actual `<input type="file">` is visually hidden, triggered by click
4. **Preview replaces drop zone**: Once uploaded, drop zone is replaced by preview
5. **Replace and Remove**: Two actions below the preview thumbnail
6. **WebP conversion**: All uploads are converted to WebP automatically
7. **Spinner during upload**: Use the standard Dirigible spinner (3px border, transparent top)
