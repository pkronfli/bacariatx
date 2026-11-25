// Bacari patio suggestions API for bacariatx.com/design.
// Saves suggestions from the page into the "Bacari Austin – Patio Suggestions" sheet.
// Each person has their own passcode (only SHA-256 hashes are stored here). The name that goes in the sheet
// comes from the passcode, so suggestions are always labeled with the right person.
// 15 wrong tries lock it for 15 minutes.
//
// QUEUE: see "the queue" below. One Claude run at a time; a run that does not start, or stops sending its heartbeat,
// is retried within minutes (each suggestion at most 3 times).
const SHEET_ID = '1CrlZjkfNs-Mmti4LAzOy-5Or8weLbdgnk6GfuB6a9Jk';
const USERS = {
  'd09c67a849a06a27b495e82d26e76b582d52c602f7826c7eb371707d0e733fc8': 'Robert',
  '99cca7765696a0b920ceccb10cc5a401d838a5fc6b4baf821335e4356949ed48': 'Patrick'
};

function sha_(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function sheet_() { return SpreadsheetApp.openById(SHEET_ID).getSheets()[0]; }
function safe_(s) { s = String(s || '').trim(); return /^[=+\-@]/.test(s) ? "'" + s : s; }
// returns the person's name for a right passcode, or 'bad' / 'locked'
function check_(p) {
  var c = CacheService.getScriptCache(), n = Number(c.get('fails') || 0);
  if (n >= 15) return { state: 'locked' };
  var who = USERS[sha_(String(p || ''))];
  if (!who) { c.put('fails', String(n + 1), 900); return { state: 'bad' }; }
  return { state: 'ok', name: who };
}
// next ID after the highest one in the suggestions tab and the Archive tab (so archived IDs are never reused)
function nextId_() {
  var ss = SpreadsheetApp.openById(SHEET_ID), max = 0;
  [ss.getSheets()[0], ss.getSheetByName('Archive')].forEach(function (sh) {
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().forEach(function (r) {
      var m = String(r[0]).match(/^S(\d+)$/); if (m) max = Math.max(max, Number(m[1]));
    });
  });
  return 'S' + ('00' + (max + 1)).slice(-3);
}
function list_() {
  var v = sheet_().getDataRange().getValues();
  return v.slice(1).filter(function (r) { return r[0]; }).map(function (r) {
    var links = String(r[8] || '').split('\n').filter(String);
    return { id: r[0], time: r[1] instanceof Date ? r[1].toISOString() : String(r[1]), from: r[2], note: r[3],
             text: r[4], status: r[5], reply: r[6], version: r[7],
             photos: links.filter(function (l) { return !/voice/i.test(l); }).length,
             voice: links.some(function (l) { return /voice/i.test(l); }) };
  }).slice(-40).reverse();
}
function settings_() {
  var ss = SpreadsheetApp.openById(SHEET_ID), sh = ss.getSheetByName('Settings');
  if (!sh) { sh = ss.insertSheet('Settings'); sh.getRange('A1:B1').setValues([['Live version', '']]); }
  return sh;
}
function live_() { var v = Number(settings_().getRange('B1').getValue()); return v >= 1 ? v : null; }
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'live') return out_({ ok: true, live: live_() });
  return out_({ ok: true, service: 'bacari-patio-suggestions' });
}
// Starts Claude right away when someone sends a suggestion. The routine's fire URL and token
// live in Script properties (ROUTINE_URL, ROUTINE_TOKEN); without them the backup check still runs.
function fire_(text) {
  var pr = PropertiesService.getScriptProperties(), url = pr.getProperty('ROUTINE_URL'), tok = pr.getProperty('ROUTINE_TOKEN');
  if (!url || !tok) return false;
  try {
    var r = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      headers: { 'Authorization': 'Bearer ' + tok, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'experimental-cc-routine-2026-04-01' },
      payload: JSON.stringify({ text: String(text).slice(0, 2000) }) });
    return r.getResponseCode() < 300;
  } catch (x) { return false; }
}
// ---------- the queue ----------
// A suggestion is saved as "new". About 2 minutes after the last one arrives, the queue starts ONE Claude run for everything
// waiting and marks those rows "sent". The run marks them "working" when it starts and writes the time into Settings!B3
// (its heartbeat) every few minutes. The queue checks every minute:
//  - rows still "sent" 8 minutes after the start: the run never got going; start a new one;
//  - rows "working" with no heartbeat for 15 minutes: the run died; put them back in line and start a new one
//    (a run that never writes a heartbeat gets 45 minutes, as before);
//  - each suggestion is tried at most 3 times; after that it is marked as a question so someone sees it.
var WAIT_MS = 120000, POLL_MS = 60000, START_MS = 8 * 60000, HB_MS = 15 * 60000, STALL_MS = 45 * 60000, MAX_TRIES = 3;
function clearPumps_() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'pump') ScriptApp.deleteTrigger(t); });
}
function schedule_(ms) { clearPumps_(); ScriptApp.newTrigger('pump').timeBased().after(Math.max(ms, 5000)).create(); }
// called when a suggestion or an answer has been saved
function enqueue_() {
  PropertiesService.getScriptProperties().setProperty('LAST_INPUT', String(Date.now()));
  try { schedule_(WAIT_MS); return true; }
  catch (x) {  // the queue has not been switched on yet (setupQueue not run): start Claude right away, as before
    return fire_('New suggestions are waiting in the sheet. Apply them now.');
  }
}
// the last time a run said it is alive (Settings!B3), in ms; 0 if never
function heartbeat_() {
  var sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Settings'); if (!sh) return 0;
  var v = sh.getRange('B3').getValue();
  var t = v instanceof Date ? v.getTime() : Date.parse(String(v || ''));
  return isNaN(t) ? 0 : t;
}
// runs on a timer: decides whether to wait, start a run, retry one, or stop checking
function pump() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) { schedule_(POLL_MS); return; }
  try {
    var pr = PropertiesService.getScriptProperties(), sh = sheet_(), last = sh.getLastRow(), now = Date.now();
    if (last < 2) { clearPumps_(); return; }
    var v = sh.getRange(2, 1, last - 1, 6).getValues(), sent = [], working = [], fresh = [];
    v.forEach(function (r, i) {
      var st = String(r[5]).trim().toLowerCase(), row = { row: i + 2, id: String(r[0]) };
      if (!r[0] || /^Made version/.test(String(r[4]))) return;
      if (st === 'sent') sent.push(row); else if (st === 'working') working.push(row); else if (st === 'new') fresh.push(row);
    });
    var tries = {}; try { tries = JSON.parse(pr.getProperty('TRIES') || '{}'); } catch (x) {}
    if (sent.length || working.length) {
      var since = Number(pr.getProperty('FIRED_AT') || pr.getProperty('WORKING_SINCE') || 0);
      if (!since) { since = now; pr.setProperty('FIRED_AT', String(now)); }
      var hb = heartbeat_(), alive, why;
      if (hb > since) { alive = now - hb < HB_MS; why = 'Claude stopped sending updates'; }          // the run is talking to us
      else if (working.length) { alive = now - since < STALL_MS; why = 'Claude did not finish'; }    // started, no heartbeat (older instructions)
      else { alive = now - since < START_MS; why = 'Claude did not start'; }                        // never started
      if (alive) { schedule_(POLL_MS); return; }
      // the run is gone: these rows go back in line (the try count below decides whether they are started again)
      sent.concat(working).forEach(function (w) { sh.getRange(w.row, 6).setValue('new'); fresh.push(w); });
      pr.setProperty('LAST_RETRY', why + ' (' + new Date().toISOString() + ')');
    }
    pr.deleteProperty('FIRED_AT'); pr.deleteProperty('WORKING_KEY'); pr.deleteProperty('WORKING_SINCE');
    if (!fresh.length) { pr.deleteProperty('TRIES'); clearPumps_(); return; }
    var wait = WAIT_MS - (now - Number(pr.getProperty('LAST_INPUT') || 0));
    if (wait > 5000) { schedule_(wait); return; }                  // more may be coming: wait out the 2 minutes
    // a suggestion that has already been tried MAX_TRIES times is not started again: someone needs to look at it
    var go = [];
    fresh.sort(function (a, b) { return a.row - b.row; }).forEach(function (f) {
      if ((tries[f.id] || 0) >= MAX_TRIES) {
        sh.getRange(f.row, 6).setValue('question');
        sh.getRange(f.row, 7).setValue('Claude tried ' + MAX_TRIES + ' times and could not finish this one. Please send it again, or split it into smaller changes.');
      } else go.push(f);
    });
    if (!go.length) { pr.setProperty('TRIES', JSON.stringify(tries)); clearPumps_(); return; }
    var ids = go.map(function (f) { return f.id; });
    var retry = go.some(function (f) { return tries[f.id]; });
    if (fire_('The suggestion queue started this run for ' + ids.join(', ') + '. Those rows are marked "sent": set them to "working" now and keep the heartbeat in Settings!B3 fresh (see your instructions). Apply them together. A row whose text ends with "<name> followed up: ..." was already done in an earlier version: keep that work and apply only the follow-up.' +
        (retry ? ' An earlier run on some of these stopped before finishing: check design/versions.json for a version that already has them before redoing work.' : ''))) {
      go.forEach(function (f) { sh.getRange(f.row, 6).setValue('sent'); tries[f.id] = (tries[f.id] || 0) + 1; });
      pr.setProperty('TRIES', JSON.stringify(tries)); pr.setProperty('FIRED_AT', String(now)); pr.deleteProperty('FIRE_FAILS');
      schedule_(POLL_MS * 2);
    } else {
      var fails = Number(pr.getProperty('FIRE_FAILS') || 0) + 1; pr.setProperty('FIRE_FAILS', String(fails));
      if (fails < 5) schedule_(POLL_MS * 2); else { pr.deleteProperty('FIRE_FAILS'); clearPumps_(); }  // the daily backup run picks them up
    }
  } finally { lock.releaseLock(); }
}
// Run this once from the editor after pasting this code: Google asks for permission to set timers, which switches the queue on.
function setupQueue() { clearPumps_(); schedule_(WAIT_MS); Logger.log('Queue is on. It checks the sheet in 2 minutes.'); }
// Photos and voice notes are saved as files in Drive, in "Patio suggestion photos" inside the Bacari folder.
// Their links go in column I so Claude can open them when it works on the suggestion.
const PHOTO_PARENT = '1KXrB89SgEJpyE3JWt7w_xLDF3LGIfYLP';
function photoFolder_() {
  var pr = PropertiesService.getScriptProperties(), id = pr.getProperty('PHOTO_FOLDER');
  if (id) { try { return DriveApp.getFolderById(id); } catch (x) {} }
  var parent = DriveApp.getFolderById(PHOTO_PARENT), it = parent.getFoldersByName('Patio suggestion photos');
  var f = it.hasNext() ? it.next() : parent.createFolder('Patio suggestion photos');
  pr.setProperty('PHOTO_FOLDER', f.getId());
  return f;
}
function savePhotos_(id, photos) {
  if (!Array.isArray(photos) || !photos.length) return [];
  var folder = photoFolder_(), links = [], stamp = Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd HHmm');
  photos.slice(0, 6).forEach(function (p, i) {
    try {
      var type = /^image\/(jpeg|png|webp|gif|heic)$/.test(String(p.type)) ? String(p.type) : 'image/jpeg';
      var data = String(p.data || '').replace(/^data:[^,]*,/, '');
      if (!data || data.length > 8e6) return;
      var ext = type.split('/')[1].replace('jpeg', 'jpg');
      var blob = Utilities.newBlob(Utilities.base64Decode(data), type, id + ' ' + stamp + ' ' + (i + 1) + '.' + ext);
      links.push(folder.createFile(blob).getUrl());
    } catch (x) {}
  });
  return links;
}
// other files attached to a suggestion: PDFs, Word, Excel, text, CAD and SketchUp files (up to about 6 MB each)
const FILE_TYPES = {
  'application/pdf': 'pdf', 'application/msword': 'doc', 'application/vnd.ms-excel': 'xls', 'text/plain': 'txt', 'text/csv': 'csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
};
function saveFiles_(id, files) {
  if (!Array.isArray(files) || !files.length) return [];
  var folder = photoFolder_(), links = [], stamp = Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd HHmm');
  files.slice(0, 6).forEach(function (f) {
    try {
      var name = String(f.name || 'file').replace(/[^\w .()\-]/g, '_').slice(-80), ext = (name.match(/\.([A-Za-z0-9]{1,5})$/) || [])[1] || '';
      var type = String(f.type || '').split(';')[0];
      if (!FILE_TYPES[type] && !/^(dwg|dxf|skp|pdf|docx?|xlsx?|csv|txt)$/i.test(ext)) return;
      if (!FILE_TYPES[type]) type = 'application/octet-stream';
      var data = String(f.data || '').replace(/^data:[^,]*,/, '');
      if (!data || data.length > 8e6) return;
      var blob = Utilities.newBlob(Utilities.base64Decode(data), type, id + ' ' + stamp + ' ' + name);
      links.push(folder.createFile(blob).getUrl());
    } catch (x) {}
  });
  return links;
}
// a voice note recorded with the microphone button on the model
function saveAudio_(id, a) {
  if (!a || !a.data) return [];
  try {
    var type = String(a.type || '').split(';')[0];
    if (!/^audio\/(webm|mp4|ogg|mpeg|wav|x-m4a|aac)$/.test(type)) type = 'audio/webm';
    var data = String(a.data).replace(/^data:[^,]*,/, '');
    if (data.length > 12e6) return [];
    var ext = { 'audio/mp4': 'm4a', 'audio/x-m4a': 'm4a', 'audio/aac': 'aac', 'audio/mpeg': 'mp3', 'audio/ogg': 'ogg', 'audio/wav': 'wav' }[type] || 'webm';
    var stamp = Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd HHmm');
    var blob = Utilities.newBlob(Utilities.base64Decode(data), type, id + ' voice ' + stamp + '.' + ext);
    return [photoFolder_().createFile(blob).getUrl() + '#voice'];
  } catch (x) { return []; }
}
function addLinks_(sh, row, links) {
  if (!links.length) return;
  var cur = String(sh.getRange(row, 9).getValue() || '');
  sh.getRange(row, 9).setValue((cur ? cur + '\n' : '') + links.join('\n'));
}
// Run this once from the editor so Google asks for Drive access before the new version goes live.
function authDrive() { Logger.log(photoFolder_().getUrl()); }
function testFire() { Logger.log(fire_('This is only a connection test from the suggestions script. Check the sheet; if there is nothing new, stop.')); }
function doPost(e) {
  var b = {};
  try { b = JSON.parse(e.postData.contents); } catch (x) { return out_({ ok: false, error: 'bad_request' }); }
  var c = check_(b.passcode);
  if (c.state === 'locked') return out_({ ok: false, error: 'locked' });
  if (c.state === 'bad') return out_({ ok: false, error: 'passcode' });
  var who = c.name;
  if (b.action === 'check') return out_({ ok: true, name: who, files: true });
  if (b.action === 'list') return out_({ ok: true, name: who, files: true, items: list_() });
  if (b.action === 'suggest') {
    var text = String(b.text || '').trim().slice(0, 4000), hasAudio = !!(b.audio && b.audio.data);
    var hasFiles = (Array.isArray(b.photos) && b.photos.length) || (Array.isArray(b.files) && b.files.length);
    if (!text && hasFiles) text = '(see the attached photos and files)';
    if (!text && hasAudio) text = '(voice note: listen to the audio link in column I)';
    if (!text) return out_({ ok: false, error: 'empty' });
    var lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      var sh = sheet_(), id = nextId_();
      sh.appendRow([id, new Date(), who, safe_(String(b.note || '').slice(0, 80)),
                    safe_(text), 'new', '', '']);  // H (Version) is filled in when Claude publishes the change
      var row = sh.getLastRow();
    } finally { lock.releaseLock(); }
    var links = savePhotos_(id, b.photos).concat(saveFiles_(id, b.files), saveAudio_(id, b.audio));
    if (links.length) addLinks_(sheet_(), row, links);
    enqueue_();
    return out_({ ok: true, id: id, name: who, items: list_() });
  }
  if (b.action === 'reply') {
    // someone answers a question Claude asked, or follows up on a finished suggestion: what they wrote is added to that
    // suggestion (after what Claude said) and it goes back in line, so Claude changes that same suggestion again
    var rid = String(b.id || '').slice(0, 10), rtext = String(b.text || '').trim().slice(0, 2000);
    var hasPh = Array.isArray(b.photos) && b.photos.length;
    if (!rid || (!rtext && !hasPh)) return out_({ ok: false, error: 'empty' });
    if (!rtext) rtext = '(see the attached photos)';
    var lr = LockService.getScriptLock(); lr.waitLock(10000);
    try {
      var sr = sheet_(), vals = sr.getRange(1, 1, sr.getLastRow(), 1).getValues(), row2 = 0;
      for (var i = 1; i < vals.length; i++) if (String(vals[i][0]) === rid) { row2 = i + 1; break; }
      if (!row2) return out_({ ok: false, error: 'not_found' });
      var cur = String(sr.getRange(row2, 5).getValue());
      var prevQ = String(sr.getRange(row2, 7).getValue()).replace(/\]/g, ')');
      var st = String(sr.getRange(row2, 6).getValue()).trim().toLowerCase(), ver = String(sr.getRange(row2, 8).getValue()).trim();
      if (st === 'new' || st === 'sent' || st === 'working') return out_({ ok: false, error: 'busy' });
      var said = st === 'question' ? '[Claude asked: ' + prevQ + ']\n' + who + ' answered: '
        : '[Claude replied' + (/^\d+$/.test(ver) ? ' in version ' + ver : '') + ': ' + prevQ + ']\n' + who + ' followed up: ';
      sr.getRange(row2, 5).setValue(safe_(cur + '\n\n' + said + rtext));
      sr.getRange(row2, 6).setValue('new'); sr.getRange(row2, 7).setValue('');
    } finally { lr.releaseLock(); }
    var rl = savePhotos_(rid, b.photos);
    if (rl.length) addLinks_(sheet_(), row2, rl);
    enqueue_();
    return out_({ ok: true, items: list_() });
  }
  if (b.action === 'setlive') {
    var n = Math.floor(Number(b.version));
    if (!(n >= 1 && n <= 9999)) return out_({ ok: false, error: 'bad_version' });
    var lk = LockService.getScriptLock(); lk.waitLock(10000);
    try {
      settings_().getRange('B1').setValue(n);
      sheet_().appendRow([nextId_(), new Date(), who, '', 'Made version ' + n + ' the live version', 'done', '', n]);
    } finally { lk.releaseLock(); }
    return out_({ ok: true, live: n });
  }
  return out_({ ok: false, error: 'unknown_action' });
}
