# dirigible-ui

**[Browse the live site](https://sosaysthecaptain.github.io/dirigible-ui/)**

An agent-first UI framework. Standalone HTML specs with live demos — designed to be read by AI coding assistants and browsed by humans.

Every component is a single `.html` file containing CSS custom properties, live interactive demos with inline styles, spec tables, code examples, and usage rules. No build step. No dependencies. Point your AI at it and it builds UI that matches.

## Install

```bash
git submodule add https://github.com/sosaysthecaptain/dirigible-ui.git dirigible-ui
```

Then add to your project's `CLAUDE.md`:

```markdown
## Design System
Follow the design system in ./dirigible-ui/
Before creating or modifying any UI component, read the relevant
component and token files in ./dirigible-ui/tokens/ and ./dirigible-ui/components/.
Use CSS custom properties — never raw hex values.
```

Update to latest:

```bash
git submodule update --remote dirigible-ui
```

## How it works

Each `.html` file is both **human-browsable documentation** and **machine-readable specification**. Open any file in a browser to see live demos. Your AI reads the same file and extracts exact values: border widths, padding, font weights, hover behaviors, color tokens.

The AI doesn't interpret a design system — it reads one.

## What's in it

### Design Tokens

| Token | File | What it defines |
|-------|------|-----------------|
| **Colors** | `tokens/colors.html` | Warm neutral palette, light + dark themes, semantic tokens (`--accent`, `--danger`, `--muted`, etc.), syntax highlighting colors |
| **Typography** | `tokens/typography.html` | JetBrains Mono (primary), Crimson Pro (serif), IBM Plex Sans — type scale, line heights, weight rules |
| **Spacing** | `tokens/spacing.html` | 4px base grid (0–64px), border rules (2px interactive, 1px structural), radius scale, shadow tokens |

### Components

| Component | File | What it specifies |
|-----------|------|-------------------|
| **Badge** | `components/badge.html` | Status indicators — published, draft, synced, error. Pill-shaped with semantic colors |
| **Breadcrumb** | `components/breadcrumb.html` | Path navigation with clickable segments and trailing actions |
| **Button** | `components/button.html` | Primary (3px bold border), secondary, danger, ghost. Small variant. Hover states with opacity/fill transitions |
| **Color Swatch** | `components/color-swatch.html` | Clickable color patches for theme editors and customization panels |
| **Context Menu** | `components/context-menu.html` | Right-click and kebab dropdown menus with dividers and keyboard hints |
| **Icon** | `components/icon.html` | 20x20 outline SVG system — content types, actions, status indicators, navigation. Full catalog with code |
| **Image Uploader** | `components/image-uploader.html` | Drag-and-drop upload zone with preview thumbnail and progress feedback |
| **Input** | `components/input.html` | Text fields, search, filter, slug, textarea. Consistent 2px borders, focus states, error states |
| **Loading** | `components/loading.html` | Centered spinner + text loading state for full-page and section-level loading |
| **Menu** | `components/menu.html` | Dropdown action menus with bold labels, icons, keyboard shortcuts, and dividers |
| **Modal** | `components/modal.html` | Overlay dialogs — tabbed (publication settings), confirmation, sync. No separate footer; buttons live in content |
| **Popover** | `components/popover.html` | Lightweight anchored dropdowns for secondary actions and quick settings |
| **Progress** | `components/progress.html` | Determinate progress bars, determinate SVG spinners, and indeterminate spinners |
| **Radio Button** | `components/radio-button.html` | Single-select groups for mutually exclusive choices in forms |
| **Selection List** | `components/selection-list.html` | Vertical selectable list with icons, used for sidebar navigation panels |
| **Sidebar** | `components/sidebar.html` | Collapsible left nav with search, file tree, nested sections, status indicators |
| **Slider** | `components/slider.html` | Range input for numeric values with labels and tick marks |
| **Tab Bar** | `components/tab-bar.html` | Vertical icon tab bar for collapsed sidebar navigation with inverted active state |
| **Table** | `components/table.html` | Dense data grids with sortable headers, row selection, grouped sections |
| **Tag Input** | `components/tag-input.html` | Interactive tag entry with pill-shaped removable chips |
| **Theme Picker** | `components/theme-picker.html` | Popover for switching between 23 built-in color themes with live preview |
| **Toast** | `components/toast.html` | Non-modal notifications for async operations — success, error, progress |
| **Toggle** | `components/toggle.html` | Pill-shaped binary switches for on/off and enabled/disabled states |

### Patterns

| Pattern | File | What it covers |
|---------|------|----------------|
| **Forms** | `patterns/forms.html` | Stacked layout, label placement, validation, error messaging |
| **Navigation** | `patterns/navigation.html` | Sidebar tree + breadcrumb coordination, section hierarchy |
| **Publish Flow** | `patterns/publish-flow.html` | Four-step note-to-web publication with settings panel |
| **Sync Flow** | `patterns/sync-flow.html` | Local folder export with progress modal and confirmation |
| **Theme System** | `patterns/theme-system.html` | 23 themes, light/dark modes, custom theme creation, CSS variable architecture |

### Full-Page Examples

| Example | File | What it demonstrates |
|---------|------|----------------------|
| **Music Table** | `examples/music-table.html` | Dense data grid — albums, tracks, sidebar nav, all tokens in use |
| **Note View** | `examples/note-view.html` | Content editing view with sidebar, breadcrumb, badge, tags |
| **Publication Panel** | `examples/publication-panel.html` | Settings popover for managing publication metadata |
| **Sync Modal** | `examples/sync-modal.html` | Export dialog with folder selection and sync options |
| **Themes Modal** | `examples/themes-modal.html` | Large modal with theme grid, live preview, and all UI elements |

## Philosophy

**Quiet, monospaced, and warm.** The aesthetic sits between a terminal and a well-typeset book.

- **Monospace-first** — JetBrains Mono for everything. Serif and sans exist for content, but the app speaks in monospace.
- **Warm neutrals** — cream, not white. Brown, not gray. Borders are soft (`#e8e6e3`), not clinical.
- **Sparse color** — accent blue (`#3d8ad3`) means something happened. Most of the UI is foreground-on-background.
- **2px interactive, 1px structural** — buttons and inputs get 2px borders. Dividers and rules get 1px.
- **Information density** — show everything. No "more" menus, no collapsed columns.

## License

MIT
