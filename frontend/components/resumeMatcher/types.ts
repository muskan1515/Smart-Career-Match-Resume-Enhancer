export interface MatchResult {
  jd_confidence: number;
  fit_score: number;
  job_keywords: string[];
  resume_keywords: string[];
  matched_skills: string[];
  missing_skills: string[];
  jd_role_prediction: string;
  recommendations: string[];
  experience_years: number;
  parsed_resume_text: string;
  parsed_jd_text: string
}
