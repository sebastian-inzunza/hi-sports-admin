import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { AnalyticsResponse } from '@/types/analytics'

export const analyticsClient = {
  fetchAnalytics: () => {
    return HttpClient.get<AnalyticsResponse>(API_ENDPOINTS.ANALYTICS)
  },
}
