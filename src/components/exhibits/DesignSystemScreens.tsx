import { designSystemStages } from "@/content/screens";
import { ScreenSet } from "./ScreenSet";

/** A tour of the real design-system library. */
export function DesignSystemScreens() {
  return (
    <ScreenSet
      label="The product · the library"
      title="Inside the design system engineering builds to"
      caption="Four layers, from role-named tokens to whole page patterns. Each screen opens full size."
      stages={designSystemStages}
    />
  );
}
