import { getCollection } from "astro:content"
import { marked } from "marked"
import { BLOG_DESCRIPTION } from "../../const"
import sanitizeHtml from "sanitize-html"

const baseUrl = import.meta.env.SITE
const blogUrl = `${baseUrl}/blog`

const posts = await getCollection("blog")

// Get the 50 most recent blog posts
const recentPosts = posts
  .sort((a, b) => {
    return new Date(a.data.pubDate) > new Date(b.data.pubDate) ? -1 : 1
  })
  .slice(0, 50)

const feedItems = recentPosts.map((post) => {
  return {
    id: `${blogUrl}/${post.slug}`,
    url: `${blogUrl}/${post.slug}`,
    title: post.data.title,
    content_html: sanitizeHtml(marked.parse(post.body)),
  }
})

const feed = {
  version: "https://jsonfeed.org/version/1.1",
  title: `DDEV Blog`,
  description: BLOG_DESCRIPTION,
  home_page_url: blogUrl,
  feed_url: `${blogUrl}/feed.json`,
  items: feedItems,
}

export async function GET(context) {
  return Response.json({
    success: true,
    result: feed
  })
}
