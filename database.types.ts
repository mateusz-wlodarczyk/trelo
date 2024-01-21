export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      icons: {
        Row: {
          icon: string
          id: number
        }
        Insert: {
          icon: string
          id?: number
        }
        Update: {
          icon?: string
          id?: number
        }
        Relationships: []
      }
      stanPolaczenia: {
        Row: {
          icon: string
          id: number
          name: string | null
        }
        Insert: {
          icon: string
          id?: number
          name?: string | null
        }
        Update: {
          icon?: string
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stanPolaczenia_icon_fkey"
            columns: ["icon"]
            isOneToOne: false
            referencedRelation: "icons"
            referencedColumns: ["icon"]
          }
        ]
      }
      typUrzadzenia: {
        Row: {
          icon: string
          id: number
          name: string | null
        }
        Insert: {
          icon: string
          id?: number
          name?: string | null
        }
        Update: {
          icon?: string
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "typUrzadzenia_icon_fkey"
            columns: ["icon"]
            isOneToOne: true
            referencedRelation: "icons"
            referencedColumns: ["icon"]
          }
        ]
      }
      userTable: {
        Row: {
          id: number
          name: string
          stanPolaczenia: string | null
          typ: string | null
          user: string
        }
        Insert: {
          id?: number
          name: string
          stanPolaczenia?: string | null
          typ?: string | null
          user: string
        }
        Update: {
          id?: number
          name?: string
          stanPolaczenia?: string | null
          typ?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "userTable_stanPolaczenia_fkey"
            columns: ["stanPolaczenia"]
            isOneToOne: false
            referencedRelation: "stanPolaczenia"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "userTable_typ_fkey"
            columns: ["typ"]
            isOneToOne: false
            referencedRelation: "typUrzadzenia"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "userTable_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
