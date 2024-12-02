import { ShiftService } from '~~/server/services/shift'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const shiftService = await ShiftService.create(event)
  const id = idParam(event)

  return await shiftService.deleteShift(id, teamId)
})
