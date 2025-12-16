// types/api.ts
export interface Opportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  experience_level: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  salary_range?: string;
  requirements: any[];
  benefits: any[];
  skills: any[];
  application_deadline?: string;
  posted_by?: string;
  is_active: boolean;
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category?: string;
  target_date?: string;
  completed: boolean;
  shared_with_community: boolean;
  likes: number;
  comments: number;
  created_at: string;
  updated_at: string;
}

export interface Mentor {
  id: number;
  created_at: string;
  name?: string;
  expertise?: string;
  bio?: string;
}

export interface Application {
  id: string;
  user_id?: string;
  opportunity_id?: string;
  opportunity_title?: string;
  opportunity_type?: string;
  company?: string;
  status: string;
  applied_at: string;
}

export interface UserPreferences {
  id: number;
  created_at: string;
  location?: string;
  industry?: string;
  experience?: string;
  age?: string;
  skills?: string;
  certifications?: string;
  updated_at?: string;
}
