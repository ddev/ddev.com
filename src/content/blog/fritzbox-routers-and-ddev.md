---
title: "Fritz!Box Routers and DDEV"
pubDate: 2025-11-20
summary: Solving DNS Rebinding issues with Fritz!Box Routers
featureImage:
  src: /img/blog/2025/11/FritzBox-DNS-Rebind-Schutz.png
  alt: Fritz!Box router network settings showing DNS rebinding protection options
author: Randy Fay
categories:
  - TechNotes
---

DDEV is designed so that most people never have to change the configuration of their local workstation, and that includes not having to edit their `hosts` file. All the details are in [DNS Name Resolution and Wildcards](ddev-name-resolution-wildcards.md).

However, one particular brand of router, the Fritz!Box, has a different DNS configuration than most other routers, and it restricts an obscure vulnerability called DNS Rebinding.

**TL;DR:** _If you're using a Fritz!Box router, you'll need to add "ddev.site" as an exception to the DNS Rebinding protection in your router's settings._

## The Problem

When you first set up DDEV with a Fritz!Box router, you might encounter a `DNS_PROBE_FINISHED_NXDOMAIN` error when trying to access your `.ddev.site` domain, even though your site is accessible via IP address. This happens because Fritz!Box routers include a DNS rebinding protection feature that "suppresses DNS responses pointing to your own network."

## What is DNS Rebinding?

DNS rebinding is a security vulnerability where an attacker can trick your browser into accessing services on your local network by manipulating DNS responses. Fritz!Box routers protect against this by blocking DNS lookups that resolve to local IP addresses like `127.0.0.1`. While this security feature protects against potential attacks, it also blocks legitimate local development domains like those used by DDEV.

## The Solution

Rather than accepting DDEV's fallback to editing your system's hosts file, it's better to solve the underlying DNS problem by configuring your Fritz!Box router to allow the `ddev.site` domain.

Here's how to fix it:

1. Access your Fritz!Box router settings (typically at `http://fritz.box`)
2. Navigate to **Heimnetz** (Home Network) > **Netzwerk** (Network) > **Netzwerkeinstellungen** (Network Settings)
3. Look for the DNS rebinding protection section
4. Add `ddev.site` to the exceptions list
5. Save your settings

![Fritz!Box DNS Rebinding Protection Settings with callouts showing where to add exceptions](/img/blog/2025/11/FritzBox-DNS-Rebind-Schutz-callouts.png)

After making this change, DDEV's DNS resolution will work as expected, and you can access your projects using the standard `.ddev.site` URLs.

## Alternative Solutions

If you prefer not to modify your router settings, or you do not have access to them, you have two other options:

1. **Configure your comptuer to use a less-restrictive DNS provider** such as Cloudflare's public DNS (`1.1.1.1`)
2. **Accept DDEV's hosts file editing** (though this requires superuser privileges and modifies system files)

The router configuration approach is recommended because it preserves DDEV's design principle of not requiring system file modifications.

## Additional Resources

- [DDEV Documentation on Restrictive DNS Servers](https://docs.ddev.com/en/stable/users/usage/networking/#restrictive-dns-servers-especially-fritzbox-routers)
- [German blog post detailing the Fritz!Box issue](https://www.npostnik.de/allgemein/ddev-neues-modem-fritzbox-und-dns_probe_finished_nxdomain/)

## Keep in touch!

We'd love to hear your experience. Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) if you have success (or failure 😀). We're always trying to make DDEV better for you.

Assisted in compilation and editing by Claude Code.
