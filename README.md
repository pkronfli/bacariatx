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
- The brief's text lives in a Google Sheet (Drive folder "Bacari", sheet "Bacari Austin – Architect Brief"), one row per paragraph or bullet. Headings, subtitles and the spec strip are rows named `title:<key>` (e.g. `title:siteTitle`); deleting one brings back its default.
- `brief/edit.js` loads the latest text from the Sheet through a Google Apps Script web app ("Bacari brief API", bound to the Sheet) and draws it with `brief/render.js`.
- To edit: open https://bacariatx.com/brief/#edit, enter the edit passcode, change text, Save. Everyone sees the change on their next load.
- The passcode is checked by the Apps Script (it stores only a SHA-256 hash). 15 wrong tries locks editing for 15 minutes.
- To change the passcode: put the SHA-256 hex of the new passcode in `PASS_HASH` in the Apps Script, then Deploy → Manage deployments → edit → New version.
- `brief/state.json` is a fallback copy, used only if the Sheet can't be reached.
- The brief is marked `noindex` and is left out of the sitemap, so search engines skip it.
- `_tools/sync_brief.js` is retired (it copied from the old Claude version of the brief). Don't run it with `--full`: it would rebuild `index.html` without edit mode.
- Folders starting with `_` are not published by GitHub Pages.
