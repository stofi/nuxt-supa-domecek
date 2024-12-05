import { RoleService } from '~role/server/service'
import { updateRoleSchema } from '~role/schemas'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, updateRoleSchema.parse)
  const roleService = await RoleService.create(event)
  const id = idParam(event)

  return await roleService.updateRole(id, body, teamId)
})
