(function () {
var IMG = {
    logo: "img/logo.png",
    deck: "img/deck.jpg",
    treebar: "img/treebar.jpg",
    garden: "img/garden.jpg",
    food: "img/food_d.jpg",
    inBar: "img/in_bar.jpg",
    inBanquette: "img/in_banquette.jpg",
    inFireplace: "img/in_fireplace.jpg",
    inHerbbar: "img/in_herbbar.jpg"
  };
  
function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }

  var TITLES = {
    eyebrow: "Architect brief \u00b7 Bacari Austin",
    headline: "Rebuilding a fire-damaged restaurant on",
    headlineAccent: "West 6th Street.",
    spec1Label: "Site", spec1Value: "West 6th St", spec1Note: "Former Bar Peached",
    spec2Label: "Interior", spec2Value: "~3,400 sf", spec2Note: "Two floors",
    spec3Label: "Exterior", spec3Value: "~5,000 sf", spec3Note: "Decks, patio, lot",
    spec4Label: "Hot line", spec4Value: "18 ft", spec4Note: "No wood oven",
    spec5Label: "Condition", spec5Value: "Fire damage", spec5Note: "Foundation intact",
    siteTitle: "The site today", buildTitle: "What we want to build",
    feelTitle: "The Bacari feel", insideTitle: "Inside", outsideTitle: "Outside",
    servicesTitle: "Services we need", howTitle: "How we work",
    askTitle: "Please bring to our first call"
  };
  var TITLE_LABELS = {
    eyebrow: "Small heading above the headline", headline: "Headline", headlineAccent: "Headline, colored ending",
    siteTitle: "Section title", buildTitle: "Section title", feelTitle: "Section title", insideTitle: "Photo group title",
    outsideTitle: "Photo group title", servicesTitle: "Section title", howTitle: "Section title", askTitle: "Section title"
  };
  function T(st, k) { var v = st.titles && st.titles[k]; return v ? v : TITLES[k]; }
  function tt(st, k, edit) {
    if (!edit) return esc(T(st, k));
    var m = /^spec(\d)(Label|Value|Note)$/.exec(k);
    var label = m ? "Spec " + m[1] + " " + m[2].toLowerCase() : TITLE_LABELS[k];
    var attrs = 'class="ed-title" id="ed-t-' + k + '" data-title="' + k + '" placeholder="' + esc(TITLES[k]) + '" aria-label="' + esc(label) + '"';
    if (k === "headline" || k === "headlineAccent") return '<textarea ' + attrs + ' rows="1">' + esc(T(st, k)) + '</textarea>';
    return '<input ' + attrs + ' value="' + esc(T(st, k)) + '" autocomplete="off">';
  }
  function spec(st, n, edit) {
    var p = "spec" + n;
    return '<div class="spec"><dt>' + tt(st, p + "Label", edit) + '</dt><dd>' + tt(st, p + "Value", edit) + '<small>' + tt(st, p + "Note", edit) + '</small></dd></div>';
  }

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
  '<p class="eyebrow">' + tt(st, "eyebrow", edit) + '</p>' +
  '<h1' + (edit ? ' class="ed-h1"' : '') + '>' + tt(st, "headline", edit) + ' <span>' + tt(st, "headlineAccent", edit) + '</span></h1>' +
  para(st, "lede", "lede", edit, "Introduction") +
'</div></div>' +
'<div class="wrap body">' +
  (edit ? '<p class="ed-note">You\'re editing. Titles, subtitles and the numbers up top can be changed too. Press Enter in a bullet to start a new one. Wrap words in <code>**double asterisks**</code> to make them bold. Nothing changes for anyone else until you tap Save changes.</p>' : '') +
  fig(IMG.deck, "Bacari Silver Lake patio: tiered decks and dining built around large trees, with string lights and a fire pit", "Bacari Silver Lake. Tiered decks and a patio built around the trees, the kind of outdoor room we want in Austin.", "hero") +
  '<dl class="specs">' +
    spec(st, 1, edit) +
    spec(st, 2, edit) +
    spec(st, 3, edit) +
    spec(st, 4, edit) +
    spec(st, 5, edit) +
  '</dl>' +
  '<div class="grid">' +
    '<section><h2>' + tt(st, "siteTitle", edit) + '</h2>' + list(st, "site", edit) + '</section>' +
    '<section><h2>' + tt(st, "buildTitle", edit) + '</h2>' + list(st, "build", edit) + '</section>' +
  '</div>' +
  '<section><h2>' + tt(st, "feelTitle", edit) + '</h2>' + para(st, "feel", "", edit, "Bacari feel paragraph") +
    '<div class="feel"><div><h3>' + tt(st, "insideTitle", edit) + '</h3><div class="strip four">' +
      fig(IMG.inBar, "Bacari Sherman Oaks bar with dark wood counter, green stools and checkered tile floor", "Sherman Oaks · main bar") +
      fig(IMG.inBanquette, "Bacari West 3rd dining room with wood beams, white walls, framed portraits and a leather banquette", "West 3rd · beams and banquette") +
      fig(IMG.inFireplace, "Bacari Sherman Oaks fireplace nook with velvet chairs and candlelit table", "Sherman Oaks · fireplace nook") +
      fig(IMG.inHerbbar, "Bacari Sherman Oaks bar with copper stools, hanging herbs and a suspended bottle shelf", "Sherman Oaks · herb-hung bar") +
    '</div></div><div><h3>' + tt(st, "outsideTitle", edit) + '</h3><div class="strip">' +
      fig(IMG.treebar, "Bacari Silver Lake bar opening onto a patio with a large tree growing through it", "Silver Lake · bar open to the patio") +
      fig(IMG.garden, "Bacari West 3rd garden patio at night with tables under a large tree", "West 3rd · garden patio") +
      fig(IMG.food, "A wooden table filled with Bacari small plates: sliders, salads, crab cakes and grilled meats", "A table of small plates to share") +
    '</div></div></div>' +
  '</section>' +
  '<div class="grid">' +
    '<section><h2>' + tt(st, "servicesTitle", edit) + '</h2>' + list(st, "services", edit) + '</section>' +
    '<section><h2>' + tt(st, "howTitle", edit) + '</h2>' + list(st, "how", edit) + '</section>' +
  '</div>' +
  '<section class="ask"><h2>' + tt(st, "askTitle", edit) + '</h2>' + list(st, "ask", edit, true) + '</section>' +
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

  
  window.renderBriefPage = renderPage;
  window.BRIEF_TITLES = TITLES;
  window.renderBrief = function (st) { return renderPage(st, false); };
})();
