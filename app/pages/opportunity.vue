<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4">
        <!-- Header dengan Back Button dan Navigation -->
        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-4">
                        <NuxtLink to="/app"
                            class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            <span>Back to Dashboard</span>
                        </NuxtLink>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button @click="showFilters = !showFilters"
                            class="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                            </svg>
                            <span>Filters</span>
                        </button>
                        <button @click="refreshOpportunities"
                            class="p-2 hover:bg-gray-100 rounded-full transition">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <p class="text-gray-600">Temukan dan kelola peluang karir Anda</p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div class="text-2xl font-bold text-blue-600 mb-1">{{ totalOpportunities }}</div>
                    <div class="text-sm text-gray-500">Total Opportunities</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div class="text-2xl font-bold text-green-600 mb-1">{{ appliedCount }}</div>
                    <div class="text-sm text-gray-500">Applied</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div class="text-2xl font-bold text-yellow-600 mb-1">{{ savedCount }}</div>
                    <div class="text-sm text-gray-500">Saved</div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div class="text-2xl font-bold text-purple-600 mb-1">{{ matchPercentage }}%</div>
                    <div class="text-sm text-gray-500">Profile Match</div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="bg-white rounded-t-2xl shadow-sm border-b">
                <div class="flex space-x-1 p-2 overflow-x-auto">
                    <button @click="activeTab = 'search'"
                        :class="activeTab === 'search' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:bg-gray-50 border-transparent'"
                        class="py-3 px-6 rounded-lg font-medium transition whitespace-nowrap border">
                        🔍 Search Opportunities
                    </button>
                    <button @click="activeTab = 'applied'"
                        :class="activeTab === 'applied' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:bg-gray-50 border-transparent'"
                        class="py-3 px-6 rounded-lg font-medium transition whitespace-nowrap border relative">
                        📝 My Applications
                        <span v-if="appliedCount > 0"
                            class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {{ appliedCount }}
                        </span>
                    </button>
                    <button @click="activeTab = 'saved'"
                        :class="activeTab === 'saved' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-600 hover:bg-gray-50 border-transparent'"
                        class="py-3 px-6 rounded-lg font-medium transition whitespace-nowrap border relative">
                        ⭐ Saved
                        <span v-if="savedCount > 0"
                            class="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {{ savedCount }}
                        </span>
                    </button>
                </div>
            </div>

            <!-- Tab Content -->
            <div class="bg-white rounded-b-2xl shadow-lg p-6">
                <!-- SEARCH TAB -->
                <div v-if="activeTab === 'search'" class="space-y-6">
                    <!-- Search Bar -->
                    <div class="flex gap-3">
                        <div class="flex-1 relative">
                            <input v-model="searchQuery" @keyup.enter="searchOpportunities" type="text"
                                placeholder="Search job titles, companies, or keywords..."
                                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button @click="searchOpportunities"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                            Search
                        </button>
                    </div>

                    <!-- Sort Options -->
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-500">
                            Showing {{ filteredOpportunities.length }} of {{ opportunities.length }} opportunities
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-500">Sort by:</span>
                            <select v-model="sortBy" @change="sortOpportunities"
                                class="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none">
                                <option value="relevance">Relevance</option>
                                <option value="newest">Newest First</option>
                                <option value="salary">Highest Salary</option>
                                <option value="match">Best Match</option>
                            </select>
                        </div>
                    </div>

                    <!-- Opportunities List -->
                    <div class="space-y-4">
                        <div v-if="loading" class="text-center py-12">
                            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p class="mt-2 text-gray-500">Loading opportunities...</p>
                        </div>

                        <div v-else-if="filteredOpportunities.length === 0" class="text-center py-12">
                            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                            <p class="text-gray-500 mb-4">Try adjusting your search or filters</p>
                        </div>

                        <div v-for="opp in filteredOpportunities" :key="opp.id"
                            class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-start space-x-4 flex-1">
                                    <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50
                                        flex items-center justify-center border border-blue-200">
                                        <div class="text-2xl font-bold text-blue-600">
                                            {{ opp.company ? opp.company.charAt(0).toUpperCase() : 'C' }}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-800 mb-1">{{ opp.title }}</h3>
                                        <p class="text-gray-600 mb-1">{{ opp.company }}</p>
                                        <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                            <span>📍 {{ opp.location }}</span>
                                            <span v-if="opp.salary" class="text-green-600 font-medium">💰 {{ opp.salary }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button @click="saveOpportunity(opp)"
                                        :class="isSaved(opp.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'"
                                        class="p-2 transition" title="Save opportunity">
                                        ⭐
                                    </button>
                                </div>
                            </div>

                            <p class="text-gray-700 mb-4 line-clamp-2">{{ opp.description }}</p>

                            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div class="text-sm text-gray-500"></div>
                                <div class="flex gap-2">
                                    <button @click="applyOpportunity(opp)"
                                        :disabled="isApplied(opp.id)"
                                        :class="isApplied(opp.id)
                                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'"
                                        class="px-6 py-2 rounded-lg font-medium transition">
                                        {{ isApplied(opp.id) ? '✓ Applied' : 'Apply Now' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- APPLIED TAB -->
                <div v-if="activeTab === 'applied'" class="space-y-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">My Applications</h2>
                        <div class="text-sm text-gray-500">
                            {{ appliedOpportunities.length }} application{{ appliedOpportunities.length !== 1 ? 's' : '' }}
                        </div>
                    </div>

                    <div v-if="appliedOpportunities.length === 0" class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p class="text-gray-500 mb-4">Start applying to opportunities</p>
                        <button @click="activeTab = 'search'"
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Browse Opportunities
                        </button>
                    </div>

                    <div v-for="app in appliedOpportunities" :key="app.id"
                        class="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-800">{{ app.title }}</h3>
                                <p class="text-gray-600">{{ app.company }}</p>
                            </div>
                            <button @click="withdrawApplication(app.id)"
                                class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition">
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                <!-- SAVED TAB -->
                <div v-if="activeTab === 'saved'" class="space-y-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Saved Opportunities</h2>
                        <div class="text-sm text-gray-500">
                            {{ savedOpportunities.length }} saved opportunity{{ savedOpportunities.length !== 1 ? 'ies' : '' }}
                        </div>
                    </div>

                    <div v-if="savedOpportunities.length === 0" class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No saved opportunities</h3>
                        <p class="text-gray-500 mb-4">Click the star icon to save opportunities</p>
                        <button @click="activeTab = 'search'"
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Browse Opportunities
                        </button>
                    </div>

                    <div v-for="opp in savedOpportunities" :key="opp.id"
                        class="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">{{ opp.title }}</h3>
                                <p class="text-gray-600">{{ opp.company }}</p>
                                <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                    <span>📍 {{ opp.location }}</span>
                                    <span>💼 {{ opp.type }}</span>
                                </div>
                            </div>
                            <button @click="unsaveOpportunity(opp.id)"
                                class="p-2 text-yellow-500 hover:text-yellow-600 transition">
                                ⭐
                            </button>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div class="text-sm text-gray-500"></div>
                            <button @click="applyOpportunity(opp)"
                                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Toast -->
        <transition name="toast">
            <div v-if="showSuccessToast"
                class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="font-semibold">{{ toastMessage }}</span>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../../server/utils/supabaseClient'



// State
const activeTab = ref('search')
const searchQuery = ref('')
const showFilters = ref(false)
const sortBy = ref('relevance')
const loading = ref(false)
const showSuccessToast = ref(false)
const toastMessage = ref('')
const opportunities = ref([])
const appliedOpportunities = ref([])
const savedOpportunities = ref([])
const user = ref(null)

// Get user ID
const getUserId = () => {
    if (user.value?.id) return user.value.id
    const userData = localStorage.getItem('auth-user')
    if (userData) {
        const parsed = JSON.parse(userData)
        return parsed.id
    }
    return null
}

// Computed Properties
const filteredOpportunities = computed(() => {
    let filtered = opportunities.value.filter(opp => {
        if (isApplied(opp.id) || isSaved(opp.id)) return false
        if (searchQuery.value && !opp.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
            !opp.company.toLowerCase().includes(searchQuery.value.toLowerCase())) {
            return false
        }
        return true
    })

    switch (sortBy.value) {
        case 'newest':
            filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            break
        case 'salary':
            filtered.sort((a, b) => {
                const getSalary = (opp) => {
                    if (!opp.salary) return 0
                    const match = opp.salary.match(/Rp\s*([\d.,]+)/)
                    return match ? parseFloat(match[1].replace(/\./g, '')) : 0
                }
                return getSalary(b) - getSalary(a)
            })
            break
    }

    return filtered
})

// Stats
const totalOpportunities = computed(() => opportunities.value.length)
const appliedCount = computed(() => appliedOpportunities.value.length)
const savedCount = computed(() => savedOpportunities.value.length)
const matchPercentage = computed(() => {
    if (appliedOpportunities.value.length === 0) return 0
    const totalMatch = appliedOpportunities.value.reduce((sum, app) => sum + (app.matchScore || 0), 0)
    return Math.round(totalMatch / appliedOpportunities.value.length)
})

// Methods
const isApplied = (oppId) => appliedOpportunities.value.some(app => app.id === oppId)
const isSaved = (oppId) => savedOpportunities.value.some(opp => opp.id === oppId)

// ✅ SAVE JOB KE SUPABASE
const saveOpportunity = async (opp) => {
    if (isSaved(opp.id)) {
        await unsaveOpportunity(opp.id)
        return
    }

    try {
        const userId = getUserId()
        if (!userId) {
            alert('Please login first')
            return
        }

        console.log('💾 Saving to Supabase...', { userId, oppId: opp.id })

        // Save ke Supabase
        const { data, error } = await supabase
            .from('saved_jobs')
            .insert({
                user_id: userId,
                opportunity_id: opp.id,
                opportunity_data: opp
            })

        if (error) throw error

        // Save ke localStorage
        const savedOpp = { ...opp, savedAt: new Date().toISOString() }
        savedOpportunities.value.push(savedOpp)
        const savedIds = savedOpportunities.value.map(o => o.id)
        localStorage.setItem('saved-opportunities', JSON.stringify(savedIds))

        toastMessage.value = 'Job saved!'
        showSuccessToast.value = true
        setTimeout(() => showSuccessToast.value = false, 2000)

        console.log('✅ Saved to Supabase & localStorage')
    } catch (error) {
        console.error('❌ Error saving job:', error)
        alert(`Failed to save job: ${error.message}`)
    }
}

// ✅ UNSAVE JOB DARI SUPABASE
const unsaveOpportunity = async (oppId) => {
    try {
        const userId = getUserId()
        if (!userId) return

        console.log('🗑️ Removing from Supabase...', { userId, oppId })

        // Delete dari Supabase
        const { error } = await supabase
            .from('saved_jobs')
            .delete()
            .eq('user_id', userId)
            .eq('opportunity_id', oppId)

        if (error) throw error

        // Delete dari localStorage
        savedOpportunities.value = savedOpportunities.value.filter(opp => opp.id !== oppId)
        const savedIds = savedOpportunities.value.map(o => o.id)
        localStorage.setItem('saved-opportunities', JSON.stringify(savedIds))

        toastMessage.value = 'Job unsaved'
        showSuccessToast.value = true
        setTimeout(() => showSuccessToast.value = false, 2000)

        console.log('✅ Deleted from Supabase & localStorage')
    } catch (error) {
        console.error('❌ Error unsaving job:', error)
        alert(`Failed to unsave job: ${error.message}`)
    }
}

// ✅ LOAD SAVED JOBS DARI SUPABASE
const loadSavedJobsFromSupabase = async () => {
    try {
        const userId = getUserId()
        if (!userId) {
            console.warn('⚠️ No user ID found')
            return
        }

        console.log('📥 Loading saved jobs from Supabase...', userId)

        const { data, error } = await supabase
            .from('saved_jobs')
            .select('*')
            .eq('user_id', userId)

        if (error) throw error

        if (data && data.length > 0) {
            savedOpportunities.value = data.map(item => ({
                ...item.opportunity_data,
                savedAt: item.saved_at
            }))
            console.log('✅ Loaded saved jobs from Supabase:', data.length)
        } else {
            console.log('✅ No saved jobs found')
            savedOpportunities.value = []
        }
    } catch (error) {
        console.error('❌ Error loading saved jobs:', error)
    }
}

// Apply ke opportunity
const applyOpportunity = (opp) => {
    const application = {
        id: opp.id,
        title: opp.title,
        company: opp.company,
        location: opp.location,
        type: opp.type,
        matchScore: opp.matchScore || 0,
        appliedAt: new Date().toISOString()
    }

    appliedOpportunities.value.push(application)
    localStorage.setItem('applied-opportunities', JSON.stringify(appliedOpportunities.value))

    toastMessage.value = `Successfully applied to ${opp.title}!`
    showSuccessToast.value = true
    setTimeout(() => showSuccessToast.value = false, 3000)

    activeTab.value = 'applied'
}

// Withdraw application
const withdrawApplication = (appId) => {
    if (confirm('Withdraw this application?')) {
        appliedOpportunities.value = appliedOpportunities.value.filter(app => app.id !== appId)
        localStorage.setItem('applied-opportunities', JSON.stringify(appliedOpportunities.value))
    }
}

// Search & sort
const searchOpportunities = () => {
    console.log('Searching for:', searchQuery.value)
}

const sortOpportunities = () => {
    console.log('Sorting by:', sortBy.value)
}

const refreshOpportunities = async () => {
    loading.value = true
    await loadSavedJobsFromSupabase()
    loading.value = false

}
// ✅ LOAD OPPORTUNITIES DARI SUPABASE
const loadOpportunities = async () => {
    try {
        loading.value = true

        console.log('📥 Loading opportunities from Supabase...')

        const { data, error } = await supabase
            .from('opportunities')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        opportunities.value = data || []
        console.log('✅ Opportunities loaded:', opportunities.value.length)
    } catch (error) {
        console.error('❌ Error loading opportunities:', error)
        opportunities.value = []
    } finally {
        loading.value = false
    }
}


// Lifecycle
onMounted(async () => {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('auth-user')

    if (!token) {
        navigateTo('/login')
        return
    }

    if (userData) {
        user.value = JSON.parse(userData)
    }

    // Load applied opportunities
    const savedApps = localStorage.getItem('applied-opportunities')
    if (savedApps) {
        appliedOpportunities.value = JSON.parse(savedApps)
    }

    // ✅ LOAD OPPORTUNITIES
    await loadOpportunities()

    // ✅ LOAD SAVED JOBS
    await loadSavedJobsFromSupabase()

    console.log('🚀 Opportunity page mounted')
})

</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.toast-enter-active, .toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.toast-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
