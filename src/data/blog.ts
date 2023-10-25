/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogResponse, Note } from '@/types/blog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { blogClient } from './client/blog'
import { useRouter } from 'next/router'

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(blogClient.create, {
    onSuccess: () => {
      toast.success('Note created successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
  })
}

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
    blogClient.bySlug({ slug })
  )
}

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(blogClient.update, {
    onSuccess: () => {
      toast.success('Note updated successfully')
      router.back()
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
  })
}

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(blogClient.delete, {
    onSuccess: () => {
      toast.success('Note deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BLOG)
    },
  })
}
