---
title: "Real World Performance Gains Using Docker for Mac’s User-guided Cache"
pubDate: 2017-06-08
author: Rick Manelius
featuredImage: undefined
categories:
  - Performance
  - Guides
---

With more and more Drupal and WordPress developers turning towards virtualization and containerization for their continuous integration and/or delivery strategy, it becomes increasingly important to make sure their local development tools are easy to use and performant. Unfortunately, developers using those using Docker for Mac on macOS have had to face some fairly steep performance penalties as [outlined here](https://docs.docker.com/docker-for-mac/osxfs/#performance-issues-solutions-and-roadmap). The most notable is when using bind-mounted volumes in order to allow developers to edit the codebase from inside and outside the container without needing to manually sync changes between them.

Thankfully, Docker for Mac recently released a [user-guided caching feature](https://blog.docker.com/2017/05/user-guided-caching-in-docker-for-mac/) as part of their ongoing initiative to address performance issues related to macOS. We were able to easily introduce this feature into our latest release of ddev, which is an open source, platform independent local development tool for WordPress and Drupal developers. The results were highly encouraging (see below for details), with our manual and automated tests showing speed gains ranging from 20% to 400% across many typical tasks!

### Implementing User-guided Caching

In order to use this functionality, you need to be running Docker for Mac 17.04 Edge, which will then enter the stable branch at 17.06\. As of the time of this blog article, you will need to download the edge version [here](https://docs.docker.com/docker-for-mac/install/). Once you’ve done that, you only need to append “:cached” to the end of the mount path specified in your Docker run command. Example below:

```
$ docker run -v /User/host/path:/container/path:cached command
```

Alternatively, if you are using Docker Compose, you can make a small modification to your `docker-compose.yml` file as discussed [here](https://github.com/drud/ddev/issues/253). Similar to the `docker run` example, simply append `:cached` to the end if the path where you specify the mount volume. Example below:

```yaml
web:
volumes:
  - "/User/host/path:/container/path:cached"
```

### Performance Gains

For those using ddev for Drupal 8 development on macOS, the result of this change is a night and day difference. Before user-guided caching, even simple page requests were noticeably and unacceptably slow. After user-guided caching, many of these issues were completely eliminated. For example, note the 2X improvement in the [initial site install time](https://github.com/drud/ddev/issues/253#issuecomment-303728071) both when using Drupal’s GUI or the Drush CLI.

| Caching        | Disabled | Enabled | Disabled | Enabled |
| -------------- | -------- | ------- | -------- | ------- |
| Install Method | GUI      | GUI     | CLI      | CLI     |
| Time           | 3:20     | 1:30    | 1:10     | 0:40    |

_Table 1: Timing the Drupal 8 site install time using the standard profile. We compared the difference of using the `install.php` page through the web browser versus a `drush site-install` on the command line. We then compared the difference before and after user-guided caching was enabled._

While the Drupal 8 site install time represents an extremely taxing process, it’s not the most common day to day task that would affect a developer. To that end, we created a suite of automated tests that check everything from homepage load time to accessing typical admin areas of the site. The before and after results of user-guided caching are available in the [following public google doc](https://docs.google.com/document/d/1nFbL1QekrVmKCcn8ENH25Um2MMh%5F30vfnVe2v1Uz6qE/edit). Depending on the specific area, we see up to a 20% to 400% improvement in overall page load time when user-guided caching is enabled.

### Future macOS Performance

While these gains are certainly impressive, it’s just one of many performance enhancements being worked on by the Docker for Mac team in order to ensure macOS users have a performant experience while using containers for local development. See [their detailed overview](https://docs.docker.com/docker-for-mac/osxfs/#performance-issues-solutions-and-roadmap) for more information.

Until then, Drupal, WordPress, TYPO3 CMS, and Backdrop CMS developers can start benefiting from this today by [downloading DDEV](https://github.com/drud/ddev/releases).

**[Get started with DDEV-Local](/get-started/) today!**
