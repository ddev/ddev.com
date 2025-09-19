# Fork Preview Setup Guide

This guide explains how to configure the automated preview generation for forked PRs using Cloudflare Pages.

## Overview

The workflow in `.github/workflows/cloudflare-preview-forks.yml` implements a secure two-stage process:

1. **Build Stage**: Safely builds the site from fork code without exposing secrets
2. **Deploy Stage**: Uses Cloudflare API to deploy the built site with secure credentials

## Required Setup

### 1. Cloudflare Pages Project

The workflow uses a dedicated `ddev-com-fork-previews` Cloudflare Pages project for security isolation from the main site.

**No additional project setup needed** - the project is already configured and the workflow will create stable preview deployments using Cloudflare's Direct Upload API.

### 2. Cloudflare API Token

Create an API token with Pages permissions:

1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Set permissions:
   - `Zone:Zone:Read`
   - `Zone:Page Rules:Edit`
   - `Account:Cloudflare Pages:Edit`
5. Set account and zone resources as needed
6. Save the token

### 3. Repository Secrets and Variables

Add these in GitHub repository settings → Secrets and variables → Actions:

**Repository Secrets:**

- `TESTS_SERVICE_ACCOUNT_TOKEN`: 1Password service account token (if not already configured)
- Note: `CF_API_TOKEN` is loaded from 1Password `test-secrets` vault, not directly as a repository secret

**Repository Variables:**

- `CF_ACCOUNT_ID`: Your Cloudflare Account ID (found in dashboard sidebar)
- `CF_PAGES_PROJECT`: Set to `ddev-com-fork-previews` (dedicated fork preview project)

### 4. Repository Variables (Optional)

For custom build configurations, set these in GitHub repository settings → Secrets and variables → Actions → Variables:

- `PAGES_BUILD_CMD`: Custom build command (e.g., `npm ci && npm run build`)
- `PAGES_OUTPUT_DIR`: Build output directory (e.g., `dist`, `public`, `build`)
- `PAGES_WORKING_DIR`: Project subdirectory if not root (e.g., `site`, `docs`)

### 5. Enable Workflow

The workflow is triggered automatically for:

- Forked repository PRs only
- Events: `opened`, `synchronize`, `reopened`, `ready_for_review`, `closed`

## Security Features

### Two-Stage Architecture

- **Stage 1 (Build)**: Runs fork code without any secrets
- **Stage 2 (Deploy)**: Uses secrets only after build artifact is created

### Content Validation

- Checks for executable files in content directories
- Validates blog post frontmatter structure
- Detects potentially unsafe content patterns
- Warns about oversized images (>2MB)
- Runs textlint and prettier if available

### Access Controls

- Only processes PRs from forked repositories
- Uses `pull_request_target` with explicit fork checkout
- Separates untrusted code execution from credential access

## Workflow Behavior

### Build Process

1. Detects build system (npm/yarn/pnpm/hugo/custom)
2. Runs content validation and security checks
3. Installs dependencies and runs linting
4. Builds the site
5. Packages output as artifact

### Deployment Process

1. Downloads build artifact from Stage 1
2. Deploys to Cloudflare Pages using API
3. Creates stable preview URL: `https://{hash}.ddev-com-fork-previews.pages.dev`
4. Comments preview URL on the PR
5. Updates comment on subsequent pushes

### PR Lifecycle

- **Opened/Updated**: Creates or updates preview
- **Closed**: Adds closure note (preview remains accessible)
- **Draft**: Still builds and deploys (no special handling)

## Troubleshooting

### Build Failures

- Check build logs in GitHub Actions
- Ensure dependencies install correctly
- Verify build command produces output directory

### Missing Secrets

- Workflow will fail with clear error messages
- Verify all three secrets are set correctly
- Check Cloudflare API token permissions

### Content Validation Errors

- Review security check output
- Fix frontmatter issues in blog posts
- Address linting warnings locally with:
  - `ddev npm run textlint:fix`
  - `ddev npm run prettier:fix`

### Preview URL Issues

- Verify `ddev-com-fork-previews` Cloudflare Pages project exists and is accessible
- Check account ID matches the project's organization
- Ensure `CF_PAGES_PROJECT` is set to `ddev-com-fork-previews`

## Manual Testing

To test the workflow:

1. Create a test fork of the repository
2. Make a content change (e.g., add a blog post)
3. Open a PR from the fork
4. Watch GitHub Actions for build/deploy progress
5. Check for preview URL comment on the PR

## Maintenance

### Regular Tasks

- Monitor Cloudflare Pages usage and costs
- Review security warnings in build logs
- Update dependencies in fork validation steps
- Clean up old preview deployments if needed

### Updates

- Keep `cloudflare/pages-action` version current
- Monitor Cloudflare API changes
- Update content validation rules as needed
