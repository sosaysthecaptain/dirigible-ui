/**
 * Dirigible Design System — Static Site Renderer
 *
 * Reads all .md files in the design system directory tree and renders them
 * into a browsable HTML site in dist/. Also copies HTML examples.
 *
 * Usage:
 *   npx tsx render.ts          # one-shot build
 *   npx tsx render.ts --watch  # rebuild on changes
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from "fs";
import { join, relative, dirname, basename, extname } from "path";
import { marked } from "marked";

const ROOT = import.meta.dirname ?? ".";
const DIST = join(ROOT, "dist");
const SECTIONS = ["tokens", "components", "patterns", "examples"] as const;

// ─── Types ────────────────────────────────────────────────────────────────

interface NavItem {
  title: string;
  href: string;
  section: string;
  isExample?: boolean;
}

// ─── Markdown to HTML ─────────────────────────────────────────────────────

function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

// ─── Collect all files ────────────────────────────────────────────────────

function collectFiles(): NavItem[] {
  const items: NavItem[] = [];

  // _meta.md → index
  if (existsSync(join(ROOT, "_meta.md"))) {
    items.push({ title: "Overview", href: "index.html", section: "root" });
  }

  for (const section of SECTIONS) {
    const dir = join(ROOT, section);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir).sort()) {
      if (file.startsWith(".") || file.startsWith("_")) continue;
      const ext = extname(file);
      const name = basename(file, ext);
      const title = name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      if (ext === ".md") {
        items.push({
          title,
          href: `${section}/${name}.html`,
          section,
        });
      } else if (ext === ".html") {
        items.push({
          title,
          href: `${section}/${file}`,
          section,
          isExample: true,
        });
      }
    }
  }

  return items;
}

// ─── HTML Shell ───────────────────────────────────────────────────────────

function htmlShell(title: string, content: string, nav: NavItem[], currentHref: string): string {
  const sectionLabels: Record<string, string> = {
    root: "Home",
    tokens: "Tokens",
    components: "Components",
    patterns: "Patterns",
    examples: "Examples",
  };

  const navHtml = Object.entries(sectionLabels)
    .map(([section, label]) => {
      const sectionItems = nav.filter((i) => i.section === section);
      if (sectionItems.length === 0) return "";

      if (section === "root") {
        const item = sectionItems[0];
        const active = currentHref === item.href ? ' class="active"' : "";
        return `<a href="${relativeHref(currentHref, item.href)}"${active}>${item.title}</a>`;
      }

      const links = sectionItems
        .map((item) => {
          const active = currentHref === item.href ? ' class="active"' : "";
          const exTag = item.isExample ? ' <span class="tag">HTML</span>' : "";
          return `<a href="${relativeHref(currentHref, item.href)}"${active}>${item.title}${exTag}</a>`;
        })
        .join("\n          ");

      return `
        <div class="nav-section">
          <div class="nav-section-title">${label}</div>
          ${links}
        </div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Dirigible UI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #fefefe;
      --fg: #1a1a1a;
      --muted: #777777;
      --border: #e8e6e3;
      --sidebar-bg: #faf9f8;
      --hover: #f5f4f2;
      --accent: #E8915A;
      --accent-muted: #d4804a;
      --success: #22c55e;
      --warning: #f59e0b;
      --danger: #dc2626;
      --code-bg: #f5f5f5;
      --code-fg: #1f2937;
      --link: #0066cc;
      --radius-sm: 4px;
      --radius-md: 6px;
    }

    [data-theme="dark"] {
      --bg: #181716;
      --fg: #f2f0ed;
      --muted: #999795;
      --border: #302e2b;
      --sidebar-bg: #1e1d1b;
      --hover: #232120;
      --accent: #6ba3d6;
      --accent-muted: #3d6a8a;
      --success: #4ec9b0;
      --warning: #ce9178;
      --danger: #ef4444;
      --code-bg: #1e1e1e;
      --code-fg: #d4d4d4;
      --link: #58a6ff;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 20px;
      color: var(--fg);
      background: var(--bg);
      display: flex;
      min-height: 100vh;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 220px;
      min-width: 220px;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--border);
      padding: 16px 0;
      overflow-y: auto;
      position: sticky;
      top: 0;
      height: 100vh;
    }

    .sidebar-header {
      padding: 0 16px 16px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sidebar-header h1 {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0;
    }

    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      color: var(--muted);
      border-radius: var(--radius-sm);
    }
    .theme-toggle:hover { color: var(--fg); background: var(--hover); }

    .nav-section { margin-bottom: 4px; }

    .nav-section-title {
      padding: 8px 16px 4px;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
    }

    .sidebar a {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 16px;
      color: var(--fg);
      text-decoration: none;
      font-size: 13px;
    }

    .sidebar a:hover { background: var(--hover); }
    .sidebar a.active {
      background: color-mix(in srgb, var(--accent) 15%, transparent);
      color: var(--accent);
    }

    .tag {
      font-size: 9px;
      padding: 1px 4px;
      border: 1px solid var(--border);
      border-radius: 3px;
      color: var(--muted);
      margin-left: auto;
    }

    /* ── Main Content ── */
    .main {
      flex: 1;
      max-width: 800px;
      padding: 32px 40px;
      min-width: 0;
    }

    .main h1 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .main h2 {
      font-size: 18px;
      line-height: 28px;
      font-weight: 600;
      margin-top: 32px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--border);
    }

    .main h3 {
      font-size: 14px;
      line-height: 22px;
      font-weight: 600;
      margin-top: 24px;
      margin-bottom: 8px;
    }

    .main p {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 22px;
    }

    .main ul, .main ol {
      margin-bottom: 12px;
      padding-left: 24px;
    }

    .main li {
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 22px;
    }

    .main a {
      color: var(--link);
      text-decoration: underline;
      text-decoration-color: color-mix(in srgb, var(--link) 40%, transparent);
    }
    .main a:hover { text-decoration-color: var(--link); }

    .main strong { font-weight: 600; }
    .main em { font-style: italic; }

    .main blockquote {
      border-left: 3px solid var(--border);
      padding: 4px 16px;
      margin: 12px 0;
      color: var(--muted);
    }

    .main code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: var(--code-bg);
      color: var(--code-fg);
      padding: 2px 6px;
      border-radius: 3px;
    }

    .main pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      margin: 12px 0;
      overflow-x: auto;
    }

    .main pre code {
      background: none;
      padding: 0;
      font-size: 12px;
      line-height: 18px;
    }

    .main table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 13px;
    }

    .main th {
      text-align: left;
      font-weight: 600;
      padding: 6px 8px;
      border-bottom: 2px solid var(--border);
    }

    .main td {
      padding: 6px 8px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }

    .main tr:hover td { background: var(--hover); }

    .main hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 24px 0;
    }

    .main img {
      max-width: 100%;
      border-radius: var(--radius-md);
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .main { padding: 16px; }
    }
  </style>
