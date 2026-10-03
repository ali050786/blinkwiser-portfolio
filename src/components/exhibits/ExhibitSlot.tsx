import type { ExhibitId } from "@/content/types";
import { SkillGraph } from "./SkillGraph";
import { BuildScreenRun } from "./BuildScreenRun";
import { ThemeCascade } from "./ThemeCascade";
import { FlowCompare } from "./FlowCompare";
import { CoverageGrid } from "./CoverageGrid";
import { ServiceMap } from "./ServiceMap";
import { BilingualPair } from "./BilingualPair";
import { PipelineRun } from "./PipelineRun";
import { EvalBoard } from "./EvalBoard";
import { RestoreChat } from "./RestoreChat";
import { EnrollmentScreens } from "./EnrollmentScreens";
import { DesignSystemScreens } from "./DesignSystemScreens";
import { PassiveScreens } from "./PassiveScreens";
import { BrandingScreens } from "./BrandingScreens";
import { CoverageGap, TrimVsReorder, TranslateLayer, AskWhenNeeded, PassiveRun } from "./Diagrams";
import { RulesInHeads, TwoLoops, PromptVsSystem, PortableSkills, AdoptionSpread } from "./DsDiagrams";

/**
 * Each exhibit is its own client island. The page stays a server component;
 * only the exhibits a study actually uses are hydrated on that page.
 */
const registry: Record<ExhibitId, React.ComponentType> = {
  "skill-graph": SkillGraph,
  "build-screen": BuildScreenRun,
  "theme-cascade": ThemeCascade,
  "flow-compare": FlowCompare,
  "coverage-grid": CoverageGrid,
  "service-map": ServiceMap,
  "bilingual-pair": BilingualPair,
  pipeline: PipelineRun,
  "eval-board": EvalBoard,
  "restore-chat": RestoreChat,
  "enrollment-screens": EnrollmentScreens,
  "design-system-screens": DesignSystemScreens,
  "passive-screens": PassiveScreens,
  "branding-screens": BrandingScreens,
  "passive-funnel": PassiveRun,
  "coverage-gap": CoverageGap,
  "trim-vs-reorder": TrimVsReorder,
  "translate-layer": TranslateLayer,
  "ask-when-needed": AskWhenNeeded,
  "rules-in-heads": RulesInHeads,
  "two-loops": TwoLoops,
  "prompt-vs-system": PromptVsSystem,
  "portable-skills": PortableSkills,
  "adoption-spread": AdoptionSpread,
};

export function ExhibitSlot({ id }: { id: ExhibitId }) {
  const Component = registry[id];
  return <Component />;
}
