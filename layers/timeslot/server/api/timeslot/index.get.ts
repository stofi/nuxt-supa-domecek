import { TimeslotService } from '~timeslot/server/TimeslotService'
import { timeslotQuerySchema } from '~~/types/schemas/timeslot'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const timeslotService = await TimeslotService.create(event)
  const query = await getValidatedQuery(event, timeslotQuerySchema.parse)
  console.log('query', query)
  return await timeslotService.getTimeslots(query, teamId)
})
