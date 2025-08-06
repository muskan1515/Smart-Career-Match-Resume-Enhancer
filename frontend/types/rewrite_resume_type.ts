export interface ReWriteResumeRequest {
  missing_skills: string[],
  resume_text: string,
  jd_text: string
}

export interface ReWriteResumeResponse {
  success: boolean;
  message: string;
  data?: {
    rewritten_resume_txt: string;
  }
}