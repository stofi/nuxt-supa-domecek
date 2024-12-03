import type { H3Event } from 'h3'
import { BaseService } from './base'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateTeam } from '~~/types/schemas/team'

export class TeamService extends BaseService {
  private teamSelector = 'id, name, owner:profiles!team_owner_id_fkey1(*), users:team_users(...profiles(*))' as const
  // private teamUserSelector = '*, user:profiles!user_id(*)' as const

  static async create(event: H3Event): Promise<TeamService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new TeamService(supabase)
  }

  // Get all teams for the authenticated user
  async getTeams(userId: string) {
    const { data: teamIds, error } = await this.supabase
      .from('team_users')
      .select('*')
      .eq('user_id', userId)

    if (error) throw this.handlePostgrestError(error, 'Error fetching teams')

    if (!teamIds) throw createError({
      statusCode: 404,
      statusMessage: 'No teams found'
    })

    const { data: teams, error: teamError, count } = await this.supabase
      .from('team')
      .select(this.teamSelector, { count: 'estimated' })
      .in('id', teamIds.map(t => t.team_id))

    if (teamError) throw this.handlePostgrestError(teamError, 'Error fetching teams')

    return { data: teams, count }
  }

  // Get a specific team by ID, ensuring the user is a member
  async getTeamById(teamId: number, userId: string) {
  // Step 1: Validate that the user is a member of the team
    const { data: membership, error: membershipError } = await this.supabase
      .from('team_users')
      .select('team_id')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    if (membershipError) throw this.handlePostgrestError(membershipError, 'Error fetching team membership')

    if (!membership) throw createError({
      statusCode: 404,
      statusMessage: 'Team not found'
    })

    // Step 2: Fetch team details
    const { data: team, error: teamError } = await this.supabase
      .from('team')
      .select(this.teamSelector)
      .eq('id', teamId)
      .single()

    if (teamError) throw this.handlePostgrestError(teamError, 'Error fetching team')
    if (!team) throw createError({
      statusCode: 404,
      statusMessage: 'Team not found'
    })

    return team
  }

  // Create a new team
  async createTeam(teamData: CreateTeam, ownerId: string) {
    const { data, error } = await this.supabase
      .from('team')
      .insert({
        ...teamData,
        owner_id: ownerId
      })
      .select(this.teamSelector)
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error creating team')

    // Add the owner as the first member of the team
    await this.addUserToTeam(data.id, ownerId)

    return data
  }

  // Add a user to a team
  async addUserToTeam(teamId: number, userId: string) {
    const { error } = await this.supabase
      .from('team_users')
      .insert({
        team_id: teamId,
        user_id: userId
      })

    if (error) throw this.handlePostgrestError(error, 'Error adding user to team')

    return { success: true }
  }

  // Remove a user from a team
  async removeUserFromTeam(teamId: number, userId: string) {
    const { error } = await this.supabase
      .from('team_users')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', userId)

    if (error) throw this.handlePostgrestError(error, 'Error removing user from team')

    return { success: true }
  }

  // Delete a team (only if the authenticated user is the owner)
  async deleteTeam(teamId: number, ownerId: string) {
    const { error } = await this.supabase
      .from('team')
      .delete()
      .eq('id', teamId)
      .eq('owner_id', ownerId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting team')

    return { success: true }
  }
}

export const createTeamService = TeamService.create
