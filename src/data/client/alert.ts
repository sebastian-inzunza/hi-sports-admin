import { AlertResponse } from '@/types/alerts'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'

export const alertClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<AlertResponse>(API_ENDPOINTS.ALERTS, {
      ...params,
      search: search,
    })
  },
}
