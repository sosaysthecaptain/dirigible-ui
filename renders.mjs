/**
 * Live HTML renders for every component and pattern page.
 *
 * Each key matches a filename (without .md extension) from components/ or patterns/.
 * The value is raw HTML that gets injected into the page ABOVE the markdown spec,
 * inside a styled "render" panel. These use the same CSS custom properties as
 * the docs shell so they respond to the theme toggle.
 *
 * Icons use actual SVG paths from the Dirigible codebase (Heroicons-style, 24x24 viewBox).
 */

// ─── Icon helpers ──────────────────────────────────────────────────────────

function ico(pathContent, size = 14, sw = 1.5) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">${pathContent}</svg>`;
}

const I = {
  folder: `<path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>`,
  note: `<path stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
  music: `<path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V4.5l-10.5 3v8.553m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"/>`,
  moodboard: `<rect x="2.5" y="2.5" width="8" height="5" rx="1"/><rect x="13.5" y="2.5" width="8" height="8" rx="1"/><rect x="2.5" y="10.5" width="8" height="11" rx="1"/><rect x="13.5" y="13.5" width="8" height="8" rx="1"/>`,
  document: `<path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>`,
  pdf: `<path d="M7 2h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M14 2v5h5"/><rect x="7" y="14" width="10" height="6" rx="1" fill="currentColor" opacity="0.2" stroke="none"/>`,
  "chevron-right": `<path d="M8.25 4.5l7.5 7.5-7.5 7.5"/>`,
  "chevron-down": `<path d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>`,
  plus: `<path d="M12 4.5v15m7.5-7.5h-15"/>`,
  x: `<path d="M6 18L18 6M6 6l12 12"/>`,
  check: `<path d="M4.5 12.75l6 6 9-13.5"/>`,
  search: `<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>`,
  download: `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>`,
  upload: `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>`,
  save: `<path d="M3 5.25A2.25 2.25 0 015.25 3h10.19a2.25 2.25 0 011.59.659l2.56 2.56c.422.422.66.994.66 1.59v10.94A2.25 2.25 0 0118 21H5.25A2.25 2.25 0 013 18.75V5.25z"/><path d="M7.5 3v4.5h6.75V3"/><path d="M7.5 14.25h9v6h-9v-6z"/>`,
  bookmark: `<path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>`,
  clock: `<path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
  "cloud-sync": `<path d="M12 10v6m0 0l3-3m-3 3l-3-3M6.75 19.25a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.5 3.5 0 0118 19.25H6.75z"/>`,
  sync: `<path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>`,
  sun: `<path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>`,
  moon: `<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>`,
  user: `<path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>`,
  "external-link": `<path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>`,
  link: `<path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.674-5.11a4.5 4.5 0 00-6.364-6.364L4.5 8.25"/>`,
  trash: `<path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>`,
  themes: `<path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/>`,
  print: `<path d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659"/>`,
  settings: `<path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`,
  "more-vert": `<path d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" stroke-width="2"/>`,
  copy: `<path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>`,
  edit: `<path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>`,
  "sign-out": `<path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>`,
  image: `<path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM10.5 8.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>`,
};

function icon(name, size = 14) {
  const sw = name === 'note' ? 2 : 1.5;
  return ico(I[name], size, sw);
}

// ─── Shared button helpers ─────────────────────────────────────────────────

const BTN = `font-family:inherit; font-size:13px; border-radius:4px; cursor:pointer; padding:4px 14px;`;
const BTN_PRI = `${BTN} background:var(--fg); color:var(--bg); border:1px solid var(--fg);`;
const BTN_PRI_INV = `onmousedown="this.style.background='var(--bg)';this.style.color='var(--fg)';this.style.border='2px solid var(--fg)'" onmouseup="this.style.background='var(--fg)';this.style.color='var(--bg)';this.style.border='1px solid var(--fg)'" onmouseleave="this.style.background='var(--fg)';this.style.color='var(--bg)';this.style.border='1px solid var(--fg)'"`;
const BTN_SEC = `${BTN} background:transparent; color:var(--fg); border:1px solid var(--border); font-weight:bold;`;
const BTN_SEC_INV = `onmousedown="this.style.background='var(--fg)';this.style.color='var(--bg)'" onmouseup="this.style.background='transparent';this.style.color='var(--fg)'" onmouseleave="this.style.background='transparent';this.style.color='var(--fg)'"`;
const BTN_DNG = `${BTN} background:transparent; color:var(--danger); border:1px solid var(--border); font-weight:bold;`;
const BTN_DNG_INV = `onmousedown="this.style.background='var(--danger)';this.style.color='#fff'" onmouseup="this.style.background='transparent';this.style.color='var(--danger)'" onmouseleave="this.style.background='transparent';this.style.color='var(--danger)'"`;


