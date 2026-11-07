(function () {
  var IMG = {
    logo: "/_blob/cccd53ac0d550dc6146ef2cdd9851e20",
    deck: "/_blob/92a683ee228f04d4047d11bf4fb1a63b",
    treebar: "/_blob/9940acf8c013c0bda46365b6b68981a0",
    garden: "/_blob/026f04dc92cef91347e7f64bb20ee27a",
    food: "/_blob/04e861bea9e6b131fd28cf540958fb5c",
    inBar: "/_blob/02fe5ac4a217eddfe97a7cea7679c3c5",
    inBanquette: "/_blob/134b27a36a55e2cb0ff3ee23af270f34",
    inFireplace: "/_blob/6d28615f0173e3a0eeb0a6d8a6786b30",
    inHerbbar: "/_blob/6e73651aeb0f447cdf58b12de1812f0a"
  };
  var RESET = ":root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}";
  var HEAD = '<title>Bacari Austin Architect Brief</title>\n' +
    '<meta name="claude:viewport-fit-sides" content="cover">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">\n';
  var LIST_KEYS = ["site", "build", "services", "how", "ask"];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }

  function listView(st, key, ordered) {
    var tag = ordered ? "ol" : "ul";
    return "<" + tag + ">" + st[key].map(function (t) { return "<li>" + rich(t) + "</li>"; }).join("") + "</" + tag + ">";
  }
  function listEdit(st, key) {
    return '<div class="ed-list">' + st[key].map(function (t, i) {
      var id = "ed-" + key + "-" + i;
      return '<div class="ed-row"><label class="sr" for="' + id + '">Bullet ' + (i + 1) + '</label>' +
        '<textarea id="' + id + '" data-list="' + key + '" data-i="' + i + '" rows="1">' + esc(t) + '</textarea>' +
        '<button type="button" class="ed-del" data-del="' + key + '" data-i="' + i + '" aria-label="Remove bullet ' + (i + 1) + '">×</button></div>';
    }).join("") + '<button type="button" class="ed-add" data-add="' + key + '">+ Add bullet</button></div>';
  }
  function list(st, key, edit, ordered) { return edit ? listEdit(st, key) : listView(st, key, ordered); }
  function para(st, key, cls, edit, label) {
    if (edit) {
      return '<label class="sr" for="ed-' + key + '">' + label + '</label><textarea id="ed-' + key + '" class="ed-para" data-field="' + key + '" rows="3">' + esc(st[key]) + '</textarea>';
    }
    return '<p' + (cls ? ' class="' + cls + '"' : '') + '>' + rich(st[key]) + '</p>';
  }
  function fig(src, alt, cap, cls) {
    return '<figure' + (cls ? ' class="' + cls + '"' : '') + '><img src="' + src + '" alt="' + esc(alt) + '"><figcaption>' + esc(cap) + '</figcaption></figure>';
  }

  function renderPage(st, edit) {
    return '' +
'<header class="top"><div class="wrap"><img class="logo" src="' + IMG.logo + '" alt="bacari">' +
  '<nav class="links" aria-label="Bacari links"><a href="https://www.eatwithbacari.com" target="_blank" rel="noopener">eatwithbacari.com</a>' +
  '<a href="https://www.instagram.com/eatwithbacari" target="_blank" rel="noopener">@eatwithbacari</a></nav></div></header>' +
'<div class="intro"><div class="wrap">' +
  '<p class="eyebrow">Architect brief · Bacari Austin</p>' +
  '<h1>Rebuilding a fire-damaged restaurant on <span>West 6th Street.</span></h1>' +
  para(st, "lede", "lede", edit, "Introduction") +
'</div></div>' +
'<div class="wrap body">' +
  (edit ? '<p class="ed-note">You\'re editing. Press Enter in a bullet to start a new one. Wrap words in <code>**double asterisks**</code> to make them bold. Nothing changes for anyone else until you tap Save changes.</p>' : '') +
  fig(IMG.deck, "Bacari Silver Lake patio: tiered decks and dining built around large trees, with string lights and a fire pit", "Bacari Silver Lake. Tiered decks and a patio built around the trees, the kind of outdoor room we want in Austin.", "hero") +
  '<dl class="specs">' +
    '<div class="spec"><dt>Site</dt><dd>West 6th St<small>Former Bar Peached</small></dd></div>' +
    '<div class="spec"><dt>Interior</dt><dd>~3,400 sf<small>Two floors</small></dd></div>' +
    '<div class="spec"><dt>Exterior</dt><dd>~5,000 sf<small>Decks, patio, lot</small></dd></div>' +
    '<div class="spec"><dt>Hot line</dt><dd>18 ft<small>No wood oven</small></dd></div>' +
    '<div class="spec"><dt>Condition</dt><dd>Fire damage<small>Foundation intact</small></dd></div>' +
  '</dl>' +
  '<div class="grid">' +
    '<section><h2>The site today</h2>' + list(st, "site", edit) + '</section>' +
    '<section><h2>What we want to build</h2>' + list(st, "build", edit) + '</section>' +
  '</div>' +
  '<section><h2>The Bacari feel</h2>' + para(st, "feel", "", edit, "The Bacari feel") +
    '<div class="feel"><div><h3>Inside</h3><div class="strip four">' +
      fig(IMG.inBar, "Bacari Sherman Oaks bar with dark wood counter, green stools and checkered tile floor", "Sherman Oaks · main bar") +
      fig(IMG.inBanquette, "Bacari West 3rd dining room with wood beams, white walls, framed portraits and a leather banquette", "West 3rd · beams and banquette") +
      fig(IMG.inFireplace, "Bacari Sherman Oaks fireplace nook with velvet chairs and candlelit table", "Sherman Oaks · fireplace nook") +
      fig(IMG.inHerbbar, "Bacari Sherman Oaks bar with copper stools, hanging herbs and a suspended bottle shelf", "Sherman Oaks · herb-hung bar") +
    '</div></div><div><h3>Outside</h3><div class="strip">' +
      fig(IMG.treebar, "Bacari Silver Lake bar opening onto a patio with a large tree growing through it", "Silver Lake · bar open to the patio") +
      fig(IMG.garden, "Bacari West 3rd garden patio at night with tables under a large tree", "West 3rd · garden patio") +
      fig(IMG.food, "A wooden table filled with Bacari small plates: sliders, salads, crab cakes and grilled meats", "A table of small plates to share") +
    '</div></div></div>' +
  '</section>' +
  '<div class="grid">' +
    '<section><h2>Services we need</h2>' + list(st, "services", edit) + '</section>' +
    '<section><h2>How we work</h2>' + list(st, "how", edit) + '</section>' +
  '</div>' +
  '<section class="ask"><h2>Please bring to our first call</h2>' + list(st, "ask", edit, true) + '</section>' +
  '<footer>' +
    '<div class="contact"><span class="role">Owner</span><span class="name">Danny Kronfli</span><span class="detail">danny@bacari.us</span></div>' +
    '<div class="contact"><span class="role">Austin contact</span><span class="name">Patrick Kronfli</span><span class="detail">(213) 359-9191</span></div>' +
    '<div class="follow">' +
      '<a class="btn" href="https://www.eatwithbacari.com" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5c2.6 2.6 4 6 4 9.5s-1.4 6.9-4 9.5c-2.6-2.6-4-6-4-9.5s1.4-6.9 4-9.5z"/></svg><span>Visit our website <small>eatwithbacari.com</small></span></a>' +
      '<a class="btn" href="https://www.instagram.com/eatwithbacari" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg><span>Follow on Instagram <small>@eatwithbacari</small></span></a>' +
    '</div>' +
    '<p class="date">November 2026</p>' +
  '</footer>' +
'</div>';
  }

  function stateJSON(st) { return JSON.stringify(st).replace(/</g, "\\u003c"); }
  function bodyContent(st, css, app) {
    return HEAD + '<style id="css">' + css + '</style>\n' +
      '<div id="page">' + renderPage(st, false) + '</div>\n' +
      '<script type="application/json" id="brief-state">' + stateJSON(st) + '<\/script>\n' +
      '<script id="app">' + app + '<\/script>\n';
  }
  function buildDoc(st, css, app) {
    return '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>' +
      RESET + '</style></head><body>\n' + bodyContent(st, css, app) + '</body></html>';
  }

  if (typeof document === "undefined") {
    module.exports = { renderPage: renderPage, bodyContent: bodyContent, buildDoc: buildDoc };
    return;
  }

  // ---------- In the viewer ----------
  var STATE = JSON.parse(document.getElementById("brief-state").textContent);
  var CSS = document.getElementById("css").textContent;
  var APP = document.getElementById("app").textContent;
  var page = document.getElementById("page");
  var KEY = "bacari-brief-draft";
  var art = null, draft = null, saving = false, storeTimer = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function readStore() { try { var v = sessionStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function writeStore(v) { try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function clearStore() { try { sessionStorage.removeItem(KEY); } catch (e) {} }

  function cleaned(d) {
    var out = clone(d);
    out.lede = String(out.lede).trim();
    out.feel = String(out.feel).trim();
    LIST_KEYS.forEach(function (k) {
      out[k] = out[k].map(function (t) { return String(t).replace(/\s*\n\s*/g, " ").trim(); }).filter(Boolean);
    });
    return out;
  }

  // Toolbar (lives outside #page, so it never ends up in a saved version)
  var bar = document.createElement("div");
  bar.className = "editbar";
  bar.hidden = true;
  bar.innerHTML =
    '<span class="eb-status" id="eb-status" role="status" aria-live="polite"></span>' +
    '<button type="button" class="eb-btn" id="eb-restore" hidden>Restore my edits</button>' +
    '<button type="button" class="eb-btn" id="eb-discard" hidden>Discard</button>' +
    '<button type="button" class="eb-btn primary" id="eb-edit">Edit brief</button>' +
    '<button type="button" class="eb-btn" id="eb-cancel" hidden>Cancel</button>' +
    '<button type="button" class="eb-btn primary" id="eb-save" hidden>Save changes</button>';
  document.body.appendChild(bar);
  var $ = function (id) { return document.getElementById(id); };
  function status(t) { $("eb-status").textContent = t || ""; }
  function mode(editing) {
    $("eb-edit").hidden = editing;
    $("eb-cancel").hidden = !editing;
    $("eb-save").hidden = !editing;
    $("eb-restore").hidden = true;
    $("eb-discard").hidden = true;
    document.body.classList.toggle("editing", editing);
  }

  function size(t) { t.style.height = "auto"; t.style.height = (t.scrollHeight + 2) + "px"; }
  function sizeAll() { page.querySelectorAll("textarea").forEach(size); }
  function renderEdit(focusId) {
    page.innerHTML = renderPage(draft, true);
    sizeAll();
    if (focusId) {
      var el = document.getElementById(focusId);
      if (el) { el.focus(); var n = el.value.length; el.setSelectionRange(n, n); }
    }
  }
  function enterEdit(from) {
    draft = clone(from || STATE);
    status("");
    mode(true);
    renderEdit();
  }
  function leaveEdit() {
    draft = null;
    clearStore();
    page.innerHTML = renderPage(STATE, false);
    status("");
    mode(false);
  }
  function scheduleStore() {
    clearTimeout(storeTimer);
    storeTimer = setTimeout(function () { if (draft) writeStore(draft); }, 400);
  }

  page.addEventListener("input", function (e) {
    var t = e.target;
    if (!draft || t.tagName !== "TEXTAREA") return;
    if (t.dataset.list) draft[t.dataset.list][+t.dataset.i] = t.value;
    else if (t.dataset.field) draft[t.dataset.field] = t.value;
    size(t);
    scheduleStore();
  });
  page.addEventListener("keydown", function (e) {
    var t = e.target;
    if (!draft || !t.dataset || !t.dataset.list) return;
    var key = t.dataset.list, i = +t.dataset.i;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      draft[key].splice(i + 1, 0, "");
      renderEdit("ed-" + key + "-" + (i + 1));
      scheduleStore();
    } else if (e.key === "Backspace" && t.value === "" && draft[key].length > 1) {
      e.preventDefault();
      draft[key].splice(i, 1);
      renderEdit("ed-" + key + "-" + Math.max(0, i - 1));
      scheduleStore();
    }
  });
  page.addEventListener("click", function (e) {
    if (!draft) return;
    var add = e.target.closest("[data-add]"), del = e.target.closest("[data-del]");
    if (add) {
      var k = add.dataset.add;
      draft[k].push("");
      renderEdit("ed-" + k + "-" + (draft[k].length - 1));
      scheduleStore();
    } else if (del) {
      var k2 = del.dataset.del;
      draft[k2].splice(+del.dataset.i, 1);
      renderEdit();
      scheduleStore();
    }
  });

  function readOnly(msg) {
    leaveEdit();
    bar.hidden = true;
    status(msg);
  }
  function save(retried) {
    if (!draft || saving) return;
    var next = cleaned(draft);
    if (same(next, STATE)) { leaveEdit(); return; }
    draft = next;
    writeStore(next);
    saving = true;
    $("eb-save").disabled = true;
    $("eb-cancel").disabled = true;
    status("Saving…");
    art.publish(buildDoc(next, CSS, APP)).then(function () {
      status("Saved. Updating the page…");
    }, function (err) {
      saving = false;
      $("eb-save").disabled = false;
      $("eb-cancel").disabled = false;
      var code = err && err.code;
      if (code === "conflict") {
        status("Someone else saved first. Reloading their version; you can restore your edits after.");
      } else if (["not_writer", "not_granted", "not_declared", "capability_disabled", "capability_removed", "consent_required"].indexOf(code) >= 0) {
        bar.hidden = false;
        $("eb-edit").hidden = true; $("eb-cancel").hidden = true; $("eb-save").hidden = true;
        status("This view can't save changes.");
      } else if (code === "rate_limited") {
        status("Saving too often. Wait a minute, then save again.");
      } else if (code === "too_large") {
        status("This version is too large to save. Shorten some text and try again.");
      } else if (code === "invalid_content" || code === "transform_error") {
        status("This version couldn't be saved.");
      } else if (!retried) {
        status("Retrying…");
        setTimeout(function () { save(true); }, 1000 + Math.random() * 1500);
      } else {
        status("Couldn't save right now. Your edits are still here; try again in a moment.");
      }
    });
  }

  $("eb-edit").addEventListener("click", function () { enterEdit(); });
  $("eb-cancel").addEventListener("click", leaveEdit);
  $("eb-save").addEventListener("click", function () { save(false); });
  $("eb-restore").addEventListener("click", function () { var d = readStore(); if (d) enterEdit(d); });
  $("eb-discard").addEventListener("click", function () { clearStore(); status(""); mode(false); });

  function showBar() {
    bar.hidden = false;
    mode(false);
    var saved = readStore();
    if (saved && !same(saved, STATE)) {
      status("You have unsaved edits.");
      $("eb-restore").hidden = false;
      $("eb-discard").hidden = false;
    } else {
      clearStore();
    }
  }

  if (window.claude && typeof window.claude.use === "function") {
    Promise.all([window.claude.use("artifact"), window.claude.use("user")]).then(function (r) {
      art = r[0];
      var user = r[1];
      if (!art || !user) return false;
      return user.canEdit();
    }).then(function (ok) {
      if (ok) showBar();
    }).catch(function () {});
  }
})();
