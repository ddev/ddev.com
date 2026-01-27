---
title: "Xdebug in DDEV: Understanding, Debugging, and Troubleshooting Step Debugging"
pubDate: 2026-02-15
summary: Understanding how Xdebug step debugging works, how it's integrated in DDEV, and how to diagnose and fix common connectivity issues.
author: Randy Fay
featureImage:
  src: /img/blog/2026/02/xdebug-debugging.png
  alt: Illustration showing how Xdebug connects from PHP container to IDE debugger
categories:
  - Training
  - TechNotes
---

Xdebug is an indispensable tool for PHP developers, enabling step-by-step debugging of code execution. DDEV has always included Xdebug support out of the box, but understanding how the connection works between your IDE and the containerized PHP environment is key to successful debugging. DDEV v1.25 introduces a new diagnostic tool that makes troubleshooting Xdebug connectivity problems much easier.

## What Xdebug Does

[Xdebug](https://xdebug.org/) is a PHP extension that provides debugging and profiling capabilities. For step debugging, it allows you to:

- Set breakpoints and pause code execution
- Step through code line by line
- Inspect variable values at any point
- Evaluate expressions in the current context
- View the complete call stack

Unlike traditional debugging with `var_dump()` or `error_log()`, Xdebug lets you interactively explore your application's behavior without modifying code or restarting services.

## How Xdebug Works

Xdebug operates using a client-server architecture. In TCP networking terms (which we use here), PHP is the client and your IDE is the server:

1. **Your IDE is the server** - it listens for incoming connections on port 9003 (the default Xdebug port)
2. **PHP is the client** - when Xdebug is enabled and a request is made, PHP initiates a TCP connection to your IDE
3. **Communication uses the DBGp protocol** - a standardized protocol for debugger communication

Note: The [Xdebug documentation](https://xdebug.org/docs/step_debug) uses the opposite terminology, calling the IDE the "client" and PHP the "server." We use TCP networking terminology where the listener (IDE) is the server and the connector (PHP) is the client.

When PHP hits a breakpoint or starts debugging, Xdebug:

1. Opens a TCP connection to the configured host and port
2. Sends debugging information (file paths, variable values, execution state) to your IDE
3. Waits for commands from your IDE (step over, step into, continue, etc.)
4. Executes those commands and sends back results

This reverse connection model means your IDE must be listening before PHP tries to connect.

## How Xdebug Works in DDEV

Every DDEV project is automatically configured with Xdebug, but it's disabled by default for performance reasons. When you enable it:

```bash
ddev xdebug on
```

DDEV:

1. Enables the Xdebug PHP extension in the web container
2. Configures Xdebug to connect to `host.docker.internal:9003`
3. Sets up the necessary environment variables and configuration

The key technical detail is `host.docker.internal` - this is a special DNS name that Docker provides to containers, resolving to the host machine's IP address. This allows PHP running inside the container to connect to your IDE running on your host machine.

### Basic Commands

- `ddev xdebug on` - Enable Xdebug
- `ddev xdebug off` - Disable Xdebug
- `ddev xdebug toggle` - Toggle Xdebug state
- `ddev xdebug status` - Check if Xdebug is enabled
- `ddev xdebug info` - Display Xdebug configuration and connection details

## Why DDEV Xdebug "Just Works"

One of DDEV's proudest achievements is that Xdebug typically works without any configuration. This seems simple, but it's solving a complex problem: PHP running inside a Docker container needs to connect back to your IDE on your host machine, and the container has no inherent knowledge of how to reach the host.

The solution is `host.docker.internal` - a special hostname that resolves to the host machine's IP address from the container's perspective. The challenge is that this works differently across platforms:

- **macOS and Windows (Docker Desktop)**: Automatically provides `host.docker.internal`
- **Linux**: No built-in `host.docker.internal` support
- **WSL2**: Complex networking scenarios depending on NAT vs. mirrored mode

DDEV automatically detects your environment and configures `host.docker.internal` correctly:

- On Linux, DDEV adds the host gateway IP to `/etc/hosts` in the container
- On WSL2, DDEV determines whether to use the Windows host IP or the WSL2 IP based on your configuration
- On all platforms, DDEV validates the IP and reconfigures if needed

This means when you run `ddev xdebug on`, the extension is already configured to connect to `host.docker.internal:9003`, and that hostname reliably resolves to wherever your IDE is listening.

## Technical Details: Understanding host.docker.internal

The magic that makes Xdebug work across the Docker container boundary is `host.docker.internal`. This hostname:

- Resolves to the host machine's IP address as seen from the container
- Is automatically configured by Docker Desktop on macOS and Windows
- On Linux, DDEV provides this capability through additional networking configuration
- On WSL2, resolves to the Windows host IP address (or WSL2 IP with `xdebug_ide_location=wsl2`)

You can verify what `host.docker.internal` resolves to:

```bash
ddev exec getent hosts host.docker.internal
```

Or use the new info command:

```bash
ddev xdebug info
```

When Xdebug tries to connect, it uses this hostname to reach your IDE. The connection path is:

```
PHP in container → host.docker.internal:9003 → Your IDE on host
```

### Debugging host.docker.internal Resolution

If you need to troubleshoot how DDEV determines the `host.docker.internal` IP address, use debug mode:

```bash
DDEV_DEBUG=true ddev start
```

You'll see output explaining the logic, like:

```
host.docker.internal='172.22.192.1' because IsWSL2 and !IsDockerDesktop;
received from ip -4 route show default
```

This is especially helpful on WSL2 where the networking can be complex.

### Special Cases

**WSL2 with VS Code + WSL Extension**: The IDE actually runs in WSL2, not Windows, so you need to tell DDEV:

```bash
ddev config global --xdebug-ide-location=wsl2
```

**Container-based IDEs** (VS Code Remote Containers, JetBrains Gateway): The IDE runs in a container, so:

```bash
ddev config global --xdebug-ide-location=container
```

**Different Port**: If you need to use a different port than 9003, create `.ddev/php/xdebug_client_port.ini`:

```ini
xdebug.client_port=9000
```

**Note**: While Xdebug settings can be overridden using `.ddev/php/<filename>.ini` files, this is unusual and normally unnecessary. DDEV's default Xdebug configuration works for most debugging scenarios.

## Common Issues

### Breakpoint in Code That's Not Executed

The most common debugging issue is setting a breakpoint in code that never runs. You might set a breakpoint in a function that's not called, a conditional branch that's not taken, or a file that's not included.

**Solution**: Start with a breakpoint in the main entry point, usually `index.php` or `web/index.php`. This ensures your breakpoint will definitely be hit. Once you confirm Xdebug is working, you can move your breakpoint to the specific code you want to debug.

### Incorrect Path Mappings

Xdebug reports file paths from inside the container (`/var/www/html`), but your IDE needs to map these to your local project directory (`/Users/you/workspace/project`). If this mapping is wrong, your IDE won't know which file to open when a breakpoint is hit.

**PhpStorm**: Usually auto-detects the mapping with zero-configuration debugging. If not, go to Settings → PHP → Servers and verify the path mapping shows `/var/www/html` → your project root.

**VS Code**: Requires explicit configuration in `.vscode/launch.json` with the `pathMappings` setting (see IDE-Specific Configuration section below).

**DDEV Extensions**: Both the [PhpStorm DDEV Integration](https://plugins.jetbrains.com/plugin/18813-ddev-integration) and [VS Code DDEV Manager](https://marketplace.visualstudio.com/items?itemName=biati.ddev-manager) extensions automatically handle path mappings for you.

### IDE Not Listening

Another common problem is forgetting to start the debug listener in your IDE. PHP will attempt to connect, fail, and continue execution without debugging.

**PhpStorm**: Run → Start Listening for PHP Debug Connections (or click the phone icon)

**VS Code**: Press F5 or click the debug play button (requires proper `.vscode/launch.json` configuration)

### Firewall Blocking Connection

Firewalls can block the incoming connection from the Docker container. This is especially common on:

- **WSL2 with Windows Defender Firewall** (the most common debugging issue)
- Windows with Windows Defender Firewall
- macOS with application firewalls enabled
- Linux with restrictive firewall rules

On WSL2, the connection travels from the Docker container in WSL2 across to Windows where your IDE listens, and Windows Defender Firewall frequently blocks this by default.

**Quick test**: Temporarily disable your firewall and try debugging. If it works, you need to add a firewall rule allowing incoming connections on port 9003 (or allow access when Windows prompts).

### WSL2 Networking Complexities

WSL2 uses NAT networking by default, which adds complexity:

- The Docker container connects to `host.docker.internal`
- This resolves to the Windows host, not the WSL2 instance
- If your IDE runs on Windows, this is correct
- If your IDE runs in WSL2, you need `xdebug_ide_location=wsl2`

WSL2 mirrored mode (newer Windows builds) requires an additional setting. In `C:\Users\<username>\.wslconfig`:

```ini
[experimental]
hostAddressLoopback=true
```

Then restart WSL2:

```bash
wsl --shutdown
```

**WSL2 Firewall Issues**: The most common WSL2 debugging problem is Windows Defender Firewall blocking connections from the Docker container to your IDE on Windows. The connection must travel from WSL2 → Windows, and Windows Defender Firewall often blocks this by default.

**First debugging step for WSL2**: Temporarily disable Windows Defender Firewall:

1. Open Windows Security
2. Go to Firewall & network protection
3. Click your active network (Domain, Private, or Public)
4. Turn off Windows Defender Firewall
5. Try debugging
6. Re-enable the firewall

If debugging works with the firewall off, you need to add a firewall rule for port 9003. The easiest approach is to let Windows prompt you when your IDE first listens - just allow access when prompted.

## The New `ddev utility xdebug-diagnose` Tool

DDEV v1.25 introduces an experimental diagnostic tool that automatically checks your Xdebug configuration and connectivity:

```bash
ddev utility xdebug-diagnose
```

This command analyzes:

- **Port 9003 listener status**: Whether your IDE is listening
- **WSL2 configuration**: Mirrored mode and hostAddressLoopback settings
- **host.docker.internal resolution**: What IP address it resolves to
- **xdebug_ide_location setting**: Whether it's configured correctly for your environment
- **Network connectivity**: Whether the container can connect to the host
- **Xdebug status**: Whether the extension is enabled
- **PHP module loading**: Whether Xdebug is actually loaded in PHP

The diagnostic provides actionable recommendations. For example:

```
✗ WSL2 mirrored mode: hostAddressLoopback NOT enabled
   Fix: Add to C:\Users\<username>\.wslconfig:
        [experimental]
        hostAddressLoopback=true
      Then run: wsl --shutdown
```

### Interactive Mode

For a guided, step-by-step diagnostic that tests your actual IDE connection:

```bash
ddev utility xdebug-diagnose --interactive
```

Interactive mode:

1. Detects your environment (macOS, Linux, WSL2, etc.)
2. Tests network connectivity without your IDE listening
3. Asks about your IDE setup (PhpStorm, VS Code, etc.)
4. Prompts you to start your IDE debug listener
5. Tests the actual DBGp protocol connection
6. Provides specific guidance based on your configuration

This mode is particularly helpful when setting up Xdebug for the first time or debugging configuration issues.

## Troubleshooting Steps

When Xdebug isn't working, follow these steps:

### 1. Run the Diagnostic Tool

Start with the automated diagnostic:

```bash
ddev utility xdebug-diagnose
```

Or use interactive mode for guided troubleshooting:

```bash
ddev utility xdebug-diagnose --interactive
```

### 2. Verify Basic Configuration

Check that Xdebug is enabled and loaded:

```bash
ddev xdebug status
ddev xdebug info
ddev exec php -m | grep xdebug
```

The `ddev xdebug info` command shows important configuration details including:

- Whether Xdebug is enabled
- The configured client host (should be `host.docker.internal`)
- The configured port (should be 9003)
- Current Xdebug mode settings

### 3. Check IDE Listener

Verify your IDE is actually listening on port 9003. From your host machine:

```bash
# macOS/Linux
lsof -i :9003

# Windows (PowerShell)
Get-NetTCPConnection -LocalPort 9003
```

### 4. Test Network Connectivity

Check if the container can reach the host:

```bash
ddev exec ping host.docker.internal
```

Test the specific port:

```bash
ddev exec nc -zv host.docker.internal 9003
```

**Advanced test - simulate IDE behavior**: You can use `nc` (netcat) to simulate your IDE and see exactly what Xdebug sends:

```bash
# On your host (not in container), start listening
nc -l 0.0.0.0 9003
```

Then visit your site with `ddev xdebug on`. You'll see the DBGp protocol XML that Xdebug sends - this proves Xdebug can connect to your host on port 9003.

### 5. Check Logs

DDEV logs show connection attempts and errors:

```bash
ddev logs
```

Look for messages about Xdebug connections or errors. You might see:

- Connection attempts to `host.docker.internal:9003`
- Connection refused errors (IDE not listening)
- Network timeout errors (firewall blocking)
- Xdebug initialization messages

For real-time monitoring during debugging attempts:

```bash
ddev logs -f
```

### 6. Review xdebug_ide_location Setting

In most cases, this should be empty:

```bash
ddev config global --xdebug-ide-location=""
```

Only set it for special cases:

- `wsl2` - VS Code with WSL extension or IDE running in WSL2
- `container` - IDE running in a container

### 7. Temporarily Disable Firewall

To isolate firewall issues:

**WSL2** (most common issue): Disable Windows Defender Firewall

1. Open Windows Security → Firewall & network protection
2. Turn off firewall for your active network
3. Test debugging
4. Re-enable firewall
5. If it works, add a firewall rule for port 9003 (or allow when Windows prompts)

**macOS**:

```bash
# Disable firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off

# Test debugging, then re-enable:
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
```

**Traditional Windows**: Same as WSL2 - disable Windows Defender Firewall through Security settings

### 8. Restart Everything

Sometimes a fresh start helps:

```bash
ddev restart
```

Restart your IDE as well.

## IDE-Specific Configuration

### PhpStorm

PhpStorm offers two debugging approaches:

**Zero-configuration debugging** (recommended):

1. Run → Start Listening for PHP Debug Connections
2. Set a breakpoint
3. Visit your site

PhpStorm automatically detects the server and configures mappings.

**Manual configuration**:

1. Settings → PHP → Servers
2. Add a server with name matching your project
3. Set path mappings: `/var/www/html` → your project root
4. Create a PHP Remote Debug run configuration

### VS Code

VS Code requires the [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug) and configuration:

Create `.vscode/launch.json`:

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

**WSL2 + VS Code with WSL extension**: Install the PHP Debug extension in WSL, not Windows. VS Code should be opened using the WSL extension.

## Command-Line Debugging

You can debug PHP scripts run from the command line, not just web requests:

1. Enable Xdebug: `ddev xdebug on`
2. Start your IDE debug listener
3. Set a breakpoint in your script
4. Run the script: `ddev exec php myscript.php`

The script will connect to your IDE just like a web request. This works for:

- Standalone PHP scripts
- Drush commands
- WP-CLI commands
- Artisan commands
- Any PHP executed in the container

For PhpStorm, you may need to configure a "PHP Script" run configuration for command-line debugging, but zero-configuration debugging often works here too.

## Debugging Composer Operations

By default, Composer disables Xdebug for performance. To debug Composer scripts:

```bash
ddev exec COMPOSER_ALLOW_XDEBUG=1 composer install
```

Or set it permanently in `.ddev/config.yaml`:

```yaml
web_environment:
  - COMPOSER_ALLOW_XDEBUG=1
```

## When Xdebug is Slow

Xdebug adds overhead to every PHP request. If debugging is slow:

1. **Disable when not needed**: `ddev xdebug off` when you're not actively debugging
2. **Use breakpoints strategically**: Don't leave breakpoints in frequently-executed code
3. **Consider profiling mode**: Use Xdebug profiling mode instead of step debugging for performance analysis
4. **Toggle as needed**: Use `ddev xdebug toggle` to quickly enable/disable

## Advanced Features

### xdebugctl Utility

DDEV's web container includes the [`xdebugctl` utility](https://github.com/xdebug/xdebugctl) from the Xdebug project for advanced Xdebug management. This utility provides additional control over Xdebug configuration beyond the standard `ddev xdebug` commands:

```bash
ddev exec xdebugctl --help
```

`xdebugctl` allows you to:

- Query and modify Xdebug settings dynamically
- Switch between debugging modes (debug, profile, trace)
- Configure advanced Xdebug features

For details, see the [xdebugctl documentation](https://xdebug.org/docs/xdebugctl) and the [Xdebug 3.4 release notes](https://xdebug.org/announcements/2024-12-03).

### Xdebug Map Feature

Recent versions of Xdebug include a "map" feature that allows you to remap file paths during debugging. This is available in DDEV's web container and may be automatically integrated into future DDEV versions.

The map feature is useful when:

- Your container paths don't match your local paths in complex ways
- You're debugging code deployed to different paths than development
- You need path translation beyond simple prefix replacement

This feature complements the standard path mappings configured in your IDE and provides more flexible path transformation capabilities.

## Summary

Xdebug step debugging in DDEV provides powerful interactive debugging capabilities for PHP development:

- DDEV automatically configures `host.docker.internal` for seamless debugging across all platforms
- PHP (the TCP client) initiates connections to your IDE (the TCP server) on port 9003
- The new `ddev xdebug info` command provides configuration details at a glance
- The new `ddev utility xdebug-diagnose` tool automates troubleshooting
- Interactive diagnostic mode provides guided step-by-step testing with your IDE
- Most issues relate to breakpoints in unexecuted code, incorrect path mappings, IDE listener status, or firewalls
- The `xdebugctl` utility provides advanced Xdebug control
- Check `ddev logs` for connection attempts and error messages

The diagnostic tools and automatic configuration make it much easier to identify and fix configuration problems, especially for WSL2 users dealing with complex networking scenarios.

For more information, see:

- [DDEV Step Debugging Documentation](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/)
- [Xdebug Documentation](https://xdebug.org/docs/)
- [Xdebug Step Debugging Guide](https://xdebug.org/docs/step_debug)

Claude Code was used to create an initial draft for this blog, and for subsequent reviews.
