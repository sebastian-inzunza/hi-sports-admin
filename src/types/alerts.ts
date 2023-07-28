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
  user?: {
    email: string
    id: number
    name: string
    latestLocation: {
      latitude: number
      longitude: number
    }
  }
}

export interface CreateAlert {
  content: string
  userId: number
  image?: string
  status?: AlertStatus
  attendedBy?: number
}

export enum AlertStatus {
  Created = 'CREATED',
  UnderReview = 'UNDER_REVIEW',
  Solved = 'SOLVED',
  Rejected = 'REJECTED',
  FalseAlarm = 'FALSE_ALARM',
}
// Array of the status

export const AlertStatusArray = [
  {
    value: AlertStatus.Created,
    label: AlertStatus.Created,
  },
  {
    value: AlertStatus.UnderReview,
    label: AlertStatus.UnderReview,
  },
  {
    value: AlertStatus.Solved,
    label: AlertStatus.Solved,
  },
  {
    value: AlertStatus.Rejected,
    label: AlertStatus.Rejected,
  },
  {
    value: AlertStatus.FalseAlarm,
    label: AlertStatus.FalseAlarm,
  },
]
export interface AlertResponse {
  data: Alert[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}
