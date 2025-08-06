import { jsonAPI } from "@/libs/config";
import {
  ReWriteResumeRequest,
  ReWriteResumeResponse,
} from "@/types/rewrite_resume_type";

export const getUpdatedResume = async ({
  missing_skills,
  resume_text,
  jd_text,
}: ReWriteResumeRequest): Promise<ReWriteResumeResponse> => {
  try {
    const response = await jsonAPI.post<ReWriteResumeResponse>(
      "/rewrite-resume",
      { missing_skills, resume_text, jd_text }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Upload failed",
    };
  }
};
