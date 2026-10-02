import { enrollmentStages } from "@/content/screens";
import { ScreenSet } from "./ScreenSet";

/** The real enrollment screens, old flow against the redesign. */
export function EnrollmentScreens() {
  return (
    <ScreenSet
      label="The product · before and after"
      title="The same life event, in the old flow and the new one"
      caption="Pick a stage to compare. Each screen opens full size."
      stages={enrollmentStages}
    />
  );
}
