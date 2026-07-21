import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const MoonSparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 14.5A7.5 7.5 0 1 1 9.5 4a6 6 0 0 0 10.5 10.5Z" />
    <path d="M18 3v3M16.5 4.5h3" />
  </svg>
);

export const Leaf = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20c8 0 16-4 16-16C10 4 4 10 4 20Z" />
    <path d="M4 20c2-6 6-9 11-11" />
  </svg>
);

export const Lotus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21c-4 0-8-2.5-8-6 0 0 3 .5 5 2 0-3 1-5 3-7 2 2 3 4 3 7 2-1.5 5-2 5-2 0 3.5-4 6-8 6Z" />
  </svg>
);

export const Lightning = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Cards = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="14" height="12" rx="2" />
    <path d="M8 3h9a2 2 0 0 1 2 2v10" />
  </svg>
);

export const Quiz = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5A2.5 2.5 0 1 1 12 13v1.5" />
    <path d="M12 17.5h.01" />
  </svg>
);

export const Flame = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .3-1.8.8-2.5C9 8 12 7 12 2Z" />
    <path d="M9 14a3 3 0 0 0 6 0c0-1.5-1.2-2.2-2-3-.5 1-1.4 1.3-2 2-.7.8-2 1-2 1Z" />
  </svg>
);

export const Camera = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8a2 2 0 0 1 2-2h1l1-2h6l1 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
    <circle cx="12" cy="12.5" r="3" />
  </svg>
);

export const Folder = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3c.8 4 1.8 5 6 6-4.2 1-5.2 2-6 6-.8-4-1.8-5-6-6 4.2-1 5.2-2 6-6Z" />
  </svg>
);

export const Repeat = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9a5 5 0 0 1 5-5h7l-2-2m2 2-2 2" />
    <path d="M20 15a5 5 0 0 1-5 5H8l2 2m-2-2 2-2" />
  </svg>
);

export const Tutor = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4 3 8l9 4 9-4-9-4Z" />
    <path d="M7 10.5V15c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12.5 9 17l11-11" />
  </svg>
);

export const Chevron = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Android = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M6 9v7a1.5 1.5 0 0 0 1.5 1.5H8v2.5a1 1 0 0 0 2 0V17.5h4V20a1 1 0 0 0 2 0v-2.5h.5A1.5 1.5 0 0 0 18 16V9H6ZM4.5 9A1.5 1.5 0 0 0 3 10.5v4a1.5 1.5 0 0 0 3 0v-4A1.5 1.5 0 0 0 4.5 9ZM19.5 9A1.5 1.5 0 0 0 18 10.5v4a1.5 1.5 0 0 0 3 0v-4A1.5 1.5 0 0 0 19.5 9ZM15.6 3.2l1-1.5a.3.3 0 0 0-.5-.3l-1 1.6A6 6 0 0 0 12 2.6a6 6 0 0 0-3.1.4l-1-1.6a.3.3 0 0 0-.5.3l1 1.5A5.3 5.3 0 0 0 6 7.7h12a5.3 5.3 0 0 0-2.4-4.5ZM9.5 5.8a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm5 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" />
  </svg>
);

export const Play = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const PlayStore = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M4.3 2.6a1.4 1.4 0 0 0-.8 1.3v16.2a1.4 1.4 0 0 0 .8 1.3l9.4-9.4L4.3 2.6Z" />
    <path d="M17.3 8.4 14.9 7l-3 3 3 3 2.4-1.4a1.4 1.4 0 0 0 0-2.4l-.02-.8Z" />
    <path d="m5.2 2.2 9.7 5.6-2.8 2.8L5.2 2.2Z" />
    <path d="m5.2 21.8 9.7-5.6-2.8-2.8-6.9 8.4Z" />
  </svg>
);
