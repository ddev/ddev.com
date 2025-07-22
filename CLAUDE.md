# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Architecture

### Content Management

The site uses Astro's Content Collections with strict schema validation:

- **Blog posts**: `src/content/blog/*.md` - Markdown with frontmatter, validated against categories and author schemas
- **Authors**: `src/content/authors/*.md` - Author profiles with name, firstName, and optional avatarUrl
- **Static pages**: `src/pages/*.astro` - Direct route mapping

### Key Directories

- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layout wrapper
- `src/lib/` - Utilities for GitHub API, search indexing, reading time calculation
- `public/` - Static assets and redirects file
- `public/logos/` - Sponsor and technology logos (prefer SVG)

### Content Schema

Blog posts require:

- Valid author (must exist in authors collection)
- Categories from predefined list: Announcements, Community, DevOps, Performance, Guides, TechNotes, Training, Videos
- pubDate as Date object
- Optional featureImage with alt text

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

### Build & Deployment

- GitHub Actions tests on every push to main
- Cloudflare Pages automatically builds and deploys from main branch
- Preview builds created for all PR branches
- Redirects managed via `public/_redirects` file

## Important Notes

- Always preserve existing code style and component patterns
- Blog images should be production-ready: optimized, < 2MB, reasonable dimensions
- All content goes through textlint validation for consistency
- The site is configured for DDEV development with special CORS and host settings
