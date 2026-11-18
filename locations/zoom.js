// Tap a photo to see it larger. Esc, a tap or the close button closes it.
(function () {
  var box = document.createElement("div");
  box.className = "zoom"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Photo");
  box.innerHTML = '<button type="button" aria-label="Close">×</button><div><img alt=""><p></p></div>';
  document.body.appendChild(box);
  var big = box.querySelector("img"), cap = box.querySelector("p"), btn = box.querySelector("button"), last = null;
  function open(img) {
    last = img;
    big.src = img.src.replace(/\/v1\/(fit|fill)\/w_\d+,h_\d+\//, "/v1/fit/w_2200,h_2200/");
    big.alt = img.alt; cap.textContent = img.alt;
    box.hidden = false; btn.focus();
  }
  function close() { box.hidden = true; big.removeAttribute("src"); if (last) last.focus(); }
  document.querySelectorAll(".body figure img").forEach(function (img) {
    img.tabIndex = 0;
    img.addEventListener("click", function () { open(img); });
    img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); } });
  });
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
})();
