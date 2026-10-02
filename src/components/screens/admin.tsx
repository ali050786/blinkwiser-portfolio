"use client";

import s from "./Mock.module.css";
import { Btn, Cb, I } from "./kit";
import { DsDashboard } from "./designSystem";

/*
 * Admin-side screens, rebuilt from the design files in a demo brand:
 * passive enrollment (client enrollment settings) and the Branding Hub.
 * Every name, client, employer and figure is invented.
 */

function AdminFrame({ crumbs = true, children }: { crumbs?: boolean; children: React.ReactNode }) {
  return (
    <div className={s.screen}>
      <nav className={s.rail}>
        <I n="home" className={s.railOn} />
        <I n="people" />
        <I n="doc" />
      </nav>
      <div>
        {crumbs && (
          <div className={s.crumbs}>
            {["Public sector", "Contoso Group", "Regional office"].map((c, i) => (
              <span key={c} style={{ display: "contents" }}>
                {i > 0 && <span style={{ border: 0, padding: 0 }}>»</span>}
                <span>
                  {c} <I n="edit" />
                </span>
              </span>
            ))}
          </div>
        )}
        <div className={s.adminBody}>{children}</div>
      </div>
    </div>
  );
}

/* ====================================================== passive enrollment */

type RuleKey = "all" | "ineligible" | "defaultIneligible" | "defaultAlways";

const rules: { k: RuleKey; t: string; d: string }[] = [
  { k: "all", t: "Terminate all", d: "Every member who took no action during enrollment is terminated, whatever their eligibility for next year." },
  { k: "ineligible", t: "Terminate only if ineligible", d: "Only members who can't carry their current plan forward are terminated. Eligible members carry forward." },
  { k: "defaultIneligible", t: "Default to another plan (if ineligible)", d: "Members ineligible for their current plan move to the eligibility group's default plan. Eligible members carry forward." },
  { k: "defaultAlways", t: "Default to another plan (always)", d: "Members are always moved to the eligibility group's default plan for next year, whatever their current eligibility." },
];

const log = [
  ["07-17-2025 12:00 AM", "Completed"],
  ["07-07-2025 12:00 AM", "Completed"],
  ["06-27-2025 12:00 AM", "Completed"],
];

