# Admissions release, November 3, 2026

Working repository: `C:/Mahmoud/Coding/Portfolio`. The workspace path from the chat was empty.

## Implemented

- Temporary admissions-only release flag: `ADMISSIONS_ONLY` in `src/context/AudienceContext.tsx`. Saved recruiter/client preferences are ignored, the gate and switchers are absent, Services redirects to Projects, and non-selected client project detail pages are hidden. The other audience implementations remain in source.
- Explicit five-project admissions selection, including TrueTutor despite its client-work classification. Home features four; Projects includes all five.
- Neutral ONTV interview wording in English and Arabic. Student Body President retained following direct user confirmation, without adding term dates.
- Removed money figures from admissions stories, activities, project summaries and case studies. Kept reported usage qualifiers and dated TrueTutor snapshot labels.
- Egyptian Arabic stories, activities, honors, proof strip and five case studies. Arabic project summaries derive from the translated case-study evidence.
- Bilingual research overview at `/research`, with manuscript status, evaluation, limitations and existing public source links. The user-supplied submitted manuscript is available as a PDF, clearly labelled as awaiting review.
- Bilingual journey timeline. Correct standalone page headings, RTL hero alignment, eager portrait loading, quieter project hover behavior and dark-theme button contrast.
- Admissions hero links to Projects in place of the unreviewed CV download. Contact email and phone values were preserved.

## Verification

- Final `npm run build`: passed.
- Targeted ESLint: no errors. AudienceContext retains React Fast Refresh export warnings.
- Production preview: `http://127.0.0.1:8082/`.
- All five production case studies, Research and Projects rendered with no console errors.
- English desktop and Egyptian Arabic mobile routes checked, including Home, Portfolio, Contact, Services redirect and old SquashVAR slug alias.
- Arabic key pages checked at 320px and 390px, with no horizontal document overflow. All checked portfolio routes contained no money figures or Services links. Mobile navigation closed after following a link.
- Light and dark themes checked. Existing large JavaScript bundle and outdated Browserslist database warnings remain.
- No standalone TypeScript check, following the handoff's memory limitation. Vite build is the build verification.

## Remaining assets and integration

The SquashVAR manuscript PDF was supplied by the user and linked on Research and its case study. The existing Flousy Google Play URL is shared with both language versions of its case study. The Fly.io demo is not ready, as confirmed by the user; its API contract, recorded fallback and Solar Share screenshots remain unavailable. Demo warm-up behavior and upload limits need the actual service contract; no speculative upload UI was shipped. The SquashVAR presentation PDF has not been reviewed in this continuation.

Optional removal of the dead Index page, public/joudy bundles and stale docs copy was not performed. The admissions rebuild was pushed to main as f04f678; this follow-up adds the supplied manuscript and existing Play Store link. Existing unrelated user changes were preserved.


## Visual redesign requested after the admissions release

The user requested an AI-inspired redesign while preserving the original animated background, a visible dated timeline, matching header/footer, clearer organization, section tracking, a custom scrollbar, additional interaction and a desktop cursor effect. The new design uses self-hosted Manrope/Cairo, the original particle field, a generated neural sculpture, actual SquashVAR court output, a shared navigation/brand/theme system, native disclosure controls, and responsive timeline/navigation. The duplicate project grid on Home was removed; all five projects remain reachable from Selected Work and Work. Editorial serif/paper styling was retired. Research status, supplied PDF, Google Play links, activity claims and contact details remain intact.
