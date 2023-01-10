import rss from "@astrojs/rss"
import sanitizeHtml from "sanitize-html"
import { getRecentBlogPosts } from "../../lib/api"
import { SITE_TITLE, SITE_DESCRIPTION } from "../../config"

const postData = await getRecentBlogPosts(50)
const recentPosts = postData.edges

const items = recentPosts.map(({ node }) => {
  let postContent = sanitizeHtml(node.content, {
    allowedTags: false,
    selfClosing: [],
  })

  return {
    link: `/blog/${node.slug}`,
    title: node.title,
    customData: `<content:encoded><![CDATA[${postContent}]]></content:encoded>`,
    pubDate: node.date,
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
