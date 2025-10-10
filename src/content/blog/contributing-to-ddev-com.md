---
title: "Contributor Training: Contributing to ddev.com"
pubDate: 2025-10-10
summary: Learn how to contribute to ddev.com by fixing errors and writing blog posts.
author: Randy Fay
featureImage:
  src: /img/blog/2025/10/contributing-to-ddev-com.png
  alt: Contributing to ddev.com - community collaboration banner
categories:
  - Training
  - Guides
---

Here's our October 9, 2025 [Contributor Training](/blog/category/training) on contributing to ddev.com:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/A-rsZ7SG_bg?si=G1BMxy1-2C1eL012" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Key Topics

### Quick Edits via GitHub ([4:11](https://www.youtube.com/watch?v=A-rsZ7SG_bg&t=251s))

The easiest way to fix errors or update content is to click the pencil icon on any blog post. This takes you directly to GitHub where you can make edits and create a pull request—all without checking out the repository locally.

### Writing Blog Posts ([12:53](https://www.youtube.com/watch?v=A-rsZ7SG_bg&t=773s))

Community blog posts are encouraged! Share your expertise, workarounds, and solutions. Start by opening an issue to discuss your blog post idea with the community. Then copy a similar blog post from `src/content/blog` and adapt it with your content.

### Author Profiles ([18:00](https://www.youtube.com/watch?v=A-rsZ7SG_bg&t=1080s))

Add your author profile to `src/content/authors/` with your name, first name, and optional avatar URL. The avatar can be from Gravatar, the image directory, or your own site.

### Local Preview ([26:46](https://www.youtube.com/watch?v=A-rsZ7SG_bg&t=1606s))

Run `ddev start` to preview your changes locally with hot module reloading at the URL shown in the startup output.

### Quality Checks ([35:15](https://www.youtube.com/watch?v=A-rsZ7SG_bg&t=2115s))

Every pull request automatically runs:
- **Prettier** for code formatting
- **Textlint** for content consistency and terminology

The linting rules are defined in `.textlintrc` and enforce consistent usage of terms like "ARM64", "Bash", and "phpMyAdmin".

### Preview Deployments ([32:15](https://www.youtube.com/watch?v=A-rsZ7SG_bg&t=1935s))

Each pull request automatically creates a preview deployment on Cloudflare Pages, allowing you and reviewers to see exactly how the changes will look on the live site.

## Resources

- [Presentation Slides](https://rfay.github.io/contributing-to-ddev.com/)
- [ddev.com Repository](https://github.com/ddev/ddev.com)
- [DDEV Website For Contributors](ddev-website-for-contributors.md) blog post

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/).

Claude Code did almost all of the collation of the information in this blog from the YouTube video and the [presentation materials](https://rfay.github.io/contributing-to-ddev.com).
