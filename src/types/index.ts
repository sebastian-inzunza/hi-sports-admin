/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import { Alert } from './alerts'
import { Role, UsersResponse as User } from './users'

export interface AuthResponse {
  jwt: string
  role: Role
}

export interface StoreNoticeQueryOptions extends QueryOptions {
  notice: string
  environmentId: string
}

;[
  {
    id: 1,
    name: 'Kali Connect',
    logo: null,
    active: false,
    primary_color: '#0f406b',
    secondary_color: '#1285c1',
    Segment: {
      id: 1,
      name: 'kali-connect',
      environmentId: 1,
    },
  },
]

export interface Environment {
  id: number
  name: string
  logo?: string
  active: boolean
  primary_color: string
  secondary_color: string
  Segment?: {
    id: number
    name: string
    environmentId: number
  }
}

export type EnvironmentPagination = {
  environments: Environment[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type EnvironmentInput = {
  name: string
  users: []
  primary_color: string
  secondary_color: string
}

export interface suggestionsQueryOptions extends QueryOptions {
  search: string
}

export interface EnvironmentQueryOptions extends QueryOptions {
  search: string
}

export enum StoreStatus {
  HIGHT = 'HIGHT',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export type ReceivedData = {
  data: Notice
  success: boolean
}
export interface NoticeCreateInput {
  id?: number
  priority?: StoreStatus
  creator: string
  notice: string
  description?: string | null
  effectiveFrom: string
  expiredAt: string
  type?: string | null
  updatedBy: number
  is_approved?: boolean | null
  environmentId: number
}
export interface Notice extends NoticeCreateInput {}
export interface EnvironmentQueryOptions extends QueryOptions {
  name: string
}

export interface StoreNoticeInput {
  priority: string
  notice: string
  description?: string
  effective_from?: string
  expired_at: string
  type: string
  received_by?: string[]
}

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

export interface GenericQueryOptions extends QueryOptions {
  search: string
}
export interface PaginatorInfo<T> {
  data: T[]
  totalPages: number
  total: number
  currentPage: number
  latestPage: number
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

export interface CreateMessageSeenInput {
  userId: string
  messageId: string
}

export interface CreateMessageInput {
  content: string
  recipientId: number
  conversationId?: number
}

// Chat
export interface Chat {
  success: boolean
  data: DataChat[]
}
export interface VerifyForgetPasswordTokenInput {
  token: string
  email: string
}

export interface ForgetPasswordInput {
  email: string
}

export interface ResetPasswordInput {
  token: string
  email: string
  password: string
}

export interface DataChat {
  id: number | string
  participants: Participant[]
  latestMessage: LatestMessage
  messages: Message[]
}
export interface MessageQueryOptions extends QueryOptions {
  id: string
}
export interface LatestMessage {
  id: number
  content: string
  sender: Recipient
  recipient: Recipient
  createdAt: Date
  isRead: boolean
  isMedia: boolean
}

export interface Recipient {
  id: number
  username: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  middleName: null
  image: null
  emailVerified: boolean
  birthDate: null
  registrationDate: Date
  lastSeen: Date
  role: string
  banned: boolean
  online: boolean
  oneSignalId: null
  environmentId: null
}

export interface Message {
  id: number
  content: string
  sender: Recipient
  recipient: Recipient
  createdAt: Date
}

export interface MessagePaginator extends PaginatorInfo<DataChat> {}

export interface Participant {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: null
  online: boolean
}

export type UserPaginator = PaginatorInfo<User>
export type AlertPaginator = PaginatorInfo<Alert>
export interface StoreNoticePaginator extends PaginatorInfo<Notice> {}
