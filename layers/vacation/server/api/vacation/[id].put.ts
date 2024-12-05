import { VacationService } from '~vacation/server/service'
import { updateVacationSchema } from '~vacation/schemas'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, updateVacationSchema.parse)
  const vacationService = await VacationService.create(event)
  const id = idParam(event)

  return await vacationService.updateVacation(id, body, teamId)
})
