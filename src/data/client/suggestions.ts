import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { UserPagination } from '@/types/users'
import { suggestionsQueryOptions } from '@/types'
import { suggestionsPagination } from '@/types/suggestions'

export const suggestionClient = {
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
