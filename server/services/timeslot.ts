import type { H3Event } from 'h3'
import { BaseService } from './base'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateTimeslot, UpdateTimeslot } from '~~/types/schemas/timeslot'

export class TimeslotService extends BaseService {
  static async create(event: H3Event): Promise<TimeslotService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new TimeslotService(supabase)
  }

  // Fetch all timeslots for a team
  async getTimeslots(teamId: number, shiftId?: number) {
    let query = this.supabase
      .from('timeslot')
      .select('*', { count: 'estimated' })
      .eq('team_id', teamId)

    if (shiftId) {
      query = query.eq('shift_id', shiftId)
    }

    const { data, error, count } = await query

    if (error) throw this.handlePostgrestError(error, 'Error fetching timeslots')

    return { data, count }
  }

  // Get a single timeslot by ID
  async getTimeslotById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('timeslot')
      .select('*')
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Timeslot not found', 404)

    return data
  }

  // Create a new timeslot
  async createTimeslot(timeslotData: CreateTimeslot, teamId: number) {
    const { data, error } = await this.supabase
      .from('timeslot')
      .insert({
        ...timeslotData,
        team_id: teamId
      })
      .select('*')
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error creating timeslot')

    return data
  }

  // Update an existing timeslot
  async updateTimeslot(
    id: number,
    updateData: UpdateTimeslot,
    teamId: number
  ) {
    const { data, error } = await this.supabase
      .from('timeslot')
      .update(updateData)
      .eq('id', id)
      .eq('team_id', teamId)
      .select('*')
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error updating timeslot')

    return data
  }

  // Delete a timeslot
  async deleteTimeslot(id: number, teamId: number) {
    const { error } = await this.supabase
      .from('timeslot')
      .delete()
      .eq('id', id)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting timeslot')

    return { success: true }
  }

  // Delete multiple timeslots
  async deleteTimeslots(ids: number[], teamId: number) {
    const { error } = await this.supabase
      .from('timeslot')
      .delete()
      .in('id', ids)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting timeslots')

    return { success: true }
  }
}

export const createTimeslotService = TimeslotService.create
