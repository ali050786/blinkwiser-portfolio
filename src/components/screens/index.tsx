"use client";

import { OldHousehold, OldCoverageHub, OldWhoAgain, OldPlanList, OldReview, NewHousehold, NewPlan, NewCoverage, NewReview } from "./enrollment";
import { DsTokens, DsButtons, DsProductCard, DsDashboard } from "./designSystem";
import { PeRule, PeConfirm, PeRunning, PeReport, BhHub, BhEditor, BhPreview, BhAssign } from "./admin";
import { Scaled } from "./kit";
import type { ScreenKey } from "@/content/types";

/** Every rebuilt screen, by key, with the width it is designed at. */
export const screens = {
  "old-household": { C: OldHousehold, width: 1040 },
  "old-coverage-hub": { C: OldCoverageHub, width: 1040 },
  "old-who-again": { C: OldWhoAgain, width: 1040 },
  "old-plan-list": { C: OldPlanList, width: 1040 },
  "old-review": { C: OldReview, width: 1040 },
  "new-household": { C: NewHousehold, width: 1040 },
  "new-plan": { C: NewPlan, width: 1040 },
  "new-coverage": { C: NewCoverage, width: 1040 },
  "new-review": { C: NewReview, width: 1040 },
  "ds-tokens": { C: DsTokens, width: 960 },
  "ds-buttons": { C: DsButtons, width: 960 },
  "ds-product-card": { C: DsProductCard, width: 960 },
  "ds-dashboard": { C: DsDashboard, width: 1040 },
  "pe-rule": { C: PeRule, width: 1100 },
  "pe-confirm": { C: PeConfirm, width: 720 },
  "pe-running": { C: PeRunning, width: 1100 },
  "pe-report": { C: PeReport, width: 1100 },
  "bh-hub": { C: BhHub, width: 1040 },
  "bh-editor": { C: BhEditor, width: 1040 },
  "bh-preview": { C: BhPreview, width: 1100 },
  "bh-assign": { C: BhAssign, width: 720 },
} satisfies Record<ScreenKey, { C: (props: never) => React.JSX.Element; width: number }>;

/** A rebuilt screen as a single image-like element for assistive tech. */
export function ScreenView({ id, alt, maxScale }: { id: ScreenKey; alt: string; maxScale?: number }) {
  const { C, width } = screens[id];
  return (
    <div role="img" aria-label={alt}>
      <div aria-hidden="true" inert>
        <Scaled width={width} maxScale={maxScale}>
          <C />
        </Scaled>
      </div>
    </div>
  );
}
