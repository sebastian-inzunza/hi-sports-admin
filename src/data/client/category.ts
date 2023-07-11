import {
  Category,
  CategoryPaginator,
  CategoryQueryOptions,
  CreateCategoryInput,
} from '@/types/category'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const categoryClient = {
  ...crudFactory<Category, QueryOptions, CreateCategoryInput>(
    API_ENDPOINTS.CATEGORY
  ),
  pagination: ({ search, ...params }: Partial<CategoryQueryOptions>) => {
    return HttpClient.get<CategoryPaginator>(API_ENDPOINTS.CATEGORY, {
      ...params,
      search,
    })
  },
}
