import {
  Publicidad,
  PublicidadPaginator,
  PublicidadQueryOptions,
} from '@/types/publicidad'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { publicidadClient } from './client/publicidad'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const usePublicidadQuery = (
  options: Partial<PublicidadQueryOptions>
) => {
  const { data, isLoading, error } = useQuery<PublicidadPaginator, Error>(
    [API_ENDPOINTS.PUBLICIDAD, options],
    () => publicidadClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    publicidad: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const usePublicidadByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Publicidad, Error>(
    [API_ENDPOINTS.PUBLICIDAD, { id }],
    () => publicidadClient.get({ id })
  )

  return {
    publicidad: data,
    error,
    loading: isLoading,
  }
}

export const usePublicidadDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(publicidadClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado la publicidad correctamente')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PUBLICIDAD)
    },
  })
}

export const useCreatePublicidadMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(publicidadClient.create, {
    onSuccess: async () => {
      await router.back() // Espera a que la navegación se complete
      setTimeout(() => {
        toast.success('Se ha creado la publicidad Correctamente')
      }, 400) // Espera 400 milisegundos antes de mostrar el Toast
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PUBLICIDAD)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdatePublicidadMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(publicidadClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se actualizo publicidad correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PUBLICIDAD)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
