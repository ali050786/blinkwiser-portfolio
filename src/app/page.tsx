import { Hero } from "@/components/home/Hero";
import { HomeSections } from "@/components/home/HomeSections";
import { buildDeck } from "@/content/deck";

export default function Home() {
  return (
    <>
      <Hero deck={buildDeck()} />
      <HomeSections />
    </>
  );
}
