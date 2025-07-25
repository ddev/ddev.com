---
title: "Debugging Golang (Go) Applications"
pubDate: 2024-05-17
modifiedDate: 2025-02-26
summary: Debugging Golang applications using GoLand or VS Code
author: Randy Fay
featureImage:
  src: /img/blog/2024/05/golang-nerd-banner.png
  alt: Golang Gopher teaching Go
  credit: "Golang logo from https://blog.golang.org/go-brand and Gopher Nerd by Nats Romanova, https://github.com/GolangUA/gopher-logos/blob/master/README.md"
categories:
  - Training
  - Videos
  - Guides
---

It's not hard to work with DDEV's Golang code, but you definitely need a development environment and the know-how to do step-debugging. Here's our [Contributor Training](contributor-training.md) showing some of the nuances with DDEV, followed by a short summary of the details.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/E-AEzC1p76E?si=XYP23HYcxgqiJ2_M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

First, you need some of the basics:

- Install `go`, `make`, and `delve` (needed for Visual Studio Code only)
  - On macOS: `brew install golang delve` (`make` is already provided by Apple's Xcode command-line tools)
  - WSL2/Linux: `sudo snap install --classic go && sudo apt update && sudo apt install -y build-essential clang ccache`
- Install your IDE, [GoLand](https://www.jetbrains.com/go/) or [VS Code](https://code.visualstudio.com/). On Windows/WSL2 most people install each of these on the Windows side, although they can be run inside WSL2 using the Linux versions.
- For GoLand, nothing further is required, but on VS Code you'll need to install the [Golang go](https://marketplace.visualstudio.com/items?itemName=golang.go) extension.

Once you've have your IDE working, you can start debugging.

## GoLand Debugging

### Debug a simple command like `ddev list`

- Open `main.go` in GoLand
- Right-click on `main.go` in the left pane (`cmd/ddev/main.go`) and click `Run`
- GoLand will create a "Run/Debug Configuration" named `go build main.go`
- Edit the configuration:
  - Change its name to the command you want to work on, like `ddev list`
  - Change the "Program Arguments" to the arguments to `ddev`, like `list`
  - Change the "Working Directory" to a valid DDEV project
  - (optional) If you need to override the version of the built `ddev` you can add `-ldflags " -extldflags -static -X 'github.com/ddev/ddev/pkg/versionconstants.DdevVersion=v1.23.5-goland'"` to "Go tool arguments" - version `v1.23.5-goland` can be whatever you need.
- Set a breakpoint by clicking to the left of a line, for example in `cmd/ddev/cmd/list.go`
- Click the `Run` or `Debug` button on the top bar.

### Debug a Test in the `pkg` directory

Test function names all begin with `Test` and they're in files named `*_test.go`

In DDEV, the tests in the `pkg` directory have no dependencies, you can just run them.

- Find a test you want to run.
- Click the arrowhead (run) or "bug" (debug) symbol next to the test
- Or right-click on a `*_test.go` file to run all the tests in the file.

### Debug a test in the `cmd` directory

In the `cmd` directory most tests actually _run_ the `ddev` binary, so you'll need to make sure that the `ddev` in the `$PATH` is the one that represents the code you're testing. For example, `TestDebugMigrateDatabase` in `cmd\ddev\cmd\debug-migrate-database_test.go` actually executes `ddev debug migrate-database`, so if you don't have the right `ddev` in your `$PATH`, your test is not valid.

Otherwise, everything is the same. Just click the arrowhead or the "bug" beside a test and let it run.

## Visual Studio Code (VS Code) Debugging

VS Code debugging is a bit more tweaky. It seems that for commands, you need to configure what you want to use in the launch.json. DDEV code comes with a built-in launch.json, which you can copy-and-paste as needed. For example:

### Running or debugging a simple command like `ddev list`

- In DDEV's `launch.json` edit the configuration `debug ddev start` to set the `cwd` to a valid path to a DDEV project.
- Set a breakpoint in `cmd/ddev/cmd/start.go`
- Click the triangle/bug icon at the left to "Run and Debug"
- Select "debug ddev start"
- Click the green arrowhead to the left of "debug ddev start"
- `ddev start` will happen, and it will stop at the line where you set the breakpoint.
- Classic debugger behavior is available, either with icons or function keys, and you can examine variable values as you go.

### Running a test

Running tests is almost exactly the same as in GoLand. Right-click the arrow next to the test function and choose "Run" or "Debug". The same caveats apply for `cmd` tests, you need `ddev` built from the same code in your `$PATH`.

## Contributions welcome!

When you try this out in your own environment, you'll certainly have suggestions to improve it. Please do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

And join us most Wednesdays for [DDEV Live Contributor Training](contributor-training.md).
