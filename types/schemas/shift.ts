import { z } from 'zod'

export const shiftQuerySchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
})

export const createShiftSchema = z.object({
  date: z.union([
    z.string().min(1).transform(val => new Date(val)),
    z.date()
  ]),
  valid: z.boolean().optional()
})

export const updateShiftSchema = createShiftSchema.partial()

export type ShiftQuery = z.input<typeof shiftQuerySchema>

export type CreateShiftInput = z.input<typeof createShiftSchema>
export type CreateShift = z.infer<typeof createShiftSchema>

export type UpdateShiftInput = z.input<typeof updateShiftSchema>
export type UpdateShift = z.infer<typeof updateShiftSchema>
