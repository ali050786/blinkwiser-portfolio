import { FeatureReel } from "./FeatureReel";
import { WorkDeck } from "./WorkDeck";
import { SkillMap } from "./SkillMap";
import { Faq } from "./Faq";
import { Call } from "./Call";

/** Everything below the hero, in the order of the v4 home (2026-10-10). */
export function HomeSections() {
  return (
    <>
      <FeatureReel />
      <WorkDeck />
      <SkillMap />
      <Faq />
      <Call />
    </>
  );
}
