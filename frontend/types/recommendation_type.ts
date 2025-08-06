export interface Job{
  title: string;
  company: string;
  link: string;
  description: string;
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[]
}

export interface JobRecommendationsRequest {
  resume_keywords: string[],
  experience_years: number
}

export interface JobRecommendationsResponse {
  success: boolean;
  message: string;
  data?: Job[]
}
