/**
 * Collection of content-fetching and formatting methods, mostly for
 * extracting blog-related content from WordPress via GraphQL.
 */

import dotenv from "dotenv"
import getReadingTime from 'reading-time';
import fs2 from "fs"
import path from 'path'
import fetchContributors from "./fetch-contributors"
import fetchReleases from "./fetch-releases"
import Slugger from 'github-slugger'


dotenv.config()

// Project-root-relative directory for temporary data used in local development
const DEVELOPMENT_CACHE_DIR = 'cache'

/**
 * Returns a URL-friendly slug for a given string.
 * @param value
 * @returns string
 */
export function getSlug(value: string) {
  const slugger = new Slugger();
  return slugger.slug(value);
}

/**
 * Returns the URL for an author’s detail page.
 * @param name The author’s full name
 * @returns root-relative path
 */
export function getAuthorUrl(name: string) {
  return `/blog/author/${getSlug(name)}`;
}

/**
 * Returns the URL for an author’s avatar image.
 * @param name The author’s full name
 * @returns absolute URL
 */
export function getAuthorImage(name: string) {
  const authorData = getAuthorDataByName(name);
  return authorData?.avatarUrl
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
 * Returns author detail from the JSON blob for a given author.
 * @param name The author’s full name
 * @returns object
 */
export function getAuthorDataByName(name: string) {
  const authorData = getAuthorData();
  return authorData.find((author: object) => author.name == name)
}

// Local reference for loaded data
let authorData: Array<object>

/**
 * Gets data for the JSON blob at `src/authors.json`.
 * @returns array
 */
export function getAuthorData() {
  const dir = path.resolve('./src/')
  const filePath = dir + '/authors.json'
  
  if (authorData) {
    return authorData
  } else if (fs2.existsSync(filePath)) {
    const data = fs2.readFileSync(filePath)
    authorData = JSON.parse(data);
    return authorData;
  } else {
    console.log(`Author data not found in ${filePath}!`)
  }

  return
}

/**
 * Fetches GitHub Sponsors.
 * @returns response data
 */
export async function getSponsors() {
  // https://github.com/filiptronicek/gh-sponsors-api#notes
  const data = await fetchLiveOrCachedJson(`https://ghs.vercel.app/sponsors/rfay`, 'sponsors.json');

  return data.sponsors
}

/**
 * Fetches GitHub contributor data.
 * @param useDevCache Whether to use a local result cache in development to reduce third-party calls.
 * @returns response data
 */
export async function getContributors(includeAnonymous = false) {
  const filename = 'contributors.json'
  let data

  const cacheValue = getCachedFile(filename);

  if (cacheValue) {
    console.log(
      `Loaded cached contributors.`
    )
    data = JSON.parse(cacheValue)
  }

  if (!data) {
    const response = await fetchContributors()
      .then((collectedContributors) => {
        data = collectedContributors
        storeCachedFile(filename, JSON.stringify(data))
      })
      .catch(console.error)
  }

  if (!includeAnonymous) {
    return data.filter((contributor) => {
      return contributor.type !== 'Anonymous'
    });
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
  const slug = name.replace('/', '-')
  return await fetchLiveOrCachedJson(`https://api.github.com/repos/${name}`, `repository-${slug}.json`);
}

/**
 * Gets the most recent `drud/ddev` tag name, like `v1.21.4`.
 * @returns tag name
 */
export async function getLatestReleaseVersion() {
  const data = await getReleases()
  return data[0].tag_name;
}

export async function getReleases() {
  const filename = 'releases.json'
  let data

  const cacheValue = getCachedFile(filename);

  if (cacheValue) {
    console.log(
      `Loaded cached releases.`
    )
    data = JSON.parse(cacheValue)
  }

  if (!data) {
    const response = await fetchReleases()
      .then((collectedReleases) => {
        data = collectedReleases
        storeCachedFile(filename, JSON.stringify(data))
      })
      .catch(console.error)
  }

  return data ?? []

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
 * Returns request data, preferring locally-cached JSON if it exists in order
 * to avoid excessive network requests.
 * @param url The endpoint to be fetched
 * @param filename JSON filename (`*.json`) local data should be stored in
 * @param useCache Whether to use a local cache
 * @returns array|object The decoded JSON value
 */
const fetchLiveOrCachedJson = async (url: string, filename: string, useCache = true) => {
  let data

  if (useCache) {
    const cacheValue = getCachedFile(filename);

    if (cacheValue) {
      console.log(
        `Loaded cached ${filename}.`
      )
      data = JSON.parse(cacheValue)

      return data
    }
  }

  if (!data) {
    console.log(
      `Fetching ${url}.`
    )

    const response = await fetch(url)
    const data = await response.json()

    if (useCache) {
      storeCachedFile(filename, JSON.stringify(data))
    }

    return data
  }
}

/**
 * Returns a cached file if it exists.
 * @param filename Name of the file to look for in the cache directory.
 * @returns file contents or null
 */
const getCachedFile = (filename: string) => {
  const dir = path.resolve('./' + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + '/' + filename
  
  if (fs2.existsSync(filePath)) {
    return fs2.readFileSync(filePath);
  }

  return
}

/**
 * Write a file to the cache directory.
 * @param filename Name of the file to write to the cache directory.
 * @param contents Contents of the file.
 */
const storeCachedFile = (filename: string, contents: string) => {
  const dir = path.resolve('./' + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + '/' + filename

  if (!fs2.existsSync(dir)) {
    fs2.mkdirSync(dir);
  }

  fs2.writeFileSync(filePath, contents)
}