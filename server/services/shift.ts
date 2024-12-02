import type { H3Event } from 'h3'
import { BaseService } from './base'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateShift, ShiftQuery, UpdateShift } from '~~/types/schemas/shift'

export class ShiftService extends BaseService {
  private selector = '*,timeslot(*,role(*),employee(*))' as const

  static async create(event: H3Event): Promise<ShiftService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new ShiftService(supabase)
  }

  // Get all shifts for a team
  async getShifts(query: ShiftQuery, teamId: number) {
    let shiftQuery = this.supabase
      .from('shift')
      .select(this.selector, { count: 'estimated' })
      .eq('team_id', teamId)

    if (query.from) {
      shiftQuery = shiftQuery.gte('date', query.from)
    }

    if (query.to) {
      shiftQuery = shiftQuery.lte('date', query.to)
    }

    const { data, error, count } = await shiftQuery

    if (error) throw this.handlePostgrestError(error, 'Error fetching shifts')

    return { data, count }
  }

  // Get a specific shift by ID
  async getShiftById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('shift')
      .select(this.selector)
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    if (error) throw this.handlePostgrestError(
      error,
      'Error fetching shift by ID'
    )

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
      .select(this.selector)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error creating shift')

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
      .select(this.selector)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error updating shift')

    return data
  }

  // Delete a shift
  async deleteShift(id: number, teamId: number) {
    const { error } = await this.supabase
      .from('shift')
      .delete()
      .eq('id', id)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting shift')

    return { success: true }
  }
}

export const createShiftService = ShiftService.create
