import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, LoaderCircle, Minus, Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SQUASHVAR_MANUSCRIPT_URL } from "@/data/projectLinks";
import manuscript from "@/data/squashvarManuscript.json";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
const copy = {
  en: { title: "Manuscript preview", page: "Page", of: "of", choosePage: "Choose manuscript page", previous: "Previous page", next: "Next page", zoom: "Preview zoom", zoomIn: "Zoom in", zoomOut: "Zoom out", open: "Open PDF", download: "Download PDF", loading: "Loading page…", error: "This page preview couldn’t load. You can still open the complete PDF.", viewport: "Scrollable manuscript page", textAlternative: "For searchable, selectable text, open the PDF." },
  ar: { title: "معاينة الورقة البحثية", page: "صفحة", of: "من", choosePage: "اختار صفحة من البحث", previous: "الصفحة السابقة", next: "الصفحة التالية", zoom: "تكبير المعاينة", zoomIn: "كبّر الصفحة", zoomOut: "صغّر الصفحة", open: "افتح PDF", download: "نزّل PDF", loading: "بنحمّل الصفحة…", error: "معاينة الصفحة متحمّلتش. تقدر تفتح ملف PDF الكامل.", viewport: "صفحة البحث قابلة للتمرير", textAlternative: "عشان تبحث في النص أو تحدده، افتح ملف PDF." }
};

export default function ManuscriptPreview() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const current = manuscript.pages[pageIndex];
  const number = (value: number) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en").format(value);
  const pageLabel = (index: number) => `${c.page} ${number(index + 1)} ${c.of} ${number(manuscript.pages.length)}`;
  const changePage = (index: number) => {
    if (!Number.isInteger(index) || index === pageIndex || index < 0 || index >= manuscript.pages.length) return;
    setLoading(true);
    setFailed(false);
    setPageIndex(index);
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return <div className="sq-manuscript-preview" role="region" aria-label={c.title}>
    <div className="sq-preview-toolbar">
      <div className="sq-preview-page-controls" role="group" aria-label={c.choosePage}>
        <button type="button" className="sq-preview-button" onClick={() => changePage(pageIndex - 1)} disabled={pageIndex === 0} aria-label={c.previous}><ChevronLeft size={19} aria-hidden /></button>
        <select value={pageIndex} aria-label={c.choosePage} onChange={(event) => changePage(Number(event.target.value))}>{manuscript.pages.map((page,index) => <option key={page.number} value={index}>{pageLabel(index)}</option>)}</select>
        <button type="button" className="sq-preview-button" onClick={() => changePage(pageIndex + 1)} disabled={pageIndex === manuscript.pages.length - 1} aria-label={c.next}><ChevronRight size={19} aria-hidden /></button>
      </div>
      <div className="sq-preview-zoom-controls" role="group" aria-label={c.zoom}>
        <button type="button" className="sq-preview-button" disabled={zoom <= 1} aria-label={c.zoomOut} onClick={() => setZoom((value) => Math.max(1, value - .5))}><Minus size={18} aria-hidden /></button>
        <output aria-live="polite"><bdi>{number(zoom * 100)}%</bdi></output>
        <button type="button" className="sq-preview-button" disabled={zoom >= 4} aria-label={c.zoomIn} onClick={() => setZoom((value) => Math.min(4, value + .5))}><Plus size={18} aria-hidden /></button>
      </div>
      <a className="sq-preview-open" href={SQUASHVAR_MANUSCRIPT_URL} target="_blank" rel="noreferrer">{c.open}<ArrowUpRight size={16} aria-hidden /></a>
    </div>
    <div className="sq-preview-viewport" ref={viewportRef} dir="ltr" tabIndex={0} aria-label={c.viewport} aria-busy={loading && !failed}>
      {loading && !failed && <p className="sq-preview-loading" role="status"><LoaderCircle size={17} aria-hidden />{c.loading}</p>}
      {failed ? <div className="sq-preview-error" role="alert"><p>{c.error}</p><a href={SQUASHVAR_MANUSCRIPT_URL} target="_blank" rel="noreferrer" className="portfolio-text-link">{c.open}<ArrowUpRight size={16} aria-hidden /></a></div> : <div className="sq-preview-paper" style={{ width: `${zoom * 100}%` }}>
        <img key={current.number} src={`${base}/research/squashvar-preview/page-${current.number}.webp`} width={current.width} height={current.height} alt={pageLabel(pageIndex)} loading="lazy" decoding="async" onLoad={() => setLoading(false)} onError={() => { setLoading(false); setFailed(true); }} />
      </div>}
    </div>
    <div className="sq-preview-footer"><p>{c.textAlternative}</p><a href={SQUASHVAR_MANUSCRIPT_URL} download="SquashVAR-submitted-manuscript.pdf">{c.download}<Download size={16} aria-hidden /></a></div>
  </div>;
}
