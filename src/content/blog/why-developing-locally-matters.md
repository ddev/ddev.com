---
title: "Why developing locally matters"
pubDate: 2020-10-28
summary: Benni Mack on the importance of version control and local development.
author: Benni Mack
featureImage:
  src: /img/blog/2020/10/git-flow-benni-blog.001-2.jpeg
  alt: Illustration with post title and arrows with circles depicting a stylized flow
categories:
  - DevOps
---

I’ve been a web developer for over 20 years, in which time my work shifted from HTML-only to dynamically built websites with PHP, Java, Ruby, and JavaScript. Especially with PHP and other non-compiled programming languages, it was an “easy fix” to work directly on the production web server to see my changes – even when those changes weren’t working. However, our company b13 shifted to using [Git as a Version Control System (VCS)](https://git-scm.com/) in 2012, and looking back, I have no regrets about making that change. Here are a few WHYs on the power of a good development setup for myself and my company.

## The Need for Git

When working as a single developer, keeping everything in a version control system seems a bit overkill. But Git has saved my butt hundreds of times. With Git:

- [History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History): I can find out exactly WHEN I added or changed some code lines, and if I stick to proper commit messages, WHY I changed something. This helps me trace down bugs more efficiently. And, regarding [commit messages](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#%5Fcommitting%5Fchanges): Especially when fixing hard-to-fix bugs, I set the commit message to a “Note to Future-Self” — because I can’t remember why I did a specific change 6 months ago. This does not replace a good habit of writing tests of course, but it acts as additional help for myself when maintaining code.
- [Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell): I can work on multiple things in parallel in branches, or keep quick changes I found during browsing through existing code by changing something and putting it “in my stash.”
- [Collaboration](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows): Even if you start out as a single developer, at some point you may need to share your code with somebody else. Git has you covered, including all of the history and all of the branches. A Git repository can be cloned from any kind of remote (even from a colleagues’ computer), there is no central repository needed.

If you fear the Command Line when thinking about Git, I can warmly recommend [Git Tower](https://www.git-tower.com/) which makes tagging, branching, merging, fast-forwarding and the concept of “remotes” much easier to grasp through the use of a graphical user interface.

Once you’ve started to be disciplined with making small commits, even as a one-person-show, you can build your code in logical components which you integrate and deploy continuously. This fact, plus the discipline of writing good commit messages truly made me a better developer, and you don’t need to have a Computer Science degree for that.

## The next logical step: Deployment

Now that everything is in Git, uploading the source code files can still be managed manually through FTP/SCP, or you can even use Git on the production environment. This turns out to be very risky. I’ve seen environments where somebody commits a change into Git on production, while at the same time somebody else had made another change in the same file, and uploaded _that_ change to production. These were the days where we all sat in one room shouting: who uploaded what first or last?!

This felt unnecessary, and we evaluated various alternative Deployment strategies. Deployment in this context is transferring a certain state of your source code and assets to a production environment, ie your web host. If you want to do this automatically, and in a repeatable way, we call it “Continuous Deployment,” ie “push the current state of this Git branch to the production environment,” multiple times a day. Those small changes and commits really come into play here.

For more complex web projects, some might need Frontend builds with npm, yarn etc, and defined dependencies for PHP with Composer to actually “build” the package you want to move to the production environment. You could also add Unit or Integration tests on your source code which should check that previous and new behavior works as expected. If you’re familiar with these concepts, you already have a “Continuous Integration” setup as well. Both terms are often referred to as “[CI/CD](https://ddev.com/ddev-live/bringing-ci-cd-to-your-agency-with-ddev-live/),” and they cover the whole build process.

In the end, an automatic “build server” takes care of building the final state – an artifact such as a zip file – to be transferred to the production environment where it will run without any problems. No more yelling across the office!

It’s a win for all developers: Deployment is one of these things that you don’t need to do manually anymore. Having this process from commit to integration to deployment saves you time and effort.

A bonus: You could even deploy one Git branch (for instance, a branch named “staging”) to a staging environment and another Git branch (“main”) to the production environment, so your colleagues or your customers can [test and preview each change on a separate server](https://ddev.com/ddev-live/a-git-based-workflow-from-dev-to-deploy/) before you push it to the production environment. This comes especially in handy when there are integrated services like external databases and APIs to test with.

## But how do I develop locally?

Now that a CI/CD process is in place, the biggest question left is: Well, how do I work on my web project on my computer in an equally collaborative and safe way? Especially with teams, every developer and contributor has their own local copy of the web project, including the database and assets, on their machine. Develop locally, and I don’t have to worry about my internet connection, or if the upload of a changed file has succeeded, I can focus on the task at hand.

We had been working with XAMPP, MAMP, and virtual machines, but Docker has had a huge impact in the past years. But if you’re primarily a web developer, [setting up Docker yourself](https://ddev.com/ddev-local/ddev-v-build-it-yourself/) is much more complicated, and I can fully relate to that as I still feel like a Docker newbie.

Fortunately enough the folks at DDEV released [DDEV-Local](https://ddev.com/ddev-local/), which takes away all the pain from Docker and lets you focus on your PHP application development, whether it’s TYPO3, Drupal or any other PHP project. Install Docker and DDEV-Local and you’ll have a local environment, [configured](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/) to match your production environment, with your Git repository, up and running in a matter of minutes. It’s the last piece of the puzzle needed to never directly touch the production environment again.

To sum it up:

- Using Git can save hours of work, even if you’re working as a one-person-show or don’t have to manage tons of branches.
- With a repeatable and automated deployment strategy you don’t have to worry about the code on the production environment anymore.
- Use DDEV-Local to make your life easier when you want to develop on your local machine.

There are a lot more topics to cover, like how to [sync your assets](https://ddev.readthedocs.io/en/latest/users/providers/DDEV-Live/) or visitor-generated content back to your local environment, but this always depends on the tool you use–in TYPO3 CMS world this is especially important. What’s your story on how to handle your toolchain and managing content between environments? [Drop us a tweet](https://twitter.com/intent/tweet?text=Hi%20@bennimack!%20%23ddev&via=Drud).

[DDEV-Local TYPO3 Quickstart guide](https://ddev.readthedocs.io/en/stable/users/cli-usage/#typo3-quickstart)
