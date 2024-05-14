---
title: "Drupalcon Portland 2024 Wrapup"
pubDate: 2024-05-14
# modifiedDate: 2024-04-23
summary: Drupalcon Portland 2024 Wrapup
author: Randy Fay
featureImage:
  src: /img/blog/2024/05/platform.sh-booth-with-ddev-block.png
  alt: Platform.sh Booth With "Proud Sponsor of DDEV" block
categories:
  - Community
---

We go to Drupalcons because they're a great way to stay in touch with one of our valued communities. DDEV has deep roots in the Drupal world, and it's always a delight to see our stakeholders at Drupalcon and hear their successes and frictions.

**Drupal 11**: Drupal is about to release its newest version, Drupal 11. DDEV already has explicit support for Drupal 11, but there have been some late frictions with requirements like Sqlite 3.45 and Yarn v4. However, DDEV has them all supported.

**Drupal Starshot**: The founder of Drupal, Dries Buytaert, did his regular "Driesnote" and launched a new initiative called "[Starshot](https://www.drupal.org/starshot)" to build a more usable out-of-the-box experience with Drupal. This initiative will proceed in parallel with normal Drupal core development and may have an impact on DDEV's Drupal support, as Drupal 11 has also forced us to be ready for new requirements.

**60% DDEV Drupal Usage**: The annual [Drupal Developer Survey](https://www.ironstar.io/devsurvey24/) was released in a Birds-of-a-feature (BoF) session. 60% of survey respondents reported using DDEV, compared to 42% in 2023. Many of you know that DDEV was chosen as Drupal's recommended local development solution in the last year.

![Drupal Developer DDEV Usage 2024](/img/blog/2024/05/local-environment-tools.png "Drupal Developer DDEV Usage 2024")
*Image credit: [Ironstar.io 2024 Developer Survey](https://www.ironstar.io/devsurvey24/)*


**BoFs on DDEV**: "Birds-of-a-Feather" sessions, or BoFs, are small, informal sessions that do not require going through the session submission process.
  * [Bernardo Martinez](https://github.com/bmartinez287) presented his **From Lando to DDEV** again, explaining to Lando folks what the process and needs are to move. (See his [Midcamp recording](https://www.midcamp.org/2024/topic-proposal/lando-ddev-side-side-migration).)
  * In **DDEV From the Beginning** we worked with folks who had never installed or used DDEV before. The conference Wi-Fi was predictably bad, but people got started anyway.
  * In **Create a DDEV Add-on in 20 Minutes** we did in fact create a simple add-on. Several of the participants followed along and actually pushed to GitHub a real add-on that deployed custom commands, and they did it from scratch in the time we had for the session.
  * **DDEV Office Hours** was just for people to talk about DDEV issues, hopes, dreams, frictions, and it was a pleasure to talk with people.
  * **Make Your Own DDEV Hosting Provider** went great - several of the participants succeeded in creating a real working hosting provider that used SSH to access a server, dump the database, create a tarball of files, and download the result and load it into their local project. And we did that in the course of less than an your.
  * **DDEV Governance**: The least flashy of these BoFs was about DDEV governance. Several community stakeholders came to brainstorm how to move forward with DDEV's governance and find a path from it being a simple "Benevolent Dictatorship" to something more robust. Great ideas were exchanged.

**Contribution Day**: The highlight of every Drupalcon, and perhaps the most important part, is Contribution Day, when huge rooms of people gather to work on Drupal issues. As I usually do, I helped with the mentored contribution room, where most folks were contributing for the first time. The meant helping them with understanding how to set up a local environment, or use [Drupalpod](https://www.drupal.org/project/drupalpod) to do their work. (Drupalpod is a way to use DDEV on Gitpod without needing a local development environment, which helps enormously in a conference environment with unreliable networking.) This year I had better mastery of Drupal's new Gitlab setup, understood "issue forks" better, and was able to help more successfully than I did at Drupalcon Lille.

It's such a delight to see old friends and collaborators in person at events like this, and this was no exception. There were so many people commenting on their love for DDEV and offering supportive comments.

And **thanks to [Platform.sh](https://platform.sh)**, DDEV's lead sponsor, for getting me to the event. For the first time, DDEV was featured in the Platform.sh booth on big blocks that showed "Proud Sponsor of DDEV" on them, and so many people stopped by to talk about DDEV and thank Platform.sh for its support of the project.

