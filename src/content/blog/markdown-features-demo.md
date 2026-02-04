---
title: "Markdown Features Demo: Testing All Formatting Options"
pubDate: 2022-01-01
summary: "Comprehensive demonstration of all markdown formatting features available on ddev.com, including callout boxes, code blocks, links, images, and typography. Not for publication."
author: Randy Fay
categories:
  - TechNotes
---

This demonstration post showcases all the markdown formatting features available for blog posts on ddev.com. It's designed for testing the rendering of various markdown elements.

## Callout Boxes

### Note/Info Callout

:::note[Did you know?]
DDEV uses Docker containers to provide isolated development environments. This allows you to run multiple projects with different PHP versions, database engines, and configurations without conflicts.
:::

You can also use `:::info[]` for the same blue-themed styling:

:::info[Quick Reference]
Use `ddev describe` to see all your project's URLs, database credentials, and other configuration details in one place.
:::

### Tip Callout

:::tip[Pro Tip]
Use `ddev describe` to see all your project's URLs and credentials.
:::

Here's a tip without a custom title:

:::tip
Run `ddev logs` to troubleshoot issues with your project. Add `-f` to follow logs in real-time, or `-s db` to see database logs specifically.
:::

### Warning Callout

:::warning[Important]
Make sure to commit your work before running destructive commands.
:::

Another warning example:

:::warning
This command will delete your database. Make a backup first with `ddev snapshot` or `ddev export-db > backup.sql.gz`!
:::

### Danger Callout

:::danger[Breaking Change]
Version 2.0 removes support for the legacy configuration format. You'll need to migrate your `.ddev/config.yaml` file.
:::

Critical warning example:

:::danger
Running this script in production will cause downtime. Always test destructive operations in a development environment first.
:::

## Callout with Multiple Paragraphs and Formatting

:::note[Complex Content Example]
This callout demonstrates that you can include multiple paragraphs and various formatting options within a single callout box.

You can use **bold text** to emphasize important points, _italics_ for subtle emphasis, and `inline code` for commands or configuration values.

You can also include [links to other resources](https://docs.ddev.com) and even lists:

- First item with important information
- Second item with related details
- Third item with additional context
:::

## Standard Markdown Blockquotes

For simpler callouts that don't need full styling, you can use standard markdown blockquotes:

> **Note**: This is a simple note using blockquote syntax.

> **Tip**: Use `ddev ssh` to open a shell inside your web container.

> **Update**: DDEV v1.25.0 includes support for Docker Compose v2 by default.

## Code Blocks

### Bash Commands

```bash
ddev start
ddev composer install
ddev npm install
```

### Multi-line Bash with Comments

```bash
# Start your DDEV project
ddev start

# Import a database
ddev import-db --file=backup.sql.gz

# Run Composer commands
ddev composer require drupal/admin_toolbar
```

### PHP Code

```php
<?php

namespace Drupal\my_module\Controller;

use Drupal\Core\Controller\ControllerBase;

class MyController extends ControllerBase {
  public function content() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Hello DDEV!'),
    ];
  }
}
```

### JavaScript

```javascript
const config = {
  host: 'localhost',
  port: 3000,
  environment: 'development'
};

function initializeApp() {
  console.log('Starting DDEV-powered app...');
  return config;
}
```

### YAML Configuration

```yaml
name: my-project
type: php
docroot: web
php_version: "8.3"
database:
  type: mysql
  version: "8.0"
nodejs_version: "20"
```

### JSON

```json
{
  "name": "my-ddev-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "ddev npm run dev",
    "build": "ddev npm run build"
  }
}
```

## Internal Links

### Links Between Blog Posts

Here's a link to another blog post using filename reference: [Learn about DDEV performance](docker-performance-2023.md)

### Links to Other Site Pages

Here's a root-relative link: [Visit our support page](/support-ddev)

### External Links

Here's an external link: [DDEV Documentation](https://docs.ddev.com)

You can also use reference-style links for cleaner markdown:

Check out the [Docker documentation][docker-docs] and the [Astro guide][astro-guide] for more information.

[docker-docs]: https://docs.docker.com
[astro-guide]: https://docs.astro.build

## Lists

### Unordered Lists

- First item
- Second item with **bold text**
- Third item with `inline code`
  - Nested item one
  - Nested item two
    - Deeply nested item

### Ordered Lists

1. Start your DDEV project
2. Configure your application
3. Import your database
4. Test your site
   1. Check the homepage
   2. Test user login
   3. Verify email functionality

### Task Lists

- [x] Install DDEV
- [x] Create new project
- [ ] Configure add-ons
- [ ] Deploy to production

## Typography Examples

### Emphasis

This text has *italic emphasis* and this has _italic emphasis too_.

This text has **bold emphasis** and this has __bold emphasis too__.

You can combine ***bold and italic*** or ___bold and italic___.

### Inline Code

Use `ddev start` to start your project, `ddev stop` to stop it, and `ddev restart` to restart.

### Strikethrough

~~This feature is deprecated~~ Use the new feature instead.

### Horizontal Rules

You can use horizontal rules to separate sections:

---

Content after the horizontal rule.

## Tables

| Command | Description | Example |
|---------|-------------|---------|
| `ddev start` | Start project containers | `ddev start` |
| `ddev stop` | Stop project containers | `ddev stop` |
| `ddev restart` | Restart project containers | `ddev restart` |
| `ddev ssh` | SSH into web container | `ddev ssh` |

Alignment in tables:

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Item 1 | Item 2 | Item 3 |
| A | B | C |

## Nested Content Examples

### Callout with Code Block

:::tip[Running Commands Inside Containers]
You can execute commands inside your DDEV containers using `ddev exec`:

```bash
# Run PHP commands
ddev exec php -v

# Run Composer
ddev exec composer require vendor/package

# Or use the shorthand
ddev composer require vendor/package
```

This is especially useful for debugging or running one-off commands.
:::

### List with Callouts

Here's a workflow with embedded callouts:

1. **Start your project**

   ```bash
   ddev start
   ```

2. **Configure your database**

   :::warning
   Make sure to snapshot your database before making changes: `ddev snapshot`
   :::

3. **Import your content**

   ```bash
   ddev import-db --file=backup.sql.gz
   ```

4. **Verify everything works**

   :::tip
   Use `ddev launch` to open your site in a browser automatically.
   :::

## Images

Here's how you reference images in markdown:

![DDEV Logo](/logos/ddev-logo.svg)

Images with alt text are important for accessibility:

![Screenshot showing DDEV running in terminal with successful start message](/img/blog/2022/example-terminal.jpg)

## Video Embeds

Videos should be wrapped in a `.video-container` div for responsive sizing:

<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

## Complex Combinations

:::danger[Production Deployment Checklist]
Before deploying to production, verify:

1. **Environment Configuration**
   ```bash
   # Check environment variables
   ddev exec printenv
   ```

2. **Database Backup**
   :::warning
   Always create a backup before deployment!
   :::

3. **Run Tests**
   ```bash
   ddev exec phpunit
   ddev exec npm test
   ```

4. **Build Assets**
   - Compile CSS and JavaScript
   - Optimize images
   - Clear caches

For more information, see the [deployment guide](https://docs.ddev.com/en/stable/users/topics/deploy/) or ask in [DDEV Discord](/s/discord).
:::

## Conclusion

This demo post covers all the major markdown features available for blog posts on ddev.com. Each section demonstrates different formatting capabilities that can be used when writing actual blog content.

Remember to check the [MARKDOWN_FORMATTING.md](https://github.com/ddev/ddev.com/blob/main/MARKDOWN_FORMATTING.md) guide for the latest syntax and examples.
