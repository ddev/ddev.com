# ddev.com Front End

This repository’s source code is for [ddev.com](https://ddev.com)’s statically-generated front end. It’s built with [Astro](https://astro.build), a modern static site generator with all the development fancy you’d hope for but that only ships what’s necessary for the visitor. It helps us keep things organized, maintainable, and fast for visitors.

Most pages are built using plain old Astro components, while blog posts are sourced from local Markdown.

## Setup

The project includes an `.nvmrc` file, so if you have `nvm` installed you can run `nvm use` to make sure you’re running an appropriate Node.js version.

After that, run `npm install` to set up the project’s dependencies. Then you can run any of the [commands](#commands) below.

> 💡 There’s also a `.prettierrc` file in the project that’ll save you formatting time and keep things consistent if you’re using Prettier in your editor or IDE.

Run `npm run dev` or `npm run build` and see if it works or falls over.

## Ingredients

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) plugin
- [Heroicons](https://heroicons.com)
- [Textlint](https://textlint.github.io)

## Project Structure

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There’s nothing special about `src/components/`, but that’s where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

You’ll also see a `lib/` directory with common methods for fetching and formatting content.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## Textlint

A basic textlint configuration lives in `.textlintrc` and runs against `src/pages/**` to try and help keep language consistent and accurate. This doesn’t yet conform to the DDEV docs [spellcheck rules](https://github.com/drud/ddev/blob/master/.spellcheck.yml) and [massive exclusion list](https://github.com/drud/ddev/blob/master/.spellcheckwordlist.txt), but ideally the two can someday converge.

Textlint’s [default terminology](https://github.com/sapegin/textlint-rule-terminology/blob/master/terms.jsonc) catches a lot of accepted best practices on its own, where the only major override is to allow “website” (instead of its suggested “site”) because it’s rampant in blog posts and documentation. Same with the “front end” and “back end” conundrum and two-word “command line”.

Run `npm run textlint` to check everything, and you can apply “fixable” changes using `npm run textlint:fix`. Be careful automating fixes to be sure they don’t have any unintended side effects!

## Adding New Content

### Blog Posts

Use this Markdown as a template:

```markdown
---
title: "It’s A Post!"
pubDate: 2023-01-01
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

Name your file with a kebab-case, URL-and-SEO-friendly slug with a `.md` extension, and drop it in the `src/pages/blog/` directory.

Give it a succinct title, and if you include a feature image be sure to write descriptive alt text along with an optional caption and image credit. The `caption:` and `credit:` fields can both use Markdown, but you’ll probably need to wrap the whole value in straight quotes (`"`).

Choose whichever categories apply, with special attention to the first because it’ll be displayed on post summary cards:

- _Announcements_ (releases, organization news, etc.)
- _Community_ (events, third-party developments, etc.)
- _DevOps_ (workflows, infrastructure, etc.)
- _Performance_ (benchmarking, tips, etc.)
- _Guides_ (how-to style posts)

> 💡 **If you’re publishing work from a new author**, add an entry for them in `src/authors.json`! The `"name"` value needs to match the one you’re using in your post frontmatter.

### Pages

Add a `.astro` file to the `pages/` directory, where its name will become the page slug. Use an existing page to grab and re-use whatever layout and components you can to save yourself time and encourage consistency with the rest of the site.

If you need to dynamically add multiple pages, see files with brackets like `src/blog/[page].astro`, `src/blog/category/[slug].astro`, and `src/blog/author/[slug].astro` for examples.

## Resources

- [Astros documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
