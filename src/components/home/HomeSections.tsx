import { WorkIndex } from "./WorkIndex";
import { HowIWork } from "./HowIWork";
import { Contact } from "./Contact";

/** Everything on the home page below the hero. */
export function HomeSections() {
  return (
    <>
      <WorkIndex />
      <HowIWork />
      <Contact />
    </>
  );
}
