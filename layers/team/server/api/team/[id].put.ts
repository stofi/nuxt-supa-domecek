import { TeamService } from '~team/server/service'
import { createTeamSchema } from '~team/schemas'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)
  const body = await readValidatedBody(event, createTeamSchema.parse)
  const teamService = await TeamService.create(event)
  const id = idParam(event)

  return await teamService.updateTeam(id, body, user.id)
})
