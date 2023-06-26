import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const analyticsClient = {
  get: () => {
    return HttpClient.get<any>(API_ENDPOINTS.ANALYTICS);
  },
};
