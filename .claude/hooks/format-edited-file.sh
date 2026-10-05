#!/bin/bash
# PostToolUse(Edit|Write): `ddev prettier` on the edited file, and
# `ddev textlint` too under src/content/, the scope CI lints. See
# .claude/README.md.

set -uo pipefail

payload=$(cat)

if command -v jq >/dev/null 2>&1; then
  file=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty')
else
  file=$(printf '%s' "$payload" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)
fi

if [ -z "$file" ]; then
  echo "format-edited-file: no file path in the payload, so nothing was formatted" >&2
  exit 1
fi

case "$file" in
  "$CLAUDE_PROJECT_DIR"/*) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" || exit 1
if ! ddev exec true >/dev/null 2>&1; then
  echo "format-edited-file: the DDEV project is not running, so $file was not formatted" >&2
  exit 1
fi

# Exit 2 shows the output to Claude, so it can fix what the tools could not.
rel="${file#"$CLAUDE_PROJECT_DIR"/}"
ddev prettier "$rel" >&2 || exit 2
case "$rel" in
  src/content/*) ddev textlint "$rel" >&2 || exit 2 ;;
esac
exit 0
