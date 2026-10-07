"use client";

import { useId, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/motion";
import { Exhibit, Segmented } from "./Exhibit";
import { Icon } from "@/components/ui/Icon";
import styles from "./ServiceMap.module.css";

export type View = "department" | "need";

export const services = [
  { id: "renew", name: "Renew a building permit", dept: "Planning & Building", need: "Build or renovate" },
  { id: "apply", name: "Apply for a building permit", dept: "Planning & Building", need: "Build or renovate" },
  { id: "inspect", name: "Request a site inspection", dept: "Planning & Building", need: "Build or renovate" },
  { id: "env", name: "Report an environmental issue", dept: "Environment", need: "Report a problem" },
  { id: "noise", name: "Report noise", dept: "Environment", need: "Report a problem" },
  { id: "pest", name: "Report a pest problem", dept: "Public Health", need: "Report a problem" },
  { id: "hall", name: "Book a park or hall", dept: "Leisure Facilities", need: "Book a place" },
  { id: "sport", name: "Book a sports facility", dept: "Leisure Facilities", need: "Book a place" },
  { id: "bulky", name: "Request bulky waste pickup", dept: "Waste Management", need: "Keep my area clean" },
  { id: "bin", name: "Request a new waste bin", dept: "Waste Management", need: "Keep my area clean" },
  { id: "food", name: "Food outlet health permit", dept: "Public Health", need: "Run a business" },
  { id: "ads", name: "Advertising permit", dept: "Planning & Building", need: "Run a business" },
];

export const groupsBy: Record<View, string[]> = {
  department: ["Planning & Building", "Environment", "Public Health", "Leisure Facilities", "Waste Management"],
  need: ["Build or renovate", "Report a problem", "Book a place", "Keep my area clean", "Run a business"],
};

export function ServiceMap() {
  const [view, setView] = useState<View>("department");
  const [q, setQ] = useState("");
  const reduce = useReducedMotion();
  const inputId = useId();
  const query = q.trim().toLowerCase();
  const matches = (s: (typeof services)[number]) => !query || s.name.toLowerCase().includes(query) || s.need.toLowerCase().includes(query);
  const count = services.filter(matches).length;

  return (
    <Exhibit
      label="Interactive · service catalog"
      title="The same twelve services, organized two ways"
      caption="Switch the grouping, or search the way residents do: by what they need, not by official service names."
      note="Generic service names for illustration. Not the client's catalog."
      controls={
        <Segmented<View>
          label="Group services by"
          value={view}
          onChange={setView}
          options={[
            { value: "department", label: "By department" },
            { value: "need", label: "By resident need" },
          ]}
        />
      }
    >
      <div className={styles.top}>
        <label htmlFor={inputId} className={styles.search} data-active={view === "need" || undefined}>
          <Icon name="search" size={16} />
          <span className="sr-only">Search services</span>
          <input id={inputId} type="search" placeholder="Try “permit”, “report” or “book”" value={q} onChange={(e) => setQ(e.target.value)} />
          <span className={`t-label c-tertiary ${styles.count}`} aria-live="polite">
            {count} of {services.length}
          </span>
        </label>
        <span className={styles.track} data-active={view === "need" || undefined}>
          <span className={styles.trackDot} aria-hidden="true" />
          My applications
          <span className="t-body-s c-tertiary">· all departments</span>
        </span>
      </div>

      <LayoutGroup>
        <div className={styles.groups}>
          {groupsBy[view].map((g) => (
            <motion.section key={`${view}-${g}`} layout={!reduce} className={styles.group} data-view={view}>
              <h5 className={styles.groupTitle}>
                {view === "department" && <span className={styles.deptIcon} aria-hidden="true" />}
                {g}
              </h5>
              <ul>
                {services
                  .filter((s) => (view === "department" ? s.dept : s.need) === g)
                  .map((s) => (
                    <motion.li
                      key={s.id}
                      layoutId={reduce ? undefined : `svc-${s.id}`}
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      className={styles.chip}
                      data-dim={!matches(s) || undefined}
                      data-hit={(query && matches(s)) || undefined}
                    >
                      {s.name}
                    </motion.li>
                  ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </LayoutGroup>
    </Exhibit>
  );
}
