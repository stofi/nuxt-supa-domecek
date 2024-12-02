import { ShiftService } from '~~/server/services/shift'
import { updateShiftSchema } from '~~/types/schemas/shift'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, updateShiftSchema.parse)
  const shiftService = await ShiftService.create(event)
  const id = idParam(event)

  return await shiftService.updateShift(id, body, teamId)
})
