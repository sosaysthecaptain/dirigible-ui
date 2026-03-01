# Table

## Description

Displays structured data in rows and columns. Dirigible uses tables for listing notes, music tracks, and other collections. Tables feature sortable headers, optional row selection, fixed headers, and hover highlights. Two main variants exist: Notes table (with checkboxes) and Music table (grouped by album).

## When to Use

- **Notes library**: Display list of notes with metadata (title, type, modified date, tags, size)
- **Music collections**: Show tracks grouped by album with artist, duration, and size
- **Data grids**: Any multi-column data that needs sorting and filtering
- **Collections**: Display folders, projects, or any hierarchical data

Do not use tables for simple lists; use list components instead.

## Variants

| Type | Columns | Row Groups | Selection | Use Case |
|------|---------|-----------|-----------|----------|
| **Notes Table** | Checkbox, Title, Type, Modified, Date, Tags, Size | None | Checkboxes | Library of notes and documents |
| **Music Table** | #, Title, Artist, Album, Year, Time, Size | By album | None | Music/audio collections |
| **Generic Table** | Varies by context | Optional | Optional | Any tabular data |

## Anatomy

### Notes Table
```
<table class="table">
  <thead>
    <tr>
      <th class="table-header table-header-checkbox">
        <input type="checkbox" class="table-checkbox" />
      </th>
      <th class="table-header">Title</th>
      <th class="table-header">Type</th>
      <th class="table-header">Modified</th>
      <th class="table-header">Date</th>
      <th class="table-header">Tags</th>
      <th class="table-header table-header-right">Size</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-row">
      <td class="table-cell table-cell-checkbox">
        <input type="checkbox" class="table-checkbox" />
      </td>
      <td class="table-cell table-cell-title">
        <svg class="table-icon"><!-- doc icon --></svg>
        <span>Note Title</span>
      </td>
      <td class="table-cell">
        <span class="status-dot status-dot-published"></span>
        Note
      </td>
      <td class="table-cell">Today</td>
      <td class="table-cell">Mar 18, 2025</td>
      <td class="table-cell">
        <span class="tag-dot"></span>
        <span class="tag-dot"></span>
      </td>
      <td class="table-cell table-cell-right">12.5 KB</td>
    </tr>
  </tbody>
</table>
```

### Music Table
```
<table class="table table-music">
  <thead>
    <tr>
      <th class="table-header">#</th>
      <th class="table-header">Title</th>
      <th class="table-header">Artist</th>
      <th class="table-header">Album</th>
      <th class="table-header">Year</th>
      <th class="table-header table-header-right">Time</th>
      <th class="table-header table-header-right">Size</th>
    </tr>
  </thead>
  <tbody>
    <!-- Group header -->
    <tr class="table-group-header">
      <td colspan="7">
        <strong>Artist Name - Album Name</strong>
      </td>
    </tr>
    <!-- Rows for this album -->
    <tr class="table-row">
      <td class="table-cell">1</td>
      <td class="table-cell">Track Title</td>
      <td class="table-cell">Artist</td>
      <td class="table-cell">Album</td>
      <td class="table-cell">2020</td>
      <td class="table-cell table-cell-right">3:42</td>
      <td class="table-cell table-cell-right">8.5 MB</td>
    </tr>
  </tbody>
  <!-- Stats footer -->
  <tfoot>
    <tr class="table-footer">
      <td colspan="7">2,189 songs · 5d 15h 5m · 13.8 GB</td>
    </tr>
  </tfoot>
</table>
```

**Structure:**
- `<table>` with class `.table` and optional variant class (`.table-music`)
- `<thead>` with sortable column headers
- `<tbody>` with data rows, each `<tr class="table-row">`
- Optional `<tfoot>` with summary stats for music tables
- Row selection via checkbox in first column
- Status indicators via colored dots
- Icons for content type (document, music note, etc.)
- Tag indicators as small dots in tags column

## Token Usage

- **Font**: `Lucida Grande`, system-ui, sans-serif — **not monospace** (this is a deliberate density choice)
- **Font size**: 11px for cell text, 11px semibold for headers
- **Row height**: 18px (extremely dense; the music library is designed for scanning large collections)
- **Cell padding**: 4px horizontal, 1px vertical
- **Border**: 1px subtle dividers between rows
- **Hover background**: Slight highlight color (--hover-bg)
- **Selected row**: Accent background (--accent at ~15% opacity)
- **Multi-select**: Shift+click for range, Cmd+click for toggle (no checkboxes in music table)
- **Status dot**: 8px circle, --success (green), --warning (orange), --danger (red)
- **Tag dot**: 6px circle, muted color
- **Icon size**: 16px for content type icons
- **Checkbox size**: 16px (notes table only)
- **Sortable indicator**: Small up/down arrow on clickable headers
- **Align right**: Size and time columns are right-aligned
- **Virtualization**: Uses TanStack React Table with row virtualization for large datasets (2000+ tracks)

