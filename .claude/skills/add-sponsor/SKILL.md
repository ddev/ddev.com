---
name: add-sponsor
description: Add a featured sponsor to ddev.com from just its website, by finding the official logo, making a dark variant when needed, adding the entry to src/featured-sponsors.json, and checking the home page and the README badges in both themes. Use when asked to add, update, or remove a featured sponsor.
when_to_use: >
  Triggered by "add a sponsor", "new featured sponsor", "add <company> to
  sponsors", "update a sponsor logo", or a sponsor website URL given with a
  request to feature it.
argument-hint: <sponsor website URL>
---

# Adding a featured sponsor

Featured sponsors appear in the Featured Sponsors section of the home page
(`/#supporters`) and in two generated badges that the main DDEV README embeds:
`/resources/featured-sponsors.svg` and
`/resources/featured-sponsors-darkmode.svg`. All three read
`src/featured-sponsors.json`.

The only input needed is the sponsor's website. Ask for anything below that
the site does not settle.

## 1. Find the official logo

Use the sponsor's own logo file. Never draw one from memory or a description;
every part must come from the sponsor's own files.

1. Fetch the raw page with `curl -sL <url>`, not WebFetch, which summarizes
   instead of returning markup. Look for, in this order:
   - an `<img>` or `<a>` with `logo` in its `src`, `class`, `id`, or `alt`,
     usually in the header, pointing at an `.svg`
   - an inline `<svg>` in the header logo link
   - a press, brand, or media kit page (`/press`, `/brand`, `/media`)
   - `<link rel="icon" type="image/svg+xml">`, which is often only the mark
2. If there is no SVG, rebuild one from the largest raster, as described
   below. A WordPress site lists its uploads at
   `/wp-json/wp/v2/media?search=logo`. Check a larger file against the logo
   the site shows now, since an old upload can be outdated or distorted.
3. The organization's GitHub avatar (`https://github.com/<org>.png?size=400`)
   is the last resort, and right for a person, as with `dougvann.jpeg`.

Save it as `public/logos/<slug>.svg`, where `<slug>` is the lowercase name with
dashes.

### Rebuilding a raster logo

Build each part from what it is, and trace only what is left:

- **Lettering:** set it in its font. The site's CSS often names it
  (`@font-face`, Google Fonts links); otherwise compare glyph proportions with
  installed fonts. One word uses one font, so a glyph that does not fit means
  the wrong font. Convert with
  `inkscape in.svg --export-text-to-path --export-plain-svg --export-filename=out.svg`,
  then fit the scale, baseline, and each glyph's position to the raster, since
  logo text is often kerned or rotated by hand. A font the site serves works
  without installing it: point `FONTCONFIG_FILE` at a config that includes
  `/etc/fonts/fonts.conf` and adds the download folder. If a few likely fonts
  do not fit, trace the lettering instead.
- **Shapes:** draw a rectangle, circle, regular polygon, or rounded corner as
  that shape, with dimensions measured from the raster, instead of tracing it.
- **Anything else,** such as a brush mark, is traced with potrace.

A source under about 2000 px wide traces with wavy stems and notched corners
at its own size, so enlarge and blur it first; a larger one traces cleanly as
is, and the blur would round its sharp corners:

```bash
magick logo.webp -alpha extract -filter Lanczos -resize 400% -blur 0x3 \
  -negate -threshold 50% ~/tmp/<slug>.pbm
potrace ~/tmp/<slug>.pbm -s --tight -O 1 -t 4 -o ~/tmp/<slug>.svg
```

For a logo on a white background instead of a transparent one, replace
`-alpha extract` and `-negate` with `-colorspace Gray`. For several colors,
trace one mask per color, built from a channel that separates them, and stack
the layers, leaving out `--tight` so they line up. A gradient goes on after svgo has applied the transforms to the
paths, with `gradientUnits="userSpaceOnUse"`, so it spans the whole word
instead of restarting in each glyph. Remove the `width` and `height` that
potrace adds, set `fill` on the root `<svg>`, and compare the render with the
original, magnified on thin strokes, corners, counters, and line ends.

