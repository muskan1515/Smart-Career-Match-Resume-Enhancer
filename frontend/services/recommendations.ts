import { jsonAPI } from "@/libs/config";
import {
  JobRecommendationsRequest,
  JobRecommendationsResponse,
} from "@/types/recommendation_type";

export const getRecommendations = async ({
  resume_keywords,
  experience_years,
}: JobRecommendationsRequest): Promise<JobRecommendationsResponse> => {
  try {
    const response = await jsonAPI.post<JobRecommendationsResponse>(
      "/job-recommendations",
      { resume_keywords, experience_years }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Upload failed",
    };
  }
};
