---
paths:
  - "src/content/**"
  - "src/pages/**/*.mdx"
  - "public/img/**"
---

# Blog posts, authors, and content pages

Callouts, code blocks, images, and other Markdown features are in
`MARKDOWN_FORMATTING.md`. Blog posts are Markdown, not MDX.

## Voice

A post is a developer telling other developers what works, with the commands
to show it. `navigating-ddev-projects-filesystem.md` is a good model. The
words banned in `AGENTS.md` apply here too.

- Open with the problem, the news, or the question behind the post, not with
  "In today's...", "Whether you're a ... or a ...", or a preview of the post.
- Be specific: versions, commands, real output, numbers. Run every command
  before putting it in a post, and cut a claim that has no command, link, or
  number behind it.
- Write prose. Use a list for steps or options, not for bold-labeled
  fragments such as "**Speed:** ...".
- Say what does not work, and the limits and workarounds.
- Address the reader as "you" and the DDEV maintainers as "we".
- Avoid the patterns that read as generated: "not just X, but Y", "It's not
  X, it's Y", three adjectives in a row, a rhetorical question to open a
  section, "Let's dive in", "In conclusion", "Happy coding!", and emoji in
  headings. Use an em dash only where a comma or a period will not do.
- End when the content ends. A docs link or a request for feedback is enough;
  do not recap.
- When editing someone else's post, keep their voice. Fix facts and wording,
  and do not rewrite it into yours.

Before finishing, reread the draft and cut every sentence that could appear
unchanged on another product's blog.

## Blog posts

`src/content/blog/<kebab-case-slug>.md`, validated by `src/content.config.ts`:

```markdown
---
title: "Post Title"
pubDate: 2026-01-01
modifiedDate: 2026-01-03 # optional, with modifiedComment
summary: Brief description
author: Author Name
featureImage:
  src: /img/blog/2026/01/kebab-case.jpg
  srcDark: # optional
  alt: Descriptive alt text
  caption: Optional caption, Markdown allowed in straight quotes
  credit: Optional credit
categories:
  - Guides
---
```

- `author` must match the `name` of a file in `src/content/authors/`. A new
  author needs one, with `name`, `firstName`, and an optional `avatarUrl`.
- `featureImage` also takes `shadow: true`, and `hide: true`, which keeps the
  image off the post page but still uses it for cards and social previews.
- `categories` must be from `allowedCategories` in `src/content.config.ts`:
  Add-ons, Announcements, Community, DevOps, Performance, Guides, Newsletters,
  TechNotes, Training, Videos. The first one shows on summary cards.

## Links

- Another blog post: its filename, `[text](other-post.md)`; Astro resolves it.
- Other site pages: root-relative, `[Contact](/contact)`.
- Outside the site: absolute URL.

The build fails on a broken internal link (astro-link-validator), and CI
checks external links in changed posts (`.linkspector.yml`).

## Images

Put new images in `public/img/blog/YYYY/MM/`. The build converts PNG, JPEG,
and GIF images to WebP, but the source files are committed as they are, so
add them ready to publish: JPEG for photos, PNG or SVG
otherwise, under 2MB, no wider than about 2000px. The fork preview build warns
on anything over 2MB; check before committing:

```bash
find public \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) -size +2048k
```

Alt text doubles as the visible caption. For terminal screenshots, hand-written
SVG illustrations, or logo-and-text feature images, use the `blog-images`
skill.

## Checks

Run `ddev textlint` (terminology and stop words, per `.textlintrc`, for
`src/content/**` only), and spell check new prose yourself.
