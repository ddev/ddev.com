---
title: "Contributor Training: Using Claude Code for a DDEV PR"
pubDate: 2025-09-09
#modifiedDate: 2025-02-26
summary: Contributor training demonstrating use of Claude Code for a DDEV PR.
author: Randy Fay
featureImage:
  src: /img/blog/2025/09/claude-code-ddev-banner.png
  alt: Claude AI and DDEV collaboration banner for contributor training
categories:
  - Training
  - Guides
---

Here's our August 21, 2025 [Contributor Training](/blog/category/training) on using Claude Code AI for a DDEV PR:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/sUSHF4V7yzs?si=t102XbCqHz6XBJvF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Big Picture

- The most amazing thing about Claude Code as an **agent** is that it can do things and respond to them, on your machine, and using the internet, with your permission. That puts it way ahead of any other AI I've used. It can run tests and respond to the results (and fix things). It can create a commit or a PR.
- Used with respect, AI can be really powerful, a whole new level of abstraction in software development, maybe a bit like having an IDE when you were previously using just a line editor.
- AI excels at repetitive tasks, but only you have **judgment**. It's phenomenal at repeating patterns that it's been trained on, and often good at imitating patterns that you point out to it.
- It's a pretty good collaborator for those of us who work mostly alone.
- When I don't have the energy to approach a problem from scratch, sometimes just explaining it to Claude Code and asking for a plan gets me started. I've taken on quite a number of DDEV bugs/features this way and got to them instead of procrastinating another year or two.

## Guardrails

- Your code is your code. Build it with guardrails that will help keep it under control. Tests and static analysis are great guardrails. (DDEV has hundreds of automated tests and `make staticrequired` for static analysis.)
- Control, read, and manually test the code yourself.
- Consider getting a different AI to do a review.
- Always try to get another human to do a review.
- AI is _fantastic_ at creating new tests, but don't let it touch the existing tests.

## Structure and Strategy

- For complex initiatives, explain the entire goal in detail to Claude and then get it to write a PRD, then commit the PRD into the repository. That way you'll have a high-quality set of context to use.
- Put all your general directives in a `CLAUDE.md` file like [DDEV's CLAUDE.md](https://github.com/ddev/ddev/blob/main/CLAUDE.md). Their docs claim that directives like this will be used properly to guide Claude's behavior, and it does help, but Claude does not seem to be strictly obedient and I often have to remind it of basic DDEV precepts.
- [TaskMaster AI](https://www.task-master.dev/) is a pretty good structural tool. You can give it a PRD and have it create a task list, then Claude can use it to navigate that task list. This would have been a great tool long before AI, but I rarely used that much structure in my coding before using this tool and AI.
- Every time you accomplish a bit of something, make a commit or have Claude make a commit. That way you can roll it back, or review just one item. (This works for you as a human also.) Thanks [@shaal](https://www.drupal.org/u/shaal).

## Capabilities

- I was amazed to find that Claude could create an issue or PR for me, and certainly do commits. It can also comment on an issue or PR. I don't let it do those things without permission. (It seems to know how to use the `gh` utility to do these things; you need to have that installed and configured.)
- I have definitely learned some things from Claude. It has used the Go `t.Run()` much more effectively for clearer subtests than I had ever done before. And it seems to use a bit more modern Go in general, so that's a plus.

## Problems

- The current billing situation for Claude is confusing. It's based on the number of tokens you're using, but it doesn't give you feedback until you've almost used it all up. Then (on the $20/month plan) you're not able to use it for a number of hours, which seems to be arbitrary. You can spend more for a higher monthly plan, and you can also pay-as-you-go for tokens. I haven't done either of those. Clear context (`/clear`) at key points to limit the amount of context you're carrying forward and limit the number of tokens you're using.
- Claude can get stuck and go in circles, like other AI. Clear context to try to get around that. Have an overall plan to get around it.
- I'm annoyed by how verbose and flowery the commit/issue/PR language is sometimes, but have tried to calm it down using directives in the `CLAUDE.md` file, but without success. It also is complimenting me all the time and always agreeing with what I say. I haven't been able to calm that down either.
- I find that the amount of code I can create quickly for a significant feature is amazing. But then I have to understand it. And since I didn't create it at the micro level, it can be exhausting to work with.

## Demonstration

In this demonstration (see screencast) we asked Claude to work on [this issue about `ddev launch`](https://github.com/ddev/ddev/issues/7424) and we asked it to create a PR for us. It generated [this PR](https://github.com/ddev/ddev/pull/7548) to resolve the problem. It was a trivial issue with a trivial solution, but the path to create it was similar to the path for a more complex situation.

## Responsible AI Usage and Disclosure

This isn't an adequate place to discuss responsible AI, but:

- Acknowledge the use of AI. Claude is happy to add a tag onto every commit or comment.
- Take responsibility for what you build.

## Resources

- [Claude Code AI](https://www.anthropic.com/claude-code)
- [TaskMaster AI](https://www.task-master.dev/)
- [Slides](https://rfay.github.io/ddev-claude-presentation/) and supporting [repository](https://github.com/rfay/ddev-claude-presentation) built on [reveal.js](https://revealjs.com/), created using Claude.
- [Coursera Claude Code Course](https://www.coursera.org/learn/claude-code): I took this as a free course; it didn't take too long and I learned a lot that I would not have known otherwise.

## Conclusions

Yes, AI can make us really lazy. And it can make us stupid. Those valid concerns were also leveled against the calculator and the computer, of course. People thought that using the `C` language instead of assembler was giving up control. It was. We have to learn how to use this technology, use it right, and grow with it.

Build guardrails. Pay attention. Know what your code does. Enjoy the ride!

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Follow the [DDEV Newsletter](/newsletter) for information about upcoming user and contributor training sessions.

Edited with assistance from Claude Code and Codex; banner image generated by Claude.
