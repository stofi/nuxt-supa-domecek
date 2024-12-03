export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      employee: {
        Row: {
          contract: number
          created_at: string
          id: number
          name: string
          team_id: number
          updated_at: string
        }
        Insert: {
          contract?: number
          created_at?: string
          id?: number
          name: string
          team_id: number
          updated_at?: string
        }
        Update: {
          contract?: number
          created_at?: string
          id?: number
          name?: string
          team_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_roles: {
        Row: {
          employee_id: number
          role_id: number
        }
        Insert: {
          employee_id: number
          role_id: number
        }
        Update: {
          employee_id?: number
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "employee_roles_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      role: {
        Row: {
          color: string | null
          created_at: string
          id: number
          name: string
          priority: boolean
          shortname: string | null
          team_id: number
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          name: string
          priority?: boolean
          shortname?: string | null
          team_id: number
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          name?: string
          priority?: boolean
          shortname?: string | null
          team_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      shift: {
        Row: {
          created_at: string
          date: string
          id: number
          team_id: number
          updated_at: string
          valid: boolean
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          team_id: number
          updated_at?: string
          valid?: boolean
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          team_id?: number
          updated_at?: string
          valid?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "shift_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          created_at: string
          id: number
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_owner_id_fkey1"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_users: {
        Row: {
          team_id: number
          user_id: string
        }
        Insert: {
          team_id: number
          user_id: string
        }
        Update: {
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_users_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      timeslot: {
        Row: {
          break: boolean
          created_at: string
          employee_id: number | null
          end_time: string
          id: number
          role_id: number | null
          shift_id: number
          start_time: string
          team_id: number
          updated_at: string
        }
        Insert: {
          break?: boolean
          created_at?: string
          employee_id?: number | null
          end_time: string
          id?: number
          role_id?: number | null
          shift_id: number
          start_time: string
          team_id: number
          updated_at?: string
        }
        Update: {
          break?: boolean
          created_at?: string
          employee_id?: number | null
          end_time?: string
          id?: number
          role_id?: number | null
          shift_id?: number
          start_time?: string
          team_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeslot_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeslot_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeslot_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shift"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeslot_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      vacation: {
        Row: {
          created_at: string
          date: string
          employee_id: number
          id: number
          team_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          employee_id: number
          id?: number
          team_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          employee_id?: number
          id?: number
          team_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vacation_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vacation_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

