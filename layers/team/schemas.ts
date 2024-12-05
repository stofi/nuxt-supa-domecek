import { z } from 'zod'

export const createTeamSchema = z.object({
  name: z.string().optional()
})

export const updateTeamSchema = createTeamSchema.partial()

export type CreateTeam = z.infer<typeof createTeamSchema>
export type UpdateTeam = z.infer<typeof updateTeamSchema>
