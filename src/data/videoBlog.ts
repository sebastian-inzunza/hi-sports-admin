import {
  VideoBlog,
  VideoBlogPaginator,
  VideoBlogQueryOptions,
} from '@/types/videoBlog'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { videoBlogClient } from './client/videoBlog'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const useVideoBlogQuery = (options: Partial<VideoBlogQueryOptions>) => {
  const { data, isLoading, error } = useQuery<VideoBlogPaginator, Error>(
    [API_ENDPOINTS.VIDEOBLOG, options],
    () => videoBlogClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    VideoBlog: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useVideoBlogQueryS = ({ slug }: { slug: string }) => {
  return useQuery<VideoBlog, Error>([API_ENDPOINTS.BLOG, slug], () =>
    videoBlogClient.bySlug({ slug })
  )
}

export const useVideoBlogByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<VideoBlog, Error>(
    [API_ENDPOINTS.VIDEOBLOG, { id }],
    () => videoBlogClient.getById({ id })
  )

  return {
    videoBlog: data,
    error,
    loading: isLoading,
  }
}

export const useVideoBlogDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(videoBlogClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado el videoblog correctamente')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOBLOG)
    },
  })
}

export const useCreateViodeoBlogMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(videoBlogClient.create, {
    onSuccess: () => {
      // toast.success('Se ha creado la imagen con la ruta correctamente')
      router.back()
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOBLOG)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdateVideoBlogMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(videoBlogClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha actualizado la imagen con video correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOBLOG)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const videoBlogUnblockUserMutation = () => {
  const router = useRouter()

  const queryClient = useQueryClient()

  return useMutation(videoBlogClient.blockUnblock, {
    onSuccess() {
      router.push('/videoBlog')
      // toast.success('User unblocked successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOBLOG)
    },
  })
}
