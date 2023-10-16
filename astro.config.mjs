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
import astroExpressiveCode from 'astro-expressive-code'

const frameCodeOptions = {
  // Configures the plugin.
  extractFileNameFromCode: false,
}

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  // Configures the plugin.
  theme: 'nord',
  frames: frameCodeOptions,
  useThemedScrollbars: false,
}

// https://astro.build/config
export default defineConfig({
  site: "https://ddev.com/",
  integrations: [
    astroExpressiveCode(astroExpressiveCodeOptions),
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
    // https://github.com/shikijs/shiki/blob/main/docs/languages.md
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
