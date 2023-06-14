import { Alert, AlertResponse, CreateAlert } from '@/types/alerts'
import { QueryOptions } from '@/types/index'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { HttpClient } from './http-client'

export const alertClient = {
  ...crudFactory<Alert, QueryOptions, CreateAlert>(API_ENDPOINTS.ALERTS),

  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<AlertResponse>(API_ENDPOINTS.ALERTS, {
      ...params,
      search,
    })
  },
}
