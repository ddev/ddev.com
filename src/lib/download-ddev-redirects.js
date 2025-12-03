import fs from "fs"
import path from "path"
import { getLatestReleaseVersion } from "../lib/api.ts"
import { GITHUB_REPO } from "../const.js"

export default function downloadDdevRedirects() {
  return {
    name: "download-ddev-redirects",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const latestVersion = await getLatestReleaseVersion()
        const baseUrl = `https://github.com/${GITHUB_REPO}/releases/download/${latestVersion}`

        // All DDEV release assets - using exact filenames from GitHub releases
        const assets = [
          // Checksums
          { path: "/download/checksums.txt", file: `checksums.txt` },

          // Windows
          { path: "/download/ddev_windows_amd64_installer.exe", file: `ddev_windows_amd64_installer.${latestVersion}.exe` },
          { path: "/download/ddev_windows_arm64_installer.exe", file: `ddev_windows_arm64_installer.${latestVersion}.exe` },
          { path: "/download/ddev_windows-amd64.zip", file: `ddev_windows-amd64.${latestVersion}.zip` },
          { path: "/download/ddev_windows-arm64.zip", file: `ddev_windows-arm64.${latestVersion}.zip` },

          // Linux - standard packages
          { path: "/download/ddev_linux_amd64.deb", file: `ddev_${latestVersion}_linux_amd64.deb` },
          { path: "/download/ddev_linux_arm64.deb", file: `ddev_${latestVersion}_linux_arm64.deb` },
          { path: "/download/ddev_linux_amd64.rpm", file: `ddev_${latestVersion}_linux_amd64.rpm` },
          { path: "/download/ddev_linux_arm64.rpm", file: `ddev_${latestVersion}_linux_arm64.rpm` },
          { path: "/download/ddev_linux-amd64.tar.gz", file: `ddev_linux-amd64.${latestVersion}.tar.gz` },
          { path: "/download/ddev_linux-arm64.tar.gz", file: `ddev_linux-arm64.${latestVersion}.tar.gz` },

          // Linux - WSL2 packages
          { path: "/download/ddev-wsl2_linux_amd64.deb", file: `ddev-wsl2_${latestVersion}_linux_amd64.deb` },
          { path: "/download/ddev-wsl2_linux_arm64.deb", file: `ddev-wsl2_${latestVersion}_linux_arm64.deb` },
          { path: "/download/ddev-wsl2_linux_amd64.rpm", file: `ddev-wsl2_${latestVersion}_linux_amd64.rpm` },
          { path: "/download/ddev-wsl2_linux_arm64.rpm", file: `ddev-wsl2_${latestVersion}_linux_arm64.rpm` },

          // macOS
          { path: "/download/ddev_macos-amd64.tar.gz", file: `ddev_macos-amd64.${latestVersion}.tar.gz` },
          { path: "/download/ddev_macos-arm64.tar.gz", file: `ddev_macos-arm64.${latestVersion}.tar.gz` },

          // Shell completion scripts
          { path: "/download/ddev_shell_completion_scripts.tar.gz", file: `ddev_shell_completion_scripts.${latestVersion}.tar.gz` },
        ]

        const redirectsPath = path.join(dir.pathname, "_redirects")
        let redirectsContent = fs.readFileSync(redirectsPath, "utf8")

        let downloadRedirects = "\n\n# DDEV download redirects (generated at build time)"

        for (const asset of assets) {
          downloadRedirects += `\n${asset.path} ${baseUrl}/${asset.file} 302`
        }

        const finalContent = redirectsContent.trim() + downloadRedirects + "\n"
        fs.writeFileSync(redirectsPath, finalContent)

        console.log(
          `[download-ddev-redirects] Generated ${assets.length} redirect(s) for version ${latestVersion}`
        )
      },
    },
  }
}
