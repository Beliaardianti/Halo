<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <button @click="navigateTo('/dashboard')" class="p-2 hover:bg-gray-100 rounded-full">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h1 class="text-2xl font-bold text-gray-900">Decide Your Opportunity</h1>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- User Profile Card -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white mb-8">
                <h2 class="text-2xl font-bold mb-4">Your Profile</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Location</p>
                        <p class="text-xl font-bold">{{ preferences.location || 'Not set' }}</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Age</p>
                        <p class="text-xl font-bold">{{ preferences.age || 'Not set' }}</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Experience</p>
                        <p class="text-xl font-bold">{{ preferences.experience || 'Not set' }}</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Skills</p>
                        <p class="text-xl font-bold">{{ preferences.skills?.length || 0 }} skills</p>
                    </div>
                </div>
                <button @click="showPreferencesModal = true" class="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                    ⚙️ Update Profile
                </button>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Filter Opportunities</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Opportunity Type</label>
                        <select v-model="filters.type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">All Types</option>
                            <option value="full-time">Job - Full Time</option>
                            <option value="part-time">Job - Part Time</option>
                            <option value="internship">Internship</option>
                            <option value="freelance">Freelance</option>
                            <option value="scholarship">Scholarship</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select v-model="filters.location" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">All Locations</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Bandung">Bandung</option>
                            <option value="Surabaya">Surabaya</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Min Match Score</label>
                        <select v-model.number="filters.minScore" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="0">All (0%+)</option>
                            <option value="50">Good (50%+)</option>
                            <option value="70">Very Good (70%+)</option>
                            <option value="85">Excellent (85%+)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Match Score Info -->
            <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <h3 class="font-bold text-gray-900 mb-2">📊 How Match Score Works</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <p>✓ <span class="font-semibold">Location Match</span> - Up to 20%</p>
                        <p>✓ <span class="font-semibold">Age Match</span> - Up to 20%</p>
                        <p>✓ <span class="font-semibold">Experience Match</span> - Up to 20%</p>
                    </div>
                    <div>
                        <p>✓ <span class="font-semibold">Skills Match</span> - Up to 25%</p>
                        <p>✓ <span class="font-semibold">Base Score</span> - 15%</p>
                    </div>
                </div>
            </div>

            <!-- Opportunities List -->
            <div class="space-y-4">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">{{ filteredAndSortedOpportunities.length }} Opportunities Matched</h3>

                <div v-if="filteredAndSortedOpportunities.length === 0" class="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <p class="text-gray-500 text-lg">No opportunities found</p>
                    <p class="text-gray-400 text-sm">Try adjusting your filters or update your profile</p>
                </div>

                <div v-for="opportunity in filteredAndSortedOpportunities" :key="opportunity.id" class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 cursor-pointer" @click="showDetail(opportunity)">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <div class="flex items-center space-x-3 mb-2">
                                <span :class="getTypeBadge(opportunity.job_type)" class="px-3 py-1 text-xs font-semibold rounded-full">
                                    {{ opportunity.job_type }}
                                </span>
                                <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    {{ getOpportunityScore(opportunity) }}% Match
                                </span>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 mb-1">{{ opportunity.title }}</h4>
                            <p class="text-gray-600">{{ opportunity.company }}</p>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold text-blue-600">{{ getOpportunityScore(opportunity) }}%</div>
                            <p class="text-xs text-gray-500">Match Score</p>
                        </div>
                    </div>

                    <!-- Match Details -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div v-if="opportunity.location === preferences.location" class="text-center">
                            <p class="text-sm font-semibold text-gray-700">Location</p>
                            <p class="text-green-600 font-bold">✓</p>
                        </div>
                        <div v-else class="text-center opacity-50">
                            <p class="text-sm font-semibold text-gray-700">Location</p>
                            <p class="text-gray-400">✗</p>
                        </div>

                        <div v-if="isAgeMatch(opportunity)" class="text-center">
                            <p class="text-sm font-semibold text-gray-700">Age</p>
                            <p class="text-green-600 font-bold">✓</p>
                        </div>
                        <div v-else class="text-center opacity-50">
                            <p class="text-sm font-semibold text-gray-700">Age</p>
                            <p class="text-gray-400">✗</p>
                        </div>

                        <div v-if="getSkillsMatch(opportunity) > 0" class="text-center">
                            <p class="text-sm font-semibold text-gray-700">Skills</p>
                            <p class="text-green-600 font-bold">{{ getSkillsMatch(opportunity) }}</p>
                        </div>
                        <div v-else class="text-center opacity-50">
                            <p class="text-sm font-semibold text-gray-700">Skills</p>
                            <p class="text-gray-400">0</p>
                        </div>

                        <div v-if="isExperienceMatch(opportunity)" class="text-center">
                            <p class="text-sm font-semibold text-gray-700">Experience</p>
                            <p class="text-green-600 font-bold">✓</p>
                        </div>
                        <div v-else class="text-center opacity-50">
                            <p class="text-sm font-semibold text-gray-700">Experience</p>
                            <p class="text-gray-400">✗</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📍 {{ opportunity.location }}</span>
                            <span v-if="opportunity.salary_range">💰 {{ opportunity.salary_range }}</span>
                        </div>
                        <button @click.stop="applyOpportunity(opportunity)" v-if="!isApplied(opportunity.id)" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Apply Now
                        </button>
                        <button v-else class="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg cursor-not-allowed">
                            ✓ Applied
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Detail Modal -->
        <div v-if="showDetailModal && selectedOpportunity" @click="showDetailModal = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 my-8 max-h-[90vh] overflow-y-auto">
                <div class="flex items-start justify-between mb-6">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <span :class="getTypeBadge(selectedOpportunity.job_type)" class="px-3 py-1 text-xs font-semibold rounded-full">
                                {{ selectedOpportunity.job_type }}
                            </span>
                            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                {{ getOpportunityScore(selectedOpportunity) }}% Match
                            </span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedOpportunity.title }}</h2>
                        <p class="text-lg text-gray-600">{{ selectedOpportunity.company }}</p>
                    </div>
                    <button @click="showDetailModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Description</h3>
                    <p class="text-gray-700">{{ selectedOpportunity.description }}</p>
                </div>

                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                    <ul class="space-y-2">
                        <li v-for="req in selectedOpportunity.requirements" :key="req" class="flex items-center space-x-2">
                            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-gray-700">{{ req }}</span>
                        </li>
                    </ul>
                </div>

                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Details</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-600">Location</p>
                            <p class="font-semibold">{{ selectedOpportunity.location }}</p>
                        </div>
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-600">Experience Level</p>
                            <p class="font-semibold">{{ selectedOpportunity.experience_level }}</p>
                        </div>
                        <div v-if="selectedOpportunity.salary_range" class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-600">Salary Range</p>
                            <p class="font-semibold">{{ selectedOpportunity.salary_range }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex space-x-4">
                    <button v-if="!isApplied(selectedOpportunity.id)" @click="applyOpportunity(selectedOpportunity)" class="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
                        🚀 Apply Now
                    </button>
                    <button v-else class="flex-1 px-8 py-4 bg-green-100 text-green-700 font-bold rounded-xl cursor-not-allowed">
                        ✓ Already Applied
                    </button>
                    <button @click="shareOpportunity(selectedOpportunity)" class="px-8 py-4 border-2 border-purple-300 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition">
                        📤 Share
                    </button>
                    <button @click="showDetailModal = false" class="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- Share Modal -->
        <div v-if="showShareModal && selectedOpportunity" @click="showShareModal = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">📤 Share This Opportunity</h3>
                    <button @click="showShareModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p class="font-semibold text-gray-900">{{ selectedOpportunity.title }}</p>
                    <p class="text-sm text-gray-600">{{ selectedOpportunity.company }}</p>
                </div>

                <form @submit.prevent="submitShare" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Share Message (Optional)</label>
                        <textarea v-model="shareMessage" rows="3" placeholder="Add a personal message... e.g. 'Great opportunity for fresh graduates!'" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"></textarea>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <p class="text-sm text-purple-700">
                            ✨ This opportunity will be shared with the community on the Decide Opportunity page. Others can discover and apply for it!
                        </p>
                    </div>

                    <div class="flex space-x-4">
                        <button type="submit" :disabled="isShareSubmitting" class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50">
                            {{ isShareSubmitting ? 'Sharing...' : '✨ Share to Community' }}
                        </button>
                        <button type="button" @click="showShareModal = false" class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Preferences Modal -->
        <div v-if="showPreferencesModal" @click="showPreferencesModal = false" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Update Your Profile</h3>
                    <button @click="showPreferencesModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select v-model="tempPreferences.location" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Select location</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Bandung">Bandung</option>
                            <option value="Surabaya">Surabaya</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input v-model.number="tempPreferences.age" type="number" placeholder="25" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                            <select v-model="tempPreferences.experience" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Select</option>
                                <option value="Fresh Graduate">Fresh Graduate</option>
                                <option value="1-2 Years">1-2 Years</option>
                                <option value="3-5 Years">3-5 Years</option>
                                <option value="5+ Years">5+ Years</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                        <input v-model="tempPreferences.skillsInput" type="text" placeholder="JavaScript, React, Python" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div class="flex space-x-4 mt-6">
                        <button @click="savePreferences" class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Save</button>
                        <button @click="showPreferencesModal = false" class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Opportunity } from '~/types/api'

