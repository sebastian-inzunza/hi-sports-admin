import { UserQueryOptions } from '@/types/index'
import { UserPagination, UserRegistration } from '@/types/users'
import { API_ENDPOINTS } from './api-endpoints'
import { HttpClient } from './http-client'

export const userClient = {
  fetchUsers: ({ search, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPagination>(API_ENDPOINTS.USERS, {
      ...params,
      search: search,
    })
  },
  register: (variables: UserRegistration) => {
    return HttpClient.post(API_ENDPOINTS.REGISTER, variables)
  },
}
