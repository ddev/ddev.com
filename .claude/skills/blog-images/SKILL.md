---
name: blog-images
description: Make images for ddev.com blog posts, including terminal screenshots of DDEV output rendered with VHS, animated before/after comparisons of two DDEV versions, hand-written SVG feature images, and logo-and-text feature banners. Use when a post needs a screenshot of `ddev list`, `ddev st`, or other command output, a GIF or WebP recording, or a new feature image.
when_to_use: >
  Triggered by "screenshot of ddev list", "terminal screenshot", "gif",
  "webp comparison", "before/after recording", "vhs", "feature image",
  "banner image", "illustration for the post", "Mermaid diagram", or adding
  any image under public/img/blog/.
---

# Images for blog posts

Work in `~/tmp`, and copy only the final image into
`public/img/blog/YYYY/MM/`. Keep it under 2MB, give it descriptive alt text,
and view the result before adding it.

## Terminal screenshots

Render DDEV command output (`ddev list`, `ddev st`, the `ddev` dashboard) with
[VHS](https://github.com/charmbracelet/vhs) (`brew install vhs`, which also
needs `ttyd` and `ffmpeg`).

- Never show the maintainer's real projects. Record demo projects with
  realistic names, registered under `DDEV_XDG_CONFIG_HOME`, as described in
  [gif-comparison.md](gif-comparison.md#binaries-and-projects).
- Write a `.tape` file that hides the `cd` and `clear`, shows the command,
  sleeps a few seconds, and ends with `Screenshot`. Run it as
  `bash -c "cd ~/tmp/shots && timeout 100 vhs name.tape"` with stdin from
  `/dev/null`.
- The `Screenshot` directive can silently produce nothing. The GIF is still
  written, so take its last frame:
  `magick name.gif -coalesce -delete 0--2 +repage name.png`.
- `ddev list` needs a terminal about 820px wide (`Set Width 820`,
  `Set FontSize 16`); `ddev st` needs about 900px wide and 1000px tall. At
  640px DDEV's tables overflow the right edge, and too short a height scrolls
  the top of the output off.
- Crop with `magick in.png -crop WxH+0+0 +repage out.png`. To leave room for
  callout arrows, add space above with
  `-background "<bg color>" -gravity north -splice 0x70`.
- The OSC 8 hyperlinks DDEV prints appear underlined in the VHS terminal,
  which is how to show "clickable" output. DDEV emits them only when stdout is
  a terminal, so text captured from a pipe has none (`FORCE_HYPERLINK=1`
  forces them).
- Do not use `freeze` (charmbracelet) for DDEV tables: it draws the box
  characters badly. A hover or click state needs a real terminal such as
  iTerm2 and must be captured by hand.

## Animated before/after comparisons

To show a change between two DDEV versions, such as a faster command or a
rebuilt `ddev tui`, record both with VHS and stack them in one animated
WebP. Follow [gif-comparison.md](gif-comparison.md) in this directory.

## SVG feature images

An illustration can be a hand-written SVG referenced directly from
`featureImage.src`. Generate it from a script kept in `~/tmp`, not the
repository, preview it with `rsvg-convert -w 1600 -o out.png in.svg`, and
install only the `.svg`. The build renders a PNG copy of it for `og:image`,
since social networks don't show SVG there, and fails if a PNG with the same
name is already next to it.

Blog listing cards crop every feature image to 3:2 (`BlogPostCard.astro`), so
prefer a 3:2 canvas. On a wider one, keep anything that must stay visible
inside the centered 3:2 area: a 1672x940 image loses about 130px on each side.

## Mermaid diagrams

Diagrams are static light and dark SVGs exported from mermaid.live, with the
source kept in a frontmatter key. The steps are under "Mermaid Diagrams" in
`src/content/blog/markdown-features-demo.md`.

## Logo and text banners

For a `featureImage` that combines project logos or text on a solid
background, follow [feature-banner.md](feature-banner.md) in this directory.
