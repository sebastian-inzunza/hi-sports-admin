export interface UsersResponse {
  id: number
  username: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  middleName: null | string
  image: null
  emailVerified: boolean
  birthDate: null
  registrationDate: Date
  role: Role
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
