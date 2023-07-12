export interface Alert {
  id: number
  content: string
  image: string
  userId: number
  status: AlertStatus
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}

export interface CreateAlert {
  content: string
  userId: number
  image?: string
}

export enum AlertStatus {
  Created = 'CREATED',
  UnderReview = 'UNDER_REVIEW',
  Solved = 'SOLVED',
  Rejected = 'REJECTED',
  FalseAlarm = 'FALSE_ALARM',
}

export interface AlertResponse {
  data: Alert[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}
