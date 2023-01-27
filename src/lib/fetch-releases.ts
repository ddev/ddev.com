let page = 1
const pageLimit = 100

import { GITHUB_REPO } from "../config"

/**
 * Fetches GitHub contributors and continues through pagination.
 *
 * Careful running this too many times locally since you’ll quickly burn up non-auth rate limits!
 *
 * https://docs.astro.build/en/guides/data-fetching/
 * https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors
 */
export default async function fetchContributors(
  url = `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=${pageLimit}`,
  collectedReleases = []
) {
  return new Promise((resolve, reject) =>
    fetch(url)
      .then((response) => {
        console.log(url)
        if (response.status !== 200) {
          throw `${response.status}: ${response.statusText}`
        }
        response
          .json()
          .then((data) => {
            collectedReleases = collectedReleases.concat(data)
            page++

            if (data.length == pageLimit) {
              fetchContributors(
                `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=${pageLimit}&page=${page}`,
                collectedReleases
              )
                .then(resolve)
                .catch(reject)
            } else {
              console.log(
                `Finished loading ${collectedReleases.length} releases.`
              )

              resolve(collectedReleases)
            }
          })
          .catch(reject)
      })
      .catch(reject)
  )
}
