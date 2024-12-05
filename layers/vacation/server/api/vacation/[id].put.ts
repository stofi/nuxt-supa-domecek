import { VacationService } from '~vacation/server/VacationService'
import { updateVacationSchema } from '~~/types/schemas/vacation'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, updateVacationSchema.parse)
  const vacationService = await VacationService.create(event)
  const id = idParam(event)

  return await vacationService.updateVacation(id, body, teamId)
})
