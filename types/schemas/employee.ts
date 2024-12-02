import { z } from 'zod'

export const employeeQuerySchema = z.object({
  q: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  skip: z.number().optional(),
  limit: z.number().optional()
})

export const createEmployeeSchema = z.object({
  name: z.string().min(1),
  contract: z.number().optional()
})

export const updateEmployeeSchema = createEmployeeSchema.partial()

export type EmployeeQuery = z.infer<typeof employeeQuerySchema>
export type CreateEmployee = z.infer<typeof createEmployeeSchema>
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>
