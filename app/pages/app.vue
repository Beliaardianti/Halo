

<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../composables/useAppStore'
import { useSupabaseData } from '../composables/useSupabaseData'
import { useSupabase } from '../composables/useSupabase'

// ✅ Import Supabase
const { supabase } = useSupabase()
const appStore = useAppStore()
const { user } = useSupabaseData()

const currentView: Ref<string> = ref('dashboard')
const userLocalData: Ref<any> = ref(null)
const userProfile: Ref<any> = ref(null)
const showGoalsModal: Ref<boolean> = ref(false)
const loadingProfile: Ref<boolean> = ref(true)

// ============================================
// MODAL HANDLERS
// ============================================

const openGoalsModal = (): void => {
    console.log('🎯 Opening goals modal')
    showGoalsModal.value = true
}

const closeGoalsModal = (): void => {
    console.log('❌ Closing goals modal')
    showGoalsModal.value = false
}

// ============================================
// NAVIGATION FUNCTIONS - SEKARANG MENGGUNAKAN navigateTo
// ============================================

const goToApplications = (): void => {
    console.log('📱 Navigating to applications...')
    navigateTo('/opportunity?tab=applications')
}

const goToSavedJobs = (): void => {
    console.log('💾 Navigating to saved jobs...')
    navigateTo('/opportunity?tab=saved-jobs')
}

// Tambahan navigasi untuk cards
const goToMultiAI = (): void => {
    console.log('🤖 Navigating to Multi AI...')
    navigateTo('/multi-ai')
}

const goToOpportunity = (): void => {
    console.log('💼 Navigating to Opportunity...')
    navigateTo('/opportunity')
}

const goToProfile = (): void => {
    console.log('👤 Navigating to Profile...')
    navigateTo('/profile')
}

const goToInventory = (): void => {
    console.log('📁 Navigating to Inventory...')
    navigateTo('/inventory')
}

const goToDashboard = (): void => {
    console.log('🏠 Navigating to Dashboard...')
    navigateTo('/dashboard')
}

// ============================================
// COMPUTED - dari SUPABASE
// ============================================

const appliedOpportunities = computed(() => {
    const apps = appStore.appliedOpportunities.value
    console.log('📊 Applied opportunities:', apps)
    return apps
})

const applicationsCount = computed(() => {
    const count = appStore.appliedOpportunities.value.length
    console.log('📱 Applications count:', count)
    return count
})

const savedJobsList = computed(() => {
    const all = appStore.opportunities.value || []
    const saved = all.filter(o => o && o.isFavorite === true)
    console.log('💾 Saved jobs count:', saved.length)
    return saved
})

const savedJobsCount = computed(() => {
    return savedJobsList.value.length
})

const activeGoalsList = computed(() => {
    const goals = appStore.goals.value || []
    const active = goals.filter(g => g && !g.completed)
    console.log('🎯 Active goals count:', active.length)
    return active
})

const activeGoalsCount = computed(() => {
    return activeGoalsList.value.length
})

const completedGoalsList = computed(() => {
    const goals = appStore.goals.value || []
    return goals.filter(g => g && g.completed)
})

const completedGoalsCount = computed(() => {
    return completedGoalsList.value.length
})

// ============================================
// USER PROFILE COMPUTED - dari Supabase
// ============================================

const userInitial: ComputedRef<string> = computed(() => {
    // Try from database profile first
    if (userProfile.value) {
        const firstName = userProfile.value.first_name || ''
        const lastName = userProfile.value.last_name || ''

        if (firstName && lastName) {
            return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
        }
        if (firstName) {
            return firstName.charAt(0).toUpperCase()
        }
    }

    // Try from Supabase user metadata
    if (user.value?.user_metadata) {
        const firstName = user.value.user_metadata.first_name || user.value.user_metadata.firstName || ''
        const lastName = user.value.user_metadata.last_name || user.value.user_metadata.lastName || ''

        if (firstName && lastName) {
            return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
        }
        if (firstName) {
            return firstName.charAt(0).toUpperCase()
        }
    }

    // Try email
    if (user.value?.email) {
        return user.value.email.charAt(0).toUpperCase()
    }

    return 'U'
})

