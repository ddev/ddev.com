import type { ImageMetadata } from "astro"
import fs from "fs"
import sharp from "sharp"

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

/**
 * Files under `public/logos` as Astro assets, so a page links each through a
 * URL with its content hash. Cloudflare tells browsers to keep `/logos/` for
 * hours, so a logo replaced under the same name would show its old version
 * until a hard refresh. The files stay in `public` for the README badges.
 */
const logos = import.meta.glob<{ default: ImageMetadata }>("/public/logos/*", {
  eager: true,
})

export function logoUrl(path: string) {
  return logos[`/public${path}`]?.default.src ?? path
}

const svgPngs = new Map<
  string,
  Promise<{ data: Buffer; info: sharp.OutputInfo }>
>()

/**
 * Renders an SVG under `public` to a 1200px wide PNG for `og:image`. Builds
 * cache it, since the PNG endpoint and the page reporting its size both ask
 * for it, but the dev server doesn't, so an edited SVG shows up at once.
 */
export function svgToPng(path: string) {
  if (import.meta.env.DEV) {
    return renderSvgToPng(`./public${path}`)
  }
  if (!svgPngs.has(path)) {
    svgPngs.set(path, renderSvgToPng(`./public${path}`))
  }
  return svgPngs.get(path)!
}

async function renderSvgToPng(file: string) {
  const width = 1200
  // SVGs rasterize at 72 DPI, so raise the density to render at full width
  // instead of scaling up a smaller bitmap
  const { width: svgWidth = width } = await sharp(file).metadata()
  return sharp(file, { density: (72 * width) / svgWidth })
    .resize({ width })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer({ resolveWithObject: true })
}

/**
 * Width and height of an `og:image` path, either a raster image in
 * `public/img` or a PNG rendered from the SVG next to it.
 */
export async function ogImageSize(path: string) {
  const image = await resolveImage(path)
  if (typeof image !== "string") {
    return { width: image.width, height: image.height }
  }
  const svg = path.replace(/\.png$/, ".svg")
  if (svg !== path && fs.existsSync(`./public${svg}`)) {
    const { info } = await svgToPng(svg)
    return { width: info.width, height: info.height }
  }
  return {}
}
