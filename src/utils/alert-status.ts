import { AlertStatus } from '@/types/alerts'

export function getAlertStatus(status: AlertStatus) {
  switch (status) {
    case AlertStatus.Created:
      return 'alarm-created'
    case AlertStatus.UnderReview:
      return 'alarm-under-review'
    case AlertStatus.Solved:
      return 'alarm-solved'
    case AlertStatus.Rejected:
      return 'alarm-rejected'
    case AlertStatus.FalseAlarm:
      return 'alarm-false-alarm'
  }
}