function SettingsHead() {
  return (
    <>
      <h1 className={s.pageTitle}>
        <I n="arrowLeft" /> Client enrollment settings
      </h1>
      <div className={s.settingsTabs}>
        {["Enrollment setup", "Rules", "Configure fields", "New hire setup", "Passive enrollment"].map((t, i) => (
          <span key={t} data-on={i === 4 || undefined}>
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

function UtilityLog({ running }: { running?: boolean }) {
  const rows = running ? [["08-01-2025 12:00 AM", "In progress"], ...log] : log;
  return (
    <section className={s.split}>
      <div>
        <h3>Utility log</h3>
        <p>Run the utility now or schedule it. While a run is in progress or scheduled, settings are locked until it finishes.</p>
      </div>
      <div className={s.table}>
        <div className={`${s.tr} ${s.th}`} style={{ gridTemplateColumns: "1.2fr 1fr 1fr" }}>
          <span>Run date and time</span>
          <span>Status</span>
          <span>Coverage effective date</span>
        </div>
        {rows.map(([d, st]) => (
          <div key={d} className={s.tr} style={{ gridTemplateColumns: "1.2fr 1fr 1fr" }}>
            <span className={s.cellLink}>{d}</span>
            <span className={s.status} data-run={st === "In progress" || undefined}>
              <I n={st === "In progress" ? "restart" : "check"} />
              {st}
            </span>
            <span>01-01-2026</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PeRule() {
  return (
    <AdminFrame>
      <SettingsHead />
      <section className={s.split}>
        <div>
          <h3>Passive enrollment</h3>
          <p>Decide what happens to members who take no action during open enrollment: terminate coverage, carry plans forward, or move them to a default plan.</p>
        </div>
        <div className={s.rules}>
          <label className={s.field}>
            Coverage effective date
            <span>
              01-01-2026 <I n="doc" />
            </span>
          </label>
          {rules.map((r) => (
            <div key={r.k} className={s.ruleOpt}>
              <span className={s.radio} data-on={r.k === "ineligible" || undefined} />
              <b>{r.t}</b>
              <span>{r.d}</span>
              {r.k === "ineligible" && (
                <div className={s.ruleExtra}>
                  <div className={s.row2} style={{ maxWidth: 520 }}>
                    <label className={s.field}>
                      Status
                      <span>
                        Waived <I n="chevronDown" />
                      </span>
                    </label>
                    <label className={s.field}>
                      Termination reason*
                      <span>
                        Select <I n="chevronDown" />
                      </span>
                    </label>
                  </div>
                  <Cb on>Exclude members with supplemental products</Cb>
                  <span className={s.sub} style={{ marginTop: -6, paddingLeft: 21 }}>
                    Members enrolled in supplemental plans are not terminated by this run.
                  </span>
                </div>
              )}
            </div>
          ))}
          <div className={s.btnRow}>
            <Btn ghost>Save configuration</Btn>
            <Btn>Save &amp; run utility now</Btn>
          </div>
        </div>
      </section>
      <UtilityLog />
    </AdminFrame>
  );
}

export function PeConfirm() {
  return (
    <div className={`${s.screen} ${s.doc} ${s.dim}`}>
      <div className={s.modal}>
        <h3>Run passive enrollment?</h3>
        <p>This applies the saved passive enrollment rule to every member who took no action.</p>
        <div className={s.banner}>
          <b>
            <I n="people" /> 312 members will be affected by this run.
          </b>
          Are you sure you want to run the utility?
        </div>
        <div className={s.modalActions}>
          <span className={s.link}>Cancel</span>
          <Btn>Run utility</Btn>
        </div>
      </div>
    </div>
  );
}

export function PeRunning() {
  return (
    <AdminFrame>
      <SettingsHead />
      <section className={s.split}>
        <div>
          <h3>Passive enrollment</h3>
          <p>Decide what happens to members who take no action during open enrollment.</p>
        </div>
        <div className={s.rules}>
          <label className={s.field} data-off>
            Coverage effective date
            <span>
              01-01-2026 <I n="doc" />
            </span>
          </label>
          {rules.map((r) => (
            <div key={r.k} className={s.ruleOpt} data-off={r.k !== "defaultAlways" || undefined}>
              <span className={s.radio} data-on={r.k === "defaultAlways" || undefined} />
              <b>{r.t}</b>
              <span>{r.d}</span>
              {r.k === "defaultAlways" && (
                <div className={s.ruleExtra}>
                  <div className={s.tip}>
                    <span>Tip: download the template so your default-plan file uploads without formatting errors.</span>
                    <span className={s.link}>
                      <I n="download" /> Default plan mapping template
                    </span>
                  </div>
                  <div className={s.file}>
                    <span className={s.fileIcon}>CSV</span>
                    <span>
                      default-plans-2026.csv
                      <br />
                      <span className={s.sub}>106 KB</span>
                    </span>
                    <Btn ghost sm>
                      Remove
                    </Btn>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className={s.btnRow}>
            <span className={`${s.btn} ${s.btnOff}`}>Save configuration</span>
            <span className={`${s.btn} ${s.btnOff}`}>Save &amp; run utility now</span>
          </div>
          <div className={s.banner}>
            <b>
              <I n="restart" /> Utility running
            </b>
            Configuration changes and new runs are paused while this one processes, so no two runs touch the same members. Runs usually finish within a few minutes, depending on volume.
          </div>
        </div>
      </section>
      <UtilityLog running />
    </AdminFrame>
  );
}

const exceptions: [string, string, "open" | "enrolled" | "terminated"][] = [
  ["Avery Collins", "Coverage gap exceeds 60 days", "open"],
  ["Priya Nair", "Dependent status needs verification", "open"],
  ["Marcus Lee", "Employment status changed: part-time to full-time", "enrolled"],
  ["Sofia Alvarez", "Two qualifying life events within 30 days", "terminated"],
  ["Daniel Okafor", "Dependent age needs verification", "open"],
  ["Hannah Weiss", "Dependent status needs verification", "open"],
  ["Tomás Ruiz", "Coverage gap exceeds 60 days", "open"],
];

export function PeReport() {
  return (
    <AdminFrame>
      <h1 className={s.pageTitle}>
        <I n="arrowLeft" /> Passive enrollment report <small>07-17-2025 12:00 AM</small>
      </h1>
      <div className={s.summary} style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        <span>
          Coverage effective date<b>01-01-2026</b>
        </span>
        <span>
          Run by<b>Admin user (J. Doe)</b>
        </span>
        <span>
          Rule<b>Default to another plan (always)</b>
        </span>
        <span>
          File used<b className={s.link}>default-plans-2026.csv</b>
        </span>
        <span>
          Total members<b>312</b>
        </span>
        <span>
          Successfully processed<b className={s.good}>289</b>
        </span>
        <span>
          Needs manual review<b className={s.warn}>23</b>
        </span>
      </div>
      <div className={`${s.banner} ${s.bannerOk}`}>
        <b>
          <I n="check" /> Utility completed
        </b>
      </div>
      <div className={s.settingsTabs}>
        <span data-on>Needs manual review (23)</span>
        <span>Processed (289)</span>
      </div>
      <div className={s.toolbar}>
        <span className={s.search}>
          Search by name or certificate number <I n="search" />
        </span>
        <span className={s.pager}>
          <b>1</b> 2 3 <I n="chevronRight" />
        </span>
      </div>
      <div className={s.table}>
        <div className={`${s.tr} ${s.th}`} style={{ gridTemplateColumns: "1fr 0.8fr 2fr 1.3fr" }}>
          <span>Member</span>
          <span>Certificate no.</span>
          <span>Reason</span>
          <span>Action / status</span>
        </div>
        {exceptions.map(([n, r, st], i) => (
          <div key={n} className={s.tr} style={{ gridTemplateColumns: "1fr 0.8fr 2fr 1.3fr" }}>
            <span className={s.cellLink}>{n}</span>
            <span>{`4410${i}2${i}87`}</span>
            <span className={s.trunc}>{r}</span>
            {st === "open" ? (
              <span className={s.act}>
                <span className={s.actBtn}>Enroll</span>
                <span className={`${s.actBtn} ${s.actBad}`}>Terminate</span>
              </span>
            ) : st === "enrolled" ? (
              <span className={s.chip}>Enrolled</span>
            ) : (
              <span className={`${s.chip} ${s.chipBad}`}>Terminated</span>
            )}
          </div>
        ))}
      </div>
    </AdminFrame>
  );
}

/* ============================================================ branding hub */

const themes: { n: string; c: string[]; tag: "Default" | "Custom"; draft?: boolean; locked?: string; emp: number }[] = [
  { n: "Default branding", c: ["#0f766e", "#b45309", "#115e59", "#475569"], tag: "Default", emp: 118 },
  { n: "Northwind branding", c: ["#9b3d63", "#d27a9c", "#6b2945", "#2e1f27"], tag: "Custom", emp: 24 },
  { n: "Untitled theme", c: ["#7c4dce", "#d6336c", "#4b2a86", "#0f6f86"], tag: "Custom", draft: true, emp: 2 },
  { n: "Summit branding", c: ["#1f8a4c", "#3aa76d", "#1b2233", "#0f6f86"], tag: "Custom", locked: "A. Patel is editing this theme · opened 6 min ago", emp: 12 },
  { n: "Sunrise branding", c: ["#e8590c", "#f08c00", "#c92a2a", "#5f3dc4"], tag: "Custom", emp: 31 },
  { n: "Ocean branding", c: ["#2b6cb0", "#4fa3c7", "#1e4e79", "#5c7080"], tag: "Custom", emp: 9 },
];

export function BhHub() {
  return (
    <AdminFrame crumbs={false}>
      <h1 className={s.pageTitle}>
        <I n="arrowLeft" /> Branding hub
      </h1>
      <div className={s.pills}>
        <span className={s.pillTab} data-on>
          MEMBERS
        </span>
        <span className={s.pillTab}>OTHER PERSONAS</span>
      </div>
      <div className={s.toolbar}>
        <span className={s.search}>
          Search by employer or theme name <I n="search" />
        </span>
        <Btn ghost sm>
          <I n="plus" /> New theme
        </Btn>
      </div>
      <div className={s.settingsTabs}>
        <span data-on>Active themes</span>
        <span>Deleted themes</span>
      </div>
      <div className={s.themeGrid}>
        {themes.map((t) => (
          <div key={t.n} className={s.theme} data-locked={t.locked ? true : undefined}>
            <div className={s.themeTop}>
              <h4>{t.draft ? `Draft: ${t.n.toLowerCase()}` : t.n}</h4>
              <span style={{ display: "flex", gap: 6 }}>
                {t.draft && <span className={`${s.tag} ${s.tagDraft}`}>Draft</span>}
                <span className={`${s.tag} ${t.tag === "Default" ? s.tagOk : ""}`}>{t.tag}</span>
              </span>
            </div>
            <span className={s.chips}>
              {t.c.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </span>
            <span className={s.themeMeta}>
              <span>{t.emp} employer(s) · edited Jul 18 by S. James</span>
              <span>Persona: Members</span>
            </span>
            <span className={s.themeActs}>
              {t.locked ? (
                <>
                  <span className={s.locked}>Edit (locked)</span>
                  <span className={s.del} style={{ fontWeight: 400 }}>
                    {t.locked}
                  </span>
                </>
              ) : t.draft ? (
                <>
                  <span>Resume draft →</span>
                  <span className={s.del}>Discard →</span>
                </>
              ) : (
                <>
                  {t.tag !== "Default" && <span>Edit →</span>}
                  <span>Duplicate →</span>
                  {t.tag !== "Default" && <span className={s.del}>Delete →</span>}
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </AdminFrame>
  );
}

const roles: [string, string, string][] = [
  ["Brand primary", "#9b3d63", "Navigation bar, highlighted text and prominent graphics"],
  ["Brand secondary", "#d27a9c", "Graphs, progress bars, icons and other components"],
  ["Component primary", "#9b3d63", "Buttons and other primary actions"],
  ["Component secondary", "#2e1f27", "Links, tabs, accordions and other clickable elements"],
  ["Text primary", "#1b2233", "Headings, input labels and other important text"],
  ["Text secondary", "#5b6475", "Secondary text and input placeholders"],
  ["Background primary", "#f7f4f5", "The main background for every page"],
  ["Background secondary", "#ffffff", "Cards, panels and boxed content"],
  ["Background tertiary", "#f6eef2", "Footers and areas inside cards"],
  ["Border / grey primary", "#e9e3e6", "Subtle separators and borders"],
  ["Border / grey secondary", "#ab9ea5", "Main dividers and form field outlines"],
  ["Gradient start", "#6b2945", "Banners and sliders on the login screen"],
];

export function BhEditor() {
  return (
    <AdminFrame crumbs={false}>
      <h1 className={s.pageTitle}>
        <I n="arrowLeft" /> New theme
      </h1>
      <section className={s.panel}>
        <h3>Theme details</h3>
        <p>These settings apply to the member persona only. Renaming a theme doesn&apos;t change which employers use it.</p>
        <label className={s.field}>
          Name
          <span style={{ color: "var(--m-ink)" }}>Northwind branding</span>
        </label>
      </section>
      <section className={s.panel}>
        <h3>Colours and typography</h3>
        <p>Enter a hex code or use the picker. Icon colours update automatically.</p>
        <label className={s.field}>
          Font
          <span style={{ color: "var(--m-ink)" }}>
            Open Sans <I n="chevronDown" />
          </span>
        </label>
        <span className={s.link}>
          <I n="eye" /> Colour guide
        </span>
        <div className={s.colorGrid}>
          {roles.map(([n, c, d]) => (
            <div key={n} className={s.colorField}>
              <b>{n} colour</b>
              <span className={s.colorInput}>
                <i style={{ background: c }} />
                <span>{c.toUpperCase()}</span>
              </span>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <span className={s.link}>
          <I n="eye" /> Preview
        </span>
      </section>
      <section className={s.panel}>
        <h3>Employers</h3>
        <p>Select an employer to edit its logo, links, social media, contacts and resources.</p>
        <span className={s.dashed}>+ Assign employer(s)</span>
      </section>
      <div className={s.panel} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>
        <span className={s.link}>Cancel</span>
        <Btn ghost>Save as draft</Btn>
        <Btn>Publish</Btn>
      </div>
    </AdminFrame>
  );
}

const northwind = {
  "--m-brand": "#9b3d63",
  "--m-brand-ink": "#6b2945",
  "--m-brand-soft": "#f6e9ef",
  "--m-rail": "#2e1f27",
} as React.CSSProperties;

export function BhPreview() {
  return (
    <div className={`${s.screen} ${s.doc}`} style={{ padding: 0, background: "var(--m-canvas)" }}>
      <div className={s.previewHead}>
        <h2>Preview: Northwind branding</h2>
        <I n="x" />
      </div>
      <p className={s.previewNote}>This preview shows the colours applied to the interface. Layout and content are for illustration only.</p>
      <div style={{ margin: "0 20px 20px", border: "1px solid var(--m-line)", borderRadius: 8, overflow: "hidden" }}>
        <DsDashboard style={northwind} banner />
      </div>
    </div>
  );
}

const employers = ["Northwind Traders", "Contoso Health", "Fabrikam Inc.", "Tailspin Toys", "Litware", "Adatum Corp.", "Proseware", "Wingtip Partners"];

export function BhAssign() {
  return (
    <div className={`${s.screen} ${s.doc} ${s.dim}`}>
      <div className={s.modal}>
        <h3>Assign employer(s)</h3>
        <label className={s.field} style={{ maxWidth: "none" }}>
          Employer
          <span>
            Search by name or employer ID <I n="search" />
          </span>
        </label>
        <div className={s.checkList}>
          {employers.map((e, i) => (
            <span key={e}>
              <Cb on={i < 2}>{e}</Cb>
              <span className={s.sub}>Employer ID {5663 + i * 17}</span>
            </span>
          ))}
        </div>
        <div className={s.modalActions}>
          <span className={s.link}>Cancel</span>
          <Btn>Add selected</Btn>
        </div>
      </div>
    </div>
  );
}
