---
paths:
  - "**/*.{js,mjs,cjs,ts,tsx,jsx,astro,css,sh}"
  - ".github/**"
  - ".ddev/**"
---

# Comment style

A comment earns its place only by saying something the code does not: why,
not what. **Budget: three lines inside a function or block, eight for a file
header or a doc comment.** Past that, the reasoning belongs in the commit
message, not the file.

- Do not restate the code or the function name, or explain standard
  language or tool behavior.
- Do not repeat one explanation at more than one call site, or re-describe
  what a linked issue or commit message already covers.
- Describe what is true now, not what changed. "Moved from X" reads as a diff
  note and goes stale.

Reread every comment you wrote before finishing, and cut what breaks these
rules.
