export function formatDate(date: string) {
  const parsedDate = new Date(date)
  const formattedDate = parsedDate.toLocaleDateString('cs', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  return formattedDate
}
