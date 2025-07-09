---
title: "Testing DDEV with VMware Workstation Pro"
pubDate: 2025-07-10
#modifiedDate: 2025-07-10
summary: A guide to using VMware Workstation Pro to install and test DDEV on Windows and Linux environments, including optimization tips for virtual machine performance and configuration.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/07/vmware-ddev-laravel.png
  alt: Screenshot showing a DDEV Laravel demo project running on Windows using WSL2 and Docker Desktop.
categories:
  - Guides
---

## Introduction

DDEV works in various environments, and it's often tested in virtual machines, but nested virtualization can be hard to set up and may impact performance.

In 2024, VMware Workstation Pro [became free for personal use](https://blogs.vmware.com/cloud-foundation/2024/05/13/vmware-workstation-pro-now-available-free-for-personal-use/).

This guide shows how [VMware Workstation Pro](https://www.vmware.com/) can be used to prepare environments for both Windows and Linux, where Docker and DDEV perform well even inside a VM.

## Installing VMware Workstation Pro

Download and install [VMware Workstation Pro](https://knowledge.broadcom.com/external/article/344595/downloading-and-installing-vmware-workst.html). Packages are available for Windows and Linux.

On Arch-based systems, install via:

```bash
yay -S vmware-workstation
```

Initial configuration steps:

- Edit > Preferences > Workspace > Set virtual machine location to a storage volume with sufficient space
- Edit > Preferences > Updates > Configure update behavior
- Edit > Preferences > Review and adjust other options as needed

## Installing Windows 11

Download [the Windows 11 Disk Image (ISO) for x64 devices](https://www.microsoft.com/en-us/software-download/windows11).

In VMware:

- File > New Virtual Machine > Typical > I will install the operating system later
- Select Windows 10 x64, not Windows 11 x64 (I don't want to use TPM encryption)
- Specify 100 GB disk, stored as a single file
- Customize hardware and finish

To apply additional low-level VM configuration, use the script below:

```bash
#!/usr/bin/env bash

# This script changes more settings than the GUI allows
# Tested only on Arch-based Linux
# Run it from the virtual machine directory

vmx_file="$( (find ./*.vmx -maxdepth 1 -type f 2>/dev/null | head -1) || true)"

if [[ "${vmx_file}" == "" ]]; then
    echo >&2 "Unable to find *.vmx file in the current directory."
    exit 1
fi

# from https://wiki.archlinux.org/title/VMware
declare -A vmware_configs=(
    # 3D acceleration
    ["mks.gl.allowBlacklistedDrivers"]="TRUE"
    # 5 buttons mouse for windows
    ["mouse.vusb.enable"]="TRUE"
    ["mouse.vusb.useBasicMouse"]="TRUE"
    # disable logging
    ["vmx.scoreboard.enabled"]="FALSE"
    ["logging"]="FALSE"
    ["vmx.buildType"]="release"
    # paravirtual adapters
    ["scsi0.virtualDev"]="pvscsi"
    ["ethernet0.virtualDev"]="vmxnet3"
    # performance
    ["MemTrimRate"]="0"
    ["mainmem.backing"]="swap"
    ["prefvmx.useRecommendedLockedMemSize"]="TRUE"
    ["MemAllowAutoScaleDown"]="FALSE"
    ["sched.mem.pshare.enable"]="FALSE"
    ["prefvmx.minVmMemPct"]="100"
    ["mainMem.partialLazySave"]="FALSE"
    ["mainMem.partialLazyRestore"]="FALSE"
    # config
    ["tools.syncTime"]="TRUE"
    ["numvcpus"]="4"
    ["cpuid.coresPerSocket"]="2"
    ["memsize"]="8192"
    ["vhv.enable"]="TRUE"
    ["vpmc.enable"]="TRUE"
)

for key in "${!vmware_configs[@]}"; do
    value="${vmware_configs["${key}"]}"
    line="${key} = \"${value}\""

    if grep -q "^${key}" "${vmx_file}"; then
        sed -i "s/^${key}.*/${line}/" "${vmx_file}"
    else
        echo "${line}" >> "${vmx_file}"
    fi
done

echo "Updated ${vmx_file}"
```

VM settings before first boot (press "Edit virtual machine settings"):

- Hardware > Network Adapter > Connect at power on (uncheck) - for faster Windows installation without checking for updates, will be turned on later
- Hardware > Sound Card > Connect at power on (uncheck) - I don't like any beeps on the first boot, will be turned on later
- Hardware > USB Controller > Automatically connect new USB devices - I don't want to connect any USB
- Hardware > CD/DVD (SATA) > Use ISO image > Browse - select ISO file

Press "Start up this guest operating system".

If Windows 10 was chosen as virtual machine type, then on "Select Image" screen:

- Press Shift+F10, write `regedit`, open `HKEY_LOCAL_MACHINE\SYSTEM\Setup`
- RMB (right mouse button) on Setup > New > Key > write `LabConfig`
- RMB on Values area > New > DWORD (32-bit) Value > write `BypassSecureBootCheck`, set `1`
- RMB on Values area > New > DWORD (32-bit) Value > write `BypassTPMCheck`, set `1`

After the first reboot, don't select country in the initial setup:

- Press Shift+F10, write `OOBE\BYPASSNRO` (`O` letter, not number), needed to create local account (I don't want to login anywhere here).

After Windows boots:

- VMware Menu > VM > Install VMware Tools and reboot.

Windows configuration:

- Settings > Windows Update > Pause
- Explorer > This PC > View > Show > Filename extensions, Hidden items
- Settings > Home > Rename
- System > Power > Screen and sleep > Never
- System > Sound > More sound settings > Sounds > No Sounds

Registry configuration:

```powershell
# Remove recommended applications from the Windows 11 start menu
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Cloud Content" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f
# Disable automatic update for APPX applications in Microsoft Store
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\WindowsStore" /v AutoDownload /t REG_DWORD /d 2 /f
# Disable Meltdown and Spectre
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" /v FeatureSettingsOverride /t REG_DWORD /d 3 /f
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f
# Mouse cursor on the default button
reg add "HKEY_CURRENT_USER\Control Panel\Mouse" /v SnapToDefaultButton /t REG_SZ /d 1 /f
# Enable developer mode feature
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /v "AllowDevelopmentWithoutDevLicense" /d 1 /f
# Set old right click menu
reg add "HKEY_CURRENT_USER\SOFTWARE\CLASSES\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /ve /f
# Restart Windows Explorer
taskkill /f /im explorer.exe
start explorer.exe
# disable reserved storage in Windows 11
dism /Online /Get-ReservedStorageState
dism /Online /Set-ReservedStorageState /State:Disabled
```

Shutdown the virtual machine, press "Edit virtual machine settings":

- Hardware > Network Adapter > Connect at power on (check)
- Hardware > Sound Card > Connect at power on (check)
- Hardware > USB Controller > Automatically connect new USB devices (check if needed)
- Hardware > CD/DVD (SATA) > Connect at power on (uncheck)

Press "Start up this guest operating system", and run inside Windows:

- Search > Disk cleanup
- Search > Defragmentation

At this point, the VM uses more disk space than needed. We can [shrink guest on hosted platform](https://wiki.vi-toolkit.com/index.php?title=Shrink_guest_on_hosted_platform):

- Add VMware Tools to PATH:

  ```powershell
  cmd /c "setx /M PATH ""C:\Program Files\VMware\VMware Tools;%PATH%"""
  ```

- Restart PowerShell, and run:

  ```powershell
  VMwareToolboxCmd.exe disk shrink c:\
  ```

- Wait until `*.vmdk` file at virtual machine location will be shrinked.

VMware Menu > VM > Snapshot > Take snapshot.

Install [Docker](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-windows) and [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#windows). Create additional snapshots as needed.

## Installing Linux

Follow similar steps as for Windows, using a Linux ISO (e.g. [Ubuntu](https://ubuntu.com/download/desktop)).

Install VMware Tools inside the guest:

```bash
# Debian-based:
sudo apt-get install open-vm-tools-desktop
# Fedora-based:
sudo dnf install open-vm-tools-desktop
# Arch-based:
sudo pacman -S open-vm-tools
```

If display resolution is incorrect:

```bash
sudo systemctl restart vmtoolsd.service
```

If copy/paste from/to the host doesn't work:

```bash
vmware-user
# or
vmtoolsd -n vmusr
```

References:

- https://github.com/vmware/open-vm-tools/issues/627
- https://github.com/vmware/open-vm-tools/issues/568

To configure shared folders inside the guest:

```bash
mkdir -p ~/Shared
echo "vmhgfs-fuse $HOME/Shared fuse defaults,allow_other 0 0" | sudo tee -a /etc/fstab
sudo systemctl daemon-reload
sudo mount -a
```

[Shrink Linux VM disk](https://wiki.vi-toolkit.com/index.php?title=Shrink_guest_on_hosted_platform), take a snapshot, then proceed with installing [Docker](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-linux) and [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#ddev-installation-linux). Create additional snapshots as needed.

## How Do You Test DDEV?

If you use a different setup that performs well, consider contributing a guest post to [ddev.com](/) or sharing your findings.
