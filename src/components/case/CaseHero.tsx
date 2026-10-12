import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { deck, type CaseSlug } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { LiveLinks } from "./LiveLinks";
import { HeroStories } from "./HeroStories";
import { HookFrame } from "./hook/HookFrame";
import { hookScreens } from "./hook/screens";
import styles from "./CaseHero.module.css";

export function CaseHero({ study: c }: { study: CaseStudy }) {
  const meta = [
    ["Role", c.meta.role],
    ["Context", c.meta.context],
    ["Timeline", c.meta.timeline],
    ["Domain", c.meta.domain],
  ] as const;

  // The same domain label and screen as the case's card on the home page.
  const card = deck[c.slug as CaseSlug];
  const HookScreen = c.hook ? hookScreens[c.hook.picture.visual] : null;
  const hookNum = c.hook ? (c.hook.number === null ? null : (c.hook.number ?? c.headline)) : null;

  /* The turning point sits in the empty space beside the title on wide screens,
     and under the proof on narrow ones, so the proof stays near the top. Only one
     copy is displayed at a time; the other is display: none. */
  const turn = c.opener?.turn && (
    <figure className={styles.turn}>
      <blockquote>
        <p>“{c.opener.turn.quote}”</p>
      </blockquote>
      <figcaption className="t-label c-tertiary">{c.opener.turn.source}</figcaption>
      {c.opener.turn.after && <p className={`c-secondary ${styles.turnAfter}`}>{c.opener.turn.after}</p>}
    </figure>
  );

  return (
    <header className={`container ${styles.hero}`}>
      <Link href="/#work" className={styles.back}>
        <Icon name="arrow-left" size={16} /> All work
      </Link>

      {c.hook && HookScreen ? (
        <div className={styles.hook}>
          <div className={styles.hookCopy}>
            <p className="t-label">
              <span className="c-accent">{card.domain}</span>
            </p>
            <h1 className={`t-heading-m c-secondary ${styles.titleSmall}`}>{c.title}</h1>
            <p className={`t-display-l ${styles.hookLine}`}>{c.hook.line}</p>
            <p className={`t-heading-l ${styles.hookTurn}`}>{c.hook.turn}</p>
            {hookNum && (
              <p className={styles.hookNumber}>
                {hookNum.value && <span className={`tabular ${styles.headlineValue}`}>{hookNum.value}</span>}
                <span className="t-body-s c-secondary">{hookNum.label}</span>
              </p>
            )}
          </div>
          <div className={styles.hookVisual}>
            <HookFrame hook={c.hook} before={<HookScreen kind="old" />} after={<HookScreen kind="new" />} />
            <p className="t-label c-tertiary">{c.hook.note}</p>
          </div>
        </div>
      ) : c.opener ? (
        <div className={styles.openerWrap}>
          <div className={styles.openerTop} data-turn={c.opener.turn ? "" : undefined}>
            <div className={styles.openerHead}>
              <p className="t-label">
                <span className="c-accent">{card.domain}</span>
              </p>
              <h1 className={`t-heading-m c-secondary ${styles.titleSmall}`}>{c.title}</h1>
              {c.opener.lead ? (
                <p className={styles.lead}>{c.opener.lead}</p>
              ) : (
                <p className={`t-body-l c-secondary ${styles.scope}`}>{c.opener.scope}</p>
              )}
            </div>
            {turn && <div className={styles.turnTop}>{turn}</div>}
          </div>
          <HeroStories opener={c.opener} />
          {turn && <div className={styles.turnBottom}>{turn}</div>}
          {!c.opener.simple && (
            <ul className={styles.tags} aria-label="Topics">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {/* No picture here: the product image right under the hero is the visual for this case. */}
          <div className={styles.copy}>
            <p className="t-label">
              <span className="c-accent">{card.domain}</span>
            </p>
            <h1 className="t-display-l">{c.title}</h1>
            <p className={`t-body-l c-secondary ${styles.dek}`}>{c.dek}</p>
            <ul className={styles.tags} aria-label="Topics">
              {c.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <p className={styles.hookNumber}>
            {c.headline.value && <span className={`tabular ${styles.headlineValue}`}>{c.headline.value}</span>}
            <span className="t-body-s c-secondary">{c.headline.label}</span>
          </p>
        </div>
      )}

      <dl className={styles.meta}>
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="t-label c-tertiary">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {c.live && (
        <div className={styles.links}>
          <LiveLinks live={c.live} />
        </div>
      )}
    </header>
  );
}
