import { TeamService } from '~team/server/service'

export default defineEventHandler(async (event) => {
  const user = await userGuard(event)
  const teamService = await TeamService.create(event)
  const id = idParam(event)

  return await teamService.deleteTeam(id, user.id)
})
