---
title: "Tailscale for DDEV: Simple and Secure Project Sharing"
pubDate: 2025-09-09
summary: "Tired of temporary sharing links? Learn how to use the ddev-tailscale-router add-on to get a stable, secure, and private URL for your DDEV projects."
author: Ajith Thampi Joseph
featureImage:
  src: /img/blog/2025/08/ddev_tailscale_flowchart.svg
  alt: "DDEV Tailscale Router Cover Image"
  caption: "The ddev-tailscale-router add-on enables cross-device testing, stable webhook URLs, and team collaboration."
  credit: "Image by Claude AI :)"
categories:
  - Guides
  - TechNotes
---

I've found that DDEV's [`ddev share`](https://docs.ddev.com/en/stable/users/topics/sharing/) command is a great way to quickly share my local development environment. However, since it uses ngrok, it generates a new, random URL every time unless you use a [stable domain](https://docs.ddev.com/en/stable/users/topics/sharing/#setting-up-a-stable-ngrok-domain). As an alternative, I've created the [`ddev-tailscale-router`](https://github.com/atj4me/ddev-tailscale-router) add-on.

This add-on uses [Tailscale](https://tailscale.com/), a VPN service that creates a private and secure network between your devices. It is free for personal use!

As a result, you get a stable, human-readable URL for each of your DDEV projects, which you can access from any device on your Tailscale network.

I've found this approach to be particularly useful for:

- **Cross-device testing:** I can easily test my sites on my phone or tablet without being on the same Wi-Fi network.
- **Stable webhook URLs:** I can use the permanent Tailscale URL as a reliable endpoint for webhooks, such as those from payment gateways.
- **Team collaboration:** I can share my development environment with team members so they can see my work in progress.

### How it Works

The `ddev-tailscale-router` add-on works by running a Tailscale container alongside your DDEV project. This container automatically connects to your Tailscale network and securely proxies requests to your project's web container.

### Prerequisites

Before installing the add-on, you need to set up Tailscale:

1. **Install Tailscale** on at least two devices (phone, tablet, or computer) by following the [installation guide](https://tailscale.com/download). This is required to generate an auth key.
2. **Enable HTTPS** by following the [Tailscale HTTPS documentation](https://tailscale.com/kb/1153/enabling-https). This is required for TLS certificate generation.
3. **Generate an auth key** by following the [Tailscale auth keys documentation](https://tailscale.com/kb/1085/auth-keys). Ephemeral, reusable keys are recommended.

### Installation

To get started, follow these steps:

1.  First, **set up your auth key** (recommended approach):
    Add the auth key to your shell environment:

    ```bash
    echo 'export TS_AUTHKEY=tskey-auth-your-key-here' >> ~/.bashrc
    source ~/.bashrc
    ```

    Replace `~/.bashrc` with `~/.zshrc` if you use Zsh, or your relevant shell configuration file.

    Alternatively, you can set it per project (**NOT RECOMMENDED**, because `.ddev/.env.tailscale-router` is not intended to store secrets):

    ```bash
    ddev dotenv set .ddev/.env.tailscale-router --ts-authkey=tskey-auth-your-key-here
    ```

2.  Next, **install the add-on:**

    ```bash
    ddev add-on get atj4me/ddev-tailscale-router
    ```

3.  Finally, **restart DDEV:**
    ```bash
    ddev restart
    ```

### Using Your Tailscale URL

Once installation is complete, you can access your project using these commands:

Launch your project's Tailscale URL in browser:

```bash
ddev tailscale launch
```

Get your project's Tailscale URL:

```bash
ddev tailscale url
```

Your project's permanent Tailscale URL will look like: `https://<project-name>.<your-tailnet>.ts.net`. You can also find it in your Tailscale admin console.

### Public vs. Private Mode

The add-on offers two modes for sharing your project:

- **Private (default):** Your project is only accessible to devices on your Tailscale network.
- **Public:** Your project is accessible to anyone on the internet.

To switch between modes:

Switch to public mode (accessible to anyone on the internet):

```bash
ddev dotenv set .ddev/.env.tailscale-router --ts-privacy=public
ddev restart
```

Switch back to private mode (default):

```bash
ddev dotenv set .ddev/.env.tailscale-router --ts-privacy=private
ddev restart
```

> **Note:** For public access, you need to configure your [Access Control List (ACL)](https://tailscale.com/kb/1223/funnel#funnel-node-attribute) to enable Funnel. See the [Tailscale Funnel documentation](https://tailscale.com/kb/1223/funnel) for details on setting up the required ACL policy.

I hope this add-on helps streamline your development workflow! If you run into any issues or have suggestions for improvements, feel free to open an issue on the [GitHub repository](https://github.com/atj4me/ddev-tailscale-router/issues).

### Additional Resources

Here are some additional resources that you might find helpful:

- **[Tailscale](https://tailscale.com/)**: A VPN service that creates a private and secure network between your devices.
- **[Tailscale Download](https://tailscale.com/download)**: Installation guide for Tailscale on various platforms.
- **[Tailscale: Enabling HTTPS](https://tailscale.com/kb/1153/enabling-https)**: Official documentation on enabling HTTPS for TLS certificate generation.
- **[Tailscale Auth Keys](https://tailscale.com/kb/1085/auth-keys)**: Detailed information about creating and managing auth keys.
- **[Tailscale Funnel](https://tailscale.com/kb/1223/funnel)**: Documentation on enabling public access to your Tailscale services.
- **[Tailscale DNS](https://tailscale.com/kb/1054/dns)**: DNS in Tailscale
- **[DDEV dotenv](https://ddev.readthedocs.io/en/latest/users/usage/commands/#dotenv)**: Documentation on managing environment variables with DDEV.
- **[DDEV Docs: Sharing](https://ddev.readthedocs.io/en/latest/users/usage/sharing/)**: The official DDEV documentation on how to share your projects.
- **Medium: [My Journey with PHP Dev Environments](https://medium.com/@josephajithampi/my-journey-with-php-dev-environments-1da9f2806ee9)**: A blog post on setting up a PHP development environment.
- **LinkedIn: [The Day My Development Environment Nearly Broke Me](https://www.linkedin.com/pulse/day-my-development-environment-nearly-broke-me-how-i-thampi-joseph-ildhc/)**: An article on the importance of a reliable development environment.

---

_This blog post was written with the assistance of Amazon Q and Google Gemini. I used them to help simplify the language, improve the flow, and proofread the text._
