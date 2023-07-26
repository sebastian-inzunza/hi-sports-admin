/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from '@/data/client/api-endpoints'
import { HttpClient } from '@/data/client/http-client'
import { QueryOptions } from '@/types'
import { crudFactory } from './crud-factory'
import { BlogResponse, CreateInputNote, Note } from '@/types/blog'

export const blogClient = {
  ...crudFactory<Note, QueryOptions, CreateInputNote>(API_ENDPOINTS.BLOG),
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<BlogResponse>(API_ENDPOINTS.BLOG, {
      ...params,
      search,
    })
  },
}
