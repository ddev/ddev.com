import { getCollection } from "astro:content"
import { marked } from "marked"
import { BLOG_DESCRIPTION } from "../const"
import rss from "@astrojs/rss"

const baseUrl = import.meta.env.SITE
const blogUrl = `${baseUrl}/blog`

/**
 * Replace root-relative links with absolute ones.
 * @param text
 * @returns
 */
const ensureAbsoluteUrls = (text) => {
  return text
    .replaceAll('href="/', `href="${baseUrl}/`)
    .replaceAll('src="/', `src="${baseUrl}/`)
}

const postContent = (post) => {
  let html = ""

  if (post.data.featureImage) {
    html += ensureAbsoluteUrls(
      `<img src="${post.data.featureImage.src}" alt="${
        post.data.featureImage.alt ?? ""
      }">`
    )
  }

  return html + ensureAbsoluteUrls(marked.parse(post.body))
}

/**
 * Build an RSS response with the newest blog posts.
 * @param {object} options
 * @param {string} options.path Feed path under the site, for the self link
 * @param {number} options.limit How many of the newest posts to include
 * @param {boolean} options.content Whether to include each post's HTML
 * @returns {Promise<Response>}
 */
export async function blogRss({ path, limit, content }) {
  const posts = await getCollection("blog")

  const recentPosts = posts
    .sort((a, b) => {
      return new Date(a.data.pubDate) > new Date(b.data.pubDate) ? -1 : 1
    })
    .slice(0, limit)

  const items = recentPosts.map((post) => ({
    link: `${blogUrl}/${post.id}`,
    title: post.data.title,
    description: post.data.summary,
    categories: post.data.categories,
    content: content ? postContent(post) : undefined,
    pubDate: post.data.pubDate,
  }))

  const buildDate = new Date().toUTCString()

  return rss({
    title: `DDEV Blog`,
    description: BLOG_DESCRIPTION,
    site: blogUrl,
    items: items,
    xmlns: {
      webfeeds: "http://webfeeds.org/rss/1.0",
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `
      <language>en-us</language>
      <atom:link href="${baseUrl}${path}" rel="self" type="application/rss+xml" />
      <lastBuildDate>${buildDate}</lastBuildDate>
      <webfeeds:icon>${baseUrl}/favicon/icon.svg</webfeeds:icon>
      <webfeeds:cover image="${baseUrl}/img/og-default.png" />
      <webfeeds:accentColor>02A8E2</webfeeds:accentColor>
      <webfeeds:logo>${baseUrl}/favicon/type-only.svg</webfeeds:logo>
    `,
  })
}
