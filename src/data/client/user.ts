import { BlockUserInput, MakeRoleInput, UserQueryOptions } from '@/types/index'
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
  unblock: (variables: BlockUserInput) => {
    return HttpClient.put(
      `${API_ENDPOINTS.USERS}/${variables.id}/unblock`,
      variables
    )
  },
  block: (variables: BlockUserInput) => {
    return HttpClient.put(
      `${API_ENDPOINTS.USERS}/${variables.id}/block`,
      variables
    )
  },
  // modify role of user
  modifyRole: (variables: MakeRoleInput) => {
    return HttpClient.put(
      `${API_ENDPOINTS.USERS}/${variables.id}/role`,
      variables
    )
  },
}
