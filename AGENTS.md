# AGENTS.md

Guidance for AI agents working on ddev.com, the static Astro site for
[DDEV](https://github.com/ddev/ddev), hosted on Cloudflare Pages. Setup without
DDEV is in `README.md`.

## Where the rest of the guidance lives

Read the file that matches what you are touching. Claude Code loads these on
its own.

| Working on                                        | Read                                  |
| ------------------------------------------------- | ------------------------------------- |
| Blog posts (voice, frontmatter), authors, pages   | `.claude/rules/content.md`            |
| Markdown features (callouts, code blocks, images) | `MARKDOWN_FORMATTING.md`              |
| Screenshots or feature images for a post          | `.claude/skills/blog-images/SKILL.md` |
| Adding or updating a featured sponsor             | `.claude/skills/add-sponsor/SKILL.md` |
| Bumping npm dependencies                          | `.claude/skills/bump-deps/SKILL.md`   |
| A commit or PR                                    | `.claude/skills/ddev-commit/SKILL.md` |
| A comment, in any code file                       | `.claude/rules/comments.md`           |

Fetch files from GitHub through `raw.githubusercontent.com`; a
`github.com/.../blob/...` page wraps the file in markup that costs tokens and
can be summarized instead of read. DDEV's
[organization-wide patterns](https://raw.githubusercontent.com/ddev/.github/main/AGENTS.md)
mostly restate this file, which **wins where they differ**, for example on
never pushing.

## Claude Code automation

<!--
Maintainer note: anything the harness can enforce belongs in
.claude/settings.json, and guidance for one area belongs in a rule or skill.
See .claude/README.md.
-->

`.claude/settings.json` enforces some rules in this file, so Claude Code should
treat them as facts about the environment rather than steps to repeat:

- Before every `git commit`, the check-only `ddev npm run prettier` and
  `ddev npm run textlint` run, and a failure or a stopped project blocks the
  commit.
- Editing a file runs `ddev prettier` on it, and `ddev textlint` too under
  `src/content/`. Errors they cannot fix are shown to Claude.
- `git push` is denied.

## Commands

Run everything through DDEV:

```bash
ddev start              # Installs dependencies, starts the Astro dev server
ddev npm run build      # Production build to ./dist/
ddev prettier [file]    # Fix formatting, of the whole tree or the given files
ddev textlint [file]    # Fix content wording in src/content/**, then report what is left
ddev logs               # Dev server output, from the astro-dev-daemon
```

The dev server with hot reload is at `https://<projectname>.ddev.site:4321`,
and the last build at `https://<projectname>.ddev.site`. File arguments to
`ddev prettier` and `ddev textlint` are relative to the project root. CI runs
the check-only `npm run prettier` and `npm run textlint` on every PR.

## Before committing

1. `ddev prettier` and `ddev textlint`
2. `ddev npm run build` when code, config, or dependencies changed; it also
   fails on broken internal links
3. For new content, spell check it and check images as described in
   `.claude/rules/content.md`

## Architecture

The layout under `src/` is standard Astro (`components/`, `content/`,
`layouts/`, `lib/`, `pages/`, `styles/`). The parts that are not obvious:

- Content collections are validated by `src/content.config.ts`, so a bad
  author or category fails the build.
- `src/lib/api.ts` fetches GitHub data with `GITHUB_TOKEN` from `.env` (see
  `.env.example` and `README.md`) and caches responses in `cache/` during
  development. Content work needs no token; without one, sponsorship data
  falls back to sample data.
- `src/featured-sponsors.json` also generates the SVG sponsor badges
  (`src/pages/resources/featured-sponsors*.svg.js`) used in the main DDEV
  repository's README.
- Redirects and short links are in `public/_redirects`.

## Writing style

Applies to conversation, commit messages, PR text, content, and comments:

- Direct, concise language. State findings plainly, including what failed or
  was not verified.
- **Never use any of these, in any form:** `comprehensive`, `complete`,
  `full`, `entire`, `thorough`, `detailed`, `seamless`, `genuine`,
  `genuinely`, `honest`, `honestly`, `truly`, `really` (as an intensifier),
  `perfect`, `perfectly`, `robust`, `powerful`, `effortless`,
  `production-ready`, `tremendous`, `dramatically`, `revolutionary`, `delve`,
  `elevate`, `unleash`. They assert importance instead of showing it; delete
  the word, and if that changes the meaning, the claim needed evidence.
- No flattery (`You're absolutely right`, `Great question`), no introductory
  phrases ("I'd be happy to"), and no closing summary unless asked. Lead with
  the substance.
- Prefer `jq` over Python for JSON in shell commands.

## Files

- **Never add trailing whitespace.** Empty lines must contain no spaces or tabs.
- Match the file's indentation and line endings, and the surrounding
  component patterns. Prettier has no Astro plugin here, so nothing formats
  `.astro` files; match their style by hand.
- Use kebab-case for blog post filenames, and SVG for logos in
  `public/logos/`.
- Put temporary files and scripts in `~/tmp`, not the repository.

## Git workflow

**Commit only when asked, and never run `git push`** or anything else that
pushes to a remote, even when asked. The maintainer pushes.

Branch names are `YYYYMMDD_<username>_<short_description>`, for example
`20250919_rfay_update_quickstart`. Commit titles follow Conventional Commits,
and the commit body is reused as the PR description; see
`.claude/skills/ddev-commit/SKILL.md` before writing either.
