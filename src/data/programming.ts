import {
  Programing,
  ProgramingPaginator,
  ProgramingQueryOptions,
} from '@/types/programing'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { API_ENDPOINTS } from './client/api-endpoints'
import { programingClient } from './client/programming'
import { mapPaginatorData } from '@/utils/data-mappers'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const useProgrammingdQuery = (
  options: Partial<ProgramingQueryOptions>
) => {
  const { data, isLoading, error } = useQuery<ProgramingPaginator, Error>(
    [API_ENDPOINTS.PROGRAMMING, options],
    () => programingClient.pagination(options),
    {
      keepPreviousData: true,
    }
  )
  return {
    programing: data?.data,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useProgrammingByIdQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Programing, Error>(
    [API_ENDPOINTS.PROGRAMMING, { id }],
    () => programingClient.get({ id })
  )

  return {
    programing: data,
    error,
    loading: isLoading,
  }
}

export const useProgrammingDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(programingClient.delete, {
    onSuccess: () => {
      toast.success('Se ha eliminado la programación')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PROGRAMMING)
    },
  })
}

export const useCreateProgrammingMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(programingClient.create, {
    onSuccess: async () => {
      //   await router.back() // Espera a que la navegación se complete
      setTimeout(() => {
        toast.success('Se ha creado la programacion correcta')
      }, 400) // Espera 400 milisegundos antes de mostrar el Toast
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PROGRAMMING)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}

export const useUpdateProgrammingMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(programingClient.update, {
    onSuccess: () => {
      router.back()
      toast.success('Se actualizo la programación correcta')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PROGRAMMING)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message)
    },
  })
}
