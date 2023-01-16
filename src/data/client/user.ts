import { UserPaginator, UserQueryOptions } from '@/types/index'
import { UserPagination } from '@/types/users'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const userClient = {
  users: ({ search, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.USERS, {
      ...params,
      search: search,
    })
  },
  fetchUsers: ({ search, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPagination>(API_ENDPOINTS.USERS, {
      ...params,
      search: search,
    })
  },
}
