import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { QueryOptions, suggestionsQueryOptions } from '@/types'
import { SuggestionsResponse, suggestionsPagination } from '@/types/suggestions'
import { crudFactory } from './crud-factory'

export const suggestionClient = {
  ...crudFactory<SuggestionsResponse, QueryOptions, any>(
    API_ENDPOINTS.SUGGESTIONS
  ),
  fetchsuggestions: ({
    search,
    ...params
  }: Partial<suggestionsQueryOptions>) => {
    return HttpClient.get<suggestionsPagination>(API_ENDPOINTS.SUGGESTIONS, {
      ...params,
      search: search,
    })
  },
}
