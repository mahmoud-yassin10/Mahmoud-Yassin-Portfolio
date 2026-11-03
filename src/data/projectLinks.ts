/** Shared public destinations for project pages and case studies. */
export const SQUASHVAR_CASE_STUDY_PATH = "/projects/squashvar";
export const FLOUSY_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.mahmoud.flousy";

const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
export const SQUASHVAR_MANUSCRIPT_URL = `${base}/research/squashvar-manuscript.pdf`;
