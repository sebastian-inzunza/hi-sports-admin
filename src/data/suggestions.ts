import { QueryOptionsType } from '@/types'
import { SuggestionsResponse, suggestionsPagination } from '@/types/suggestions'
import { UserPagination } from '@/types/users'
import { useQuery } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { mapPaginatorData } from '@/utils/data-mappers'
import { suggestionClient } from './client/suggestions'

export const useSuggestionQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<suggestionsPagination, Error>(
    [API_ENDPOINTS.USERS, params],
    () => suggestionClient.fetchsuggestions(params),
    {
      keepPreviousData: true,
    }
  )

  return {
    suggestions: data?.suggestions as [],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}
