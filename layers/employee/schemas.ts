import { z } from 'zod'

export const employeeQuerySchema = z.object({
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  skip: z.number().optional(),
  limit: z.number().optional()
})

export const createEmployeeSchema = z.object({
  name: z.string().min(1, 'i18n:form.employee.validation.nameMin').max(255, 'i18n:form.employee.validation.nameMax'),
  contract: z.number().optional(),
  roleIds: z.array(z.number().int()).optional()
})

export const updateEmployeeSchema = createEmployeeSchema.partial()

export type EmployeeQuery = z.infer<typeof employeeQuerySchema>
export type CreateEmployee = z.infer<typeof createEmployeeSchema>
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>
