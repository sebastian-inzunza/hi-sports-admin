export interface AnalyticsResponse {
  usersCount: number
  alertsCount: number
  notesCount: number
  alertsByYear: {
    data: number[]
  }
}
