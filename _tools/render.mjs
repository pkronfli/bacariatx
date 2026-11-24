#!/usr/bin/env node
// Headless render check for the design model (bacariatx.com/design).
//
//   node _tools/render.mjs [--v N | --v 1-18 | --v 3,7] [--views start,overview,deck,bar,street,up,plan] [--night] [--phone]
//                          [--click "#trees,#fence"] [--tag name] [--out DIR] [--site DIR]
//
// Serves the repo from disk, loads design/index.html in headless Chrome (software WebGL),
// shows version N (default: the live one in design/versions.json), and for each view saves
// a PNG to DIR (default /tmp/bacari-render) and prints draw calls, triangles and any errors.
// Exits 1 if the model fails to build or the page logs an error. three.js r128 is served
// from a local copy (fetched once from the npm registry into _tools/.cache).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {execSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i < 0 ? d : (process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true); };
const SITE = path.resolve(arg('site', path.join(HERE, '..')));
const OUT = path.resolve(arg('out', '/tmp/bacari-render'));
const VIEWS = String(arg('views', 'start')).split(',');
const NIGHT = !!arg('night', false), PHONE = !!arg('phone', false);
const CLICK = arg('click', '') ? String(arg('click', '')).split(',') : [];   // buttons to press first, e.g. --click "#trees,#fence"
const TAG = arg('tag', '');
fs.mkdirSync(OUT, {recursive: true});

// three.js r128 from npm (the page loads it from a CDN, which the sandbox may not reach)
const CACHE = path.join(HERE, '.cache');
const three = path.join(CACHE, 'package');
if (!fs.existsSync(path.join(three, 'build/three.min.js'))) {
  fs.mkdirSync(CACHE, {recursive: true});
  execSync('npm pack three@0.128.0 --silent && tar xzf three-0.128.0.tgz', {cwd: CACHE, stdio: 'ignore'});
}
const req = createRequire(import.meta.url);
let playwright;
for (const p of ['playwright', '/opt/npm-tools/node_modules/playwright', '/home/claude/.npm-global/lib/node_modules/playwright']) {
  try { playwright = req(p); break; } catch (e) {}
}
if (!playwright) { console.error('playwright not found (npm i -g playwright)'); process.exit(2); }

const vers = JSON.parse(fs.readFileSync(path.join(SITE, 'design/versions.json'), 'utf8'));
const VS = String(arg('v', vers.live)).split(',').flatMap(t => { const m = t.match(/^(\d+)-(\d+)$/); if (!m) return [+t]; const a = []; for (let i = +m[1]; i <= +m[2]; i++) a.push(i); return a; });

const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css', '.ico': 'image/x-icon', '.svg': 'image/svg+xml'};
const server = http.createServer((q, r) => {
  let p = decodeURIComponent(new URL(q.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(SITE, p);
  if (!f.startsWith(SITE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, {'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store'});
  fs.createReadStream(f).pipe(r);
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${server.address().port}`;

// keep a handle on the renderer and the last scene it drew, whatever version of index.html this is
const HOOK = `;(function(){const W=THREE.WebGLRenderer;THREE.WebGLRenderer=function(o){const r=new W(o);window.__r=r;
  const rd=r.render.bind(r);r.render=(s,c)=>{window.__s=s;window.__frames=(window.__frames||0)+1;return rd(s,c);};return r;};})();`;

const exe = ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
const browser = await playwright.chromium.launch({executablePath: exe, headless: true,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox']});
const ctx = await browser.newContext(PHONE
  ? {viewport: {width: 390, height: 844}, deviceScaleFactor: 3, isMobile: true, hasTouch: true, reducedMotion: 'reduce'}
  : {viewport: {width: 1280, height: 900}, deviceScaleFactor: 1, reducedMotion: 'reduce'});
const page = await ctx.newPage();
await page.route(/three\.min\.js/, r => r.fulfill({contentType: 'text/javascript', body: fs.readFileSync(path.join(three, 'build/three.min.js'), 'utf8') + HOOK}));
await page.route(/OrbitControls\.js/, r => r.fulfill({path: path.join(three, 'examples/js/controls/OrbitControls.js'), contentType: 'text/javascript'}));
// the suggestions server is never called for real: it answers "live = versions.json live"
await page.route(/script\.google\.com/, r => r.fulfill({contentType: 'application/json', body: JSON.stringify({ok: true, live: vers.live, items: []})}));
await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());

const all = [];
let errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|favicon|fonts\.g/.test(m.text())) errors.push('console: ' + m.text()); });
for (const V of VS) {
errors = [];
await page.goto('about:blank');
const t0 = Date.now();
await page.goto(`${base}/design/${V === vers.live ? '' : '?r=' + V + '#v' + V}`, {waitUntil: 'load'});
let ok = true;
try { await page.waitForFunction(() => (window.__frames || 0) >= 2 || document.querySelector('#model .err'), null, {timeout: 120000}); }
catch (e) { ok = false; errors.push('model did not render within 120 s'); }
if (await page.$('#model .err')) { ok = false; errors.push('page says: the 3D model could not load'); }
const loadMs = Date.now() - t0;

const stats = () => page.evaluate(() => {
  const s = window.__s, r = window.__r; if (!s) return null;
  let meshes = 0, inst = 0, casters = 0, lights = 0, tris = 0;
  s.traverse(o => { if (o.isLight) lights++; if (!o.isMesh) return; meshes++; if (o.isInstancedMesh) inst++; if (o.castShadow) casters++; });
  return {meshes, instanced: inst, shadowCasters: casters, lights, calls: r.info.render.calls, triangles: r.info.render.triangles,
    shown: (document.querySelector('#vbar') || {}).textContent || ''};
});
const results = [];
if (ok) {
  for (const sel of CLICK) await page.click(sel);
  if (NIGHT) await page.click('#night');
  for (const v of VIEWS) {
    if (v !== 'start') { await page.click(`[data-view="${v}"]`); }
    const f0 = await page.evaluate(() => window.__frames);
    // let damping settle and make sure at least two fresh frames were drawn
    await page.evaluate(() => window.__bacariInvalidate && window.__bacariInvalidate());
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.__bacariInvalidate && window.__bacariInvalidate());
    await page.waitForTimeout(300);
    const file = path.join(OUT, `v${V}-${v}${NIGHT ? '-night' : ''}${PHONE ? '-phone' : ''}${TAG ? '-' + TAG : ''}.png`);
    await (await page.$('#model')).screenshot({path: file});
    const st = await stats();
    results.push({view: v, file, ...st, framesDrawn: (await page.evaluate(() => window.__frames)) - f0});
  }
}
all.push({version: V, ok: ok && !errors.length, loadMs, errors, results});
console.error(`v${V}: ${ok && !errors.length ? 'ok' : 'FAILED'} ${results.map(r => r.view + ' ' + r.calls + ' calls').join(', ')} ${errors.join(' | ')}`);
}
const bad = all.filter(a => !a.ok);
console.log(JSON.stringify(all.length === 1 ? all[0] : all, null, 1));
await browser.close(); server.close();
process.exit(bad.length ? 1 : 0);