const fullName = computed(() => {
    // Try from database profile first
    if (userProfile.value) {
        const firstName = userProfile.value.first_name || ''
        const lastName = userProfile.value.last_name || ''

        if (firstName || lastName) {
            const parts = [firstName, lastName].filter(Boolean)
            if (parts.length > 0) {
                return parts.join(' ').trim()
            }
        }
    }

    // Try from Supabase user metadata
    if (user.value?.user_metadata) {
        const firstName = user.value.user_metadata.first_name || user.value.user_metadata.firstName || ''
        const lastName = user.value.user_metadata.last_name || user.value.user_metadata.lastName || ''

        if (firstName || lastName) {
            const parts = [firstName, lastName].filter(Boolean)
            if (parts.length > 0) {
                return parts.join(' ').trim()
            }
        }
    }

    // Try email
    if (user.value?.email) {
        return user.value.email.split('@')[0]
    }

    return 'User'
})

const userProfileDisplay = computed(() => ({
    title: userProfile.value?.title || '',
    location: userProfile.value?.city || appStore.preferences.value?.location || '',
    phone: userProfile.value?.phone || user.value?.user_metadata?.phone || '',
    dateOfBirth: userProfile.value?.date_of_birth || '',
    gender: userProfile.value?.gender || '',
    bio: userProfile.value?.bio || '',
    avatar_url: userProfile.value?.avatar_url || '',
    linkedin: userProfile.value?.linkedin || '',
    portfolio: userProfile.value?.portfolio || '',
    skillsCount: appStore.preferences.value?.skills?.length || 0
}))

const currentPageTitle: ComputedRef<string> = computed(() => {
    const titles: Record<string, string> = {
        'dashboard': 'Dashboard',
        'multi-ai': 'AI Assistants',
        'opportunity': 'Opportunities',
        'profile': 'My Profile',
        'inventory': 'Documents'
    }
    return titles[currentView.value] || 'App'
})

const currentPageSubtitle: ComputedRef<string> = computed(() => {
    const subtitles: Record<string, string> = {
        'dashboard': 'Manage your career journey',
        'multi-ai': 'Connect with AI models',
        'opportunity': 'Find your dream job',
        'profile': 'Manage your information',
        'inventory': 'Your documents'
    }
    return subtitles[currentView.value] || ''
})

// ============================================
// FUNCTIONS
// ============================================

const loadUserProfile = async (): Promise<void> => {
    try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user) {
            console.error('❌ No session found')
            return
        }

        // Load profile dari database
        const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

        if (error && error.code !== 'PGRST116') {
            console.error('Error loading profile:', error)
            return
        }

        if (profile) {
            userProfile.value = profile
            console.log('✅ Profile loaded from Supabase:', profile)
        } else {
            console.log('⚠️ No profile found in database')
            userProfile.value = {}
        }
    } catch (err) {
        console.error('Error in loadUserProfile:', err)
    } finally {
        loadingProfile.value = false
    }
}

const loadUserData = (): void => {
    console.log('\n🔍 ===== LOADING USER DATA =====')

    if (user.value) {
        console.log('✅ User from Supabase:', user.value)

        userLocalData.value = {
            id: user.value.id,
            email: user.value.email,
            firstName: user.value.user_metadata?.first_name || user.value.user_metadata?.firstName || '',
            middleName: user.value.user_metadata?.middle_name || user.value.user_metadata?.middleName || '',
            lastName: user.value.user_metadata?.last_name || user.value.user_metadata?.lastName || '',
            phone: user.value.user_metadata?.phone || ''
        }

        appStore.setUser(userLocalData.value)

        console.log('✅ User data loaded:')
        console.log('   - Email:', userLocalData.value.email)
        console.log('   - First Name:', userLocalData.value.firstName)
        console.log('   - Last Name:', userLocalData.value.lastName)
    }

    // Load opportunities from localStorage (for now)
    const oppsStr = localStorage.getItem('opportunities')
    if (oppsStr) {
        try {
            const opps = JSON.parse(oppsStr)
            appStore.setOpportunities(opps)
            console.log('✅ Opportunities loaded:', opps.length)
        } catch (e) {
            console.error('Error loading opportunities:', e)
        }
    }

    // Load goals from localStorage
    const goalsStr = localStorage.getItem('user-goals')
    if (goalsStr) {
        try {
            const goalsData = JSON.parse(goalsStr)
            appStore.setGoals(goalsData)
            console.log('✅ Goals loaded:', goalsData.length)
        } catch (e) {
            console.error('Error loading goals:', e)
        }
    }

    console.log('===== END LOADING DATA =====\n')
}

