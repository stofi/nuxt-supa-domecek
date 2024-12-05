import { VacationService } from '~vacation/server/VacationService'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const vacationService = await VacationService.create(event)
  const id = idParam(event)

  return await vacationService.getVacationById(id, teamId)
})
