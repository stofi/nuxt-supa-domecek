import { z } from 'zod'

export const timeslotQuerySchema
  = z.object({
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
  })

export const createTimeslotSchema = z.object({
  role_id: z.number().optional(),
  employee_id: z.number().optional(),
  start_time: z.string().regex(/^\d{2}:\d{2}$/),
  end_time: z.string().regex(/^\d{2}:\d{2}$/),
  break: z.boolean().optional(),
  date: z.union([
    z.string().min(1).transform(val => new Date(val)),
    z.date()
  ])
})

export const updateTimeslotSchema = createTimeslotSchema.partial()

export type TimeslotQuery = z.input<typeof timeslotQuerySchema>

export type CreateTimeslotInput = z.input<typeof createTimeslotSchema>
export type CreateTimeslot = z.infer<typeof createTimeslotSchema>

export type UpdateTimeslotInput = z.input<typeof updateTimeslotSchema>
export type UpdateTimeslot = z.infer<typeof updateTimeslotSchema>
