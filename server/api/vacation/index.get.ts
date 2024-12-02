import { VacationService } from '~~/server/services/vacation'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const vacationService = await VacationService.create(event)

  return await vacationService.getVacations(teamId)
})
