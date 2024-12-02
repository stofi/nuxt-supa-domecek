import { TimeslotService } from '~~/server/services/timeslot'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const timeslotService = await TimeslotService.create(event)
  const id = idParam(event)

  return await timeslotService.deleteTimeslot(id, teamId)
})
