import { Navigate, useLocation } from "react-router-dom";
import { SQUASHVAR_CASE_STUDY_PATH } from "@/data/projectLinks";

export default function ResearchPage() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: SQUASHVAR_CASE_STUDY_PATH, search, hash }} replace />;
}
