import rss from "@astrojs/rss"
import sanitizeHtml from "sanitize-html"
import { SITE_TITLE, SITE_DESCRIPTION } from "../../config"

const posts = await import.meta.glob("./*.md", { eager: true })

// Get the 50 most recent blog posts
const recentPosts = Object.values(posts)
  .sort((a, b) => {
    return new Date(a.frontmatter.pubDate) > new Date(b.frontmatter.pubDate)
      ? -1
      : 1
  })
  .slice(0, 50)

const items = recentPosts.map((post) => {
  let postContent = sanitizeHtml(post.compiledContent(), {
    allowedTags: false,
    selfClosing: [],
  })

  return {
    link: post.url,
    title: post.frontmatter.title,
    customData: `<content:encoded><![CDATA[${postContent}]]></content:encoded>`,
    pubDate: post.frontmatter.pubDate,
  }
})

export const get = () =>
  rss({
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      content: "http://purl.org/rss/1.0/modules/content/",
      atom: "http://www.w3.org/2005/Atom",
    },
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: items,
    customData:
      `<language>en-us</language><lastBuildDate>` +
      new Date().toUTCString() +
      `</lastBuildDate>`,
  })
