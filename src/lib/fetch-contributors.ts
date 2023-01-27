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
  includeAnonymous = false,
  url = `https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=${pageLimit}${includeAnonymous ? '&anon=1' : ''}`,
  collectedContributors = []
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
            collectedContributors = collectedContributors.concat(data)
            page++

            if (data.length == pageLimit) {
              fetchContributors(
                includeAnonymous,
                `https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=${pageLimit}&page=${page}${includeAnonymous ? '&anon=1' : ''}`,
                collectedContributors
              )
                .then(resolve)
                .catch(reject)
            } else {
              console.log(
                `Finished loading ${collectedContributors.length} contributors.`
              )

              resolve(collectedContributors)
            }
          })
          .catch(reject)
      })
      .catch(reject)
  )
}
