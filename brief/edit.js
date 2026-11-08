// bacariatx.com/brief: asks visitors for their email (logged to the Sheet's
// Visitors tab), shows the latest brief from the Google Sheet, and lets anyone
// with the edit passcode change it right on the page (open /brief/#edit).
(function () {
  var API = "https://script.google.com/macros/s/AKfycbyVvdti3yKezbq1lsZQT1v9mtqs0MGhXeTRaTwxCKhdnLOub9u9mARI_8mumLeANcbA/exec";
  var LIST_KEYS = ["site", "build", "services", "how", "ask"];
  var PASS_KEY = "bacari-brief-pass", DRAFT_KEY = "bacari-brief-draft", EMAIL_KEY = "bacari-brief-email";
  var page = document.getElementById("page");
  if (!page || !window.renderBriefPage || !window.fetch) return;

  var STATE = null, draft = null, pass = null, busy = false, storeTimer = null;
  var gated = false, waiting = null, isEditor = false;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function canon(v) {
    if (Array.isArray(v)) return "[" + v.map(canon).join(",") + "]";
    if (v && typeof v === "object") return "{" + Object.keys(v).sort().map(function (k) { return JSON.stringify(k) + ":" + canon(v[k]); }).join(",") + "}";
    return JSON.stringify(v);
  }
  function same(a, b) {
    var x = clone(a), y = clone(b);
    x.titles = x.titles || {}; y.titles = y.titles || {};
    return canon(x) === canon(y);
  }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function valid(st) {
    return st && typeof st.lede === "string" && typeof st.feel === "string" &&
      LIST_KEYS.every(function (k) { return Array.isArray(st[k]); });
  }
  function cleaned(d) {
    var out = clone(d);
    out.lede = String(out.lede).trim();
    out.feel = String(out.feel).trim();
    var ti = {}, src = out.titles || {};
    Object.keys(window.BRIEF_TITLES || {}).forEach(function (k) {
      var v = String(src[k] == null ? "" : src[k]).replace(/\s+/g, " ").trim();
      if (v) ti[k] = v;
    });
    out.titles = ti;
    LIST_KEYS.forEach(function (k) {
      out[k] = out[k].map(function (t) { return String(t).replace(/\s*\n\s*/g, " ").trim(); }).filter(Boolean);
    });
    return out;
  }
  function show(st) {
    if (gated) { waiting = st; return; }
    var html = window.renderBriefPage(st, false);
    if (page.innerHTML !== html) page.innerHTML = html;
  }

  // Talking to the Sheet (Google Apps Script). text/plain keeps the browser from
  // sending a CORS preflight, which Apps Script can't answer.
  function api(body) {
    var opts = body ? { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) }
                    : { cache: "no-store" };
    return fetch(API, opts).then(function (r) {
      if (!r.ok) throw new Error("http_" + r.status);
      return r.json();
    });
  }
  // Draw the saved copy right away (fast), then swap in the Sheet's latest text.
  var live = false;
  var backup = fetch("state.json").then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  backup.then(function (st) {
    if (!live && valid(st) && !draft) { show(st); page.removeAttribute("aria-busy"); }
  });
  function loadLatest() {
    return api().then(function (r) {
      if (r && r.ok && valid(r.state)) { live = true; return r.state; }
      throw new Error("bad_state");
    }).catch(function () { return backup; });
  }

  // ---------- Email gate ----------
  var EMAIL_RE = /^[a-z0-9][a-z0-9._%+-]*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/;
  function logVisit(email) {
    return api({ action: "visit", email: email, ref: document.referrer.slice(0, 200) }).then(function (r) {
      if (r && r.ok && r.editor) { isEditor = true; if (!draft && bar.hidden) offerEdit(); }
      return r;
    });
  }
  function gate() {
    gated = true;
    var T = window.BRIEF_TITLES || {};
    page.innerHTML =
      '<header class="top"><div class="wrap"><img class="logo" src="img/logo.png" alt="bacari"></div></header>' +
      '<main class="gate"><div class="wrap"><form class="gate-card" id="gate-form" novalidate>' +
        '<p class="eyebrow">' + esc(T.eyebrow || "Architect brief") + '</p>' +
        '<h1>' + esc(T.headline || "") + ' <span>' + esc(T.headlineAccent || "") + '</span></h1>' +
        '<p class="lede">Enter your email to read the brief.</p>' +
        '<div class="gate-row">' +
          '<label class="sr" for="gate-email">Email</label>' +
          '<input id="gate-email" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="you@yourfirm.com" required>' +
          '<button class="btn" type="submit" id="gate-go">View the brief</button>' +
        '</div>' +
        '<p class="gate-msg" id="gate-msg" role="status" aria-live="polite"></p>' +
        '<p class="gate-note">We only use it to follow up about this project.</p>' +
      '</form></div></main>';
    page.removeAttribute("aria-busy");
    document.getElementById("gate-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("gate-email"), msg = document.getElementById("gate-msg"), go = document.getElementById("gate-go");
      var email = input.value.trim().toLowerCase();
      if (!EMAIL_RE.test(email) || email.length > 254) { msg.textContent = "Please enter a valid email address."; input.focus(); return; }
      go.disabled = true;
      msg.textContent = "Opening the brief…";
      var done = false;
      function open() {
        if (done) return;
        done = true;
        set(EMAIL_KEY, email);
        gated = false;
        page.innerHTML = "";
        page.setAttribute("aria-busy", "true");
        if (waiting) { show(waiting); page.removeAttribute("aria-busy"); }
        window.scrollTo(0, 0);
      }
      // Let them in even if logging is slow or fails; the next visit logs again.
      logVisit(email).then(open, open);
      setTimeout(open, 4000);
    });
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function offerEdit() {
    bar.hidden = false;
    only(["eb-edit", "eb-close"]);
    status("");
  }

  // ---------- Bottom bar ----------
  var bar = document.createElement("div");
  bar.className = "editbar";
  bar.hidden = true;
  bar.innerHTML =
    '<form class="eb-pass" id="eb-pass" hidden>' +
      '<label class="sr" for="eb-code">Edit passcode</label>' +
      '<input id="eb-code" type="password" placeholder="Edit passcode" autocomplete="current-password" spellcheck="false" autocapitalize="off" required>' +
      '<button type="submit" class="eb-btn primary" id="eb-unlock">Unlock</button>' +
    '</form>' +
    '<span class="eb-status" id="eb-status" role="status" aria-live="polite"></span>' +
    '<button type="button" class="eb-btn" id="eb-restore" hidden>Restore my edits</button>' +
    '<button type="button" class="eb-btn" id="eb-discard" hidden>Discard</button>' +
    '<button type="button" class="eb-btn" id="eb-lock" hidden>Lock</button>' +
    '<button type="button" class="eb-btn primary" id="eb-edit" hidden>Edit brief</button>' +
    '<button type="button" class="eb-btn" id="eb-cancel" hidden>Cancel</button>' +
    '<button type="button" class="eb-btn primary" id="eb-save" hidden>Save changes</button>' +
    '<button type="button" class="eb-btn eb-x" id="eb-close" aria-label="Close editing" hidden>×</button>';
  document.body.appendChild(bar);
  var $ = function (id) { return document.getElementById(id); };
  function status(t) { $("eb-status").textContent = t || ""; }
  function only(ids) {
    ["eb-pass", "eb-restore", "eb-discard", "eb-lock", "eb-edit", "eb-cancel", "eb-save", "eb-close"].forEach(function (id) {
      $(id).hidden = ids.indexOf(id) < 0;
    });
  }

  function askPasscode(msg) {
    bar.hidden = false;
    document.body.classList.remove("editing");
    only(["eb-pass", "eb-close"]);
    status(msg || "");
    $("eb-code").value = "";
    $("eb-code").focus();
  }
  function ready(msg) {
    bar.hidden = false;
    document.body.classList.remove("editing");
    only(["eb-edit", "eb-lock", "eb-close"]);
    status(msg || "");
    var saved = readDraft();
    if (saved && STATE && !same(cleaned(saved), STATE)) {
      status("You have unsaved edits.");
      $("eb-restore").hidden = false;
      $("eb-discard").hidden = false;
    } else if (saved) {
      del(DRAFT_KEY);
    }
  }
  function closeBar() {
    if (draft) leaveEdit();
    bar.hidden = true;
    status("");
    if (location.hash === "#edit") history.replaceState(null, "", location.pathname + location.search);
  }

  // ---------- Editing ----------
  function readDraft() { var v = get(DRAFT_KEY); try { return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function size(t) { t.style.height = "auto"; t.style.height = (t.scrollHeight + 2) + "px"; }
  function renderEdit(focusId) {
    page.innerHTML = window.renderBriefPage(draft, true);
    page.querySelectorAll("textarea").forEach(size);
    if (focusId) {
      var el = document.getElementById(focusId);
      if (el) { el.focus(); var n = el.value.length; el.setSelectionRange(n, n); }
    }
  }
  function enterEdit(from) {
    if (!STATE) return;
    draft = clone(from || STATE);
    var full = {};
    Object.keys(window.BRIEF_TITLES || {}).forEach(function (k) {
      full[k] = (draft.titles && draft.titles[k]) || window.BRIEF_TITLES[k];
    });
    draft.titles = full;
    only(["eb-cancel", "eb-save"]);
    status("");
    document.body.classList.add("editing");
    renderEdit();
  }
  function leaveEdit() {
    draft = null;
    del(DRAFT_KEY);
    show(STATE);
    ready("");
  }
  function scheduleStore() {
    clearTimeout(storeTimer);
    storeTimer = setTimeout(function () { if (draft) set(DRAFT_KEY, JSON.stringify(draft)); }, 400);
  }

  page.addEventListener("input", function (e) {
    var t = e.target;
    if (!draft) return;
    if (t.dataset && t.dataset.title) { draft.titles[t.dataset.title] = t.value; if (t.tagName === "TEXTAREA") size(t); scheduleStore(); return; }
    if (t.tagName !== "TEXTAREA") return;
    if (t.dataset.list) draft[t.dataset.list][+t.dataset.i] = t.value;
    else if (t.dataset.field) draft[t.dataset.field] = t.value;
    size(t);
    scheduleStore();
  });
  page.addEventListener("keydown", function (e) {
    var t = e.target;
    if (draft && t.dataset && t.dataset.title && e.key === "Enter") { e.preventDefault(); return; }
    if (!draft || !t.dataset || !t.dataset.list) return;
    var key = t.dataset.list, i = +t.dataset.i;
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
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
    var add = e.target.closest("[data-add]"), rm = e.target.closest("[data-del]");
    if (add) {
      var k = add.dataset.add;
      draft[k].push("");
      renderEdit("ed-" + k + "-" + (draft[k].length - 1));
      scheduleStore();
    } else if (rm) {
      draft[rm.dataset.del].splice(+rm.dataset.i, 1);
      renderEdit();
      scheduleStore();
    }
  });

  function lockOut(r) {
    if (r && r.error === "wrong_passcode") { del(PASS_KEY); pass = null; askPasscode("That passcode didn't work."); return true; }
    if (r && r.error === "locked") { askPasscode("Too many wrong tries. Wait 15 minutes and try again."); return true; }
    return false;
  }

  function save() {
    if (!draft || busy) return;
    var next = cleaned(draft);
    if (same(next, STATE)) { leaveEdit(); return; }
    draft = next;
    set(DRAFT_KEY, JSON.stringify(next));
    busy = true;
    $("eb-save").disabled = $("eb-cancel").disabled = true;
    status("Saving…");
    api({ action: "save", passcode: pass, state: next }).then(function (r) {
      busy = false;
      $("eb-save").disabled = $("eb-cancel").disabled = false;
      if (r && r.ok && valid(r.state)) {
        STATE = r.state;
        draft = null;
        del(DRAFT_KEY);
        show(STATE);
        ready("Saved. Everyone sees this now.");
      } else if (!lockOut(r)) {
        status("Couldn't save. Your edits are still here; try again.");
      }
    }, function () {
      busy = false;
      $("eb-save").disabled = $("eb-cancel").disabled = false;
      status("Couldn't reach the server. Your edits are still here; try again in a moment.");
    });
  }

  $("eb-pass").addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    var code = $("eb-code").value.trim();
    if (!code) return;
    busy = true;
    $("eb-unlock").disabled = true;
    status("Checking…");
    api({ action: "check", passcode: code }).then(function (r) {
      busy = false;
      $("eb-unlock").disabled = false;
      if (r && r.ok) { pass = code; set(PASS_KEY, code); ready(""); enterEdit(); }
      else if (!lockOut(r)) status("Couldn't check the passcode. Try again.");
    }, function () {
      busy = false;
      $("eb-unlock").disabled = false;
      status("Couldn't reach the server. Try again in a moment.");
    });
  });
  $("eb-edit").addEventListener("click", function () {
    pass = pass || get(PASS_KEY);
    if (pass) enterEdit(); else askPasscode("");
  });
  $("eb-cancel").addEventListener("click", leaveEdit);
  $("eb-save").addEventListener("click", save);
  $("eb-restore").addEventListener("click", function () { var d = readDraft(); if (d) enterEdit(d); });
  $("eb-discard").addEventListener("click", function () { del(DRAFT_KEY); ready(""); });
  $("eb-lock").addEventListener("click", function () { del(PASS_KEY); pass = null; askPasscode("Locked on this device."); });
  $("eb-close").addEventListener("click", closeBar);

  function route() {
    if (location.hash !== "#edit" || draft) return;
    if (!STATE) { bar.hidden = false; only(["eb-close"]); status("Loading…"); return; }
    pass = get(PASS_KEY);
    if (pass) ready(""); else askPasscode("");
  }
  window.addEventListener("hashchange", route);
  window.addEventListener("beforeunload", function (e) {
    if (draft && STATE && !same(cleaned(draft), STATE)) { e.preventDefault(); e.returnValue = ""; }
  });

  if (location.hash !== "#edit") {
    var known = get(EMAIL_KEY);
    if (known && EMAIL_RE.test(known)) logVisit(known).catch(function () {});
    else gate();
  }
  route();
  loadLatest().then(function (st) {
    if (!valid(st)) {
      if (location.hash === "#edit") status("Couldn't load the brief. Refresh to try again.");
      if (!page.innerHTML) page.innerHTML = '<p class="wrap" style="padding-block:40px">The brief couldn\'t load. Refresh to try again, or email Danny Kronfli at danny@bacari.us.</p>';
      page.removeAttribute("aria-busy");
      return;
    }
    STATE = st;
    if (!draft) show(st);
    if (gated) return;
    page.removeAttribute("aria-busy");
    route();
  });
})();
