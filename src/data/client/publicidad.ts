import {
  Publicidad,
  PublicidadQueryOptions,
  CreatePublicidadInput,
  PublicidadPaginator,
} from '@/types/publicidad'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const publicidadClient = {
  ...crudFactory<Publicidad, QueryOptions, CreatePublicidadInput>(
    API_ENDPOINTS.PUBLICIDAD
  ),
  pagination: ({ search, ...params }: Partial<PublicidadQueryOptions>) => {
    return HttpClient.get<PublicidadPaginator>(API_ENDPOINTS.PUBLICIDAD, {
      ...params,
      search,
    })
  },
}
