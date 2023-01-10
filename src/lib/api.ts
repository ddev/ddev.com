/**
 * Collection of content-fetching and formatting methods, mostly for
 * extracting blog-related content from WordPress via GraphQL.
 */

import dotenv from "dotenv"
dotenv.config()
const API_URL = new URL(process.env.WP_URL)

/**
 * Query the WordPress GraphQL endpoint.
 * @param query The query body.
 * @param params Any query parameters to include.
 * @returns response data
 */
async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" }
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()
  if (json.errors) {
    console.log(json.errors)
    throw new Error("Failed to fetch API")
  }

  return json.data
}

/**
 * Fetch every blog post with its content.
 * @returns response data
 */
export async function getAllBlogPosts() {
  const data = await fetchAPI(`
    {
      posts(first: 1000) {
        edges {
          node {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            date
            content
          }
        }
      }
    }
    `)
  return data?.posts
}

/**
 * Fetch all the users that have published blog posts.
 *
 * It’s somehow still possible that a user can be returned despite having no posts,
 * so we include post IDs for filtering later.
 *
 * @returns response data
 */
export async function getAllBlogPostAuthors() {
  const data = await fetchAPI(`
    {
      users(where: {hasPublishedPosts: POST}) {
        nodes {
          name
          slug
          posts(where: {status: PUBLISH}) {
            nodes {
              id
            }
          }
          avatar {
            url
          }
        }
      }
    }
  `)
  return data?.users
}

/**
 * Fetch details for a single author.
 * @param slug The author’s unique, URL-friendly slug.
 * @returns response data
 */
export async function getAuthorDetails(slug: string) {
  const data = await fetchAPI(`
    {
      user(id: "${slug}", idType: SLUG) {
        userId
        name
        firstName
        slug
        description
        avatar {
          url
        }
      }
    }
  `)
  return data?.user
}

/**
 * Returns recent blog posts. (Used in the `BlogFeatures` component.)
 * @param first Number of posts to return.
 * @returns response data
 */
export async function getRecentBlogPosts(first: number = 3) {
  const data = await fetchAPI(`
    {
      posts(first: ${first}) {
        edges {
          node {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            date
            content
          }
        }
      }
    }
    `)
  return data?.posts
}

/**
 * Get a specific blog post by its slug. (Not the same as its URI!)
 * @param slug The desired post’s slug.
 * @returns response data
 */
export async function getBlogPostBySlug(slug: string) {
  const data = await fetchAPI(`
  {
    post(id: "${slug}", idType: SLUG) {
      title
      date
      content
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
  }
  `)
  return data?.post
}

/**
 * Fetch all blog posts published by a specific author.
 * @param authorId The WordPress `userId` of the desired author.
 * @returns response data
 */
export async function getBlogPostsByAuthor(authorId: number) {
  const data = await fetchAPI(`
  {
    posts(where: { author: ${authorId} }) {
      nodes {
        title
        date
        content
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
  `)
  return data?.posts
}

/**
 * Get a specific page by its slug. (Unused but maybe useful later?)
 * @param slug The desired page slug.
 * @returns response data
 */
export async function getPageBySlug(slug: string) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      content
    }
  }
  `)
  return data?.page
}

/**
 * Format a date string we got via GraphQL. Used mostly for blog post listings
 * and detail pages.
 *
 * @param date The source date, which probably looks like `2021-01-28T13:05:28`.
 * @param customOptions Options for [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
 * @returns formatted date string
 */
export const formatDate = (date: string, customOptions?: object) => {
  const pubDate = new Date(date)
  const defaultOptions = {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric",
  }

  const options = {
    ...defaultOptions,
    ...customOptions
  }

  return new Intl.DateTimeFormat("en-US", options).format(pubDate)
}

import getReadingTime from 'reading-time';

/**
 * Returns approximate reading time for the provided text.
 * @param text The complete text whose read time we’re evaluating.
 * @returns plain-English description of reading time, like `5 min read`
 */
export const getReadTime = (text: string) : string => {
  const readingTime = getReadingTime(text);
  return readingTime.text
}