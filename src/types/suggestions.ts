export interface SuggestionsResponse {
  id: number
  content: string
  userId: number
  createdAt: Date
  user: User
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  image: null
  registration: Date
}
