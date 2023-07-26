import { EnvironmentPagination } from '@/types/enviroment'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { Environment, EnvironmentInput, EnvironmentQueryOptions } from '@/types'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const environmentClient = {
  ...crudFactory<Environment, QueryOptions, EnvironmentInput>(
    API_ENDPOINTS.ENVIRONMENTS
  ),
  getSettings: () => {
    return HttpClient.get<Environment>(API_ENDPOINTS.SETTINGS)
  },
  fetchEnviroment: ({
    search,
    ...params
  }: Partial<EnvironmentQueryOptions>) => {
    return HttpClient.get<EnvironmentPagination>(API_ENDPOINTS.ENVIRONMENTS, {
      ...params,
      search: search,
    })
  },
}
