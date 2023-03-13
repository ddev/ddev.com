# ddev.com Front End

Source code for [ddev.com](https://ddev.com)’s statically-generated front end, built with [Astro](https://astro.build) to keep things organized, maintainable, and fast.

## Overview

### Main Ingredients

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) plugin
- [Heroicons](https://heroicons.com)
- [Textlint](https://textlint.github.io)

### Project Structure

The file structure follows a typical Astro [project layout](https://docs.astro.build/en/core-concepts/project-structure/).

Most pages are built with [Astro components](https://docs.astro.build/en/core-concepts/astro-components/), while blog posts and authors are sourced from local Markdown that’s validated with tidy schemas we get using [content collections](https://docs.astro.build/en/guides/content-collections/).

- **`cache/`** – custom, project-specific folder for caching GitHub responses in local developent in order to reduce API calls.
- **`public/`** – images and Cloudflare Pages redirect file that will be copied verbatim into the generated `dist/` directory.
- **`src/`** – components, layouts, styles, and supporting TypeScript/JavaScript.
  - **`components/`** – indiviaul `.astro` components used in pages. (You can also use [components for UI frameworks](https://docs.astro.build/en/core-concepts/framework-components/) like Vue, React, and Svelte!)
  - **`content/`** – configuration and Markdown for the blog’s [content collections](https://docs.astro.build/en/guides/content-collections/).
  - **`layouts/`** – contains the single component we use for every page.
  - **`lib/`** – TypeScript and JavaScript for supporting content: fetching data from GitHub, building the search index, injecting read time into frontmatter, and handling common formatting.
  - **`pages/`** – `.astro` pages whose filenames directly translate into routes for the site.
  - **`styles/`** – global PostCSS that’s not already handled by the [Tailwind plugin](https://docs.astro.build/en/guides/integrations-guide/tailwind/).
- **`.env.example`** – file you’ll want to rename `.env` and populate for a new environment.
- **`.nvmrc`** – Node.js version to support `nvm use`.
- **`.prettierrc`** – rules for [Prettier](https://prettier.io) code formatting.
- **`astro.config.mjs`** – Astro configuration.
- **`package.json`** – standard file that details the project’s packages and versions.
- **`README.md`** – you are here! 👋
- **`tailwind.config.cjs` – [configuration for Tailwind](https://tailwindcss.com/docs/configuration) and the Tailwind Typography plugin we’re using.
- **`tsconfig.json` – [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## Development

### Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |
| `npm run textlint`     | Run textlint on content collections                |
| `npm run textlint:fix` | Apply fixable updates to resolve texlint errors    |

### Local Development Setup

Check out the project in your favorite Node.js environment, ideally running [`nvm`](https://github.com/nvm-sh/nvm). We’ll install dependencies, add a GitHub API key, and run a local dev server with a hot-reloading browser URL.

1. Run `nvm use` to make sure you’re running an appropriate Node.js version.
2. Run `npm install` to set up the project’s dependencies.
3. Run `cp .env.example .env` to create a `.env` file for environment variables.  
  (Don’t check this in!)
4. Create a [classic GitHub access token](https://github.com/settings/tokens) with the following scopes: `repo`, `read:org`, `read:user`, and `read:project`.
5. Add the GitHub token to `.env`’s `GITHUB_TOKEN=` value.
6. Run `npm run dev` to run Astro’s dev server.
7. Visit the URL in your console. (Probably `http://127.0.0.1:3000/`.) The site will automatically refresh as you work on it, displaying errors in the relevant console (terminal or browser console.)

To generate a static copy of the site, run `npm run build`. The contents of the `dist/` folder are exactly what get [deployed to Cloudflare Pages](#build--deployment).

## Managing Content

The site’s content lives in either `.astro` components that resemble souped-up HTML, or Markdown files organized into schema-validated [content collections](https://docs.astro.build/en/guides/content-collections/).

### Blog Posts

Blog posts are Markdown files with frontmatter that live in `src/content/blog/`.

To add a new blog post, use this Markdown as a template:

```markdown
---
title: "It’s A Post!"
pubDate: 2023-01-01
summary:
author: Randy Fay
featureImage:
  src: /img/blog/kebab-case.jpg
  alt:
  caption:
  credit:
categories:
  - DevOps
---
```

Name your file with a kebab-case, URL-and-SEO-friendly slug with a `.md` extension, and drop it in the `src/content/blog/` directory.

Give it a succinct title, and if you include a feature image be sure to write descriptive alt text along with an optional caption and image credit. The `caption:` and `credit:` fields can both use Markdown, but you’ll probably need to wrap the whole value in straight quotes (`"`).

Choose whichever categories apply, with special attention to the first because it’ll be displayed on post summary cards:

- _Announcements_ (releases, organization news, etc.)
- _Community_ (events, third-party developments, etc.)
- _DevOps_ (workflows, infrastructure, etc.)
- _Performance_ (benchmarking, tips, etc.)
- _Guides_ (how-to style posts)
- _Videos_ (posts that include or primarily feature video content)

> 💡 **If you’re publishing work from a new author**, add an entry for them in `src/content/authors/`! The `"name"` value needs to match the one you’re using in your post frontmatter.

### Pages

Add a `.astro` file to the `pages/` directory, where its name will become the page slug. Use an existing page to grab and re-use whatever layout and components you can to save yourself time and encourage consistency with the rest of the site.

If you need to dynamically add multiple pages, see files with brackets like `src/blog/[page].astro`, `src/blog/category/[slug].astro`, and `src/blog/author/[slug].astro` for examples.

### Textlint

A basic textlint configuration lives in `.textlintrc` and runs against `src/content/**` to try and help keep language consistent and accurate. This doesn’t yet conform to the DDEV docs [spellcheck rules](https://github.com/ddev/ddev/blob/master/.spellcheck.yml) and [massive exclusion list](https://github.com/ddev/ddev/blob/master/.spellcheckwordlist.txt), but ideally the two can someday converge.

Textlint’s [default terminology](https://github.com/sapegin/textlint-rule-terminology/blob/master/terms.jsonc) catches a lot of accepted best practices on its own, where the only major override is to allow “website” (instead of its suggested “site”) because it’s rampant in blog posts and documentation. Same with the “front end” and “back end” conundrum and two-word “command line”.

Run `npm run textlint` to check everything, and you can apply “fixable” changes using `npm run textlint:fix`. Be careful automating fixes to be sure they don’t have any unintended side effects!

## Build & Deployment

For the site to exist at `ddev.com`, it needs to be built and hosted somewhere. Cloudflare Pages responds to commits in order to build and deploy the site.

On every push to the `main` branch, the following happens:

- GitHub Actions tests the site using [this workflow](https://github.com/ddev/ddev.com-front-end/blob/main/.github/workflows/test.yml).
- [Cloudflare Pages](https://pages.cloudflare.com) runs `npm run build`, and deploys the resulting output from `dist/`.
  - Cloudflare Pages is also configured to build previews for branches on this repository. It will automatically add a comment with the build status and eventual URL(s) to any PR.

### Secrets

The site [uses Octokit to make REST and GraphQL API requests](https://github.com/ddev/ddev.com-front-end/blob/main/src/lib/api.ts) for repository and contribution details from github.com. It needs an API token to authenticate these requests to function and avoid hitting quota limits.

GitHub supplies its own private `GITHUB_TOKEN` in the GitHub Actions build environment. In any other environment, including local development, you’ll need to populate a `GITHUB_TOKEN` environment variable with a **classic** GitHub personal access token that has `repo`, `read:org`, `read:user`, and `read:project` scopes.

## Resources

- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
