import { MatchResult } from "@/components/resumeMatcher/types";

export interface UploadResumeRequest {
  formData: FormData
}

export interface UploadResumeResponse {
  success: boolean;
  message: string;
  data?: MatchResult
}
