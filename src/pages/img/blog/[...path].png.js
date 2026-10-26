import { getCollection } from "astro:content"
import fs from "fs"
import { svgToPng } from "../../../lib/images"

// Social networks don't render SVG in og:image, so each SVG feature image gets
// a PNG copy next to it, used by src/pages/blog/[id].astro
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
    props: { svg: src },
  }))
}

export async function GET({ props }) {
  const { data } = await svgToPng(props.svg)
  return new Response(data, { headers: { "Content-Type": "image/png" } })
}
