---
name: a11y-check
description: Check ddev.com pages for accessibility problems with axe-core and Lighthouse, in both themes and at desktop and phone width, before a change that touches markup, colors, or layout is committed. Use when asked to check accessibility, contrast, or PageSpeed scores, or after changing a layout, component, or global.css.
when_to_use: >
  Triggered by "check accessibility", "run axe", "a11y", "contrast", "WCAG",
  "PageSpeed", "Lighthouse score", or a change to src/layouts/,
  src/components/, or src/styles/.
---

# Checking accessibility

Run the tools on the host, not in the DDEV web container, which has no
browser. Both need Chrome or Chromium; set `CHROME_PATH` to it when it is not
`/usr/bin/chromium`, as on macOS:

```bash
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## 1. Build

Check the production build, not the dev server, whose toolbar adds markup of
its own:

```bash
ddev npm run build
base=$(ddev describe -j | jq -r .raw.primary_url)
```

## 2. axe-core

Install the packages in `~/tmp`, never in the repository's `package.json`,
and run [`axe.mjs`](axe.mjs) from there:

```bash
mkdir -p ~/tmp/a11y-tools && cd ~/tmp/a11y-tools
[ -d node_modules ] || { npm init -y >/dev/null && npm install puppeteer-core@24 axe-core@4; }
node <skill dir>/axe.mjs "$base" / /blog/ /download/ > axe.json
jq 'group_by(.id) | map({id: .[0].id, count: length, example: .[0]})' axe.json
```

Pass every page type the change can reach. For a change to the layout,
header, footer, or `global.css`, that is all of them:

```text
/ /about/ /blog/ /blog/<a post>/ /blog/author/ /blog/author/<id>/
/blog/category/ /blog/category/<slug>/ /brand/ /download/ /get-started/
/sponsor/ /usage-stats/
```

For the post, pick one whose code blocks have comments in them, such as
`/blog/shopware-on-ddev/`, since comments are the lightest code color.

The script checks each path in light and dark at 1400 and 390 px wide, since
some problems show in only one theme or at one width. It emulates reduced
motion, which stops the home page terminal on its `ddev describe` screen,
then plays the `ddev start` screen and checks the terminal again.

Fix every violation the change introduced. To tell which were there before,
run the same paths with `https://ddev.com` as the base; report those, and
leave them for a separate PR unless asked.

## 3. Lighthouse

The PageSpeed Insights API shares its quota across everyone who calls it
without a key, so it usually fails. Run Lighthouse locally instead:

```bash
npx -y lighthouse@12 "$base/" --quiet --output=json --output-path=lh.json \
  --chrome-flags="--headless=new --ignore-certificate-errors"
jq '.categories | map_values(.score * 100)' lh.json
```

Add `--preset=desktop` for the desktop scores. Locally, best practices loses
points to a 404 for `/s/sponsorship-data.json`, which `public/_redirects`
answers on Cloudflare; ignore that one.

For the live site, run the same command against `https://ddev.com/`, or a
PR's Cloudflare preview.