</head>
<body>
  <nav class="sidebar">
    <div class="sidebar-header">
      <h1>dirigible-ui</h1>
      <button class="theme-toggle" onclick="toggleTheme()" title="Toggle theme">☾</button>
    </div>
    ${navHtml}
  </nav>
  <main class="main">
    ${content}
  </main>
  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      document.querySelector('.theme-toggle').textContent = next === 'dark' ? '☀' : '☾';
      localStorage.setItem('dirigible-ui-theme', next);
    }
    // Restore saved theme
    const saved = localStorage.getItem('dirigible-ui-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.querySelector('.theme-toggle').textContent = '☀';
    }
  </script>
</body>
</html>`;
}

// ─── Relative href helper ─────────────────────────────────────────────────

function relativeHref(from: string, to: string): string {
  const fromDir = dirname(from);
  if (fromDir === ".") return to;
  // from is in a subdirectory, need to go up
  const depth = fromDir.split("/").length;
  return "../".repeat(depth) + to;
}

// ─── Build ────────────────────────────────────────────────────────────────

function build() {
  console.log("Building Dirigible UI docs...\n");

  // Ensure output dirs
  mkdirSync(DIST, { recursive: true });
  for (const s of SECTIONS) {
    mkdirSync(join(DIST, s), { recursive: true });
  }

  const nav = collectFiles();

  // Render _meta.md → index.html
  const metaPath = join(ROOT, "_meta.md");
  if (existsSync(metaPath)) {
    const md = readFileSync(metaPath, "utf-8");
    const html = renderMarkdown(md);
    writeFileSync(join(DIST, "index.html"), htmlShell("Overview", html, nav, "index.html"));
    console.log("  ✓ index.html");
  }

  // Render section files
  for (const section of SECTIONS) {
    const dir = join(ROOT, section);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir).sort()) {
      if (file.startsWith(".") || file.startsWith("_")) continue;
      const ext = extname(file);
      const name = basename(file, ext);
      const srcPath = join(dir, file);

      if (ext === ".md") {
        const md = readFileSync(srcPath, "utf-8");
        const html = renderMarkdown(md);
        const outPath = join(DIST, section, `${name}.html`);
        const href = `${section}/${name}.html`;
        writeFileSync(outPath, htmlShell(name.replace(/-/g, " "), html, nav, href));
        console.log(`  ✓ ${section}/${name}.html`);
      } else if (ext === ".html") {
        // Copy HTML examples as-is
        copyFileSync(srcPath, join(DIST, section, file));
        console.log(`  ✓ ${section}/${file} (copied)`);
      }
    }
  }

  console.log(`\nDone! Open dist/index.html to browse.`);
}

// ─── Watch mode ───────────────────────────────────────────────────────────

async function watch() {
  build();
  console.log("\nWatching for changes...");

  const { watch: chokidarWatch } = await import("chokidar");
  const watcher = chokidarWatch(
    [
      join(ROOT, "_meta.md"),
      ...SECTIONS.map((s) => join(ROOT, s, "**/*")),
    ],
    { ignoreInitial: true }
  );

  watcher.on("all", (event: any, path: any) => {
    console.log(`\n${event}: ${relative(ROOT, path)}`);
    build();
  });
}

// ─── Entry ────────────────────────────────────────────────────────────────

if (process.argv.includes("--watch")) {
  watch();
} else {
  build();
}
