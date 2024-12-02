import { ShiftService } from '~~/server/services/shift'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const shiftService = await ShiftService.create(event)

  return await shiftService.getShifts(teamId)
})
