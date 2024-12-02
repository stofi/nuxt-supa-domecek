import type { H3Event } from 'h3'
import { BaseService } from './base'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import type { CreateEmployee, EmployeeQuery, UpdateEmployee } from '~~/types/schemas/employee'

export class EmployeeService extends BaseService {
  static async create(event: H3Event): Promise<EmployeeService> {
    const supabase = await serverSupabaseClient<Database>(event)
    return new EmployeeService(supabase)
  }

  // Get employees with query validation
  async getEmployees(query: EmployeeQuery, teamId: number) {
    let employeesQuery = this.supabase.from('employee').select(
      // `*, role(*), timeslot(*, role(*))`,
      `*, role(*)`,
      { count: 'estimated' }
    ).eq('team_id', teamId)

    if (query.q) {
      employeesQuery = employeesQuery.ilike('name', `%${query.q}%`)
    }

    employeesQuery = employeesQuery.order(query.sort ?? 'created_at', {
      ascending: query.order === 'asc'
    })

    const start = query.skip ?? 0
    const end = start + (query.limit ?? 10) - 1
    employeesQuery = employeesQuery.range(start, end)

    const { data, error, count } = await employeesQuery

    if (error)
      throw this.handlePostgrestError(error, 'Error fetching employees')

    return { data, count }
  }

  async getEmployeeById(id: number, teamId: number) {
    const { data, error } = await this.supabase
      .from('employee')
      .select('*, role(*), timeslot(*, role(*))')
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    if (error)
      throw this.handlePostgrestError(error, 'Employee not found', 404)

    return data
  }

  async createEmployee(
    employeeData: CreateEmployee,
    teamId: number
  ) {
    const { data, error } = await this.supabase
      .from('employee')
      .insert({
        ...employeeData,
        team_id: teamId
      })
      .select('*')
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error creating employee')

    return data
  }

  async updateEmployee(
    id: number,
    updateData: UpdateEmployee,
    teamId: number
  ) {
    const { data, error } = await this.supabase
      .from('employee')
      .update(updateData)
      .eq('id', id)
      .eq('team_id', teamId)
      .select('*')
      .single()

    if (error) throw this.handlePostgrestError(error, 'Error updating employee')

    return data
  }

  async deleteEmployee(id: number, teamId: number) {
    const { error } = await this.supabase
      .from('employee')
      .delete()
      .eq('id', id)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting employee')

    return { success: true }
  }

  async deleteEmployees(ids: number[], teamId: number) {
    const { error } = await this.supabase
      .from('employee')
      .delete()
      .in('id', ids)
      .eq('team_id', teamId)

    if (error) throw this.handlePostgrestError(error, 'Error deleting employees')

    return { success: true }
  }

  async assignRoleToEmployee(employeeId: number, roleId: number) {
    const { error } = await this.supabase
      .from('employee_roles')
      .insert({ employee_id: employeeId, role_id: roleId })

    if (error) throw this.handlePostgrestError(error, 'Error assigning role to employee')

    return { success: true }
  }

  async unassignRoleFromEmployee(employeeId: number, roleId: number) {
    const { error } = await this.supabase
      .from('employee_roles')
      .delete()
      .eq('employee_id', employeeId)
      .eq('role_id', roleId)

    if (error) throw this.handlePostgrestError(error, 'Error unassigning role from employee')

    return { success: true }
  }

  async getRolesForEmployee(employeeId: number) {
    const { data, error } = await this.supabase
      .from('employee_roles')
      .select('role_id')
      .eq('employee_id', employeeId)

    if (error) throw this.handlePostgrestError(error, 'Error fetching roles for employee')

    return data
  }
}

export const createEmployeeService = EmployeeService.create
