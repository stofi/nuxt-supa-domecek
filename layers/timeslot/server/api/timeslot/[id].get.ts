import { TimeslotService } from '~timeslot/server/TimeslotService'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const timeslotService = await TimeslotService.create(event)
  const id = idParam(event)

  return await timeslotService.getTimeslotById(id, teamId)
})
