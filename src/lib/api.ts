/**
 * Collection of content-fetching and formatting methods, mostly for
 * extracting blog-related content from WordPress via GraphQL.
 */

import dotenv from "dotenv"
import getReadingTime from 'reading-time';
import fs2 from "fs"
import path from 'path'
import fetchContributors from "./fetch-contributors"

dotenv.config()

// WordPress GraphQL endpoint
const API_URL = new URL(process.env.WP_URL)

// Project-root-relative directory for temporary data used in local development
const DEVELOPMENT_CACHE_DIR = 'cache'

// Current environment
const env = process.env.NODE_ENV || "production"


/**
 * Query the WordPress GraphQL endpoint.
 * @param query The query body.
 * @param params Any query parameters to include.
 * @returns response data
 */
async function fetchAPI(query: string, { variables } = {}) {
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
 * Fetches GitHub Sponsors.
 * @param useDevCache Whether to use a local result cache in development to reduce third-party calls.
 * @returns response data
 */
export async function getSponsors(useDevCache = true) {
  const filename = 'sponsors.json'
  let data

  if (useDevCache) {
    const cacheValue = getCachedFile(filename);

    if (cacheValue) {
      data = JSON.parse(cacheValue)
    }
  }

  if (!data) {
    // https://github.com/filiptronicek/gh-sponsors-api#notes
    const response = await fetch("https://ghs.vercel.app/sponsors/rfay")
    data = await response.json()

    if (useDevCache) {
      storeCachedFile(filename, JSON.stringify(data))
    }
  }

  return data.sponsors
}

/**
 * Fetches GitHub contributor data.
 * @param useDevCache Whether to use a local result cache in development to reduce third-party calls.
 * @returns response data
 */
export async function getContributors(useDevCache = true) {
  const filename = 'contributors.json'
  let data

  if (useDevCache) {
    const cacheValue = getCachedFile(filename);

    if (cacheValue) {
      console.log(
        `Loaded cached contributors.`
      )
      data = JSON.parse(cacheValue)
    }
  }

  if (!data) {
    const response = await fetchContributors()
      .then((collectedContributors) => {
        data = collectedContributors

        if (useDevCache) {
          storeCachedFile(filename, JSON.stringify(data))
        }
      })
      .catch(console.error)
  }

  return data ?? []
}

/**
 * Gets repository details from GitHub.
 * https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
 * 
 * @param name The name of the repository, like `drud/ddev`.
 * @returns response data
 */
export async function getRepoDetails(name: string) {
  const response = await fetch(`https://api.github.com/repos/${name}`)
  const data = await response.json()

  return data
}

export async function getLatestReleaseVersion() {
  const response = await fetch(`https://api.github.com/repos/drud/ddev/releases`)
  const data = await response.json()

  return data[0].tag_name;
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

/**
 * Returns approximate reading time for the provided text.
 * @param text The complete text whose read time we’re evaluating.
 * @returns plain-English description of reading time, like `5 min read`
 */
export const getReadTime = (text: string) : string => {
  const readingTime = getReadingTime(text);
  return readingTime.text
}

/**
 * Returns a cached file if it exists and we’re in a development environment.
 * @param filename Name of the file to look for in the cache directory.
 * @returns file contents or null
 */
const getCachedFile = (filename: string) => {
  if (env !== "development") {
    return
  }

  const dir = path.resolve('./' + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + '/' + filename
  
  if (fs2.existsSync(filePath)) {
    return fs2.readFileSync(filePath);
  }

  return
}

/**
 * Write a file to the cache directory if we’re in a development environment.
 * @param filename Name of the file to write to the cache directory.
 * @param contents Contents of the file.
 */
const storeCachedFile = (filename: string, contents: string) => {
  if (env !== "development") {
    return
  }

  const dir = path.resolve('./' + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + '/' + filename

  if (!fs2.existsSync(dir)) {
    fs2.mkdirSync(dir);
  }

  fs2.writeFileSync(filePath, contents)
}