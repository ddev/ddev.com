---
name: ddev-commit
description: Write a ddev.com commit message or pull request description. Covers the title format, the PR template sections, the Cloudflare preview URL for Manual Testing Instructions, the trailers, the plain register DDEV uses, and how to pass a body to git and gh without hard line breaks. Use before writing any commit message, PR, or issue for this repository.
when_to_use: >
  Triggered by "commit this", "write a commit message", "open a PR",
  "update the PR description", "update the PR body", or any request to
  prepare work for review in the ddev.com repo.
---

# Writing commits and PRs for ddev.com

The commit body is reused as the pull request description, so write it once,
for the reviewer.

## Title

[Conventional Commits](https://www.conventionalcommits.org/), per the
[PR title guidelines](https://docs.ddev.com/en/stable/developers/building-contributing/#pull-request-title-guidelines):
`<type>[(scope)]: <description>[, fixes #<issue>]`, for example
`docs(blog): add DDEV v1.25.4 release post` or
`build(deps): bump astro from v7.1.3 to v7.2.10`.

## Body

Follow `.github/PULL_REQUEST_TEMPLATE.md`, which matches the ddev/ddev
template, with its HTML comments removed. Sections, in this order:

```markdown
## Short Summary (TL;DR)

## The Issue

- Fixes #REPLACE_ME_WITH_RELATED_ISSUE_NUMBER

## How This PR Solves The Issue

## Manual Testing Instructions

## Automated Testing Overview

## Release/Deployment Notes
```

- **Short Summary (TL;DR):** required. One or two plain sentences: what
  changed and why. Write it last.
- **The Issue / How This PR Solves The Issue:** the decision, not the
  investigation behind it. Keep the `- Fixes #<number>` line when there is an
  issue, and drop it when there is none.
- **Manual Testing Instructions:** see below.
- Drop any other section, heading included, that has nothing to say, instead
  of writing `None` under it.

### Manual Testing Instructions

Link the PR's Cloudflare preview, not a local dev server, and compare it
against the same path on https://ddev.com/. Name the exact pages and what to
look for, not the general area. Ask where the branch will be pushed, since the
URL differs, and use a `REPLACE_ME`-style placeholder for anything not known
yet:

- `ddev/ddev.com`: `https://<branch-with-dashes>.ddev-com-front-end.pages.dev/`,
  with the subdomain cut to 28 characters
- A fork: `https://pr-<number>.ddev-com-fork-previews.pages.dev/`

Once the PR exists, take the real URL from the Cloudflare comment. It differs
from the computed one when the cut alias collides with an earlier branch's,
which gets a random suffix such as `-kgcv`:

```bash
gh pr view <number> --json comments --jq '.comments[].body' \
  | grep -oE 'https://[a-z0-9-]+\.ddev-com-(front-end|fork-previews)\.pages\.dev' \
  | grep -vE '^https://[0-9a-f]{8}\.' | sort -u
```

### Trailers

End the body with two trailers, separated by an empty line:

```text
🤖 Developed with assistance from [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <model> <noreply@anthropic.com>
```

`<model>` is the model actually in use, for example `Opus 5.5`. Leave the
`Co-Authored-By` line out of a PR description.

## Keep it short

A reviewer reads the diff anyway, so the message earns its place only by
saying what the diff cannot: why, and what to check by hand. A finished
message should read in under a minute. State each fact once, in the section
it belongs to; a section growing past a handful of lines is narrating the
diff.

## Register

Plain, direct sentences, each with the connective that ties its clauses
together (so, which, before, instead of, because). Not none, which reads
choppy, and not several stacked with parentheticals, which reads as dense
engineering prose. Read it aloud as if to a teammate. When a parenthetical
explains why something was done, give the why its own clause. The banned
words in `AGENTS.md` apply.

## No hard line breaks

GitHub renders issue, PR, and comment bodies with GFM hard line breaks: a lone
`\n` inside a paragraph becomes a `<br>`.

**Write each paragraph of a commit body or `--body-file` as one continuous
line**, with empty lines only between paragraphs, headings, and list items.
Code blocks and tables are unaffected.

## Passing the body

Write the message to a file, then `git commit -F <file>`. Never use
`git commit -m "$(cat <<'EOF' ... EOF)"`, which mangles the message. The same
holds for `gh`:

```bash
gh pr create --title "<title>" --body-file ~/tmp/pr_body.md
gh pr edit <number> --title "<title>" --body-file ~/tmp/pr_body.md
```

## Before committing

1. Run the checks in `AGENTS.md`, including `ddev npm run build` when code,
   config, or dependencies changed.
2. Read `git diff --cached` for comments that break
   `.claude/rules/comments.md`, and cut them.
3. When amending, re-check every claim already in the body against the
   current diff.

Then commit and stop: pushing is forbidden, per `AGENTS.md`. Report the branch
and which commits are unpushed.
