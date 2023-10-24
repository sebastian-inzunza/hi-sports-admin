import {
  Videoteca,
  VideotecaPaginator,
  VideotecaQueryOptions,
} from '@/types/videoteca'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { videotecaClient } from './client/videotca'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const useVideotecaQuery = (options: Partial<VideotecaQueryOptions>) => {
  const { data, isLoading, error } = useQuery<VideotecaPaginator, Error>(
    [API_ENDPOINTS.VIDEOTECA, options],
    () => videotecaClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    videoteca: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useVideotecaByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Videoteca, Error>(
    [API_ENDPOINTS.VIDEOTECA, { id }],
    () => videotecaClient.get({ id })
  )

  return {
    videteca: data,
    error,
    loading: isLoading,
  }
}

export const useVideotecaDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(videotecaClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado le video correctamente')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOTECA)
    },
  })
}

export const useCreateViodeotecaMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(videotecaClient.create, {
    onSuccess: () => {
      // toast.success('Se ha creado la imagen con la ruta correctamente')
      router.back()
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOTECA)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdateVideotecaMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(videotecaClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha actualizado la imagen con video correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.VIDEOTECA)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
