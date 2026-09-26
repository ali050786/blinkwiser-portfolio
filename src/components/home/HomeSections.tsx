import { ProofStrip } from "./ProofStrip";
import { WorkIndex } from "./WorkIndex";
import { Approach } from "./Approach";
import { About } from "./About";
import { Contact } from "./Contact";

/** Everything on the home page below the hero. */
export function HomeSections() {
  return (
    <>
      <ProofStrip />
      <WorkIndex />
      <Approach />
      <About />
      <Contact />
    </>
  );
}
