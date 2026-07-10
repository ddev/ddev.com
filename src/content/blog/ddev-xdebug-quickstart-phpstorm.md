---
title: "DDEV Xdebug Quickstart with PhpStorm (Video)"
pubDate: 2026-07-13
summary: "A less-than-5-minute screencast showing how to set a breakpoint, enable Xdebug with `ddev xdebug on`, and step through PHP code in PhpStorm."
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/ddev-xdebug-quickstart-phpstorm.png
  alt: Xdebug logo and DDEV logo
categories:
  - Training
  - Videos
  - Guides
---

Step debugging is one of the first things every developer should master in any language or environment, and it's my opinion that it's just as fundamental as version control. With DDEV, getting Xdebug working with PhpStorm takes less than five minutes and no `php.ini` fiddling. This screencast shows the whole thing on a TYPO3 project, start to finish.

## Watch the Video

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Zkpi6qWg5EY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What You'll See

- Installing the [DDEV Integration Plugin](https://plugins.jetbrains.com/plugin/18813-ddev-integration) for PhpStorm
- Setting a breakpoint at the entry point of a TYPO3 project
- Telling PhpStorm to listen for PHP debug connections
- Enabling Xdebug with `ddev xdebug on`
- Stepping over (<kbd>F8</kbd>) and stepping into (<kbd>F7</kbd>) code as a page loads

## The Steps

1. Install the DDEV Integration plugin from the PhpStorm marketplace (not required, but it handles most of the setup for you)
2. Set a breakpoint
3. Tell PhpStorm to listen for PHP debug connections
4. `ddev xdebug on`
5. Visit the page — PhpStorm stops at your breakpoint automatically

That's it. No manual `php.ini` changes, no fussing with `host.docker.internal`, no separate Xdebug install.

## Works the Same Everywhere

This screencast uses PhpStorm, but the same setup works identically with [VS Code](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug), on Linux, and on Windows with WSL2. If you're setting up a new machine, see:

- [DDEV on Linux in 10 Minutes](ddev-on-linux-in-10-minutes.md)
- [Watch: DDEV from scratch with Windows WSL2](watch-ddev-local-from-scratch-with-windows-wsl2.md)
- [Watch: DDEV From Scratch with macOS](watch-ddev-local-from-scratch-with-macos.md)

## More on Xdebug and DDEV

- The `ddev utility xdebug-diagnose --interactive` command can help with port conflict and related setup problems. Try it out!
- [Xdebug in DDEV: Understanding, Debugging, and Troubleshooting Step Debugging](xdebug-step-debugging-understanding-and-troubleshooting.md) — the updated guide
- [DDEV and Xdebug: Debugging and sorting out problems](xdebug-debugging.md)
- [Xdebug.org](https://xdebug.org/) and its [step debugging documentation](https://xdebug.org/docs/step_debug)

Xdebug is created and maintained by Derick Rethans. He's been maintaining it for 20+ years. [Send money to the Xdebug project!](https://xdebug.org/support). The DDEV Foundation supports it as an upstream project, you can too.

## Learn More

- Full details on DDEV's Xdebug integration, including troubleshooting, are in the [DDEV documentation](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/).

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
