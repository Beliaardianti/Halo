<template>
    <div class="min-h-screen bg-gray-50 pb-20">
        <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <NuxtLink to="/dashboard"
                            class="p-2 hover:bg-gray-100 rounded-full transition">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                        </NuxtLink>
                        <h1 class="text-2xl font-bold text-gray-900">Share Your Goals</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button @click="showProfile = !showProfile"
                            class="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 transition">
                            {{ userInitial }}
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Progress Banner -->
            <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white mb-8">
                <h2 class="text-2xl font-bold mb-4">Your Progress</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p class="text-blue-100 text-sm mb-1">Total Goals</p>
                        <p class="text-4xl font-bold">{{ goals.length }}</p>
                    </div>
                    <div>
                        <p class="text-blue-100 text-sm mb-1">Completed</p>
                        <p class="text-4xl font-bold">{{ completedGoals }}</p>
                    </div>
                    <div>
                        <p class="text-blue-100 text-sm mb-1">In Progress</p>
                        <p class="text-4xl font-bold">{{ inProgressGoals }}</p>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-blue-100 text-sm">Overall Progress</span>
                        <span class="text-white font-bold">{{ completionPercentage }}%</span>
                    </div>
                    <div class="w-full bg-white/20 rounded-full h-3">
                        <div class="bg-white h-3 rounded-full transition-all duration-500"
                            :style="{ width: completionPercentage + '%' }"></div>
                    </div>
                </div>
            </div>

            <!-- Create Goal Form -->
            <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Create New Goal</h3>
                <div class="space-y-4">
                    <div>
                        <input v-model="newGoal.title" @keyup.enter="addGoal" type="text"
                            placeholder="Goal title (e.g., Learn React.js)"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                    </div>
                    <div>
                        <textarea v-model="newGoal.description" placeholder="Description (optional)" rows="3"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select v-model="newGoal.category"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                <option value="">Select category</option>
                                <option value="Learning">Learning</option>
                                <option value="Career">Career</option>
                                <option value="Skills">Skills</option>
                                <option value="Personal">Personal Development</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                            <input v-model="newGoal.targetDate" type="date"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <input v-model="newGoal.shareWithCommunity" type="checkbox" id="share-checkbox"
                            class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label for="share-checkbox" class="text-sm font-medium text-gray-700">
                            Share with community (others can see and support your goal)
                        </label>
                    </div>
                    <button @click="addGoal"
                        class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-md">
                        + Create Goal
                    </button>
                </div>
            </div>

            <!-- Goals List -->
            <div class="space-y-4">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Your Goals</h3>

                <div v-if="goals.length === 0" class="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-gray-500 text-lg mb-2">No goals yet</p>
                    <p class="text-gray-400 text-sm">Create your first goal to start your journey!</p>
                </div>

                <div v-for="goal in goals" :key="goal.id"
                    class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-start space-x-4 flex-1">
                            <input type="checkbox" v-model="goal.completed" @change="toggleGoalCompletion(goal)"
                                class="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
                            <div class="flex-1">
                                <h4 :class="goal.completed ? 'line-through text-gray-400' : 'text-gray-900'"
                                    class="text-lg font-bold mb-2">{{ goal.title }}</h4>
                                <p v-if="goal.description" class="text-gray-600 text-sm mb-3">{{
                                    goal.description }}</p>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span v-if="goal.category"
                                        class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                        {{ goal.category }}
                                    </span>
                                    <span v-if="goal.targetDate"
                                        class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                        📅 {{ formatDate(goal.targetDate) }}
                                    </span>
                                    <span v-if="goal.sharedWithCommunity"
                                        class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                        🌐 Shared
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button @click="deleteGoal(goal.id)"
                            class="text-red-500 hover:text-red-700 transition p-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Bottom Navigation -->
        <Navbar />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const user = ref(null)
const goals = ref([])
const showProfile = ref(false)
const newGoal = ref({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    shareWithCommunity: false
})

// Computed Properties
const completedGoals = computed(() => goals.value.filter(g => g.completed).length)
const inProgressGoals = computed(() => goals.value.filter(g => !g.completed).length)
const completionPercentage = computed(() => {
    if (goals.value.length === 0) return 0
    return Math.round((completedGoals.value / goals.value.length) * 100)
})

const userInitial = computed(() => {
    if (user.value?.firstName) {
        return user.value.firstName.charAt(0).toUpperCase()
    }
    return 'U'
})

// ✅ TAMBAHAN: Function untuk save goals ke localStorage
const saveGoalsToLocalStorage = () => {
    const goalsData = goals.value.map(goal => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        category: goal.category,
        targetDate: goal.targetDate,
        sharedWithCommunity: goal.sharedWithCommunity,
        completed: goal.completed,
        createdAt: goal.createdAt
    }))

    localStorage.setItem('user-goals', JSON.stringify(goalsData))
    console.log('✅ Goals auto-saved to localStorage:', goalsData.length)
}

// ✅ TAMBAHAN: Watch goals array untuk auto-save setiap kali berubah
watch(() => goals.value, () => {
    if (goals.value.length > 0) {
        saveGoalsToLocalStorage()
    }
}, { deep: true })

