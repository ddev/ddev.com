---
title: "Open source collaboration: signing_tools for macOS Catalina"
pubDate: 2020-05-13
summary: The tools behind DDEV’s code signing on macOS Catalina.
author: Randy Fay
featureImage:
  src: /img/blog/2020/05/signing.png
  alt: Partially-redacted terminal screenshot of macOS signing process, with emphasis on “Package Approved”
categories:
  - DevOps
---

As Apple has ratcheted up the pressure on developers with new security requirements, we wanted the users of both [DDEV-Local](http://ddev.com/ddev-local) and [DDEV-Live](http://ddev.com/ddev-live) to have command-line tools they could depend on without macOS Catalina randomly disabling them and making life difficult. It’s been a challenging task, with Apple first requiring code signing and then later increasing the requirement to notarization (actually submitting the binary to Apple for review).

Along the way, we noticed that we needed to do the exact same thing for our DDEV-Local and DDEV-Live binaries, and we noticed that it was getting more and more complex. So we split out the logic scripts into their own repository, [drud/signing_tools](http://github.com/drud/signing%5Ftools), and fashioned our build processes to use that for signing and notarization.

If you have binaries that you need to run on macOS Catalina and above, you can use these same tools. [macos_sign.sh](https://github.com/drud/signing%5Ftools/blob/master/macos%5Fsign.sh) and [macos_notarize.sh](https://github.com/drud/signing%5Ftools/blob/master/macos%5Fnotarize.sh) do the job shown, and can be incorporated into most any CI/CD system.

The [README](https://github.com/drud/signing%5Ftools/blob/master/README.md) explains all the gory details behind these tools, including Apple’s policies. And you probably need to have a basic understanding of the big picture to use these tools successfully. But you don’t have to write your own process!

(We’ve also been signing our DDEV-Local Windows binary and installer for a really long time. That was an easier process, but we expect to incorporate that process into signing_tools as well in the future.)

Both DDEV-Local and DDEV-Live stand on the shoulders of open-source giants, from Linux to Go to Lets Encrypt, there are hundreds of projects we rely on every day. We’re happy to share one of our pieces of work to make things easier on macOS Catalina and beyond. We invite your participation in [signing_tools](https://github.com/drud/signing%5Ftools), and would love to hear your experiences.
