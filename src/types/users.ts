import { Alert } from './alerts'

export interface UsersResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  middleName?: null
  image?: null
  emailVerified?: boolean
  birthDate?: null
  registrationDate?: Date
  lastSeen?: Date
  role: string
  banned: boolean
  online?: boolean
  oneSignalId?: null
  environmentId?: null
  alerts?: Alert[]
  conversations?: any[]
  Tracking?: Tracking[]
}

export interface Tracking {
  id: number
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
  userId: number
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OPERATOR = 'operator',
  ADMIN_NOTES = 'ADMIN_NOTES',
  ADMIN_PUBLICITY = 'ADMIN_PUBLICITY',
  ADMIN_MEDIA = 'ADMIN_MEDIA',
}

export type UserPagination = {
  users: UsersResponse[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type UserRegistration = {
  email: string
  username: string
  password: string
  firstName: string
  middleName?: string | null
  lastName: string
  role: string
}
