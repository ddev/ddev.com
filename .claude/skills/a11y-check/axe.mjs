/**
 * Runs axe-core on each path, in both themes, at desktop and phone width, and
 * prints the violations as JSON. Modules resolve from the working directory,
 * so the repository's package.json doesn't need them.
 *
 * Usage: node axe.mjs <base-url> <path>...
 */
import { createRequire } from "module"
import { readFileSync } from "fs"

const require = createRequire(`${process.cwd()}/`)
const puppeteer = require("puppeteer-core")
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8")

const [base, ...paths] = process.argv.slice(2)
const viewports = [
  { width: 1400, height: 900 },
  { width: 390, height: 844, isMobile: true, hasTouch: true },
]

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/chromium",
  args: ["--no-sandbox", "--ignore-certificate-errors"],
})
const violations = []
for (const path of paths) {
  for (const scheme of ["light", "dark"]) {
    for (const viewport of viewports) {
      const page = await browser.newPage()
      await page.setViewport(viewport)
      // Reduced motion stops the home page terminal on one screen, so every
      // run checks the same markup.
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: scheme },
        { name: "prefers-reduced-motion", value: "reduce" },
      ])
      await page.goto(base + path, {
        waitUntil: "networkidle2",
        timeout: 60000,
      })
      await page.evaluate(axeSource)
      const check = async (context) => {
        const result = await page.evaluate(
          (context) =>
            axe.run(context, {
              runOnly: {
                type: "tag",
                values: [
                  "wcag2a",
                  "wcag2aa",
                  "wcag21a",
                  "wcag21aa",
                  "wcag22aa",
                  "best-practice",
                ],
              },
            }),
          context
        )
        for (const violation of result.violations) {
          for (const node of violation.nodes) {
            violations.push({
              path,
              scheme,
              width: viewport.width,
              id: violation.id,
              impact: violation.impact,
              target: node.target.join(" "),
              html: node.html.slice(0, 160),
              summary: node.failureSummary?.split("\n")[1]?.trim(),
            })
          }
        }
      }
      await check("html")
      // The terminal's other screen, `ddev start`, plays once and is paused
      // at its end, since reduced motion only ever shows `ddev describe`.
      if (await page.$("#animation-toggle").then((e) => e?.isVisible())) {
        await page.click("#animation-toggle")
        await page.waitForFunction(
          () =>
            document
              .getElementById("animation-stage")
              .textContent.includes("alternate URLs"),
          { timeout: 60000 }
        )
        await page.click("#animation-toggle")
        await check(".terminal-wrapper")
      }
      await page.close()
    }
  }
}
await browser.close()
console.log(JSON.stringify(violations, null, 1))
