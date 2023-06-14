/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suggestion, SuggestionPaginator } from '@/types/index'
import { QueryOptions } from '@/types/index'

import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { HttpClient } from './http-client'

export const suggestionsClient = {
  ...crudFactory<Suggestion, QueryOptions, any>(API_ENDPOINTS.SUGGESTIONS),
  paginated: (params: Partial<QueryOptions>) => {
    return HttpClient.get<SuggestionPaginator>(
      API_ENDPOINTS.SUGGESTIONS,
      params
    )
  },
  fetch: (id: number) => {
    return HttpClient.get<Suggestion>(`${API_ENDPOINTS.SUGGESTIONS}/${id}`)
  },
}
