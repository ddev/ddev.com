# Markdown Formatting Guide

This guide covers special markdown formatting features available for blog posts and content on ddev.com.

## Features Overview

The site supports:

- **Callout Boxes** - Styled note, tip, warning, and danger boxes with custom titles
- **GitHub Flavored Markdown** - Tables, task lists, strikethrough, automatic URL linking
- **Code Blocks** - Syntax highlighting with copy buttons (via Shiki)
- **Automatic Table of Contents** - Generated from headings
- **Smart External Links** - Auto-added security attributes for external URLs
- **Figure Captions** - Images automatically wrapped in `<figure>` with captions from alt text
- **Accessible Emojis** - Screen reader labels added automatically
- **Internal Link Resolution** - Simple filename references between blog posts
- **Standard Markdown** - Full CommonMark support plus extras

## Callout Boxes

Callout boxes are styled containers that highlight important information. They use the directive syntax with three colons (`:::`).

### Available Types

#### Note / Info

Blue-themed callout for general information.

```markdown
:::note[Custom Title]
Your informational content here.
:::
```

Or use `:::info[]` for the same styling.

**Example:**

:::note[Did you know?]
DDEV uses Docker containers to provide isolated development environments.
:::

#### Tip

Green-themed callout for helpful suggestions.

```markdown
:::tip[Pro Tip]
Use `ddev describe` to see all your project's URLs and credentials.
:::
```

**Example:**

:::tip
Run `ddev logs` to troubleshoot issues with your project.
:::

#### Warning

Yellow-themed callout for cautions or things to watch out for.

```markdown
:::warning[Important]
Make sure to commit your work before running destructive commands.
:::
```

**Example:**

:::warning
This command will delete your database. Make a backup first!
:::

#### Danger

Red-themed callout for critical warnings or breaking changes.

```markdown
:::danger[Breaking Change]
Version 2.0 removes support for the legacy configuration format.
:::
```

**Example:**

:::danger
Running this script in production will cause downtime.
:::

### Syntax Details

**With custom title:**

```markdown
:::type[Your Custom Title]
Content goes here.
:::
```

**Without custom title (uses default):**

```markdown
:::tip
Content goes here with the default "Tip" title.
:::
```

**Multiple paragraphs:**

```markdown
:::note[Multiple Paragraphs]
First paragraph with some important information.

Second paragraph with additional details.

You can include **bold text**, _italics_, `code`, and [links](https://ddev.com).
:::
```

### Styling

Each callout type includes:

- Colored left border (4px)
- Background tint matching the type
- Emoji icon (💡 for tips, ⚠️ for warnings, etc.)
- Appropriate text colors
- Dark mode support
- Shadow for depth

## Standard Markdown Blockquotes

For simpler callouts, you can use standard markdown blockquotes with bold labels:

```markdown
> **Note**: Your content here.

> **Tip**: Helpful information.

> **Update**: Recent changes.
```

This approach works well for quick notes that don't need the full styled callout treatment.

## GitHub Flavored Markdown

The site supports GitHub Flavored Markdown (GFM) which adds several useful features:

### Automatic URL Linking

URLs and email addresses automatically become clickable links:

```markdown
https://ddev.com
https://docs.ddev.com
user@example.com
```

### Strikethrough

Strike through text using double tildes:

```markdown
~~This feature is deprecated~~ Use the new feature instead.
```

**Example:**

~~DDEV v1.0 required manual configuration~~ DDEV now auto-detects project types.

### Tables

Create tables using pipes and hyphens (already documented below in the standard markdown section).

### Task Lists

Create interactive checkboxes:

```markdown
<!-- textlint-disable no-todo -->

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
<!-- textlint-enable no-todo -->
```

**Note:** Task lists with `- [ ]` trigger the `no-todo` textlint rule. Wrap them in textlint disable comments as shown above.

**Example:**

- [x] Install DDEV
- [x] Create project
- [ ] Configure add-ons
- [ ] Deploy

## Table of Contents

Automatically generate a table of contents from your headings by adding a heading called "Table of Contents":

```markdown
## Table of Contents

<!-- The TOC will be automatically inserted here -->

## First Section

## Second Section
```

The plugin searches for a heading (case-insensitive) containing "table of contents" and inserts a linked list of all other headings in the document.

## Emojis

Emojis are automatically enhanced with accessible labels for screen readers:

```markdown
🚀 DDEV is fast
✅ Tests passing
⚠️ Warning
💡 Helpful tip
```

