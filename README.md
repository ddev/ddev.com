<div align="center">

<a href="https://ddev.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logos/dark-ddev.svg">
    <img alt="DDEV" src="public/logos/ddev.svg" width="320">
  </picture>
</a>

### Source code for ddev.com

The static site for [DDEV](https://github.com/ddev/ddev), built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), and hosted on Cloudflare Pages.

[![Website](https://img.shields.io/badge/website-ddev.com-blue)](https://ddev.com)
[![Test](https://img.shields.io/github/actions/workflow/status/ddev/ddev.com/test.yml?branch=main&label=test)](https://github.com/ddev/ddev.com/actions/workflows/test.yml)
[![Discord](https://img.shields.io/discord/664580571770388500?logo=discord&logoColor=%23fff&label=Discord&link=https%3A%2F%2Fddev.com%2Fs%2Fdiscord)](https://ddev.com/s/discord)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)

[**Contributor Training**](https://ddev.com/blog/ddev-website-for-contributors/) · [**Markdown Formatting**](MARKDOWN_FORMATTING.md) · [**Agent Guidance**](AGENTS.md) · [**Sponsor DDEV**](https://ddev.com/sponsor)

</div>

---

## Project Structure

The layout follows Astro’s [project structure](https://docs.astro.build/en/basics/project-structure/). The parts specific to this site:

- **`cache/`** – GitHub API responses cached during local development, to reduce API calls.
- **`public/`** – images, logos, and [redirects](https://developers.cloudflare.com/pages/configuration/redirects/), copied as they are into `dist/`.
- **`src/content/`** – Markdown for the blog posts and authors, validated by the [content collections](https://docs.astro.build/en/guides/content-collections/) schemas in `src/content.config.ts`.
- **`src/pages/`** – `.astro` and `.mdx` pages whose filenames become routes.
- **`src/layouts/`** – `Layout.astro`, used by every page, and `MarkdownLayout.astro`, used by the `.mdx` pages.
- **`src/lib/`** – GitHub API fetching, the search index, and the remark and rehype plugins for blog Markdown.
- **`src/featured-sponsors.json`** – the featured sponsors, see [Sponsor Management](#sponsor-management).

## Development

### DDEV Setup

DDEV includes all the dependencies.

1. Run `ddev start`. It installs dependencies and starts the dev server.
2. Open `https://<projectname>.ddev.site:4321`. The dev server reloads as you edit.

| Command                | Action                                                                            |
| :--------------------- | :-------------------------------------------------------------------------------- |
| `ddev npm run build`   | Build the production site to `dist/`, served at `https://<projectname>.ddev.site` |
| `ddev prettier [file]` | Fix formatting of the whole tree, or of the given files                           |
| `ddev textlint [file]` | Fix wording in `src/content/**`, or in the given files, then report what is left  |
| `ddev logs`            | Dev server output, for troubleshooting                                            |

Run `ddev prettier` and `ddev textlint` before committing. CI runs the same checks.

### Setup Without DDEV

1. Run `nvm use` to use the Node.js version in `.nvmrc`.
2. Run `npm install`.
3. Run `npm run dev`, and open `http://localhost:4321/`. If it fails, run `npm cache clean --force && npm install && npm run dev`.

`npm run build` builds to `dist/`, and `npm run preview` serves the build. `npm run prettier:fix` and `npm run textlint:fix && npm run textlint` replace the DDEV commands above.

When switching from this setup to DDEV, delete `node_modules/` and run `ddev npm install`, since the two architectures can conflict.

### GitHub Token

Not needed to contribute a blog post. Contributors, sponsors, releases, and other DDEV data come from the GitHub API; without a token, sponsorship data falls back to sample data. To use the real data:

1. Run `cp .env.example .env`. Don’t commit `.env`.
2. Create a [classic GitHub access token](https://github.com/settings/tokens) with the scopes `repo`, `read:org`, `read:user`, and `read:project`.
3. Paste the token after `GITHUB_TOKEN=` in `.env`.

### Editor Setup

`.editorconfig` and `.prettierrc` hold the formatting rules. VS Code suggests the extensions in `.vscode/extensions.json` (Prettier, EditorConfig, Astro), and `.vscode/settings.json` formats on save.

## Managing Content

### Blog Posts

Blog posts are Markdown files in `src/content/blog/`, named with a kebab-case slug, for example `my-new-post.md`. For callouts, code blocks, images, and other features, see [MARKDOWN_FORMATTING.md](MARKDOWN_FORMATTING.md). Use this frontmatter:

```markdown
---
title: "It’s A Post!"
pubDate: 2026-01-01
modifiedDate: 2026-01-03
modifiedComment: "This got updated"
summary:
author: Randy Fay
featureImage:
  src: /img/blog/2026/01/kebab-case.jpg
  srcDark:
  alt:
  caption:
  credit:
categories:
  - DevOps
---
```

- `author` must match the `name` of an author in `src/content/authors/`. Add one there for a new author.
- Write descriptive `alt` text for the feature image. `caption` and `credit` can use Markdown, wrapped in straight quotes (`"`).
- Choose categories from `allowedCategories` in `src/content.config.ts`. The first one shows on post cards: _Add-ons_, _Announcements_ (releases, organization news), _Community_ (events, third-party developments), _DevOps_ (workflows, infrastructure), _Performance_ (benchmarks, tips), _Guides_ (how-to posts), _Newsletters_, _TechNotes_ (code-level discussions), _Training_ (contributor training), _Videos_.
- Put images in `public/img/blog/YYYY/MM/`. The build converts PNG, JPEG, and GIF images to WebP, but the source files are committed as they are, so keep them under 2MB and no wider than about 2000px. [ImageOptim](https://imageoptim.com) applies lossless compression.

Blog comments use [giscus](https://github.com/ddev/giscus-comments).

### Pages

Add a `.astro` or `.mdx` file to `src/pages/`, and its name becomes the URL. Reuse the layout and components of an existing page. For generated pages, see `src/pages/blog/[page].astro`, `src/pages/blog/category/[slug].astro`, and `src/pages/blog/author/[id].astro`.

### Textlint

`.textlintrc` checks `src/content/**` for terminology and stop words, using textlint’s [default terminology](https://github.com/sapegin/textlint-rule-terminology/blob/master/terms.jsonc) with a few overrides, such as allowing “website”, “front end”, and “command line”.

### Sponsor Management

`src/featured-sponsors.json` lists the featured sponsors shown on the [home page](https://ddev.com/#supporters) and in the [light](https://ddev.com/resources/featured-sponsors.svg) and [dark](https://ddev.com/resources/featured-sponsors-darkmode.svg) badges generated for the [main DDEV README](https://github.com/ddev/ddev#sponsor-ddev). To add one, follow [.claude/skills/add-sponsor/SKILL.md](.claude/skills/add-sponsor/SKILL.md), or ask Claude Code to add the sponsor’s website.

## Redirects and Short Links

Add redirects to `public/_redirects`. They can point to pages on the site, the DDEV docs, or external resources.

- Most redirects should be `301`, a permanent redirect.
- Prefix short links with `/s`, for example `/s/port-conflict`.

## Build and Deployment

- GitHub Actions runs [the test workflow](.github/workflows/test.yml) on every push to `main` and every pull request.
- [Cloudflare Pages](https://pages.cloudflare.com) runs `npm run build` on every push to `main` and deploys `dist/`. It also builds a preview for each branch and comments the URL on its PR. Pull requests from forks get previews from GitHub Actions instead, see [FORK_PREVIEW_SETUP.md](.github/FORK_PREVIEW_SETUP.md).

### Secrets

The site [uses Octokit](src/lib/api.ts) for GitHub REST and GraphQL requests, which need a token to authenticate and to stay within quota. GitHub Actions supplies its own `GITHUB_TOKEN`. Anywhere else, including local development and [Cloudflare](https://dash.cloudflare.com/2aecb1c6b99f9d2274b12efc45152be2/pages/view/ddev-com-front-end/settings/environment-variables), set `GITHUB_TOKEN` to a classic personal access token with the scopes listed under [GitHub Token](#github-token).

## Resources

- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
