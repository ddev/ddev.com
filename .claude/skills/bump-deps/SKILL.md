---
name: bump-deps
description: Bump the npm dependencies of ddev.com (Astro, its integrations, and everything else in package.json), update allowScripts, and run the checks a bump PR needs before review. Use when asked to bump, update, or upgrade dependencies, or to finish a Dependabot PR.
when_to_use: >
  Triggered by "bump dependencies", "bump all npm deps", "update Astro",
  "upgrade packages", "npm audit has findings", or a Dependabot
  `build(deps)` branch that needs the rest of the tree brought along.
---

# Bumping npm dependencies

Dependabot opens a grouped `major-deps` PR weekly and ignores minor and patch
releases (`.github/dependabot.yml`), so a manual bump brings along everything
else. When working on a Dependabot branch, add a commit on top of its commit:
Dependabot then stops rebasing the branch.

## 1. Baseline

```bash
ddev start
ddev npm outdated   # exits 1 whenever anything is outdated; that is not an error
ddev npm audit
```

Keep the audit output: it goes in The Issue.

## 2. Update

```bash
ddev npx @astrojs/upgrade   # astro and @astrojs/*, including majors
ddev npm update             # everything else, within the package.json ranges
ddev npm outdated           # anything left has a new major
```

`@astrojs/upgrade` links the upgrade guide for a new Astro major
(`https://docs.astro.build/en/guides/upgrade-to/v<N>/`). Read it, and read the
changelog of any other major left in `npm outdated`, before
`ddev npm install <pkg>@latest`. Past majors needed code changes, for example
missing closing tags under Astro 7's stricter compiler.

`optionalDependencies` pins the Linux x64 native binaries of
`@tailwindcss/oxide` and `lightningcss`, which the web container and the
Cloudflare build run on. `npm update` keeps them current. Where two versions
of `lightningcss` are installed, npm nests a matching binary under the older
one, so confirm each copy has a binary of its own version:

```bash
jq -r '.packages | to_entries[] | select(.key | test("(lightningcss|tailwindcss/oxide)(-linux-x64-gnu)?$")) | "\(.key) \(.value.version)"' package-lock.json
```

## 3. allowScripts

npm runs a dependency's install scripts only when `package.json`
`allowScripts` has an entry for it, pinned to `pkg@version` by default.
Otherwise it skips them without failing and lists the skipped packages at the
end of the install output, so a bump of `esbuild` or `@parcel/watcher` that is
not re-approved breaks quietly:

```bash
ddev npm install-scripts ls                # unreviewed install scripts
ddev npm install-scripts approve esbuild   # rewrites the pin to the installed version
ddev npm install-scripts prune --dry-run   # entries that match nothing installed
ddev npm install-scripts prune
```

Approve only a package already on the list, or one a new dependency pulled in
for a reason you can name. Afterward, `allowScripts` lists exactly the
installed versions.

## 4. overrides

Use an `overrides` entry only when a package works but has not yet declared
the new Astro as a supported peer, and link its upstream issue in the PR:

```json
"overrides": {
  "astro-rehype-relative-markdown-links": { "astro": "$astro" }
}
```

On every bump, check whether upstream has caught up, and remove the override
when it has.

## 5. Checks

```bash
ddev npm run build 2>&1 | tee ~/tmp/build.log
grep -niE 'warn|error|deprecat' ~/tmp/build.log   # GITHUB_TOKEN/AMPLITUDE notices are expected locally
ddev restart && ddev logs                         # astro-dev-daemon must reach RUNNING
ddev npm audit
ddev prettier
```

- The build must finish with astro-link-validator reporting no broken links.
- If `astro-dev-daemon` exits once with "Another astro dev server is already
  running" right after a restart, the old `.astro/dev.json` PID collided with a
  new process; supervisor restarts it. It is a problem only if it keeps
  exiting.
- If an audit finding has no fix, say so in the PR with the advisory or
  upstream issue, as #637 and #734 did. Replace an unmaintained package
  instead of carrying the finding, if one of the existing dependencies can do
  the job.

## 6. Pull request

Write the commit and PR with the `ddev-commit` skill. Title:
`build(deps): bump astro from v<old> to v<new>`, plus any other notable major.

- **Short Summary (TL;DR):** which packages moved to a new major, and whether
  any code had to change.
- **The Issue:** the audit output, or "Dependencies had fallen behind".
- **How This PR Solves The Issue:** the commands from step 2, the majors, and
  any code or `allowScripts`/`overrides` change and why.
- **Manual Testing Instructions:**

  ```bash
  ddev start

  # check for problems in:
  ddev logs
  ddev npm run build
  ddev npm audit
  ```

  Then compare the Cloudflare preview against https://ddev.com/, in desktop and
  mobile views: `/blog/markdown-features-demo/`, `/get-started/`,
  `/usage-stats/`, site search, the theme toggle, and anything a major touched
  (for example `#featured-sponsors` on the demo post after an image library
  change). Take the preview URL from the Cloudflare comment, as the
  `ddev-commit` skill describes, because Dependabot aliases always collide and
  get a random suffix.

- **Release/Deployment Notes:** the majors to watch in the Cloudflare build.
