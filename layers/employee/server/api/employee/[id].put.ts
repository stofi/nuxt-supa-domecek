import { EmployeeService } from '~employee/server/service'
import { updateEmployeeSchema } from '~employee/schemas'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, updateEmployeeSchema.parse)
  const employeeService = await EmployeeService.create(event)
  const id = idParam(event)

  return await employeeService.updateEmployee(id, body, teamId)
})
