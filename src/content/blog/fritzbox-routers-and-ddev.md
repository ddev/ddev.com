---
title: "Fritz!Box Routers and DDEV"
pubDate: 2025-11-20
summary: Solving DNS Rebinding issues with Fritz!Box routers
featureImage:
  src: /img/blog/2025/11/FritzBox-DNS-Rebind-Schutz.png
  alt: Fritz!Box router network settings showing DNS rebinding protection options
author: Randy Fay
categories:
  - TechNotes
---

DDEV is designed so that most people never have to change the configuration of their local workstation, and that includes not having to edit their hosts file. All the details are in [DNS Name Resolution and Wildcards](ddev-name-resolution-wildcards.md).

However, one particular brand of router, the Fritz!Box, has a different DNS configuration than most other routers, and it includes DNS Rebinding Protection that blocks local development domains.

**TL;DR:** _If you use a Fritz!Box router, add `ddev.site` to the router's DNS Rebinding Protection exceptions._

## The Problem

When you first set up DDEV with a Fritz!Box router, you might encounter a `DNS_PROBE_FINISHED_NXDOMAIN` error when trying to access your `.ddev.site` domain, even though your site is accessible via IP address. This happens because Fritz!Box routers include DNS Rebinding Protection that "suppresses DNS responses pointing to your own network."

## What is DNS Rebinding Protection?

DNS Rebinding Protection is a security feature that guards against a sophisticated attack technique. In a DNS rebinding attack, a malicious website tricks your browser into accessing services on your local network (like your computer, router, printer, or other devices) by manipulating DNS responses. Here's how the attack works:

1. You visit a malicious website that includes JavaScript code
2. The website's DNS initially resolves to the attacker's server
3. The attacker then changes the DNS to point to a local IP address like `127.0.0.1` or `192.168.1.1`
4. The JavaScript code in your browser can now access local services, potentially extracting sensitive data or changing settings

Fritz!Box routers protect against this by blocking DNS lookups that resolve to local IP addresses like `127.0.0.1`, `192.168.x.x`, and other private network ranges. While this security feature protects against real attacks, it also blocks legitimate local development domains (like DDEV's `ddev.site`).

## Why DDEV is Safe

DDEV's use of `127.0.0.1` and the `ddev.site` domain is intentional and safe—it's not a DNS rebinding attack. Here's why:

- **You control the configuration**: You explicitly install and configure DDEV on your own machine
- **Local-only access**: DDEV projects only respond to requests from your own computer (`127.0.0.1`), not from external networks
- **No data exfiltration**: There's no malicious code trying to steal data from your local services
- **Transparent operation**: DDEV openly documents exactly how it uses DNS and local networking

The Fritz!Box can't distinguish between a legitimate local development tool like DDEV and a potential DNS rebinding attack—both use domain names that resolve to `127.0.0.1`. That's why you need to explicitly allow `ddev.site` as an exception.

## The Solution

Rather than relying on DDEV's hosts file fallback, it's better to solve the underlying DNS problem by configuring your Fritz!Box router to allow the `ddev.site` domain.

Here's how to fix it:

1. Access your Fritz!Box router settings (typically at `http://fritz.box`)
2. Navigate to **Home Network** (Heimnetz) > **Network** (Netzwerk) > **Network Settings** (Netzwerkeinstellungen)
3. Look for the DNS rebinding protection section
4. Add `ddev.site` to the exceptions list
5. Save your settings

![Fritz!Box DNS Rebinding Protection Settings with callouts showing where to add exceptions](/img/blog/2025/11/FritzBox-DNS-Rebind-Schutz-callouts.png)

After making this change, DDEV's DNS resolution will work as expected, and you can access your projects using the standard `.ddev.site` URLs.

## Alternative Solutions

If you prefer not to modify your router settings, or you do not have access to them, you have two other options:

1. **Configure your computer to use a less restrictive DNS provider** such as Cloudflare's public DNS (`1.1.1.1`)
2. **Use DDEV's hosts file fallback** (this requires superuser privileges and modifies system files)

The router configuration approach is recommended because it preserves DDEV's design principle of not requiring system file modifications.

## Additional Resources

- [DDEV Documentation on Restrictive DNS Servers](https://docs.ddev.com/en/stable/users/usage/networking/#restrictive-dns-servers-especially-fritzbox-routers)
- [German blog post detailing the Fritz!Box issue](https://www.npostnik.de/allgemein/ddev-neues-modem-fritzbox-und-dns_probe_finished_nxdomain/)
- Read all the details about DNS Name Resolution in [DNS Name Resolution and Wildcards](ddev-name-resolution-wildcards.md)

## Contacting Fritz!Box Support to Ask for `ddev.site` to be added to their exceptions

If you want to request that AVM (the makers of Fritz!Box) consider adding `ddev.site` to their default DNS Rebinding Protection exceptions, consider contacting their support team. A friend of DDEV has already done this, but your request may help.

## Thanks!

Thanks to [Ingo Schmitt](https://my.typo3.org/u/ischmittis) for investigating and demonstrating the fix. Thanks to [npostnik](https://www.npostnik.de/ueber-mich/) for already having documented this in a German blog post.

## Keep in touch!

We'd love to hear your experience. Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) if you have success (or failure 😀). We're always trying to make DDEV better for you.

Assisted in compilation and editing by Claude Code.
