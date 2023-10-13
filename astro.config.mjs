import { defineConfig } from "astro/config"
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

// https://astro.build/config
export default defineConfig({
  site: "https://ddev.com.ddev.site",
  vite: {
    server: {
      host: true, // leave this unchanged for DDEV!
      port: 4321,
    // strictPort: true,
    // origin: 'https://ddev.com.ddev.site'
  }},
  integrations: [
    tailwind(),
    react(),
    astroImageTools,
    sitemap({
      serialize(item) {
        if (
          item.url.endsWith(".json/") ||
          item.url.endsWith(".svg/") ||
          item.url.endsWith(".xml/")
        ) {
          // Don’t index sitemaps or generated SVG, which come with `/` route endings here
          return undefined
        }
        return item
      },
    }),
    robotsTxt({
      sitemap: true,
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
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      widont,
      plainTextPlugin({
        contentKey: "plainText",
        removeEmoji: false,
        headingTags: ["h2", "h3"],
      }),
    ],
  },
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
})
