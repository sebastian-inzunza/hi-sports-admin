export default function colorBadge(status: string) {
  switch (status) {
    case 'CREATED':
      return 'bg-yellow-400'
    case 'UNDER_REVIEW':
      return 'bg-red-400'
    // Rejected Alarm
    case 'REJECTED':
      return 'bg-blue-400'
    // False Alarm
    case 'FALSE_ALARM':
      return 'bg-purple-400'
    // Solved
    case 'SOLVED':
      return 'bg-green-400'
    default:
      return 'bg-gray-400'
  }
}
