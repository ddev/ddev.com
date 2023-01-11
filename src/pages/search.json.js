/**
 * Creates a static JSON search index at build time that can be consumed on the client end.
 */
import { getSearchIndex } from "@barnabask/astro-minisearch"
import { getAllBlogPosts } from "../lib/api"

const pages = await import.meta.glob('../pages/post/*.astro')
const posts = await getAllBlogPosts()

const items = posts.edges.map(({ node }) => {
  return {
    url: `/blog/${node.slug}`,
    title: node.title,
    text: node.content,
  }
})

export const get = () =>
  getSearchIndex(items)
