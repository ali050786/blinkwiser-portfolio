import type { HookVisualId } from "@/content/types";
import { HookMark as Mark } from "./HookMark";
import sr from "./SameRequest.module.css";
import s from "./Screens.module.css";

/**
 * The two screens for each picture-first hero. Illustrations in demo brands
 * with generic content: no client screens, names or token names. Elements tied
 * to a finding carry data-n so the active tab can bring them forward.
 */

type Kind = "old" | "new";

/* ------------------------------------------------ 03 AI-readable design system */
function SameRequest({ kind }: { kind: Kind }) {
  const old = kind === "old";
  return (
    <div className={sr.screen} data-kind={kind} aria-hidden="true">
      <div className={sr.top}>
        <span className={sr.logo} />
        <span className={sr.topLine} />
      </div>
      <div className={sr.frame}>
        <div className={sr.rail} data-missing={old || undefined} data-n="3">
          {old ? (
            <Mark n={3} />
          ) : (
            <>
              <span className={sr.railItem} data-on />
              <span className={sr.railItem} />
              <span className={sr.railItem} />
            </>
          )}
        </div>
        <div className={sr.body}>
          <span className={sr.pageTitle}>Account summary</span>
          <div className={sr.tiles}>
            <div className={sr.tile}>
              <span className={sr.tileLabel}>Available balance</span>
              <span className={sr.tileValue}>$950.00</span>
              <span className={sr.link} data-n="2">
                Transactions →{old && <Mark n={2} />}
              </span>
            </div>
            <div className={sr.tile}>
              <span className={sr.line} style={{ width: "70%" }} />
              <span className={sr.line} style={{ width: "50%" }} />
              <span className={sr.line} style={{ width: "60%" }} />
            </div>
          </div>
          <div className={sr.foot}>
            {old ? (
              <>
                <span className={sr.primary} data-n="1">
                  Save
                  <Mark n={1} />
                </span>
                <span className={sr.secondary}>Cancel</span>
              </>
            ) : (
              <>
                <span className={sr.secondary}>Cancel</span>
                <span className={sr.primary} data-n="1">
                  Save
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------ 02 Enterprise platform */
function ClientTheme({ kind }: { kind: Kind }) {
  const old = kind === "old";
  return (
    <div className={s.screen} data-kind={kind} aria-hidden="true">
      <div className={s.brandBar} data-n="1" data-stale={old || undefined}>
        <span className={s.brandLogo} />
        <span className={s.brandName}>Employer B</span>
        {old && <Mark n={1} />}
      </div>
      <div className={s.body}>
        <span className={s.title}>Your coverage</span>
        <div className={s.cards}>
          {["Medical", "Dental"].map((t, i) => (
            <div key={t} className={s.cardMini}>
              <span className={s.cardLabel}>{t}</span>
              <span className={s.bar} style={{ width: i ? "55%" : "70%" }} />
              <span className={s.cta} data-n="2" data-variant={old && i === 1 ? "odd" : undefined}>
                View
                {old && i === 1 && <Mark n={2} />}
              </span>
            </div>
          ))}
        </div>
        {old ? (
          <div className={s.status} data-n="3" data-bad>
            Rebuilt by hand for this client · weeks
            <Mark n={3} />
          </div>
        ) : (
          <div className={s.status} data-n="3">
            <span className={s.tier}>Insurer</span>→<span className={s.tier}>Employer</span>→<span className={s.tier}>Member</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ 04 Blinkwiser */
function TrustEdit({ kind }: { kind: Kind }) {
  const old = kind === "old";
  return (
    <div className={s.screen} data-kind={kind} aria-hidden="true">
      <div className={s.slide}>
        <span className={s.slideKicker}>Slide 3</span>
        <span className={s.stat} data-n="1">
          8 in 10
          {old ? <Mark n={1} /> : <span className={s.source}>[2]</span>}
        </span>
        <span className={s.slideLine}>creators post every week</span>
      </div>
      <div className={s.chat}>
        <span className={s.bubbleUser}>Make slide 3 punchier</span>
        <span className={s.bubbleAi} data-n="2" data-bad={old || undefined}>
          {old ? "I've rewritten the carousel." : "Slide 3 didn't change. Retrying."}
          {old && <Mark n={2} />}
        </span>
      </div>
      <div className={s.footRow} data-n="3">
        {old ? (
          <span className={s.undo} data-bad>
            Undo? Ask in the chat
            <Mark n={3} />
          </span>
        ) : (
          <span className={s.undo}>↺ Restore point saved</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ 05 Dubai Municipality */
const departments = ["Department A", "Department B", "Department C"];
const needs = ["Permits", "Complaints", "Bookings", "Waste"];

function CityHome({ kind }: { kind: Kind }) {
  const old = kind === "old";
  return (
    <div className={s.screen} data-kind={kind} aria-hidden="true">
      <div className={s.body}>
        {old ? (
          <span className={s.title} data-n="2">
            Services A–Z, by official name
            <Mark n={2} />
          </span>
        ) : (
          <span className={s.search} data-n="2">
            ⌕ What do you need done?
          </span>
        )}
        {old ? (
          <div className={s.deptList} data-n="1">
            {departments.map((d) => (
              <span key={d} className={s.dept}>
                {d}
              </span>
            ))}
            <Mark n={1} />
          </div>
        ) : (
          <div className={s.needs} data-n="1">
            {needs.map((n) => (
              <span key={n} className={s.need}>
                {n}
              </span>
            ))}
          </div>
        )}
        <div className={s.services} data-n="3">
          {old ? (
            <>
              <span className={s.serviceOdd}>
                <span className={s.bar} style={{ width: "60%" }} />
                <span className={s.miniTag}>Fees</span>
              </span>
              <span className={s.serviceOdd} data-alt>
                <span className={s.miniTag}>Documents</span>
                <span className={s.bar} style={{ width: "40%" }} />
              </span>
              <Mark n={3} />
            </>
          ) : (
            [0, 1].map((i) => (
              <span key={i} className={s.serviceRow}>
                <span className={s.bar} style={{ width: i ? "45%" : "60%" }} />
                <span className={s.steps}>Eligibility · Documents · Fees · Status</span>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const hookScreens: Record<HookVisualId, React.ComponentType<{ kind: Kind }>> = {
  "same-request": SameRequest,
  "client-theme": ClientTheme,
  "trust-edit": TrustEdit,
  "city-home": CityHome,
};
