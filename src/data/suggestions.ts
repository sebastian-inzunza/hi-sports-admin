/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryOptionsType,
  Suggestion,
  SuggestionPaginator,
} from '@/types/index'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { API_ENDPOINTS } from './client/api-endpoints'
import { suggestionsClient } from './client/suggestions'

export const useSuggestionsQuery = (params: Partial<QueryOptionsType>) => {
  const { data, error, isLoading } = useQuery<SuggestionPaginator, Error>(
    [API_ENDPOINTS.SUGGESTIONS, params],
    () => suggestionsClient.paginated(params),
    {
      keepPreviousData: true,
    }
  )
  return {
    suggestions: data?.data as Suggestion[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useSuggestion = (id: number) => {
  const { data, error, isLoading } = useQuery<Suggestion, Error>(
    [API_ENDPOINTS.SUGGESTIONS, id],
    () => suggestionsClient.fetch(id),
    {
      keepPreviousData: true,
    }
  )
  return {
    suggestion: data as Suggestion,
    loading: isLoading,
    error,
  }
}

export const useDeleteSuggestionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(suggestionsClient.delete, {
    onSuccess: () => {
      toast.success('Suggestion deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUGGESTIONS)
    },
  })
}
