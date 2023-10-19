import {
  Presentador,
  PresentadorQueryOptions,
  CreatePresentadorInput,
  PresentadorPaginator,
} from '@/types/presentador'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const presentadorClient = {
  ...crudFactory<Presentador, QueryOptions, CreatePresentadorInput>(
    API_ENDPOINTS.PRESENTADOR
  ),
  pagination: ({ search, ...params }: Partial<PresentadorQueryOptions>) => {
    return HttpClient.get<PresentadorPaginator>(API_ENDPOINTS.PRESENTADOR, {
      ...params,
      search,
    })
  },
}
