#!/usr/bin/env python3
"""
Records the enrollment trailer from the studio page (src/app/studio/trailer).

The page draws any moment exactly from one clock, so this steps it frame by
frame in headless Chrome, then encodes with ffmpeg:

  public/work/enrollment/trailer.mp4          with the soundtrack (case page)
  public/work/enrollment/trailer-silent.mp4   no audio (home card)
  public/work/enrollment/trailer-poster.webp  "The family stays" frame

The soundtrack is copied, not re-encoded, from the current trailer.mp4
(or --audio). Everything is written to a temp folder first and only moved
into public/ once all three files are made.

Needs `npm run dev` running, ffmpeg on PATH, Google Chrome installed, and
Python Playwright. The video-generation pipeline's venv has Playwright:

  "../../video generation/platform/pipeline/.venv/bin/python" scripts/record-trailer.py
  ... scripts/record-trailer.py --stills 3.6 10.4 21.4   # just these moments, as PNGs
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
PUBLIC = ROOT / "public" / "work" / "enrollment"
POSTER_AT = 29.9


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--url", default="http://localhost:3000/studio/trailer?record")
    ap.add_argument("--stills", nargs="*", type=float, help="only render these moments (seconds) as PNGs")
    ap.add_argument("--stills-dir", default=str(ROOT / ".trailer-stills"), help="where --stills go")
    ap.add_argument("--audio", default=str(PUBLIC / "trailer.mp4"), help="file to copy the soundtrack from")
    ap.add_argument("--crf", default="18", help="x264 quality (lower is better)")
    args = ap.parse_args()

    work = pathlib.Path(tempfile.mkdtemp(prefix="trailer-"))
    frames = work / "frames"
    frames.mkdir()

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
        page.goto(args.url, wait_until="networkidle")
        page.wait_for_function("() => !!window.__trailer")
        page.evaluate("() => document.fonts.ready.then(() => true)")
        duration, fps = page.evaluate("() => [window.__trailer.duration, window.__trailer.fps]")
        stage = page.locator("[data-stage]")
        shot = lambda t, path: (page.evaluate("t => window.__trailer.setTime(t)", t), stage.screenshot(path=str(path)))

        if args.stills:
            out = pathlib.Path(args.stills_dir)
            out.mkdir(parents=True, exist_ok=True)
            for t in args.stills:
                shot(t, out / f"still-{t:05.2f}.png")
                print(f"still {t:.2f}s -> {out / f'still-{t:05.2f}.png'}")
            browser.close()
            shutil.rmtree(work)
            return 0

        total = round(duration * fps)
        for i in range(total):
            shot(i / fps, frames / f"{i:05d}.png")
            if i % 60 == 0:
                print(f"frame {i}/{total}", flush=True)

        # Poster: the same moment the old poster showed, encoded to WebP by Chrome itself.
        shot(POSTER_AT, work / "poster.png")
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
        (work / "trailer-poster.webp").write_bytes(base64.b64decode(webp))
        browser.close()

    print("encoding", flush=True)
    run(["ffmpeg", "-v", "error", "-y", "-i", args.audio, "-vn", "-c:a", "copy", str(work / "audio.m4a")])
    run([
        "ffmpeg", "-v", "error", "-y", "-framerate", str(fps), "-i", str(frames / "%05d.png"),
        "-c:v", "libx264", "-preset", "slow", "-crf", args.crf, "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
        str(work / "trailer-silent.mp4"),
    ])
    run([
        "ffmpeg", "-v", "error", "-y", "-i", str(work / "trailer-silent.mp4"), "-i", str(work / "audio.m4a"),
        "-map", "0:v", "-map", "1:a", "-c", "copy", "-shortest", "-movflags", "+faststart",
        str(work / "trailer.mp4"),
    ])

    for name in ("trailer.mp4", "trailer-silent.mp4", "trailer-poster.webp"):
        shutil.move(str(work / name), str(PUBLIC / name))
        print(f"wrote {PUBLIC / name}")
    shutil.rmtree(work)
    # Same file names, so browsers and the CDN would keep serving the old copies.
    print("Now bump the ?v= tag on the trailer URLs in src/content/home.ts and src/content/case-studies.ts.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
