import {
  Menu,
  MenuQueryOptions,
  CreateMenuInput,
  MenuPaginator,
} from '@/types/menu'
import { HttpClient } from './http-client'
import { API_ENDPOINTS } from './api-endpoints'
import { crudFactory } from './crud-factory'
import { QueryOptions } from 'react-query'

export const menuClient = {
  ...crudFactory<Menu, QueryOptions, CreateMenuInput>(API_ENDPOINTS.MENU),
  pagination: ({ search, ...params }: Partial<MenuQueryOptions>) => {
    return HttpClient.get<MenuPaginator>(API_ENDPOINTS.MENU, {
      ...params,
      search,
    })
  },
}
