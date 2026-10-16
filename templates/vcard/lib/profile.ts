export type VcardProject = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  category: string;
  start: string;
  end: string;
  tech: string[];
  excerpt: string;
  body: string[];
  links: { label: string; href: string }[];
};

export type VcardPost = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string[];
};

export type VcardResume = {
  slug: string;
  section: "Education" | "Experience";
  institution: string;
  title: string;
  image: string;
  tags: string[];
  period: string;
  body: string[];
};

const covers = {
  one: "/images/cover-1.png",
  two: "/images/cover-2.png",
  three: "/images/cover-3.png",
};

export const profile = {
  name: "{{AUTHOR_NAME}}",
  status: "Open to work",
  city: "{{CITY_NAME}}",
  email: "{{AUTHOR_EMAIL}}",
  github: "{{GITHUB_USERNAME}}",
  avatar: covers.one,
  bio: [
    "{{AUTHOR_NAME}} builds quiet web tools and keeps a short log of how they came together.",
    "Most weeks split between a studio project and a walk with a camera. Swap these notes for your own.",
  ],
};

export const projects: VcardProject[] = [
  {
    slug: "field-notes",
    title: "Field notes",
    image: covers.one,
    alt: "Cover image for Field notes",
    category: "Notes",
    start: "March 2024",
    end: "Present",
    tech: ["TypeScript", "React"],
    excerpt: "A running log of weekend builds.",
    body: [
      "Field notes keeps a title, a date, and one paragraph on the screen. The rest of the page stays out of the way.",
      "Replace the slug, the cover, and these paragraphs with a project of your own.",
    ],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Notes", href: "https://example.com" },
    ],
  },
  {
    slug: "night-studio",
    title: "Night studio",
    image: covers.two,
    alt: "Cover image for Night studio",
    category: "Studio",
    start: "January 2024",
    end: "June 2024",
    tech: ["Next.js"],
    excerpt: "Late sessions, one lamp, and a finished page.",
    body: [
      "Night studio is a layout for work that happens after the room goes quiet. One column, one cover, and a short record of what changed.",
      "Dates and the tech row are sample data so the card and the detail page have something to show.",
    ],
    links: [{ label: "Live", href: "https://example.com" }],
  },
  {
    slug: "paper-trail",
    title: "Paper trail",
    image: covers.three,
    alt: "Cover image for Paper trail",
    category: "Print",
    start: "August 2023",
    end: "December 2023",
    tech: ["CSS"],
    excerpt: "Printed proofs of the same layout, marked up by hand.",
    body: [
      "Paper trail follows one layout from the screen onto paper. The marks in the margin are the part worth keeping.",
      "This detail page is static sample text, not a markdown document.",
    ],
    links: [{ label: "Live", href: "https://example.com" }],
  },
];

export const posts: VcardPost[] = [
  {
    slug: "notebook",
    title: "A notebook that stays out of the way",
    image: covers.one,
    alt: "Cover image for the notebook note",
    category: "Notes",
    date: "March 12, 2024",
    readingTime: "4 min read",
    excerpt:
      "How a small writing layout keeps the title, the date, and one paragraph in view.",
    body: [
      "The useful part of the page is the title, the date, and a single paragraph. Everything else can wait.",
      "This note is sample copy so the blog list and the detail page can be opened from the nav.",
    ],
  },
  {
    slug: "margins",
    title: "Margins left on purpose",
    image: covers.three,
    alt: "Cover image for the margins note",
    category: "Notes",
    date: "February 2, 2024",
    readingTime: "3 min read",
    excerpt: "A second notes card so the category filter has more than one match.",
    body: [
      "Empty margin is part of the layout. The filter chip for Notes should keep this card next to the notebook.",
      "Swap the date and the paragraph when you add your own writing.",
    ],
  },
  {
    slug: "trails",
    title: "Trails, typed up after the fact",
    image: covers.two,
    alt: "Cover image for the trails note",
    category: "Photos",
    date: "January 4, 2024",
    readingTime: "6 min read",
    excerpt: "A second card so the list can show spacing, hover, and the date row.",
    body: [
      "The walk happens first. The note is what is still true after the camera is put away.",
      "Photos is its own category so the filter row can hide the notes and leave this card.",
    ],
  },
];

export const resume: VcardResume[] = [
  {
    slug: "reed-college",
    section: "Education",
    institution: "Reed College",
    title: "B.A. Studio",
    image: covers.one,
    tags: ["Design", "Writing"],
    period: "2016 — 2020",
    body: [
      "A sample education card. The timeline groups it under Education and the detail page repeats the institution, the dates, and a short note.",
      "Replace the school, the degree, and these paragraphs with your own.",
    ],
  },
  {
    slug: "northwind",
    section: "Experience",
    institution: "Northwind",
    title: "Product designer",
    image: covers.two,
    tags: ["Web", "Research"],
    period: "2021 — Present",
    body: [
      "Northwind is a fictional studio. The card shows a logo crop, a role, and gold tags.",
      "Opening the card lands on this page: the period, the tags, and two paragraphs.",
    ],
  },
  {
    slug: "field-kit",
    section: "Experience",
    institution: "Field Kit",
    title: "Freelance",
    image: covers.three,
    tags: ["Notes"],
    period: "2020 — 2021",
    body: [
      "Field Kit is a second experience so the timeline has more than one card in the column.",
      "The tag row is plain text. Swap it for the tools you actually used.",
    ],
  },
];

export function resumeSections() {
  return [
    {
      id: "Education" as const,
      title: "Education",
      items: resume.filter((item) => item.section === "Education"),
    },
    {
      id: "Experience" as const,
      title: "Experience",
      items: resume.filter((item) => item.section === "Experience"),
    },
  ].filter((section) => section.items.length > 0);
}
