---
title: "DDEV Release v1.2.0 – Apache support and DDEV UI Alpha"
pubDate: 2018-09-12
author: Kory Cunningham
featureImage:
  src: /img/blog/2018/09/img-20180910-093208.jpg
  alt:
  caption:
  credit: "Photo by Elli Ludwigson."
categories:
  - Announcements
---

We’ve just released DDEV v1.2.0! The big news this release is the DDEV UI Alpha available now, and DDEV has experimental Apache support. We’re looking forward to your feedback so we can fine-tune how these work for you.

There are also a number of bugfixes, docs fixes, and automated testing improvements. For full details check out the [DDEV v1.2.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.2.0).

**We’re in Drupal Europe this week!** In the photo above, that’s Andrew French and Elli Ludwigson in the contribution lounge. So if you’d like a demo and some help getting started, please stop by a say hi! You can find us helping out with [Quicksprint](https://github.com/drud/quicksprint), a toolkit to get people started contributing.

### An important upgrade step

If you’re updating from a version before DDEV v1.1.0, and you have customizations to your Docker compose files you’ll need to take these manual steps with each existing project.

1. Temporarily remove any docker-compose.\*.yaml customizations you’ve made.
2. Run `ddev config` in your project directory to update your .ddev/config.yaml
3. After verifying correct operation, make sure any docker-compose.\*.yaml has the first line changed to `version: '3.6'`, then run `ddev start`.

### Try out the Apache support

With DDEV v1.2.0 we’ve introduced experimental Apache support. We want to hear directly from our users how it works in the wild. You can now run with apache-with-php-fpm (apache-fpm) or apache-with-cgi (apache-cgi).

Check out [the documentation on how to change web server type](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#changing-webserver-type).

### Download DDEV UI Alpha!

Our mission at DRUD is to create tools and services which make it easier for your teams to collaborate and be creative. The new DDEV UI is a part of that. Many DDEV fans suggested this would be great for people on their team who aren’t comfortable with the command line, for example on their design teams. Now you can get everyone on the same page. Share the Alpha release with your colleagues, we’re looking forward to hearing from you.

[Download DDEV UI](https://github.com/drud/ddev-ui/releases/tag/v0.4.1-alpha)

Right now DDEV UI supports macOS. We’re busy working on Windows and Linux.

**Preparing the way for more DDEV UI features**

You may notice in the release notes new configuration options. These allow for additional flags such as PHP version, additional hostnames, and so forth. This is to make the way for more controls available from DDEV UI.

### Events: Get to know DDEV!

If you’re at [Drupal Europe this week](https://ddev.com/events/see-you-at-drupal-europe/), don’t miss the contribution sprints on Friday. You can get ready to contribute with [Quicksprint](https://github.com/drud/quicksprint).

We’ve also sent along some stickers for [TYPO3 Camp Munich](https://typo3camp-munich.de/) this weekend, so don’t miss out!

> Nice [@mattLefaux](https://twitter.com/mattLefaux?ref%5Fsrc=twsrc%5Etfw) got a new laptop! First sticker? [#DDEV](https://twitter.com/hashtag/DDEV?src=hash&ref%5Fsrc=twsrc%5Etfw)! Lookin’ good, Mathias! ? Say hi to the DRUD team at [#DrupalEurope](https://twitter.com/hashtag/DrupalEurope?src=hash&ref%5Fsrc=twsrc%5Etfw) and pick up some [#stickers](https://twitter.com/hashtag/stickers?src=hash&ref%5Fsrc=twsrc%5Etfw) [pic.twitter.com/V4Wd2jMHaL](https://t.co/V4Wd2jMHaL)
>
> — DRUD Technology (@drud) [September 11, 2018](https://twitter.com/drud/status/1039491681840713734?ref%5Fsrc=twsrc%5Etfw)
