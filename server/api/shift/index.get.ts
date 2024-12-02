import { ShiftService } from '~~/server/services/shift'
import { shiftQuerySchema } from '~~/types/schemas/shift'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const shiftService = await ShiftService.create(event)
  const query = await getValidatedQuery(event, shiftQuerySchema.parse)

  return await shiftService.getShifts(query, teamId)
})
