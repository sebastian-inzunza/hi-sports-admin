/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogResponse, Note } from '@/types/blog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useQuery } from 'react-query'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { blogClient } from './client/blog'

export const useNotesQuery = (options: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<BlogResponse, Error>(
    [API_ENDPOINTS.BLOG, options],
    () => blogClient.paginated(options),
    {
      keepPreviousData: true,
    }
  )

  return {
    notes: data?.notes as Note[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}
