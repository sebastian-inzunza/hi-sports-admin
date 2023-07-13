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
  User = 'USER',
  Admin = 'ADMIN',
  Operator = 'OPERATOR',
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
}
