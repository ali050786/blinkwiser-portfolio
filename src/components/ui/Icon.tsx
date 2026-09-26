import type { SVGProps } from "react";

type Name =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-left"
  | "sun"
  | "moon"
  | "copy"
  | "check"
  | "cross"
  | "play"
  | "replay"
  | "info"
  | "menu"
  | "close"
  | "search"
  | "restore"
  | "shield"
  | "diamond"
  | "swap"
  | "lock"
  | "pause";

const paths: Record<Name, React.ReactNode> = {
  "arrow-right": <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" />,
  "arrow-up-right": <path d="M6.5 13.5l7-7m-5.5 0h5.5v5.5" />,
  "arrow-left": <path d="M16 10H5m4.5-4.5L5 10l4.5 4.5" />,
  sun: (
    <>
      <circle cx="10" cy="10" r="3.25" />
      <path d="M10 2.75v1.5m0 11.5v1.5M2.75 10h1.5m11.5 0h1.5M4.87 4.87l1.06 1.06m8.14 8.14l1.06 1.06M4.87 15.13l1.06-1.06m8.14-8.14l1.06-1.06" />
    </>
  ),
  moon: <path d="M15.5 12.2A6.25 6.25 0 0 1 7.8 4.5a6.25 6.25 0 1 0 7.7 7.7Z" />,
  copy: (
    <>
      <rect x="7" y="7" width="9" height="9" rx="2" />
      <path d="M13 4.5H6A1.5 1.5 0 0 0 4.5 6v7" />
    </>
  ),
  check: <path d="M4.5 10.5l3.5 3.5 7.5-8" />,
  cross: <path d="M5.5 5.5l9 9m0-9l-9 9" />,
  play: <path d="M7 5.5v9l7.5-4.5L7 5.5Z" />,
  replay: <path d="M4.5 10a5.5 5.5 0 1 0 1.8-4.07M4.5 4v3.5H8" />,
  info: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 9v4.5M10 6.6v.1" />
    </>
  ),
  menu: <path d="M3.5 7h13M3.5 13h13" />,
  close: <path d="M5.5 5.5l9 9m0-9l-9 9" />,
  search: (
    <>
      <circle cx="9" cy="9" r="5" />
      <path d="M12.8 12.8L16.5 16.5" />
    </>
  ),
  restore: <path d="M4.5 10a5.5 5.5 0 1 0 1.8-4.07M4.5 4v3.5H8M10 7v3.2l2 1.3" />,
  shield: <path d="M10 2.8l5.5 2v4.6c0 3.5-2.4 6.2-5.5 7.3-3.1-1.1-5.5-3.8-5.5-7.3V4.8l5.5-2Zm-2.3 7.3l1.6 1.6 3.1-3.3" />,
  diamond: <path d="M10 3.5l6.5 6.5-6.5 6.5L3.5 10 10 3.5Z" />,
  swap: <path d="M4 7.5h11.5M12.5 4.5l3 3-3 3M16 12.5H4.5M7.5 9.5l-3 3 3 3" />,
  lock: (
    <>
      <rect x="4.5" y="9" width="11" height="7.5" rx="1.8" />
      <path d="M7 9V6.8a3 3 0 0 1 6 0V9" />
    </>
  ),
  pause: <path d="M7.5 5.5v9M12.5 5.5v9" />,
};

export function Icon({ name, size = 18, ...rest }: { name: Name; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
