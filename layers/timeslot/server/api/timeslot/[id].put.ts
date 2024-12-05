import { TimeslotService } from '~timeslot/server/TimeslotService'
import { updateTimeslotSchema } from '~~/types/schemas/timeslot'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, updateTimeslotSchema.parse)
  const timeslotService = await TimeslotService.create(event)
  const id = idParam(event)

  return await timeslotService.updateTimeslot(id, body, teamId)
})