// STATE
const user = ref<any>(null)
const allOpportunities = ref<Opportunity[]>([])
const appliedOpportunities = ref<any[]>([])
const showDetailModal = ref(false)
const selectedOpportunity = ref<Opportunity | null>(null)
const showPreferencesModal = ref(false)
const showShareModal = ref(false)
const shareMessage = ref('')
const isShareSubmitting = ref(false)

const preferences = ref({
  location: '',
  industry: '',
  experience: '',
  age: null as number | null,
  skills: [] as string[],
  certifications: [] as string[]
})

const tempPreferences = ref({
  location: '',
  experience: '',
  age: null as number | null,
  skillsInput: ''
})

const filters = ref({
  type: '',
  location: '',
  minScore: 0
})

// HELPERS
const getTypeBadge = (type: string): string => {
  const badges: Record<string, string> = {
    'full-time': 'bg-green-100 text-green-700',
    'part-time': 'bg-blue-100 text-blue-700',
    'internship': 'bg-purple-100 text-purple-700',
    'scholarship': 'bg-yellow-100 text-yellow-700',
    'freelance': 'bg-pink-100 text-pink-700',
    'contract': 'bg-orange-100 text-orange-700'
  }
  return badges[type] || 'bg-gray-100 text-gray-700'
}

const isAgeMatch = (opportunity: Opportunity): boolean => {
  if (!preferences.value.age) return false
  return true
}

