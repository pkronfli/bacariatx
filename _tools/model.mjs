#!/usr/bin/env node
// Bacari design model: edit, check and publish versions with git.
//
//   node _tools/model.mjs checkout [N]      copy version N (default: live) into _work/ as editable part files
//   node _tools/model.mjs find <text>       show which work part (and line) mentions <text>
//   node _tools/model.mjs check [--views a,b] [--night]
//                                           syntax-check _work/ and render it headlessly (PNG in /tmp/bacari-render)
//   node _tools/model.mjs preview [DIR]     write a copy of the site with _work/ as the next version (for render.mjs --site DIR)
//   node _tools/model.mjs publish --by "Robert" --summary "One plain sentence." [--details "longer text"]
//                                           freeze the changed parts as a new version, update versions.json and
//                                           CHANGELOG.md, render-check it, commit, push, and wait for the live site
//   node _tools/model.mjs make-live N       start the next change from version N (someone pressed Make live): the next
//                                           checkout uses N and publish builds on it; nothing is pushed until publish
//   node _tools/model.mjs status            live version, highest version, what _work/ is based on, changed parts
//
// _work/ (not committed) holds one file per part, in build order: NNN-name.js, plus meta.json (lede, levels,
// notes, tags, views). The parts are pieces of ONE function body build(kit): they run in order in one scope,
// so a part can use anything an earlier part declared. Published parts are never edited again: a new version
// writes design/parts/<name>.<N>.js only for parts that changed and reuses the earlier files for the rest.
// Versions 1-18 are single files (design/versions/vN.js) and are left exactly as they are.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');
const DESIGN = path.join(REPO, 'design');
const WORK = path.join(REPO, '_work');
const WANT = path.join(HERE, '.cache', 'start-from');   // set by make-live, used by the next checkout (not committed)
const wanted = V => { try { const n = +fs.readFileSync(WANT, 'utf8'); return n && n !== V.live && entry(V, n) ? n : 0; } catch (e) { return 0; } };
const SITE_URL = 'https://bacariatx.com/design/';

