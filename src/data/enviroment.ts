import { useQuery } from 'react-query'
import { Environment, QueryOptionsType, EnvironmentPagination } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { environmentClient } from './client/environment'
import { mapPaginatorData } from '@/utils/data-mappers'

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
