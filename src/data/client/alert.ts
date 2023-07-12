import { Alert, AlertResponse } from '@/types/alerts'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'
import { GenericQueryOptions } from '@/types'
import { AlerResponse } from '../alert'

export const alertClient = {
  paginated: ({ search, ...params }: Partial<GenericQueryOptions>) => {
    return HttpClient.get<AlertResponse>(API_ENDPOINTS.ALERTS, {
      ...params,
      search: search,
    })
  },
  byId: ({ id }: { id: number }) => {
    return HttpClient.get<AlerResponse>(`${API_ENDPOINTS.ALERTS}/${id}`)
  },
}
