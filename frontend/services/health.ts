import { api } from "@/libs/config";

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/api/health');
    return response.status === 200;
  } catch {
    return false;
  }
};