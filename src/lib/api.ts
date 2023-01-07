import dotenv from "dotenv"
dotenv.config()
const API_URL = process.env.WP_URL

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

export async function getPrimaryMenu() {
  const data = await fetchAPI(`
    {
      menus(where: {location: PRIMARY}) {
        nodes {
          menuItems {
            edges {
              node {
                path
                label
                connectedNode {
                  node {
                    ... on Page {
                      isPostsPage
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `)
  return data?.menus?.nodes[0]
}

export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
    {
      pages(first: 10000) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
    `)
  return data?.pages
}

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

export async function getRecentBlogPosts() {
  const data = await fetchAPI(`
    {
      posts(first: 3) {
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

export const getReadTime = (text: string) : string => {
  const readingTime = getReadingTime(text);
  return readingTime.text
}