---
title: "DDEV Trusted HTTPS Certificates"
pubDate: 2019-05-23
modifiedDate: 2025-11-15
modifiedComment: Updated to explain Certificate Authorities, how mkcert installs the local CA, and troubleshooting steps for when automatic installation doesn't work. Added reference to detailed browser configuration documentation.
summary: The importance of local HTTPS, and how to take advantage of it with DDEV.
author: Randy Fay
featureImage:
  src: /img/blog/2019/05/home-umami.png
  alt: Screenshot of a browser showing a DDEV project with a secure HTTPS connection
  shadow: true
categories:
  - Guides
---

Security is critical on the modern web, and all sites should ideally be developed, tested, and deployed with HTTPS. But it has been challenging to do that in your local development environment without browser security warnings.

With [DDEV](http://github.com/ddev/ddev) you can use the HTTPS version of your project in a browser that trusts your project, without clicking through security warnings.

## TL;DR

You don't have to read or understand the rest of this :) There's a one-time installation of trusted HTTPS for DDEV:

```
mkcert -install && ddev poweroff && ddev start
```

## Understanding Certificate Authorities

When you visit an HTTPS website, your browser verifies that the site's SSL/TLS certificate was issued by a trusted **Certificate Authority (CA)**. A CA is an organization that validates website identities and issues digital certificates confirming they are who they claim to be. Your operating system and browsers come with a list of trusted CAs (like Let's Encrypt, DigiCert, or Sectigo).

For local development, we need a way to create certificates that your system trusts, even though the `.ddev.site` domains aren't publicly accessible. This is where mkcert comes in.

## How mkcert Works

[mkcert](https://github.com/FiloSottile/mkcert) is a tool that creates a local Certificate Authority on your computer. When you run `mkcert -install`, it:

1. Generates a local CA certificate and private key
2. Installs this CA into your system's trust store (macOS Keychain, Windows Certificate Store, or Linux certificate directories)
3. Installs the CA into your browsers' trust stores (Firefox, Chrome, etc.)

Once this local CA is trusted, mkcert can create SSL certificates for your local domains (like `myproject.ddev.site`), and your browser will trust them automatically because they're signed by your local CA.

DDEV uses mkcert behind the scenes to generate certificates for each project, so you get automatic HTTPS with no browser warnings.

## Installation

HTTPS with DDEV works on:

- macOS, Windows, and Linux
- Firefox, Chrome, Chromium, Safari, and other browsers
- With cURL on the host (macOS and Linux)
- With cURL inside the web container

There is a one-time setup to install the mkcert CA:

**macOS**: Run `mkcert -install` and provide your password at the sudo prompt.

**Linux**: Run `mkcert -install` and follow the instructions. You'll likely need to install `libnss3-tools` first:

```bash
# Debian/Ubuntu
sudo apt-get install -y libnss3-tools

# Then install the CA
mkcert -install
```

**Windows**: Run `mkcert -install` and accept the dialog that pops up.

## Troubleshooting

If HTTPS doesn't work after installation, here are common issues:

### Browsers Still Show Warnings

Some browsers don't automatically pick up the system trust store. Firefox, in particular, maintains its own certificate store. Run `mkcert -install` which should handle Firefox, but if issues persist, see the [browser configuration documentation](https://docs.ddev.com/en/stable/users/install/configuring-browsers/).

### cURL Doesn't Trust Certificates

If you're using an unusual cURL that doesn't respect your system's trust store, you may need to:

1. Use your system's standard cURL instead
2. Manually configure cURL to trust the mkcert CA
3. Use the `-k` flag (insecure mode) for local development only

The `curl` inside DDEV's web container is already configured to trust DDEV certificates.

(You can figure out which cURL is being used by running `which -a curl`. On Linux you usually want `/usr/bin/curl`, on macOS you might also be using the Homebrew version, `/opt/homebrew/bin/curl`).

### Certificate Errors After System Updates

Occasionally, OS updates can remove trusted CAs. If you start seeing certificate warnings after an update, run `mkcert -install` again to reinstall the local CA.

### Manual Certificate Installation

If automatic installation doesn't work, you can manually install the CA certificate. Find it with:

```bash
mkcert -CAROOT
```

Then import the `rootCA.pem` file into your system or browser's certificate store.

## More Information

- For detailed browser configuration and troubleshooting steps, see the [DDEV browser configuration documentation](https://docs.ddev.com/en/stable/users/install/configuring-browsers/).
- Read more about how all of this works in [Hostnames and Wildcards and DDEV, Oh My!](ddev-name-resolution-wildcards.md).
- The [mkcert project](https://github.com/FiloSottile/mkcert) has more information and documentation.

This entire feature is made possible by the outstanding [mkcert](https://github.com/FiloSottile/mkcert) project, another triumph of open-source collaboration. Thanks to [@FiloSottile](https://github.com/FiloSottile) for this project.