You can use emojis naturally in your markdown, and they'll automatically include proper ARIA labels for accessibility.

## Code Blocks

Code blocks support syntax highlighting and include a copy button on hover:

````markdown
```bash
ddev start
ddev npm install
```
````

Supported languages include: bash, javascript, typescript, php, yaml, json, html, css, go, python, and more.

## Links

### Internal Links Between Blog Posts

Use the markdown filename (without path):

```markdown
[Read our quickstart guide](quickstart.md)
```

### Internal Links to Other Site Pages

Use root-relative paths:

```markdown
[Visit our support page](/support-ddev)
```

### External Links

Use full URLs:

```markdown
[DDEV Documentation](https://docs.ddev.com)
```

**Automatic Security Enhancement:**

All external links (links to domains other than ddev.com) automatically receive:

- `target="_blank"` - Opens in a new tab
- `rel="noopener noreferrer"` - Security attributes to prevent potential exploits

You don't need to add these attributes manually. Internal links (to ddev.com pages) are not affected.

## Images

### Basic Image Syntax

Images are automatically wrapped in semantic HTML `<figure>` elements with captions:

```markdown
![Descriptive alt text](/img/blog/my-image.jpg)
```

This automatically generates:

```html
<figure>
  <img
    src="/img/blog/2022/03/macos-m1-vs.-drupal-drush-install-seconds.png"
    alt="Descriptive alt text"
  />
  <figcaption>Descriptive alt text</figcaption>
</figure>
```

The alt text serves dual purposes:

1. Accessibility for screen readers
2. Visual caption below the image

### Feature Images in Frontmatter

For hero images at the top of posts:

```yaml
featureImage:
  src: /img/blog/2022/03/macos-m1-vs.-drupal-drush-install-seconds.png
  alt: Descriptive text for screen readers
  caption: "Optional caption (can use **markdown**)"
  credit: "Optional image credit"
```

### Image Best Practices

Images in blog posts should be production-ready:

- Appropriate format (JPEG, PNG, or SVG)
- Size no larger than ~1-2MB
- Dimensions no greater than 2000px
- Compressed with tools like [ImageOptim](https://imageoptim.com)
- **Always include descriptive alt text** (it becomes the caption)

## Video Embeds

Wrap video embeds in a `.video-container` div for responsive sizing:

```html
<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

## Post Updates

To mark a post as updated, use frontmatter fields:

```yaml
modifiedDate: 2026-01-15
modifiedComment: "Updated for DDEV v1.25.0"
```

This displays a styled "Updated" notice at the top of the post.

## Typography

The site uses Tailwind Typography for consistent, beautiful text rendering:

- Headings automatically include anchor links
- Links are underlined and styled
- Lists, tables, and quotes are consistently styled
- Dark mode is fully supported

## Best Practices

1. **Choose the right callout type**: Use `note` for general info, `tip` for helpful suggestions, `warning` for cautions, and `danger` for critical issues.

2. **Keep titles concise**: Callout titles should be short and descriptive (1-5 words).

3. **Use markdown inside callouts**: You can use bold, italics, code, and links inside callout boxes.

4. **Consider blockquotes for simple notes**: If you just need a quick note without full styling, use a blockquote with a bold label.

5. **Write descriptive alt text for images**: Alt text serves as both accessibility text and the visible caption below images.

6. **Let external links auto-enhance**: Don't manually add `target="_blank"` or `rel` attributes to external links - they're added automatically.

7. **Use emojis naturally**: Accessibility labels are added automatically, but don't overuse them.

8. **Add table of contents for long posts**: If your post has many sections, include a "## Table of Contents" heading.

9. **Test in both light and dark mode**: All styling supports dark mode automatically, but verify your content looks good in both.

## Examples in the Wild

Check out these resources for markdown formatting examples:

- **Comprehensive Demo Post** - A complete demonstration of all available formatting features (hidden from blog listings)
  - [Rendered version](/blog/markdown-features-demo) - See how the features look on the site
  - [Source code](https://github.com/ddev/ddev.com/blob/main/src/content/blog/markdown-features-demo.md) - View the raw markdown
- Any post in `src/content/blog/` that uses the `:::` directive syntax
- Posts using blockquote-style callouts with `> **Label**:` format

## Questions?

If you have questions about markdown formatting, ask in the [DDEV Discord](/s/discord) or check the [Astro markdown documentation](https://docs.astro.build/en/guides/markdown-content/).
