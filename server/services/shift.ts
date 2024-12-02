import type { SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateShift, UpdateShift } from '~~/types/schemas/shift'

export class ShiftService {
  private constructor(private supabase: SupabaseClient<Database>) {}

  static async create(event: H3Event): Promise<ShiftService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new ShiftService(supabase)
  }

  // Get all shifts for a team
  async getShifts(teamId: number) {
    const { data, error, count } = await this.supabase
      .from('shift')
      .select('*', { count: 'estimated' })
      .eq('team_id', teamId)

    if (error) {
      console.error('Error fetching shifts:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Error fetching shifts'
      })
    }

    return { data, count }
  }

  // Get a specific shift by ID
  async getShiftById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('shift')
      .select('*')
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    if (error) {
      console.error('Error fetching shift by ID:', error)
      throw createError({
        statusCode: 404,
        statusMessage: 'Shift not found'
      })
    }

    return data
  }

  // Create a new shift
  async createShift(shiftData: CreateShift, teamId: number) {
    const { data, error } = await this.supabase
      .from('shift')
      .insert({
        ...shiftData,
        date: JSON.stringify(shiftData.date),
        team_id: teamId
      })
      .select('*')
      .single()

    if (error) {
      console.error('Error creating shift:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Error creating shift'
      })
    }

    return data
  }

  // Update a shift
  async updateShift(id: number, updateData: UpdateShift, teamId: number) {
    const { data, error } = await this.supabase
      .from('shift')
      .update({
        ...updateData,
        date: JSON.stringify(updateData.date)
      })
      .eq('id', id)
      .eq('team_id', teamId)
      .select('*')
      .single()

    if (error) {
      console.error('Error updating shift:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Error updating shift'
      })
    }

    return data
  }

  // Delete a shift
  async deleteShift(id: number, teamId: number) {
    const { error } = await this.supabase
      .from('shift')
      .delete()
      .eq('id', id)
      .eq('team_id', teamId)

    if (error) {
      console.error('Error deleting shift:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Error deleting shift'
      })
    }

    return { success: true }
  }
}

export const createShiftService = ShiftService.create
