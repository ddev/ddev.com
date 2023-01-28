---
title: "Reduce the Time to Onboard New Developers with DDEV"
pubDate: 2020-08-12
author: DDEV
featuredImage: https://ddev.com/app/uploads/2018/05/bruce-mars-548722-unsplash.jpg
categories:
  - DDEV
---

Getting new developers up to speed with your procedures and their projects can be a time-consuming and complex process. Unfortunately, we’re still hearing stories about new hires taking as much 1-2 days to get their laptops properly set up and 1-2 weeks of onboarding before they can deliver code to production. In today’s competitive, fast-paced world, the amount of wasted time is untenable at best. The faster a team can deliver code to production, the better. However, you can’t cut corners without causing quality and efficiency to suffer. In this article, we’ll take a look at the process of onboarding new developers and discuss how the right development tools, like [DDEV-Local](https://ddev.com/ddev-local/), can help.

## Why is it important to streamline developer onboarding?

When you’ve just made a bet on a talented, promising new hire, of course you don’t want to risk them making expensive mistakes. But why waste their time and your bottom line by not getting them up-and-running as fast and as well as possible? In the 2018 StackOverflow Developer Survey, more than 50,000 software developers from around the world answered the question, “[How Long Do Developers Expect New Coworkers to Take to Be Productive?](https://insights.stackoverflow.com/survey/2018#work-how-long-do-developers-expect-new-coworkers-to-take-to-be-productive)” 70% answered that it would take one month or more. We aimed to help speed that up.

Update: While the [2020 StackOverflow survey](https://insights.stackoverflow.com/survey/2020#work-onboarding) does not have the same question, it does ask if an onboarding process exists. The chart is a bit ambiguous but suffice to say half of the respondents were unsatisfied with the lack of onboarding process, or lack of good onboarding process, at their company.

![Half of respondents reported having an onboarding process, one fifth reported no on boarding process](https://ddev.com/app/uploads/2018/05/Screen-Shot-2020-08-11-at-7.17.40-PM-1024x466.png)

Five years ago, we had a constant problem when a new person came on at my old agency. A new hire would come in and everyone was running around too busy to help, but the new person still couldn’t access, download, and set up the site they were tasked to work on. Instead of getting to it, they were effectively told, “Here, wait until someone is available, and sit on your thumbs.” How demoralizing! Particularly for high achievers who want to jump in and make a big impact out of the gates. Fortunately, we knew we were on the right track with the tools we built as early versions of DDEV-Local. We got onboarding down to a where we had new developers and designers contributing their first commit to production by lunchtime on their first day. This was the benefit of having consistency in our teams and our onboarding process.

That’s why it’s so important to onboard new developers consistently and systematically. By giving them the information they need about workflows, tools, and projects, they can quickly adapt to how things are done at your agency. It’s not just a time savings. It’s how much more efficient you can be with a consistent process. This becomes even more important as the organization grows and independent teams need to start forming, causing processes to drift apart to the point where teams are unable to effectively working together.

In turn, consistency leads to a faster “time-to-productivity” for new team members and contractors alike, which in turn, ties to concepts of motivation and autonomy that Daniel Pink describes in his book[ Drive](https://en.wikipedia.org/wiki/Drive:%5FThe%5FSurprising%5FTruth%5FAbout%5FWhat%5FMotivates%5FUs). “The first week on the job is always going to be stressful for new team members, but enabling them to make a contribution early on helps them feel they are moving towards the Autonomy, Mastery, and Purpose that Pink talks about in his book,” explains my colleague Kevin Bridges, DDEV CTO.

Of course, this is all great in theory. But how can you make sure your onboarding process is thorough, comprehensive, and provides your new devs with everything they need to get started?

### Some onboarding challenges

One challenge of developer onboarding is assumed knowledge. Current team members already have a lot of knowledge about current projects and systems gained over their time in your organization. It can be hard for them to have the perspective distinguish between what’s essential what’s need-to-know (or nice-to-know) for new hires. How to communicate what and when in and around this knowledge gap can add to the stress during onboarding. Worse, if there are many different ways of doing something (even as simple as setting up and configuring a laptop with a local environment), you can find yourself in a situation where new hires can only receive support from the person that onboarded them versus the broader organization.

You’ll need to help prioritize this information, get your developers familiar with the basics first – and to let them start making contributions on their own. In this article about[ The Secret Behind Great Developer Onboarding](https://stackoverflow.blog/2018/02/05/secret-behind-great-developer-onboarding/), two Runtastic employees suggest “Write code, learn about the company, and get to know your colleagues”, including using a buddy system, pairing new devs with someone who knows the ropes.

Faster doesn’t always equal better. Care should be taken not to rush the onboarding process or cut corners. A junior developer’s[ Reddit CS Career Questions post](https://www.reddit.com/r/cscareerquestions/comments/6ez8ag/accidentally%5Fdestroyed%5Fproduction%5Fdatabase%5Fon/) is a great illustration of this. This junior employee was given incorrect information about how to set up their development environment and ended up wiping the entire production database. While this is an extreme case, this is the sort of thing you’ll face if you don’t have systematic, consistent onboarding procedures.

Codementor.io posted a great follow-up post in reaction to this Reddit post:[ 7 Best Practices for Your Developer Onboarding Process](https://www.codementor.io/blog/developer-onboarding-process-32y3zqg1vc). The[ Awesome Onboarding project](https://github.com/92bondstreet/awesome-onboarding) on GitHub has more valuable resources in this vein.

### Consistency is key to onboarding and delivery quality

Maintaining consistent development environments across different projects helps make developer onboarding faster and your teams more efficient. Whether you’re talking about working on client projects, or collaborating on open source projects, for newcomers – [the biggest barrier to contribution is getting a local development environment set up](https://ddev.com/ddev-live/removing-the-biggest-barrier-to-contribution/).

As the team grew in the agency, so did the number of ways to configure and set up local development environments. This stifled collaboration. Whether or not you could work on a project depended on who had onboarded you to their idiosyncratic methods. We knew we couldn’t scale and improve if we didn’t have a consistent process. That was a major motivating factor in building the tools that became DDEV.

Now you can use DDEV-Local to work on all your projects, no matter what open source CMS and deployment models you are using. Once you know a few simple commands, you can spin up any project on your local machine and get to work. And once you are familiar with it, you can apply your knowledge to projects across the board, easily sharing and spinning up projects from any existing configuration.

## Improve developer onboarding with DDEV-Local

Here are two ways that DDEV-Local helps get your team members on board:

### Consistency across platforms

DDEV-Local offers a single, consistent set of commands when working on projects, across multiple CMSs and across all the major operating systems, no matter what deployment model a project requires. Clients with multi-site portfolios may run Drupal sites, WordPress sites, or even Node.js applications and keep everything running smoothly. DDEV-Local provides a cross-platform PHP-based development environment that works the same on macOS, Windows, and Linux. Update: In our latest [DDEV-Local release, v1.15.3](https://github.com/drud/ddev/releases/tag/v1.15.3), hundreds of tools, including Node.js, npm, Yarn, Drush, WP-CLI, and mysql are pre-installed in the web container. This means you can use DDEV-Local across your on-going projects.

By having a consistent approach you make it easier for team members to reuse what they learn for their first project, and apply it to the next.

### Take the guesswork out of getting started

Previously, I wrote about[ Project Reference Guides](https://ddev.com/workflow/the-practicality-of-project-reference-guides/) to show how a simple-to-maintain resource can effectively improve communication and handoffs between teams. One of those challenges is keeping track of the credential and dependencies for any particular client project, as well as the tools required to get client sites built and running locally so you can get to work.

When a team member wants to start collaborating they’ll need to [import assets for an existing project](https://ddev.readthedocs.io/en/stable/users/cli-usage/#importing-assets-for-an-existing-project). The first time they set it up, they can run `ddev describe` to see details about the status of the project and in-depth application monitoring. This also provides the project credentials they need to get started.

[Extend ddev Commands](https://ddev.readthedocs.io/en/stable/users/extending-commands/) to run tasks, for example before or after a project starts. To automate setup tasks specific to your project, define them in the project’s config.yaml file. This can make it easier for your team to employ best practices and greatly reduced the time it takes to scaffold a project.

## Get started with DDEV-Local

With DDEV-Local, you can speed up developer onboarding dramatically, while ensuring that new developers have all of the information they need to be effective.

[Get started with DDEV-Local](https://ddev.readthedocs.io/en/stable/#intro-to-ddev-local) today and see how easy and reliable a local development environment can be.

Photo credit hagman23 Pixabay  
Originally published May 17, 2018
