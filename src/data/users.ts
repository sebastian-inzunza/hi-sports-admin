/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserPagination, UsersResponse } from '@/types/users'
import { mapPaginatorData } from '@/utils/data-mappers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QueryOptionsType } from '../types'
import { API_ENDPOINTS } from './client/api-endpoints'
import { userClient } from './client/user'

export const useUsersQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<UserPagination, Error>(
    [API_ENDPOINTS.USERS, params],
    () => userClient.fetchUsers(params),
    {
      keepPreviousData: true,
    }
  )

  return {
    users: data?.users as UsersResponse[],
    loading: isLoading,
    paginatorInfo: mapPaginatorData(data as any),
    error,
  }
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(userClient.register, {
    onSuccess() {
      toast.success('User created successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REGISTER)
    },
  })
}

export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(userClient.unblock, {
    onSuccess() {
      toast.success('User unblocked successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export const useBlockUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(userClient.block, {
    onSuccess() {
      toast.success('User blocked successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}

export const useModifyRoleMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(userClient.modifyRole, {
    onSuccess() {
      toast.success('Role modified successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS)
    },
  })
}
