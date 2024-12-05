import { z } from 'zod'

export const createRoleSchema = z.object({
  name: z.string().min(1, 'Role name must not be empty'),
  color: z.string().optional(),
  shortname: z.string().optional(),
  priority: z.boolean().optional()
})

export const updateRoleSchema = createRoleSchema.partial()

export type CreateRole = z.infer<typeof createRoleSchema>
export type UpdateRole = z.infer<typeof updateRoleSchema>
