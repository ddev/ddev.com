---
title: "Install, test, repeat – Rapid local development with DDEV"
pubDate: 2018-03-12
author: Jeffrey A. McGuire
featureImage:
  src: /img/blog/2018/03/moren-hsu-359121-unsplash.jpg
  alt:
  caption:
  credit: "[moren hsu](https://unsplash.com/photos/VLaKsTkmVhk?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/repeat?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - DevOps
---

![](/img/blog/2018/03/joe.jpg)

I wanted to know how Joe Shindelar manages to generate and deliver hundreds of hours of Drupal learning content and where DDEV fits into the picture. Joe is Lead Trainer and Lead Developer at [Lullabot Education](http://lullaboteducation.com/), where they provide expert Drupal training on the e-learning site [Drupalize.me](https://drupalize.me/).

Joe told me, “I use DDEV pretty much any time I’m working on a Drupal site on my localhost.” In his case, that means to rehearse and create course recordings, teach at in-person workshops, and to recreate training sites when supporting learners and maintaining content.

### Install a sandbox, install another, install another

> “I can change to a directory from the terminal, run a couple of commands, it’s all set up, and everything is working.”

When you watch the Drupalize.me video tutorials, Joe makes it look so easy. But behind the scenes, “If I’m recording video, there’s lots of setup involved in getting things to a place where I can record.” As viewers, we might not realize how much time goes into the setting up. “That usually takes an hour. Then you hit record, and it takes five minutes.” Joe rehearses for each performance, testing and retesting the steps he’ll take.

Joe uses DDEV to generate throwaway sandbox sites when he’s producing training materials. “I can spin something up, test out a couple of ideas. See yep that works, destroy it. Spin it up again, do the exact same thing, this time on a recording. It’s certainly timesaving in that sense.”

Before, Joe used MAMP for this purpose. The MAMP instructions on Drupal.org detail how to set up a Drupal site … in 20 or more steps depending on your installation. “There are more steps involved… so it takes a little longer.” Joe didn’t consider MAMP a burden because he was so familiar with it. “I’d done it so many times.”

It takes four easy steps to [spin up a Drupal 8 site with DDEV](https://ddev.readthedocs.io/en/latest/users/cli-usage/#drupal-8-quickstart) (only three for Drupal 7 without Composer.) Clone the repository, set up Composer, answer a few config questions, and then start. “There’s less to remember with DDEV,” and that’s less to look up or get wrong, “It’s like yep, you just run the command to create a new D8 site and you can start going.”

Joe prefers to use DDEV now for local development because it’s quick and easy, “I can change to a directory from the terminal, run a couple of commands, it’s all set up, and everything is working.”

### Process over software

Productivity tools and hacks are a popular topic of conversation with developers. We often talk about apps seeking—as developers often do—a software solution to a process problem. But your tools don’t help you if your principles, practices, and workflows are getting in your way. Kevin Bridges, DDEV’s CTO [has been saying](https://www.drupaleasy.com/podcast/2014/06/drupaleasy-podcast-134-don%E2%80%99t-call-it-devops-kevin-bridges): “DevOps is a cultural conversation supported by technology.” [for years now.](https://austin2014.drupal.org/session/state-drupal-devops.html)

In this context, I like how Joe and his team have organized their schedules to make the most of their time–the one resource we never seem to have enough of. For example, they reduce task-switching as much as possible. Joe blocks off whole days to focus on specific types of work. He might spend one day producing Drupal 8 learning content; another on support requests for learners; and another day in calls. “Everyone else on the team pretty much does a similar thing.”

Lullabot Education doesn’t dictate how people should get something done or the software they should use. Instead, Joe’s team focuses on communication and process. “The hardest part is of building a good practice is remembering to follow the process: Take the snapshot, name it the right way, and that kind of thing.” And with processes evolving over time, everyone also needs to “agree on that process and how we’re going to do it.”

When they make a multi-chapter course, for example, each video chapter corresponds to a branch in a code repository. This lets other trainers come back later and recreate the sites for another recording or to answer support questions.

This focus on process results in better standards for collaboration. It also speeds up the time it will take in the future to reproduce the sites for content maintenance and learner support.

### A productivity boost

Adding new tools and software to your workflows is just as likely to introduce yet more things you need to learn, remember, and do as it is to help. Sometimes it’s hard to see if there’s going to be a net gain before we dive in. Docker and containerized development are increasingly popular and promoted as a [productivity boost for developers](https://www.ibm.com/developerworks/library/wa-docker-polyglot-programmers/index.html) … if you can harness its power. Docker itself can be a bit overwhelming. This is where DDEV comes in: we take care of the containers and complexity so developers don’t need to spend much time on it at all in many cases.

Joe initially started using containers in Kalabox, then “I ran into this thing where I needed to do something with Kalabox which involved needing to update to another version, which meant ‘Now delete everything and start over.’” … very frustrating! This gave him pause to reconsider his options, and he decided to give DDEV a try. The time to evaluate was quick. “I gave it a shot, and it worked great.” Not all of Joe’s team uses DDEV (yet!), but with the right configuration in their repositories, DDEV and Joe’s work are completely compatible with all the other tooling they have in use.

### Getting back time to give more time

Joe loves giving back through teaching. In his DrupalCon Vienna keynote he talked about how, “[Everyone has something to share.](https://www.youtube.com/watch?v=lRfTc-jxitQ)” He told me he’s gotten many opportunities because of what others have shared with him, and he enjoys sharing his knowledge and experience to others in return. “All of these opportunities have come because other people in the community were willing to take the time to share with me.”

Every time Joe prepares to teach a live workshop, the last thing he wants to worry about is his local Drupal development environment letting him down. “Using a tool like DDEV makes it really easy for me. The morning of the workshop, just run a couple of commands and great, I have Drupal 8 installed, it’s right here. Next week when I have to do the workshop again, I create a new directory, I run the same commands, and there I have another setup.”

I asked Joe, what would he do if he could get more of his time back.“Focus on contribution,” He’d create more content both for Lullabot Education and also for Drupal’s community documentation (Joe is a member of the [Drupal Documentation Working Group](https://www.drupal.org/governance/doc-working-group)). “We try to do as much as we can. It’s important for us to work on contributing, but it’s not what we get paid to do at work,” Joe said, when time is squeezed, it sometimes comes “from that four hours I was going to work on docs.”

DDEV is one tool that helps Joe speed up content development and testing, so he can reclaim some time to do more of what he loves.

---

Photo of Joe Schindelar used with permission from [lullaboteducation.com](http://lullaboteducation.com/)
