// Keeps bacariatx.com/brief in step with the editable Claude version of the brief.
//
//   node _tools/sync_brief.js <saved-claude-page.html>          check + update state.json only
//   node _tools/sync_brief.js <saved-claude-page.html> --full   rebuild every file in brief/
//
// The domain page (brief/index.html) draws itself from brief/state.json using
// brief/render.js, so routine text edits only need state.json updated.
// brief/design.txt fingerprints the Claude page's layout code; if it changes,
// run with --full to rebuild render.js, brief.css and index.html.
//
// Prints one JSON line: {"stateChanged":bool,"designChanged":bool,"wrote":[...]}
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const dir = path.join(root, "brief");
const full = process.argv.includes("--full");
const src = fs.readFileSync(process.argv[2], "utf8");

const grab = re => { const m = src.match(re); return m ? m[1] : null; };
const stateRaw = grab(/<script type="application\/json" id="brief-state">([\s\S]*?)<\/script>/);
const app = grab(/<script id="app">([\s\S]*?)<\/script>/);
const css = grab(/<style id="css">([\s\S]*?)<\/style>/);
if (!stateRaw || !app || !css) { console.error("Claude page is missing brief-state, app or css"); process.exit(2); }

const state = JSON.parse(stateRaw);
const stateOut = JSON.stringify(state, null, 2) + "\n";
const design = crypto.createHash("sha256").update(app + "\n/*css*/\n" + css).digest("hex").slice(0, 16) + "\n";
const read = f => { const p = path.join(dir, f); return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; };
const stateChanged = read("state.json") !== stateOut;
const designChanged = read("design.txt") !== design;
const wrote = [];
const write = (f, s) => { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, f), s); wrote.push("brief/" + f); };

if (stateChanged) write("state.json", stateOut);

if (full) {
  const IMG = {
    "/_blob/cccd53ac0d550dc6146ef2cdd9851e20": "img/logo.png",
    "/_blob/92a683ee228f04d4047d11bf4fb1a63b": "img/deck.jpg",
    "/_blob/9940acf8c013c0bda46365b6b68981a0": "img/treebar.jpg",
    "/_blob/026f04dc92cef91347e7f64bb20ee27a": "img/garden.jpg",
    "/_blob/04e861bea9e6b131fd28cf540958fb5c": "img/food_d.jpg",
    "/_blob/02fe5ac4a217eddfe97a7cea7679c3c5": "img/in_bar.jpg",
    "/_blob/134b27a36a55e2cb0ff3ee23af270f34": "img/in_banquette.jpg",
    "/_blob/6d28615f0173e3a0eeb0a6d8a6786b30": "img/in_fireplace.jpg",
    "/_blob/6e73651aeb0f447cdf58b12de1812f0a": "img/in_herbbar.jpg",
  };
  const mapImgs = s => { for (const [k, v] of Object.entries(IMG)) s = s.split(k).join(v); return s; };

  // render.js: the Claude page's own drawing code, pointed at local images
  const a = app.indexOf("var IMG"), b = app.indexOf("var RESET");
  const c = app.indexOf("function esc("), d = app.indexOf("function stateJSON(");
  if ([a, b, c, d].some(i => i < 0)) { console.error("Unexpected layout code in Claude page"); process.exit(2); }
  const render = "(function () {\n" + mapImgs(app.slice(a, b)) + "\n" + app.slice(c, d) +
    "\n  window.renderBrief = function (st) { return renderPage(st, false); };\n})();\n";
  if (render.includes("/_blob/")) { console.error("Unmapped image in brief; add it to IMG"); process.exit(2); }
  write("render.js", render);
  write("brief.css", css);

  const mod = { exports: {} }; new Function("module", app)(mod);
  const body = mapImgs(mod.exports.renderPage(state, false));
  const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const desc = "Architect brief for Bacari Austin: rebuilding a fire-damaged restaurant on West 6th Street. Site, program, services and what to bring to a first call.";
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    "<title>Bacari Austin Architect Brief</title>",
    `<meta name="description" content="${esc(desc)}">`,
    '<link rel="canonical" href="https://bacariatx.com/brief/">',
    '<meta name="robots" content="noindex, nofollow, noarchive">',
    '<meta name="theme-color" content="#08223b">',
    '<link rel="icon" href="/favicon.ico" sizes="any">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Bacari Austin">',
    '<meta property="og:locale" content="en_US">',
    '<meta property="og:url" content="https://bacariatx.com/brief/">',
    '<meta property="og:title" content="Bacari Austin: Architect Brief">',
    `<meta property="og:description" content="${esc(desc)}">`,
    '<meta property="og:image" content="https://bacariatx.com/og-image.jpg">',
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Bacari patio at dusk with string lights and the Bacari logo">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="Bacari Austin: Architect Brief">',
    `<meta name="twitter:description" content="${esc(desc)}">`,
    '<meta name="twitter:image" content="https://bacariatx.com/og-image.jpg">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">',
    "<style>body{margin:0}img{max-width:100%}</style>",
    '<link rel="stylesheet" href="brief.css">',
  ].join("\n");
  const loader = '<script src="render.js"></script>\n<script>\n' +
    '(function () {\n' +
    '  if (location.hash === "#edit") { location.replace("https://claude.ai/artifact/MRYsKbi8ToiFG86LvPrg89"); return; }\n' +
    '  if (!window.renderBrief || !window.fetch) return;\n' +
    '  fetch("state.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (st) {\n' +
    '    if (!st) return;\n' +
    '    var html = window.renderBrief(st), page = document.getElementById("page");\n' +
    '    if (page && page.innerHTML !== html) page.innerHTML = html;\n' +
    '  }).catch(function () {});\n' +
    '})();\n</script>';
  write("index.html", `<!doctype html>\n<html lang="en">\n<head>\n${head}\n</head>\n<body>\n<div id="page">${body}</div>\n${loader}\n</body>\n</html>\n`);
  write("design.txt", design);
}

console.log(JSON.stringify({ stateChanged, designChanged: full ? false : designChanged, wrote }));
