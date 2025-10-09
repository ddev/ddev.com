---
title: "Setting up a Go Development Environment for DDEV"
pubDate: 2024-03-15
modifiedDate: 2025-10-09
summary: "DDEV Contributor Live Training: Setting up a Go Development Environment."
author: Bernardo Martinez
featureImage:
  src: /img/blog/2024/03/Go-Logo_Aqua.svg
  alt: Golang Logo.
categories:
  - Training
  - Videos
  - Guides
  - Community
---

The DDEV Community has regular contributor training sessions, and in July, 2023 we talked about setting up a Go development environment for DDEV. This blog summarizes [the contributor training session](https://youtu.be/IjrJw0Ay-dk). The (Min digit) syntax added below provides the minute on which each subject is covered on the recording.

## Installing Go on different Operating Systems ([Min 10:51](https://youtu.be/IjrJw0Ay-dk?t=647))

Randy used macOS and recommended Homebrew as the tool to manage Go updates.

The first command recommended was

```
brew install go golangci-lint
```

DDEV uses [make](https://www.gnu.org/software/make/) ([Min 13:32](https://youtu.be/IjrJw0Ay-dk?t=810)) to build its binary. Make is included with the macOS Command-Line Tools for Xcode and can be installed with `xcode-select --install`, but that is already required to install Homebrew, so should already be installed.

## Cloning [DDEV](https://github.com/ddev/ddev) repository ([Min 15:30](https://youtu.be/IjrJw0Ay-dk?t=932))

Check out the `ddev` repository with `git clone git@github.com:ddev/ddev -o upstream`. Run `make` to create a new binary. The DDEV Makefile will automatically detect your host OS and build the appropriate binary. However, one can provide a parameter to build others. As an example, `make darwin_amd64` builds the macOS AMD64 binary.

At ([Min 16:30](https://youtu.be/IjrJw0Ay-dk?t=982)) the Makefile located in the root of the DDEV project is lightly explained.

Randy usually symlinks the built binary version to a place inside the `$PATH`, but to run a newly compiled binary one can specify its fully qualified path. For example:

```
./.gotmp/bin/darwin_arm64/ddev --version
```

If we want to avoid prefixing ddev with its built path instructions are included at ([Min 17:37](https://youtu.be/IjrJw0Ay-dk?t=1056)). `ddev --version` describes which binary version is currently used; it's selected by your `$PATH`.

## The role of `mkdocs` ([Min 21:22](https://youtu.be/IjrJw0Ay-dk?t=1276))

`mkdocs` can be tested with `make makedocs`

Makedocs is used for previewing and contributing to the docs. It's named makedocs but it's not related to the make tool or compiling the binary.

You can preview a built version of the docs you're working with using `make mkdocs-serve`.

## Randy's IDE of choice is GoLand ([Min 23:50](https://youtu.be/IjrJw0Ay-dk?t=1547))

GoLand is very similar to PhpStorm and of course is made by the same JetBrains company.

One fantastic thing about Go is that there is only one way to format it ([Min 26:10](https://youtu.be/IjrJw0Ay-dk?t=1576)). It always uses tabs and the same indentation. It all follows the standards set by `gofmt`.

## Debugging DDEV Go Code ([Min 28:17](https://youtu.be/IjrJw0Ay-dk?t=1699))

To verify formatting and static analysis use `make golangci-lint`

`golangci-lint` is the tool used on DDEV CI/CD for incoming pull requests.

For new feature-based pull requests ([Min 31:34](https://youtu.be/IjrJw0Ay-dk?t=1892)) Randy recommends starting with an issue to explain to maintainers the context surrounding their concerns before beginning a PR.

The [DDEV Docs development tab](https://docs.ddev.com/en/latest/developers/) ([Min 32:20](https://youtu.be/IjrJw0Ay-dk?t=1938)) includes plenty of tips and insights.

#### [GoLand](https://www.jetbrains.com/go/) debugging insights ([Min 33:39](https://youtu.be/IjrJw0Ay-dk?t=2014))

At this point Randy showed us a demo on how to run `ddev/cmd/debug-config-yml.go` by first running main.go and then setting the working directory to match an active ddev project.

#### VS Code Go debugging ([Min 37:50](https://youtu.be/IjrJw0Ay-dk?t=2268))

The following extension is mentioned, [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go) by the Go team at Google.

DDEV comes with a launch.json prebuilt for you. It includes the config that might be found in GoLand UI but for VS Code. The one item Randy usually has to change is the working directory ([Min 39:57](https://youtu.be/IjrJw0Ay-dk?t=2395)). He then showed an example on how to debug Go in VS Code.

The most important GO files are in pkg/ddevapp ([Min 44:26](https://youtu.be/IjrJw0Ay-dk?t=2660)), the ones in cmd are the ones associated with a commands and the pkg Go files are functionality.

[Cobra](https://cobra.dev/) is the library used for command flags and arguments. A lot of the commands in the cmd directory are an implementation that calls upon other things.

At ([Min 49:43](https://youtu.be/IjrJw0Ay-dk?t=2977)) a question arose from a user's ability to get VS Code Go working:

```
"cwd":"${workspaceRoot}/../d9simple"
```

The issue was that "d9simple" is a placeholder string that needs to point to a real DDEV directory.

At ([Min 50:50](https://youtu.be/IjrJw0Ay-dk?t=3048)) we can see a walkthrough of running Go tests in VS Code.

devcontainer.json ([Min 58:35](https://youtu.be/IjrJw0Ay-dk?t=3507)) is a file for GitHub Codespaces.

## Keep in touch!

Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) or send [an email](mailto:support%40ddev.com) if you have success (or failure 😀).
