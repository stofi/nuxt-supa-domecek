import type { Database } from './supabase'

export type Timeslot = Database['public']['Tables']['timeslot']['Row']
export type Employee = Database['public']['Tables']['employee']['Row']
export type Role = Database['public']['Tables']['role']['Row']

export type TimeslotWithData = Timeslot & {
  employee?: Employee | null
  role?: Role | null
}
