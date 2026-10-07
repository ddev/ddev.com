# Fork Preview Setup Guide

This guide explains how to configure the automated preview generation for forked PRs using Cloudflare Pages.

## Overview

Two workflows implement a two-stage process:

1. **Build stage**, `.github/workflows/cloudflare-preview-forks-build.yml`: builds the site from fork code on `pull_request`, with no access to secrets
2. **Deploy stage**, `.github/workflows/cloudflare-preview-forks-deploy.yml`: runs on `workflow_run` after a successful build and deploys the artifact with the Cloudflare credentials, without checking out fork code

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

### 4. Enable Workflow

The workflows run automatically for PRs from forks only:

- Build: `opened`, `synchronize`, `reopened`, `ready_for_review`
- Deploy: after each successful build, and on `closed` (through `pull_request_target`) to add a closing note

## Security Features

### Two-Stage Architecture

- **Stage 1 (Build)**: Runs fork code without any secrets
- **Stage 2 (Deploy)**: Uses secrets only after build artifact is created

### Content Validation

- Checks for executable files in content directories
- Validates blog post frontmatter structure
- Detects potentially unsafe content patterns
- Warns about oversized images (>2MB)
- Runs textlint and prettier, and a failure in either stops the preview

### Access Controls

- Only processes PRs from forked repositories
- Builds on `pull_request`, so fork code never runs with secrets; `pull_request_target` is used only for the closing note, which checks out no code
- Separates untrusted code execution from credential access

## Workflow Behavior

### Build Process

1. Runs content validation and security checks
2. Installs dependencies with `npm ci`, then runs textlint and prettier
3. Builds the site with `npm run build`
4. Packages `dist/` and the PR number as an artifact

### Deployment Process

1. Downloads build artifact from Stage 1
2. Deploys to Cloudflare Pages using wrangler-action
3. Deploys under the `pr-<number>` alias, see [Preview URLs](#preview-urls)
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
- Verify the `TESTS_SERVICE_ACCOUNT_TOKEN` secret, the `CF_API_TOKEN` item in the 1Password `test-secrets` vault, and the `CF_ACCOUNT_ID` and `CF_PAGES_PROJECT` variables
- Check Cloudflare API token permissions

### Content Validation Errors

- Review security check output
- Fix frontmatter issues in blog posts
- Address linting warnings locally with:
  - `ddev textlint`
  - `ddev prettier`

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

## Preview URLs

The deploy step passes `--branch=pr-<number>` to `wrangler pages deploy`, so each PR keeps one URL across pushes, `https://pr-<number>.ddev-com-fork-previews.pages.dev`. The PR comment links that alias, or the commit-specific deployment URL when there is no alias.

## Maintenance

- Keep the `cloudflare/wrangler-action` version current.
- Review the security warnings in the build logs, and update the validation rules when the content structure changes.
