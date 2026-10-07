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

Use the sponsor's own logo file. Never redraw or approximate one.

1. Fetch the raw page with `curl -sL <url>`, not WebFetch, which summarizes
   instead of returning markup. Look for, in this order:
   - an `<img>` or `<a>` with `logo` in its `src`, `class`, `id`, or `alt`,
     usually in the header, pointing at an `.svg`
   - an inline `<svg>` in the header logo link
   - a press, brand, or media kit page (`/press`, `/brand`, `/media`)
   - `<link rel="icon" type="image/svg+xml">`, which is often only the mark
2. If there is no SVG, use the largest PNG available, and say so in the PR.
   The organization's GitHub avatar (`https://github.com/<org>.png?size=400`)
   is the last resort, and right for a person, as with `dougvann.jpeg`.

Save it as `public/logos/<slug>.svg`, where `<slug>` is the lowercase name with
dashes.

## 2. Make it self-contained

An SVG cut out of a page often depends on that page:

- It must have a `viewBox`. Copy the numbers from `width`/`height` if needed.
- Replace `currentColor`, CSS classes, and `var(--...)` fills with explicit
  colors taken from the site.
- Remove `<script>`, event handlers, and references to external files or
  fonts. Text has to be paths already; if it is `<text>`, find another file.
- Trim empty space around the artwork by tightening the `viewBox`, since the
  badges size each logo by its bounds.

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
on the dev server in both themes, using the theme toggle in the header. If the
logo looks too large or small there next to the others, add a Tailwind height
class for it to `nudges` in `src/components/FeaturedSponsors.astro`, keyed by
`name`.

## 6. Commit

Title `chore(sponsor): add <name>`. Follow the `ddev-commit` skill. Manual
Testing Instructions compare the preview's `/#supporters` and both badge URLs
against https://ddev.com/, and the PR should include the two badge renders.
