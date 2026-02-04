# Markdown Formatting Guide

This guide covers special markdown formatting features available for blog posts and content on ddev.com.

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

## Code Blocks

Code blocks support syntax highlighting and include a copy button on hover:

````markdown
```bash
ddev start
ddev npm install
```
````

Supported languages include: bash, javascript, typescript, php, yaml, json, html, css, go, python, and more.

## Internal Links

**Between blog posts:**
Use the markdown filename (without path):

```markdown
[Read our quickstart guide](quickstart.md)
```

**To other site pages:**
Use root-relative paths:

```markdown
[Visit our support page](/support-ddev)
```

**External links:**
Use full URLs:

```markdown
[DDEV Documentation](https://ddev.readthedocs.io)
```

## Images

Images in blog posts should be production-ready:

- Appropriate format (JPEG, PNG, or SVG)
- Size no larger than ~1-2MB
- Dimensions no greater than 2000px
- Compressed with tools like [ImageOptim](https://imageoptim.com)

```markdown
![Descriptive alt text](/img/blog/my-image.jpg)
```

In frontmatter:

```yaml
featureImage:
  src: /img/blog/kebab-case.jpg
  alt: Descriptive text for screen readers
  caption: "Optional caption (can use **markdown**)"
  credit: "Optional image credit"
```

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

5. **Test in both light and dark mode**: All callouts support dark mode automatically, but verify your content looks good in both.

## Examples in the Wild

Check out these blog posts for callout usage examples:

- Any post in `src/content/blog/` that uses the `:::` directive syntax
- Posts using blockquote-style callouts with `> **Label**:` format

## Questions?

If you have questions about markdown formatting, ask in the [DDEV Discord](https://discord.gg/5wjP76mBJD) or check the [Astro markdown documentation](https://docs.astro.build/en/guides/markdown-content/).
