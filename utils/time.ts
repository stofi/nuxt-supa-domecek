import { format, addMinutes, parse } from 'date-fns'

export function buildTimeArray(startTime: string, endTime: string, step: number): string[] {
  const times: string[] = []

  // Parse start and end times into Date objects
  const startDate = parse(startTime, 'HH:mm', new Date())
  const endDate = parse(endTime, 'HH:mm', new Date())

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid time format')
  }

  let current = startDate

  // Loop to build the time array
  while (current <= endDate) {
    // Format the current time in 24-hour format without seconds
    const timeString = format(current, 'HH:mm')
    times.push(timeString)

    // Increment the time by the step in minutes
    current = addMinutes(current, step)
  }

  return times
}
