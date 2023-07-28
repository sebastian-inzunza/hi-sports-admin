import { Suggestion } from '@testing-library/react'

export type suggestionsPagination = {
  suggestions: Suggestion[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface SuggestionsResponse {
  id: number
  slug: string
  content: string
  userId: number
  createdAt: Date
  user: User
  rating: number
}

export interface User {
  id: number
  name: string
  username: string
  firstName: string
  lastName: string
  email: string
  image: null
  registration: Date
}
