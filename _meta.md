# Dirigible Design System

> The visual language of [Dirigible](https://dirigible.app) — a sovereign, portable notes and music library app.

## Philosophy

Dirigible's UI is **quiet, monospaced, and warm**. It looks like a tool a thoughtful person built for themselves. Every element earns its place — no decorative flourishes, no gratuitous color, no rounded-everything friendliness. The aesthetic sits somewhere between a terminal and a well-typeset book.

### Core Principles

1. **Monospace-first.** JetBrains Mono is the default for everything — sidebar, buttons, table cells, form labels. Serif and sans options exist for published content, but the app itself speaks in monospace.

2. **Warm neutrals.** The light theme is cream, not white. The dark theme is brown, not gray. Borders are soft (`#e0ddd8`), not clinical (`#e0e0e0`). This warmth is the single most distinctive quality of Dirigible's look.

3. **Sparse color.** Accent color (`#E8915A`, a muted orange) is used sparingly — active tabs, primary actions, publish status dots. Most of the UI is foreground-on-background with muted secondary text. Color means something happened.

4. **2px borders on interactive elements.** Buttons, inputs, toggles, cards — anything you can click gets a 2px solid border. Dividers and table rules get 1px. This creates a clear visual distinction between "things" and "structure."

5. **Information density.** Tables show everything. The music library table has track number, title, artist, album, year, duration, and file size — all visible, no hiding behind "more" menus. The notes table shows type, modified time, date, tags, and size. Density is a feature.

6. **Semantic headings only.** Headings use weight (semibold) and size. No text-transform, no letter-spacing tricks, no uppercase labels. The exception is section labels in the themes modal (BUTTONS, STATUS, etc.) which use small uppercase labels to organize a dense reference view.

## File Structure

```
dirigible-ui/
  _meta.md              ← You are here
  tokens/
    colors.md           ← Color tokens, themes, semantic usage
    typography.md       ← Font stacks, type scale, rules
    spacing.md          ← Spacing scale, borders, radius, shadows
  components/
    button.md           ← Button variants and states
    input.md            ← Text inputs, textareas, search
    toggle.md           ← Toggle switches
    modal.md            ← Modal dialogs
    popover.md          ← Popovers and dropdown panels
    context-menu.md     ← Right-click and kebab menus
    table.md            ← Data tables (notes + music variants)
    sidebar.md          ← File tree sidebar
    breadcrumb.md       ← Navigation breadcrumbs
    badge.md            ← Status badges and pills
    tag-input.md        ← Tag entry and display
    toast.md            ← Toast notifications and progress
    icon.md             ← Icon system and catalog
    color-swatch.md     ← Color swatch pickers
  patterns/
    forms.md            ← Form layout and validation
    navigation.md       ← App navigation patterns
    publish-flow.md     ← Publication workflow
    sync-flow.md        ← Local folder sync workflow
    theme-system.md     ← Theme switching architecture
  renders.mjs           ← Live HTML renders for each component/pattern
  render.mjs            ← Builds browsable HTML from .md files
  package.json          ← Node dependencies
```

## Usage with Claude Code

Add this to your project's `CLAUDE.md`:

```markdown
## Design System
Follow the design system in ./dirigible-ui/
Before creating or modifying any UI component, read the relevant
component and token files in ./dirigible-ui/tokens/ and ./dirigible-ui/components/.
Use CSS custom properties defined in tokens/colors.md — never raw hex values.
```

## Rendering the Docs

```bash
cd dirigible-ui
npm install
npm run build    # outputs to dist/
npm run dev      # live preview at localhost:3000
```
