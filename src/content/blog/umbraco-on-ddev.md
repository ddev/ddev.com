---
title: "Umbraco on DDEV: .NET, SQL Server, and the generic project type"
pubDate: 2026-08-20
summary: An experiment in running Umbraco CMS and .NET 10 under DDEV, using the generic project type, a custom web image, and Azure SQL Edge.
author: Lee Mills
featureImage:
  src: /img/blog/2026/08/umbraco-on-ddev.png
  alt: DDEV and Umbraco logos joined by a plus sign
categories:
  - Community
  - TechNotes
---

DDEV's `generic` project type will run anything that brings its own web server, and people already use it for Node and other stacks. Umbraco is a less-travelled case: .NET, [Kestrel](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel), and SQL Server. I wanted to know how much of the DDEV experience still holds up there. Clone a repository, run one command, have a working site and database a few minutes later.

Most of it holds up. The result is [umbraco-clean-ddev](https://github.com/millnut/umbraco-clean-ddev), which runs Umbraco on .NET 10 with SQL Server and Adminer, and gets a new developer going with a single `ddev start`. What took the time was a handful of places where DDEV expected something I had not worked out yet.

## What I wanted out of it

I wanted four things out of this, and nothing more ambitious than that.

1. One command for someone joining the project
2. Nothing installed on my own machine: no SQL Server, no .NET SDK, none of the project's other dependencies.
3. Projects that stay out of each other's way.
4. A way to take a backup from Umbraco Cloud and debug against it locally.

DDEV already does all of this elsewhere. The Umbraco Cloud backup turned out to be the least transferable: `ddev import-db` and `ddev export-db` work on the database container DDEV manages, and this project omits that container entirely. Anything equivalent I would have to write myself.

Keeping the dependencies off my machine also makes the project easier to hand to someone who has never worked with .NET. The SDK and SQL Server both live in containers, so trying Umbraco does not start with installing either of them locally. Clone the repository, run one command, and the CMS is there to look at.

## The parts that needed working out

### The generic project type

DDEV's `generic` type doesn't start nginx or PHP-FPM, which is what you want when the application brings its own web server:

```yaml
# .ddev/config.yaml
name: umbraco-clean
type: generic
docroot: ""
webserver_type: generic
omit_containers: [db]
disable_settings_management: true
```

`omit_containers: [db]` drops DDEV's MariaDB, since SQL Server runs as a separate service and MariaDB would only sit there idling.

A generic web server type also emits no default router configuration, so without one, every request 404s. `web_extra_exposed_ports` supplies it:

```yaml
# .ddev/config.yaml
web_extra_exposed_ports:
  - name: umbraco
    container_port: 80
    http_port: 80
    https_port: 443
```

Those two port numbers being equal matters. DDEV builds the Traefik backend URL from `http_port` rather than `container_port`, so an otherwise reasonable pairing of `container_port: 8080` with `http_port: 80` sends traffic to port 80 in the container and returns a 502. I lost a while to that one before reading the router configuration it generates.

### The .NET SDK is not in the web image

DDEV's web image has no .NET SDK, so `.ddev/web-build/Dockerfile.dotnet` adds one. The important thing about that file is what it does not contain:

```dockerfile
# .ddev/web-build/Dockerfile.dotnet
RUN curl -fsSL https://packages.microsoft.com/config/debian/13/packages-microsoft-prod.deb -o /tmp/pmp.deb \
    && dpkg -i /tmp/pmp.deb \
    && rm /tmp/pmp.deb \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y dotnet-sdk-10.0 mssql-tools18 \
    && rm -rf /var/lib/apt/lists/*

RUN dotnet tool install --tool-path /usr/local/share/dotnet-tools microsoft.sqlpackage

ENV PATH="$PATH:/usr/local/share/dotnet-tools:/opt/mssql-tools18/bin"
```

There is no `FROM` line. DDEV prepends its own, and adding one starts a fresh stage that throws away the user setup, supervisord, healthcheck and tooling that make the container a DDEV container. You would have to rebuild all of that yourself, which I do not recommend as a way to spend an evening.

Debian trixie ships no .NET packages, so the SDK comes from Microsoft's feed, registered by installing `packages-microsoft-prod.deb`. Only .NET 10 publishes an ARM64 build there, so anyone on Apple Silicon has a floor of 10.0.

I also left `webimage_extra_packages` out of `config.yaml` on purpose. DDEV injects it ahead of the `web-build` Dockerfile, so any package listed there is looked up before the Microsoft feed exists.

### SQL Server on Apple Silicon

Full SQL Server publishes no ARM64 image, so the database service is Azure SQL Edge. It speaks the same TDS protocol and Umbraco cannot tell the difference.

DDEV does have an add-on for SQL Server, [ddev-sqlsrv](https://github.com/ddev/ddev-sqlsrv), which runs full SQL Server and works on Apple Silicon through Rosetta 2 emulation. Apple has announced Rosetta is going away, and I wanted to see what was possible without installing it.

This is the choice I would most like to revisit. If Microsoft ever publishes an ARM64 image, I would rather be running full SQL Server than Azure SQL Edge.

```yaml
# .ddev/docker-compose.umbraco.yaml
services:
  sqlserver:
    container_name: ddev-${DDEV_SITENAME}-sqlserver
    image: mcr.microsoft.com/azure-sql-edge:latest
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=${MSSQL_SA_PASSWORD}
    volumes:
      - sqlserver-data:/var/opt/mssql
    healthcheck:
      test:
        - CMD-SHELL
        - python3 -c "import socket; s=socket.create_connection(('localhost',1433),2); s.close()"
      start_period: 30s
```

The healthcheck is a raw socket connection because Azure SQL Edge ships no `sqlcmd` to query with. It only proves the port is open, and the server accepts logins a moment after that, so the check is weaker than I would like. The 30 second grace period covers the initialisation of the system databases on a first run, which takes about 20 seconds and would otherwise exhaust the retries.

The named volume is why the database survives a `ddev restart`: without it every restart would hand Umbraco an empty server and trigger the unattended install again.

Alongside `sqlserver` and `adminer`, the compose file carries a short `web` block, the one place this project reaches into the container DDEV owns:

```yaml
# .ddev/docker-compose.umbraco.yaml
services:
  web:
    depends_on:
      sqlserver:
        condition: service_healthy
    environment:
      - Umbraco__CMS__WebRouting__UmbracoApplicationUrl=${DDEV_PRIMARY_URL}
```

`condition: service_healthy` is what the healthcheck above exists for. It holds the web container until SQL Server answers, so `dotnet watch` is not racing a database that has not finished booting. `UmbracoApplicationUrl` hands Umbraco the site's real external address rather than letting it infer one from a request that arrived over plain HTTP from the router. Everything else about the web container is configured through `config.yaml`, so DDEV keeps ownership of its lifecycle.

### Keeping Kestrel alive

The application runs as an extra daemon rather than as a container command:

```yaml
# .ddev/config.yaml
web_extra_daemons:
  - name: umbraco
    command: "dotnet watch run --non-interactive --no-launch-profile"
    directory: /var/www/html/MyProject
```

That puts `dotnet watch` under the web container's supervisord, so supervisord restarts it on failure. Overriding the compose command instead would displace DDEV's own entrypoint, and a build error would leave you with a container that is up but serving nothing.

### TLS is terminated on the router

Five environment variables, two of them there because the router sits in front of Kestrel:

```yaml
# .ddev/config.yaml
web_environment:
  - ASPNETCORE_ENVIRONMENT=Development
  - ASPNETCORE_URLS=http://0.0.0.0:80
  - ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
  - DOTNET_CLI_TELEMETRY_OPTOUT=1
  - NUGET_PACKAGES=/mnt/ddev-global-cache/nuget
```

Kestrel has to bind `0.0.0.0` because the router reaches it across the Docker network rather than over loopback. The forwarded headers setting is easy to miss and confusing when it's absent: the router terminates TLS and forwards plain HTTP, so without it Kestrel decides the request was insecure and generates `http://` links on an `https://` site.

The NuGet line has nothing to do with the router. It moves the package cache onto a DDEV volume, so a rebuilt container no longer re-downloads every package. The remaining two are ordinary .NET settings that happen to belong here rather than in a launch profile.

## Getting it running

```bash
ddev start
```

A `pre-start` hook copies `appsettings.Local.json.example` into place when it is missing:

```yaml
# .ddev/config.yaml
hooks:
  pre-start:
    - exec-host: "bash -c '[ -f MyProject/appsettings.Local.json ] || cp MyProject/appsettings.Local.json.example MyProject/appsettings.Local.json'"
```

`pre-start` rather than `post-start`, because Kestrel comes up with the container: a `post-start` hook would write the file after the application had already read its configuration. That phase also forces `exec-host`, since there is no container yet to run the command inside.

On first boot Umbraco runs its unattended install, creating the schema and the default admin user, `admin@example.com` with password `1234567890`.

:::warning[Error 4060 on first boot]
The first boot logs `Cannot open database "UmbracoDb"` with error number 4060. The database does not exist until the unattended install creates it, so Umbraco logs the error a couple of times during startup until it can connect and action the unattended install.
:::

After that, `ddev dotnet` is a passthrough that runs the CLI in the project directory, so nobody needs the SDK on their host to run `ddev dotnet build`.

## Moving the database around

This is the one I care most about: pulling a backup down from Umbraco Cloud and running it locally to test or debug against real content. A local environment that cannot take a copy of the site's actual database will not reproduce the bug you are chasing. DDEV's own `import-db` and `export-db` talk to the container this project does not have, and Umbraco Cloud backups come as `.bacpac` files, so I wrote two commands to handle them:

```bash
ddev bacpac-export              # writes UmbracoDb.bacpac to the project root
ddev bacpac-import UmbracoDb.bacpac
```

Both wrap `sqlpackage`, which has no apt package and so gets installed via `dotnet tool install` in the web image build. Import is the harder of the two: `sqlpackage` requires an empty or nonexistent target, and Kestrel holds an open connection to the database being dropped:

```bash
# .ddev/commands/web/bacpac-import
sqlcmd -S sqlserver -U sa -P "${MSSQL_SA_PASSWORD}" -C -Q "
IF DB_ID('UmbracoDb') IS NOT NULL
BEGIN
    ALTER DATABASE UmbracoDb SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE UmbracoDb;
END"
```

`SINGLE_USER WITH ROLLBACK IMMEDIATE` forces that connection closed so the drop can proceed. Both commands read and write `/var/www/html`, which is the host-mounted project root, so a `.bacpac` downloaded from Cloud goes next to the solution file and imports from there.

## Things that look wrong and are deliberate

`.ddev/.env` holds the SA password, the Umbraco connection string and the SMTP configuration for mailpit, and it is committed. That is a fixed local development credential in the same spirit as DDEV's own db/db/db, and committing it is what makes a fresh clone work with no manual step. On a project with real secrets I would not do this: the file would move somewhere untracked, and a setup step would have to prompt for the values.

`appsettings.Local.json` is git-ignored and exists for per-developer overrides such as logging levels. `Program.cs` registers it after `CreateBuilder` has already added the environment variable provider, so that file wins over `.ddev/.env`. A `ConnectionStrings` block there will override the environment, and someone who then edits the password in `.ddev/.env` will find it has no effect.

Both files the Adminer add-on provides are committed here, the compose file and the `ddev adminer` launcher, so `ddev add-on get` never has to run and a clone starts with Adminer already working. `docker-compose.adminer.yaml` carries one edit: its default `depends_on: [db]` is gone, because this project has no `db` container. Adminer's connection defaults are set in `docker-compose.umbraco.yaml` instead, pointing it at the `sqlserver` service. Neither committed copy carries a `#ddev-generated` marker, so DDEV treats them as mine and leaves them alone. The cost is that they no longer update with the add-on.

## Try it

The repository is at [millnut/umbraco-clean-ddev](https://github.com/millnut/umbraco-clean-ddev), built on Paul Seal's [Clean](https://github.com/prjseal/Clean) starter kit. Clone it, run `ddev start`, and you should have Umbraco and SQL Server running without either of them touching your machine directly.

It is still a bespoke setup rather than something reusable. The .NET SDK install, the SQL Server service and the bacpac commands are all things I now maintain by hand, and an add-on would be a better home for most of them. If you work with Umbraco or .NET and want to try it, I would be glad to hear what breaks: I have only run this on my own machine, against one project.
