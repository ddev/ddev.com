---
title: "DDEV Trusted HTTPS Certificates"
pubDate: 2019-05-23
summary: The importance of local HTTPS, and how to take advantage of it with v1.8.0+.
author: Randy Fay
featureImage:
  src: /img/blog/2019/05/home-umami.png
  alt: Tightly-cropped screenshot of a browser at a `.ddev.local` project URL with a secure HTTPS connection
  shadow: true
categories:
  - Guides
---

Security is critical on the modern web, and so all sites should ideally be developed, tested, and deployed with HTTPS. But it has been hard to do that in your local development environment.

With [DDEV](http://github.com/ddev/ddev) you can use the HTTPS version of your project in a browser that trusts your project and you don’t have to click through the nasty security warning this had triggered previously.

HTTPS with DDEV now works…

- On macOS, Windows, and Linux
- On Firefox, Chrome, Chromium, Safari
- With curl on the host (macOS and Linux, not Windows)
- With curl inside the web container

There is a tiny bit of one-time setup to get your OS and browser to trust the root certificate authority that DDEV uses. The 3-minute screencast below shows how installation and setup works on all 3 platforms.

**macOS**: After installing DDEV v1.8.0 and running `ddev stop --all`, run `mkcert -install` and provide your password at the sudo prompt.

**Linux**: After installing DDEV v1.8.0 and `ddev stop --all`, run `mkcert -install` and follow the instructions given. You’ll likely have to install the libnss3-tools package (Debian/Ubuntu `apt-get install -y libnss3-tools`). Add /usr/sbin to your path, and `mkcert -install` again.

**Windows**: After installing DDEV v1.8.0 and `ddev stop --all`, run `mkcert -install` and accept the dialog that pops up.

This entire feature is made possible by the outstanding [mkcert](https://github.com/FiloSottile/mkcert) project, another major triumph of open-source and open-source collaboration. Thanks to [@FiloSottile](https://github.com/FiloSottile) for an outstanding project.

The [DDEV Installation Documentation](https://ddev.readthedocs.io/en/stable/#installation) has full details about mkcert operation.