## 2. Make it self-contained

An SVG cut out of a page often depends on that page:

- It must have a `viewBox`. Copy the numbers from `width`/`height` if needed.
- Replace `currentColor`, CSS classes, and `var(--...)` fills with explicit
  colors taken from the site.
- Remove `<script>`, event handlers, and references to external files or
  fonts. Convert `<text>` to paths with Inkscape, with the font installed.
- Set the padding in the `viewBox` so the logo carries the same visual weight
  as its neighbors. The home page gives every logo the same height and the
  badges fit each into 200×50, both by the `viewBox`, so a wordmark trimmed
  to its bounds looks larger than the rest. Judge by both renders in step 5,
  not by the bounds.
- Keep it under 16 KB; most logos here are around 5 KB.
  `ddev exec npx svgo -p 1 public/logos/<slug>.svg` optimizes it in place. A
  file still over the limit usually embeds raster data or was traced with more
  points than the artwork needs.

Then render it on both backgrounds and look at the result:

```bash
rsvg-convert -h 120 -b white public/logos/<slug>.svg -o ~/tmp/<slug>-light.png
rsvg-convert -h 120 -b '#0d1117' public/logos/<slug>.svg -o ~/tmp/<slug>-dark.png
```

## 3. Dark variant

If the logo reads well on the dark render, use the same file for `darklogo`.
Otherwise copy it to `public/logos/<slug>-dark.svg` and change the near-black
fills and strokes, usually the wordmark, to `#ffffff`, keeping the brand colors
as they are. Render the copy on `#0d1117` again to check it.

## 4. Add the entry

Append to `src/featured-sponsors.json`:

```json
{
  "name": "Example GmbH",
  "type": "standard",
  "logo": "/logos/example.svg",
  "darklogo": "/logos/example-dark.svg",
  "url": "https://example.com/",
  "github": "example"
}
```

- `name`: the organization's name exactly as it writes it on its site.
- `logo`, `darklogo`, `url`: required. `darklogo` repeats `logo` when step 3
  needed no copy.
- `type`: `"major"` or `"standard"`, by contribution level. Nothing reads it
  yet.
- `github`: the GitHub login, when the sponsorship comes through GitHub.
- `isLeading`: `true` only when asked. It puts the sponsor in a separate first
  row on the home page and in both badges.
- Leave out `squareLogo`; no page displays it.

## 5. Check the result

With `ddev start` running:

```bash
for v in "" -darkmode; do
  curl -sk "https://<projectname>.ddev.site:4321/resources/featured-sponsors$v.svg" -o ~/tmp/badge$v.svg
done
rsvg-convert -w 800 -b white ~/tmp/badge.svg -o ~/tmp/badge.png
rsvg-convert -w 800 -b '#0d1117' ~/tmp/badge-darkmode.svg -o ~/tmp/badge-darkmode.png
```

View both PNGs. The new logo must be visible, in proportion with its
neighbors, and not cut off. A badge route that fails to build usually means
`sharp` could not read the SVG, so go back to step 2. Then check `/#supporters`
on the dev server in both themes, using the theme toggle in the header, at
desktop and phone width. If the logo looks too large there next to the others,
add padding to its `viewBox` as in step 2 and set `height` to match, which also
shrinks it in the badges. Only a logo that must look larger than its tight
`viewBox` allows gets an entry in `nudges` in
`src/components/FeaturedSponsors.astro`, keyed by `name`, with a height for
phones and one from `sm` up, such as `h-10 sm:h-15`.

## 6. Commit

Title `chore(sponsor): add <name>`. Follow `/ddev:commit`. Manual
Testing Instructions compare the preview's `/#supporters` and both badge URLs
against https://ddev.com/, and the PR should include the two badge renders.
