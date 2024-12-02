import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

export default async function userGuard(event: H3Event) {
  const user = await serverSupabaseUser(event).catch(() => null)

  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })

  return user
}
