import { EmployeeService } from '~~/server/services/employee'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const employeeService = await EmployeeService.create(event)
  const id = idParam(event)

  return await employeeService.deleteEmployee(id, teamId)
})