export const renders = {

  // ─── COMPONENTS ─────────────────────────────────────────────────────────

  button: `
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <button style="${BTN_PRI}" ${BTN_PRI_INV}>Choose folder</button>
      <button style="${BTN_SEC}" ${BTN_SEC_INV}>Cancel</button>
      <button style="${BTN_DNG}" ${BTN_DNG_INV}>Delete</button>
      <button style="${BTN} background:transparent; color:var(--fg); border:none; text-decoration:underline; text-decoration-color:var(--border);">Import from backup</button>
    </div>
    <div style="margin-top:16px; display:flex; gap:8px; align-items:center;">
      <button style="${BTN_PRI} opacity:0.5; pointer-events:none;">Disabled primary</button>
      <button style="${BTN_SEC} opacity:0.5; pointer-events:none;">Disabled secondary</button>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Primary (inverts on click, 2px border when inverted) · Secondary bold (inverts on click) · Danger = secondary bold + red text (inverts red on click) · Text-only · Disabled states · All borders 1px (primary invert: 2px)</p>
  `,

  input: `
    <div style="display:flex; flex-direction:column; gap:16px; max-width:400px;">
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Full name</label>
        <input type="text" placeholder="Placeholder text..." style="font-family:inherit; font-size:14px; padding:6px 8px; border:2px solid var(--border); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'" />
      </div>
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">URL slug</label>
        <div style="display:flex; align-items:center; border:2px solid var(--border); border-radius:4px; overflow:hidden;">
          <span style="padding:6px 8px; font-size:13px; color:var(--muted); background:var(--hover); border-right:1px solid var(--border); white-space:nowrap;">sosaysthecaptain.dirigible.app/</span>
          <input type="text" value="aconitum-napellus" style="font-family:inherit; font-size:14px; padding:6px 8px; border:none; background:var(--bg); color:var(--fg); flex:1; outline:none;" />
        </div>
      </div>
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Search</label>
        <div style="display:flex; align-items:center; border:2px solid var(--border); border-radius:4px; overflow:hidden;">
          <span style="padding:6px 8px; color:var(--muted); display:flex;">${icon('search')}</span>
          <input type="text" placeholder="Search..." style="font-family:inherit; font-size:14px; padding:6px 8px; border:none; background:var(--bg); color:var(--fg); flex:1; outline:none;" />
        </div>
      </div>
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">With error</label>
        <input type="text" value="bad-value" style="font-family:inherit; font-size:14px; padding:6px 8px; border:2px solid var(--danger); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none;" />
        <span style="font-size:11px; color:var(--danger); margin-top:2px; display:block;">This field is required</span>
      </div>
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Excerpt</label>
        <textarea placeholder="Custom excerpt for post listings..." rows="3" style="font-family:inherit; font-size:14px; padding:6px 8px; border:2px solid var(--border); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none; resize:vertical;"></textarea>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Focus border: var(--accent) (blue #0066cc light / #6ba3d6 dark) · Error border: var(--danger) · 2px borders on all inputs · 4px border-radius</p>
  `,

  toggle: `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:40px; height:22px; border-radius:9999px; background:#3b82f6; position:relative; cursor:pointer;">
          <div style="width:16px; height:16px; border-radius:9999px; background:#fff; position:absolute; top:3px; right:3px; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></div>
        </div>
        <span>Include in site</span>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:40px; height:22px; border-radius:9999px; background:#d1d5db; position:relative; cursor:pointer;">
          <div style="width:16px; height:16px; border-radius:9999px; background:#fff; position:absolute; top:3px; left:3px; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></div>
        </div>
        <span style="color:var(--muted);">Disabled feature</span>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Track on: #3b82f6 (blue — not accent) · Track off: #d1d5db · Size: 40x22, circle 16px · Pill shape: border-radius 9999px</p>
  `,

  "radio-button": `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Radio group (single selection)</p>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:13px;">
            <span style="width:16px; height:16px; border-radius:50%; border:2px solid var(--accent); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <span style="width:8px; height:8px; border-radius:50%; background:var(--accent);"></span>
            </span>
            Monospace
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:13px;">
            <span style="width:16px; height:16px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; flex-shrink:0;"></span>
            Serif
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:13px;">
            <span style="width:16px; height:16px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; flex-shrink:0;"></span>
            Sans
          </label>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Radio group (horizontal, card-style)</p>
        <div style="display:flex; gap:8px;">
          <div style="flex:1; padding:12px; border:2px solid var(--accent); border-radius:4px; cursor:pointer; background:color-mix(in srgb, var(--accent) 8%, var(--bg));">
            <div style="font-size:13px; font-weight:600; margin-bottom:2px; display:flex; align-items:center; gap:6px;">${icon('note')} Blog</div>
            <div style="font-size:11px; color:var(--muted);">Posts by date</div>
          </div>
          <div style="flex:1; padding:12px; border:1px solid var(--border); border-radius:4px; cursor:pointer;">
            <div style="font-size:13px; font-weight:600; margin-bottom:2px; display:flex; align-items:center; gap:6px;">${icon('document')} Wiki</div>
            <div style="font-size:11px; color:var(--muted);">Folder hierarchy</div>
          </div>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Disabled state</p>
        <label style="display:flex; align-items:center; gap:8px; cursor:not-allowed; font-size:13px; opacity:0.5;">
          <span style="width:16px; height:16px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; flex-shrink:0;"></span>
          Unavailable option
        </label>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Circle: 16px, 2px border · Selected: accent border + 8px filled dot · Card variant: 2px accent border + tinted bg · Used in publish modal (Blog/Wiki), font theme selector</p>
  `,

  "image-uploader": `
    <div style="display:flex; flex-direction:column; gap:20px; max-width:400px;">
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Empty state (drop zone)</p>
        <div style="border:2px dashed var(--border); border-radius:4px; padding:32px; text-align:center; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px;" onmouseover="this.style.borderColor='var(--accent)';this.style.background='color-mix(in srgb, var(--accent) 4%, var(--bg))'" onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <span style="color:var(--muted); display:flex;">${icon('image', 24)}</span>
          <span style="font-size:13px; color:var(--muted);">Drop image here or click to browse</span>
          <span style="font-size:11px; color:var(--muted);">PNG, JPG, WebP · Max 5 MB</span>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">With preview (cover image)</p>
        <div style="border:1px solid var(--border); border-radius:4px; overflow:hidden;">
          <div style="height:120px; background:linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, var(--bg)), color-mix(in srgb, var(--success) 20%, var(--bg))); display:flex; align-items:center; justify-content:center;">
            <span style="color:var(--muted); display:flex;">${icon('image', 32)}</span>
          </div>
          <div style="padding:8px; display:flex; align-items:center; justify-content:space-between; font-size:12px;">
            <span style="color:var(--muted);">cover-image.webp · 245 KB</span>
            <div style="display:flex; gap:4px;">
              <button style="font-family:inherit; font-size:11px; padding:2px 8px; background:transparent; color:var(--fg); border:1px solid var(--border); border-radius:3px; cursor:pointer;">Replace</button>
              <button style="font-family:inherit; font-size:11px; padding:2px 8px; background:transparent; color:var(--danger); border:1px solid var(--border); border-radius:3px; cursor:pointer;">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Uploading state</p>
        <div style="border:1px solid var(--border); border-radius:4px; padding:12px; display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:14px; height:14px; border:3px solid var(--fg); border-top-color:transparent; border-radius:50%; animation:dg-spin 1s linear infinite;"></span>
          <span style="font-size:12px; flex:1;">Uploading photo-001.jpg...</span>
          <span style="font-size:11px; color:var(--muted);">72%</span>
        </div>
      </div>
    </div>
    <style>@keyframes dg-spin { to { transform: rotate(360deg); } }</style>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Dashed 2px border on drop zone · Accent border on hover/dragover · Used for: cover images, moodboard photos, album art · Converts to WebP · Generates thumbnails via canvas</p>
  `,

  modal: `
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Publication modal (with underline tabs)</p>
    <div style="position:relative; background:rgba(0,0,0,0.3); border-radius:4px; padding:40px; display:flex; align-items:center; justify-content:center; min-height:380px;">
      <div style="background:var(--bg); border-radius:4px; box-shadow:0 4px 24px rgba(0,0,0,0.15); width:100%; max-width:448px; overflow:hidden; display:flex; flex-direction:column;">
        <div style="padding:12px 12px 0; display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:18px; font-weight:600;">Publish</span>
          <button style="font-family:inherit; background:none; border:none; cursor:pointer; color:var(--muted); padding:4px; display:flex;">${icon('x', 16)}</button>
        </div>
        <div style="padding:0 12px 20px; flex:1;">
          <div style="display:flex; gap:0; border-bottom:2px solid var(--border); margin-bottom:16px;">
            <span style="padding:8px 12px; font-size:13px; border-bottom:2px solid var(--accent); margin-bottom:-2px; color:var(--accent); cursor:pointer;">Blog</span>
            <span style="padding:8px 12px; font-size:13px; color:var(--muted); cursor:pointer;">Wiki</span>
          </div>
          <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Site title</label>
          <input type="text" value="Botanical Journal" style="font-family:inherit; font-size:14px; padding:6px 8px; border:2px solid var(--border); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none; margin-bottom:12px;" />
          <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">URL</label>
          <div style="display:flex; align-items:center; border:2px solid var(--border); border-radius:4px; overflow:hidden;">
            <span style="padding:6px 8px; font-size:12px; color:var(--muted); background:var(--hover); border-right:1px solid var(--border); white-space:nowrap;">sosaysthecaptain.dirigible.app/</span>
            <input type="text" value="demo-botany" style="font-family:inherit; font-size:14px; padding:6px 8px; border:none; background:var(--bg); color:var(--fg); flex:1; outline:none;" />
          </div>
        </div>
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:8px; padding:12px;">
          <button style="${BTN_SEC}" ${BTN_SEC_INV}>Cancel</button>
          <button style="${BTN_PRI}" ${BTN_PRI_INV}>Publish</button>
        </div>
      </div>
    </div>

    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-top:24px; margin-bottom:12px;">Modal with left sidebar panel (themes / appearance)</p>
    <div style="position:relative; background:rgba(0,0,0,0.3); border-radius:4px; padding:40px; display:flex; align-items:center; justify-content:center; min-height:360px;">
      <div style="background:var(--bg); border-radius:4px; box-shadow:0 4px 24px rgba(0,0,0,0.15); width:100%; max-width:560px; overflow:hidden; display:flex; flex-direction:column;">
        <div style="padding:12px 12px 0; display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:18px; font-weight:600;">Themes</span>
          <button style="font-family:inherit; background:none; border:none; cursor:pointer; color:var(--muted); padding:4px; display:flex;">${icon('x', 16)}</button>
        </div>
        <div style="display:flex; flex:1; min-height:260px;">
          <div style="width:180px; border-right:1px solid var(--border); padding:8px 0; overflow-y:auto;">
            <div style="padding:2px 12px; font-size:11px; color:var(--muted); text-transform:uppercase;">Light</div>
            <div style="display:flex; align-items:center; gap:8px; padding:4px 12px; font-size:13px; background:color-mix(in srgb, var(--accent) 15%, transparent); color:var(--accent);">
              <div style="width:14px; height:14px; border-radius:3px; background:#f0eeeb; border:1.5px solid #ccc; flex-shrink:0;"></div>
              Dirigible Light
            </div>
            <div style="display:flex; align-items:center; gap:8px; padding:4px 12px; font-size:13px; cursor:pointer;">
              <div style="width:14px; height:14px; border-radius:3px; background:#f0f0f0; border:1.5px solid #d0d0d0; flex-shrink:0;"></div>
              Alabaster
            </div>
            <div style="padding:2px 12px; font-size:11px; color:var(--muted); text-transform:uppercase; margin-top:6px;">Dark</div>
            <div style="display:flex; align-items:center; gap:8px; padding:4px 12px; font-size:13px; cursor:pointer;">
              <div style="width:14px; height:14px; border-radius:3px; background:#302e2b; border:1.5px solid #1a1918; flex-shrink:0;"></div>
              Dirigible Dark
            </div>
            <div style="display:flex; align-items:center; gap:8px; padding:4px 12px; font-size:13px; cursor:pointer;">
              <div style="width:14px; height:14px; border-radius:3px; background:#1e1008; border:1.5px solid #0d0a04; flex-shrink:0;"></div>
              Amber Terminal
            </div>
            <div style="display:flex; align-items:center; gap:8px; padding:4px 12px; font-size:13px; cursor:pointer;">
              <div style="width:14px; height:14px; border-radius:3px; background:#0d1a0d; border:1.5px solid #091209; flex-shrink:0;"></div>
              Green Terminal
            </div>
            <div style="display:flex; align-items:center; gap:8px; padding:4px 12px; font-size:13px; cursor:pointer;">
              <div style="width:14px; height:14px; border-radius:3px; background:#1e1e2e; border:1.5px solid #11111b; flex-shrink:0;"></div>
              Catppuccin Mocha
            </div>
            <div style="padding:2px 12px; font-size:11px; color:var(--muted);">... 16 more</div>
          </div>
          <div style="flex:1; padding:16px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; gap:0; border-bottom:2px solid var(--border);">
              <span style="padding:6px 12px; font-size:13px; border-bottom:2px solid var(--accent); margin-bottom:-2px; color:var(--accent);">Swatches</span>
              <span style="padding:6px 12px; font-size:13px; color:var(--muted); cursor:pointer;">CSS</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px;">
              ${[
                ["var(--bg)", "bg"], ["var(--fg)", "fg"], ["var(--accent)", "accent"], ["var(--muted)", "muted"],
                ["var(--border)", "border"], ["var(--sidebar-bg)", "sidebar"], ["var(--hover)", "hover"], ["var(--success)", "success"],
                ["var(--warning)", "warning"], ["var(--danger)", "danger"], ["var(--link)", "link"], ["var(--code-bg)", "code-bg"],
              ].map(([c, l]) => `<div style="display:flex;flex-direction:column;gap:2px;"><div style="height:24px;border-radius:0;border:1px solid var(--border);background:${c};"></div><span style="font-size:9px;color:var(--muted);">${l}</span></div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>

    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-top:24px; margin-bottom:12px;">Confirm dialog (simple)</p>
    <div style="position:relative; background:rgba(0,0,0,0.3); border-radius:4px; padding:40px; display:flex; align-items:center; justify-content:center;">
      <div style="background:var(--bg); border-radius:4px; box-shadow:0 4px 24px rgba(0,0,0,0.15); width:100%; max-width:384px; overflow:hidden; display:flex; flex-direction:column;">
        <div style="padding:12px 12px 16px;">
          <span style="font-size:18px; font-weight:600;">Delete note?</span>
        </div>
        <div style="padding:0 12px 20px; font-size:14px; line-height:22px; color:var(--fg);">
          This will permanently delete "Aconitum napellus". This action cannot be undone.
        </div>
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:8px; padding:12px;">
          <button style="${BTN_SEC}" ${BTN_SEC_INV}>Cancel</button>
          <button style="${BTN_DNG}" ${BTN_DNG_INV}>Delete</button>
        </div>
      </div>
    </div>

    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-top:24px; margin-bottom:12px;">Sync modal (informational + action)</p>
    <div style="position:relative; background:rgba(0,0,0,0.3); border-radius:4px; padding:40px; display:flex; align-items:center; justify-content:center;">
      <div style="background:var(--bg); border-radius:4px; box-shadow:0 4px 24px rgba(0,0,0,0.15); width:100%; max-width:448px; overflow:hidden; display:flex; flex-direction:column;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 12px 16px;">
          <div style="display:flex; align-items:center; gap:8px; font-size:18px; font-weight:600;">
            ${icon('cloud-sync', 18)} Sync to Local Folder
          </div>
          <button style="font-family:inherit; background:none; border:none; cursor:pointer; color:var(--muted); padding:4px; display:flex;">${icon('x', 16)}</button>
        </div>
        <div style="padding:0 12px 20px; font-size:14px; line-height:22px;">
          <p style="margin-bottom:12px;">Export your Dirigible library to a folder on your computer.</p>
          <ul style="padding-left:20px; font-size:13px; line-height:20px;">
            <li style="margin-bottom:4px;">Notes saved as .md (Markdown) files</li>
            <li style="margin-bottom:4px;">Albums saved as folders of images + metadata</li>
            <li style="margin-bottom:4px;">Music keeps artist/album structure</li>
            <li>Subsequent syncs only update what changed</li>
          </ul>
        </div>
        <div style="display:flex; align-items:center; justify-content:flex-end; gap:8px; padding:12px;">
          <button style="${BTN} background:transparent; color:var(--muted); border:none; text-decoration:underline; margin-right:auto;">Import from backup</button>
          <button style="${BTN_SEC}" ${BTN_SEC_INV}>Cancel</button>
          <button style="${BTN_PRI}" ${BTN_PRI_INV}>Choose folder</button>
        </div>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">All modals: 4px border-radius · max-width 28rem (448px) · No divider above footer buttons · Footer right-aligned gap:8px · Backdrop rgba(0,0,0,0.4) blur(2px) · 150ms ease-out scale from 0.95 · Left sidebar variant for themes/appearance</p>
  `,

  popover: `
    <div style="position:relative; display:inline-block;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span style="font-size:14px; font-weight:600;">Aconitum napellus — Monkshood</span>
        <span style="display:inline-flex; align-items:center; gap:4px; background:#22c55e; color:#fff; font-size:11px; padding:2px 8px; border-radius:9999px; cursor:pointer;">${icon('check', 10)} Published &#9662;</span>
      </div>
      <div style="position:relative; left:200px; background:var(--bg); border:1px solid var(--border); border-radius:6px; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:16px; width:320px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <span>Include in site</span>
          <div style="width:40px; height:22px; border-radius:9999px; background:#3b82f6; position:relative; cursor:pointer;">
            <div style="width:16px; height:16px; border-radius:9999px; background:#fff; position:absolute; top:3px; right:3px; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></div>
          </div>
        </div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">URL Slug</label>
        <div style="display:flex; align-items:center; border:2px solid var(--border); border-radius:4px; margin-bottom:12px; overflow:hidden;">
          <span style="padding:4px 6px; font-size:11px; color:var(--muted); background:var(--hover); border-right:1px solid var(--border); white-space:nowrap;">sosaysthecaptain.dirigible.app/demo-botany/</span>
          <input type="text" value="aconitum-napellus-mon..." style="font-family:inherit; font-size:13px; padding:4px 6px; border:none; background:var(--bg); color:var(--fg); flex:1; outline:none; min-width:0;" />
        </div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Cover Image</label>
        <div style="border:2px dashed var(--border); border-radius:4px; padding:20px; text-align:center; color:var(--muted); font-size:13px; margin-bottom:12px; cursor:pointer;">Upload cover image</div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Excerpt</label>
        <textarea placeholder="Custom excerpt for post listings..." rows="2" style="font-family:inherit; font-size:13px; padding:6px 8px; border:2px solid var(--border); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none; resize:vertical; margin-bottom:8px;"></textarea>
        <a href="#" style="font-size:13px; color:var(--link); text-decoration:underline; display:flex; align-items:center; gap:4px;">${icon('external-link', 12)} Copy URL</a>
      </div>
    </div>
  `,

  "context-menu": `
    <div style="display:inline-block; background:var(--bg); border:1px solid var(--border); border-radius:6px; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:4px 0; min-width:220px;">
      <div style="padding:4px 12px; font-size:11px; text-transform:uppercase; color:var(--muted);">Theme</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; justify-content:center; color:var(--muted);">Aa</span> Monospace <span style="margin-left:auto; color:var(--accent);">${icon('check', 12)}</span></div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; justify-content:center; color:var(--muted); font-family:'Crimson Pro',serif; font-style:italic;">Aa</span> Serif</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; justify-content:center; color:var(--muted); font-family:'IBM Plex Sans',sans-serif;">Aa</span> Sans</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; justify-content:center; color:var(--muted);">#</span> Raw</div>
      <div style="border-top:1px solid var(--border); margin:4px 0;"></div>
      <div style="padding:4px 12px; font-size:12px; display:flex; justify-content:space-between; color:var(--muted);"><span>Words</span><span style="color:var(--fg);">1,065</span></div>
      <div style="padding:4px 12px; font-size:12px; display:flex; justify-content:space-between; color:var(--muted);"><span>Characters</span><span style="color:var(--fg);">7,147</span></div>
      <div style="padding:4px 12px; font-size:12px; display:flex; justify-content:space-between; color:var(--muted);"><span>Size</span><span style="color:var(--fg);">7.0 KB</span></div>
      <div style="padding:4px 12px; font-size:12px; display:flex; justify-content:space-between; color:var(--muted);"><span>Created</span><span style="color:var(--fg);">Feb 27, 2026</span></div>
      <div style="padding:4px 12px; font-size:12px; display:flex; justify-content:space-between; color:var(--muted);"><span>Modified</span><span style="color:var(--fg);">Feb 28, 2026</span></div>
      <div style="border-top:1px solid var(--border); margin:4px 0;"></div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('bookmark', 12)}</span> Bookmark</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('download', 12)}</span> Download</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('print', 12)}</span> Print</div>
      <div style="border-top:1px solid var(--border); margin:4px 0;"></div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('note', 12)}</span> Publication</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('external-link', 12)}</span> Visit site</div>
      <div style="border-top:1px solid var(--border); margin:4px 0;"></div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('save', 12)}</span> Save version</div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px;"><span style="width:14px; display:flex; color:var(--muted);">${icon('clock', 12)}</span> Version history</div>
      <div style="border-top:1px solid var(--border); margin:4px 0;"></div>
      <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; cursor:pointer; font-size:13px; color:var(--danger);"><span style="width:14px; display:flex;">${icon('trash', 12)}</span> Delete</div>
    </div>
  `,

  table: `
    <style>
      .dg-table { width:100%; border-collapse:collapse; font-family:'Lucida Grande','Lucida Sans Unicode','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; }
      .dg-table th { text-align:left; padding:3px 6px; font-weight:600; border-bottom:1px solid var(--border); height:24px; cursor:pointer; white-space:nowrap; font-size:11px; position:relative; }
      .dg-table th:hover { background:var(--hover); }
      .dg-table td { padding:0 6px; border-bottom:none; vertical-align:middle; height:18px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; border-right:1px solid color-mix(in srgb, var(--border) 50%, transparent); }
      .dg-table td:last-child { border-right:none; }
      .dg-table tr:hover td { background:var(--hover); }
      .dg-table tr.dg-selected td { background:color-mix(in srgb, #0066cc 15%, var(--bg)); }
      .dg-table tr.dg-alt td { background:var(--sidebar-bg); }
      .dg-hdr-menu { display:none; position:absolute; right:4px; top:50%; transform:translateY(-50%); font-size:10px; color:var(--muted); cursor:pointer; }
      .dg-table th:hover .dg-hdr-menu { display:block; }
    </style>
    <div style="overflow-x:auto;">
      <table class="dg-table">
        <thead>
          <tr>
            <th style="width:28px; text-align:center;">#</th>
            <th style="min-width:180px;">Title <svg width="8" height="8" viewBox="0 0 10 6" fill="currentColor" style="margin-left:4px;opacity:0.5;"><path d="M0 6l5-6 5 6z"/></svg> <span class="dg-hdr-menu">&#9662;</span></th>
            <th style="min-width:140px;">Artist <span class="dg-hdr-menu">&#9662;</span></th>
            <th style="min-width:160px;">Album <span class="dg-hdr-menu">&#9662;</span></th>
            <th style="width:44px; text-align:right;">Year <span class="dg-hdr-menu">&#9662;</span></th>
            <th style="width:48px; text-align:right;">Time</th>
            <th style="width:50px; text-align:right;">Size</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="text-align:center;">1</td><td>Astronaut</td><td>Amanda Palmer</td><td>Who Killed Amanda Palmer</td><td style="text-align:right;">2008</td><td style="text-align:right;">4:37</td><td style="text-align:right;">8.6 MB</td></tr>
          <tr class="dg-alt"><td style="text-align:center;">2</td><td>Runs in the Family</td><td>Amanda Palmer</td><td>Who Killed Amanda Palmer</td><td style="text-align:right;">2008</td><td style="text-align:right;">2:44</td><td style="text-align:right;">5.1 MB</td></tr>
          <tr class="dg-selected"><td style="text-align:center;">3</td><td>Ampersand</td><td>Amanda Palmer</td><td>Who Killed Amanda Palmer</td><td style="text-align:right;">2008</td><td style="text-align:right;">5:58</td><td style="text-align:right;">11.0 MB</td></tr>
          <tr class="dg-selected"><td style="text-align:center;">4</td><td>Coin-Operated Boy</td><td>Amanda Palmer</td><td>Who Killed Amanda Palmer</td><td style="text-align:right;">2008</td><td style="text-align:right;">4:24</td><td style="text-align:right;">8.1 MB</td></tr>
          <tr class="dg-alt"><td style="text-align:center;">1</td><td>I Saw Her Standing There</td><td>The Beatles</td><td>Please Please Me</td><td style="text-align:right;">1963</td><td style="text-align:right;">2:55</td><td style="text-align:right;">4.5 MB</td></tr>
          <tr><td style="text-align:center;">2</td><td>Misery</td><td>The Beatles</td><td>Please Please Me</td><td style="text-align:right;">1963</td><td style="text-align:right;">1:50</td><td style="text-align:right;">2.8 MB</td></tr>
          <tr class="dg-alt"><td style="text-align:center;">3</td><td>Anna (Go to Him)</td><td>The Beatles</td><td>Please Please Me</td><td style="text-align:right;">1963</td><td style="text-align:right;">2:57</td><td style="text-align:right;">4.7 MB</td></tr>
        </tbody>
      </table>
      <div style="padding:8px 6px; font-size:11px; color:var(--muted); border-top:1px solid var(--border); font-family:'Lucida Grande','Lucida Sans Unicode','Helvetica Neue',Helvetica,Arial,sans-serif;">2,189 songs &middot; 5d 15h 5m &middot; 13.8 GB</div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Technology: TanStack React Table + row virtualization · Font: Lucida Grande 11px · Row height: 18px · Selected: #0066cc at 15% (rows 3-4) · Header menu &#9662; on hover · Multi-select: click, cmd+click, shift+click · Alternating rows use sidebar-bg · Inline editing on slow second-click</p>
  `,

  sidebar: `
    <div style="display:flex; gap:0; height:420px; border:1px solid var(--border); border-radius:6px; overflow:hidden;">
      <div style="width:210px; min-width:210px; background:var(--sidebar-bg); border-right:1px solid var(--border); display:flex; flex-direction:column; font-size:13px;">
        <div style="padding:8px 12px; height:40px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between;">
          <span style="font-weight:600; font-size:14px;">Dirigible</span>
        </div>
        <div style="padding:6px 8px; display:flex; align-items:center; gap:4px;">
          <div style="display:flex; align-items:center; border:2px solid var(--border); border-radius:4px; padding:2px 6px; flex:1;">
            <span style="color:var(--muted); display:flex; margin-right:4px;">${icon('search', 12)}</span>
            <span style="font-size:12px; color:var(--muted);">Search...</span>
          </div>
          <button style="background:none; border:none; cursor:pointer; color:var(--muted); display:flex; padding:4px;">${icon('plus', 14)}</button>
        </div>
        <div style="flex:1; overflow-y:auto; padding:2px 0; font-size:13px; position:relative;">
          <!-- Expanded folder with chevron -->
          <div style="padding:2px 8px; display:flex; align-items:center; gap:4px; background:color-mix(in srgb, var(--accent) 15%, transparent); color:var(--accent);">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style="flex-shrink:0; transform:rotate(90deg); transition:transform 0.15s;"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
            ${icon('folder', 14)} demo-botany
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success); margin-left:auto;"></span>
          </div>
          <!-- Children with indent + vertical guide line -->
          <div style="position:relative;">
            <div style="position:absolute; top:0; bottom:0; left:23px; width:1px; background:var(--border);"></div>
            <div style="padding:2px 8px 2px 32px; display:flex; align-items:center; gap:4px;">${icon('note', 14)} Aconitum napellus <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success); margin-left:auto;"></span></div>
            <div style="padding:2px 8px 2px 32px; display:flex; align-items:center; gap:4px;">${icon('note', 14)} Aloe vera <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success); margin-left:auto;"></span></div>
            <div style="padding:2px 8px 2px 32px; display:flex; align-items:center; gap:4px;">${icon('note', 14)} Camellia sinensis <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success); margin-left:auto;"></span></div>
          </div>
          <!-- Collapsed folders -->
          <div style="padding:2px 8px; display:flex; align-items:center; gap:4px; cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style="flex-shrink:0;"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
            ${icon('folder', 14)} demo-dirigibles <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success); margin-left:auto;"></span>
          </div>
          <div style="padding:2px 8px; display:flex; align-items:center; gap:4px; cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style="flex-shrink:0;"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
            ${icon('folder', 14)} Wiki <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success); margin-left:auto;"></span>
          </div>
          <div style="padding:2px 8px; display:flex; align-items:center; gap:4px; cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style="flex-shrink:0;"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
            ${icon('music', 14)} music
          </div>
          <div style="padding:2px 8px; display:flex; align-items:center; gap:4px; cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style="flex-shrink:0;"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
            ${icon('moodboard', 14)} photos
          </div>
        </div>
        <!-- Bottom bar -->
        <div style="padding:6px 8px; border-top:1px solid var(--border); display:flex; align-items:center; gap:2px;">
          <button style="background:none; border:none; cursor:pointer; color:var(--muted); padding:6px; border-radius:4px; display:flex;" title="Sync to folder">${icon('cloud-sync', 14)}</button>
          <span style="flex:1;"></span>
          <button style="background:none; border:none; cursor:pointer; color:var(--muted); padding:6px; border-radius:4px; display:flex;" title="Themes">${icon('themes', 14)}</button>
          <button style="background:none; border:none; cursor:pointer; color:var(--muted); padding:6px; border-radius:4px; display:flex;" title="Toggle dark mode">${icon('moon', 14)}</button>
          <button style="background:none; border:none; cursor:pointer; color:var(--muted); padding:6px; border-radius:4px; display:flex;" title="Account">${icon('user', 14)}</button>
        </div>
      </div>
      <div style="flex:1; padding:16px; color:var(--muted); display:flex; align-items:center; justify-content:center; font-size:13px;">Content area</div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Chevron rotates 90deg on expand · Indent: 12px/level + 8px base · Vertical guide line connects children · Icons: 14px Heroicons-style SVG · Bottom bar: sync, themes, dark mode, account · Sidebar resizable, collapsible to icon column</p>
  `,

  breadcrumb: `
    <div style="border:1px solid var(--border); border-radius:6px; overflow:hidden;">
      <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-bottom:1px solid var(--border); font-size:13px;">
        <div style="display:flex; align-items:center; gap:4px;">
          <span style="color:var(--muted); cursor:pointer; display:flex;">${icon('plus', 14)}</span>
          <a href="#" style="color:var(--muted); text-decoration:none;">all</a>
          <span style="color:var(--muted);">&rsaquo;</span>
          <a href="#" style="color:var(--muted); text-decoration:none;">demo-botany</a>
          <span style="color:var(--muted);">&rsaquo;</span>
          <span style="font-weight:600;">Aconitum napellus — Monkshood</span>
          <span style="color:var(--muted); cursor:pointer; margin-left:4px; display:flex;">${icon('more-vert', 14)}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-flex; align-items:center; gap:4px; background:#22c55e; color:#fff; font-size:11px; padding:2px 8px; border-radius:9999px; cursor:pointer;">${icon('check', 10)} Published &#9662;</span>
          <span style="color:var(--muted); font-size:12px;">Mar 15, 1872</span>
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--link);"></span>
        </div>
      </div>
      <div style="padding:24px; font-size:14px; color:var(--muted);">Note content would appear here...</div>
    </div>
  `,

  badge: `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Published badge</p>
        <span style="display:inline-flex; align-items:center; gap:4px; background:#22c55e; color:#fff; font-size:11px; padding:2px 10px; border-radius:9999px; cursor:pointer;">${icon('check', 10)} Published &#9662;</span>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Status dots</p>
        <div style="display:flex; gap:16px; align-items:center; font-size:13px;">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;margin-right:4px;"></span> Published</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f59e0b;margin-right:4px;"></span> Modified</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#dc2626;margin-right:4px;"></span> Error</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--link);margin-right:4px;"></span> Active</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--fg);margin-right:4px;"></span> Bookmarked</span>
        </div>
      </div>
    </div>
  `,

  "tag-input": `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Tag display (inline badges, 12 pastel colors)</p>
        <div style="display:flex; flex-wrap:wrap; gap:4px;">
          <span style="display:inline-flex; align-items:center; gap:4px; background:rgba(245,158,11,0.15); color:#b45309; border-radius:4px; padding:2px 8px; font-size:12px;">botany <span style="cursor:pointer; opacity:0.6;">&times;</span></span>
          <span style="display:inline-flex; align-items:center; gap:4px; background:rgba(34,197,94,0.15); color:#15803d; border-radius:4px; padding:2px 8px; font-size:12px;">medicinal <span style="cursor:pointer; opacity:0.6;">&times;</span></span>
          <span style="display:inline-flex; align-items:center; gap:4px; background:rgba(168,85,247,0.15); color:#7c3aed; border-radius:4px; padding:2px 8px; font-size:12px;">poisonous <span style="cursor:pointer; opacity:0.6;">&times;</span></span>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Tag popover (two-panel system)</p>
        <div style="display:flex; gap:0;">
          <div style="width:250px; background:var(--bg); border:1px solid var(--border); border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
            <div style="padding:8px;">
              <input type="text" placeholder="Search or create tag..." style="font-family:inherit; font-size:13px; border:2px solid var(--border); border-radius:4px; padding:4px 8px; background:var(--bg); color:var(--fg); width:100%; outline:none;" />
            </div>
            <div style="max-height:200px; overflow-y:auto;">
              ${[
                ["rgba(245,158,11,0.6)", "botany", true],
                ["rgba(34,197,94,0.6)", "medicinal", true],
                ["rgba(168,85,247,0.6)", "poisonous", true],
                ["rgba(14,165,233,0.6)", "perennial", false],
                ["rgba(244,63,94,0.6)", "european", false],
              ].map(([c, n, chk]) => `<div style="display:flex; align-items:center; gap:8px; padding:4px 12px; cursor:pointer; font-size:13px;">
                <input type="checkbox" ${chk ? 'checked' : ''} style="accent-color:#0066cc;" />
                <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${c};"></span>
                ${n}
                <span style="margin-left:auto; cursor:pointer; color:var(--muted); font-size:16px;">&hellip;</span>
              </div>`).join("")}
            </div>
          </div>
          <div style="width:200px; background:var(--bg); border:1px solid var(--border); border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); margin-left:-1px; padding:12px; display:flex; flex-direction:column; gap:8px;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--muted);">Rename</label>
            <input type="text" value="botany" style="font-family:inherit; font-size:13px; border:2px solid var(--border); border-radius:4px; padding:4px 8px; background:var(--bg); color:var(--fg); width:100%; outline:none;" />
            <label style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-top:4px;">Color</label>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:4px;">
              ${[
                ["rgba(245,158,11,0.6)", true], ["rgba(34,197,94,0.6)", false], ["rgba(14,165,233,0.6)", false], ["rgba(168,85,247,0.6)", false],
                ["rgba(244,63,94,0.6)", false], ["rgba(20,184,166,0.6)", false], ["rgba(249,115,22,0.6)", false], ["rgba(99,102,241,0.6)", false],
                ["rgba(236,72,153,0.6)", false], ["rgba(6,182,212,0.6)", false], ["rgba(132,204,22,0.6)", false], ["rgba(156,163,175,0.6)", false],
              ].map(([c, sel]) => `<div style="width:24px;height:24px;border-radius:4px;background:${c};cursor:pointer;border:2px solid ${sel ? '#0066cc' : 'transparent'};"></div>`).join("")}
            </div>
            <button style="font-family:inherit; font-size:12px; color:var(--danger); background:none; border:none; cursor:pointer; text-align:left; margin-top:4px;">Delete tag everywhere</button>
          </div>
        </div>
      </div>
    </div>
  `,

  toast: `
    <div style="display:flex; flex-direction:column; gap:12px; max-width:400px; margin-left:auto;">
      <div style="background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px; font-size:13px;">
            <span style="display:inline-block; width:14px; height:14px; border:3px solid var(--fg); border-top-color:transparent; border-radius:50%; animation:dg-spin 1s linear infinite;"></span>
            Syncing to local folder...
          </div>
          <span style="color:var(--muted); cursor:pointer; font-size:11px;">&times;</span>
        </div>
        <div style="height:4px; background:var(--border); overflow:hidden;">
          <div style="height:100%; width:65%; background:var(--fg);"></div>
        </div>
        <span style="font-size:11px; color:var(--muted);">1,423 of 2,189 items</span>
      </div>
      <div style="background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; padding:12px 16px; display:flex; align-items:center; gap:8px; font-size:13px;">
        <span style="color:#22c55e; display:flex;">${icon('check', 14)}</span> Sync complete — 2,189 items exported
      </div>
      <div style="background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; padding:12px 16px; display:flex; align-items:center; gap:8px; font-size:13px;">
        <span style="color:#dc2626; display:flex;">${icon('x', 14)}</span> Sync failed — disk full
        <span style="color:var(--muted); cursor:pointer; font-size:11px; margin-left:auto;">&times;</span>
      </div>
      <div style="background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; padding:12px 16px; display:flex; align-items:center; gap:8px; font-size:13px;">
        <span style="color:#f59e0b;">&#9888;</span> Large collection — sync may take a while
      </div>
    </div>
    <style>@keyframes dg-spin { to { transform: rotate(360deg); } }</style>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Border-radius: 4px (square-ish) · Progress bar: var(--foreground) fill, no rounded corners · Spinner: 3px border, foreground color, transparent top · Background: sidebar-bg</p>
  `,

  icon: `
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">All icons are Heroicons-style inline SVGs · viewBox 0 0 24 24 · stroke-width 1.5 (note icon: 2) · Default size: 14px (w-3.5 h-3.5)</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(120px, 1fr)); gap:8px;">
      ${[
        ["folder", "folder"],
        ["note", "note"],
        ["music", "music"],
        ["moodboard", "moodboard"],
        ["document", "document"],
        ["pdf", "pdf"],
        ["search", "search"],
        ["plus", "plus"],
        ["x", "x-close"],
        ["check", "check"],
        ["chevron-right", "chevron-right"],
        ["chevron-down", "chevron-down"],
        ["bookmark", "bookmark"],
        ["download", "download"],
        ["upload", "upload"],
        ["save", "save"],
        ["print", "print"],
        ["clock", "clock"],
        ["cloud-sync", "cloud-sync"],
        ["sync", "sync"],
        ["external-link", "external-link"],
        ["link", "link"],
        ["trash", "trash"],
        ["edit", "edit"],
        ["copy", "copy"],
        ["more-vert", "more-vert"],
        ["sun", "sun"],
        ["moon", "moon"],
        ["user", "user"],
        ["themes", "themes"],
        ["settings", "settings"],
        ["sign-out", "sign-out"],
        ["image", "image"],
      ].map(([name, label]) => `<div style="display:flex; flex-direction:column; align-items:center; gap:6px; padding:12px 8px; border:1px solid var(--border); border-radius:4px;">
        ${icon(name, 20)}
        <span style="font-size:10px; color:var(--muted); text-align:center;">${label}</span>
      </div>`).join("")}
    </div>
  `,

  "theme-picker": `
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Theme picker (popover from sidebar bottom bar)</p>
    <div style="display:inline-block; background:var(--bg); border:1px solid var(--border); border-radius:6px; box-shadow:0 4px 16px rgba(0,0,0,0.12); width:240px; max-height:400px; overflow:hidden; display:flex; flex-direction:column;">
      <div style="padding:12px 12px 8px; display:flex; align-items:center; justify-content:space-between;">
        <span style="font-size:16px; font-weight:600;">Themes</span>
        <button style="background:none; border:none; cursor:pointer; color:var(--muted); display:flex; padding:2px;">${icon('moon', 16)}</button>
      </div>
      <div style="overflow-y:auto; padding:0 0 8px;">
        <div style="padding:4px 12px; font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase;">Light</div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; background:color-mix(in srgb, var(--accent) 15%, transparent);">
          <div style="width:16px; height:16px; border-radius:4px; background:#f0eeeb; border:1.5px solid #ccc; flex-shrink:0;"></div>
          Dirigible Light
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:16px; height:16px; border-radius:4px; background:#f0f0f0; border:1.5px solid #d0d0d0; flex-shrink:0;"></div>
          Alabaster
        </div>
        <div style="padding:4px 12px; font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase; margin-top:4px;">Dark</div>
        ${[
          ["#302e2b", "#1a1918", "Dirigible Dark"],
          ["#1e1008", "#0d0a04", "Amber Terminal"],
          ["#0d1a0d", "#091209", "Green Terminal"],
          ["#1e1e2e", "#11111b", "Catppuccin Mocha"],
          ["#1a1b26", "#0f0f14", "Tokyo Night"],
          ["#303446", "#232634", "Catppuccin Frappé"],
          ["#282828", "#1d2021", "Gruvbox Dark"],
          ["#191724", "#1f1d2e", "Rosé Pine"],
        ].map(([bg, bdr, name]) => `<div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:16px; height:16px; border-radius:4px; background:${bg}; border:1.5px solid ${bdr}; flex-shrink:0;"></div>
          ${name}
        </div>`).join("")}
        <div style="padding:4px 12px; font-size:11px; color:var(--muted);">... 13 more dark themes</div>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Triggered from themes icon in sidebar bottom bar · Colored swatch = theme's sidebar-bg color · Selected row gets accent highlight · Moon/sun icon toggles light/dark appearance · 23 built-in themes total (2 light, 21 dark)</p>
  `,

  "color-swatch": `
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Current theme color tokens (live CSS variables)</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(80px, 1fr)); gap:8px;">
      ${[
        ["var(--bg)", "background", "#fefefe"],
        ["var(--fg)", "foreground", "#1a1a1a"],
        ["var(--accent)", "accent", "#0066cc"],
        ["var(--muted)", "muted", "#777"],
        ["var(--border)", "border", "#e8e6e3"],
        ["var(--sidebar-bg)", "sidebar-bg", "#faf9f8"],
        ["var(--hover)", "hover", "#f5f4f2"],
        ["var(--success)", "success", "#22c55e"],
        ["var(--warning)", "warning", "#f59e0b"],
        ["var(--danger)", "danger", "#dc2626"],
        ["var(--link)", "link", "#0066cc"],
        ["var(--code-bg)", "code-bg", "#f5f5f5"],
      ].map(([color, label, hex]) => `<div style="display:flex; flex-direction:column; gap:4px;">
        <div style="width:100%; height:40px; border:1px solid var(--border); background:${color}; cursor:pointer;" title="${hex}"></div>
        <span style="font-size:10px; color:var(--fg); font-weight:600;">${label}</span>
        <span style="font-size:9px; color:var(--muted);">${hex}</span>
      </div>`).join("")}
    </div>
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-top:24px; margin-bottom:8px;">Dirigible Light defaults (hardcoded hex values)</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(80px, 1fr)); gap:8px;">
      ${[
        ["#fefefe", "background"], ["#1a1a1a", "foreground"], ["#0066cc", "accent"], ["#777777", "muted"],
        ["#e8e6e3", "border"], ["#faf9f8", "sidebar-bg"], ["#f5f4f2", "hover"], ["#22c55e", "success"],
        ["#f59e0b", "warning"], ["#dc2626", "danger"], ["#0066cc", "link"], ["#f5f5f5", "code-bg"],
      ].map(([hex, label]) => `<div style="display:flex; flex-direction:column; gap:4px;">
        <div style="width:100%; height:40px; border:1px solid #e8e6e3; background:${hex}; cursor:pointer;"></div>
        <span style="font-size:10px; color:var(--fg); font-weight:600;">${label}</span>
        <span style="font-size:9px; color:var(--muted);">${hex}</span>
      </div>`).join("")}
    </div>
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-top:24px; margin-bottom:8px;">Dirigible Dark defaults</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(80px, 1fr)); gap:8px;">
      ${[
        ["#181716", "background"], ["#f2f0ed", "foreground"], ["#6ba3d6", "accent"], ["#999795", "muted"],
        ["#302e2b", "border"], ["#1e1d1b", "sidebar-bg"], ["#252422", "hover"], ["#4ec9b0", "success"],
        ["#e8a735", "warning"], ["#ef4444", "danger"], ["#6ba3d6", "link"], ["#252422", "code-bg"],
      ].map(([hex, label]) => `<div style="display:flex; flex-direction:column; gap:4px;">
        <div style="width:100%; height:40px; border:1px solid #302e2b; background:${hex}; cursor:pointer;"></div>
        <span style="font-size:10px; color:var(--fg); font-weight:600;">${label}</span>
        <span style="font-size:9px; color:var(--muted);">${hex}</span>
      </div>`).join("")}
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Accent is #0066cc (blue) in light · #6ba3d6 in dark · Toggle uses #3b82f6 (separate from accent) · See theme-system for full cross-theme comparison table</p>
  `,

  slider: `
    <div style="display:flex; flex-direction:column; gap:24px; max-width:400px;">
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Range slider (favicon size)</p>
        <div style="display:flex; align-items:center; gap:12px;">
          <input type="range" min="16" max="64" value="32" style="flex:1; height:4px; accent-color:var(--accent); cursor:pointer;" />
          <span style="font-size:13px; min-width:32px; text-align:right;">32px</span>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">With label and bounds</p>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Image quality</label>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:11px; color:var(--muted);">0</span>
          <input type="range" min="0" max="100" value="75" style="flex:1; height:4px; accent-color:var(--accent); cursor:pointer;" />
          <span style="font-size:11px; color:var(--muted);">100</span>
        </div>
        <div style="text-align:center; font-size:12px; margin-top:4px;">75%</div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Disabled state</p>
        <div style="display:flex; align-items:center; gap:12px; opacity:0.5;">
          <input type="range" min="0" max="100" value="50" disabled style="flex:1; height:4px; cursor:not-allowed;" />
          <span style="font-size:13px;">50</span>
        </div>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Native &lt;input type="range"&gt; · accent-color: var(--accent) · Track height: 4px · Used in: publication favicon size · Disabled: 50% opacity, cursor:not-allowed</p>
  `,

  "selection-list": `
    <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Selection list (left sidebar panel — used in themes modal, settings)</p>
    <div style="display:flex; gap:16px;">
      <div style="width:210px; background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; overflow:hidden;">
        <div style="padding:4px 12px; font-size:11px; color:var(--muted); text-transform:uppercase; margin-top:4px;">Light</div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; background:color-mix(in srgb, var(--accent) 15%, transparent); color:var(--accent); cursor:pointer;">
          <div style="width:14px; height:14px; border-radius:3px; background:#f0eeeb; border:1.5px solid #ccc; flex-shrink:0;"></div>
          Dirigible Light
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:14px; height:14px; border-radius:3px; background:#f0f0f0; border:1.5px solid #d0d0d0; flex-shrink:0;"></div>
          Alabaster
        </div>
        <div style="padding:4px 12px; font-size:11px; color:var(--muted); text-transform:uppercase; margin-top:6px;">Dark</div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:14px; height:14px; border-radius:3px; background:#302e2b; border:1.5px solid #1a1918; flex-shrink:0;"></div>
          Dirigible Dark
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:14px; height:14px; border-radius:3px; background:#1e1008; border:1.5px solid #0d0a04; flex-shrink:0;"></div>
          Amber Terminal
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:14px; height:14px; border-radius:3px; background:#0d1a0d; border:1.5px solid #091209; flex-shrink:0;"></div>
          Green Terminal
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          <div style="width:14px; height:14px; border-radius:3px; background:#1e1e2e; border:1.5px solid #11111b; flex-shrink:0;"></div>
          Catppuccin Mocha
        </div>
        <div style="padding:4px 12px; font-size:11px; color:var(--muted); margin-bottom:4px;">... 16 more</div>
      </div>
      <div style="width:210px; background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; overflow:hidden;">
        <div style="padding:4px 12px; font-size:11px; color:var(--muted); text-transform:uppercase; margin-top:4px;">Settings</div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; background:color-mix(in srgb, var(--accent) 15%, transparent); color:var(--accent); cursor:pointer;">
          ${icon('user', 14)} Account
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          ${icon('themes', 14)} Appearance
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          ${icon('settings', 14)} Preferences
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer;">
          ${icon('cloud-sync', 14)} Sync
        </div>
        <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:13px; cursor:pointer; color:var(--danger);">
          ${icon('sign-out', 14)} Sign out
        </div>
      </div>
    </div>
    <p style="margin-top:12px; font-size:11px; color:var(--muted);">Width: 210px · Background: sidebar-bg · Section labels: 11px uppercase muted · Selected row: accent 15% tint + accent text · Items: 6px 12px padding, 13px font · Used in: themes modal left pane, settings navigation</p>
  `,

  // ─── PATTERNS ───────────────────────────────────────────────────────────

  forms: `
    <div style="max-width:400px; display:flex; flex-direction:column; gap:16px;">
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Title</label>
        <input type="text" value="My New Collection" style="font-family:inherit; font-size:14px; padding:6px 8px; border:2px solid var(--border); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none;" />
      </div>
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Description</label>
        <textarea rows="3" placeholder="Optional description..." style="font-family:inherit; font-size:14px; padding:6px 8px; border:2px solid var(--border); border-radius:4px; background:var(--bg); color:var(--fg); width:100%; outline:none; resize:vertical;"></textarea>
      </div>
      <div>
        <label style="display:block; font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">Cover image</label>
        <div style="border:2px dashed var(--border); border-radius:4px; padding:24px; text-align:center; color:var(--muted); font-size:13px; cursor:pointer;">Upload cover image</div>
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <span>Include in site</span>
        <div style="width:40px; height:22px; border-radius:9999px; background:#3b82f6; position:relative; cursor:pointer;">
          <div style="width:16px; height:16px; border-radius:9999px; background:#fff; position:absolute; top:3px; right:3px; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></div>
        </div>
      </div>
      <div style="display:flex; gap:8px; justify-content:flex-end; padding-top:8px; border-top:1px solid var(--border);">
        <button style="${BTN_SEC}" ${BTN_SEC_INV}>Cancel</button>
        <button style="${BTN_PRI}" ${BTN_PRI_INV}>Create collection</button>
      </div>
    </div>
  `,

  "publish-flow": `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:13px; color:var(--muted);">1.</span>
        <span>Open note, click</span>
        <span style="display:inline-flex; align-items:center; gap:4px; background:#22c55e; color:#fff; font-size:11px; padding:2px 8px; border-radius:9999px;">${icon('check', 10)} Published &#9662;</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:13px; color:var(--muted);">2.</span>
        <span>Toggle "Include in site"</span>
        <div style="width:40px; height:22px; border-radius:9999px; background:#3b82f6; position:relative;">
          <div style="width:16px; height:16px; border-radius:9999px; background:#fff; position:absolute; top:3px; right:3px; box-shadow:0 1px 2px rgba(0,0,0,0.2);"></div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:13px; color:var(--muted);">3.</span>
        <span>Set slug, cover, excerpt</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:13px; color:var(--muted);">4.</span>
        <span>Live at</span>
        <code style="font-size:12px; background:var(--code-bg); padding:2px 6px; border-radius:3px;">sosaysthecaptain.dirigible.app/collection/note</code>
      </div>
    </div>
  `,

  "sync-flow": `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="display:flex;">${icon('cloud-sync', 18)}</span>
        <span style="font-size:13px;">Click sync icon in sidebar bottom bar</span>
      </div>
      <div style="font-size:13px; color:var(--muted);">&darr;</div>
      <div style="background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:12px; max-width:300px;">
        <div style="font-weight:600; margin-bottom:4px; display:flex; align-items:center; gap:6px;">${icon('cloud-sync', 14)} Sync to Local Folder</div>
        <div style="font-size:12px; color:var(--muted); margin-bottom:8px;">.md files &middot; image folders &middot; music structure &middot; PDFs as-is</div>
        <button style="${BTN_PRI} font-size:12px; padding:3px 10px;" ${BTN_PRI_INV}>Choose folder</button>
      </div>
      <div style="font-size:13px; color:var(--muted);">&darr;</div>
      <div style="max-width:300px; background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; padding:12px; display:flex; flex-direction:column; gap:6px;">
        <div style="font-size:13px; display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:14px; height:14px; border:3px solid var(--fg); border-top-color:transparent; border-radius:50%; animation:dg-spin 1s linear infinite;"></span>
          Syncing...
        </div>
        <div style="height:4px; background:var(--border);"><div style="height:100%; width:65%; background:var(--fg);"></div></div>
      </div>
      <div style="font-size:13px; color:var(--muted);">&darr;</div>
      <div style="max-width:300px; background:var(--sidebar-bg); border:1px solid var(--border); border-radius:4px; padding:12px; display:flex; align-items:center; gap:8px; font-size:13px;">
        <span style="color:#22c55e; display:flex;">${icon('check', 14)}</span> Complete — 2,189 items
      </div>
    </div>
  `,

  "theme-system": `
    <div style="display:flex; flex-direction:column; gap:24px;">
      <div style="display:flex; gap:16px; flex-wrap:wrap;">
        <div>
          <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Dirigible Light</p>
          <div style="width:160px; border-radius:6px; overflow:hidden; border:1px solid #e8e6e3;">
            <div style="background:#faf9f8; padding:8px; font-size:11px; border-bottom:1px solid #e8e6e3; color:#1a1a1a;">Sidebar</div>
            <div style="background:#fefefe; padding:8px; font-size:11px; color:#1a1a1a;">Content<br><span style="color:#777777;">Muted</span> · <span style="color:#0066cc;">Accent</span></div>
          </div>
        </div>
        <div>
          <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Dirigible Dark</p>
          <div style="width:160px; border-radius:6px; overflow:hidden; border:1px solid #302e2b;">
            <div style="background:#1e1d1b; padding:8px; font-size:11px; border-bottom:1px solid #302e2b; color:#f2f0ed;">Sidebar</div>
            <div style="background:#181716; padding:8px; font-size:11px; color:#f2f0ed;">Content<br><span style="color:#999795;">Muted</span> · <span style="color:#6ba3d6;">Accent</span></div>
          </div>
        </div>
        <div>
          <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Catppuccin Mocha</p>
          <div style="width:160px; border-radius:6px; overflow:hidden; border:1px solid #313244;">
            <div style="background:#1e1e2e; padding:8px; font-size:11px; border-bottom:1px solid #313244; color:#cdd6f4;">Sidebar</div>
            <div style="background:#1e1e2e; padding:8px; font-size:11px; color:#cdd6f4;">Content<br><span style="color:#6c7086;">Muted</span> · <span style="color:#89b4fa;">Accent</span></div>
          </div>
        </div>
        <div>
          <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Amber Terminal</p>
          <div style="width:160px; border-radius:6px; overflow:hidden; border:1px solid #28200c;">
            <div style="background:#120e06; padding:8px; font-size:11px; border-bottom:1px solid #28200c; color:#c8aa78;">Sidebar</div>
            <div style="background:#0d0a04; padding:8px; font-size:11px; color:#c8aa78;">Content<br><span style="color:#7a6040;">Muted</span> · <span style="color:#e07020;">Accent</span></div>
          </div>
        </div>
      </div>

      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Color swatches for current theme</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(70px, 1fr)); gap:6px;">
          ${[
            ["var(--bg)", "bg"], ["var(--fg)", "fg"], ["var(--accent)", "accent"], ["var(--muted)", "muted"],
            ["var(--border)", "border"], ["var(--sidebar-bg)", "sidebar"], ["var(--hover)", "hover"], ["var(--success)", "success"],
            ["var(--warning)", "warning"], ["var(--danger)", "danger"], ["var(--link)", "link"], ["var(--code-bg)", "code-bg"],
          ].map(([c, l]) => `<div style="display:flex;flex-direction:column;gap:2px;"><div style="height:24px;border:1px solid var(--border);background:${c};"></div><span style="font-size:9px;color:var(--muted);">${l}</span></div>`).join("")}
        </div>
      </div>

      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Color token map across key themes</p>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:11px; white-space:nowrap;">
            <thead>
              <tr style="border-bottom:2px solid var(--border);">
                <th style="text-align:left; padding:4px 8px;">Token</th>
                <th style="text-align:left; padding:4px 8px;">Light</th>
                <th style="text-align:left; padding:4px 8px;">Dark</th>
                <th style="text-align:left; padding:4px 8px;">Catppuccin</th>
                <th style="text-align:left; padding:4px 8px;">Gruvbox</th>
                <th style="text-align:left; padding:4px 8px;">Amber</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ["background", ["#fefefe","#181716","#1e1e2e","#282828","#0d0a04"]],
                ["foreground", ["#1a1a1a","#f2f0ed","#cdd6f4","#ebdbb2","#c8aa78"]],
                ["accent", ["#0066cc","#6ba3d6","#89b4fa","#fe8019","#e07020"]],
                ["muted", ["#777777","#999795","#6c7086","#928374","#7a6040"]],
                ["border", ["#e8e6e3","#302e2b","#313244","#3c3836","#28200c"]],
                ["success", ["#22c55e","#4ec9b0","#a6e3a1","#b8bb26","#a07818"]],
                ["danger", ["#dc2626","#ef4444","#f38ba8","#fb4934","#b34000"]],
              ].map(([tok, vals]) => `<tr style="border-bottom:1px solid var(--border);">
                <td style="padding:4px 8px; font-weight:600;">${tok}</td>
                ${vals.map(v => `<td style="padding:4px 8px;"><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${v};border:1px solid ${v === '#fefefe' ? '#ccc' : '#555'};vertical-align:middle;"></span> ${v}</td>`).join("")}
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">All 23 themes</p>
        <div style="display:flex; flex-wrap:wrap; gap:4px; font-size:11px;">
          ${["Dirigible Light","Alabaster","Dirigible Dark","Amber Terminal","Green Terminal","Catppuccin Mocha","Tokyo Night","Catppuccin Frappé","Gruvbox Dark","Rosé Pine","Nord","Dracula","Ayu Dark","Kanagawa","Vesper","Monokai Pro","Nightfox","Solarized Dark","Catppuccin Macchiato","GitHub Dark","Poimandres","Everforest Dark","Desert"].map(n => `<span style="padding:2px 6px; border:1px solid var(--border); border-radius:3px;">${n}</span>`).join("")}
        </div>
      </div>

      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Font themes (per-note)</p>
        <div style="display:flex; gap:4px;">
          <span style="padding:4px 8px; border:1px solid var(--border); border-radius:4px; font-size:11px; background:var(--hover);">Raw</span>
          <span style="padding:4px 8px; border:1px solid var(--border); border-radius:4px; font-size:11px; background:var(--fg); color:var(--bg);">Mono</span>
          <span style="padding:4px 8px; border:1px solid var(--border); border-radius:4px; font-size:11px; font-family:'Crimson Pro',serif;">Serif</span>
          <span style="padding:4px 8px; border:1px solid var(--border); border-radius:4px; font-size:11px; font-family:'IBM Plex Sans',sans-serif;">Sans</span>
        </div>
      </div>
    </div>
  `,

  navigation: `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Breadcrumb trail</p>
        <div style="display:flex; align-items:center; gap:4px; font-size:13px;">
          <a href="#" style="color:var(--muted); text-decoration:none;">all</a>
          <span style="color:var(--muted);">&rsaquo;</span>
          <a href="#" style="color:var(--muted); text-decoration:none;">demo-botany</a>
          <span style="color:var(--muted);">&rsaquo;</span>
          <span style="font-weight:600;">Aconitum napellus — Monkshood</span>
          <span style="color:var(--muted); cursor:pointer; margin-left:4px; display:flex;">${icon('more-vert', 14)}</span>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">View toggles</p>
        <div style="display:inline-flex; gap:2px; border:1px solid var(--border); border-radius:4px; padding:2px;">
          <span style="padding:4px 8px; border-radius:3px; cursor:pointer; font-size:12px; background:var(--fg); color:var(--bg);">&#9776;</span>
          <span style="padding:4px 8px; border-radius:3px; cursor:pointer; font-size:12px;">&#9871;</span>
          <span style="padding:4px 8px; border-radius:3px; cursor:pointer; font-size:12px;">&#9638;</span>
          <span style="padding:4px 8px; border-radius:3px; cursor:pointer; font-size:12px; display:flex;">${icon('settings', 12)}</span>
        </div>
      </div>
      <div>
        <p style="font-size:11px; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Tabs</p>
        <div style="display:flex; gap:0; border-bottom:2px solid var(--border);">
          <span style="padding:6px 12px; font-size:13px; border-bottom:2px solid var(--accent); margin-bottom:-2px; color:var(--accent);">Swatches</span>
          <span style="padding:6px 12px; font-size:13px; color:var(--muted); cursor:pointer;">CSS</span>
        </div>
      </div>
    </div>
  `,
};
