import { AnalyticsResponse } from '@/types/analytics'
import { useQuery } from 'react-query'
import { analyticsClient } from './client/analytics'
import { API_ENDPOINTS } from './client/api-endpoints'

export const useAnalyticsQuery = () => {
  const { data, isLoading, error } = useQuery<AnalyticsResponse, Error>(
    [API_ENDPOINTS.ANALYTICS],
    () => analyticsClient.fetchAnalytics(),
    {
      keepPreviousData: true,
    }
  )
  return {
    analytics: data as AnalyticsResponse,
    loading: isLoading,
    error,
  }
}
