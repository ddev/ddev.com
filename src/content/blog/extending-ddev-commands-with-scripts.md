---
title: "Team-specific scripts can make DDEV accessible to new teams"
pubDate: 2024-03-24
summary: Introduce DDEV to your team by leveraging its scripting capabilities.
author: Alberto G. Viu
featureImage:
  src: /img/blog/2024/03/new-developer-brings-ddev.png
  alt: Introducing DDEV to a new team isn't always easy!
  credit: 'Ideogram.ai: A new software developer brings a scroll with "DDEV" on it into a room full of young, diverse but intimidating software developers.'
categories:
  - Guides
---
In the company where I currently work we develop plugins for several "shop" systems, including WooCommerce, Magento, Shopware, Prestashop, and other lesser-known systems.
When I joined, the plugins team was maintaining a huge codebase of custom Docker images. After a few days using them, and after a few years using DDEV, I noticed quite a few
problems with their approach:

- These custom Docker images were very difficult to maintain, and they were duplicated all over different repositories.
- They lacked needed developer features like Xdebug, logging, filesystem synchronization, or having several instances running at the same time without any conflict.
- They lacked configuration options for changing things like PHP or MariaDB versions, nginx or apache, etc, on the fly. Any configuration change would need recreate the image.

Working with those custom Docker images was a terrible experience and it made me realize how well done DDEV is designed and how good it works. The solution to this problem was
clear: I had to introduce DDEV in my new team.

Thankfully, I had experience with this. In my previous job, a Drupal-focused web agency, I introduced DDEV to the team. Back then, most of the developers
offered some resistance, especially senior developers who don't like anyone telling them how to do their job or which tools to use. However, after being around in that company
for a few years, I had a good reputation and most of the developers gave DDEV a try. After the usual problems that occur when you try something for the first time, most
of the developers really enjoyed DDEV and clearly saw its potential: it was much better their previous local environment and they were more productive. It didn't take long before DDEV
was the official tool to use in any new project.

This time I had more trouble. I was new to the job and did not have an established reputation, so all I had was my enthusiasm about DDEV and the conviction that it was a better solution.

I prepared a demo of how DDEV works using one of our shop systems, showed the capabilities that DDEV offered. The reaction that I got from the developer team was not what I had hopeed Yes, "it seems to work fine, but we already have something that _works_ _fine_". 

I later realized that this was a common human behavior: aversion to change or resistance to trying something new. After all, they were accustomed to working with those custom Docker images.

From their perspective, the images did the job. Facing a half-hour wait for an image rebuild to experiment with a different PHP version was deemed a disruption to business. Their stance was, "It's not ideal, but that's the way things are.".

Some, however, attempted DDEV but found themselves disoriented by its distinct operation, configuration options, and the overall idea of a project residing within a container.

## Scripts powered by DDEV

So, I thought that in order to make DDEV more user friendly with them, I had to wrap DDEV in a script program that would really adapt to the development team's needs. A common set
of operations that were done every day were things such: installing a shop (with different versions), installing the plugin, configuring the plugin, configuring Ngrok,
clear caches, backup & restore the database...
It would be great to have a tool that could do all these operations automatically... for all the different shops that we support. It would require a lot of work, but
thanks to the command line capabilities that DDEV offer, it would be totally possible to do. Because DDEV is fully managed using the command line, and it offers a lot options.
Too many options, perhaps, for a newbie. But all these command line options give the flexibility that is needed for building a strong script program that runs powered by DDEV.

I started, then, working in such a tool, which I visualized as a local shop manager (in short, "lsm") with the following set of goals:

- Each needed operation would translate in a command for lsm, like: initialize the containers, install the shop in the containers, remove them, download a specific version of the plugin, install the plugin, uninstall the plugin, configure the plugin, etc...
- Strong focus in flexibility, with a lot of settings supported and that each command can declare. All the settings will be provided in a yaml file, or by CLI arguments.
- Provide as many default settings values as possible to ensure that lsm works in most of the cases out of the box.
- Total abstraction from the shop systems: the workflow for managing a shop (magento, woocomerce, prestashop, etc...) would be exactly the same regardless which shop is being managed. So the end users need to learn one workflow of lsm commands and they can then manage all the shops.
- Make the tool as easy to use as possible, with an independent documentation. Starting with a 'help' command that can describe all the other commands and the options that are accepted.
- Built with latests PHP features, using Symfony project when needed (yaml...), PHPUnit...
- Use Phar format for distributing the lsm tool, which also has its own version lifecycle and self-update options.
- Possibility of having several instances installed at the same time without any conflict.

Under the hood, every command is retrieving the settings from the environment, doing necessary changes using PHP (change folders, create files...), and then calling the appropriate ddev command for the real action: config, start, stop, export-db, import-db, exec, share, composer... The tool abstracts DDEV for most of the users, because they do not need to use the ddev command-line tool for most of the operations...

As an example, consider the steps for installing a shop, like for example [Shopware](https://ddev.readthedocs.io/en/stable/users/quickstart/#shopware).
The lsm tool, and due to business needs, has to support all (recent) versions of this shop. And for ensuring that the installation always works the tool needs to set the versions of the dependencies of shopware, like PHP or mariadb, before running the ddev commands, like 'config', for each major version (sometimes, even minor version) of the shop. The user has the need of installing a shop locally, and lsm provides a command for that. The user does not care about how the shop is installed or the differences between different shop versions.

lsm offers a simplified and more focused experience compared to DDEV's out-of-the-box experience: DDEV is the general tool that can achieve everything. On the other hand, lsm, powered by DDEV, is the specific tool for doing specific operations. For most users, lsm is enough. For most advanced users, lsm is a first step toward using DDEV.

## The result

It is now much easier to operate with all the shops we support, which are indeed very different each from each other. A user only needs to learn a few commands, and they are common for all shops. This translates into significantly improves team productivity. Many of the problems that previously took a lot of time are gone or reduced significantly. This was particularly noticeable when members of the organization needed to use a local shop for a few tests. Using this tool was really much faster than having to deal with the old custom Docker images. Installing a shop locally was no longer a headache.

The feedback was mostly positive, and feedback helped to push along lsm's development to support more and more shops and features. There have been 26 releases and almost 400 commits after a year and a half of internal development.

I consider it a success, and I wanted to share it with you. And this success was due to DDEV's flexibility and design, because it is not only a tool that you can use by your own, but it can also be the core of a more sophisticated tool widely used within your organization.

While lsm has been instrumental in our success, it's important to note that this tool is not publicly available and there are no plans to release it at this time.

## In conclusion

Introducing DDEV to an established team can be challenging. Some team members may see DDEV as a complex tool to use, with many options and features. Some even may feel lazy about having to learn a new tool, or convinced that the way things are is good enough. Focusing on simplifying the user experience and automating the most common operations can be a game changer and can even change the minds of most senior developers in the team.
DDEV's command line interface is flexible enough to allow more focused tools to be built on top of it.
It worked for my team, and it can work for your team too.
