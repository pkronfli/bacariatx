# bacariatx.com

Website for Bacari Austin, served by GitHub Pages.

## Every page on this domain includes
- Title (under ~65 characters) and meta description (under ~160 characters)
- Canonical URL and robots tag (`noindex` on utility pages like 404)
- Favicons: `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, plus `site.webmanifest` with 192/512 icons
- Theme color `#08223b` (Bacari navy)
- Open Graph and Twitter card tags with `og-image.jpg` (1200×630) and alt text
- Restaurant structured data (JSON-LD) on the homepage

## Files
- `index.html` coming-soon homepage (images embedded)
- `404.html` sends any wrong address back to the homepage
- `robots.txt`, `sitemap.xml` for search engines
- `build_site.py.txt` the script that writes each page's head; reuse it for new pages

## Architect brief (bacariatx.com/brief)
- The editable master is the Claude version of the brief. This folder is a read-only copy.
- `_tools/sync_brief.js` rebuilds `brief/` from a saved copy of the Claude page:
  `node _tools/sync_brief.js saved-brief.html` (exits 3 when nothing changed).
- The brief is marked `noindex` and is left out of the sitemap, so search engines skip it.
- Folders starting with `_` are not published by GitHub Pages.
