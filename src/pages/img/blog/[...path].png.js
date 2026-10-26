import { getCollection } from "astro:content"
import fs from "fs"
import sharp from "sharp"

// Social networks don't render SVG in og:image, so each SVG feature image gets
// a PNG copy next to it, used by src/pages/blog/[id].astro
const width = 1200
const prefix = "/img/blog/"

export async function getStaticPaths() {
  const blogEntries = await getCollection("blog")
  const svgs = new Set(
    blogEntries
      .map((entry) => entry.data.featureImage?.src)
      .filter((src) => src?.startsWith(prefix) && src.endsWith(".svg"))
  )
  for (const src of svgs) {
    const png = `public${src.replace(/\.svg$/, ".png")}`
    if (fs.existsSync(png)) {
      throw new Error(
        `${png} has the same path as the PNG generated from ${src} for og:image, rename or remove it`
      )
    }
  }
  return [...svgs].map((src) => ({
    params: { path: src.slice(prefix.length, -".svg".length) },
    props: { svgPath: `./public${src}` },
  }))
}

export async function GET({ props }) {
  // SVGs rasterize at 72 DPI, so raise the density to render at full width
  // instead of scaling up a smaller bitmap
  const { width: svgWidth } = await sharp(props.svgPath).metadata()
  const png = await sharp(props.svgPath, { density: (72 * width) / svgWidth })
    .resize({ width })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer()

  return new Response(png, { headers: { "Content-Type": "image/png" } })
}
