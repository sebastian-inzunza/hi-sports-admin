import { useQuery } from "react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { analyticsClient } from "./client/analytics";

export function useAnalyticsQuery() {
  return useQuery<any, Error>([API_ENDPOINTS.ANALYTICS], analyticsClient.get);
}
