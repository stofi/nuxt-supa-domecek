import { TimeslotService } from '~~/server/services/timeslot'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const timeslotService = await TimeslotService.create(event)

  return await timeslotService.getTimeslots(teamId)
})
