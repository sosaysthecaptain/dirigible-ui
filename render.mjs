/**
 * Dirigible Design System — Static Site Renderer
 *
 * Reads all .md files and renders them into browsable HTML in dist/.
 * Also copies HTML example files as-is.
 *
 * Usage: node render.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync } from "fs";
import { join, dirname, basename, extname, relative } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import { renders } from "./renders.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const DIST = join(ROOT, "dist");
const SECTIONS = ["tokens", "components", "patterns"];

// ─── Collect all files ────────────────────────────────────────────────────

function collectFiles() {
  const items = [];

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
      const title = name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

      if (ext === ".md") {
        items.push({ title, href: `${section}/${name}.html`, section });
      } else if (ext === ".html") {
        items.push({ title, href: `${section}/${file}`, section, isExample: true });
      }
    }
  }
  return items;
}

// ─── Relative href ────────────────────────────────────────────────────────

function relativeHref(from, to) {
  const fromDir = dirname(from);
  if (fromDir === ".") return to;
  const depth = fromDir.split("/").length;
  return "../".repeat(depth) + to;
}

// ─── HTML Shell ───────────────────────────────────────────────────────────

function htmlShell(title, content, nav, currentHref) {
  const sectionLabels = {
    root: "Home",
    tokens: "Tokens",
    components: "Components",
    patterns: "Patterns",
  };

  const navHtml = Object.entries(sectionLabels)
    .map(([section, label]) => {
      const sectionItems = nav.filter(i => i.section === section);
      if (sectionItems.length === 0) return "";

      if (section === "root") {
        const item = sectionItems[0];
        const active = currentHref === item.href ? ' class="active"' : "";
        return `<a href="${relativeHref(currentHref, item.href)}"${active}>${item.title}</a>`;
      }

      const links = sectionItems
        .map(item => {
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
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #fefefe;
      --fg: #1a1a1a;
      --muted: #777777;
      --border: #e8e6e3;
      --sidebar-bg: #faf9f8;
      --hover: #f5f4f2;
      --accent: #0066cc;
      --accent-muted: #004d99;
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
      font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
      font-size: 13px;
      line-height: 20px;
      color: var(--fg);
      background: var(--bg);
      display: flex;
      min-height: 100vh;
    }

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

    .main {
      flex: 1;
      max-width: 800px;
      padding: 32px 40px;
      min-width: 0;
    }

    .main h1 { font-size: 24px; line-height: 32px; font-weight: 600; margin-bottom: 8px; }
    .main h2 { font-size: 18px; line-height: 28px; font-weight: 600; margin-top: 32px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--border); }
    .main h3 { font-size: 14px; line-height: 22px; font-weight: 600; margin-top: 24px; margin-bottom: 8px; }
    .main h4 { font-size: 13px; line-height: 20px; font-weight: 600; margin-top: 16px; margin-bottom: 4px; }
    .main p { margin-bottom: 12px; font-size: 14px; line-height: 22px; }
    .main ul, .main ol { margin-bottom: 12px; padding-left: 24px; }
    .main li { margin-bottom: 4px; font-size: 14px; line-height: 22px; }
    .main a { color: var(--link); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--link) 40%, transparent); }
    .main a:hover { text-decoration-color: var(--link); }
    .main strong { font-weight: 600; }
    .main em { font-style: italic; }
    .main blockquote { border-left: 3px solid var(--border); padding: 4px 16px; margin: 12px 0; color: var(--muted); }
    .main code { font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 12px; background: var(--code-bg); color: var(--code-fg); padding: 2px 6px; border-radius: 3px; }
    .main pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px 16px; margin: 12px 0; overflow-x: auto; }
    .main pre code { background: none; padding: 0; font-size: 12px; line-height: 18px; }
    .main table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
    .main th { text-align: left; font-weight: 600; padding: 6px 8px; border-bottom: 2px solid var(--border); }
    .main td { padding: 6px 8px; border-bottom: 1px solid var(--border); vertical-align: top; }
    .main tr:hover td { background: var(--hover); }
    .main hr { border: none; border-top: 1px solid var(--border); margin: 24px 0; }
    .main img { max-width: 100%; border-radius: var(--radius-md); }

    .render-panel {
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      margin-bottom: 32px;
      overflow: hidden;
    }

    .render-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--sidebar-bg);
      border-bottom: 1px solid var(--border);
      font-size: 11px;
      text-transform: uppercase;
      color: var(--muted);
      letter-spacing: 0.5px;
    }

    .render-panel-header .render-label {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .render-panel-header .render-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success);
    }

    .render-panel-body {
      padding: 24px;
      font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
      font-size: 13px;
      line-height: 20px;
    }

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
      <button class="theme-toggle" onclick="toggleTheme()" title="Toggle theme">&#9790;</button>
    </div>
    ${navHtml}
  </nav>
  <main class="main">
    ${content}
  </main>
  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      document.querySelector('.theme-toggle').innerHTML = next === 'dark' ? '&#9788;' : '&#9790;';
      localStorage.setItem('dirigible-ui-theme', next);
    }
    const saved = localStorage.getItem('dirigible-ui-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.querySelector('.theme-toggle').innerHTML = '&#9788;';
    }
  </script>
</body>
</html>`;
}

// ─── Build ────────────────────────────────────────────────────────────────

function build() {
  console.log("Building Dirigible UI docs...\\n");

  mkdirSync(DIST, { recursive: true });
  for (const s of SECTIONS) {
    mkdirSync(join(DIST, s), { recursive: true });
  }

  const nav = collectFiles();

  // _meta.md → index.html
  const metaPath = join(ROOT, "_meta.md");
  if (existsSync(metaPath)) {
    const md = readFileSync(metaPath, "utf-8");
    const html = marked.parse(md);
    writeFileSync(join(DIST, "index.html"), htmlShell("Overview", html, nav, "index.html"));
    console.log("  ✓ index.html");
  }

  // Section files
  for (const section of SECTIONS) {
    const dir = join(ROOT, section);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir).sort()) {
      if (file.startsWith(".") || file.startsWith("_")) continue;
      const ext = extname(file);
      const name = basename(file, ext);

      if (ext === ".md") {
        const md = readFileSync(join(dir, file), "utf-8");
        const markdownHtml = marked.parse(md);

        // Inject live render panel above markdown if a render exists
        let content = "";
        const renderKey = name; // e.g. "button", "context-menu", "sync-flow"
        if ((section === "components" || section === "patterns") && renders[renderKey]) {
          content += `<div class="render-panel">
  <div class="render-panel-header">
    <span class="render-label"><span class="render-dot"></span> Live render</span>
  </div>
  <div class="render-panel-body">
    ${renders[renderKey]}
  </div>
</div>\n`;
        }
        content += markdownHtml;

        const href = `${section}/${name}.html`;
        writeFileSync(join(DIST, section, `${name}.html`), htmlShell(name.replace(/-/g, " "), content, nav, href));
        console.log(`  ✓ ${section}/${name}.html` + (renders[renderKey] ? " (+ live render)" : ""));
      }
    }
  }

  console.log(`\nDone! Open dist/index.html to browse.`);
}

build();
