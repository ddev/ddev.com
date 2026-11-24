---
title: "Video Uploads in DDEV: FFmpeg, Upload Limits, and a Transcode Worker"
pubDate: 2026-11-24
summary: Add FFmpeg to the web container, get past PHP's 100 MB upload limit, keep large uploads out of Mutagen sync, and transcode in a web_extra_daemons worker instead of the upload request.
author: Mark Santos
featureImage:
  src: /img/blog/2026/11/video-uploads-ffmpeg-ddev.svg
  alt: Illustration of a film strip entering a container and leaving it as a play button, representing uploaded video transcoded inside the DDEV web container
categories:
  - Guides
---

A site that takes video uploads, whether through a Drupal media field, a WordPress plugin, or a Laravel app, needs FFmpeg for poster images and for transcoding. Phone uploads make the transcode necessary. iPhones record HEVC unless the camera is switched to "Most Compatible" ([Apple's notes](https://support.apple.com/en-us/116944)), and browser support for HEVC depends on the operating system and the hardware: [Can I use](https://caniuse.com/hevc) lists it as partial in Chrome, Edge, and Firefox. H.264 in an MP4 [plays in every current browser](https://caniuse.com/mpeg4).

I set this up in a DDEV `php` project to see what it takes locally: FFmpeg in the web container, uploads larger than 100 MB, and a transcode that doesn't hold the upload request open. Everything below ran on DDEV v1.25.5, and again on v1.25.6, with Colima on an Apple Silicon Mac. The test file was a 90-second, 143 MB, 1080p HEVC clip.

## Add FFmpeg to the Web Container

FFmpeg is a Debian package, so [`webimage_extra_packages`](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage_extra_packages-and-dbimage_extra_packages) is all it takes:

```bash
ddev config --webimage-extra-packages=ffmpeg
ddev restart
ddev exec ffmpeg -version

ffmpeg version 7.1.5-0+deb13u1 Copyright (c) 2000-2026 the FFmpeg developers
```

DDEV builds a project-specific web image with the package added. The first `ddev restart` took about two minutes while it built, and the image grew from 1.88 GB to 2.41 GB. Later restarts reuse it.

The version is the one Debian 13 ships, so it changes when DDEV moves to a new Debian release, not when FFmpeg releases. Debian's build includes `libx264`, `libx265`, `libvpx-vp9`, `libsvtav1`, `libopus`, and FFmpeg's own `aac` encoder, but not `libfdk_aac`, which is non-free. If production runs a different build, check that the encoders your code uses exist in both:

```bash
ddev exec "ffmpeg -hide_banner -encoders | grep -E 'libx264|aac'"
```

## Raise the Upload Limit

DDEV's PHP-FPM accepts uploads up to 100 MB: `upload_max_filesize` and `post_max_size` are both `100M`. Above that, PHP drops the file before your code runs. `$_FILES` is empty, and `ddev logs` shows:

```text
PHP Warning:  PHP Request Startup: POST Content-Length of 142710582 bytes exceeds the limit of 104857600 bytes in Unknown on line 0
```

Check these values from a web request with `ini_get()` or `phpinfo()`, not with `ddev exec php -i`, which reports the CLI's settings. Raise both in a file in `.ddev/php/`:

```ini
; .ddev/php/video-uploads.ini
upload_max_filesize = 2G
post_max_size = 2G
```

Then run `ddev restart`. Nothing else needed changing: DDEV's nginx sets `client_max_body_size 0`, which means no limit, its `fastcgi_read_timeout` is 10 minutes, and PHP-FPM's `max_execution_time` is 600 seconds.

## Keep Uploads Out of Mutagen

With [Mutagen](https://docs.ddev.com/en/stable/users/install/performance/#mutagen) enabled, the project lives in a volume inside Docker and is synced to your disk, so every upload written in the container gets copied back to the host. `ddev start` warns about this for a `php` project with no `upload_dirs`. Directories listed in [`upload_dirs`](https://docs.ddev.com/en/stable/users/configuration/config/#upload_dirs) are bind-mounted instead and left out of the sync.

I used two: `public/videos` for the transcoded files the browser loads, and `private` for the originals, outside the docroot. The paths are relative to the docroot:

```bash
ddev config --upload-dirs=videos,../private
ddev mutagen reset
ddev start
```

Setting `upload_dirs` replaces the defaults DDEV uses for your CMS, so on Drupal, list `sites/default/files` along with any directory you add.

## Transcode Outside the Upload Request

Transcoding the test clip to H.264 took 22 to 25 seconds with Colima set to 4 CPUs and nothing else running on the Mac, about a quarter of the clip's length. In earlier runs, while other jobs had the CPUs, the same encode took 82 to 145 seconds, around real time. The container can't use the Mac's hardware encoder, so the encode runs on the CPUs Docker has and slows down with everything else on the machine. At the slower rate, a 10-minute phone video would run past the 10-minute `fastcgi_read_timeout`, and even at the faster one it would keep a PHP-FPM worker and the browser waiting for minutes, so the upload request should only save the file.

`public/upload.php` accepts a few video extensions and saves the original in `private/incoming`:

```php
<?php
// Saves an uploaded video to private/incoming, outside the docroot, for the worker.
header('Content-Type: application/json');

$file = $_FILES['video'] ?? null;
if ($file === null || $file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => $file['error'] ?? 'no file received']);
    exit;
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, ['mov', 'mp4', 'm4v', 'webm', 'mkv'], true)) {
    http_response_code(415);
    echo json_encode(['error' => "unsupported extension: $ext"]);
    exit;
}

$incoming = dirname(__DIR__) . '/private/incoming';
is_dir($incoming) || mkdir($incoming, 0775, true);
$name = bin2hex(random_bytes(8)) . ".$ext";
// move_uploaded_file() copies across filesystems, so write a dotfile the
// worker skips, then rename it, which is atomic within one directory.
move_uploaded_file($file['tmp_name'], "$incoming/.$name");
rename("$incoming/.$name", "$incoming/$name");
echo json_encode(['queued' => $name, 'bytes' => $file['size']]);
```

The dotfile is there because PHP's temporary upload directory and the bind-mounted `private` directory are different filesystems. [`move_uploaded_file()`](https://www.php.net/manual/en/function.move-uploaded-file.php) can't rename a file from one to the other, so it copies it, and a worker that polls the directory could open a half-written file.

`bin/transcode-worker.php` polls `private/incoming`, writes an MP4 and a poster JPEG to `public/videos`, and moves anything FFmpeg can't read to `private/failed`:

```php
<?php
// Turns each upload in private/incoming into an H.264 MP4 and a poster JPEG.
$root = dirname(__DIR__);
$incoming = "$root/private/incoming";
$failed = "$root/private/failed";
$videos = "$root/public/videos";
foreach ([$incoming, $failed, $videos] as $dir) {
    is_dir($dir) || mkdir($dir, 0775, true);
}

while (true) {
    foreach (glob("$incoming/*") as $src) {
        $id = pathinfo($src, PATHINFO_FILENAME);
        $part = "$videos/.$id.mp4";
        $start = microtime(true);
        $ok = run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', $src,
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', $part])
            && run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', '1', '-i', $part,
                '-frames:v', '1', '-vf', 'scale=640:-2', "$videos/$id.jpg"]);
        if ($ok) {
            rename($part, "$videos/$id.mp4");
            unlink($src);
            printf("transcoded %s in %.0fs\n", basename($src), microtime(true) - $start);
        } else {
            is_file($part) && unlink($part);
            rename($src, "$failed/" . basename($src));
            echo 'failed ', basename($src), "\n";
        }
    }
    sleep(2);
}

function run(array $cmd): bool
{
    // An array command runs without a shell, so file names need no escaping.
    $proc = proc_open($cmd, [0 => ['file', '/dev/null', 'r'], 1 => STDOUT, 2 => STDERR], $pipes);
    return is_resource($proc) && proc_close($proc) === 0;
}
```

`-pix_fmt yuv420p` keeps the output at 8-bit 4:2:0, which [most H.264 profiles](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs#avc_h.264) use. Without it, a 10-bit source comes out as H.264 High 10: a 10-bit HEVC test clip transcoded without the option gave `profile=High 10` in `ffprobe`. `-movflags +faststart` moves the MP4's index, the `moov` atom, ahead of the media data, so a browser can start playing before it has the whole file. My test upload had it at the end. To check a result:

```bash
ddev exec "ffprobe -v trace -i public/videos/91df5790335e596b.mp4 2>&1 | grep -o \"type:'\(moov\|mdat\)'\" | head -2"

type:'moov'
type:'mdat'
```

## Run the Worker With `web_extra_daemons`

[`web_extra_daemons`](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#running-extra-daemons-using-web_extra_daemons) adds a program to supervisord in the web container, so the worker starts with the project and comes back if it exits. I kept it in its own file, `.ddev/config.worker.yaml`:

```yaml
web_extra_daemons:
  - name: transcode-worker
    command: php bin/transcode-worker.php
    directory: /var/www/html
```

After `ddev restart`, `ddev exec supervisorctl status` lists `webextradaemons:transcode-worker` as `RUNNING`, and the worker's output, FFmpeg's errors included, shows up in `ddev logs`. This is the 143 MB clip and a text file renamed to `.mov`, uploaded together:

```text
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xc74721146d80] moov atom not found
failed 5e10d56a47790141.mov
transcoded 91df5790335e596b.mov in 26s
```

supervisord doesn't reload the worker when you edit it. Restart it with:

```bash
ddev exec supervisorctl restart webextradaemons:transcode-worker
```

A framework queue does the same job with retries and a record of what ran. Point `command` at `php artisan queue:work` in Laravel or `php bin/console messenger:consume async` in Symfony, and keep the FFmpeg call in the job.

## Serve the Result

DDEV's router and nginx answer byte-range requests with no extra configuration, and Safari on iOS [needs them](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingVideoforSafarioniPhone/CreatingVideoforSafarioniPhone.html) to play video:

```bash
curl -sk -o /dev/null -D - -r 0-1023 https://vidlab2.ddev.site/videos/91df5790335e596b.mp4

HTTP/2 206
content-range: bytes 0-1023/110554096
content-type: video/mp4
content-length: 1024
```

The originals in `private/` sit outside the docroot, so the web server can't serve them: a request for one returns a 404. An upload with an extension outside the list gets a 415 and never lands in `private/incoming`.

## Limits

- The encode uses the CPUs you give Docker. On a Mac, the container can't use VideoToolbox, so there is no hardware encoding.
- One worker encodes one file at a time, and uploads wait their turn.
- Each project that adds FFmpeg builds its own web image, about 540 MB larger here.
- The worker trusts FFmpeg to reject a file that isn't video. A server that takes uploads from the public also needs a size limit per user and a check on the duration before it spends minutes of CPU on a file.
