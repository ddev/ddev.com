/**
 * Collection of content-fetching and formatting methods.
 */

import dotenv from "dotenv"
import fs2 from "fs"
import path from "path"
import Slugger from "github-slugger"
import { Octokit } from "octokit"
import { GITHUB_REPO } from "./../const"

dotenv.config()

// Project-root-relative directory for temporary data used in local development
const DEVELOPMENT_CACHE_DIR = "cache"
let octokitInstance: Octokit

// Define variable if GITHUB_TOKEN is set and not empty
const githubTokenIsSet: boolean = (() => {
  if (
    process.env.hasOwnProperty("GITHUB_TOKEN") === false ||
    process.env.GITHUB_TOKEN === ""
  ) {
    // add warning for production builds
    if (import.meta.env.PROD) {
      console.warn(
        "GITHUB_TOKEN not set or empty. You can ignore this warning for local development."
      )
    }
    return false
  }
  return true
})()

/**
 * Returns an instance of Octokit, which uses the `GITHUB_TOKEN` environment
 * variable for authentication.
 * @returns Octokit
 */
const octokit = () => {
  if (octokitInstance) {
    return octokitInstance
  }

  octokitInstance = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  return octokitInstance
}

/**
 * Returns a URL-friendly slug for a given string.
 * @param value
 * @returns string
 */
export function getSlug(value: string) {
  const slugger = new Slugger()
  return slugger.slug(value)
}

/**
 * Returns the URL for a category’s listing page.
 * @param name The full category name
 * @returns root-relative path
 */
export function getCategoryUrl(name: string) {
  return `/blog/category/${getSlug(name)}`
}

/**
 * Fetches GitHub Sponsors.
 * @returns response data
 */
export async function getSponsors() {
  if (!githubTokenIsSet) {
    return []
  }

  const cacheFilename = "sponsors.json"
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  const response = await octokit().graphql(`
    query CombinedSponsors {
      org: organization(login: "ddev") {
        sponsors(first: 100) {
          nodes {
            ... on User {
              login
              url
              avatarUrl
            }
            ... on Organization {
              login
              url
              avatarUrl
            }
          }
        }
      }
      user: user(login: "rfay") {
        sponsors(first: 100) {
          nodes {
            ... on User {
              login
              url
              avatarUrl
            }
            ... on Organization {
              login
              url
              avatarUrl
            }
          }
        }
      }
    }
  `)

  // Combine sponsors from both sources and remove duplicates
  const allSponsors = [
    ...response.org.sponsors.nodes,
    ...response.user.sponsors.nodes,
  ].reduce((unique, sponsor) => {
    // Use login as unique identifier
    if (!unique.some((item) => item.login === sponsor.login)) {
      unique.push(sponsor)
    }
    return unique
  }, [])

  putCache(cacheFilename, JSON.stringify(allSponsors))

  return allSponsors
}

/**
 * Fetches GitHub contributor data.
 * @param useDevCache Whether to use a local result cache in development to reduce third-party calls.
 * @returns response data
 */
export async function getContributors(includeAnonymous = false) {
  if (!githubTokenIsSet) {
    return []
  }

  const cacheFilename = "contributors.json"
  const cachedData = getCache(cacheFilename)

  let data

  if (cachedData) {
    data = cachedData
  } else {
    const response = await octokit().paginate(
      `GET https://api.github.com/repos/${GITHUB_REPO}/contributors`,
      {
        anon: 1,
        per_page: 100,
      }
    )

    data = response
    putCache(cacheFilename, JSON.stringify(data))
  }

  if (!includeAnonymous) {
    return data.filter((contributor) => {
      return contributor.type !== "Anonymous"
    })
  }

  return data ?? []
}

/**
 * Gets repository details from GitHub.
 * https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
 *
 * @param name The name of the repository, like `ddev/ddev`.
 * @returns response data
 */
export async function getRepoDetails(name: string) {
  if (!githubTokenIsSet) {
    return []
  }

  const slug = name.replace("/", "-")
  const cacheFilename = `repository-${slug}.json`
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  const response = await octokit().request(
    `GET https://api.github.com/repos/${name}`
  )
  const data = response.data

  putCache(cacheFilename, JSON.stringify(data))

  return data
}

/**
 * Gets the most recent `ddev/ddev` tag name, like `v1.24.10`.
 *
 * @param stable Whether to return stable releases only (`true` by default).
 * @returns tag name
 */
export async function getLatestReleaseVersion(stable = true) {
  if (!githubTokenIsSet) {
    return "v1.24.9" // Fallback version for local development without token
  }

  let data = await getReleases()

  if (stable) {
    data = data.filter((release) => {
      return !release.draft && !release.prerelease
    })
  }

  return data[0].tag_name
}

export async function getReleases() {
  if (!githubTokenIsSet) {
    return []
  }

  const cacheFilename = "releases.json"
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  const response = await octokit().paginate(
    `GET https://api.github.com/repos/${GITHUB_REPO}/releases`,
    {
      per_page: 100,
    }
  )

  putCache(cacheFilename, JSON.stringify(response))

  return response ?? []
}

export async function getSponsorshipData() {
  if (!githubTokenIsSet) {
    return []
  }

  const cacheFilename = "all-sponsorships.json"
  const cachedData = getCache(cacheFilename)

  if (cachedData) {
    return cachedData
  }

  // Construct the full URL for the redirect
  const baseUrl = import.meta.env.PROD
    ? "https://ddev.com"
    : import.meta.env.SITE || "https://ddev.com"
  const response = await fetch(`${baseUrl}/s/sponsorship-data.json`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const sponsorshipData = await response.json()

  putCache(cacheFilename, JSON.stringify(sponsorshipData))

  return sponsorshipData ?? []
}

/**
 * Returns JSON-parsed value from a cached file if it exists.
 * @param filename Name of the file to look for in the cache directory.
 * @returns file contents or null
 */
const getCache = (filename: string) => {
  const dir = path.resolve("./" + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + "/" + filename

  if (fs2.existsSync(filePath)) {
    const contents = fs2.readFileSync(filePath)
    return JSON.parse(contents)
  }

  return
}

/**
 * Write a file to the cache directory.
 * @param filename Name of the file to write to the cache directory.
 * @param contents Contents of the file.
 */
const putCache = (filename: string, contents: string) => {
  const dir = path.resolve("./" + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + "/" + filename

  if (!fs2.existsSync(dir)) {
    fs2.mkdirSync(dir)
  }

  fs2.writeFileSync(filePath, contents)
}

/**
 * Format a date string. Used mostly for blog post listing and detail pages.
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
    ...customOptions,
  }

  return new Intl.DateTimeFormat("en-US", options).format(pubDate)
}
