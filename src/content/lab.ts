/**
 * The Lab: small products I design and build on the side, each live. Newest
 * first. The loops are screen captures of each product's own live page
 * (public/work/lab), so add a new entry with its own capture.
 */
export type LabProject = {
  slug: string;
  name: string;
  /** What it is, shown after the name: "macOS app", "Web app"... */
  kind: string;
  /** Short status for the tag: open source, live, year. */
  status: string;
  line: string;
  detail: string;
  media: { video: string; poster: string; alt: string; ground: string };
  links: { label: string; href: string }[];
};

export const lab: LabProject[] = [
  {
    slug: "utter",
    name: "Utter",
    kind: "macOS app",
    status: "Open source, 2026",
    line: "Voice dictation that runs on your Mac.",
    detail:
      "Hold a key and talk, and Utter types it into any app. Speech recognition and the clean-up run on the Mac itself, so your audio never leaves it. Free, for Apple Silicon.",
    media: {
      video: "/work/lab/utter.mp4",
      poster: "/work/lab/utter-poster.jpg",
      alt: "Utter's landing page demo: holding Right Option while talking, and the words appear in a Notes document, cleaned up.",
      ground: "#0047ff",
    },
    links: [
      { label: "utter.blinkwiser.com", href: "https://utter.blinkwiser.com" },
      { label: "Code on GitHub", href: "https://github.com/ali050786/dictateai" },
    ],
  },
  {
    slug: "agentic-carousel",
    name: "Agentic Carousel",
    kind: "Web app by Blinkwiser",
    status: "Live, 2026",
    line: "LinkedIn carousels made by a team of AI agents.",
    detail:
      "Give it a topic, a link, a YouTube video or a file, and agents research, write and design the carousel, with every number traced to a source. Free to try.",
    media: {
      video: "/work/lab/carousel.mp4",
      poster: "/work/lab/carousel-poster.jpg",
      alt: "The Agentic Carousel landing page: the headline cycles through carousels that research, write, design, proofread and sketch themselves.",
      ground: "#1b1530",
    },
    links: [
      { label: "carousel.blinkwiser.com", href: "https://carousel.blinkwiser.com" },
      { label: "Read the case study", href: "/work/designing-trust-into-ai" },
    ],
  },
];
