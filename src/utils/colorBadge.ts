export default function colorBadge(status: string) {
  switch (status) {
    case 'CREATED':
      return 'bg-yellow-400 text-yellow-800'
    case 'UNDER_REVIEW':
      return 'bg-red-400 text-red-800'
    // Rejected Alarm
    case 'REJECTED':
      return 'bg-blue-400 text-blue-800'
    // False Alarm
    case 'FALSE_ALARM':
      return 'bg-purple-400 text-purple-800'
    // Solved
    case 'SOLVED':
      return 'bg-green-400 text-green-800'
    default:
      return 'bg-gray-400 text-gray-800'
  }
}
