import {
  Videoteca,
  VideotecaQueryOptions,
  CreateViodetaInput,
  VideotecaPaginator,
} from '@/types/videoteca'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const videotecaClient = {
  ...crudFactory<Videoteca, QueryOptions, CreateViodetaInput>(
    API_ENDPOINTS.VIDEOTECA
  ),
  pagination: ({ search, ...params }: Partial<VideotecaQueryOptions>) => {
    return HttpClient.get<VideotecaPaginator>(API_ENDPOINTS.VIDEOTECA, {
      ...params,
      search,
    })
  },
}
