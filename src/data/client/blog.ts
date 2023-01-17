/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from '@/data/client/api-endpoints'
import { HttpClient } from '@/data/client/http-client'
import { BlogResponse, CreateNote, Note } from '@/types/blog'
import { QueryOptions } from '@/types/index'
import { crudFactory } from './crud-factory'

export const blogClient = {
  ...crudFactory<Note, QueryOptions, CreateNote>(API_ENDPOINTS.BLOG),
  paginated: ({ search, ...params }: QueryOptions) => {
    return HttpClient.get<BlogResponse>(API_ENDPOINTS.BLOG, {
      ...params,
      search,
    })
  },
  create: async (data: CreateNote) => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return HttpClient.post<Note>(API_ENDPOINTS.BLOG, data, options)
  },
}
