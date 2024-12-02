import { ShiftService } from '~~/server/services/shift'
import { createShiftSchema } from '~~/types/schemas/shift'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, createShiftSchema.parse)
  const shiftService = await ShiftService.create(event)
  return await shiftService.createShift(body, teamId)
})
