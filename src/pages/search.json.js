import { getSearchIndex } from "@barnabask/astro-minisearch"

const posts = []

export const get = () =>
  getSearchIndex(
    posts.map((post) => {
      let searchText = ""

      if (post.frontmatter.author) {
        searchText += post.frontmatter.author + " "
      }

      if (post.frontmatter.summary) {
        searchText += post.frontmatter.summary + " "
      }

      searchText += post.frontmatter.plainText

      return {
        url: post.url,
        title: post.frontmatter.title,
        text: searchText,
      }
    })
  )
