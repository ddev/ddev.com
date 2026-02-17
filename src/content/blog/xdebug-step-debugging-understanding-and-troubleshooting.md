---
title: "Xdebug in DDEV: Understanding, Debugging, and Troubleshooting Step Debugging"
pubDate: 2026-02-17
summary: Understanding how Xdebug step debugging works, how it's integrated in DDEV, and how to diagnose and fix common connectivity issues.
author: Randy Fay
featureImage:
  src: /img/blog/2026/02/xdebug-debugging.png
  alt: Illustration showing how Xdebug connects from PHP container to IDE debugger
categories:
  - Training
  - TechNotes
---

For most people, Xdebug step debugging in DDEV just works: `ddev xdebug on`, set a breakpoint, start your IDE's debug listener, and go. DDEV handles all the Docker networking automatically. If you're having trouble, run `ddev utility xdebug-diagnose` and `ddev utility xdebug-diagnose --interactive` — they check your configuration and connectivity and tells you exactly what to fix.

This post explains how the pieces fit together and what to do if things do go wrong.

## The Quick Version

1. `ddev xdebug on`
2. Start listening in your IDE (PhpStorm: click the phone icon; VS Code: press <kbd>F5</kbd>)
3. Set a breakpoint in your entry point (`index.php` or `web/index.php`)
4. Visit your site

If it doesn't work:

```bash
ddev utility xdebug-diagnose
```

Or for guided, step-by-step troubleshooting:

```bash
ddev utility xdebug-diagnose --interactive
```

The diagnostic checks port 9003 listener status, `host.docker.internal` resolution, WSL2 configuration, `xdebug_ide_location`, network connectivity, and whether Xdebug is loaded. It gives actionable fix recommendations.

## How Xdebug Works

[Xdebug](https://xdebug.org/) lets you set breakpoints, step through code, and inspect variables — interactive debugging instead of `var_dump()`.

The connection model is a reverse connection: your IDE listens on port 9003 (it's the TCP server), and PHP with Xdebug initiates the connection (it's the TCP client). Your IDE must be listening _before_ PHP tries to connect.

:::note
The [Xdebug documentation](https://xdebug.org/docs/step_debug) uses the opposite terminology, calling the IDE the "client." We use standard TCP terminology here.
:::

## How DDEV Makes It Work

DDEV configures Xdebug to connect to `host.docker.internal:9003`. This special hostname resolves to the host machine's IP address from inside the container, so PHP can reach your IDE across the Docker boundary.

The tricky part is that `host.docker.internal` works differently across platforms. DDEV handles this automatically:

- **macOS/Windows**: Docker Desktop and Colima provide `host.docker.internal` natively
- **Linux**: DDEV uses the docker-compose host gateway feature
- **WSL2**: DDEV determines the correct IP based on your configuration

You can verify the resolution with:

```bash
ddev exec getent hosts host.docker.internal
```

### DDEV Xdebug Commands

- `ddev xdebug on` / `off` / `toggle` — Enable, disable, or toggle Xdebug
- `ddev xdebug status` — Check if Xdebug is enabled
- `ddev xdebug info` — Show configuration and connection details

## IDE Setup

### PhpStorm

Zero-configuration debugging works out of the box:

1. Run → Start Listening for PHP Debug Connections
2. Set a breakpoint
3. Visit your site

PhpStorm auto-detects the server and path mappings. If mappings are wrong, check Settings → PHP → Servers and verify `/var/www/html` maps to your project root.

The [PhpStorm DDEV Integration](https://plugins.jetbrains.com/plugin/18813-ddev-integration) plugin handles this automatically.

### VS Code

Install the [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug) and create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "hostname": "0.0.0.0",
      "pathMappings": {
        "/var/www/html": "${workspaceFolder}"
      }
    }
  ]
}
```

The [VS Code DDEV Manager](https://marketplace.visualstudio.com/items?itemName=biati.ddev-manager) extension can set this up for you.

**WSL2 + VS Code with WSL extension**: Install the PHP Debug extension in WSL, not Windows.

## Common Issues

Most problems fall into a few categories. The `ddev utility xdebug-diagnose` tool checks for all of these automatically.

**Breakpoint in code that doesn't execute**: The #1 issue. Start with a breakpoint in your entry point (`index.php`) to confirm Xdebug works, then move to the code you actually want to debug.

**IDE not listening**: Make sure you've started the debug listener. PhpStorm: click the phone icon. VS Code: press F5.

**Incorrect path mappings**: Xdebug reports container paths (`/var/www/html`), and your IDE needs to map them to your local project. PhpStorm usually auto-detects this; VS Code needs the `pathMappings` in `launch.json`.

**Firewall blocking the connection**: Especially common on WSL2, where Windows Defender Firewall blocks connections from the Docker container. Quick test: temporarily disable your firewall. If debugging works, add a firewall rule for port 9003.

## WSL2 Notes

WSL2 adds networking complexity. The most common problems:

- **Windows Defender Firewall** blocks connections from WSL2 to Windows. Temporarily disable it to test; if debugging works, add a rule for port 9003.
- **Mirrored mode** requires `hostAddressLoopback=true` in `C:\Users\<username>\.wslconfig`:

  ```ini
  [experimental]
  hostAddressLoopback=true
  ```

  Then `wsl --shutdown` to apply.

- **IDE in WSL2** (VS Code + WSL extension): Set `ddev config global --xdebug-ide-location=wsl2`

## Special Cases

**Container-based IDEs** (VS Code Remote Containers, JetBrains Gateway):

```bash
ddev config global --xdebug-ide-location=container
```

**Command-line debugging**: Works the same way — `ddev xdebug on`, start your IDE listener, then `ddev exec php myscript.php`. Works for Drush, WP-CLI, Artisan, and any PHP executed in the container.

**Debugging Composer**: Composer disables Xdebug by default. Override with:

```bash
ddev exec COMPOSER_ALLOW_XDEBUG=1 composer install
```

**Custom port**: Create `.ddev/php/xdebug_client_port.ini` with `xdebug.client_port=9000` (rarely needed).

**Debugging host.docker.internal resolution**: Run `DDEV_DEBUG=true ddev start` to see how DDEV determines the IP.

## Advanced Features

**xdebugctl**: DDEV includes the [`xdebugctl` utility](https://github.com/xdebug/xdebugctl) for dynamically querying and modifying Xdebug settings, switching modes (debug, profile, trace), and more. Run `ddev exec xdebugctl --help`. See the [xdebugctl documentation](https://xdebug.org/docs/xdebugctl).

**Xdebug map feature**: Recent Xdebug versions can remap file paths during debugging, useful when container paths don't match local paths in complex ways. This complements IDE path mappings.

**Performance**: Xdebug adds overhead. Use `ddev xdebug off` or `ddev xdebug toggle` when you're not actively debugging.

## More Information

- [DDEV Step Debugging Documentation](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/)
- [Xdebug Documentation](https://xdebug.org/docs/)
- [Xdebug Step Debugging Guide](https://xdebug.org/docs/step_debug)

Claude Code was used to create an initial draft for this blog, and for subsequent reviews.
