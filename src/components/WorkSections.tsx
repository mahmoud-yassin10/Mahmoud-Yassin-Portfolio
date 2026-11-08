import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import WorkCard from "@/components/WorkCard";
import { useAudience } from "@/context/AudienceContext";
import { workCategoryLabels, type WorkCategory } from "@/data/serviceCatalog";
import { activityItems, clientItems, engineeringItems, skillsForItem, workItems, type WorkItem } from "@/data/workItems";
import { useLanguage } from "@/i18n/LanguageContext";

type Chip = WorkCategory | "all" | "activities";

const matches = (item: WorkItem, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [item.name, item.summary, item.category, item.role, ...skillsForItem(item).map((skill) => skill.name)].join(" ").toLowerCase().includes(q);
};

/** Search box and category chips over a list of work cards. Every card opens its own page. */
function FilterGrid({ items, categories, includeActivities = false, initialChip = "all", initialQuery = "", onChange }: { items: WorkItem[]; categories: WorkCategory[]; includeActivities?: boolean; initialChip?: Chip; initialQuery?: string; onChange?: (chip: Chip, query: string) => void }) {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  const [chip, setChipState] = useState<Chip>(initialChip);
  const [query, setQueryState] = useState(initialQuery);
  const setChip = (value: Chip) => { setChipState(value); onChange?.(value, query); };
  const setQuery = (value: string) => { setQueryState(value); onChange?.(chip, value); };

  const counts = useMemo(() => {
    const map = new Map<Chip, number>([["all", items.length]]);
    for (const category of categories) map.set(category, items.filter((item) => item.categories.includes(category)).length);
    if (includeActivities) map.set("activities", activityItems.length);
    return map;
  }, [items, categories, includeActivities]);

  const visible = useMemo(() => {
    const base = chip === "activities" ? activityItems : chip === "all" ? items : items.filter((item) => item.categories.includes(chip));
    return base.filter((item) => matches(item, query));
  }, [items, chip, query]);

  const chips: Chip[] = ["all", ...categories.filter((category) => (counts.get(category) ?? 0) > 0), ...(includeActivities ? (["activities"] as Chip[]) : [])];
  const labelFor = (value: Chip) => value === "all" ? (arabic ? "الكل" : "All") : value === "activities" ? (arabic ? "الأنشطة" : "Activities") : workCategoryLabels[value][arabic ? "ar" : "en"];

  return (
    <>
      <div className="work-toolbar">
        <label className="work-search glass-surface"><Search size={18} aria-hidden /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={arabic ? "دور في الشغل" : "Search by name, skill or type"} aria-label={arabic ? "دور في الشغل" : "Search work"} /></label>
        <div className="work-tabs" role="tablist" aria-label={arabic ? "تصنيفات" : "Categories"}>
          {chips.map((value) => (
            <button key={value} type="button" role="tab" aria-selected={chip === value} className={`work-tab${chip === value ? " is-selected" : ""}`} onClick={() => setChip(value)}>{labelFor(value)}<small>{counts.get(value) ?? 0}</small></button>
          ))}
        </div>
      </div>
      {visible.length > 0
        ? <div className={chip === "activities" ? "work-list" : "work-grid"} key={`${chip}-${query}`}>{visible.map((item) => <WorkCard key={item.slug} item={item} variant={chip === "activities" ? "row" : "tile"} />)}</div>
        : <p className="work-empty">{arabic ? "مفيش نتايج. جرّب كلمة تانية." : "Nothing matches. Try another word or clear the filters."}</p>}
    </>
  );
}

const allCategories: WorkCategory[] = ["ecommerce", "portfolio", "business-site", "platform", "mobile", "ai", "desktop", "research"];

/** The /work page: everything, with search and filters. Activities appear only for admissions readers. */
export function WorkExplorer({ standalone = false }: { standalone?: boolean }) {
  const { lang } = useLanguage();
  const { audience } = useAudience();
  const [params, setParams] = useSearchParams();
  const arabic = lang === "ar";
  const includeActivities = audience === "admissions";
  const Heading = standalone ? "h1" : "h2";
  const items = useMemo(() => workItems.filter((item) => item.kind !== "activity"), []);
  const requested = params.get("category") as Chip | null;
  const initialChip: Chip = requested && (allCategories.includes(requested as WorkCategory) || (requested === "activities" && includeActivities)) ? requested : "all";
  return (
    <section id="work" className="portfolio-section portfolio-container">
      <header className="section-heading"><p>{arabic ? "كل الشغل" : "All the work"}</p><Heading>{arabic ? "دوّر أو صفّي، واضغط على أي كارت." : "Search, filter, then open any card."}</Heading></header>
      <FilterGrid items={items} categories={allCategories} includeActivities={includeActivities} initialChip={initialChip} initialQuery={params.get("q") ?? ""}
        onChange={(chip, query) => { const next = new URLSearchParams(); if (chip !== "all") next.set("category", chip); if (query) next.set("q", query); setParams(next, { replace: true }); }} />
      <Link to="/skills" className="portfolio-text-link skills-all-link">{arabic ? "تصفح حسب المهارة" : "Browse by skill"}<ArrowRight size={16} aria-hidden /></Link>
    </section>
  );
}

/** Hiring view: engineering projects, filterable. */
export function HiringWork() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="work" className="portfolio-section portfolio-container">
      <header className="section-heading"><p>{arabic ? "للتوظيف" : "For hiring teams"}</p><h2>{arabic ? "شغل هندسي حقيقي، مع الأرقام والحدود." : "Real engineering work, with the numbers and the limits."}</h2></header>
      <FilterGrid items={engineeringItems} categories={["platform", "mobile", "ai", "desktop", "research"]} />
      <Link to="/work" className="portfolio-text-link skills-all-link">{arabic ? "كل الشغل" : "See all work"}<ArrowRight size={16} aria-hidden /></Link>
    </section>
  );
}

/** Client view: sites and platforms built for clients, classified by what they are. */
export function ClientWork() {
  const { lang } = useLanguage();
  const arabic = lang === "ar";
  return (
    <section id="work" className="portfolio-section portfolio-container">
      <header className="section-heading"><p>{arabic ? "لمشروعك" : "For your project"}</p><h2>{arabic ? "مواقع ومنصات بنيتها لعملاء." : "Sites and platforms I have built for clients."}</h2></header>
      <FilterGrid items={clientItems} categories={["ecommerce", "portfolio", "business-site", "platform", "desktop"]} />
      <Link to="/services#inquiry" className="portfolio-text-link skills-all-link">{arabic ? "ابدأ طلب" : "Start a request"}<ArrowRight size={16} aria-hidden /></Link>
    </section>
  );
}
