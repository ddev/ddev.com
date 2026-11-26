import { blogRss } from "../../lib/blog-rss"

export function GET() {
  return blogRss({ path: "/blog/rss.xml", limit: 50, content: true })
}