const isExperienceMatch = (opportunity: Opportunity): boolean => {
  if (!preferences.value.experience) return false
  const userExp = preferences.value.experience.toLowerCase()
  const oppExp = opportunity.experience_level?.toLowerCase() || ''

  if (userExp.includes('fresh') && oppExp.includes('entry')) return true
  if (userExp.includes('1-2') && (oppExp.includes('junior') || oppExp.includes('entry'))) return true
  if (userExp.includes('3-5') && (oppExp.includes('mid') || oppExp.includes('junior'))) return true
  if (userExp.includes('5+') && (oppExp.includes('senior') || oppExp.includes('mid'))) return true

  return false
}

const getSkillsMatch = (opportunity: Opportunity): number => {
  if (!preferences.value.skills.length) return 0
  const userSkills = preferences.value.skills.map(s => s.toLowerCase())
  const oppSkills = (opportunity.skills || []).map((s: string) => s.toLowerCase())
  return userSkills.filter(skill =>
    oppSkills.some(oppSkill => oppSkill.includes(skill) || skill.includes(oppSkill))
  ).length
}

const getOpportunityScore = (opportunity: Opportunity): number => {
  let score = 15
  if (opportunity.location === preferences.value.location) score += 20
  if (isAgeMatch(opportunity)) score += 20
  if (isExperienceMatch(opportunity)) score += 20
  const skillsMatch = getSkillsMatch(opportunity)
  if (skillsMatch > 0) score += Math.min(skillsMatch * 5, 25)
  return Math.min(score, 100)
}

