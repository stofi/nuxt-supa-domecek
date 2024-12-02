import { z } from 'zod'

export const createTimeslotSchema = z.object({
  shift_id: z.number(),
  role_id: z.number().optional(),
  employee_id: z.number().optional(),
  start_time: z.string().regex(/^\d{2}:\d{2}$/),
  end_time: z.string().regex(/^\d{2}:\d{2}$/),
  break: z.boolean().optional()
})

export const updateTimeslotSchema = createTimeslotSchema.partial()

export type CreateTimeslot = z.infer<typeof createTimeslotSchema>
export type UpdateTimeslot = z.infer<typeof updateTimeslotSchema>
