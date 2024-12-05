import { z } from 'zod'

export const createVacationSchema = z.object({
  employee_id: z.number().int().min(0),
  date: z.union([
    z.string().min(1).transform(val => new Date(val)),
    z.date()
  ])
})

export const updateVacationSchema = createVacationSchema.partial()

export type CreateVacationInput = z.input<typeof createVacationSchema>
export type CreateVacation = z.infer<typeof createVacationSchema>
export type UpdateVacationInput = z.input<typeof updateVacationSchema>
export type UpdateVacation = z.infer<typeof updateVacationSchema>
