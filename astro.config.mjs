import { defineConfig } from "astro/config"
import { plainTextPlugin } from "@barnabask/astro-minisearch"
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs"
import { remarkPublicImages } from "./src/lib/remark-public-images.mjs"
import { remarkCallouts } from "./src/lib/remark-callouts.mjs"
import downloadDdevRedirects from "./src/lib/download-ddev-redirects.js"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeFigure from "rehype-figure"
import rehypeSlug from "rehype-slug"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import robotsTxt from "astro-robots-txt"
import searchIndex from "./src/lib/search-index.js"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { addCopyButton } from "shiki-transformer-copy-button"
import { SHIKI_THEMES } from "./src/const.ts"

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
      themes: SHIKI_THEMES,
      defaultColor: false,
      // You can add options to the transformer here
      // For example, to change the 'copied' state duration:
      // toggle: 3000, // 3 seconds
      transformers: [
        addCopyButton({
          // visibility: 'hover', // if you want it to only show on hover
        }),
      ],
    },
    remarkPlugins: [
      remarkPublicImages,
      remarkReadingTime,
      remarkDirective,
      remarkCallouts,
      remarkGfm, // GitHub Flavored Markdown (tables, strikethrough, task lists, autolinks)
      [
        remarkToc,
        {
          heading: "table of contents", // Case-insensitive heading to look for
          tight: true, // Compact lists
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
      rehypeFigure, // Wrap images in <figure> with <figcaption>
      rehypeUnwrapImages, // Remove paragraph wrappers after figure processing
      rehypeAccessibleEmojis, // Add accessible labels to emojis
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