const editSection = (section: string): void => {
    if (section === 'personal') {
        navigateTo('/settings')
    } else {
        alert(`Editing ${section} section - navigate to edit page`)
    }
}

const handleLogout = (): void => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-id')
        localStorage.removeItem('user-goals')

        appStore.reset()
        navigateTo('/login')
    }
}

// ============================================
// LIFECYCLE
// ============================================

onMounted(async () => {
    const token = localStorage.getItem('auth-token')
    if (!token) {
        window.location.href = '/login'
        return
    }

    console.log('🚀 App.vue mounted!')

    // Load user data from Supabase
    await loadUserProfile()
    loadUserData()
    appStore.loadFromLocalStorage()

    // Debug info
    setTimeout(() => {
        console.log('\n════════════════════════════════════')
        console.log('📊 FINAL APP STATE:')
        console.log('════════════════════════════════════')
        console.log('👤 User:', user.value?.email)
        console.log('👤 Profile from DB:', userProfile.value)
        console.log('👤 Full Name:', fullName.value)
        console.log('👤 Phone:', userProfileDisplay.value.phone)
        console.log('📱 Applications count:', applicationsCount.value)
        console.log('💾 Saved jobs count:', savedJobsCount.value)
        console.log('✅ Active goals count:', activeGoalsCount.value)
        console.log('════════════════════════════════════\n')
    }, 1500)
})
</script>

