import { EmployeeService } from '~~/server/services/employee'
import { createEmployeeSchema } from '~~/types/schemas/employee'

export default defineEventHandler(async (event) => {
  await userGuard(event)
  const teamId = await getUserTeam(event)
  const body = await readValidatedBody(event, createEmployeeSchema.parse)
  const employeeService = await EmployeeService.create(event)
  return await employeeService.createEmployee(body, teamId)
})
