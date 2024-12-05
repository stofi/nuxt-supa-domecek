import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~~/types/supabase'

export abstract class BaseService {
  constructor(protected supabase: SupabaseClient<Database>) {}

  protected handlePostgrestError(error: PostgrestError, statusMessage = 'Server error', statusCode = 500) {
    console.error(statusMessage, error)
    throw createError({
      statusCode,
      statusMessage,
      message: error.details,
      data: error
    })
  }
}
