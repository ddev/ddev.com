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
  site: "https://ddev.com/",
  integrations: [
    tailwind(),
    react(),
    astroImageTools,
    sitemap(),
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
})
