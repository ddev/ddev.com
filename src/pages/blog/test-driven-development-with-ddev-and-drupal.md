---
title: "Matt Glaman’s Guide to Test-Driven Development with DDEV and Drupal"
pubDate: 2019-01-30
author: Heather McNamee
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2019/01/mike-enerio-87665-unsplash-e1548857780487.jpg
categories:
  - DDEV
---

We caught up with Matt Glaman from [Commerce Guys](https://commerceguys.com/), who was first introduced to DDEV at [DrupalCamp Florida](https://www.fldrupal.camp/) 2018\. Since then, he’s been an avid DDEV user, contributing great feedback and writing [blog posts](https://glamanate.com/tags/ddev) to help other DDEV users. He wrote about learning how to use [Xdebug over the command line](https://glamanate.com/blog/xdebug-over-command-line-ddev) and even a whole series on testing, which we’re going to look at in this post.

Matt Glaman is an active member of the DDEV community, [Randy Fay pointed out](https://twitter.com/randyfay/status/1090727584457940993) that “Matt [also took up GoLang](https://glamanate.com/blog/goland-ide-and-local-vendor-directories) and made \*significant\* contributions to ddev. The [docroot detection he wrote](https://github.com/drud/ddev/pulls?q=is%3Apr+author%3Amglaman+is%3Aclosed) has made ddev ever-so-much better.” Thanks Matt!

### Tell us a bit about yourself, Matt!

![](https://ddev.com/app/uploads/2019/01/author-matt-glaman-e1548869414810-1024x966.jpg)

I’m Matt Glaman. I’ve been working with Drupal for a little over six years, now. I first got into web development so that I could make a website for our Rainbow 6 clan, back in the good old days of MSN Zone and using Tripod UK so I could get free hosting that supported PHP.

I joined Commerce Guys in 2015 after contributing to Drupal Commerce 1.x on a personal basis while working for two other Drupal-related businesses. I help co-maintain Commerce 2.x and a wide variety of contributed modules and work primarily with other agencies to help implement large Commerce 2.x projects successfully. I also remained a part of the core team at Commerce Guys when it split from Platform.sh to refocus on Drupal Commerce in 2016.

### You’ve written [a three-part series about test-driven development](https://glamanate.com/tags/testing) with Drupal. What was the big change with writing tests in Drupal 8?

Drupal 8 adopted [PHPUnit](https://phpunit.de/) and deprecated Simpletest. This is probably one of my most favorite things about Drupal 8\. Really. Writing tests for Drupal 7 was abhorrent and I like to work in a test-driven development mode.

With the [KernelTestBaseTNG™](https://www.drupal.org/node/2304461) issue, Drupal core officially moved to being based on top of PHPUnit for Kernel and Unit tests. Soon more test types were to follow, such as [browser tests](https://www.drupal.org/node/2232861) and [JavaScript testing](https://www.drupal.org/node/2469713).

PHPUnit is the de facto xUnit implementation for PHP. That means Drupal tests are now written using the same testing infrastructure as Symfony and most other PHP projects. In fact, one of our earliest contributors for Drupal Commerce 2.x was new to Drupal but able to contribute code because they could easily write tests.

### That shows that when open source projects standardize, they make it easier for new contributors. What prompted you to write this series?

A few years ago, I wrote [a blog post for Drupal Commerce users](https://drupalcommerce.org/blog/45322/commerce-2x-unit-kernel-and-functional-tests-oh-my) that helped explain the different test suites and how to run them—especially PhantomJS for the JavaScript tests. Recently, before writing the series, Drupal had finally dropped PhantomJS in favor of Chromedriver. After Chrome announced headless support, PhantomJS became antiquated as it was a headless WebKit browser. PhantomJS was also buggy and using Chrome via Chromedriver makes things must more stable.

However, it is still hard for people to run tests locally, at least the JavaScript tests. This is especially true now that Nightwatch.js—a JavaScript testing framework which also runs Chromedriver—was added.

So I decided to write about how DDEV can make life easier.

### “Making life easier,” that’s what DDEV is aiming for! Tell us what you used for development before DDEV, and why you switched?

Before DDEV I managed my own tooling called [platform-docker](https://github.com/mglaman/platform-docker). This was before Lando, Docksal, DDEV, and such. DrupalVM had just come out. I had been using Vagrant based tools but kept running out of disk space due to the sheer size of each VM required to meet client requirements. Then I found out about DDEV at Florida DrupalCamp 2018.

I was glad I could finally drop my own blob of tooling and use a shared tool. I got sick of having to not only manage client sites but also manage my own tooling. I also stopped having to cycle through new projects. I would only have to spin up a new environment once every few months.

I switched to DDEV so that I could just contribute to a tool and have what goodies I liked and take in goodies from others. We have also made DDEV our official local stack tool at Commerce Guys. It has allowed us to streamline local environments without any issues. We have projects set up for testing and Blackfire.io so everyone can do performance profiling.

### Thanks, Matt!

Thanks for all your contributions, Matt. It’s great that you’re investing the effort you used to put into your own tools into DDEV and helping so many other people. You sharing your knowledge with the community is making a big difference to a lot of developers.

### Learn more …

Matt Glaman wrote the [Drupal 8 Development Cookbook](https://www.packtpub.com/web-development/drupal-8-development-cookbook-second-edition), which includes 60 hands-on recipes that get you acquainted with Drupal 8\. Matt will be speaking at [MidCamp](https://www.midcamp.org/) (March 20-23, 2019), and DrupalCon Seattle (April 8-12, 2019) about [delivering headless eCommerce with Drupal Commerce](https://events.drupal.org/seattle2019/sessions/delivering-headless-commerce).

Read Matt Glaman’s series on test-driven development with Drupal and DDEV.

**Part 1\. [Running Drupal’s PHPUnit test suites on DDEV](https://glamanate.com/blog/running-drupals-phpunit-test-suites-ddev).** How to execute PHPUnit from within the web container in DDEV for Unit, Kernel, and Functional tests.

**Part 2\. [Running Drupal’s FunctionalJavascript tests on DDEV](https://glamanate.com/blog/running-drupals-functionaljavascript-tests-ddev).** How to Chromedriver running to execute the FunctionalJavascript test suite.

**Part 3\. [Running Drupal’s Nightwatch test suite on DDEV](https://glamanate.com/blog/running-drupals-nightwatch-test-suite-ddev).** How to run Drupal’s newest testing framework: Nightwatch.js, for end-to-end tests in Node.js run against a Selenium/WebDriver server.

### Sign up to the mailing list!

You’ll be the first to know about tips, tutorials, and community news.

[Join the DDEV Newsletter](http://eepurl.com/dlqkUD)

Photo by [Mike Enerio](https://unsplash.com/photos/2IkxeDKaZdY?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText).
