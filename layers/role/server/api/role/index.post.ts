import { RoleService } from '~role/server/service'
import { createRoleSchema } from '~role/schemas'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, createRoleSchema.parse)
  const roleService = await RoleService.create(event)
  return await roleService.createRole(body, teamId)
})
