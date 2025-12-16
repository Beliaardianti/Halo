import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY!
)
import type { Database } from '../../app/types/database.types'

interface Opportunity {
  id?: string // uuid, akan digenerate otomatis
  title: string
  company: string
  job_type: string
  description?: string
  location?: string
  salary_range?: string
  stipend?: string
  experience_level?: string
  required_skills?: any // jsonb
  tags?: any // jsonb
  age_requirement?: string
  requirements?: string
  benefits?: string
  application_deadline?: string // date
  is_active?: boolean
  posted_by?: string // uuid
  views_count?: number
  applications_count?: number
  created_at?: string // timestamp
  updated_at?: string // timestamp
}

export default defineEventHandler(async (event) => {
  try {
    const opportunities: Opportunity[] = [
      {
        title: 'Frontend Developer',
        company: 'Tech Corp',
        job_type: 'Job',
        location: 'Jakarta',
        description: 'Looking for an experienced frontend developer',
        experience_level: '2-3 years',
        salary_range: 'Rp 12-15M',
        is_active: true,
        required_skills: JSON.stringify(['React', 'TypeScript', 'CSS']),
        tags: JSON.stringify(['Frontend', 'Web Development']),
        age_requirement: '20-35',
        requirements: 'Bachelor degree in Computer Science or related field\nMinimum 2 years experience in frontend development',
        benefits: 'Medical insurance\nAnnual bonus\nFlexible working hours',
        application_deadline: '2026-01-01'
      },
      {
        title: 'Software Engineering Intern',
        company: 'StartUp Indonesia',
        job_type: 'Internship',
        location: 'Remote',
        description: '3-month internship program for students',
        experience_level: 'Entry Level',
        stipend: 'Rp 3M',
        is_active: true,
        required_skills: JSON.stringify(['Python', 'Git']),
        tags: JSON.stringify(['Backend', 'Python']),
        age_requirement: '18-25',
        requirements: 'Currently enrolled in Computer Science or related field\nBasic programming knowledge',
        benefits: 'Certificate of completion\nPotential full-time offer',
        application_deadline: '2025-12-31'
      },
      {
        title: 'Tech Scholarship Program',
        company: 'Digital Academy',
        job_type: 'Scholarship',
        location: 'Bandung',
        description: 'Full scholarship for coding bootcamp',
        experience_level: 'Beginner',
        is_active: true,
        required_skills: JSON.stringify(['Basic Programming']),
        tags: JSON.stringify(['Education', 'Programming']),
        age_requirement: '17-30',
        requirements: 'High school diploma\nStrong interest in programming',
        benefits: 'Full tuition coverage\nLaptop provision\nJob placement assistance',
        application_deadline: '2025-12-15'
      }
    ]

    const { data, error } = await supabaseAdmin
      .from('opportunities')
      .upsert(opportunities)
      .select('*')

    if (error) throw error

    return {
      success: true,
      message: 'Sample opportunities added successfully',
      data
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
})
