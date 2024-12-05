import { TeamService } from '~team/server/TeamService'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)
  const teamService = await TeamService.create(event)

  return await teamService.getTeams(user.id)
})
