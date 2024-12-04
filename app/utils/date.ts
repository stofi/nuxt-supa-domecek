export function formatDate(date: string | Date, locale = 'cs') {
  const parsedDate = new Date(date)
  const formattedDate = parsedDate.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  return formattedDate
}
