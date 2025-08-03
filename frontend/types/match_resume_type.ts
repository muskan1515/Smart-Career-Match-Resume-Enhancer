export interface UploadResumeRequest {
  file: File;
}

export interface UploadResumeResponse {
  success: boolean;
  message: string;
  data?: {
    filename: string;
    jobMatches?: string[];
  };
}
