// A small feed for clients that only list headlines, such as `ddev gui`.
import { blogRss } from "../../lib/blog-rss"

export function GET() {
  return blogRss({ path: "/blog/rss-headlines.xml", limit: 10, content: false })
}
