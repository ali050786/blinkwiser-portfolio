#!/usr/bin/env python3
"""
Records a case-study trailer from its studio page (src/app/studio).

Each page draws any moment exactly from one clock, so this steps it frame by
frame in headless Chrome, then encodes with ffmpeg. Trailers:

  enrollment  /studio/trailer, 1920 x 1080, with the original soundtrack
              -> public/work/enrollment/trailer.mp4 (case page),
                 trailer-silent.mp4 (home card), trailer-poster.webp
  platform    /studio/platform-trailer, 1440 x 1080, silent (home card)
              -> public/work/platform/trailer.mp4, trailer-poster.webp
  platform-wide  /studio/platform-wide, 1920 x 840, silent (case page hero)
              -> public/work/platform/cover.mp4, cover-poster.webp
  skills      /studio/skills-trailer, 1440 x 1080, silent (home card)
              -> public/work/ai-system/trailer.mp4, trailer-poster.webp
  skills-wide /studio/skills-wide, 1920 x 840, silent (case page hero)
              -> public/work/ai-system/cover.mp4, cover-poster.webp
  blinkwiser  /studio/blinkwiser-trailer, 1440 x 1080, silent (home card),
              cut from the real recording public/work/blinkwiser/run.mp4
              -> public/work/blinkwiser/trailer.mp4, trailer-poster.webp
  blinkwiser-wide  /studio/blinkwiser-wide, 1920 x 840, silent (case page hero)
              -> public/work/blinkwiser/cover.mp4, cover-poster.webp
  dubai       /studio/dubai-trailer, 1440 x 1080, silent (home card)
              -> public/work/dubai/trailer.mp4, trailer-poster.webp
  dubai-wide  /studio/dubai-wide, 1920 x 840, silent (case page hero)
              -> public/work/dubai/cover.mp4, cover-poster.webp

The soundtrack is copied, not re-encoded, from the current trailer.mp4 (or
--audio). Everything is written to a temp folder first and only moved into
public/ once all files are made. Then bump the ?v= tag on that trailer's
URLs in src/content so browsers and the CDN fetch the new files.

Needs `npm run dev` running, ffmpeg on PATH, Google Chrome installed, and
Python Playwright. The video-generation pipeline's venv has Playwright:

  "../../video generation/platform/pipeline/.venv/bin/python" scripts/record-trailer.py platform
  ... scripts/record-trailer.py platform --stills 2 6 11   # just these moments, as PNGs
"""

import argparse
import base64
import pathlib
import shutil
import subprocess
import sys
import tempfile

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
WORK = ROOT / "public" / "work"

