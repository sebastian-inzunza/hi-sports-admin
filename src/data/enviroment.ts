import Router, { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'

import { QueryOptionsType, EnvironmentPagination, Environment } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { environmentClient } from './client/environment'
import { mapPaginatorData } from '@/utils/data-mappers'
import { Routes } from '@/config/routes'
import { Config } from '@/config'
import { toast } from 'react-toastify'

export const useEnviromentQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<EnvironmentPagination, Error>(
    [API_ENDPOINTS.ENVIRONMENTS, params],
    () => environmentClient.fetchEnviroment(params),
    {
      keepPreviousData: true,
    }
  )
  return {
    enviroments: data?.environments,
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useCreateEnvMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation(environmentClient.create, {
    onSuccess: () => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.environments.list}`
        : Routes.environments.list
      Router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      })
      toast.success(t('common:successfully-created'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ENVIRONMENTS)
    },
  })
}

export const useUpdateEnvMutation = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation(environmentClient.update, {
    onSuccess: () => {
      Router.push(Routes.environments.list, undefined, {
        locale: Config.defaultLanguage,
      })
      toast.success(t('common:successfully-updated'))
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ENVIRONMENTS)
    },
  })
}

export const useDeleteEnvMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(environmentClient.delete, {
    onSuccess: () => {
      toast.success('Successfully deleted')
      queryClient.invalidateQueries(API_ENDPOINTS.ENVIRONMENTS)
    },
    onError: () => {
      toast.success('Something went wrong')
      queryClient.invalidateQueries(API_ENDPOINTS.ENVIRONMENTS)
    },
  })
}

export const useGetEnvironment = ({ id }: { id: string }) => {
  console.log('id', id)
  const { data, isLoading, error } = useQuery<Environment, Error>(
    [API_ENDPOINTS.ALERTS, id],
    () => environmentClient.get({ id }),
    {
      keepPreviousData: true,
    }
  )

  return {
    data,
    loading: isLoading,
    error,
  }
}
