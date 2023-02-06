---
title: "Sandboxes – Local development environments to play in"
pubDate: 2018-04-26
summary: How to play and learn safely using DDEV as a local sandbox environment.
author: Heather McNamee
featureImage:
  src: /img/blog/2018/04/developers-playing-in-sandboxes-e1524554749706.jpg
  alt: Shallow-focus closeup photo of a toddler kneeling in a sandbox with brightly-colored little buckets
  credit: "[Kaboompics .com from Pexels](https://www.pexels.com/photo/little-boy-playing-in-the-sand-6459/)"
categories:
  - DevOps
---

Developers are constantly trying new things, learning new skills and techniques. A lot of learning means trying things out, playing, and making mistakes. And there’s a lot to learn if you’re using open source CMSs with hundreds of potentially useful extensions, modules, or plugins to experiment with. In this post we’ll look at how using [DDEV-Local](https://ddev.ddev.com) can help you learn and experiment, using “sandboxed” environments where you can isolate your play … (learning!) … from your work.

### Every day is a school day for web developers

Did you ever stop yourself trying something new because it might ruin whatever it is you’re working on? What you want is a safe way to play and practice new things. Even as an adult, play and experimentation are important for learning new things.

If you’re a developer working in a digital agency environment, you’re working with clients who have vastly different needs–from government to e-commerce, to mapping, to intranets. It seems with each client project, you build a whole new set of skills. DDEV-Local user Danita Bowman of [DSquaredB Consulting](https://dsquaredbconsulting.com/) said: “Every time a client wants something new, I have to go learn that.” Even if you have done it before, you’re always making sure you’re keeping up with trends and new developments.

The automation tools built into DDEV-Local make it easy to spin up new environments on a whim. Because they are based in containers, you have control over the details of configuration for each sandbox. You can match a client’s production environment or test what would happen when you upgrade a dependency to suit some new code you want to incorporate. [Joe Shindelar said](https://ddev.com/ddev-local/rapid-local-development-ddev/) he likes to use DDEV-Local to make sandbox environments, “I can spin something up, test out a couple of ideas. See yep that works, destroy it.”

### Try new things in sandboxes

Developers who use open source take a “try before you buy” approach to development. Before they write a line of code, they (should) check to see if there’s an available project that suits their needs. Each time, they must carefully [evaluate the open source project](https://opensource.com/life/14/1/evaluate-sustainability-open-source-project) to see if it’s good quality and the right fit for their needs. Project pages contain valuable information such as the release history, giving you an idea of the relative health of the project. Some include information about the user base. [Project pages in the TYPO3 extension repository](https://extensions.typo3.org/extension/gridelements/) show the number of downloads. Even better, [project pages in the WordPress Plugin directory](https://wordpress.org/plugins/bbpress/) include the number of active installations.

Usually, you can browse the code online without downloading anything, but you won’t get a feel for how it works until you can try it out. Many WordPress developers create websites for their plugins and themes. They provide demos you can log into, such as [WP Job Board ](https://wpjobboard.net/demo/)or the [live demo for the Boss Theme for BuddyPress](https://www.buddyboss.com/live-demo/).

Similarly, the Drupal community also has an in-browser tool to test out new modules called [SimplyTest.me](https://simplytest.me/). However you may still want to download the new project, so you can install it on a specific site, and see how easy it is to integrate with your existing codebase.

You won’t know how any new module, extension, or plugin interacts with your current application until you try it out. And surprises are the last thing you want. Keep these environments isolated using container-based tools like DDEV-Local. Rick Manelius, Chief Product Officer here at DRUD said, “This is the container advantage. Spin up, test, explore, and BREAK. Because you’re using containers you’re not going to break whatever else you’re working on. It’s not like MAMP, where you tweak your PHP.ini and all of the sudden nothing else works.”

### Use DDEV-Local to start your new code playground

Once you’re using DDEV-Local, you can have a [WordPress local development environment](https://ddev.com/one-minute-wordpress/) up in a minute. The same goes for Drupal, TYPO3 CMS, and Backdrop CMS. If you’ve never used Docker or containers before, don’t worry. DDEV takes care of all the complication, so you don’t have to tinker with it if you don’t want to. DDEV’s got your back, go test that new plugin!

To get started with DDEV-Local, you’ll need to meet the [system requirements](https://ddev.readthedocs.io/en/latest/#system-requirements) with Docker running for your operating system. After that, you can [install DDEV-Local](https://ddev.readthedocs.io/en/latest/#installation). Since you’ll be testing and playing on an existing project, follow the [Quick Start instructions](https://ddev.readthedocs.io/en/latest/users/cli-usage/#quickstart-guides) for WordPress, Drupal 6/7, Drupal 8, TYPO3 CMS, Backdrop CMS, or WordPress.

When you follow those steps, you’ll clone your existing project, configure it and then start your project. Next you’ll [import your database](https://ddev.readthedocs.io/en/latest/users/cli-usage/#database-imports). Then you can `ddev describe` to get information about your project, for example the credentials if you need them.

Two things to note, if you’re new to DDEV-Local:

- DDEV-Local provides the web and database server for you to work on. If you already have a web server or database running on your machine you might get an error message if, for example, the localhost port 80 is in use. Follow the steps to [fix the port conflict](https://ddev.readthedocs.io/en/latest/users/troubleshooting/#webserver-ports-are-already-occupied-by-another-webserver).
- Before importing any databases for your project, first remove its wp-config.php if using WordPress – or settings.php file in the case of Drupal 7/8, if present.

After that, making new sites is a breeze. Each time you want to set up a new site, you change to your project’s directory in your terminal, and `ddev start` to get going.

All done? Then `ddev remove` to finish up. It’s good to know that by default, [ddev remove is not destructive](https://ddev.readthedocs.io/en/latest/users/cli-usage/#removing-a-project), it removes the container but not the database. (Though you can add the `--remove-data` flag to destroy the data if you need to.)

So next time you want to start that environment up again? You guessed it, `ddev start` is all you need.