## HTML Example

### Notes Table
```html
<table class="table">
  <thead>
    <tr>
      <th class="table-header table-header-checkbox">
        <input type="checkbox" class="table-checkbox" aria-label="Select all notes" />
      </th>
      <th class="table-header table-header-sortable" data-sort="title">
        Title
        <svg class="table-sort-icon" width="12" height="12"><!-- sort arrow --></svg>
      </th>
      <th class="table-header table-header-sortable" data-sort="type">Type</th>
      <th class="table-header table-header-sortable" data-sort="modified">Modified</th>
      <th class="table-header table-header-sortable" data-sort="date">Date</th>
      <th class="table-header">Tags</th>
      <th class="table-header table-header-sortable table-header-right" data-sort="size">Size</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-row" data-id="note-1">
      <td class="table-cell table-cell-checkbox">
        <input type="checkbox" class="table-checkbox" />
      </td>
      <td class="table-cell table-cell-title">
        <svg class="table-icon" width="16" height="16"><!-- document icon --></svg>
        <span>Getting Started with Dirigible</span>
      </td>
      <td class="table-cell">
        <span class="status-dot status-dot-published"></span>
        Note
      </td>
      <td class="table-cell">Today</td>
      <td class="table-cell">Mar 18, 2025</td>
      <td class="table-cell">
        <span class="tag-dot" title="Writing"></span>
        <span class="tag-dot" title="Tutorial"></span>
        <span class="tag-dot" title="Documentation"></span>
      </td>
      <td class="table-cell table-cell-right">12.5 KB</td>
    </tr>

    <tr class="table-row" data-id="note-2">
      <td class="table-cell table-cell-checkbox">
        <input type="checkbox" class="table-checkbox" />
      </td>
      <td class="table-cell table-cell-title">
        <svg class="table-icon" width="16" height="16"><!-- document icon --></svg>
        <span>Advanced Features</span>
      </td>
      <td class="table-cell">
        Note
      </td>
      <td class="table-cell">Last week</td>
      <td class="table-cell">Mar 12, 2025</td>
      <td class="table-cell"></td>
      <td class="table-cell table-cell-right">8.2 KB</td>
    </tr>
  </tbody>
</table>
```

### Music Table
```html
<table class="table table-music">
  <thead>
    <tr>
      <th class="table-header table-header-sortable" data-sort="track">#</th>
      <th class="table-header table-header-sortable" data-sort="title">Title</th>
      <th class="table-header table-header-sortable" data-sort="artist">Artist</th>
      <th class="table-header table-header-sortable" data-sort="album">Album</th>
      <th class="table-header table-header-sortable" data-sort="year">Year</th>
      <th class="table-header table-header-sortable table-header-right" data-sort="time">Time</th>
      <th class="table-header table-header-sortable table-header-right" data-sort="size">Size</th>
    </tr>
  </thead>
  <tbody>
    <!-- Group 1 -->
    <tr class="table-group-header">
      <td colspan="7"><strong>Radiohead - OK Computer</strong></td>
    </tr>
    <tr class="table-row" data-track-id="1">
      <td class="table-cell">1</td>
      <td class="table-cell">Airbag</td>
      <td class="table-cell">Radiohead</td>
      <td class="table-cell">OK Computer</td>
      <td class="table-cell">1997</td>
      <td class="table-cell table-cell-right">4:44</td>
      <td class="table-cell table-cell-right">10.2 MB</td>
    </tr>
    <tr class="table-row" data-track-id="2">
      <td class="table-cell">2</td>
      <td class="table-cell">Paranoid Android</td>
      <td class="table-cell">Radiohead</td>
      <td class="table-cell">OK Computer</td>
      <td class="table-cell">1997</td>
      <td class="table-cell table-cell-right">6:23</td>
      <td class="table-cell table-cell-right">14.5 MB</td>
    </tr>

    <!-- Group 2 -->
    <tr class="table-group-header">
      <td colspan="7"><strong>The Beatles - Abbey Road</strong></td>
    </tr>
    <tr class="table-row" data-track-id="3">
      <td class="table-cell">1</td>
      <td class="table-cell">Come Together</td>
      <td class="table-cell">The Beatles</td>
      <td class="table-cell">Abbey Road</td>
      <td class="table-cell">1969</td>
      <td class="table-cell table-cell-right">4:15</td>
      <td class="table-cell table-cell-right">9.8 MB</td>
    </tr>
  </tbody>
  <tfoot>
    <tr class="table-footer">
      <td colspan="7">2,189 songs · 5d 15h 5m · 13.8 GB</td>
    </tr>
  </tfoot>
</table>
```

## CSS Example

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Lucida Grande', system-ui, sans-serif;
  font-size: 11px;
  color: var(--foreground);
}

