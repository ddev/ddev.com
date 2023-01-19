import fs2 from "fs"
import glob from "glob"
import { getSearchIndex } from "@barnabask/astro-minisearch"
import { fileURLToPath } from "node:url"
import { parseHTML } from "linkedom"

/**
 * Uses Astro’s post-build hook to scan rendered HTML files, grab their content,
 * and add it to a JSON index used by the internal search tool.
 *
 * @param {*} config
 * @returns
 */
export default function searchIndex(config) {
  return {
    name: "search-index",
    hooks: {
      "astro:build:done": async ({ dir, routes }) => {
        // Get the full path of the build directory
        const fullDir = fileURLToPath(new URL("./", dir))

        // Find all the HTML files Astro just generated
        const files = glob.sync(`${fullDir}**/*.html`)

        const output = config.output

        let items = []

        for (const file of files) {
          const data = fs.readFileSync(file, "utf-8")
          const { document: postDocument } = parseHTML(data)

          const robotsTag = postDocument.querySelector("meta[name=robots]")
          const robotsValue = robotsTag.getAttribute("content")

          if (robotsValue.includes("noindex")) {
            // Don’t include `noindex` pages in search results
            continue
          }

          const mainTag = postDocument.querySelector("main")
          // Use the inner *text* from the `<main>` tag for the search index
          const postContent = mainTag.innerText

          const canonicalTag = postDocument.querySelector("link[rel=canonical]")
          const url = canonicalTag.getAttribute("href")

          items.push({
            url: url,
            title: postDocument.title,
            text: postContent,
          })
        }

        // console.log(items)

        // Generate the index in the format we need
        let index = await getSearchIndex(items)

        // Write the index contents to a file
        fs2.writeFileSync(new URL(output, dir), index.body)
      },
    },
  }
}
