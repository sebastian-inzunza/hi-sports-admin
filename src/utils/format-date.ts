export function formatDate(date: Date | string): string {
  // Format date like Mayo 5, 2021 12:00 AM

  return new Intl.DateTimeFormat('es-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date))
}
