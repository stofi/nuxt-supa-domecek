import type { H3Event } from 'h3'
import { BaseService } from './base'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateVacation, UpdateVacation } from '~~/types/schemas/vacation'

export class VacationService extends BaseService {
  private selector = '*, employee(*)' as const

  static async create(event: H3Event): Promise<VacationService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new VacationService(supabase)
  }

  // Fetch all vacations for a team
  async getVacations(teamId: number, employeeId?: number) {
    let query = this.supabase
      .from('vacation')
      .select(this.selector, { count: 'estimated' })
      .eq('team_id', teamId)

    if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    const { data, error, count } = await query

    if (error) throw this.handlePostgrestError(error, 'Error fetching vacations')

    return { data, count }
  }

  // Get a single vacation by ID
  async getVacationById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('vacation')
      .select(this.selector)
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Vacation not found', 404)

    return data
  }

  // Create a new vacation
  async createVacation(vacationData: CreateVacation, teamId: number) {
    const { data, error } = await this.supabase
      .from('vacation')
      .insert({
        ...vacationData,
        date: JSON.stringify(vacationData.date),
        team_id: teamId
      })
      .select(this.selector)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error creating vacation')

    return data
  }

  // Update an existing vacation
  async updateVacation(id: number, updateData: UpdateVacation, teamId: number) {
    const { data, error } = await this.supabase
      .from('vacation')
      .update({ ...updateData, date: JSON.stringify(updateData.date) })
      .eq('id', id)
      .eq('team_id', teamId)
      .select(this.selector)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error updating vacation')

    return data
  }

  // Delete a vacation
  async deleteVacation(id: number, teamId: number) {
    const { error } = await this.supabase
      .from('vacation')
      .delete()
      .eq('id', id)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting vacation')

    return { success: true }
  }

  // Delete multiple vacations
  async deleteVacations(ids: number[], teamId: number) {
    const { error } = await this.supabase
      .from('vacation')
      .delete()
      .in('id', ids)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting vacations')

    return { success: true }
  }
}

export const createVacationService = VacationService.create
