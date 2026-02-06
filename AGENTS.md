# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Communication Style

- Use direct, concise language without unnecessary adjectives or adverbs
- Avoid flowery or marketing-style language ("tremendous", "dramatically", "revolutionary", etc.)
- Don't use vague superlatives ("comprehensive", "complete", "full", "entire", "thorough", "detailed")
- Don't include flattery or excessive praise ("excellent!", "perfect!", "great job!")
- State facts and findings directly without embellishment
- Skip introductory phrases like "I'm excited to", "I'd be happy to", "Let me dive into"
- Avoid concluding with summary statements unless specifically requested
- When presenting options or analysis, lead with the core information, not commentary about it

## Project Overview

This is the source code for ddev.com, a static website built with Astro and hosted on Cloudflare Pages. The site features a blog, documentation, sponsor information, and project resources for DDEV, a local development environment tool.

## Development Commands

Use DDEV for all development tasks:

- `ddev start` - Start project with all dependencies
- `ddev npm run dev` - Start development server with hot reloading
- `ddev npm run build` - Build production site to `./dist/`
- `ddev npm run preview` - Preview built site locally
- `ddev npm run prettier` - Check code formatting
- `ddev npm run prettier:fix` - Auto-fix formatting issues
- `ddev npm run textlint` - Check content for writing issues
- `ddev npm run textlint:fix` - Auto-fix content issues

### Site Access

- Dev server: https://<projectname>.ddev.site:4321
- Built site: https://<projectname>.ddev.site

### Testing and Quality

Before committing changes, always run:

1. `ddev npm run prettier:fix` - Fix formatting
2. `ddev npm run textlint:fix` - Check content quality
3. `ddev start` - Ensure environment is working
4. Spellcheck and check links in any new content

### Commits

When making commits after major changes, use AI-assisted commit messages that include:

- Clear description of changes made
- End with: `🤖 Developed with assistance from [Claude Code](https://claude.ai/code)`
- Include: `Co-Authored-By: Claude <noreply@anthropic.com>`

Only commit when explicitly requested by the user.

## Working with Claude Code

### Branch Naming

Use descriptive branch names that include:

- Date in YYYYMMDD format
- Your GitHub username
- Brief description of the work

Format: `YYYYMMDD_<username>_<short_description>`

Examples:

- `20250919_rfay_update_quickstart`
- `20250919_username_fix_blog_styling`
- `20250919_contributor_add_sponsor`

### Whitespace and Formatting

- **Never add trailing whitespace** - Blank lines must be completely empty (no spaces or tabs)
- Match existing indentation style exactly (spaces vs tabs, indentation depth)
- Preserve the file's existing line ending style
- Run linting tools to catch whitespace issues before committing

## Architecture

