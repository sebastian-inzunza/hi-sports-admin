import { SuggestionsResponse } from '@/types/suggestions'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const suggestionsClient = {
  suggestions: () => {
    return HttpClient.get<SuggestionsResponse[]>(API_ENDPOINTS.SUGGESTIONS)
  },
}
