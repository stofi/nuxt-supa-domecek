import { TimeslotService } from '~timeslot/server/service'
import { createTimeslotSchema } from '~timeslot/schemas'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, createTimeslotSchema.parse)
  const timeslotService = await TimeslotService.create(event)
  return await timeslotService.createTimeslot(body, teamId)
})
