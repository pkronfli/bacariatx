// Rebuilds bacariatx.com/brief from the editable Claude version of the brief.
// Usage: node _tools/sync_brief.js <saved-artifact.html>
// Reads the brief's content (the "brief-state" block) from the Claude page and
// writes brief/index.html and brief/state.json. Exits 3 if nothing changed.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const src = fs.readFileSync(process.argv[2], "utf8");
const m = src.match(/<script type="application\/json" id="brief-state">([\s\S]*?)<\/script>/);
if (!m) { console.error("No brief-state block found"); process.exit(2); }
const state = JSON.parse(m[1]);
const statePath = path.join(root, "brief", "state.json");
const prev = fs.existsSync(statePath) ? fs.readFileSync(statePath, "utf8").trim() : "";
const next = JSON.stringify(state, null, 2);
if (prev === next && !process.argv.includes("--force")) { console.log("unchanged"); process.exit(3); }

const app = fs.readFileSync(path.join(__dirname, "brief-app.js"), "utf8");
const mod = { exports: {} }; new Function("module", app)(mod);
let body = mod.exports.renderPage(state, false);
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
for (const [k, v] of Object.entries(IMG)) body = body.split(k).join(v);
if (body.includes("/_blob/")) { console.error("Unmapped image in brief; add it to IMG"); process.exit(2); }
const css = fs.readFileSync(path.join(__dirname, "brief.css"), "utf8");
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
  "<style>body{margin:0}img{max-width:100%}\n" + css + "</style>",
].join("\n");
const html = `<!doctype html>\n<html lang="en">\n<head>\n${head}\n</head>\n<body>\n<div id="page">${body}</div>\n</body>\n</html>\n`;
fs.writeFileSync(path.join(root, "brief", "index.html"), html);
fs.writeFileSync(statePath, next + "\n");
console.log("updated brief/index.html", html.length);
