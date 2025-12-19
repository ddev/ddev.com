import { defineConfig } from "astro/config"
import { plainTextPlugin } from "@barnabask/astro-minisearch"
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs"
import downloadDdevRedirects from "./src/lib/download-ddev-redirects.js"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links"
import robotsTxt from "astro-robots-txt"
import searchIndex from "./src/lib/search-index.js"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import widont from "rehype-widont"
import { addCopyButton } from "shiki-transformer-copy-button"

// https://astro.build/config
export default defineConfig({
  site: "https://ddev.com",
  vite: {
    server: {
      allowedHosts: ["." + process.env.DDEV_TLD], // leave this unchanged for DDEV!
    },
    // Configure CORS for the dev server (security)
    cors: { origin: process.env.DDEV_PRIMARY_URL },
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        if (
          item.url.endsWith(".json/") ||
          item.url.endsWith(".svg/") ||
          item.url.endsWith(".xml/")
        ) {
          // Don't index sitemaps or generated SVG, which come with `/` route endings here
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
    downloadDdevRedirects(),
    prefetch(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    // https://github.com/shikijs/shiki/blob/main/docs/languages.md
    shikiConfig: {
      theme: "nord",
      // You can add options to the transformer here
      // For example, to change the 'copied' state duration:
      // toggle: 3000, // 3 seconds
      transformers: [
        addCopyButton({
          // visibility: 'hover', // if you want it to only show on hover
        }),
      ],
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      widont,
      plainTextPlugin({
        contentKey: "plainText",
        removeEmoji: false,
        headingTags: ["h2", "h3"],
      }),
      rehypeAstroRelativeMarkdownLinks,
    ],
  },
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
})
