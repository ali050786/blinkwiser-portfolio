import { jetStages } from "@/content/screens";
import { ScreenSet } from "./ScreenSet";

export function JetScreens() {
  return (
    <ScreenSet
      label="The product"
      title="The booking flow, as shipped"
      caption="Fares, the price breakdown and extras. Each screen opens full size."
      stages={jetStages}
      note="Real screens from the shipped product, from my own files."
    />
  );
}
