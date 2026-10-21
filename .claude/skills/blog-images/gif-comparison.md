# Animated before/after comparisons

An animated WebP that plays the same steps in two DDEV versions, the old one
stacked above the new one, each under a label bar with a caption. Examples:
`public/img/blog/2026/07/ddev-start-v1-25-2-vs-v1-25-3.webp` and
`public/img/blog/2026/10/ddev-tui-*-v1-25-4-vs-v1-25-5.webp`, whose tapes and
ffmpeg filter graphs are in `public/img/blog/2026/10/vhs/`. Commit the tapes
and filter graphs of a new comparison the same way, in a `vhs/` directory next
to its images, so it can be re-recorded for the next release.

## Tools

If VHS isn't installed, download the `vhs` and `ttyd` release binaries from
GitHub into `~/tmp/vhs-tools`, check them against the release checksums, and
put that directory on PATH. VHS looks for `ttyd` on the PATH that the tape's
`Env PATH` sets, so that line must include `~/tmp/vhs-tools` too. VHS uses the
installed Chromium or Chrome.

## Binaries and projects

- Old version: `ddev utility download-ddev --tag v1.25.4`, which writes to
  `~/tmp/ddev-download-ddev/v1.25.4/`.
- New version, before its release: build upstream `main` in a `~/tmp`
  worktree with `make VERSION=v1.25.5`, so the header shows the release
  version instead of `v1.25.4-127-g...`.
- Never record the maintainer's real projects. Create demo projects with
  realistic names (`company-blog`, `docs-portal`, `storefront`) in
  `~/tmp/sites/`, registered in an isolated global config:
  `export DDEV_XDG_CONFIG_HOME=~/tmp/tui-demo-xdg`. Use about 15 projects with
  10 running, an add-on one release behind its latest, and a snapshot, so the
  screens have something to show.
- `ddev list` and `ddev tui` also show every running project from Docker,
  whatever the global config says. Ask the maintainer to stop their own
  projects before recording, and `ddev poweroff` the demo projects
  afterwards, or they show up in the maintainer's `ddev list`.
- Put a fake `xdg-open` that only logs its arguments first on the tape's
  PATH, so nothing opens a browser.

## Tapes

Record one tape per version with identical steps. Text must stay readable
after the blog scales a 1200px image to its column: `Set FontSize 22` with
`Set Width 1200` gives about 78 columns, and 14 or 18 was too small. Both
`Width` and `Height` must be even, or ffmpeg fails with "moov atom not found".
A height of 692 is 24 rows; when content doesn't fit, show the TUI scrolling
instead of making the terminal taller.

Make several short clips, one per feature, rather than one long recording.
Get to the starting state behind `Hide`, then pause before every action so a
viewer can read the caption first:

```text
Output detail-new.mp4
Set Shell bash
Set FontSize 22
Set Width 1200
Set Height 692
Set Padding 24
Set TypingSpeed 100ms
Env PATH "/home/me/tmp/fakebin:/home/me/tmp/vhs-tools:/path/to/ddev/bin:/usr/local/bin:/usr/bin:/bin"
Env DDEV_XDG_CONFIG_HOME "/home/me/tmp/tui-demo-xdg"
Env DDEV_NO_INSTRUMENTATION "true"
Hide
Type "cd ~/tmp/sites && clear"
Enter
Type "ddev"
Enter
Sleep 8s
Down@200ms 4
Sleep 1s
Show
Sleep 2500ms
Enter
Sleep 6s
Down@600ms 16
Sleep 3s
```

`ddev` with no arguments opens the TUI. When the command itself is part of
the clip, type it in view and `Sleep 1s` before `Enter`. Render both tapes in
parallel, each as `bash -c "timeout 200 vhs x.tape" </dev/null`.

## Composing the WebP

VHS sleeps don't map exactly to video time, so find when each step happens
from the frame changes:

```bash
ffmpeg -v info -i detail-new.mp4 -vf "select='gt(scene,0.0005)',showinfo" -f null - 2>&1 |
  grep -o 'pts_time:[0-9.]*'
```

Each half gets a 64px bar: `Before: v1.25.4` in gray (`0xb0b0b0`) and
`After: v1.25.5` in green (`0x45c98a`), both on `0x2a2a2a`. Do not use a
bright bar color. A caption on the right names the next action, such as
`enter opens project details`, and switches to it about two seconds before
the key is pressed. Use the same caption in both halves; if a key does
nothing in the old version, phrase it neutrally (`↓ in project details`).

Write the filter graph to a file; ffmpeg 8 reads it with `-/filter_complex`
(the old `-filter_complex_script` option is gone):

```text
[0:v]tpad=start_mode=clone:start_duration=1:stop_mode=clone:stop_duration=3,trim=duration=23,pad=1200:756:0:64:color=0x171717,drawbox=x=0:y=0:w=1200:h=64:color=0x2a2a2a:t=fill,drawtext=fontfile=/usr/share/fonts/TTF/DejaVuSans-Bold.ttf:text='Before\: v1.25.4':x=24:y=17:fontsize=30:fontcolor=0xb0b0b0,drawtext=fontfile=/usr/share/fonts/TTF/DejaVuSans.ttf:fontsize=26:fontcolor=0xe0e0e0:x=w-tw-24:y=20:text='enter opens project details':enable='between(t,0,6.2)'[a];
[1:v]...the same, with 'After\: v1.25.5' in 0x45c98a...[b];
[a][b]vstack,fps=12[v]
```

```bash
ffmpeg -y -i detail-old.mp4 -i detail-new.mp4 -/filter_complex detail.filter -map "[v]" \
  -c:v libwebp_anim -lossless 0 -q:v 80 -compression_level 6 -loop 0 out.webp
```

`tpad` pads both clips to the same length and holds the last frame. Check
frames by rendering the filter graph at a few times (`-ss 4 -frames:v 1
-update 1 f.png`), and view them before copying the WebP to
`public/img/blog/YYYY/MM/`. Keep each file under 2MB; 12 fps and quality 80
gave 0.3-1.1MB for 10-20 second clips.
