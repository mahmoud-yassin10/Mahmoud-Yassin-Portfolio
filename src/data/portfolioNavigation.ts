import type { Audience } from "@/context/AudienceContext";

export function getPortfolioNavigation(t: (key: string) => string, lang: "en" | "ar", audience: Audience | null) {
  if (audience === "client") return [
    { name: t("nav.services"), to: "/services" },
    { name: t("nav.work"), to: "/work" },
    { name: t("nav.contact"), to: "/contact" }
  ];
  return [
    { name: t("nav.about"), to: "/portfolio" },
    { name: lang === "ar" ? "البحث" : "Research", to: "/research" },
    { name: t("nav.work"), to: "/work" },
    { name: t("nav.contact"), to: "/contact" }
  ];
}
