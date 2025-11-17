---
title: "DDEV at DrupalCon Atlanta 2025"
pubDate: 2025-04-03
#modifiedDate: 2025-02-06
summary: Randy got to go to DrupalCon Atlanta and help folks with Drupal and DDEV.
author: Randy Fay
featureImage:
  src: /img/blog/2025/04/randy-mentoring-drupalcon-atlanta.jpg
  alt: Randy at table doing first-time contributor mentoring.

categories:
  - Community
---

## DDEV at DrupalCon Atlanta 2025

While I didn’t speak at any formal sessions this year, I had the chance to lead several Birds-of-a-Feather (BoF) discussions:

- **DDEV VS Code Integration Improvement**: We talked about ways that DDEV could integrate better with VS Code. Although the well-maintained [DDEV Manager VS Code Extension](https://marketplace.visualstudio.com/items?itemName=biati.ddev-manager) does great for people, there are a couple of things VS Code does not know how to do well. The biggest is that it doesn't know how to use `php` or `phpstan` or `phpunit` properly inside a Docker container (like the DDEV web container), so it's hard to use the nice VS Code integration with those tools. DDEV Community member [Mike Anello](https://www.drupal.org/u/ultimike) was present and talked about his favorite usage, which involves the [Remote Explorer](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-explorer) extension. In his long-form Drupal trainings at [DrupalEasy](https://www.drupaleasy.com/) he teaches folks to use Remote Explorer with DDEV and work inside the web container all the time, and that solves the problem, but it is different from what DDEV users normally do. (PhpStorm knows how to use tools and interpreters inside the container, so doesn't have this problem.) Mike has [presented his technique many times as Maximizing Visual Studio Code with DDEV](https://www.youtube.com/watch?v=Nn_L6N4ZQqo).
- **Replacing Gitpod for DrupalPod and DDEV**: Many of you know that Gitpod has been a great resource for DDEV users to do development in a web environment, and that Gitpod Classic is scheduled to shut down in April 2025. The [DrupalPod](https://www.drupal.org/project/drupalpod) project, which wrapped Gitpod and DDEV to make Drupal contribution easy in a browser was used extensively by Drupal community members to review issues and contribute code. It was great for Contribution Day at DrupalCons these last few years because there was no need for people to set up a local development environment, and the bandwidth requirements were minimal. The [Drupal.org issue about this](https://www.drupal.org/project/drupalpod/issues/3500792) has the details of the discussion, including a recording.
- **DDEV Office Hours**: DDEV Office Hours are a simple place to talk about anything DDEV-related, and we had a pleasant time.
- **Git Bisect for Fun and Profit**: This Git tutorial on the lovely `git bisect` technique went well and we all had a good time. It was based on the [Florida Drupal Camp presentation "Divide and conquer: A systematic approach to troubleshooting issues"](https://drupal.tv/events/florida-drupalcamp-2025/divide-and-conquer-systematic-approach-troubleshooting-issues). Here's the [git-bisect-example repository](https://github.com/rfay/git-bisect-example) for hands-on practice.

## First-time Contributor Mentoring

The highlight of every DrupalCon is helping new contributors on Contribution Day, a whole day where folks get help contributing for the first time to code, documentation, or marketing. I was able to help a few people, and of course, was the resident DDEV and DrupalPod expert.

## Helping Out

I published an invitation to meet one-on-one and a few people took advantage of meeting in person to look at their DDEV issues. It was great to meet them!

## Notes

- **Drupal CMS was all the rage**: The [Drupal CMS](https://new.drupal.org/docs/drupal-cms) project has been quite successful this year, and it seemed like dozens of sessions talked about it. It seems to me like the Drupal community has taken an excellent path with this. As Dries said in the [Driesnote](https://dri.es/state-of-drupal-presentation-march-2025), Drupal was always a huge bunch of building blocks that could do lots of things and do them well... but only experts understood how to do that. And they all did it in different ways. Now Drupal CMS provides a clear and refined starting point for people who need a website, but still has all the power of Drupal behind it, and you don't have to be an expert to get that polish and those features at the very beginning of your journey.
- **DDEV Maintainer [Stas Zhuk](https://github.com/stasadev)** can't travel outside Ukraine, but he was welcomed with an honorary badge! ![Stas with badge](/img/blog/2025/04/stas-sort-of-at-drupalcon-atlanta.png)
- **Docksal seems to be in trouble**: In the Drupal community many folks have happily used [Docksal](https://docksal.io/) over the years, but its maintenance has recently fallen off. (Docksal is a Docker-based local development environment similar to DDEV.) There were people at DrupalCon asking about the situation with Docksal and asking for help migrating their sites to DDEV because of frustration with the project, which hasn't had a release since May, 2024. As open-source maintainers ourselves, we understand the pressures of maintenance and life and hope the Docksal maintainers are getting all the support they need in both places.

## Thanks!

[Bernardo Martinez](https://www.drupal.org/u/bernardm28) shared a room and a DrupalCon ticket, making this whole thing possible.

[Platform.sh](https://platform.sh) was kind enough to fund the airline ticket to Atlanta.

Thanks to both of you! I wouldn't have made it without both those things.