const isApplied = (id: string): boolean => {
  return appliedOpportunities.value.some(app => app.opportunity_id === id)
}

// API
const loadOpportunities = async () => {
  try {
    const response = await fetch('/api/opportunities')
    const data = await response.json()
    if (data.success) allOpportunities.value = data.data
  } catch (error) {
    console.error('Error loading opportunities:', error)
  }
}

const loadApplications = async () => {
  try {
    const userId = user.value?.id
    if (!userId) return
    const response = await fetch(`/api/applications?user_id=${userId}`)
    const data = await response.json()
    if (data.success) appliedOpportunities.value = data.data
  } catch (error) {
    console.error('Error loading applications:', error)
  }
}

// MODALS
const showDetail = (opportunity: Opportunity) => {
  selectedOpportunity.value = opportunity
  showDetailModal.value = true
}

const shareOpportunity = (opp: Opportunity) => {
  if (!opp) return
  selectedOpportunity.value = opp
  shareMessage.value = ''
  showShareModal.value = true
}

const applyOpportunity = async (opportunity: Opportunity) => {
  try {
    const userId = user.value?.id
    if (!userId) return
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, opportunityId: opportunity.id })
    })
    const data = await response.json()
    if (data.success) {
      await loadApplications()
      showDetailModal.value = false
    }
  } catch (error) {
    console.error('Error applying:', error)
  }
}

const submitShare = async () => {
  try {
    const userId = user.value?.id
    if (!userId || !selectedOpportunity.value) return
    isShareSubmitting.value = true
    const opp = selectedOpportunity.value
    const response = await fetch('/api/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        title: opp.title,
        company: opp.company,
        job_type: opp.job_type,
        location: opp.location,
        experience_level: opp.experience_level,
        salary_range: opp.salary_range,
        description: opp.description,
        skills: opp.skills || [],
        share_message: shareMessage.value,
        shared_by: userId,
        is_community_share: true
      })
    })
    const data = await response.json()
    if (data.success) {
      alert('✨ Thank you for sharing! This opportunity is now visible to the community.')
      showShareModal.value = false
      shareMessage.value = ''
    }
  } catch (error) {
    console.error('Error sharing:', error)
    alert('Failed to share opportunity')
  } finally {
    isShareSubmitting.value = false
  }
}

const savePreferences = () => {
  preferences.value = {
    ...preferences.value,
    location: tempPreferences.value.location,
    experience: tempPreferences.value.experience,
    age: tempPreferences.value.age,
    skills: tempPreferences.value.skillsInput.split(',').map(s => s.trim()).filter(Boolean)
  }
  localStorage.setItem('user-preferences', JSON.stringify(preferences.value))
  showPreferencesModal.value = false
}

// COMPUTED
const filteredAndSortedOpportunities = computed(() => {
  return allOpportunities.value
    .filter(opp => {
      if (filters.value.type && opp.job_type !== filters.value.type) return false
      if (filters.value.location && opp.location !== filters.value.location) return false
      const score = getOpportunityScore(opp)
      if (score < filters.value.minScore) return false
      return true
    })
    .sort((a, b) => getOpportunityScore(b) - getOpportunityScore(a))
})

// LIFECYCLE
onMounted(async () => {
  const userData = localStorage.getItem('auth-user')
  const savedPrefs = localStorage.getItem('user-preferences')

  if (userData) user.value = JSON.parse(userData)
  if (savedPrefs) {
    const prefs = JSON.parse(savedPrefs)
    preferences.value = prefs
    tempPreferences.value = {
      location: prefs.location,
      experience: prefs.experience,
      age: prefs.age,
      skillsInput: (prefs.skills || []).join(', ')
    }
  }

  await Promise.all([loadOpportunities(), loadApplications()])
})
</script>

<style scoped>
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
