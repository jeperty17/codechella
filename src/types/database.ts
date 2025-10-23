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
      arenas: {
        Row: {
          id: string
          name: string
          league: string
          description: string
          punishment: string
          creator_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          league: string
          description: string
          punishment: string
          creator_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          league?: string
          description?: string
          punishment?: string
          creator_id?: string
          created_at?: string
        }
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
  }
}
