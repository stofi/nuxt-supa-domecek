import { VacationService } from '~vacation/server/service'
import { createVacationSchema } from '~vacation/schemas'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, createVacationSchema.parse)
  const vacationService = await VacationService.create(event)
  return await vacationService.createVacation(body, teamId)
})
