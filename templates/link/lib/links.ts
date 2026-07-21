export type IconName = "github" | "linkedin" | "signature";

export interface LinkItem {
  label: string;
  url: string;
  icon: IconName;
}

export const links: LinkItem[] = [
  {
    label: "Github",
    url: "https://github.com/{{GITHUB_USERNAME}}",
    icon: "github",
  },
  {
    label: "Linkedin",
    url: "https://www.linkedin.com/in/{{GITHUB_USERNAME}}/",
    icon: "linkedin",
  },
  {
    label: "Portfolio",
    url: "https://example.com",
    icon: "signature",
  },
];

export const profile = {
  name: "{{AUTHOR_NAME}}",
  bio: "Replace this with a short bio — role, school, or what you are building.",
  avatarUrl: "https://github.com/{{GITHUB_USERNAME}}.png",
  faviconUrl: "https://github.com/{{GITHUB_USERNAME}}.png",
  tagline:
    '"You are too focused on the future without realizing that today is exactly what you prayed for years ago."',
  popupQuote:
    '"You are too focused on the future without realizing that today is exactly what you prayed for years ago."',
};
