import { RoleService } from '~role/server/RoleService'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const roleService = await RoleService.create(event)

  return await roleService.getRoles(teamId)
})
