import type { Shot } from "@/content/types";
import { ShotMedia } from "@/components/screens/ShotMedia";
import styles from "./CaseCover.module.css";

/** One product screen under the snapshot, so a skim-reader sees the product before the reasoning. */
export function CaseCover({ shot, label }: { shot: Shot; label?: string }) {
  label = label ?? "The product";
  return (
    <figure className={`container ${styles.wrap}`} data-reveal>
      <div className={styles.frame} data-video={shot.video ? true : undefined} data-full={shot.full || undefined}>
        <ShotMedia shot={shot} maxScale={1.15} eager />
      </div>
      {!shot.bare && (
        <figcaption className={styles.caption}>
          <span className="t-label c-accent">{label}</span>
          {shot.caption && <span className="t-body-s c-secondary">{shot.caption}</span>}
          <span className="t-label c-tertiary">{shot.note ?? (shot.screen ? "Rebuilt from the design files in a demo brand." : shot.video ? "Screen recording of the live product." : "Real capture of the live product.")}</span>
        </figcaption>
      )}
    </figure>
  );
}