.table thead {
  position: sticky;
  top: 0;
  background-color: var(--background-secondary);
  border-bottom: 1px solid var(--border);
  z-index: 10;
}

.table-header {
  padding: 8px;
  text-align: left;
  font-weight: 600;
  color: var(--foreground);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: background-color 0.1s ease;
}

.table-header:hover {
  background-color: var(--hover-bg);
}

.table-header-sortable {
  cursor: pointer;
}

.table-header-right {
  text-align: right;
}

.table-header-checkbox {
  width: 48px;
  padding: 8px 12px;
  cursor: pointer;
}

.table-sort-icon {
  display: inline-block;
  margin-left: 4px;
  width: 12px;
  height: 12px;
  opacity: 0.5;
  transition: opacity 0.1s ease;
}

.table-header-sortable:hover .table-sort-icon {
  opacity: 1;
}

.table-row {
  border-bottom: 1px solid var(--border);
  transition: background-color 0.1s ease;
}

.table-row:hover {
  background-color: var(--hover-bg);
  cursor: pointer;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 8px;
  text-align: left;
  vertical-align: middle;
  word-break: break-word;
}

.table-cell-right {
  text-align: right;
}

.table-cell-checkbox {
  width: 48px;
  padding: 8px 12px;
  text-align: center;
}

.table-cell-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.table-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-muted);
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5px;
}

.table-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
  background-color: var(--color-muted);
}

.status-dot-published {
  background-color: var(--success);
}

.status-dot-warning {
  background-color: var(--warning);
}

.status-dot-danger {
  background-color: var(--danger);
}

.tag-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-muted);
  margin-right: 4px;
}

/* Music table specific */
.table-group-header {
  background-color: var(--background-secondary);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 0;
}

.table-group-header td {
  padding: 8px;
  font-weight: 600;
  color: var(--foreground);
}

.table-footer {
  background-color: var(--background-secondary);
  border-top: 1px solid var(--border);
  padding: 8px;
  font-size: 12px;
  color: var(--color-muted);
  text-align: right;
}

/* Alternating row backgrounds (optional) */
.table-row:nth-child(odd) {
  background-color: var(--background-alt);
}

.table-row:hover {
  background-color: var(--hover-bg);
}
```

## JSX Example

```jsx
// Notes Table Component
const [notes, setNotes] = useState([
  {
    id: 'note-1',
    title: 'Getting Started with Dirigible',
    type: 'Note',
    modified: 'Today',
    date: 'Mar 18, 2025',
    tags: ['Writing', 'Tutorial', 'Documentation'],
    size: '12.5 KB',
    published: true,
  },
  {
    id: 'note-2',
    title: 'Advanced Features',
    type: 'Note',
    modified: 'Last week',
    date: 'Mar 12, 2025',
    tags: [],
    size: '8.2 KB',
    published: false,
  },
]);

const [selectedNotes, setSelectedNotes] = useState(new Set());
const [sortBy, setSortBy] = useState('title');

const toggleRowSelection = (noteId) => {
  const newSelection = new Set(selectedNotes);
  if (newSelection.has(noteId)) {
    newSelection.delete(noteId);
  } else {
    newSelection.add(noteId);
  }
  setSelectedNotes(newSelection);
};

const toggleAllSelection = (e) => {
  if (e.target.checked) {
    setSelectedNotes(new Set(notes.map((n) => n.id)));
  } else {
    setSelectedNotes(new Set());
  }
};

const handleSort = (column) => {
  setSortBy(sortBy === column ? `-${column}` : column);
};

<table className="table">
  <thead>
    <tr>
      <th className="table-header table-header-checkbox">
        <input
          type="checkbox"
          className="table-checkbox"
          onChange={toggleAllSelection}
          checked={selectedNotes.size === notes.length}
        />
      </th>
      <th
        className="table-header table-header-sortable"
        onClick={() => handleSort('title')}
      >
        Title
      </th>
      <th className="table-header">Type</th>
      <th className="table-header">Modified</th>
      <th className="table-header">Date</th>
      <th className="table-header">Tags</th>
      <th className="table-header table-header-right">Size</th>
    </tr>
  </thead>
  <tbody>
    {notes.map((note) => (
      <tr
        key={note.id}
        className="table-row"
        onClick={() => openNote(note.id)}
      >
        <td className="table-cell table-cell-checkbox">
          <input
            type="checkbox"
            className="table-checkbox"
            checked={selectedNotes.has(note.id)}
            onChange={() => toggleRowSelection(note.id)}
            onClick={(e) => e.stopPropagation()}
          />
        </td>
        <td className="table-cell table-cell-title">
          <DocumentIcon className="table-icon" width="16" height="16" />
          <span>{note.title}</span>
        </td>
        <td className="table-cell">
          {note.published && (
            <span className="status-dot status-dot-published"></span>
          )}
          {note.type}
        </td>
        <td className="table-cell">{note.modified}</td>
        <td className="table-cell">{note.date}</td>
        <td className="table-cell">
          {note.tags.map((tag, idx) => (
            <span key={idx} className="tag-dot" title={tag}></span>
          ))}
        </td>
        <td className="table-cell table-cell-right">{note.size}</td>
      </tr>
    ))}
  </tbody>
