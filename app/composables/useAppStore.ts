// composables/useAppStore.ts
import type { Ref, ComputedRef } from 'vue'
import { ref, computed } from 'vue'

// ============================================
// INTERFACES / TYPES
// ============================================
interface Opportunity {
  id: string | number
  type: string
  title: string
  company: string
  location: string
  salary?: string
  stipend?: string
  matchScore: number
  tags: string[]
  ageRequirement?: string
  requiredSkills: string[]
  description: string
  isFavorite?: boolean
}

interface Goal {
  id: string | number
  title: string
  description?: string
  category?: string
  targetDate?: string
  sharedWithCommunity?: boolean
  completed: boolean
  createdAt: string
}

interface AppliedOpportunity {
  id: string | number
  title: string
  company: string
  appliedAt: string
}

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar_url?: string
}

interface Preferences {
  location: string
  industry: string
  experience: string
  age: number | null
  skills: string[]
  certifications: string[]
}

interface Stats {
  applications: number
  saved: number
  goalsActive: number
  goalsCompleted: number
}

// ============================================
// GLOBAL STATE (shared across pages)
// ============================================
const opportunities: Ref<Opportunity[]> = ref([])
const goals: Ref<Goal[]> = ref([])
const appliedOpportunities: Ref<AppliedOpportunity[]> = ref([])
const user: Ref<User | null> = ref(null)
const preferences: Ref<Preferences> = ref({
  location: '',
  industry: '',
  experience: '',
  age: null,
  skills: [],
  certifications: []
})

// ============================================
// COMPOSABLE - useAppStore
// ============================================
export const useAppStore = () => {
  // ============================================
  // COMPUTED - STATS yang auto update
  // ============================================
  const stats: ComputedRef<Stats> = computed(() => ({
    applications: appliedOpportunities.value.length,
    saved: opportunities.value.filter(o => o.isFavorite).length,
    goalsActive: goals.value.filter(g => !g.completed).length,
    goalsCompleted: goals.value.filter(g => g.completed).length
  }))

  const matchedOpportunitiesCount: ComputedRef<number> = computed(
    () => opportunities.value.length
  )

  const activeGoalsCount: ComputedRef<number> = computed(() =>
    goals.value.filter(g => !g.completed).length
  )

  const profileCompleteness: ComputedRef<number> = computed(() => {
    let score = 0
    if (preferences.value.location) score += 20
    if (preferences.value.industry) score += 20
    if (preferences.value.experience) score += 20
    if (preferences.value.age) score += 20
    if (preferences.value.skills.length > 0) score += 20
    return score
  })

  // ============================================
  // ACTIONS - OPPORTUNITIES
  // ============================================
  const setOpportunities = (data: Opportunity[]): void => {
    opportunities.value = data
  }

  const applyToOpportunity = (opportunity: Opportunity): boolean => {
    if (isApplied(opportunity.id)) {
      console.warn('Already applied')
      return false
    }

    appliedOpportunities.value.push({
      id: opportunity.id,
      title: opportunity.title,
      company: opportunity.company,
      appliedAt: new Date().toISOString()
    })

    // Save to localStorage
    localStorage.setItem(
      'applied-opportunities',
      JSON.stringify(appliedOpportunities.value)
    )

    console.log('✅ Applied! Total applications:', appliedOpportunities.value.length)
    return true
  }

  const isApplied = (opportunityId: string | number): boolean => {
    return appliedOpportunities.value.some(app => app.id === opportunityId)
  }

  const toggleFavorite = (opportunityId: string | number): void => {
    const opp = opportunities.value.find(o => o.id === opportunityId)
    if (opp) {
      opp.isFavorite = !opp.isFavorite
    }
  }

  // ============================================
  // ACTIONS - GOALS
  // ============================================
  const setGoals = (data: Goal[]): void => {
    goals.value = data
  }

  const addGoal = (newGoal: Partial<Goal>): Goal => {
    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title || '',
      description: newGoal.description,
      category: newGoal.category,
      targetDate: newGoal.targetDate,
      sharedWithCommunity: newGoal.sharedWithCommunity,
      completed: false,
      createdAt: new Date().toISOString()
    }
    goals.value.push(goal)
    return goal
  }

  const deleteGoal = (goalId: string | number): void => {
    goals.value = goals.value.filter(g => g.id !== goalId)
  }

  const toggleGoal = (goalId: string | number): void => {
    const goal = goals.value.find(g => g.id === goalId)
    if (goal) {
      goal.completed = !goal.completed
    }
  }

  // ============================================
  // ACTIONS - USER & PREFERENCES
  // ============================================
  const setUser = (userData: User): void => {
    user.value = userData
  }

  const setPreferences = (prefs: Partial<Preferences>): void => {
    preferences.value = {
      ...preferences.value,
      ...prefs
    }
    localStorage.setItem('user-preferences', JSON.stringify(preferences.value))
  }

  // ============================================
  // ACTIONS - LOAD/SYNC
  // ============================================
  const loadFromLocalStorage = (): void => {
    const saved = localStorage.getItem('applied-opportunities')
    if (saved) {
      try {
        appliedOpportunities.value = JSON.parse(saved)
      } catch (error) {
        console.error('Error loading applied opportunities:', error)
      }
    }

    const savedPrefs = localStorage.getItem('user-preferences')
    if (savedPrefs) {
      try {
        preferences.value = JSON.parse(savedPrefs)
      } catch (error) {
        console.error('Error loading preferences:', error)
      }
    }

    const savedUser = localStorage.getItem('auth-user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Error loading user:', error)
      }
    }
  }

  const reset = (): void => {
    opportunities.value = []
    goals.value = []
    appliedOpportunities.value = []
    user.value = null
  }

  // ============================================
  // RETURN
  // ============================================
  return {
    // State
    opportunities,
    goals,
    appliedOpportunities,
    user,
    preferences,

    // Computed
    stats,
    matchedOpportunitiesCount,
    activeGoalsCount,
    profileCompleteness,

    // Actions
    setOpportunities,
    applyToOpportunity,
    isApplied,
    toggleFavorite,
    setGoals,
    addGoal,
    deleteGoal,
    toggleGoal,
    setUser,
    setPreferences,
    loadFromLocalStorage,
    reset
  }
}
