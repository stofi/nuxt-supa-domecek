import { VacationService } from '~~/server/services/vacation'
import { createVacationSchema } from '~~/types/schemas/vacation'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, createVacationSchema.parse)
  const vacationService = await VacationService.create(event)
  return await vacationService.createVacation(body, teamId)
})
