import { TeamService } from '~~/server/services/team'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)
  const teamService = await TeamService.create(event)

  return await teamService.getTeams(user.id)
})
