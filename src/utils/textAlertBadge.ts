export default function textAlertBadge(status: string) {
  switch (status) {
    case 'CREATED':
      return 'Creada'
    case 'UNDER_REVIEW':
      return 'En revisión'
    // Rejected Alarm
    case 'REJECTED':
      return 'Rechazada'
    // False Alarm
    case 'FALSE_ALARM':
      return 'Falsa Alarma'
    // Solved
    case 'SOLVED':
      return 'Resuelta'
    default:
      return 'Resuelta'
  }
}
