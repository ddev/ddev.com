---
title: "DDEV-Local Usage Statistics (Updated 2019-03-21)"
pubDate: 2019-03-21
summary: Usage statistics highlighting operating system, PHP version, project type, web server type, and Windows Docker providers.
author: Randy Fay
featureImage:
  src: /img/blog/2019/03/ddev-data-e1553211948905.jpg
  alt: "Four separate pie charts: Operating System, PHP version, CMS project type, and Webserver type"
categories:
  - Community
---

We introduced [opt-in instrumentation](https://ddev.readthedocs.io/en/stable/users/cli-usage/#opt-in-usage-information) using [Sentry.io](http://sentry.io) in [DDEV-Local v1.5.0](https://github.com/drud/ddev/releases) (December 2018). This feature sends some information about `ddev` usage so that we can understand our users better and help you do your best work. Now that we’re a few months in we’ve learned a number of things, and so appreciate those of you who opted-in to this feature.

If you want to try it out, please [download and set up DDEV](https://ddev.readthedocs.io/en/stable/) with your own project or one of our quickstart guides.

Of course, we only have information about DDEV-Local users who have opted in, and it’s a limited amount of data, but it’s super important to us and we thank you so much for allowing this information to be sent. It will help us enormously in learning how the community uses DDEV-Local and how best to serve you as we move forward developing the beta release of our hosting platform, DDEV-Live.

Some of the most interesting data so far:

![Operating System pie chart: macOS 58.6%, Linux 24.3%, Windows 17.1%](/img/blog/2019/03/1-os.png)

![PHP version pie chart: 7.2 68.9%, 7.0 10.4%, 5.6 8.6%, 7.1 6.1%, 7.3 6.1%](/img/blog/2019/03/2-php.png)

![CMS project type pie chart: TYPO3 40.5%, Dupral 8 26.9%, PHP 19.6%, Drupal 7 8.6%, WordPress 3.4%, Drupal 6 0.8%, Backdrop 0.2%](/img/blog/2019/03/3-cms.png)

![Webserver type pie chart: nginx-fpm 79.6%, apache-fpm 17.6%, apache-cgi 2.7%](/img/blog/2019/03/4-webserver.png)

![Docker usage on Windows pie chart: Docker for Windows 90.5%, Docker Toolbox 9.5%](/img/blog/2019/03/5-windows.png)

If you’d like to browse the actual numbers, the (rough) spreadsheet data is [available here.](https://docs.google.com/spreadsheets/d/135MIJBPQifLyssM-CjxGotH3XTrtdCTkcEOb9SQOU6E/edit?usp=sharing)

Again, thanks so much for using DDEV and for your many [contributions](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) to its success, whether by sending stats, suggesting features, supporting others, or [reporting issues](https://ddev.readthedocs.io/en/stable/#support). Thank you!
