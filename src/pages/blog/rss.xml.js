import { getCollection } from "astro:content"
import { marked } from "marked"
import { SITE_TITLE, SITE_DESCRIPTION } from "../../config"
import rss from "@astrojs/rss"
import sanitizeHtml from "sanitize-html"

const posts = await getCollection("blog")

// Get the 50 most recent blog posts
const recentPosts = posts
  .sort((a, b) => {
    return new Date(a.data.pubDate) > new Date(b.data.pubDate) ? -1 : 1
  })
  .slice(0, 50)

const items = recentPosts.map((post) => {
  return {
    link: `/blog/${post.slug}`,
    title: post.data.title,
    content: sanitizeHtml(marked.parse(post.body)),
    pubDate: post.data.pubDate,
  }
})

export const get = () =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: items,
    customData:
      `<language>en-us</language><lastBuildDate>` +
      new Date().toUTCString() +
      `</lastBuildDate>`,
  })
