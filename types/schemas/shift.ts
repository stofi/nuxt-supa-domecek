import { z } from 'zod'

export const createShiftSchema = z.object({
  date: z.union([
    z.string().min(1).transform(val => new Date(val)),
    z.date()
  ]),
  valid: z.boolean().optional()
})

export const updateShiftSchema = createShiftSchema.partial()

export type CreateShiftInput = z.input<typeof createShiftSchema>
export type CreateShift = z.infer<typeof createShiftSchema>

export type UpdateShiftInput = z.input<typeof updateShiftSchema>
export type UpdateShift = z.infer<typeof updateShiftSchema>
