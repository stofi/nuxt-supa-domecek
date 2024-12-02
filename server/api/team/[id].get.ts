import { TeamService } from '~~/server/services/team'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)
  const teamService = await TeamService.create(event)
  const id = idParam(event)

  return await teamService.getTeamById(id, user.id)
})
