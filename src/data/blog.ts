/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogResponse, Note } from '@/types/blog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
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

export const useNoteQuery = ({ slug }: { slug: string }) => {
  return useQuery<Note, Error>([API_ENDPOINTS.BLOG, slug], () =>
    blogClient.get({ slug })
  )
}

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(blogClient.update, {
    onSuccess: () => {
      toast.success('Note updated successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
  })
}
