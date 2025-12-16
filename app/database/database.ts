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
      user_preferences: {
        Row: {
          id: string
          user_id: string
          location: string | null
          industry: string | null
          experience: string | null
          age: number | null
          height: number | null
          weight: number | null
          skills: string[] | null
          certifications: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          location?: string | null
          industry?: string | null
          experience?: string | null
          age?: number | null
          height?: number | null
          weight?: number | null
          skills?: string[] | null
          certifications?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          location?: string | null
          industry?: string | null
          experience?: string | null
          age?: number | null
          height?: number | null
          weight?: number | null
          skills?: string[] | null
          certifications?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string | null
          target_date: string | null
          completed: boolean
          shared_with_community: boolean
          likes: number
          comments: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category?: string | null
          target_date?: string | null
          completed?: boolean
          shared_with_community?: boolean
          likes?: number
          comments?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string | null
          target_date?: string | null
          completed?: boolean
          shared_with_community?: boolean
          likes?: number
          comments?: number
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string | null
          opportunity_title: string | null
          opportunity_type: string | null
          company: string | null
          status: string
          applied_at: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id?: string | null
          opportunity_title?: string | null
          opportunity_type?: string | null
          company?: string | null
          status?: string
          applied_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string | null
          opportunity_title?: string | null
          opportunity_type?: string | null
          company?: string | null
          status?: string
          applied_at?: string
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

// Helper types
export type UserPreferences = Database['public']['Tables']['user_preferences']['Row']
export type UserPreferencesInsert = Database['public']['Tables']['user_preferences']['Insert']
export type UserPreferencesUpdate = Database['public']['Tables']['user_preferences']['Update']

export type Goal = Database['public']['Tables']['goals']['Row']
export type GoalInsert = Database['public']['Tables']['goals']['Insert']
export type GoalUpdate = Database['public']['Tables']['goals']['Update']

export type Application = Database['public']['Tables']['applications']['Row']
export type ApplicationInsert = Database['public']['Tables']['applications']['Insert']
export type ApplicationUpdate = Database['public']['Tables']['applications']['Update']

// Additional types for UI
export interface Notification {
  id: number
  title: string
  message: string
  time: string
}

export interface Opportunity {
  id: number
  type: 'Job' | 'Internship' | 'Scholarship'
  title: string
  company: string
  location: string
  salary?: string
  stipend?: string
  matchScore: number
  tags: string[]
  ageRequirement: string
  requiredSkills: string[]
}

export interface Mentor {
  id: number
  name: string
  initial: string
  title: string
  company: string
  industry: string
  experience: number
  rating: number
  reviews: number
  expertise: string[]
  sessionsCompleted: number
  pricePerSession: string
  nextAvailable: string
  bio?: string
  availableSlots?: string[]
}

export interface TempPreferences {
  location: string
  industry: string
  experience: string
  age: number | null
  height: number | null
  weight: number | null
  skillsInput: string
  certificationsInput: string
}

export interface NewGoal {
  title: string
  description: string
  category: string
  target_date: string
  shared_with_community: boolean
}
