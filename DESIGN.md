# Portfolio design

The visual direction is an AI-inspired software engineering portfolio. Keep the user's original blue animated particle field. Use the existing portrait as the main hero visual, the generated blue neural sculpture only as a subtle footer accent, and the actual SquashVAR court output for the featured case study.

Design variance: 7. Motion intensity: 5. Visual density: 4. Native CSS with the existing Tailwind and shadcn foundation; no new animation runtime.

## Foundation

- Self-hosted Manrope for English and Cairo for Arabic. Display headings use sans-serif, never the retired editorial serif.
- Dark mode by default with an explicit light-mode toggle; preserve saved user preference.
- One electric-blue accent with cool neutral surfaces. Tokens are scoped to `html.editorial` in `src/styles/portfolio.css`; Flousy and Hub keep their own tokens.
- A 1160px content width; 14px major containers, 12px cards, 9px buttons and inputs. No decorative wide card shadows.

## Structure

Home follows: introduction, compact evidence band, five projects, dated timeline, expandable activity chapters, honors, education and contact. Avoid repeating a second project grid. Research, Work and case-study routes use the same typography and surface system.

Header and footer use the same PortfolioBrand, navigation source, LanguageToggle and PortfolioThemeToggle. Keep routes, contact information, and publication status intact.

## Interaction

The section rail tracks visible home sections with IntersectionObserver; mobile uses a labelled section selector. The timeline is a connected date line on desktop and a vertical line on smaller screens. Native details controls reveal project evidence, activity chapters and additional honors. A desktop cursor ring reacts to links and controls; touch, text fields, keyboard navigation and reduced motion preserve usable native behavior.

Keep the animated background, respecting reduced-motion preferences with a still frame. All interactions must work with keyboard input and both writing directions.


## SquashVAR research case study

Use the dedicated SquashVARCaseStudy page for the canonical project slug, its legacy alias and Research. Its structure is overview, interactive five-stage system pipeline, evaluation, limitations and resources. Keep one introduction, one compact tool/role summary, real court output, semantic result tables and keyboard-accessible Radix tabs. The sticky section navigator follows the current section and keeps its active link visible on narrow screens. Per-surface results use a disclosure; line-call accuracy and prototype limitations stay visible. The generic stack/runtime/content-language/skills card sequence does not appear on this page.

Metric settings must stay distinct: YOLOv8-S precision 0.937 at 1920px and mAP@50 0.911 at 1280px. Impact F1 is not line-call accuracy. The manuscript remains submitted and awaiting review.


The Research navigation item and hero research link point directly to the canonical `/projects/squashvar` route. `/research` redirects there while preserving search/hash. The manuscript action scrolls to the inline reader in the shared case study. The reader uses faithful, locally rendered pages of the supplied six-page PDF, page selection, bounded zoom, an error fallback, and direct open/download links to the original selectable-text PDF. Do not rely on browser-specific embedded PDF plugins for the phone preview.
