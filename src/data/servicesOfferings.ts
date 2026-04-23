export type ServiceOffering = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

export const websiteOffering: ServiceOffering = {
  id: "website",
  title: "Website development",
  description:
    "Marketing sites, landing pages, and lightweight web apps — fast, responsive, and ready for search and analytics. Built for a credible online presence and clear customer journeys.",
  bullets: [
    "Design-to-code implementation",
    "Performance and SEO fundamentals",
    "Analytics-ready structure",
    "Hosting guidance and clean handoff"
  ]
};

/** Shown as the three tiles under the featured website card on the home page. */
export const secondaryServiceOfferings: ServiceOffering[] = [
  {
    id: "kashier",
    title: "Kashier systems",
    description:
      "POS, payment links, catalog alignment, and day-to-day Kashier workflows so your team can sell online and in-store with confidence.",
    bullets: ["Terminals and payment links", "Products and pricing alignment", "Staff-friendly flows", "Reporting basics"]
  },
  {
    id: "both",
    title: "Website + Kashier together",
    description:
      "One coherent story: a polished site aligned with Kashier checkout — integration planning so web and payments stay consistent.",
    bullets: ["Unified customer journey", "Catalog and pricing consistency", "Online and in-store flows", "Rollout support"]
  },
  {
    id: "intake",
    title: "Website-only brief & intake",
    description:
      "Structured questionnaire focused on web work — goals, pages and scope, timeline, and what you need live — delivered to my inbox.",
    bullets: [
      "Website-focused guided intake",
      "Pages, features, and brand priorities",
      "Timeline and flexibility",
      "Email follow-up"
    ]
  }
];

/** Dedicated `/services` grid: core website row plus Kashier, combined, and website-only intake (matches home offerings). */
export const servicesPageOfferings: ServiceOffering[] = [
  websiteOffering,
  ...secondaryServiceOfferings
];

export function getServicesInquiryHref() {
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  return basePath === "" ? "/services#business-inquiry" : `${basePath}/services#business-inquiry`;
}

/** Path to the full Services page. Pass a section id (with or without `#`) to scroll to that anchor, e.g. `business-inquiry`. */
export function getServicesPageHref(hash?: string) {
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const path = basePath === "" ? "/services" : `${basePath}/services`;
  if (!hash) return path;
  const suffix = hash.startsWith("#") ? hash : `#${hash}`;
  return `${path}${suffix}`;
}
