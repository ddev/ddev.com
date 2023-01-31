import { defineConfig } from "astro/config"
import { existsSync } from "fs"
import { plainTextPlugin } from "@barnabask/astro-minisearch"
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs"
import { astroImageTools } from "astro-imagetools"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import robotsTxt from "astro-robots-txt"
import searchIndex from "./src/lib/search-index.js"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import widont from "rehype-widont"

/**
 * A tiny custom plugin that dynamically designates layouts for Markdown files.
 * Right now this means appending `layout: @layouts/Blog.astro` to our blog posts
 * so we don’t need to do that with each file.
 */
function defaultLayoutPlugin() {
  const layouts = new Set()
  return function (tree, file) {
    const fileName = file.history[0]
    const directory = fileName.split("/").slice(-2)[0]
    const layout =
      directory.charAt(0).toUpperCase() + directory.slice(1) + ".astro"
    if (layouts.has(layout) || existsSync(`./src/layouts/${layout}`)) {
      layouts.add(layout)
      file.data.astro.frontmatter.layout = `@layouts/${layout}`
    }
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://ddev.com/",
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    tailwind(),
    react(),
    astroImageTools,
    sitemap(),
    robotsTxt({
      sitemap: false,
      policy: [
        {
          disallow: "/",
          userAgent: "*",
        },
      ],
    }),
    searchIndex({
      output: "search.json",
    }),
    prefetch(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    // https://github.com/shikijs/shiki/blob/main/docs/languages.md
    shikiConfig: {
      theme: "nord",
    },
    remarkPlugins: [defaultLayoutPlugin, remarkReadingTime],
    rehypePlugins: [
      widont,
      plainTextPlugin({
        contentKey: "plainText",
        removeEmoji: false,
        headingTags: ["h2", "h3"],
      }),
    ],
  },
})
