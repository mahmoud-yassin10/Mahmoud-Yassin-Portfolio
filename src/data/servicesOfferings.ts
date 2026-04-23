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
    title: "Project brief & intake",
    description:
      "Same structured questionnaire as the full services page: scope, Kashier vs web priorities, timeline, and payment context — delivered to my inbox.",
    bullets: ["Guided multiple-choice intake", "Timeline and flexibility", "Payment methods (COD, InstaPay, online)", "Email follow-up"]
  }
];

/** Dedicated `/services` grid: website + Kashier + combined (no duplicate “intake” tile — that lives only on home). */
export const servicesPageOfferings: ServiceOffering[] = [
  websiteOffering,
  secondaryServiceOfferings[0],
  secondaryServiceOfferings[1]
];

export function getServicesInquiryHref() {
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  return basePath === "" ? "/services#business-inquiry" : `${basePath}/services#business-inquiry`;
}

export function getServicesPageHref() {
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  return basePath === "" ? "/services" : `${basePath}/services`;
}
