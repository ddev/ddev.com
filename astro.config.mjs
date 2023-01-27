import { defineConfig } from "astro/config"
import { existsSync } from "fs"
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs"
import { plainTextPlugin } from "@barnabask/astro-minisearch"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import robotsTxt from "astro-robots-txt"
import sitemap from "@astrojs/sitemap"
import searchIndex from "./src/lib/search-index.js"
import widont from "rehype-widont"

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
  site: "https://ddev.com",
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    robotsTxt({
      sitemap: false,
      policy: [{ disallow: "/", userAgent: "*" }],
    }),
    searchIndex({
      output: "search.json",
    }),
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
    extendDefaultPlugins: true,
  },
})
