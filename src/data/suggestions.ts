import { QueryOptionsType } from '@/types'
import { SuggestionsResponse, suggestionsPagination } from '@/types/suggestions'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { mapPaginatorData } from '@/utils/data-mappers'
import { suggestionClient } from './client/suggestions'
import { toast } from 'react-toastify'

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

export const useReviewsQuery = (id: string) => {
  return useQuery<SuggestionsResponse, Error>(
    [`${API_ENDPOINTS.SUGGESTIONS}/${id}`],
    () => suggestionClient.get({ id })
  )
}

export const useSuggestionDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(suggestionClient.delete, {
    onSuccess() {
      toast.success('Suggestion delete successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUGGESTIONS)
    },
  })
}
