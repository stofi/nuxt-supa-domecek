import { TeamService } from '~team/server/service'
import { createTeamSchema } from '~team/schemas'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)

  const body = await readValidatedBody(event, createTeamSchema.parse)
  const teamService = await TeamService.create(event)
  return await teamService.createTeam(body, user.id)
})
