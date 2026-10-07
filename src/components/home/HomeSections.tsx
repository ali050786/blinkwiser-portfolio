import { Proof } from "./Proof";
import { CaseCards } from "./CaseCards";
import { Capabilities } from "./Capabilities";
import { Call } from "./Call";

/** Everything below the hero, in Deploy's order. */
export function HomeSections() {
  return (
    <>
      <Proof />
      <CaseCards />
      <Capabilities />
      <Call />
    </>
  );
}