<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <!-- Modern Header with Glass Effect -->
        <div class="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {{ currentPageTitle }}
                        </h1>
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">{{ currentPageSubtitle }}</p>
                    </div>
                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {{ userInitial }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto pb-24">
            <!-- Dashboard View -->
            <div v-if="currentView === 'dashboard'" class="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">

                <!-- Quick Stats with Modern Cards -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <!-- Applications Card -->
                    <div
                        @click="goToApplications()"
                        class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer active:scale-95"
                    >
                        <div class="flex flex-col items-center text-center space-y-2">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-gray-800">{{ applicationsCount }}</p>
                                <p class="text-xs sm:text-sm text-gray-600 font-medium">Applications</p>
                            </div>
                        </div>
                    </div>

                    <!-- Saved Jobs Card -->
                    <div
                        @click="goToSavedJobs()"
                        class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer active:scale-95"
                    >
                        <div class="flex flex-col items-center text-center space-y-2">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-gray-800">{{ savedJobsCount }}</p>
                                <p class="text-xs sm:text-sm text-gray-600 font-medium">Saved Jobs</p>
                            </div>
                        </div>
                    </div>

                    <!-- Active Goals Card -->
                    <div
                        @click="openGoalsModal()"
                        class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer active:scale-95"
                    >
                        <div class="flex flex-col items-center text-center space-y-2">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-gray-800">{{ activeGoalsCount }}</p>
                                <p class="text-xs sm:text-sm text-gray-600 font-medium">Active Goals</p>
                            </div>
                        </div>
                    </div>

                    <!-- Completed Goals Card -->
                    <div
                        @click="openGoalsModal()"
                        class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 cursor-pointer active:scale-95"
                    >
                        <div class="flex flex-col items-center text-center space-y-2">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-2xl sm:text-3xl font-bold text-gray-800">{{ completedGoalsCount }}</p>
                                <p class="text-xs sm:text-sm text-gray-600 font-medium">Completed Goals</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Menu Grid with Modern Cards -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <button @click="currentView = 'multi-ai'" class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                        <div class="flex flex-col items-center space-y-4">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                            </div>
                            <div class="text-center">
                                <span class="font-bold text-base sm:text-lg text-gray-800 block">Multi AI</span>
                                <span class="text-xs sm:text-sm text-gray-600">AI Assistants</span>
                            </div>
                        </div>
                    </button>

                    <button @click="currentView = 'opportunity'" class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                        <div class="flex flex-col items-center space-y-4">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div class="text-center">
                                <span class="font-bold text-base sm:text-lg text-gray-800 block">Opportunity</span>
                                <span class="text-xs sm:text-sm text-gray-600">Find Jobs</span>
                            </div>
                        </div>
                    </button>

                    <button @click="currentView = 'profile'" class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                        <div class="flex flex-col items-center space-y-4">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <div class="text-center">
                                <span class="font-bold text-base sm:text-lg text-gray-800 block">Profile</span>
                                <span class="text-xs sm:text-sm text-gray-600">Your Info</span>
                            </div>
                        </div>
                    </button>

                    <button @click="currentView = 'inventory'" class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                        <div class="flex flex-col items-center space-y-4">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                </svg>
                            </div>
                            <div class="text-center">
                                <span class="font-bold text-base sm:text-lg text-gray-800 block">Inventory</span>
                                <span class="text-xs sm:text-sm text-gray-600">Documents</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Profile View -->
            <div v-else-if="currentView === 'profile'" class="p-4 sm:p-6 max-w-4xl mx-auto">
                <button @click="currentView = 'dashboard'" class="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                    <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Dashboard
                </button>

                <div class="space-y-6">
                    <!-- Profile Header Card -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-lg ring-4 ring-white">
                                {{ userInitial }}
                            </div>

                            <div class="flex-1 text-center sm:text-left">
                                <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{{ fullName }}</h2>
<p class="text-base sm:text-lg text-gray-600 mb-1">{{ userProfileDisplay.title || 'No title set' }}</p>
<p class="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-2">
    {{ userProfileDisplay.location || user?.email || 'Not set' }}
</p>
                                <button @click="editSection('personal')" class="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Personal Information -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100">
                        <h3 class="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Personal Information
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between py-3 border-b border-gray-200">
                                <span class="text-gray-600 text-sm font-medium">First Name</span>
                               <span class="font-semibold text-gray-800">{{ userLocalData?.firstName || '-' }}</span>
                            </div>

                   <!-- ✅ BENAR -->
<div v-if="userLocalData?.middleName" class="...">
    <span class="font-semibold text-gray-800">{{ userLocalData?.middleName }}</span>
</div>

                            <div class="flex items-center justify-between py-3 border-b border-gray-200">
                                <span class="text-gray-600 text-sm font-medium">Last Name</span>
                                <span class="font-semibold text-gray-800">{{ userLocalData?.lastName || '-' }}</span>
                            </div>

                            <div v-if="user?.phone" class="flex items-center justify-between py-3 border-b border-gray-200">
                                <span class="text-gray-600 text-sm font-medium">Phone Number</span>
                                <span class="font-semibold text-gray-800">{{ userProfileDisplay.phone || '-' }}</span>
                            </div>

                            <div class="flex items-center justify-between py-3 border-b border-gray-200">
                                <span class="text-gray-600 text-sm font-medium">Email</span>
                                {{ userProfileDisplay.location || user?.email || 'Not set' }}
                            </div>

                            <div class="flex items-center justify-between py-3">
                                <span class="text-gray-600 text-sm font-medium">Skills</span>
                               <span class="font-semibold text-gray-800">{{ userProfileDisplay.skillsCount }} skills</span>
                            </div>
                        </div>
                    </div>

                    <!-- Profile Sections -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <button @click="editSection('experience')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <p class="font-bold text-gray-800 text-base">Work Experience</p>
                                    <p class="text-sm text-gray-500">0 positions</p>
                                </div>
                            </div>
                            <svg class="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>

                        <div class="border-t border-gray-200"></div>

                        <button @click="editSection('skills')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <p class="font-bold text-gray-800 text-base">Skills & Expertise</p>
                                    <p class="text-sm text-gray-500">{{ userProfile.skillsCount }} skills</p>
                                </div>
                            </div>
                            <svg class="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>

                        <div class="border-t border-gray-200"></div>

                        <button @click="handleLogout" class="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-all group">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <p class="font-bold text-red-600 text-base">Logout</p>
                                    <p class="text-sm text-gray-500">Sign out from your account</p>
                                </div>
                            </div>
                            <svg class="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Multi AI View -->
            <div v-else-if="currentView === 'multi-ai'" class="p-4 sm:p-6 max-w-4xl mx-auto">
                <button @click="currentView = 'dashboard'" class="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                    <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Dashboard
                </button>
                <div class="text-center py-20">
                    <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Multi AI Assistants</h3>
                    <p class="text-gray-600">Coming soon...</p>
                </div>
            </div>

            <!-- Opportunity View -->
            <div v-else-if="currentView === 'opportunity'" class="p-4 sm:p-6 max-w-4xl mx-auto">
                <button @click="currentView = 'dashboard'" class="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                    <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Dashboard
                </button>
                <div class="text-center py-20">
                    <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Job Opportunities</h3>
                    <p class="text-gray-600">Coming soon...</p>
                </div>
            </div>

            <!-- Inventory View -->
            <div v-else-if="currentView === 'inventory'" class="p-4 sm:p-6 max-w-4xl mx-auto">
                <button @click="currentView = 'dashboard'" class="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                    <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Dashboard
                </button>
                <div class="text-center py-20">
                    <div class="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Document Inventory</h3>
                    <p class="text-gray-600">Coming soon...</p>
                </div>
            </div>
        </div>

        <!-- Bottom Navigation - Mobile Floating -->
        <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl z-30 sm:hidden">
            <div class="grid grid-cols-4 gap-1 p-2">
                <button @click="currentView = 'dashboard'" :class="currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-500'" class="flex flex-col items-center py-2 px-1 rounded-xl transition-all hover:bg-gray-100">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="text-xs font-medium">Home</span>
                </button>
                <button @click="currentView = 'opportunity'" :class="currentView === 'opportunity' ? 'text-blue-600' : 'text-gray-500'" class="flex flex-col items-center py-2 px-1 rounded-xl transition-all hover:bg-gray-100">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span class="text-xs font-medium">Jobs</span>
                </button>
                <button @click="currentView = 'inventory'" :class="currentView === 'inventory' ? 'text-blue-600' : 'text-gray-500'" class="flex flex-col items-center py-2 px-1 rounded-xl transition-all hover:bg-gray-100">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="text-xs font-medium">Docs</span>
                </button>
                <button @click="currentView = 'profile'" :class="currentView === 'profile' ? 'text-blue-600' : 'text-gray-500'" class="flex flex-col items-center py-2 px-1 rounded-xl transition-all hover:bg-gray-100">
                    <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="text-xs font-medium">Profile</span>
                </button>
            </div>
        </div>

        <!-- Goals Modal -->
        <div v-if="showGoalsModal" @click="closeGoalsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">My Goals</h3>
                    <button @click="closeGoalsModal" class="text-gray-400 hover:text-gray-600 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Active Goals -->
                <div class="mb-8">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span class="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                        Active Goals ({{ activeGoalsCount }})
                    </h4>
                    <div v-if="activeGoalsList.length > 0" class="space-y-3">
                        <div v-for="goal in activeGoalsList" :key="goal.id" class="bg-purple-50 border border-purple-100 rounded-xl p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h5 class="font-bold text-gray-900">{{ goal.title }}</h5>
                                    <p class="text-gray-600 text-sm mt-1">{{ goal.description }}</p>
                                    <div class="flex items-center mt-2">
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                          <div class="bg-purple-600 h-2 rounded-full" :style="{ width: ((goal as any).progress || 0) + '%' }"></div>
                                        </div>
                                        <span class="text-xs font-medium text-gray-700 ml-2">{{ ((goal as any).progress || 0) }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center py-4">
                        <p class="text-gray-500">No active goals</p>
                    </div>
                </div>

                <!-- Completed Goals -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span class="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                        Completed Goals ({{ completedGoalsCount }})
                    </h4>
                    <div v-if="completedGoalsList.length > 0" class="space-y-3">
                        <div v-for="goal in completedGoalsList" :key="goal.id" class="bg-orange-50 border border-orange-100 rounded-xl p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h5 class="font-bold text-gray-900">{{ goal.title }}</h5>
                                    <p class="text-gray-600 text-sm mt-1">{{ goal.description }}</p>
                                    <div class="flex items-center mt-2">
                                        <svg class="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-sm text-gray-600">Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center py-4">
                        <p class="text-gray-500">No completed goals</p>
                    </div>
                </div>
            </div>
        </div>

        <navbar/>
    </div>
</template>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

.cursor-pointer {
    cursor: pointer;
}

.active:scale-95 {
    transition: transform 0.1s ease;
}
</style>
