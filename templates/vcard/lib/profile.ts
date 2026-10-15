export type VcardProject = {
  title: string;
  image: string;
  alt: string;
};

export type VcardWriting = {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
};

export const profile = {
  name: "{{AUTHOR_NAME}}",
  status: "Open to work",
  city: "{{CITY_NAME}}",
  email: "{{AUTHOR_EMAIL}}",
  github: "{{GITHUB_USERNAME}}",
  avatar: "/images/cover-1.png",
  bio: [
    "{{AUTHOR_NAME}} builds quiet web tools and keeps a short log of how they came together.",
    "Most weeks split between a studio project and a walk with a camera. Swap these notes for your own.",
  ],
};

export const projects: VcardProject[] = [
  {
    title: "Field notes",
    image: "/images/cover-1.png",
    alt: "Cover image for Field notes",
  },
  {
    title: "Night studio",
    image: "/images/cover-2.png",
    alt: "Cover image for Night studio",
  },
  {
    title: "Paper trail",
    image: "/images/cover-3.png",
    alt: "Cover image for Paper trail",
  },
];

export const writings: VcardWriting[] = [
  {
    title: "A notebook that stays out of the way",
    excerpt:
      "How a small writing layout keeps the title, the date, and one paragraph in view.",
    date: "Mar 12, 2024",
    readingTime: "4 min read",
  },
  {
    title: "Trails, typed up after the fact",
    excerpt: "A second card so the list can show spacing, hover, and the date row.",
    date: "Jan 4, 2024",
    readingTime: "6 min read",
  },
];
