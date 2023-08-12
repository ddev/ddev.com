import fs2 from "fs"
import glob from "glob"
import { getSearchIndex } from "@barnabask/astro-minisearch"
import { fileURLToPath } from "node:url"
import { parseHTML } from "linkedom"

var Logger = class {
  constructor(packageName) {
    this.colors = {
      reset: "\x1B[0m",
      fg: {
        red: "\x1B[31m",
        green: "\x1B[32m",
        yellow: "\x1B[33m",
      },
    }
    this.packageName = packageName
  }
  log(msg, prefix = "") {
    const s = msg.join("\n")
    console.log(
      `%s${this.packageName}:%s ${s}
`,
      prefix,
      prefix ? this.colors.reset : ""
    )
  }
  info(...msg) {
    this.log(msg)
  }
  success(...msg) {
    this.log(msg, this.colors.fg.green)
  }
  warn(...msg) {
    this.log(["Skipped!", ...msg], this.colors.fg.yellow)
  }
  error(...msg) {
    this.log(["Failed!", ...msg], this.colors.fg.red)
  }
}

let astroConfig

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
      "astro:config:done": async ({ config: cfg }) => {
        astroConfig = cfg
      },
      "astro:build:done": async ({ dir, routes }) => {
        const logger = new Logger("search-index")

        // Get the full path of the build directory
        const fullDir = fileURLToPath(new URL("./", dir))

        // Find all the HTML files Astro just generated
        const files = glob.sync(`${fullDir}**/*.html`)

        const output = config.output

        let items = []

        for (const file of files) {
          const data = fs.readFileSync(file, "utf-8")
          const { document: postDocument } = parseHTML(data)

          const ogTitleTag = postDocument.querySelector(
            "meta[property='og:title']"
          )
          const ogTitleValue = ogTitleTag.getAttribute("content")

          // const robotsTag = postDocument.querySelector("meta[name=robots]")
          // const robotsValue = robotsTag.getAttribute("content")
          //
          // if (robotsValue.includes("noindex")) {
          //   // Don’t include `noindex` pages in search results
          //   continue
          // }

          const mainTag = postDocument.querySelector("main")
          // Use the inner *text* from the `<main>` tag for the search index
          const postContent = mainTag.innerText

          const canonicalTag = postDocument.querySelector("link[rel=canonical]")
          const url = canonicalTag
            .getAttribute("href")
            .replace(astroConfig.site, "/")

          items.push({
            url: url,
            title: ogTitleValue,
            text: postContent,
          })
        }

        // console.log(items)

        // Generate the index in the format we need
        let index = await getSearchIndex(items)

        // Write the index contents to a file
        fs2.writeFileSync(new URL(output, dir), index.body)

        logger.success("`" + config.output + "` is created.")
      },
    },
  }
}
