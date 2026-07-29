import type { ImageMetadata } from "astro"

/**
 * Images under `public/img` as Astro assets, so a path from a post's frontmatter
 * can be handed to `<Picture>` and get responsive variants. Paths that aren't in
 * the glob (SVGs, files added at runtime) come back unchanged, for a plain `img`.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/public/img/**/*.{png,jpg,jpeg,webp,gif}"
)

export async function resolveImage(path: string) {
  const key = `/public${path}`
  return images[key] ? (await images[key]()).default : path
}
