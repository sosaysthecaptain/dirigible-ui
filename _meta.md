# dirigible-ui

> An agent-first UI framework. Standalone HTML specs with live demos, designed to be read by AI coding assistants and browsed by humans. Born from [Dirigible](https://dirigible.app).

## Philosophy

The UI is **quiet, monospaced, and warm**. It looks like a tool a thoughtful person built for themselves. Every element earns its place — no decorative flourishes, no gratuitous color, no rounded-everything friendliness. The aesthetic sits somewhere between a terminal and a well-typeset book.

### Core Principles

1. **Monospace-first.** JetBrains Mono is the default for everything — sidebar, buttons, table cells, form labels. Serif and sans options exist for content, but the app itself speaks in monospace.

2. **Warm neutrals.** The light theme is cream, not white. The dark theme is brown, not gray. Borders are soft (`#e0ddd8`), not clinical (`#e0e0e0`). This warmth is the single most distinctive visual quality.

3. **Sparse color.** Accent color (`#3d8ad3`, a muted blue) is used sparingly — active tabs, primary actions, status dots. Most of the UI is foreground-on-background with muted secondary text. Color means something happened.

4. **2px borders on interactive elements.** Buttons, inputs, toggles, cards — anything you can click gets a 2px solid border. Dividers and table rules get 1px. This creates a clear visual distinction between "things" and "structure."

5. **Information density.** Tables show everything. Columns for title, artist, album, year, duration, file size — all visible, no hiding behind "more" menus. Density is a feature.

6. **Semantic headings only.** Headings use weight (semibold) and size. No text-transform, no letter-spacing tricks, no uppercase labels.

## File Structure

```
dirigible-ui/
  index.html                        ← You are here
  how-to-use.html                   ← Including in a project, pointing Claude at it
  how-to-update.html                ← Tweaking, adding, maintaining the system
  tokens/
    colors.html                     ← Color tokens, themes, semantic usage
    typography.html                 ← Font stacks, type scale, rules
    spacing.html                    ← Spacing scale, borders, radius, shadows
  components/
    badge.html                      ← Status badges and pills
    breadcrumb.html                 ← Navigation breadcrumbs
    button.html                     ← Button variants and states
    color-swatch.html               ← Color swatch pickers
    context-menu.html               ← Right-click and kebab menus
    icon.html                       ← Icon system and catalog
    image-uploader.html             ← Image upload component
    input.html                      ← Text inputs, textareas, search
    modal.html                      ← Modal dialogs
    popover.html                    ← Popovers and dropdown panels
    radio-button.html               ← Radio button groups
    selection-list.html             ← Selection list component
    sidebar.html                    ← File tree sidebar
    slider.html                     ← Range sliders
    table.html                      ← Data tables (notes + music variants)
    tag-input.html                  ← Tag entry and display
    theme-picker.html               ← Theme selection UI
    toast.html                      ← Toast notifications and progress
    toggle.html                     ← Toggle switches
  patterns/
    forms.html                      ← Form layout and validation
    navigation.html                 ← App navigation patterns
    publish-flow.html               ← Publication workflow
    sync-flow.html                  ← Local folder sync workflow
    theme-system.html               ← Theme switching architecture
  examples/
    music-table.html                ← Full music library table
    note-view.html                  ← Note editing view
    publication-panel.html          ← Publication management panel
    sync-modal.html                 ← Folder sync modal
    themes-modal.html               ← Theme configuration modal
```

## Usage with Claude Code

Each page is a standalone HTML file with inline styles and live interactive demos. No build step required — open any `.html` file directly in a browser.

To use this as a design reference in your project, add to your `CLAUDE.md`:

```markdown
## Design System
Follow the design system in ./dirigible-ui/
Before creating or modifying any UI component, read the relevant
component and token files in ./dirigible-ui/tokens/ and ./dirigible-ui/components/.
Use CSS custom properties — never raw hex values.
```
