import { getCollection } from "astro:content"
import { marked } from "marked"
import { BLOG_DESCRIPTION } from "../../const"
import rss from "@astrojs/rss"

const baseUrl = import.meta.env.SITE
const blogUrl = `${baseUrl}/blog`
const posts = await getCollection("blog")

// Get the 50 most recent blog posts
const recentPosts = posts
  .sort((a, b) => {
    return new Date(a.data.pubDate) > new Date(b.data.pubDate) ? -1 : 1
  })
  .slice(0, 50)

const items = recentPosts.map((post) => {
  let postContent = ""

  if (post.data.featureImage) {
    postContent += `<img src="${baseUrl}${post.data.featureImage.src}" alt="${
      post.data.featureImage.alt ?? ""
    }">`
  }

  postContent += marked.parse(post.body)

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

export const get = () =>
  rss({
    title: `DDEV Blog`,
    description: BLOG_DESCRIPTION,
    site: blogUrl,
    items: items,
    xmlns: {
      webfeeds: "http://webfeeds.org/rss/1.0",
    },
    customData: `
      <language>en-us</language>
      <lastBuildDate>${buildDate}</lastBuildDate>
      <webfeeds:icon>${baseUrl}/favicon/icon.svg</webfeeds:icon>
      <webfeeds:cover image="${baseUrl}/img/og-default.png" />
      <webfeeds:accentColor>02A8E2</webfeeds:accentColor>
      <webfeeds:logo>${baseUrl}/favicon/type-only.svg</webfeeds:logo>
    `,
  })