TRAILERS = {
    "enrollment": {"path": "/studio/trailer", "out": WORK / "enrollment", "size": (1920, 1080), "poster_at": 29.9, "audio": True},
    "platform": {"path": "/studio/platform-trailer", "out": WORK / "platform", "size": (1440, 1080), "poster_at": 5.4, "audio": False},
    # The same trailer in 2.3:1 for the case page's hero, saved as cover.mp4 next to the home card's trailer.mp4.
    "platform-wide": {"path": "/studio/platform-wide", "out": WORK / "platform", "size": (1920, 840), "poster_at": 5.4, "audio": False, "stem": "cover"},
    "skills": {"path": "/studio/skills-trailer", "out": WORK / "ai-system", "size": (1440, 1080), "poster_at": 10.9, "audio": False},
    "skills-wide": {"path": "/studio/skills-wide", "out": WORK / "ai-system", "size": (1920, 840), "poster_at": 10.9, "audio": False, "stem": "cover"},
    "blinkwiser": {"path": "/studio/blinkwiser-trailer", "out": WORK / "blinkwiser", "size": (1440, 1080), "poster_at": 12.9, "audio": False},
    "blinkwiser-wide": {"path": "/studio/blinkwiser-wide", "out": WORK / "blinkwiser", "size": (1920, 840), "poster_at": 12.9, "audio": False, "stem": "cover"},
    "dubai": {"path": "/studio/dubai-trailer", "out": WORK / "dubai", "size": (1440, 1080), "poster_at": 7.4, "audio": False},
    "dubai-wide": {"path": "/studio/dubai-wide", "out": WORK / "dubai", "size": (1920, 840), "poster_at": 7.4, "audio": False, "stem": "cover"},
}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("trailer", nargs="?", default="enrollment", choices=sorted(TRAILERS))
    ap.add_argument("--base", default="http://localhost:3000", help="where `npm run dev` is serving")
    ap.add_argument("--stills", nargs="*", type=float, help="only render these moments (seconds) as PNGs")
    ap.add_argument("--stills-dir", default=str(ROOT / ".trailer-stills"), help="where --stills go")
    ap.add_argument("--audio", help="file to copy the soundtrack from (default: the trailer's current trailer.mp4)")
    ap.add_argument("--crf", default="18", help="x264 quality (lower is better)")
    args = ap.parse_args()

    cfg = TRAILERS[args.trailer]
    stem = cfg.get("stem", "trailer")
    out_dir: pathlib.Path = cfg["out"]
    width, height = cfg["size"]
    work = pathlib.Path(tempfile.mkdtemp(prefix="trailer-"))
    frames = work / "frames"
    frames.mkdir()

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
        page.goto(f"{args.base}{cfg['path']}?record", wait_until="networkidle")
        page.wait_for_function("() => !!window.__trailer")
        page.evaluate("() => document.fonts.ready.then(() => true)")
        duration, fps = page.evaluate("() => [window.__trailer.duration, window.__trailer.fps]")
        stage = page.locator("[data-stage]")
        # Trailers cut from a real recording seek a <video> each frame; wait for it before the screenshot.
        seeked = "() => [...document.querySelectorAll('[data-stage] video')].every(v => v.readyState >= 2 && !v.seeking) && [...document.querySelectorAll('[data-stage] img')].every(i => i.complete)"
        shot = lambda t, path: (page.evaluate("t => window.__trailer.setTime(t)", t), page.wait_for_function(seeked), stage.screenshot(path=str(path)))

        if args.stills:
            stills = pathlib.Path(args.stills_dir)
            stills.mkdir(parents=True, exist_ok=True)
            for t in args.stills:
                target = stills / f"{args.trailer}-{t:05.2f}.png"
                shot(t, target)
                print(f"still {t:.2f}s -> {target}")
            browser.close()
            shutil.rmtree(work)
            return 0

        total = round(duration * fps)
        for i in range(total):
            shot(i / fps, frames / f"{i:05d}.png")
            if i % 60 == 0:
                print(f"frame {i}/{total}", flush=True)

        # Poster: a chosen moment, encoded to WebP by Chrome itself (this ffmpeg has no WebP encoder).
        shot(cfg["poster_at"], work / "poster.png")
        b64 = base64.b64encode((work / "poster.png").read_bytes()).decode()
        webp = page.evaluate(
            """async (b64) => {
                const img = new Image();
                img.src = 'data:image/png;base64,' + b64;
                await img.decode();
                const c = document.createElement('canvas');
                c.width = img.width; c.height = img.height;
                c.getContext('2d').drawImage(img, 0, 0);
                return c.toDataURL('image/webp', 0.86).split(',')[1];
            }""",
            b64,
        )
        (work / f"{stem}-poster.webp").write_bytes(base64.b64decode(webp))
        browser.close()

    print("encoding", flush=True)
    silent = work / (f"{stem}-silent.mp4" if cfg["audio"] else f"{stem}.mp4")
    run([
        "ffmpeg", "-v", "error", "-y", "-framerate", str(fps), "-i", str(frames / "%05d.png"),
        "-c:v", "libx264", "-preset", "slow", "-crf", args.crf, "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
        str(silent),
    ])
    names = [silent.name, f"{stem}-poster.webp"]
    if cfg["audio"]:
        audio_src = args.audio or str(out_dir / f"{stem}.mp4")
        run(["ffmpeg", "-v", "error", "-y", "-i", audio_src, "-vn", "-c:a", "copy", str(work / "audio.m4a")])
        run([
            "ffmpeg", "-v", "error", "-y", "-i", str(silent), "-i", str(work / "audio.m4a"),
            "-map", "0:v", "-map", "1:a", "-c", "copy", "-shortest", "-movflags", "+faststart",
            str(work / f"{stem}.mp4"),
        ])
        names.append(f"{stem}.mp4")

    out_dir.mkdir(parents=True, exist_ok=True)
    for name in names:
        shutil.move(str(work / name), str(out_dir / name))
        print(f"wrote {out_dir / name}")
    shutil.rmtree(work)
    # Same file names, so browsers and the CDN would keep serving the old copies.
    print("Now bump the ?v= tag on this trailer's URLs in src/content (home.ts, case-studies.ts).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
