// types/database.types.ts
// ✅ This file contains the actual database schema types
// Used for type safety with Supabase queries

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
          cover_letter?: string
          resume_url?: string
          portfolio_url?: string
          notes?: string
          applied_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          opportunity_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
          cover_letter?: string
          resume_url?: string
          portfolio_url?: string
          notes?: string
        }
        Update: Partial<Database['public']['Tables']['applications']['Insert']>
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description?: string
          category: 'career' | 'skill' | 'education' | 'personal'
          target_date?: string
          priority: 'low' | 'medium' | 'high'
          completed: boolean
          completed_at?: string
          progress: number
          shared_with_community: boolean
          likes: number
          comments: number
          created_at: string
          updated_at: string
          shared_with_others: boolean
        }
        Insert: {
          user_id: string
          title: string
          description?: string
          category?: 'career' | 'skill' | 'education' | 'personal'
          target_date?: string
          priority?: 'low' | 'medium' | 'high'
          completed?: boolean
          progress?: number
          shared_with_community?: boolean
          shared_with_others?: boolean
        }
        Update: Partial<Database['public']['Tables']['goals']['Insert']>
      }
      mentors: {
        Row: {
          id: string
          user_id: string
          name: string
          title?: string
          company?: string
          field?: string
          experience_years?: string
          bio?: string
          avatar_url?: string
          linkedin_url?: string
          twitter_url?: string
          website_url?: string
          availability: boolean
          is_approved: boolean
          rating: number
          total_mentees: number
          total_sessions: number
          hourly_rate?: number
          languages: string[]
          created_at: string
          updated_at: string
          linkedin?: string
          portfolio?: string
          expertise: string[]
        }
        Insert: {
          name: string
          title?: string
          company?: string
          field?: string
          experience_years?: string
          bio?: string
          linkedin?: string
          portfolio?: string
          expertise?: string[]
          hourly_rate?: number
          languages?: string[]
          availability?: boolean
        }
        Update: Partial<Database['public']['Tables']['mentors']['Insert']>
      }
      opportunities: {
        Row: {
          id: string
          title: string
          company: string
          job_type: string
          description?: string
          location?: string
          salary_range?: string
          stipend?: string
          experience_level?: string
          required_skills: string[]
          tags: string[]
          age_requirement?: string
          requirements?: string
          benefits?: string
          application_deadline?: string
          is_active: boolean
          posted_by?: string
          views_count: number
          applications_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          company: string
          job_type: string
          description?: string
          location?: string
          salary_range?: string
          stipend?: string
          experience_level?: string
          required_skills?: string[]
          tags?: string[]
          age_requirement?: string
          requirements?: string
          benefits?: string
          application_deadline?: string
          is_active?: boolean
          posted_by?: string
        }
        Update: Partial<Database['public']['Tables']['opportunities']['Insert']>
      }
      saved_opportunities: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          notes?: string
          created_at: string
        }
        Insert: {
          user_id: string
          opportunity_id: string
          notes?: string
        }
        Update: Partial<Database['public']['Tables']['saved_opportunities']['Insert']>
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          location?: string
          industry?: string
          experience_level?: string
          age?: number
          skills: string[]
          certifications: string[]
          theme: 'light' | 'dark'
          notifications: boolean
          email_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          location?: string
          industry?: string
          experience_level?: string
          age?: number
          skills?: string[]
          certifications?: string[]
          theme?: 'light' | 'dark'
          notifications?: boolean
          email_notifications?: boolean
        }
        Update: Partial<Database['public']['Tables']['user_preferences']['Insert']>
      }
      user_profiles: {
        Row: {
          id: string
          first_name?: string
          last_name?: string
          phone?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          avatar_url?: string
          bio?: string
          account_type: 'user' | 'mentor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string
          last_name?: string
          phone?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          avatar_url?: string
          bio?: string
          account_type?: 'user' | 'mentor' | 'admin'
        }
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

// ✅ Type aliases for easier imports
export type Application = Database['public']['Tables']['applications']['Row']
export type Goal = Database['public']['Tables']['goals']['Row']
export type Mentor = Database['public']['Tables']['mentors']['Row']
export type Opportunity = Database['public']['Tables']['opportunities']['Row']
export type SavedOpportunity = Database['public']['Tables']['saved_opportunities']['Row']
export type UserPreferences = Database['public']['Tables']['user_preferences']['Row']
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