### Technology Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)** - Typography plugin
- **[Heroicons](https://heroicons.com)** - Icon library
- **[Textlint](https://textlint.github.io)** - Content linting
- **[Giscus](https://giscus.app)** - GitHub-based commenting system

### Project Structure

```
├── cache/              # GitHub API response cache for local development
├── public/             # Static assets copied to dist/
│   ├── logos/          # Sponsor and technology logos (prefer SVG)
│   └── _redirects      # Cloudflare Pages redirects
├── src/
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content collections (blog, authors)
│   ├── layouts/        # Page layout wrapper
│   ├── lib/            # Utilities (GitHub API, search, read time)
│   ├── pages/          # Direct route mapping (.astro files)
│   └── styles/         # Global PostCSS styles
├── .env.example        # Environment variables template
├── astro.config.mjs    # Astro configuration
├── package.json        # Dependencies and scripts
└── tailwind.config.cjs # Tailwind configuration
```

### Content Management

The site uses Astro's Content Collections with strict schema validation:

- **Blog posts**: `src/content/blog/*.md` - Markdown with frontmatter, validated against categories and author schemas
- **Authors**: `src/content/authors/*.md` - Author profiles with name, firstName, and optional avatarUrl
- **Static pages**: `src/pages/*.astro` - Direct route mapping

### Content Schema

Blog posts require:

- Valid author (must exist in authors collection)
- Categories from predefined list: Announcements, Community, DevOps, Performance, Guides, Newsletters, TechNotes, Training, Videos
- pubDate as Date object
- Optional featureImage with alt text

For special markdown formatting features (callout boxes, code blocks, etc.), see [MARKDOWN_FORMATTING.md](MARKDOWN_FORMATTING.md).

### Content Linking

- **Internal blog links**: Use markdown filename references (e.g., `[link text](filename.md)`) for links between blog posts. Astro automatically resolves these to proper URLs.
- **Other internal links**: Use root-relative paths (e.g., `[Contact](/contact)`) for links to other site pages
- **External links**: Use full URLs for links outside the site

### GitHub Integration

The site fetches dynamic data from GitHub API:

- Requires `GITHUB_TOKEN` environment variable
- Uses local `cache/` directory to reduce API calls during development
- Token needs: `repo`, `read:org`, `read:user`, `read:project` scopes

### Sponsor Management

Featured sponsors are managed in `src/featured-sponsors.json` with specific schema for logos, URLs, and types. This data generates sponsor displays and SVG badges used in the main DDEV repository.

## Development Setup

### DDEV Setup (Recommended)

1. Run `ddev start` to start and set up the project's dependencies
2. Open https://<projectname>.ddev.site:4321 in your browser
3. To rebuild static site: `ddev npm run build`
4. Static site available at: https://<projectname>.ddev.site

### Setup Without DDEV

1. Run `nvm use` to use appropriate Node.js version
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Visit `http://localhost:4321/`

### GitHub Token Setup

For dynamic GitHub data (not required for blog posts):

1. Run `cp .env.example .env`
2. Create [classic GitHub access token](https://github.com/settings/tokens) with scopes: `repo`, `read:org`, `read:user`, `read:project`
3. Add token to `.env` as `GITHUB_TOKEN=your_token_here`

## Content Creation

### Blog Posts

Template for new blog posts in `src/content/blog/`:

```markdown
---
title: "Post Title"
pubDate: 2023-01-01
summary: Brief description
author: Author Name
featureImage:
  src: /img/blog/kebab-case.jpg
  alt: Descriptive alt text
  caption: Optional caption
  credit: Optional credit
categories:
  - Category Name
---

Post content here...
```

**Categories**: Announcements, Community, DevOps, Performance, Guides, Newsletters, TechNotes, Training, Videos

**Images**: Production-ready, <2MB, reasonable dimensions, optimized

### Authors

Add new authors to `src/content/authors/` with schema:

- name (must match blog post frontmatter)
- firstName
- avatarUrl (optional)

### Pages

Add `.astro` files to `src/pages/` where filename becomes URL slug.

## Quality Control

### Textlint

- Configuration in `.textlintrc`
- Runs against `src/content/**`
- Enforces consistent language and terminology
- Run `ddev npm run textlint` before committing

### Prettier

- Configuration in `.prettierrc`
- Auto-formats code
- Run `ddev npm run prettier:fix` before committing
- VS Code: Auto-format on save enabled

### Recommended VS Code Extensions

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)

## Build & Deployment

- GitHub Actions tests on every push to main
- Cloudflare Pages automatically builds and deploys from main branch
- Preview builds created for all PR branches
- Redirects managed via `public/_redirects` file

### Secrets

Production requires `GITHUB_TOKEN` environment variable in Cloudflare Pages settings.

## Important Notes

- Always preserve existing code style and component patterns
- Blog images should be production-ready: optimized, < 2MB, reasonable dimensions
- All content goes through textlint validation for consistency
- The site is configured for DDEV development with special CORS and host settings
- Use kebab-case for blog post filenames
- Prefer SVG logos in `public/logos/`
- Internal blog links use markdown filename references
- External links use full URLs

## Resources

- [Astro Documentation](https://docs.astro.build)
- [DDEV Documentation](https://docs.ddev.com/)
- [Contributing to ddev.com Training](https://ddev.com/blog/ddev-website-for-contributors/)
