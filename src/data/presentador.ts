import {
  Presentador,
  PresentadorPaginator,
  PresentadorQueryOptions,
} from '@/types/presentador'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { presentadorClient } from './client/presentador'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const usePresentadorQuery = (
  options: Partial<PresentadorQueryOptions>
) => {
  const { data, isLoading, error } = useQuery<PresentadorPaginator, Error>(
    [API_ENDPOINTS.PRESENTADOR, options],
    () => presentadorClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    presentador: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const usePresentadorByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Presentador, Error>(
    [API_ENDPOINTS.PRESENTADOR, { id }],
    () => presentadorClient.get({ id })
  )

  return {
    presentador: data,
    error,
    loading: isLoading,
  }
}

export const usePresentadorDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(presentadorClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado el presentador correctamente')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRESENTADOR)
    },
  })
}

export const useCreatePresentadorMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(presentadorClient.create, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha creado el presentador de forma correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRESENTADOR)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdatePresentadorMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(presentadorClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha actualizado el presentador correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PRESENTADOR)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
