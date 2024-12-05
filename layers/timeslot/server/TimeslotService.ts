import type { H3Event } from 'h3'
import { BaseService } from '~base/server/BaseService'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateTimeslot, TimeslotQuery, UpdateTimeslot } from '~~/types/schemas/timeslot'

export class TimeslotService extends BaseService {
  private selector = '*, role(*), employee(*)' as const

  static async create(event: H3Event): Promise<TimeslotService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new TimeslotService(supabase)
  }

  // Fetch all timeslots for a team
  async getTimeslots(query: TimeslotQuery, teamId: number) {
    let timeslotQuery = this.supabase
      .from('timeslot')
      .select(this.selector, { count: 'estimated' })
      .eq('team_id', teamId)

    if ('date' in query && query.date) {
      timeslotQuery = timeslotQuery.eq('date', query.date)
    } else {
      if ('from' in query && query.from) {
        timeslotQuery = timeslotQuery.gte('date', query.from)
      }

      if ('from' in query && query.to) {
        timeslotQuery = timeslotQuery.lte('date', query.to)
      }
    }

    const { data, error, count } = await timeslotQuery

    if (error) throw this.handlePostgrestError(error, 'Error fetching timeslots')

    return { data, count }
  }

  // Get a single timeslot by ID
  async getTimeslotById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('timeslot')
      .select(this.selector)
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
        date: JSON.stringify(timeslotData.date),
        team_id: teamId
      })
      .select(this.selector)
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
      .update({ ...updateData,
        date: JSON.stringify(updateData.date)
      })
      .eq('id', id)
      .eq('team_id', teamId)
      .select(this.selector)
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