// Methods
const addGoal = async () => {
    if (!newGoal.value.title.trim()) {
        alert('Please enter a goal title')
        return
    }

    try {
        const token = localStorage.getItem('auth-token')
        const userId = user.value?.id

        console.log('🔍 Add goal - Token:', token ? 'exists' : 'missing', 'UserId:', userId)

        if (!token || !userId) {
            throw new Error('Authentication required - Token or UserId missing')
        }

        const goalData = {
            user_id: userId,
            title: newGoal.value.title.trim(),
            description: newGoal.value.description || null,
            category: newGoal.value.category || null,
            target_date: newGoal.value.targetDate || null,
            shared_with_community: newGoal.value.shareWithCommunity || false
        }

        console.log('📤 Sending goal data:', goalData)

        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(goalData)
        })

        console.log('📥 Response status:', response.status)
        const data = await response.json()
        console.log('📥 Response data:', data)

        if (!response.ok) {
            throw new Error(data.error || data.message || `HTTP ${response.status}`)
        }

        if (data.success || data.data) {
            newGoal.value = {
                title: '',
                description: '',
                category: '',
                targetDate: '',
                shareWithCommunity: false
            }

            await loadGoals()
            console.log('✅ Goal created and saved')
            alert('Goal created successfully!')
        }
    } catch (error) {
        console.error('❌ Error adding goal:', error)
        alert(`Failed to create goal: ${error.message}`)
    }
}

const deleteGoal = async (id) => {
    if (!confirm('Delete this goal?')) return

    try {
        const token = localStorage.getItem('auth-token')
        const userId = user.value?.id

        console.log('🔍 Delete goal token:', token ? 'exists' : 'missing', 'UserId:', userId)

        if (!token || !userId) {
            throw new Error('No authentication token or user ID found')
        }

        const response = await fetch(`/api/goals/${id}?user_id=${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        console.log('📤 Delete response status:', response.status)
        const data = await response.json()
        console.log('📥 Delete response:', data)

        if (!response.ok) {
            throw new Error(data.message || data.error || `HTTP ${response.status}`)
        }

        if (data.success) {
            goals.value = goals.value.filter(g => g.id !== id)
            saveGoalsToLocalStorage()
            console.log('✅ Goal deleted and saved')
        }
    } catch (error) {
        console.error('❌ Error deleting goal:', error)
        alert(`Failed to delete goal: ${error.message}`)
    }
}

const toggleGoalCompletion = async (goal) => {
    try {
        const token = localStorage.getItem('auth-token')
        const userId = user.value?.id

        console.log('🔍 Toggle goal token:', token ? 'exists' : 'missing', 'UserId:', userId)

        if (!token || !userId) {
            throw new Error('No authentication token or user ID found')
        }

        const response = await fetch(`/api/goals/${goal.id}?user_id=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                completed: !goal.completed
            })
        })

        console.log('📤 Toggle response status:', response.status)
        const data = await response.json()
        console.log('📥 Toggle response:', data)

        if (!response.ok) {
            throw new Error(data.message || data.error || `HTTP ${response.status}`)
        }

        if (data.success) {
            await loadGoals()
            console.log('✅ Goal completion updated and saved')
        }
    } catch (error) {
        console.error('❌ Error updating goal:', error)
        alert(`Failed to update goal: ${error.message}`)
    }
}

const loadGoals = async () => {
    try {
        const token = localStorage.getItem('auth-token')
        const userId = user.value?.id

        console.log('🔍 Load goals - Token:', token ? 'exists' : 'missing', 'UserId:', userId)

        if (!token || !userId) {
            console.warn('⚠️ User ID or token not available')
            // ✅ FALLBACK: Load dari localStorage jika tidak ada token
            const savedGoals = localStorage.getItem('user-goals')
            if (savedGoals) {
                goals.value = JSON.parse(savedGoals)
                console.log('✅ Goals loaded from localStorage (fallback):', goals.value.length)
            }
            return
        }

        console.log('📤 Fetching goals from API...')
        const response = await fetch(`/api/goals?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        console.log('📥 Response status:', response.status)
        const data = await response.json()
        console.log('📥 Response data:', data)

        if (!response.ok) {
            throw new Error(data.error || `HTTP ${response.status}`)
        }

        if (data.success && Array.isArray(data.data)) {
            goals.value = data.data.map(goal => ({
                id: goal.id,
                title: goal.title,
                description: goal.description,
                category: goal.category,
                targetDate: goal.target_date,
                sharedWithCommunity: goal.shared_with_community,
                completed: goal.completed,
                createdAt: goal.created_at
            }))

            // ✅ TAMBAHAN: Langsung save ke localStorage setelah load
            saveGoalsToLocalStorage()

            console.log('✅ Goals loaded from API:', goals.value.length)
        } else {
            throw new Error('No data returned from API')
        }
    } catch (error) {
        console.error('❌ Error loading goals:', error.message)

        // ✅ FALLBACK: Load dari localStorage jika API gagal
        const savedGoals = localStorage.getItem('user-goals')
        if (savedGoals) {
            goals.value = JSON.parse(savedGoals)
            console.log('⚠️ Goals loaded from localStorage (API failed):', goals.value.length)
        }
    }
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Lifecycle
onMounted(async () => {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('auth-user')
    const personalInfo = localStorage.getItem('personal-info')

    if (!token) {
        navigateTo('/login')
        return
    }

    if (userData) {
        user.value = JSON.parse(userData)
    }

    if (personalInfo) {
        const info = JSON.parse(personalInfo)
        user.value = { ...user.value, ...info }
    }

    console.log('🚀 Goals page mounted!')
    await loadGoals()
})
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
