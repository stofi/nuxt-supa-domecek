import { TeamService } from '~team/server/TeamService'
import { createTeamSchema } from '~~/types/schemas/team'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)
  const body = await readValidatedBody(event, createTeamSchema.parse)
  const teamService = await TeamService.create(event)
  const id = idParam(event)

  return await teamService.updateTeam(id, body, user.id)
})
