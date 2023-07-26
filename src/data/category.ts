import {
  Category,
  CategoryPaginator,
  CategoryQueryOptions,
} from '@/types/category'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { categoryClient } from './client/category'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const useCategoryQuery = (options: Partial<CategoryQueryOptions>) => {
  const { data, isLoading, error } = useQuery<CategoryPaginator, Error>(
    [API_ENDPOINTS.CATEGORY, options],
    () => categoryClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    categories: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useCategoryByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Category, Error>(
    [API_ENDPOINTS.CATEGORY, { id }],
    () => categoryClient.get({ id })
  )

  return {
    category: data,
    error,
    loading: isLoading,
  }
}

export const useCategoryDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(categoryClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado la categoría correctamente')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY)
    },
  })
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(categoryClient.create, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha creado la categoría correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(categoryClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se ha actualizado la categoría correctamente')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.CATEGORY)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
