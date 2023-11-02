import {
  VideoBlog,
  VideoBlogQueryOptions,
  CreateViodeoBlogInput,
  VideoBlogPaginator,
} from '@/types/videoBlog'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const videoBlogClient = {
  ...crudFactory<VideoBlog, QueryOptions, CreateViodeoBlogInput>(
    API_ENDPOINTS.VIDEOBLOG
  ),
  pagination: ({ search, ...params }: Partial<VideoBlogQueryOptions>) => {
    return HttpClient.get<VideoBlogPaginator>(API_ENDPOINTS.VIDEOBLOG, {
      ...params,
      search,
    })
  },
}
