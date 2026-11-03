import { SQUASHVAR_CASE_STUDY_PATH } from "./projectLinks";
import type { Audience } from "@/context/AudienceContext";

export function getPortfolioNavigation(t: (key: string) => string, lang: "en" | "ar", audience: Audience | null) {
  if (audience === "client") return [
    { name: t("nav.services"), to: "/services" },
    { name: t("nav.work"), to: "/work" },
    { name: t("nav.contact"), to: "/contact" }
  ];
  return [
    { name: t("nav.about"), to: "/portfolio" },
    { name: lang === "ar" ? "البحث" : "Research", to: SQUASHVAR_CASE_STUDY_PATH },
    { name: t("nav.work"), to: "/work" },
    { name: t("nav.contact"), to: "/contact" }
  ];
}
