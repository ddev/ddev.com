# Claude Code configuration

The machinery only. Guidance for agents lives in `AGENTS.md`, which links
every rule and skill here.

## How guidance is split

| Mechanism           | Loaded                          | Holds                                               |
| ------------------- | ------------------------------- | --------------------------------------------------- |
| `settings.json`     | Enforced by the client          | Rules that must not depend on Claude following them |
| `AGENTS.md`         | Every session                   | Facts that apply to every change                    |
| `rules/*.md`        | When a matching file is read    | Guidance for one area of the tree                   |
| `skills/*/SKILL.md` | When invoked or judged relevant | Procedures run occasionally                         |

`AGENTS.md` links each rule and skill, because other agents do not load them
on their own. A `CLAUDE.md` or `CLAUDE.local.md` in the project or a parent
directory makes Claude Code skip `AGENTS.md`, unless its project instructions
setting loads both.

## Hooks

**`check-before-commit.sh`** runs the check-only `npm run prettier` and
`npm run textlint` CI runs, through `ddev npm`. Every failure maps to exit 2,
and a stopped project blocks too rather than letting an unchecked commit
through. It takes about 12 seconds. It checks the working tree of
`$CLAUDE_PROJECT_DIR`, not the staged files, so a commit made in another
worktree is checked against the main checkout instead.

**`format-edited-file.sh`** passes only the edited file to `ddev prettier`, and
to `ddev textlint` under `src/content/`, the scope CI lints. A path outside
the project is skipped, `.prettierignore` still applies, and `.astro` files
are skipped because no Prettier plugin parses them. An error the tools cannot
fix exits 2, so Claude sees it; a payload without a file path or a stopped
project exits 1, which only the user sees.

## Permissions

`Bash(git push *)` also matches a bare `git push`. It does not match a push
written another way, such as `git -C . push`; `AGENTS.md` covers those.
