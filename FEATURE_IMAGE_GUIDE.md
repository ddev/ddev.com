# Building a Logo + Text Feature Image

This guide covers building a `featureImage` banner for a blog post by compositing official
project logos (and optional caption text) on a solid background, using command-line tools
instead of a design app. It's the right approach for posts about integrations between two
tools/projects (e.g. "Using DDEV with X"), where recognizable brand marks communicate the
topic faster than a screenshot.

This produces a raster PNG via ImageMagick and `rsvg-convert`. It does not require Photoshop,
Figma, or any GUI tool — everything below runs from the shell.

## Prerequisites

```bash
brew install librsvg   # provides `rsvg-convert`; ImageMagick's own SVG delegate falls back to a
                        # much lower-quality renderer when this isn't installed
which rsvg-convert     # confirm it's on PATH before continuing
which magick            # ImageMagick 7 (the `magick` binary); `convert` also works on older installs
```

## Step 1: Get official SVG logos, not recreations

Always prefer the project's own brand assets over hand-drawn approximations — colors, exact
shapes, and stroke weights matter for recognizability, and an approximation will look "off" to
anyone familiar with the brand.

- DDEV's official logos live in the `ddev/ddev` repository:
  `https://raw.githubusercontent.com/ddev/ddev/main/docs/content/developers/logos/SVG/Logo_w_text.svg`
  (also `Logo.svg` for the icon mark alone, and dark-background variants).
- Other projects usually publish a brand/press page (search "`<project>` brand assets SVG"). Check the
  page's rendered HTML for the logo's actual asset URL — view source or `curl` the page and `grep`
  for `.svg`:

  ```bash
  curl -fsSL "https://example.com/brand-page" | grep -o '[^"'"'"' ]*Logo[^"'"'"' ]*\.svg'
  ```

Download the SVG(s) into a scratch directory (not the repository) — these are intermediate build
inputs, not site assets:

```bash
curl -fsSL "<svg-url>" -o /path/to/scratch/typo3-logo.svg
```

## Step 2: Render each SVG to PNG with `rsvg-convert` directly

**Do not** rasterize via `magick some.svg -resize WIDTHx out.png`. For SVGs with a small
viewBox, ImageMagick's resize-density heuristics can rasterize at a lower internal resolution
than requested and then upscale the result, producing visibly blurry/jagged edges — this is a
real bug we hit, confirmed by diffing the two render paths (`magick compare -metric AE`) and
finding ~24% of pixels differed between them.

Instead, invoke `rsvg-convert` directly and let it rasterize the vector at the exact final
pixel size:

```bash
rsvg-convert -w 1800 -o typo3-raw.png typo3-logo.svg
rsvg-convert -w 1800 -o ddev-raw.png ddev-logo.svg
```

Render at (at least) 2x the pixel size you expect to display the final image at. The site may
display the image wider than its native resolution on high-DPI screens, and upscaling a
low-resolution raster always looks softer than downscaling a high-resolution one.

## Step 3: Trim each render to its true visual bounding box

SVG viewBoxes often have inconsistent padding between different logos (or even within the
same logo when you add elements to it later). If you center images by their nominal canvas
size instead of their actual ink, unrelated logos end up visually misaligned even though
they're "centered" — this happened when a wordmark's baseline didn't match a mark-only icon's
optical center.

```bash
magick typo3-raw.png -trim +repage typo3-trim.png
magick ddev-raw.png -trim +repage ddev-trim.png
```

Always trim before you reason about width/height/centering. Check the result:

```bash
identify -format "%wx%h\n" typo3-trim.png
```

## Step 4: Build any caption text as its own trimmed image

If you're adding a caption under a logo (e.g. a command name like "share"), render the text
separately, trim it, then stack it onto the logo with a transparent spacer for the gap — this
keeps the gap size deterministic and keeps both elements centered relative to each other
regardless of their individual widths:

```bash
FONT="/System/Library/Fonts/Supplemental/Arial Bold.ttf"

magick -background none -fill "#1e2127" -font "$FONT" -pointsize 190 label:"share" \
  -trim +repage text-caption.png

magick -size 1800x30 xc:none spacer.png   # width matches the logo; height is the gap

magick -gravity center ddev-trim.png spacer.png text-caption.png \
  -background none -append -trim +repage ddev-block.png
```

