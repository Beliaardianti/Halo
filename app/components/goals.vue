<template>
    <!-- Goals Component - Full Screen Modal -->
    <div v-if="isOpen" @click="closeModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div @click.stop class="min-h-screen bg-gray-50 pb-20">
            <!-- Header -->
            <div class="bg-white shadow-sm sticky top-0 z-10">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full transition">
                                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <h1 class="text-2xl font-bold text-gray-900">My Goals</h1>
                        </div>
                        <button @click="activeTab = 'my-goals'"
                            :class="activeTab === 'my-goals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
                            class="px-4 py-2 rounded-lg font-medium text-sm transition">
                            My Goals
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Tabs -->
                <div class="flex space-x-2 mb-8 overflow-x-auto pb-2">
                    <button @click="activeTab = 'my-goals'"
                        :class="activeTab === 'my-goals' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm">
                        📝 My Goals
                    </button>
                    <button @click="activeTab = 'community'"
                        :class="activeTab === 'community' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm">
                        🌐 Community Goals
                    </button>
                    <button @click="activeTab = 'achievements'"
                        :class="activeTab === 'achievements' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                        class="px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition shadow-sm">
                        🏆 Achievements
                    </button>
                </div>

                <!-- My Goals Tab -->
                <div v-if="activeTab === 'my-goals'">
                    <!-- Progress Overview -->
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

                    <!-- Add New Goal -->
                    <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Create New Goal</h3>
                        <div class="space-y-4">
                            <div>
                                <input v-model="newGoal.title" type="text"
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
                                    <input type="checkbox" v-model="goal.completed" @change="updateGoal(goal)"
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
                                        <div v-if="goal.sharedWithCommunity"
                                            class="flex items-center space-x-4 text-sm text-gray-500">
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                                <span>{{ goal.likes || 0 }}</span>
                                            </span>
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd"
                                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                                <span>{{ goal.comments || 0 }}</span>
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
                </div>

                <!-- Community Goals Tab -->
                <div v-if="activeTab === 'community'">
                    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">🌐 Community Goals Feed</h3>
                        <p class="text-gray-600 text-sm mb-4">See what others are working on, get inspired, and support
                            their journey!</p>
                    </div>

                    <!-- Community Goals List -->
                    <div class="space-y-6">
                        <div v-for="post in communityGoals" :key="post.id"
                            class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                            <!-- User Info -->
                            <div class="flex items-center space-x-3 mb-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg flex items-center justify-center">
                                    {{ post.userInitial }}
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-900">{{ post.userName }}</p>
                                    <p class="text-xs text-gray-500">{{ post.timeAgo }}</p>
                                </div>
                            </div>

                            <!-- Goal Content -->
                            <div class="mb-4">
                                <h4 class="text-lg font-bold text-gray-900 mb-2">{{ post.title }}</h4>
                                <p class="text-gray-600 text-sm mb-3">{{ post.description }}</p>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                        {{ post.category }}
                                    </span>
                                    <span v-if="post.targetDate"
                                        class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                        📅 Target: {{ formatDate(post.targetDate) }}
                                    </span>
                                </div>
                            </div>

                            <!-- Interactions -->
                            <div class="flex items-center space-x-6 pt-4 border-t border-gray-100">
                                <button @click="likePost(post.id)"
                                    :class="post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'"
                                    class="flex items-center space-x-2 transition">
                                    <svg class="w-5 h-5" :fill="post.isLiked ? 'currentColor' : 'none'"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                        </path>
                                    </svg>
                                    <span class="text-sm font-medium">{{ post.likes }}</span>
                                </button>
                                <button
                                    class="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                        </path>
                                    </svg>
                                    <span class="text-sm font-medium">{{ post.comments }}</span>
                                </button>
                                <button
                                    class="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z">
                                        </path>
                                    </svg>
                                    <span class="text-sm font-medium">Support</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Achievements Tab -->
                <div v-if="activeTab === 'achievements'">
                    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">🏆 Your Achievements</h3>
                        <p class="text-gray-600 text-sm">Unlock badges and rewards as you complete your goals!</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="achievement in achievements" :key="achievement.id"
                            :class="achievement.unlocked ? 'bg-white' : 'bg-gray-50 opacity-60'"
                            class="rounded-2xl shadow-sm p-6 text-center transition hover:shadow-md">
                            <div class="text-6xl mb-4">{{ achievement.icon }}</div>
                            <h4 class="font-bold text-gray-900 mb-2">{{ achievement.title }}</h4>
                            <p class="text-sm text-gray-600 mb-3">{{ achievement.description }}</p>
                            <div v-if="achievement.unlocked" class="text-green-600 text-sm font-semibold">
                                ✓ Unlocked
                            </div>
                            <div v-else class="text-gray-400 text-sm">
                                🔒 Locked
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const activeTab = ref('my-goals')
const goals = ref([])
const newGoal = ref({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    shareWithCommunity: false
})

