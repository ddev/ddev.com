/**
 * Collection of content-fetching and formatting methods.
 */

import dotenv from "dotenv"
import fs2 from "fs"
import path from 'path'
import Slugger from 'github-slugger'
import { Octokit } from "octokit";
import { GITHUB_REPO } from "../config"

dotenv.config()

// Project-root-relative directory for temporary data used in local development
const DEVELOPMENT_CACHE_DIR = 'cache'
let octokitInstance: Octokit;

/**
 * Returns an instance of Octokit, which uses the `GITHUB_TOKEN` environment
 * variable for authentication.
 * @returns Octokit
 */
const octokit = () => {
  if (octokitInstance) {
    return octokitInstance;
  }

  octokitInstance = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  
  return octokitInstance;
}

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
  const author = authorData.find((author: object) => author.name == name)

  if (!author) {
    console.error(`No author data found for “${name}”!`);
    return;
  }

  return author
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
  const cacheFilename = 'sponsors.json'
  const cachedData = getCache(cacheFilename);

  if (cachedData) {
    return cachedData;
  }

  const response = await octokit().graphql(`
    query {
      user(login: "rfay") {
        ... on Sponsorable {
          sponsors(first: 100) {
            totalCount
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
    }
  `)

  const data = response.user.sponsors.nodes;

  putCache(cacheFilename, JSON.stringify(data));

  return data
}

/**
 * Fetches GitHub contributor data.
 * @param useDevCache Whether to use a local result cache in development to reduce third-party calls.
 * @returns response data
 */
export async function getContributors(includeAnonymous = false) {
  const cacheFilename = 'contributors.json'
  const cachedData = getCache(cacheFilename);

  let data;

  if (cachedData) {
    data = cachedData;
  } else {
    const response = await octokit().paginate(`GET https://api.github.com/repos/${GITHUB_REPO}/contributors`, {
      anon: 1,
      per_page: 100,
    });
  
    data = response;
    putCache(cacheFilename, JSON.stringify(data));
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
  const cacheFilename = `repository-${slug}.json`;
  const cachedData = getCache(cacheFilename);

  if (cachedData) {
    return cachedData;
  }

  const response = await octokit().request(`GET https://api.github.com/repos/${name}`)
  const data = response.data;

  putCache(cacheFilename, JSON.stringify(data));

  return data;
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
  const cacheFilename = 'releases.json'
  const cachedData = getCache(cacheFilename);

  if (cachedData) {
    return cachedData;
  }

  const response = await octokit().paginate(`GET https://api.github.com/repos/${GITHUB_REPO}/releases`, {
    per_page: 100,
  });

  putCache(cacheFilename, JSON.stringify(response));

  return response ?? []
}

/**
 * Returns JSON-parsed value from a cached file if it exists.
 * @param filename Name of the file to look for in the cache directory.
 * @returns file contents or null
 */
const getCache = (filename: string) => {
  const dir = path.resolve('./' + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + '/' + filename
  
  if (fs2.existsSync(filePath)) {
    const contents = fs2.readFileSync(filePath);
    return JSON.parse(contents);
  }

  return
}

/**
 * Write a file to the cache directory.
 * @param filename Name of the file to write to the cache directory.
 * @param contents Contents of the file.
 */
const putCache = (filename: string, contents: string) => {
  const dir = path.resolve('./' + DEVELOPMENT_CACHE_DIR)
  const filePath = dir + '/' + filename

  if (!fs2.existsSync(dir)) {
    fs2.mkdirSync(dir);
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
    ...customOptions
  }

  return new Intl.DateTimeFormat("en-US", options).format(pubDate)
}