`-gravity center` before `-append` is required — without it, `-append` left-aligns images of
different widths instead of centering them.

## Step 5: Pick a canvas size that won't get cropped

Check how the site actually displays `featureImage` before choosing dimensions — a banner that
looks right full-size can get clipped in a smaller UI element. On ddev.com specifically:

- `FeatureImage.astro` (the full blog post hero) renders at `w-full h-auto` — any aspect ratio
  is safe there.
- `BlogPostCard.astro` (the blog listing thumbnail) renders with `aspect-3/2 object-cover` —
  this **crops** any image whose aspect ratio is wider than 3:2. The safe content width is
  `canvas_height * 1.5`; anything outside that horizontally gets sliced off in card view.

The simplest fix is to make the canvas exactly 3:2 (e.g. `1500x1000`, `2400x1600`) so there's
never anything to crop, on either surface.

```bash
magick -size 2400x1600 xc:"#f7f8fa" banner-bg.png
```

## Step 6: Choose a layout that matches the logos' natural shape

- **Wide/short wordmarks** (most "logo + text" lockups, aspect ratio ~3:1–4:1): stack them
  top-to-bottom. Side by side, two wordmarks plus a margin/gap rarely fit a reasonable canvas
  width without shrinking both logos down to a sliver; stacked, each one can span most of the
  canvas width and end up dramatically larger.
- **Square-ish icon marks** (aspect ratio near 1:1): side by side with a small connecting
  element (arrow, "+", "×") works well, since neither logo dominates the layout.

Composite with `-gravity North` (or `South`/`West`/`East`) and explicit pixel offsets computed
from the trimmed dimensions from Step 3–4:

```bash
magick banner-bg.png \
  typo3-trim.png  -gravity North -geometry +0+210 -composite \
  ddev-block.png  -gravity North -geometry +0+801 -composite \
  final-banner.png
```

Do the arithmetic explicitly rather than eyeballing offsets: sum up margin, logo height, gap,
and block height, confirm the total is less than the canvas height, then split the leftover
space into top/bottom margins.

## Step 7: Verify placement and color numerically — don't just eyeball it

If you (the agent) can't visually preview the rendered PNG, use ImageMagick to sample pixels
and bounding boxes instead of guessing:

```bash
# Confirm a specific brand color lands where a logo should be
magick final-banner.png -format "%[pixel:p{420,450}]" info:

# Find the bounding box of non-background content in a region (catches misplaced/oversized
# elements, or elements that silently didn't render)
magick final-banner.png -crop 2400x150+0+665 +repage -fuzz 3% -transparent "#f7f8fa" \
  -format "%@" info:

# Diff two renders to catch regressions (e.g. before/after switching rasterizers)
magick compare -metric AE before.png after.png null:
```

This turns "does it look right" into a checkable assertion, and it's how the rsvg-convert bug
in Step 2 was actually caught and confirmed fixed.

## Step 8: Save, wire up, and lint

```bash
mkdir -p public/img/blog/YYYY/MM
cp final-banner.png public/img/blog/YYYY/MM/descriptive-name.png
```

```yaml
featureImage:
  src: /img/blog/YYYY/MM/descriptive-name.png
  alt: Descriptive alt text naming what's actually in the image
```

Then run the site's normal content checks:

```bash
ddev npm run prettier:fix
ddev npm run textlint
```

Clean up intermediate SVGs/PNGs from the scratch directory — only the final composited PNG
belongs in the repository.

## Common pitfalls (all hit while building this workflow)

- **Missing `rsvg-convert`** makes ImageMagick fall back to its own SVG renderer, which doesn't
  handle `clip-path` correctly — logos using it can come out visibly broken (parts of shapes
  will be wrong/missing). Install `librsvg` first.
- **Rasterizing via `magick file.svg -resize`** instead of `rsvg-convert -w` can produce
  blurry/jagged output for small-viewBox SVGs — always render directly at the target size.
- **Centering by nominal canvas size instead of trimmed bounds** misaligns logos with different
  amounts of internal padding — always `-trim` before positioning.
- **Canvas aspect ratio wider than the site's card-thumbnail crop ratio** gets its edges cut
  off in listing views, even though it looks fine on the full post page — match the crop ratio.
- **Final resolution too close to intended display size** looks soft once the browser scales
  it up on a high-DPI screen — render at 2x+ the expected display size.
