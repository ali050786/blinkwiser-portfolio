import { Intro } from "@/components/home/Intro";
import { CaseGrid } from "@/components/home/CaseGrid";

/** Minimal home (2026-10-26): one line about me, three short rows, then the work. */
export default function Home() {
  return (
    <>
      <Intro />
      <CaseGrid />
    </>
  );
}
