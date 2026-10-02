import { brandingStages } from "@/content/screens";
import { ScreenSet } from "./ScreenSet";

export function BrandingScreens() {
  return (
    <ScreenSet
      label="The product · admin"
      title="The Branding Hub, from theme to employers"
      caption="How an admin themes a client, start to finish. Each screen opens full size."
      stages={brandingStages}
    />
  );
}
