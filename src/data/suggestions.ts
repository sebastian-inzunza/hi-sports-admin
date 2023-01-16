import { useQuery } from 'react-query'

import { API_ENDPOINTS } from './client/api-endpoints'
import { suggestionsClient } from './client/suggestions'

export const useSuggestionsQuery = () => {
  const { data, error, isLoading } = useQuery(
    API_ENDPOINTS.SUGGESTIONS,
    suggestionsClient.suggestions
  )

  return {
    suggestions: data ?? [],
    error,
    loading: isLoading,
  }
}
