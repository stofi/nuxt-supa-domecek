import { EmployeeService } from '~employee/server/service'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const employeeService = await EmployeeService.create(event)
  const id = idParam(event)

  return await employeeService.archiveEmployee(id, teamId)
})
