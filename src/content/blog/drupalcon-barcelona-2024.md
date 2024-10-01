---
title: "DrupalCon Barcelona Wrap-up"
pubDate: 2024-10-01
#modifiedDate: 2024-09-06
summary: DDEV happenings at DrupalCon Barcelona
author: Randy Fay
featureImage:
  src: /img/blog/2024/10/drupalcon-barcelona-mentors.jpg
  alt: DrupalCon Barcelona Mentors
  credit: "Paul Johnson"
categories:
  - Community
---

I spent the last week in Barcelona, Spain for DrupalCon Barcelona. It was so great to meet old friends and new, and to work with all to integrate new contributors to Drupal.

## BoFs (Birds of a Feather) sessions

A cool thing about DrupalCon is that anybody can set up a mini-session, and no real approval process is needed. I typically propose several of these, since they're a great way to deal with niche topics with a few people and have nice, smaller conversations with people who have specific needs. This time I did:

* **Working together: DDEV on Gitpod and GitHub Codespaces**: We talked about the many ways to use DDEV in Cloud IDEs like Gitpod and GitHub Codespaces. People were really interested in this, since of course these approaches don't require a local development environment at all (or rather, the local environment is in the cloud on a VM, and presented via a browser). See the DDEV docs on [Gitpod](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#ddev-installation-gitpod) and [GitHub Codespaces](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#ddev-installation-codespaces). 
* **Git on the Command Line - Office Hours**: We had fun talking about the basics of Git, what people need to know to really master it and do their work predictably and without fear. This one was the first thing in the morning, so had a smaller turnout.
* **DDEV Office Hours**: At most DrupalCons we do this simple free-form BoF so that people can bring the issues and discussions they want to have. At this one we had some really strong and experienced DDEV users, so it ended up being that they were helping me to understand their workflow rather than me coaching them.
* **Prepare for Contribution Day: Issue Forks, DrupalPod, DDEV, Git**: The highlight of DrupalCon is the Contribution Day, but sometimes coming to it it's a little intimidating because of Drupal's unusual contribution workflow. We talked about Drupal's issue workflow, how issue forks work, merge requests, etc. In the Drupal workflow, each issue has its own Git project fork, instead of the traditional open-source workflow where each person has a personal fork. In the Drupal workflow, anybody can push to any of the branches, or create a new branch. It's quite amazing.

## Mentoring on Contribution Day

The highlight of the week is when lots of people spend the day working on specific contributions. I normally help mentor first-time contributors on that day, helping with workflow, DDEV, Gitpod, and DrupalPod concerns. As usual, it was great and we got to work with lots of first-time folks, and many were successful understanding the workflow for the first time. One of the new contributors actually got to have their merge request merged in a live pull on-screen. But a few more got all the way to RTBC (Reviewed and Tested By the Community).

## Mauricio Dinarte Session on DDEV

[Mauricio Dinarte](https://www.drupal.org/u/dinarcon) did a great exposition of the features of DDEV in [Local development environments for Drupal with DDEV](https://events.drupal.org/barcelona2024/session/local-development-environments-drupal-ddev). I didn't even know this was coming up, but I was amazed at what he was able to introduce people to in 45 minutes. When the recording becomes available I'll promote it on the socials, because it was great.

## Ideas from the Driesnote

A DrupalCon tradition is the keynote by project founder and leader Dries Buytaert called the [Driesnote](https://dri.es/state-of-drupal-presentation-september-2024).

There were many inspirational topics here, with people focusing on "Starshot" or "Drupal CMS", which seems to be coming along well.

A key inspiration, though, was the idea of having organizations sponsor sections of the Drupal documentation. It's always been impossible for volunteers to keep up with the Drupal docs, and having the professional organization Drupalize.me maintain sections of the docs formally is a great idea. The new idea is like the "Adopt a highway" initiative used for decades in the US, where private businesses or other organizations pay for highway cleanup. For $2400/year, an organization can now [sponsor a section of the Drupal.org docs](https://drupalize.me/blog/adopt-document-sponsor-drupal-cms-documentation) to get it to the level it should be.

I think DDEV could do this same thing, and our favorite agency, CMS, and hosting provider partners could sponsor DDEV features so they could be properly maintained in the long run.

## Things I Learned

* `ddev composer` doesn't work right when there are multiple `composer.json`. For most projects, there is one main `composer.json` which can be specified with DDEV's `composer_root` directive, but in projects set up with the [joachim-n/drupal-core-development-project](https://github.com/joachim-n/drupal-core-development-project) there is a main `composer.json` and then also the one in `repos/drupal`, which is usually the one that might change if you're working on Drupal core. In this situation, it's important to either change `composer_root` to `repos/drupal` or to `ddev ssh` and `cd repos/drupal` and do composer activities there. (Of course you can also do `ddev composer -d repos/drupal` for example.)
* When you need only to update the hash in the `composer.json` the technique is to use `composer update --lock`.
* Some people using Visual Studio Code (VS Code) have been using the [Remote Explorer](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-explorer) and [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extensions to work inside DDEV's web container instead of using the traditional DDEV approaches on the host. [Mike Anello](https://www.drupaleasy.com/) has been promoting this technique in his outstanding long-form training sessions, so I was super interested in trying it out. Instead of using `ddev xdebug on` you use `enable_xdebug`. Instead of `ddev exec phpcs` or `ddev exec phpstan` you directly use `phpcs` or `phpstan`. It's a fascinating approach, and has some strengths and some frictions compared to the traditional approach. (Note that the fantastic [Visual Studio Code DDEV Manager](https://marketplace.visualstudio.com/items?itemName=biati.ddev-manager) extension is not used at all here, and actually can break things.)

## People are so thankful for DDEV!

I can't tell you how many people came up to me just to thank me for DDEV. They're so happy they've made that transition, and so pleased with DDEV.

## Thanks to sponsors!

Thank you to DDEV's lead sponsor [Platform.sh](https://platform.sh) for getting me to Barcelona and to the [Drupal Association](https://www.drupal.org/association) and conference organizer [Kuoni Tumlare](https://www.kuonitumlare.com/) for the complimentary mentoring ticket that also helped reduce costs for all.

**Is your organization budgeting for next year?** Please remember DDEV!

**Get in touch!** I'd be happy to talk to you or your organization. Send [an email](mailto:randy.fay%40ddev.com). Make an [appointment for a video call](https://cal.com/randyfay/30min).

We're delighted to collaborate with this amazing community on a sustainable and reliable DDEV, and we need your help! Thanks for all your contributions and for joining us in this journey!

**Have you [signed up for the monthly DDEV newsletter](/newsletter)?**
