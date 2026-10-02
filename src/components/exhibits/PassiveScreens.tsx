import { passiveStages } from "@/content/screens";
import { ScreenSet } from "./ScreenSet";

export function PassiveScreens() {
  return (
    <ScreenSet
      label="The product · admin"
      title="Passive enrollment, from rule to exceptions"
      caption="Four steps an admin takes. Each screen opens full size."
      stages={passiveStages}
    />
  );
}
