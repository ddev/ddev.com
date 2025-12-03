import fs from "fs"
import path from "path"
import { getLatestReleaseVersion } from "./api.ts"
import { GITHUB_REPO } from "../const.js"

export default function downloadDdevRedirects() {
  return {
    name: "download-ddev-redirects",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const rawVersion = await getLatestReleaseVersion() // e.g. "v1.24.10"
        const version = rawVersion.replace(/^v/, "") // → "1.24.10"

        const baseUrl = `https://github.com/${GITHUB_REPO}/releases/download/${rawVersion}`

        const assets = [
          // Checksums
          {
            path: "/download/checksums.txt",
            file: "checksums.txt",
          },

          // Windows
          {
            path: "/download/ddev_windows_amd64_installer.exe",
            file: `ddev_windows_amd64_installer.v${version}.exe`,
          },
          {
            path: "/download/ddev_windows_arm64_installer.exe",
            file: `ddev_windows_arm64_installer.v${version}.exe`,
          },
          {
            path: "/download/ddev_windows-amd64.zip",
            file: `ddev_windows-amd64.v${version}.zip`,
          },
          {
            path: "/download/ddev_windows-arm64.zip",
            file: `ddev_windows-arm64.v${version}.zip`,
          },

          // Linux - deb/rpm
          {
            path: "/download/ddev_linux_amd64.deb",
            file: `ddev_${version}_linux_amd64.deb`,
          },
          {
            path: "/download/ddev_linux_arm64.deb",
            file: `ddev_${version}_linux_arm64.deb`,
          },
          {
            path: "/download/ddev_linux_amd64.rpm",
            file: `ddev_${version}_linux_amd64.rpm`,
          },
          {
            path: "/download/ddev_linux_arm64.rpm",
            file: `ddev_${version}_linux_arm64.rpm`,
          },

          // Linux - tar.gz
          {
            path: "/download/ddev_linux-amd64.tar.gz",
            file: `ddev_linux-amd64.v${version}.tar.gz`,
          },
          {
            path: "/download/ddev_linux-arm64.tar.gz",
            file: `ddev_linux-arm64.v${version}.tar.gz`,
          },

          // Linux - WSL2
          {
            path: "/download/ddev-wsl2_linux_amd64.deb",
            file: `ddev-wsl2_${version}_linux_amd64.deb`,
          },
          {
            path: "/download/ddev-wsl2_linux_arm64.deb",
            file: `ddev-wsl2_${version}_linux_arm64.deb`,
          },
          {
            path: "/download/ddev-wsl2_linux_amd64.rpm",
            file: `ddev-wsl2_${version}_linux_amd64.rpm`,
          },
          {
            path: "/download/ddev-wsl2_linux_arm64.rpm",
            file: `ddev-wsl2_${version}_linux_arm64.rpm`,
          },

          // macOS
          {
            path: "/download/ddev_macos-amd64.tar.gz",
            file: `ddev_macos-amd64.v${version}.tar.gz`,
          },
          {
            path: "/download/ddev_macos-arm64.tar.gz",
            file: `ddev_macos-arm64.v${version}.tar.gz`,
          },

          // Shell completion scripts
          {
            path: "/download/ddev_shell_completion_scripts.tar.gz",
            file: `ddev_shell_completion_scripts.v${version}.tar.gz`,
          },
        ]

        const redirectsPath = path.join(dir.pathname, "_redirects")
        let redirectsContent = fs.readFileSync(redirectsPath, "utf8")

        let downloadRedirects =
          "\n\n# DDEV download redirects (generated at build time)"

        for (const asset of assets) {
          downloadRedirects += `\n${asset.path} ${baseUrl}/${asset.file} 302`
        }

        const finalContent = redirectsContent.trim() + downloadRedirects + "\n"
        fs.writeFileSync(redirectsPath, finalContent)

        console.log(
          `[download-ddev-redirects] Generated ${assets.length} redirect(s) for version ${rawVersion}`
        )
      },
    },
  }
}