const die = (msg, code) => { console.error('ERROR: ' + msg); process.exit(code || 1); };
const read = f => fs.readFileSync(f, 'utf8');
const readJ = f => JSON.parse(read(f));
const writeJ = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 1) + '\n');
const git = (...a) => execFileSync('git', a, {cwd: REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']}).trim();
const gitTry = (...a) => spawnSync('git', a, {cwd: REPO, encoding: 'utf8'});
const opt = (k, d) => { const i = process.argv.indexOf('--' + k); return i < 0 ? d : process.argv[i + 1]; };
const flag = k => process.argv.includes('--' + k);
const versionsJ = () => readJ(path.join(DESIGN, 'versions.json'));
const entry = (V, n) => V.versions.find(v => v.n === n);
const highest = V => Math.max(...V.versions.map(v => v.n));

// ---------- reading a version into parts ----------
// manifest: design/versions/vN.json = {version, base, meta:"parts/meta.N.json", parts:["parts/name.N.js", ...]}
const manifestPath = n => path.join(DESIGN, 'versions', `v${n}.json`);
function loadVersion(n) {
  if (fs.existsSync(manifestPath(n))) {
    const m = readJ(manifestPath(n));
    return {meta: readJ(path.join(DESIGN, m.meta)), metaPath: m.meta,
      parts: m.parts.map(p => ({name: path.basename(p).replace(/\.\d+\.js$/, ''), path: p, src: read(path.join(DESIGN, p))}))};
  }
  // a single-file version (1-18): evaluate it for the data, and take build()'s body as one part
  const file = path.join(DESIGN, 'versions', `v${n}.js`);
  if (!fs.existsSync(file)) die(`version ${n} has neither versions/v${n}.json nor versions/v${n}.js`);
  const M = evalModel(read(file));
  const fn = M.build.toString();
  const body = fn.slice(fn.indexOf('{') + 1, fn.lastIndexOf('}')).replace(/^\n/, '');
  return {meta: {lede: M.lede, levels: M.levels, notes: M.notes, tags: M.tags, views: M.views}, metaPath: null,
    parts: [{name: 'model', path: null, src: body}]};
}
function evalModel(src) {
  const w = {}; new Function('window', src)(w);
  if (!w.PATIO_MODEL || typeof w.PATIO_MODEL.build !== 'function') die('file does not define window.PATIO_MODEL.build');
  return w.PATIO_MODEL;
}

// ---------- _work/ ----------
const workParts = () => fs.readdirSync(WORK).filter(f => /^\d+-[a-z0-9-]+\.js$/.test(f)).sort()
  .map(f => ({file: f, name: f.replace(/^\d+-/, '').replace(/\.js$/, ''), src: read(path.join(WORK, f))}));
const baseInfo = () => { const f = path.join(WORK, '.base.json'); if (!fs.existsSync(f)) die('nothing checked out: run  node _tools/model.mjs checkout'); return readJ(f); };

function checkout(n) {
  const V = versionsJ(), want = n ? 0 : wanted(V); n = n || want || V.live;
  if (want) console.log(`Starting from version ${want}, the one made live on the page (versions.json still says ${V.live}).`);
  if (!entry(V, n)) die(`version ${n} is not in versions.json`);
  const v = loadVersion(n);
  fs.rmSync(WORK, {recursive: true, force: true}); fs.mkdirSync(WORK);
  const map = {};
  v.parts.forEach((p, i) => { const f = `${String((i + 1) * 10).padStart(3, '0')}-${p.name}.js`; fs.writeFileSync(path.join(WORK, f), p.src); map[f] = p.path; });
  writeJ(path.join(WORK, 'meta.json'), v.meta);
  // keepFrom: this checkout deliberately starts from an older version, so publish must not merge in the newer ones
  writeJ(path.join(WORK, '.base.json'), want ? {base: n, parts: map, meta: v.metaPath, keepFrom: V.live} : {base: n, parts: map, meta: v.metaPath});
  // keep pristine copies to merge against if someone else publishes meanwhile
  fs.mkdirSync(path.join(WORK, '.orig'));
  v.parts.forEach((p, i) => fs.writeFileSync(path.join(WORK, '.orig', Object.keys(map)[i]), p.src));
  writeJ(path.join(WORK, '.orig', 'meta.json'), v.meta);
  console.log(`Checked out version ${n} into _work/:`);
  workParts().forEach(p => console.log(`  ${p.file.padEnd(28)} ${String(p.src.length).padStart(7)} bytes  ${firstComment(p.src)}`));
  console.log(`  meta.json                    ${String(read(path.join(WORK, 'meta.json')).length).padStart(7)} bytes  lede, levels, notes (${v.meta.notes.length}), tags, views`);
  console.log('Edit only the part that holds what you are changing (use  find  to locate it), then  check  and  publish.');
}
const firstComment = s => ((s.match(/^\s*\/\/\s*(.*)$/m) || [])[1] || '').slice(0, 90);

function find(text) {
  if (!text) die('usage: find <text>');
  const re = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  for (const p of [...workParts(), {file: 'meta.json', src: read(path.join(WORK, 'meta.json'))}])
    p.src.split('\n').forEach((l, i) => { if (re.test(l)) console.log(`${p.file}:${i + 1}: ${l.trim().slice(0, 160)}`); });
}

// ---------- assembling a version ----------
function assembleSource(parts) {
  return parts.map(p => `// ===== part ${p.name} =====\n${p.src.replace(/\s*$/, '')}\n`).join('');
}
function syntaxCheck() {
  const parts = workParts();
  if (!parts.length) die('_work/ has no part files');
  let meta;
  try { meta = readJ(path.join(WORK, 'meta.json')); } catch (e) { die('meta.json is not valid JSON: ' + e.message); }
  for (const k of ['lede', 'levels', 'notes', 'tags', 'views']) if (!(k in meta)) die(`meta.json is missing "${k}"`);
  meta.notes.forEach((n, i) => { if (!Array.isArray(n.p) || n.p.length !== 3 || !n.t || !n.d) die(`meta.json note ${i + 1} needs p:[x,y,z], t and d`); });
  const src = assembleSource(parts);
  try { new Function('kit', src); } catch (e) {
    // point at the part: check each part on its own (a part alone may be unbalanced only if it was cut badly)
    for (const p of parts) { try { new Function('kit', p.src); } catch (e2) { die(`syntax error in _work/${p.file}: ${e2.message}`); } }
    die('syntax error: ' + e.message);
  }
  return {parts, meta, src};
}

// the page joins the parts with a newline and runs them as one function (2 header lines): turn "bacari-build.js:LINE" in an
// error into the part file and its own line number
function whereIs(log, parts) {
  return String(log).replace(/bacari-build\.js:(\d+)(?::\d+)?/g, (m, l) => { let n = +l - 2;
    for (const p of parts) { const c = p.src.split('\n').length; if (n <= c) return `_work/${p.file}:${n}`; n -= c; } return m; });
}

// build version N's files into siteDir (the repo itself, or a temp copy for checking)
function freeze(siteDir, N, base, parts, meta, info) {
  const d = path.join(siteDir, 'design');
  const out = [], written = [];
  for (const p of parts) {
    const prev = info.parts[p.file];
    if (prev && read(path.join(DESIGN, prev)) === p.src) { out.push(prev); continue; }
    const rel = `parts/${p.name}.${N}.js`;
    if (fs.existsSync(path.join(d, rel))) die(`${rel} already exists; published parts are never overwritten`);
    fs.mkdirSync(path.join(d, 'parts'), {recursive: true});
    fs.writeFileSync(path.join(d, rel), p.src); out.push(rel); written.push(rel);
  }
  let metaRel = info.meta;
  if (!metaRel || JSON.stringify(readJ(path.join(DESIGN, metaRel))) !== JSON.stringify(meta)) {
    metaRel = `parts/meta.${N}.json`; writeJ(path.join(d, metaRel), meta); written.push(metaRel);
  }
  const man = `versions/v${N}.json`;
  if (fs.existsSync(path.join(d, man)) || fs.existsSync(path.join(d, `versions/v${N}.js`))) die(`version ${N} already exists`);
  writeJ(path.join(d, man), {version: N, base, meta: metaRel, parts: out});
  written.push(man);
  return written;
}

const today = () => new Intl.DateTimeFormat('en-US', {timeZone: 'America/Chicago', month: 'short', day: 'numeric', year: 'numeric'}).format(new Date());

function addVersionEntry(siteDir, N, by, summary) {
  const f = path.join(siteDir, 'design/versions.json'), V = readJ(f);
  V.versions.push({n: N, date: today(), by, summary, parts: 1});
  V.live = N; V.stamp = String(N);
  writeJ(f, V);
}
function addChangelog(N, by, summary, details) {
  const f = path.join(DESIGN, 'CHANGELOG.md');
  const head = '# Bacari design model: changes by version\n\nNewest first. Each version is listed on the page under Versions.\n';
  let s = fs.existsSync(f) ? read(f) : head;
  const at = s.indexOf('\n## ');
  const sec = `\n## Version ${N} (${today()}, ${by})\n${summary}${details ? '\n\n' + details : ''}\n`;
  s = at < 0 ? s + sec : s.slice(0, at) + sec + s.slice(at);
  fs.writeFileSync(f, s);
}

function render(siteDir, N, views, night) {
  const args = [path.join(HERE, 'render.mjs'), '--site', siteDir, '--v', String(N), '--views', views || 'start,overview'];
  if (night) args.push('--night');
  const r = spawnSync('node', args, {encoding: 'utf8', timeout: 600000});
  let res = null; try { res = JSON.parse(r.stdout); } catch (e) {}
  return {ok: r.status === 0, res, log: (r.stderr || '') + (res ? '' : r.stdout || '')};
}

function tempSite() {
  const t = fs.mkdtempSync(path.join(os.tmpdir(), 'bacari-'));
  fs.cpSync(DESIGN, path.join(t, 'design'), {recursive: true});
  return t;
}

// a full copy of the site with _work/ as the next version, for looking at it or rendering it by hand:
//   node _tools/render.mjs --site DIR --phone --views bar --night
function preview(dir) {
  const {parts, meta} = syntaxCheck();
  const info = baseInfo(), V = versionsJ(), N = highest(V) + 1;
  dir = path.resolve(dir || path.join(os.tmpdir(), 'bacari-preview'));
  fs.rmSync(dir, {recursive: true, force: true}); fs.mkdirSync(dir, {recursive: true});
  fs.cpSync(DESIGN, path.join(dir, 'design'), {recursive: true});
  freeze(dir, N, info.base, parts, meta, info); addVersionEntry(dir, N, 'preview', 'preview');
  console.log(`Preview of version ${N} written to ${dir}`);
}

function check() {
  const {parts, meta} = syntaxCheck();
  const info = baseInfo(), V = versionsJ(), N = highest(V) + 1;
  const t = tempSite();
  freeze(t, N, info.base, parts, meta, info);
  addVersionEntry(t, N, 'check', 'check');
  const r = render(t, N, opt('views'), flag('night'));
  fs.rmSync(t, {recursive: true, force: true});
  if (!r.ok) { console.error(whereIs(r.log, parts)); die('render check failed'); }
  for (const x of r.res.results) console.log(`ok  ${x.view}: ${x.calls} draw calls, ${x.triangles} triangles  ${x.file}`);
  console.log('Check passed. Look at the PNGs if the change is visual.');
}

// ---------- git ----------
function ensureIdentity() {
  if (!gitTry('config', 'user.email').stdout.trim()) { git('config', 'user.email', 'noreply@anthropic.com'); git('config', 'user.name', 'Claude (Bacari design)'); }
}
function syncMain() {
  const st = git('status', '--porcelain', '--', 'design');
  if (st) die('design/ has uncommitted changes:\n' + st + '\nCommit or discard them first (git checkout -- design).');
  const f = gitTry('fetch', '--depth=50', 'origin', 'main');
  if (f.status) die('git fetch failed: ' + f.stderr);
  const m = gitTry('merge', '--ff-only', 'origin/main');
  if (m.status) { git('reset', '--hard', 'origin/main'); }
}
// someone published since checkout: carry our edits onto the new live version with a 3-way merge per part
function rebaseWork(newBase) {
  const info = baseInfo(), now = loadVersion(newBase);
  const nowByName = Object.fromEntries(now.parts.map(p => [p.name, p]));
  const conflicts = [];
  for (const p of workParts()) {
    const orig = path.join(WORK, '.orig', p.file);
    const theirs = nowByName[p.name];
    if (!theirs) { if (fs.existsSync(orig)) conflicts.push(`${p.file} (part no longer exists in version ${newBase})`); continue; }
    if (!fs.existsSync(orig)) continue; // a part we added
    const tmp = path.join(os.tmpdir(), 'theirs-' + p.file); fs.writeFileSync(tmp, theirs.src);
    const r = spawnSync('git', ['merge-file', '-p', path.join(WORK, p.file), orig, tmp], {encoding: 'utf8'});
    if (r.status !== 0) conflicts.push(p.file); else fs.writeFileSync(path.join(WORK, p.file), r.stdout);
  }
  // meta: take theirs, then re-apply our note/lede/level/tag/view edits by comparing with the original
  const ours = readJ(path.join(WORK, 'meta.json')), orig = readJ(path.join(WORK, '.orig', 'meta.json')), merged = JSON.parse(JSON.stringify(now.meta));
  for (const k of ['lede', 'levels', 'tags', 'views']) if (JSON.stringify(ours[k]) !== JSON.stringify(orig[k])) {
    if (JSON.stringify(merged[k]) !== JSON.stringify(orig[k])) conflicts.push('meta.json ' + k); else merged[k] = ours[k]; }
  const key = n => n.t;
  const origT = new Map(orig.notes.map(n => [key(n), JSON.stringify(n)]));
  ours.notes.forEach(n => { const o = origT.get(key(n)); if (o === JSON.stringify(n)) return;
    const i = merged.notes.findIndex(m => key(m) === key(n)); if (i >= 0) merged.notes[i] = n; else merged.notes.push(n); });
  if (conflicts.length) die(`version ${newBase} was published while you worked and these overlap with your edits: ${conflicts.join(', ')}.\n` +
    `Run  checkout  again and redo your change on top of version ${newBase}.`, 3);
  writeJ(path.join(WORK, 'meta.json'), merged);
  const map = {};
  workParts().forEach(p => { map[p.file] = nowByName[p.name] ? nowByName[p.name].path : null; });
  writeJ(path.join(WORK, '.base.json'), {base: newBase, parts: map, meta: now.metaPath});
  now.parts.forEach(p => { const f = workParts().find(w => w.name === p.name); if (f) fs.writeFileSync(path.join(WORK, '.orig', f.file), p.src); });
  writeJ(path.join(WORK, '.orig', 'meta.json'), now.meta);
  console.log(`Version ${newBase} went live while you worked; your edits were merged on top of it.`);
}

async function waitLive(N) {
  for (let i = 0; i < 24; i++) {
    const r = spawnSync('curl', ['-fsS', '--max-time', '15', `${SITE_URL}versions.json?ts=${Date.now()}`], {encoding: 'utf8'});
    if (r.status === 0) { try { if (readJ0(r.stdout).versions.some(v => v.n === N)) { console.log(`Live: ${SITE_URL} lists version ${N}.`); return true; } } catch (e) {} }
    else if (i === 0 && /Could not resolve|403|407|Forbidden|CONNECT/i.test(r.stderr)) { console.log(`Cannot reach ${SITE_URL} from this shell; check it with WebFetch.`); return null; }
    await new Promise(ok => setTimeout(ok, 10000));
  }
  console.log(`${SITE_URL}versions.json did not list version ${N} within 4 minutes; GitHub Pages may be slow. Check again.`);
  return false;
}
const readJ0 = s => JSON.parse(s);

async function publish() {
  const by = opt('by'), summary = opt('summary'), details = opt('details');
  if (!by || !summary) die('usage: publish --by "Name" --summary "One plain sentence."');
  ensureIdentity();
  syntaxCheck();
  for (let attempt = 1; attempt <= 5; attempt++) {
    syncMain();
    let V = versionsJ(), info = baseInfo();
    if (V.live !== info.base && V.live !== info.keepFrom) rebaseWork(V.live);
    info = baseInfo();
    const {parts, meta} = syntaxCheck();
    const N = highest(V) + 1;
    const written = freeze(REPO, N, info.base, parts, meta, info);
    addVersionEntry(REPO, N, by, summary);
    addChangelog(N, by, summary, details);
    if (!flag('no-render')) {
      const r = render(REPO, N, opt('views'), false);
      if (!r.ok) { git('checkout', '--', 'design'); git('clean', '-fdq', 'design'); console.error(whereIs(r.log, parts)); die('render check failed; nothing was published'); }
      for (const x of r.res.results) console.log(`render ok  ${x.view}: ${x.calls} draw calls`);
    }
    git('add', 'design');
    git('commit', '-qm', `Design v${N}: ${summary}`);
    const p = gitTry('push', 'origin', 'HEAD:main');
    if (p.status === 0) {
      fs.rmSync(WANT, {force: true});
      console.log(`Published version ${N} (${written.length} new files: ${written.join(', ')}).`);
      // the published version is the new base for any further edits
      const man = readJ(manifestPath(N)), map = {};
      workParts().forEach(w => { map[w.file] = man.parts.find(x => path.basename(x).replace(/\.\d+\.js$/, '') === w.name) || null; });
      writeJ(path.join(WORK, '.base.json'), {base: N, parts: map, meta: man.meta});
      workParts().forEach(w => fs.writeFileSync(path.join(WORK, '.orig', w.file), w.src));
      writeJ(path.join(WORK, '.orig', 'meta.json'), meta);
      await waitLive(N);
      console.log(`VERSION=${N}`);
      return;
    }
    console.log(`push rejected (attempt ${attempt}): someone else pushed; retrying on top of their change.`);
    git('reset', '--hard', 'HEAD~1');
  }
  die('could not push after 5 attempts');
}

async function makeLive(n) {
  // Nothing is committed here: the page already shows the version in Settings!B1. The next checkout starts from it,
  // and publish turns it into the new live version.
  const V = versionsJ();
  if (!entry(V, n)) die(`version ${n} is not in versions.json`);
  fs.mkdirSync(path.dirname(WANT), {recursive: true});
  if (V.live === n) { fs.rmSync(WANT, {force: true}); console.log(`Version ${n} is already live.`); return; }
  fs.writeFileSync(WANT, String(n));
  console.log(`The next checkout starts from version ${n}; publishing makes the new version live. Nothing was pushed.`);
}

function status() {
  const V = versionsJ();
  console.log(`live: ${V.live}   highest: ${highest(V)}`);
  if (!fs.existsSync(path.join(WORK, '.base.json'))) return console.log('_work/: nothing checked out');
  const info = baseInfo();
  console.log(`_work/ is based on version ${info.base}`);
  for (const p of workParts()) {
    const prev = info.parts[p.file];
    const st = !prev ? 'new part' : read(path.join(DESIGN, prev)) === p.src ? '' : 'CHANGED';
    if (st) console.log(`  ${p.file}  ${st}`);
  }
  const meta = read(path.join(WORK, 'meta.json'));
  if (!info.meta || JSON.stringify(JSON.parse(meta)) !== JSON.stringify(readJ(path.join(DESIGN, info.meta)))) console.log('  meta.json  CHANGED');
}

const [cmd, a1] = process.argv.slice(2);
if (cmd === 'checkout') checkout(a1 ? +a1 : 0);
else if (cmd === 'find') find(process.argv.slice(3).join(' '));
else if (cmd === 'check') check();
else if (cmd === 'preview') preview(a1);
else if (cmd === 'publish') await publish();
else if (cmd === 'make-live') await makeLive(+a1);
else if (cmd === 'status') status();
else { console.log(read(fileURLToPath(import.meta.url)).split('\n').slice(1, 22).map(l => l.replace(/^\/\/ ?/, '')).join('\n')); }
