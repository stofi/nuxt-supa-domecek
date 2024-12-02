import type { H3Event } from 'h3'
import { BaseService } from './base'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateRole, UpdateRole } from '~~/types/schemas/role'

export class RoleService extends BaseService {
  static async create(event: H3Event): Promise<RoleService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new RoleService(supabase)
  }

  // Get all roles for a team
  async getRoles(teamId: number) {
    const { data, error, count } = await this.supabase
      .from('role')
      .select('*', { count: 'estimated' })
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error fetching roles')

    return { data, count }
  }

  // Get a single role by ID
  async getRoleById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('role')
      .select('*')
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error fetching role by ID', 404)

    return data
  }

  // Create a new role
  async createRole(roleData: CreateRole, teamId: number) {
    const { data, error } = await this.supabase
      .from('role')
      .insert({
        ...roleData,
        team_id: teamId
      })
      .select('*')
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error creating role')

    return data
  }

  // Update an existing role
  async updateRole(id: number, updateData: UpdateRole, teamId: number) {
    const { data, error } = await this.supabase
      .from('role')
      .update(updateData)
      .eq('id', id)
      .eq('team_id', teamId)
      .select('*')
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error updating role')

    return data
  }

  // Delete a role
  async deleteRole(id: number, teamId: number) {
    const { error } = await this.supabase
      .from('role')
      .delete()
      .eq('id', id)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting role')

    return { success: true }
  }
}

export const createRoleService = RoleService.create
