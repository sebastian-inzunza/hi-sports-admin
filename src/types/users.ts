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
}

export type UserPagination = {
  users: UsersResponse[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
