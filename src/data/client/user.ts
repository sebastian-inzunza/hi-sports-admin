import {
  BlockUserInput,
  ForgetPasswordInput,
  LoginInput,
  MakeRoleInput,
  ResetPasswordInput,
  UserQueryOptions,
  VerifyForgetPasswordTokenInput,
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
  verifyForgetPasswordToken: (variables: VerifyForgetPasswordTokenInput) => {
    return HttpClient.post<any>(
      API_ENDPOINTS.VERIFY_FORGET_PASSWORD_TOKEN,
      variables
    )
  },
  register: (variables: UserRegistration) => {
    return HttpClient.post(API_ENDPOINTS.USERS, variables)
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
  resetPassword: (variables: ResetPasswordInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.RESET_PASSWORD, variables)
  },
  changePassword: (variables: { newPassword: string }) => {
    return HttpClient.post(`${API_ENDPOINTS.UPDATE_PASSWORD}`, variables)
  },
  forgetPassword: (variables: ForgetPasswordInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.FORGET_PASSWORD, variables)
  },
  get: ({ id }: { id: number }) => {
    return HttpClient.get<UsersResponse>(`${API_ENDPOINTS.USERS}/${id}`)
  },
}
