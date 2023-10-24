import { Menu, MenuPaginator, MenuQueryOptions } from '@/types/menu'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { menuClient } from './client/menu'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const useMenuQuery = (options: Partial<MenuQueryOptions>) => {
  const { data, isLoading, error } = useQuery<MenuPaginator, Error>(
    [API_ENDPOINTS.MENU, options],
    () => menuClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    menu: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useMenuByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Menu, Error>(
    [API_ENDPOINTS.MENU, { id }],
    () => menuClient.get({ id })
  )

  return {
    menu: data,
    error,
    loading: isLoading,
  }
}

export const useMenuDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(menuClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado el menu correctamente')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.MENU)
    },
  })
}

export const useCreateMenuMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(menuClient.create, {
    onSuccess: () => {
      router.back()
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.MENU)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdateMenuMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(menuClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha actualizado la imagen con video correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.MENU)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
