---
title: "DDEV Trusted HTTPS Certificates"
pubDate: 2019-05-23
modifiedDate: 2026-04-17
modifiedComment: Added WSL2 two-computer model explanation, CAROOT/WSLENV propagation, Firefox variant trust store caveats, and ddev utility tls-diagnose reference.
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

```bash
mkcert -install && ddev poweroff && ddev start
```

**WSL2 users:** the setup is a bit different — [see the WSL2 section below](#wsl2-the-two-computer-model).

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

**WSL2**: See the [WSL2 section below](#wsl2-the-two-computer-model) — the setup is more involved.

## WSL2: The Two-Computer Model

WSL2 is where most HTTPS trust problems originate, so it's worth understanding what's actually happening.

When you use DDEV on WSL2, you're working with two separate environments:

- **Linux (WSL2)**: where DDEV runs, Docker runs, and your project files live
- **Windows**: where your browser runs (Chrome, Edge, Firefox)

These two environments do **not** share a certificate trust store. The Linux side and the Windows side each have their own. When your Windows browser visits `https://myproject.ddev.site`, it checks the **Windows** certificate store — it has no knowledge of anything installed on the Linux side.

This means `mkcert -install` run inside WSL2 only installs the CA into the Linux trust store. Your Windows browser never sees it, and you get certificate warnings.

:::tip[The DDEV Windows installer handles all of this]
The normal way to set up DDEV on WSL2 is to run the [DDEV Windows installer](https://ddev.com/get-started/). It performs every step below automatically, and can be run again at any time to repair a broken configuration. The manual steps that follow are for understanding what the installer does, or for recovering from an unusual situation.
:::

### The Correct WSL2 Setup

The solution is to keep the mkcert CA on the **Windows** filesystem and share it into WSL2:

1. **Install mkcert on Windows** and run `mkcert -install` from PowerShell (not from WSL2). This puts the CA into the Windows certificate store where Chrome and Edge can find it.

2. **Set `CAROOT` and `WSLENV`** so WSL2 uses the Windows CA instead of creating its own. From PowerShell:

   ```powershell
   $env:CAROOT = mkcert -CAROOT
   setx CAROOT $env:CAROOT
   $env:WSLENV = "CAROOT/up:$env:WSLENV"
   setx WSLENV $env:WSLENV
   ```

   The `CAROOT/up` flag in `WSLENV` tells WSL2 to inherit the `CAROOT` variable from Windows and translate the path (e.g., `C:\Users\you\AppData\Local\mkcert` becomes `/mnt/c/Users/you/AppData/Local/mkcert`).

3. **Restart WSL2** so the environment variable takes effect:

   ```powershell
   wsl --shutdown
   ```

4. **Verify** inside WSL2:

   ```bash
   echo $CAROOT
   # Should show something like /mnt/c/Users/you/AppData/Local/mkcert
   ```

5. **Run `mkcert -install` inside WSL2** to register the Windows CA with the Linux system trust store as well (needed for `curl` and other Linux tools).

6. **Restart DDEV**: `ddev poweroff && ddev start`

### Exception: Browser Running Inside WSL2 via WSLg

A small number of WSL2 users run their browser **inside** WSL2 using [WSLg](https://github.com/microsoft/wslg) (the Linux GUI app support built into modern Windows). If your browser is launched from inside the WSL2 terminal rather than from the Windows Start menu or taskbar, you're in this category.

In that case, the browser is a Linux process and uses the Linux trust store — the Windows certificate store is irrelevant. The setup is the same as on a regular Linux machine: run `mkcert -install` inside WSL2 and you're done. The `CAROOT`/`WSLENV` setup described above is not needed.

This is uncommon. If you're not sure which case applies to you, you're almost certainly running a Windows browser.

### Why `CAROOT` Must Point to the Windows Filesystem

DDEV generates per-project certificates by calling `mkcert --cert-file ... hostname`. For those certificates to be trusted by Windows browsers, they must be signed by the CA that Windows trusts — which is the one installed on the Windows side.

If `$CAROOT` points to a Linux path (e.g., `/root/.local/share/mkcert`), DDEV will sign certificates with a Linux-only CA. Your Windows browser will reject them.

You can always check where `CAROOT` is pointing:

```bash
mkcert -CAROOT
# Should start with /mnt/c/...
```

### Firefox on Windows

Modern Firefox on Windows can use the Windows system certificate store automatically. If you see certificate errors in Firefox on Windows, go to **Settings → Privacy & Security** and enable **"Allow Firefox to automatically trust third-party root certificates you install"**. This is usually all that is needed.

If that setting is already enabled and Firefox still shows errors, import the CA manually:

1. Find the CA file: it's `rootCA.pem` inside the directory shown by `mkcert -CAROOT` (translated to a Windows path, e.g., `C:\Users\you\AppData\Local\mkcert\rootCA.pem`)
2. In Firefox: **Settings → Privacy & Security → View Certificates → Authorities tab → Import**
3. Import `rootCA.pem` and check "Trust this CA to identify websites"

Firefox Nightly, Developer Edition, and ESR each maintain a **separate** trust store from standard Firefox. If you use any of these, repeat the import for each one.

### Diagnosing Certificate Problems

DDEV v1.25.2 and later include a built-in diagnostic tool that checks every part of the certificate trust chain. It works on all platforms, not just WSL2:

```bash
# Run from any directory for mkcert, trust store, and cert file checks
ddev utility tls-diagnose

# Run from a running project directory to also check live HTTPS connectivity
cd my-project && ddev start && ddev utility tls-diagnose
```

It checks:

- `mkcert` installation and `CAROOT` path
- OS trust store installation
- Certificate file validity
- Live HTTPS connectivity (when run from a running project directory)

On WSL2, it also checks:

- Whether `CAROOT` points to the Windows filesystem
- Whether `CAROOT` is in `WSLENV`
- Whether the mkcert CA is in the Windows certificate store
- Whether the Windows-side and WSL2-side CA fingerprints match

Try this first when something isn't working.

## Troubleshooting

### Browsers Still Show Warnings

Run `ddev utility tls-diagnose` first — it identifies the specific problem and prints actionable fix instructions. (This was new in DDEV v1.25.2.)

Some browsers don't automatically pick up the system trust store. Firefox, in particular, sometimes maintains its own certificate store.

- **Firefox on Windows**: enable **"Allow Firefox to automatically trust third-party root certificates you install"** in Settings → Privacy & Security. If that doesn't resolve it, see the [Firefox on Windows](#firefox-on-windows) section above for manual import steps.
- **Firefox on Linux**: relies on `certutil` (from `libnss3-tools`) for `mkcert -install` to register the CA. Install it with `sudo apt install libnss3-tools`, then run `mkcert -install` again.
- **Firefox Nightly, Developer Edition, ESR**: may maintain a separate trust store and need the manual CA import treatment.

If issues persist, see the [browser configuration documentation](https://docs.ddev.com/en/stable/users/install/configuring-browsers/).

### cURL Doesn't Trust Certificates

If you're using an unusual cURL that doesn't respect your system's trust store, you may need to:

1. Use your system's standard cURL instead
2. Manually configure cURL to trust the mkcert CA
3. Use the `-k` flag (insecure mode) for local development only

The `curl` inside DDEV's web container is already configured to trust DDEV certificates.

(You can figure out which cURL is being used by running `which -a curl`. On Linux you usually want `/usr/bin/curl`, on macOS you might also be using the Homebrew version, `/opt/homebrew/bin/curl`).

### Certificate Errors After System Updates

Occasionally, OS updates can remove trusted CAs. If you start seeing certificate warnings after an update, run `mkcert -install` again to reinstall the local CA.

### Nuclear Option

When something is deeply broken — wrong CA, mismatched certificates, or an unknown state — start fresh:

```bash
ddev poweroff
mkcert -uninstall
rm -rf "$(mkcert -CAROOT)"
mkcert -install
ddev start
```

:::warning[WSL2 users]
Run `mkcert -install` from Windows PowerShell (to update the Windows certificate store) **and** from inside WSL2 (to update the Linux trust store). Then restart DDEV.
:::

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