const communityGoals = ref([
    {
        id: 1,
        userName: 'Sarah Johnson',
        userInitial: 'SJ',
        timeAgo: '2 hours ago',
        title: 'Master Full Stack Development',
        description: 'Learning React, Node.js, and MongoDB to become a full-stack developer by end of 2025',
        category: 'Learning',
        targetDate: '2025-12-31',
        likes: 24,
        comments: 8,
        isLiked: false
    },
    {
        id: 2,
        userName: 'Michael Chen',
        userInitial: 'MC',
        timeAgo: '5 hours ago',
        title: 'Land a Product Manager Role',
        description: 'Transitioning from engineering to PM. Preparing for interviews at top tech companies.',
        category: 'Career',
        targetDate: '2025-06-30',
        likes: 45,
        comments: 12,
        isLiked: true
    },
    {
        id: 3,
        userName: 'Emma Wilson',
        userInitial: 'EW',
        timeAgo: '1 day ago',
        title: 'Get AWS Solutions Architect Certification',
        description: 'Studying for AWS certification to advance my cloud career',
        category: 'Skills',
        targetDate: '2025-03-15',
        likes: 32,
        comments: 5,
        isLiked: false
    }
])

const achievements = ref([
    { id: 1, icon: '🎯', title: 'First Goal', description: 'Created your first goal', unlocked: true },
    { id: 2, icon: '🔥', title: 'On Fire', description: 'Completed 5 goals', unlocked: false },
    { id: 3, icon: '🌟', title: 'Rising Star', description: 'Got 50 likes on shared goals', unlocked: false },
    { id: 4, icon: '💪', title: 'Consistent', description: 'Updated goals 7 days in a row', unlocked: false },
    { id: 5, icon: '🏆', title: 'Goal Master', description: 'Completed 20 goals', unlocked: false },
    { id: 6, icon: '🤝', title: 'Community Helper', description: 'Supported 100 community goals', unlocked: false }
])

const completedGoals = computed(() => goals.value.filter(g => g.completed).length)
const inProgressGoals = computed(() => goals.value.filter(g => !g.completed).length)
const completionPercentage = computed(() => {
    if (goals.value.length === 0) return 0
    return Math.round((completedGoals.value / goals.value.length) * 100)
})

const addGoal = () => {
    if (!newGoal.value.title.trim()) return

    goals.value.unshift({
        id: Date.now(),
        title: newGoal.value.title,
        description: newGoal.value.description,
        category: newGoal.value.category,
        targetDate: newGoal.value.targetDate,
        sharedWithCommunity: newGoal.value.shareWithCommunity,
        completed: false,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString()
    })

    // Reset form
    newGoal.value = {
        title: '',
        description: '',
        category: '',
        targetDate: '',
        shareWithCommunity: false
    }

    // Save to localStorage
    saveGoals()
}

const updateGoal = (goal) => {
    saveGoals()
}

const deleteGoal = (id) => {
    if (confirm('Delete this goal?')) {
        goals.value = goals.value.filter(g => g.id !== id)
        saveGoals()
    }
}

const saveGoals = () => {
    localStorage.setItem('user-goals', JSON.stringify(goals.value))
}

const loadGoals = () => {
    const saved = localStorage.getItem('user-goals')
    if (saved) {
        goals.value = JSON.parse(saved)
    }
}

const likePost = (postId) => {
    const post = communityGoals.value.find(p => p.id === postId)
    if (post) {
        if (post.isLiked) {
            post.likes--
            post.isLiked = false
        } else {
            post.likes++
            post.isLiked = true
        }
    }
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const closeModal = () => {
    emit('close')
}

onMounted(() => {
    loadGoals()
})
</script>
