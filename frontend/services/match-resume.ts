import { api } from "@/libs/config";
import { UploadResumeRequest, UploadResumeResponse } from "@/types/match_resume_type";

export const uploadResume = async ({
  file,
}: UploadResumeRequest): Promise<UploadResumeResponse> => {
  try {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await api.post<UploadResumeResponse>('/upload-resume', formData);

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Upload failed',
    };
  }
};
