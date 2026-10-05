#!/bin/bash
# PreToolUse gate on `git commit`: the check-only prettier and textlint runs
# CI does. Only exit 2 blocks the commit. See .claude/README.md.

set -uo pipefail

cd "$CLAUDE_PROJECT_DIR" || exit 2

if ! ddev exec true >/dev/null 2>&1; then
  echo "check-before-commit: the DDEV project is not running, so prettier and textlint did not run. Run 'ddev start', then commit again." >&2
  exit 2
fi

status=0
if ! out=$(ddev npm run prettier 2>&1); then
  printf '%s\n\nRun "ddev prettier" to fix it, then commit again.\n\n' "$out" >&2
  status=2
fi
if ! out=$(ddev npm run textlint 2>&1); then
  printf '%s\n\nRun "ddev textlint" to fix it, then commit again.\n' "$out" >&2
  status=2
fi
exit $status
