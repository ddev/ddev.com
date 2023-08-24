---
title: "DDEV Website for Contributors"
pubDate: 2023-08-15
modifiedDate: 2023-08-23
summary: Matt Stein on maintaining and improving ddev.com.
author: Matt Stein
featureImage:
  src: /img/blog/2023/08/cloudflare-deploying-pages.png
  alt: Deploying to ddev.com
categories:
  - Community
  - Guides
---

The following is based on [Matt Stein's presentation outline](https://doc.mattstein.com/s/-BQQaSLJd) for the August 15, 2023 DDEV contributor training. Recordings of all past sessions can be found in the blog post [DDEV Contributor Live Training](/blog/contributor-training). This post was prepared (Thanks!) by [Kristin Wiseman](https://github.com/kristin-wiseman).

## Welcome!

I’d like to show you how ddev.com is put together so you can swoop in and improve it. There’s a lot that could be improved; The emphasis is on “what it is” rather than “how it should be.”

## Background

### Old Things

[**Matt**](https://github.com/mattstein) is a designer that’s been doing CMS-based development for clients using PHP, Twig, and different front-end frameworks; master of none fond of writing, documentation, and content strategy.

[**ddev.com**](https://ddev.com) is a former WordPress site, tricky to share access and not the friendliest public welcome to all things DDEV.

### New Thing

Rebuilt + migrated earlier this year to [Astro](https://astro.build)!

- Hat tip Mayank for sharing Astro with me.
- Fun to build with!
- Static site generator that sits in a nice front-end sweet spot.
  - Flat file + fully accessible to front-end developers in a public repository.
  - Friendly to Markdown-writers.
  - Key feature: [Astro components](https://docs.astro.build/en/core-concepts/astro-components/)!
    - `.astro`, or BYO UI framework (Vue, React, Svelte, etc.).
    - Or no UI framework; only ship what’s necessary for the viewer.
    - [“island architecture”](https://docs.astro.build/en/concepts/islands/)
  - HTML and simple components.
  - Markdown content collections.
  - [Tailwind CSS](https://tailwindcss.com) + [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin).
  - Built and hosted with [Cloudflare Pages](https://pages.cloudflare.com).

**tl;dr** if you’re comfortable with Markdown, HTML, CSS, Tailwind, or a modern front-end framework, you can jump right in!

<small>Also TypeScript, kind of.</small>

If you’re comfortable with _all_ of those things, you could make a big dent in ddev.com.

## Local Setup

Clone <https://github.com/ddev/ddev.com-front-end>.

Add a GitHub key to `.env`.

## Where Content Lives

> 💡 Consider reading [the readme](https://github.com/ddev/ddev.com-front-end/blob/main/README.md) and especially the [Astro docs](https://docs.astro.build/en/getting-started/).

Markdown, component markup, TypeScript constants, and a JSON blob.

1. Astro components in the [`src/pages/`](https://github.com/ddev/ddev.com-front-end/tree/main/src/pages) directory.
   - Start with [404](https://github.com/ddev/ddev.com-front-end/blob/main/src/pages/404.astro) + [homepage](https://github.com/ddev/ddev.com-front-end/blob/main/src/pages/index.astro).
2. Content collections in [`src/content/`](https://github.com/ddev/ddev.com-front-end/tree/main/src/content).
3. Constants in [`src/const.ts`](https://github.com/ddev/ddev.com-front-end/blob/main/src/const.ts).
4. Custom sponsor blob in [`src/featured-sponsors.json`](https://github.com/ddev/ddev.com-front-end/blob/main/src/featured-sponsors.json).
   - See featured-sponsors.svg in the [ddev/ddev readme](https://github.com/ddev/ddev).

## How Content is Presented

The content attempts to follow Astro conventions, follow DRY principle, and be sparing with additional complexity.

1. [Astro config](https://github.com/ddev/ddev.com-front-end/blob/main/astro.config.mjs).
2. [PostCSS](https://github.com/ddev/ddev.com-front-end/blob/main/postcss.config.cjs) + [Tailwind](https://github.com/ddev/ddev.com-front-end/blob/main/tailwind.config.cjs) + [Tailwind Typography](https://github.com/ddev/ddev.com-front-end/blob/main/tailwind.config.cjs#L48)
3. [`src/lib/api.ts`](https://github.com/ddev/ddev.com-front-end/blob/main/src/lib/api.ts).
   - Bonus: the `cache/` directory.
4. Development server vs. building.
   - Cloudflare pages builds _static_ output (no SSR).
   - Run locally for previewing and instant feedback, but production and preview branches are built automatically (similar to Netlify and Vercel).

![Automatic PR comment with Cloudflare Pages build status and link](/img/blog/2023/08/cloudflare-deploying-pages.png)

## Submitting Changes

Typo corrections can be done directly from the GitHub UI similarly to [fixing the docs](https://ddev.readthedocs.io/en/stable/developers/testing-docs/#fix-docs-using-web-browser).

Otherwise, use a pull request like you would with DDEV or any other project. (Fork, change, submit pull request.)

## Extra Topics Covered in the Training

- Astro plugins we’re using.
- [Textlint](https://github.com/ddev/ddev.com-front-end/blob/main/.textlintrc).


Credit to [Kristin](https://www.drupal.org/u/kwiseman) and [Bernardo](https://www.drupal.org/u/bernardm28) for adapting the original outline for the DDEV blog.
