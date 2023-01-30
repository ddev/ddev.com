---
title: "DDEV – A local development environment that just works"
pubDate: 2018-03-01
author: Jeffrey A. McGuire
featuredImage: https://ddev.com/app/uploads/2018/03/Adam_Bergstein.jpeg
categories:
  - DevOps
---

Adam Bergstein (aka [nerdstein](https://twitter.com/n3rdstein), VP of Engineering at [Hook 42](http://www.hook42.com/)) has been on a long search for the ideal local development environment. Adam has a diverse set of responsibilities at work, analyzing and supporting client needs for sales and another set of needs around his deep involvement in open source software communities and cont\`ribution. You can find Adam (as I often have!) speaking at tech conferences or leading [Drupal core contribution sprints](https://2017.midcamp.org/sprints).

In both situations–at work or contributing to Drupal–time is of the essence. Losing an hour or more to environment configuration and spin up for each project he worked on and for each context switch he had to make was a daily reality for Adam and he found it “massively disruptive.” That was time that would be better spent delivering value to his clients and open source projects. What was the answer? What would an ideal local development environment look like?

### What’s an ideal local development environment for Drupal?

Adam has been seeking the “Holy Grail” of local Drupal development environments and he’s tried a bunch of approaches over the years. One key issue is that it should be easy and consistent, “You shouldn’t be solving the same problem over and over again. Part of what open source is about is not reinventing the wheel all the time. If you’re constantly wasting your time fixing sandbox issues and getting people’s machines set up … It’s a poor use of your time.”

[In a blog post](http://nerdstein.net/blog/common-drupalvm-use), he said he’d long been looking for a solution, but, “nothing seemed to work right.” He detailed his requirements:

**The ideal local development environment should …**

- **JUST WORK with as little set up as possible.**
- **Offer easy task switching –** “I want to **avoid installing tools on my local system** that may force me to tune and/or change when switching between projects. This is a major time dump and one that seems to be a significant waste.”
- **Perform well with no tweaking –** “I don’t want to do any additional, manual configuration it to get it to perform well.”
- **Be destructible –** “I want the full discretion to destroy and rebuild my local environment at will. Especially if I am working on a project in which the environment is regularly changing or evolving.”
- **Be configurable –** “No solution should make assumptions about the needs of the project.”
- **Not make assumptions about my toolset, while also being robust and flexible –** “None of my clients use the same tools … I want the ability to rapidly use and configure the tools I need without this being an encumbering task. And, ideally, this is configuration that is persistent and can be shared across development teams.”
- **Not make assumptions about my development workflow –** “Every team and project has adopted their own workflow … I don’t want a tool that only supports workflows defined by hosting platforms, undocumented continuous integration solutions, or poor practices carried over between vendors. … I may have preferences, but ideally, my local sandbox can support any or all of these seamlessly.”

### What about virtual machines?

On his journey, he tried [VDD](https://www.drupal.org/project/vdd) (Vagrant Drupal development), DrupalVM, Acquia Dev Desktop, MAMP and its variants. And none met his requirements. In 2016, he settled on DrupalVM and [he guesses](http://nerdstein.net/blog/local-core-development-environments) it saved him “hundreds of hours.” Even still, local development with DrupalVM wasn’t a cure-all and proved to be “[overly complex](http://nerdstein.net/blog/local-core-development-environments)” for core development work. He had tried to improve things and told me he just couldn’t make it work. “It was so painful.”

The main issue was that he was working against the clock in a typical day, juggling lots of responsibilities. “It takes a damn long time to get something provisioned and spun up” with the VM solution. How long exactly? “It would take upwards of 20-30 mins to provision a machine. And then if it wasn’t provisioned right, or if there was configuration missed, I would have to go back and do that. I would destroy it, and rebuild it.” He said it could take anywhere from 2-3 iterations. “And that’s massively disruptive.”

Virtual machines are [resource hogs](https://www.itworld.com/article/2915530/virtualization/containers-vs-virtual-machines-how-to-tell-which-is-the-right-choice-for-your-enterprise.html) in terms of disk space, memory, and your laptop’s battery life, but they were also eating up Adam’s contribution time. Quoting his blog, “At this point, I felt I was wasting time that I could actually be working on core and wanted to try to find something as quickly as I could.”

### Speeding contribution with containers

Meanwhile, adoption of Docker and containerized development was snowballing. From 2016 to 2017 infrastructure monitoring company [DatadogHQ reported](https://www.datadoghq.com/docker-adoption/) that Docker had grown in market-share by 40%. And Adam’s experience tracks the growth of Docker adoption. But containers certainly bring their own problems and complications with them. Given his previous experiences, I think many developers can relate to Adam wanting something that “just works” at this point.

“If you were using a Mac, Docker for Mac had really ugly, performance problems. There wasn’t a good reason to jump over to using any of that technology until very recently.” Docker usage is up, and the tools to manage Docker environments have been improved, especially on Mac. The last piece of the puzzle was ease-of-use and that’s where DDEV-Local came into the picture.

Adam saw someone mention DDEV on Twitter and decided to try it out. “Installation was a breeze.” If you meet the [system requirements](https://ddev.readthedocs.io/en/latest/#system-requirements), then [DDEV installation](https://ddev.readthedocs.io/en/latest/#installation) is a one-line command:

brew tap drud/ddev && brew install ddev

After installing DDEV-Local, Adam “was immediately impressed by the fact that it was both a global tool with commands and that it maintained a local, project-specific configuration layer. After installing the tool, I ran a few commands and ‘poof!’, a Drupal install!”

Now Adam is using DDEV-Local for his community contribution work and it makes it way easier to collaborate with containerized development. “I’ve found DDEV works elegantly for me,” he can spin up a Drupal site, write patches, and contribute more to the community faster than before. “I can do this really elegantly, very quickly.”

DDEV-Local fits in well with the tools Adam uses. For him, its killer features are speed, how easy it is to learn, and–[as others have told me](https://ddev.com/saving-time-and-making-money-with-ddev/)–the friendly, fast support provided by its maintainers at DDEV. “It’s command-line-based. It’s easy to use and learn, with good descriptions about what the commands do” and the [easy-to-use reference documentation](https://ddev.readthedocs.io/en/latest/users/cli-usage/) is helpful. “It makes it really easy.”

> **_Adam likes DDEV because it saves him time. As Adam told me, saving time “makes the work we do more enjoyable. It’s a quality of life metric.”_**

### DDEV is open source and supported

Since DDEV-Local is an open source project, it’s maintained in the open on GitHub, with [contribution guidelines](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) and an issue queue. There’s also a #ddev channel on[ Drupal’s Slack team](https://www.drupal.org/slack). Adam says “People are very welcoming,” on Slack and “they ask all the right questions.”

Adam has gotten fast responses every time he’s filed an issue or gotten on the DDEV team’s Slack Channel. “I try to do most of my technical work on my Linux machine, but if I’m traveling and on my Mac, they’ve resolved cross-platform issues for me.”

DDEV works in the open. DDEV-Local users can see [the tool’s roadmap](https://github.com/drud/ddev/wiki/Roadmap) on GitHub and understand when and how their requests are handled. As Adam said in his post, he has been “helping discuss the future of the product.” He feels like he’s listened to and finds it gratifying that improvements have been made based directly on his suggestions. Adam said, “They do a good job of keeping the product relevant for the work I’m doing.”

### Try out DDEV-Local today

When it comes down to it, Adam likes DDEV because it’s easy to learn and use. He saves time every time spins up an environment and the tool gets out of the way so he can focus on contribution. When he has ideas, he can contribute and see the open roadmap. When he runs into issues he’s been met with responsive service. This gives him a feeling of being welcome in the DDEV community.

**[Get started with DDEV-Local](/get-started/)**

Photo Credit – Banner Photo by [Johan Mouchet](https://unsplash.com/photos/sTBdWFQKDHE?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
