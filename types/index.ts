import type { Database } from './supabase'

// type Timeslot = {
//   break: boolean;
//   created_at: string;
//   date: string;
//   employee_id: number | null;
//   end_time: string;
//   id: number;
//   role_id: number | null;
//   start_time: string;
//   team_id: number;
//   updated_at: string;
// }
// type Employee = {
//   archived: boolean;
//   contract: number;
//   created_at: string;
//   id: number;
//   name: string;
//   team_id: number;
//   updated_at: string;
// }
// type Role = {
//     archived: boolean;
//     color: string | null;
//     created_at: string;
//     id: number;
//     name: string;
//     priority: boolean;
//     shortname: string | null;
//     team_id: number;
//     updated_at: string;
// }

export type Timeslot = Database['public']['Tables']['timeslot']['Row']
export type Employee = Database['public']['Tables']['employee']['Row']
export type Role = Database['public']['Tables']['role']['Row']

export type TimeslotWithData = Timeslot & {
  employee?: Employee | null
  role?: Role | null
}