</table>

// Music Table Component
const [tracks, setTracks] = useState([
  {
    id: 1,
    artist: 'Radiohead',
    album: 'OK Computer',
    track: 1,
    title: 'Airbag',
    year: 1997,
    time: '4:44',
    size: '10.2 MB',
  },
  {
    id: 2,
    artist: 'Radiohead',
    album: 'OK Computer',
    track: 2,
    title: 'Paranoid Android',
    year: 1997,
    time: '6:23',
    size: '14.5 MB',
  },
]);

const groupedTracks = tracks.reduce((acc, track) => {
  const groupKey = `${track.artist} - ${track.album}`;
  if (!acc[groupKey]) acc[groupKey] = [];
  acc[groupKey].push(track);
  return acc;
}, {});

const stats = {
  totalSongs: tracks.length,
  totalDuration: '5d 15h 5m',
  totalSize: '13.8 GB',
};

<table className="table table-music">
  <thead>
    <tr>
      <th className="table-header">#</th>
      <th className="table-header">Title</th>
      <th className="table-header">Artist</th>
      <th className="table-header">Album</th>
      <th className="table-header">Year</th>
      <th className="table-header table-header-right">Time</th>
      <th className="table-header table-header-right">Size</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(groupedTracks).map(([groupKey, groupTracks]) => (
      <tbody key={groupKey}>
        <tr className="table-group-header">
          <td colSpan="7">
            <strong>{groupKey}</strong>
          </td>
        </tr>
        {groupTracks.map((track) => (
          <tr key={track.id} className="table-row">
            <td className="table-cell">{track.track}</td>
            <td className="table-cell">{track.title}</td>
            <td className="table-cell">{track.artist}</td>
            <td className="table-cell">{track.album}</td>
            <td className="table-cell">{track.year}</td>
            <td className="table-cell table-cell-right">{track.time}</td>
            <td className="table-cell table-cell-right">{track.size}</td>
          </tr>
        ))}
      </tbody>
    ))}
  </tbody>
  <tfoot>
    <tr className="table-footer">
      <td colSpan="7">
        {stats.totalSongs.toLocaleString()} songs · {stats.totalDuration} · {stats.totalSize}
      </td>
    </tr>
  </tfoot>
</table>
```

## Do's and Don'ts

### Do
- Use fixed/sticky headers so they stay visible when scrolling
- Make column headers sortable with visual indicators (sort arrows)
- Use right-alignment for numeric columns (Size, Time)
- Include row hover highlights for clarity
- Use Lucida Grande at 11px for music table text (not monospace)
- Group related rows (e.g., by album in music tables)
- Show status indicators via small colored dots
- Include row selection checkboxes when bulk actions are needed
- Use icons to indicate content type (document, music, etc.)
- Provide summary stats in a footer for data tables (music table)

### Don't
- Use tables for simple lists (use list components instead)
- Create tables without sortable headers
- Left-align numeric columns (should be right-aligned)
- Use thick borders between rows; keep borders subtle (1px)
- Mix content types in table columns (one type per column)
- Create tables wider than the viewport without horizontal scroll
- Use unnecessary visual effects (gradients, shadows on rows)
- Forget to make rows clickable when they lead to detail views
- Use different fonts or font sizes within the same table
- Create tables with too many columns (consider scrolling or collapsible sections)

## Rules Specific to Tables

1. **Sticky headers**: Table headers remain visible when scrolling vertically
2. **Sortable headers**: Column headers are clickable to sort by that column
3. **Row borders subtle**: Only 1px solid --border between rows, never thick
4. **Hover highlight**: Rows highlight on hover with --hover-bg color
5. **Icons for content type**: First meaningful column includes icon (document, music, etc.)
6. **Status dots small**: 8px diameter colored circles indicate state
7. **Tag indicators**: Use small dots in tags column instead of full tag text
8. **Checkboxes for selection**: Rows include left-column checkboxes for multi-select
9. **Right-align numbers**: Size, time, and other numeric columns are right-aligned
10. **Group headers for music**: Music tables have group headers (Artist - Album)
11. **Stats footer**: Music tables include footer with total stats
12. **Alternating backgrounds**: Music table uses subtle alternating row backgrounds for scanability
13. **Fixed height rows**: Music table rows are 18px; notes table rows are ~32px
14. **Row click navigates**: Clicking row opens detail view (unless checkbox clicked)
