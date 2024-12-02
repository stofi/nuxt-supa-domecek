import type { H3Event } from 'h3'

import { TeamService } from '../services/team'
import { serverSupabaseUser } from '#supabase/server'

export default async function getUserTeam(event: H3Event): Promise<number> {
  // Fetch the authenticated user
  const user = await serverSupabaseUser(event)
  if (!user) {
    console.error('Unauthorized')
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // Initialize TeamService
  const teamService = await TeamService.create(event)

  // Check for teamId in cookies
  const teamIdCookie = getCookie(event, 'teamId')
  const teamId = teamIdCookie ? parseInt(teamIdCookie, 10) : null

  if (teamId) {
    // Validate the teamId from the cookie
    if (isNaN(teamId)) {
      deleteCookie(event, 'teamId')
      console.error('Invalid team ID in cookie:', teamIdCookie)
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid team ID in cookie'
      })
    }

    const team = await teamService.getTeamById(teamId, user.id)
    if (!team) {
      // Clear invalid cookie and throw error
      deleteCookie(event, 'teamId')
      console.error('Not a member of this team:', teamId)
      throw createError({
        statusCode: 403,
        statusMessage: 'Not a member of this team'
      })
    }
    return teamId
  }

  // Fetch all teams for the user
  const { data: teams } = await teamService.getTeams(user.id)
  if (teams.length === 0) {
    console.error('Not a member of any team')
    throw createError({
      statusCode: 403,
      statusMessage: 'Not a member of any team'
    })
  }

  // Use the first team as the default team
  const defaultTeamId = teams[0].id
  setCookie(event, 'teamId', defaultTeamId.toString())

  return defaultTeamId
}
