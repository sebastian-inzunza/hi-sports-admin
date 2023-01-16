/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import { UsersResponse as User } from './users'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface QueryOptions {
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
  search?: string
}

export interface UserQueryOptions extends QueryOptions {
  search: string
}

export interface PaginatorInfo<T> {
  data: T[]
  totalPages: number
  total: number
  currentPage: number
  perPage: number
  hasMorePages: boolean
}
export interface MappedPaginatorInfo {
  data: any[]
  totalPages: number
  total: number
  currentPage: number
  perPage: number
  hasMorePages: boolean
}

export interface LoginInput {
  email: string
  password: string
}

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export interface PaginationUserOptions {
  page?: number
  limit?: number
  search?: string
}

export type QueryOptionsType = {
  page?: number
  search?: string
  limit?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export type UserPaginator = PaginatorInfo<User>
