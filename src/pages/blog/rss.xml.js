import { getCollection } from "astro:content"
import { marked } from "marked"
import { BLOG_DESCRIPTION } from "../../const"
import rss from "@astrojs/rss"

const baseUrl = import.meta.env.SITE
const blogUrl = `${baseUrl}/blog`
const posts = await getCollection("blog")

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

// Get the 50 most recent blog posts
const recentPosts = posts
  .sort((a, b) => {
    return new Date(a.data.pubDate) > new Date(b.data.pubDate) ? -1 : 1
  })
  .slice(0, 50)

const items = recentPosts.map((post) => {
  let postContent = ""

  if (post.data.featureImage) {
    postContent += ensureAbsoluteUrls(
      `<img src="${post.data.featureImage.src}" alt="${
        post.data.featureImage.alt ?? ""
      }">`
    )
  }

  postContent += ensureAbsoluteUrls(marked.parse(post.body))

  return {
    link: `${blogUrl}/${post.slug}`,
    title: post.data.title,
    description: post.data.summary,
    categories: post.data.categories,
    content: postContent,
    pubDate: post.data.pubDate,
  }
})

const buildDate = new Date().toUTCString()

export async function GET(context) {
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
      <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
      <lastBuildDate>${buildDate}</lastBuildDate>
      <webfeeds:icon>${baseUrl}/favicon/icon.svg</webfeeds:icon>
      <webfeeds:cover image="${baseUrl}/img/og-default.png" />
      <webfeeds:accentColor>02A8E2</webfeeds:accentColor>
      <webfeeds:logo>${baseUrl}/favicon/type-only.svg</webfeeds:logo>
    `,
  })
}
