import { EnvironmentPagination } from '@/types/enviroment'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { EnvironmentQueryOptions } from '@/types'

export const environmentClient = {
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
