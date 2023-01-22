import {
  BlockUserInput,
  LoginInput,
  MakeRoleInput,
  UserQueryOptions,
} from '@/types/index'
import { UserPagination, UserRegistration, UsersResponse } from '@/types/users'
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
  login: (variables: LoginInput) => {
    return HttpClient.post(API_ENDPOINTS.LOGIN, variables)
  },
  me: () => {
    return HttpClient.get<UsersResponse>(API_ENDPOINTS.ME)
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
  update: ({ id, input }: { id: string; input: UsersResponse }) => {
    return HttpClient.put(`${API_ENDPOINTS.USERS}/${id}`, input)
  },
  changePassword: (variables: { newPassword: string }) => {
    return HttpClient.post(`${API_ENDPOINTS.UPDATE_PASSWORD}`, variables)
  },
}
