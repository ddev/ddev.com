# Logo and text feature banners

A `featureImage` that composites official project logos, and optional caption
text, on a solid background, for posts about an integration such as "Using DDEV
with X". The result is a PNG built with ImageMagick and `rsvg-convert`.

## Prerequisites

```bash
brew install librsvg   # rsvg-convert; without it ImageMagick falls back to a renderer that breaks clip-path
which rsvg-convert
which magick           # ImageMagick 7; `convert` on older installs
```

## 1. Get the official SVG logos

Never redraw a logo.

- DDEV:
  `https://raw.githubusercontent.com/ddev/ddev/main/docs/content/developers/logos/SVG/Logo_w_text.svg`
  (also `Logo.svg` for the mark alone, and dark-background variants).
- Other projects: find the brand or press page, then pull the asset URL out of
  its markup:

  ```bash
  curl -fsSL "https://example.com/brand-page" | grep -o '[^"'"'"' ]*Logo[^"'"'"' ]*\.svg'
  curl -fsSL "<svg-url>" -o ~/tmp/banner/typo3-logo.svg
  ```

Everything except the final PNG stays in `~/tmp`.

## 2. Render with `rsvg-convert`, not `magick -resize`

For an SVG with a small `viewBox`, `magick some.svg -resize WIDTHx` rasterizes
at a lower resolution and upscales, which blurs the edges. Render at the final
size, at least 2x the expected display width:

```bash
rsvg-convert -w 1800 -o typo3-raw.png typo3-logo.svg
rsvg-convert -w 1800 -o ddev-raw.png ddev-logo.svg
```

## 3. Trim to the visible bounds

Logos carry different padding inside their `viewBox`, so trim before measuring
or centering anything:

```bash
magick typo3-raw.png -trim +repage typo3-trim.png
magick ddev-raw.png -trim +repage ddev-trim.png
identify -format "%wx%h\n" typo3-trim.png
```

## 4. Caption text

Render the text on its own, trim it, and stack it under the logo with a
transparent spacer, so the gap is exact:

```bash
FONT="/System/Library/Fonts/Supplemental/Arial Bold.ttf"   # macOS; on Linux pick a bold font from `fc-list`

magick -background none -fill "#1e2127" -font "$FONT" -pointsize 190 label:"share" \
  -trim +repage text-caption.png

magick -size 1800x30 xc:none spacer.png   # width matches the logo; height is the gap

magick -gravity center ddev-trim.png spacer.png text-caption.png \
  -background none -append -trim +repage ddev-block.png
```

Without `-gravity center` before `-append`, images of different widths are
left-aligned.

## 5. Canvas

`FeatureImage.astro` shows the whole image on the post page, but
`BlogPostCard.astro` crops it to 3:2 in listings. Use a 3:2 canvas such as
2400x1600, so nothing is cut off:

```bash
magick -size 2400x1600 xc:"#f7f8fa" banner-bg.png
```

## 6. Layout

- Wide wordmarks (about 3:1 to 4:1): stack them. Side by side, two of them
  shrink to slivers.
- Square marks: side by side, with a small "+", "×", or arrow between them.

Composite with explicit offsets computed from the trimmed sizes. Add up the
margins, logo heights, and gaps, check the total fits the canvas height, and
split what is left between the top and bottom margins:

```bash
magick banner-bg.png \
  typo3-trim.png  -gravity North -geometry +0+210 -composite \
  ddev-block.png  -gravity North -geometry +0+801 -composite \
  final-banner.png
```

## 7. Verify numerically

If you cannot view the PNG, sample it:

```bash
# Color at a point where a logo should be
magick final-banner.png -format "%[pixel:p{420,450}]" info:

# Bounding box of non-background content in a band, to catch misplaced or missing elements
magick final-banner.png -crop 2400x150+0+665 +repage -fuzz 3% -transparent "#f7f8fa" \
  -format "%@" info:

# Pixel difference between two renders
magick compare -metric AE before.png after.png null:
```

## 8. Install

```bash
mkdir -p public/img/blog/YYYY/MM
cp final-banner.png public/img/blog/YYYY/MM/descriptive-name.png
```

```yaml
featureImage:
  src: /img/blog/YYYY/MM/descriptive-name.png
  alt: Descriptive alt text naming what is in the image
```
