---
title: "Reaching new audiences with scripts powered by DDEV"
pubDate: 2024-02-29
summary: Introduce DDEV in your team by leveraging its scripting capabilities.
author: Alberto G. Viu
categories:
  - Ideas
  - Inspirational
---
In the company where I work nowadays we develop plugins for several shop systems like WooCommerce, Magento, Shopware, Prestashop, and other not that known shop systems.
When I joined, the plugins team was maintaining a huge codebase of custom Docker images. After a few days using them, and after a few years using DDEV, I noticed quite a few
problems with their approach:

- These custom Docker images were very difficult to maintain, and they were duplicated all over different repositories.
- They lacked needed developer features like xdebug, logging, filesystem synchronization, or having several instances running at the same time without any conflict.
- They lacked configuration options for changing things like PHP or MariaDB versions, nginx or apache, etc, on the fly. Any configuration change would need recreate the image.

Working with those custom Docker images was a terrible experience and it made me realize how well done DDEV is designed and how good it works. The solution to this problem was
clear: I had to introduce DDEV in my new team.

Thankfully, I had experience doing the same before. Indeed, in my previous job, a Drupal focused web agency, I wanted to introduce DDEV 4 years prior in time. Back then, most of the developers
would offer resistance, specially senior developers which do not like anyone to tell them how to do their job or which tools to use. However, being around in that company
for a few years, I had a good reputation and most of the developers gave DDEV a try. After the usual problems that occur when you try something for the first time, most
of the developers really enjoyed DDEV and clearly saw its potential: it was much better local environment and they were more productive. It would not take much long time after DDEV
was officially the tool to use by default in any new project inside the company.

However, this time was different. I did not have any reputation as I was new in the job, so all I had was my enthusiasm about DDEV and the conviction that it was a better solution
for managing all the shop systems locally.

I then prepared a demo of how DDEV works using one of our shop systems, and showing the capabilities that DDEV offered. The reaction that I got from the developer team was very mild,
to my surprise. Yes, "it seems to work fine, but we already have something that _works_ _fine_". Those were the kind of comments I received.

I later realized that this was a common human behavior: aversion to change or resistance to trying something new. After all, they were accustomed to working with those custom Docker images.

From their perspective, the images simply functioned. Facing a half-hour wait for an image rebuild to experiment with a different PHP version was deemed a disruption to business. Their stance was, "It's not ideal, but that's the way things are.".

Some, however, attempted DDEV but found themselves disoriented by its distinct operation, configuration options, and the overall idea of a project residing within a container.

## Scripts powered by DDEV

So, I thought that in order to make DDEV more user friendly with them, I had to wrap DDEV in a script program that would really adapt to the development team's needs. A common set
of operations that were done every day were things such: installing a shop (with different versions), installing the plugin, configuring the plugin, configuring Ngrok,
clear caches, backup & restore the database...
It would be great to have a tool that could do all these operations automatically... for all the different shops that we support. It would require a lot of work, but
thanks to the command line capabilities that DDEV offer, it would be totally possible to do. Because DDEV is fully managed using the command line, and it offers a lot options.
Too many options, perhaps, for a newbie. But all these command line options give the flexibility that is needed for building a strong script program that runs powered by DDEV.

I started, then, working in such a tool. I built it using PHP with the help of Symfony packages, and distributing the binary using Phar. The tool's focus was to automate
the most common operations that one needs to do for managing a local shop system. The tool was abstracting the differences between each shop system, and in turn giving
a common interface of commands, which accept their own set of options.

## The result

It was now much easy to operate with all the shops we support, which are indeed very different each from each other. A dev only needed to learn a few commands which are common
for all shops. This translated into a notoriously improve in the team's productivity. Many of the problems that, before, may took a lot of time, now they were gone or reduced
drastically. This was specially noticeable when other members of the organization needed to use a local shop for a few tests. Using this tool was really much faster
and productive than having to deal with the old way based on custom Docker images.

And this success was due to DDEV's flexibility and design, because is not only a tool that you can use by your own, but it can also be the core of a more sophisticated tool widely
used within your organization.

## In conclusion

Developers are humans and, as such, they are skeptical to changes or new tools. Introducing DDEV in a stablish team can be challenging. But building a tool on top of DDEV, in a way that
it focus on automating the most common operations, can be a game changer. It worked for my team, and it can work for your team too.
