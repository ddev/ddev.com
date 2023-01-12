import { defineConfig } from "astro/config"
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import robotsTxt from "astro-robots-txt"
import sitemap from "@astrojs/sitemap"
import searchIndex from "./src/lib/search-index.js"

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
    robotsTxt({
      sitemap: false,
      policy: [{ disallow: "/", userAgent: "*" }],
    }),
    sitemap(),
    searchIndex({
      output: "search.json",
    }),
  ],
})
