/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import { Alert } from './alerts'
import { Role, UsersResponse as User } from './users'

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface LocationInput {
  lat?: number
  lng?: number
  city?: string
  state?: string
  country?: string
  zip?: string
  formattedAddress?: string
}

export interface MakeRoleInput {
  id: number
  role: Role
}
export interface BlockUserInput {
  id: number
  banned: boolean
}

export interface QueryOptions {
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
  search?: string
}

export interface Attachment {
  thumbnail: string
  original: string
  id?: string
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
  identifier: string
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

export interface Suggestion {
  id: number
  slug: string
  content: string
  userId: number
  createdAt: Date
  user: SuggestionByUser
}

export interface SuggestionByUser {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  image: null
  registration: Date
}

export interface Conversations {
  id: string
  created_at: string
  updated_at: string
  shop_id: number
  unseen: boolean
  user_id: string
  user: User
  latest_message: LatestMessage
}

export interface LatestMessage {
  body: string
  conversation_id: string
  created_at: string
  updated_at: string
  user_id: string
  id: string
}

export type SuggestionPaginator = PaginatorInfo<Suggestion>
export type UserPaginator = PaginatorInfo<User>
export type AlertPaginator = PaginatorInfo<Alert>
