# Bacari design model: how to change it

The page `design/index.html` shows one version at a time. Versions 1-18 are single files (`versions/vN.js`) and are never edited. From version 19 on, a version is a small list, `versions/vN.json`, of part files in `parts/` plus one data file (`parts/meta.N.json`: lede, levels, notes, tags, views). A new version writes new files only for the parts it changes; the rest are shared with earlier versions. Published files are never edited.

## Making a change (from the repo root)

```
node _tools/model.mjs checkout          # live version -> _work/ (one file per part, plus meta.json)
node _tools/model.mjs find "fire pit"   # which part and line mentions it
#   edit only the part(s) you need, and meta.json if a note changes
node _tools/model.mjs check             # syntax check + headless render (PNGs in /tmp/bacari-render)
node _tools/model.mjs publish --by "Robert" --summary "One plain sentence."
```

`publish` makes the next version number, updates `versions.json` (live = new) and `CHANGELOG.md`, render-checks, commits, pushes, and waits for bacariatx.com to show it. If someone published meanwhile, it merges your edits onto their version first; if the same lines changed it stops (exit code 3) and asks you to check out again. `make-live N` points the site at an existing version. `status` shows what changed in `_work/`.

Do not read whole parts. Use `find`, then read the lines around the hit.

## Parts, in build order

The parts are pieces of one function body, `build(kit)`, run in order in one scope: a part can use anything an earlier part declared, so keep new names unique and add code after what it depends on.

| part | what is in it |
|---|---|
| helpers | kit, bar center (BX, BZ), wood deck textures (wbox, wstairs), terrain wedges, hip roofs, ground, shared materials |
| streets | W 6th, Pressler, sidewalks, curb cuts, north side |
| neighbors | title company house, back alley, Pressler Apartments and garage (`backB`, hideable), neighbor lot, salon |
| site-fences-gates | terrace, retaining wall, grades; wooden fence (`fences`), ornate W 6th gate, sliding alley gate |
| building | existing building (light blue), upper deck, service plan doors and corridor, upper-floor door, front steps |
| decks-bar | high, medium and low decks, stairs, rails, river-rock paths, central bar |
| furniture | tables, chairs, banquettes, bar stools (instanced; `flush()` draws them at the end) |
| landscaping | front path, existing landscaping, lawn, teal walls, screens, mulch beds, tall back wall |
| trees | live oaks (`liveOak`), `trees` group |
| bar-string-lights | string lights radiating from the bar, `lamps` |
| planters | corten planters with trees, troughs |
| corner-garden | north-east terraced garden, leaning trees, natives, runnel |
| night-lighting | bistro canopies, pendants, votives, sconces, path lights, tree up-lights |
| street-detail | lane markings, signs, street lights, cars |
| night-extras | candles, fairy lights, fire pit, bar pendants, lanterns (night-only groups) |
| finish | `flush()` and the return value the page needs |

The return value must stay `{fences, walls, trees, treeMats:[treeMat, fallMat], bulbMat, lamps, backB, backTags}`. The page switches night lighting by setting `intensity` on everything in `lamps` (real lights, or objects with an `intensity` setter that swap materials or show a group).

## Coordinates (feet)

- x runs west to east along W 6th St, from the west property line (x=0) to the east line (x=137).
- z runs from the W 6th sidewalk (z=0) to the back property line at the alley (z=130).
- y is height above the existing patio (y=0). Street and front terrace y=8.5; back of the lot about y=-1.9.
- Existing building x 10..56, z 40..85, two floors (upper at street level, lower at patio level), taller block at its south-west corner; upper deck along the south face (x 24..64, z 85..94) wrapping the east face (x 56..64, z 62..85).
- Concept (Robert): kitchen double door on the south wall under the deck, wall at the deck columns making a hidden service corridor; high deck along W 6th, medium deck at the NE corner and down the east side, low deck along the back, garden with the central bar in the middle (BX, BZ), tall wall at the back.

## Helpers in `kit`

`box(x0,x1,y0,y1,z0,z1,material,parent?)`, `cyl(radius,height,x,yBase,z,material,segments?)`, `stairs(x,z,yTop,yBot,dx,dz,width,material)` (starts at the edge (x,z), descends toward (dx,dz)), `put(geometry,material,x,y,z,parent?)`, `mat(hexColor,options?)`, `deckMats(topMaterial)`, `C` (shared materials), `T` (three.js r128), `scene`.

In `meta.json`, `notes[].p` and `tags[].p` are [x,y,z] positions of the numbered pins and labels; `views` are [cameraPosition, lookAt].

## Performance

The page merges meshes that share a material after `build()` (one draw call per material per group), so many small boxes are fine. Keep things that switch on and off at night in their own `T.Group` and toggle the group, not single meshes; don't keep references to single meshes to change them later (they are merged away). Change materials instead.

The full history of changes is in `CHANGELOG.md`.
