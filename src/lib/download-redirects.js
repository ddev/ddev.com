import fs from "fs"
import path from "path"
import { getLatestReleaseVersion } from "../lib/api.ts"
import { GITHUB_REPO } from "../const.js"

export default function downloadRedirects() {
  return {
    name: "download-redirects",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const latestVersion = await getLatestReleaseVersion()

        const amd64Url = `https://github.com/${GITHUB_REPO}/releases/download/${latestVersion}/ddev_windows_amd64_installer.${latestVersion}.exe`
        const arm64Url = `https://github.com/${GITHUB_REPO}/releases/download/${latestVersion}/ddev_windows_arm64_installer.${latestVersion}.exe`

        const redirectsPath = path.join(dir.pathname, "_redirects")
        let redirectsContent = fs.readFileSync(redirectsPath, "utf8")

        const downloadRedirects = `

# Download redirects (generated at build time)
/download/windows/amd64 ${amd64Url} 302
/download/windows/arm64 ${arm64Url} 302
`

        const finalContent = redirectsContent.trim() + downloadRedirects
        fs.writeFileSync(redirectsPath, finalContent)

        console.log(
          `[download-redirects] Generated redirects for version ${latestVersion}`
        )
      },
    },
  }
}
