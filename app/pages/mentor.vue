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
                        <h1 class="text-2xl font-bold text-gray-900">Meet Your Mentor</h1>
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
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-lg p-8 text-white mb-8">
                <h2 class="text-3xl font-bold mb-3">Connect with Industry Experts</h2>
                <p class="text-orange-100 text-lg mb-6">Get personalized guidance from experienced professionals
                    in your field</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-3xl font-bold mb-1">{{ mentors.length }}</p>
                        <p class="text-orange-100 text-sm">Expert Mentors</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-3xl font-bold mb-1">1000+</p>
                        <p class="text-orange-100 text-sm">Sessions Completed</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-3xl font-bold mb-1">4.9</p>
                        <p class="text-orange-100 text-sm">Average Rating</p>
                    </div>
                </div>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Filter Mentors</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                        <select v-model="mentorFilters.industry"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                            <option value="">All Industries</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                            <option value="Product Management">Product Management</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                        <select v-model="mentorFilters.expertise"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                            <option value="">All Expertise</option>
                            <option value="Career Transition">Career Transition</option>
                            <option value="Technical Skills">Technical Skills</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Interview Prep">Interview Prep</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                        <select v-model="mentorFilters.availability"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                            <option value="">Any Time</option>
                            <option value="This Week">This Week</option>
                            <option value="Next Week">Next Week</option>
                            <option value="This Month">This Month</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Mentors Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="mentor in filteredMentors" :key="mentor.id"
                    class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-200 overflow-hidden">
                    <div class="relative">
                        <div class="h-24 bg-gradient-to-r from-orange-400 to-red-400"></div>
                        <div class="absolute -bottom-12 left-6">
                            <div
                                class="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                                <div
                                    class="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-2xl flex items-center justify-center">
                                    {{ mentor.initial }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-16 px-6 pb-6">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h4 class="font-bold text-gray-900 text-lg">{{ mentor.name }}</h4>
                                <p class="text-sm text-gray-600">{{ mentor.title }}</p>
                                <p class="text-xs text-gray-500">{{ mentor.company }}</p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-2 mb-3">
                            <div class="flex items-center">
                                <svg v-for="i in 5" :key="i"
                                    :class="i <= mentor.rating ? 'text-yellow-400' : 'text-gray-300'"
                                    class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                            </div>
                            <span class="text-sm font-semibold text-gray-700">{{ mentor.rating }}</span>
                            <span class="text-xs text-gray-500">({{ mentor.reviews }} reviews)</span>
                        </div>

                        <div class="space-y-2 mb-4">
                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                                    {{ mentor.industry }}
                                </span>
                                <span
                                    class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                    {{ mentor.experience }} years
                                </span>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="expertise in mentor.expertise.slice(0, 2)" :key="expertise"
                                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {{ expertise }}
                                </span>
                            </div>
                        </div>

                        <div
                            class="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-200">
                            <span class="text-gray-600">{{ mentor.sessionsCompleted }} sessions</span>
                            <span class="font-semibold text-orange-600">{{ mentor.pricePerSession }}</span>
                        </div>

                        <div class="space-y-2">
                            <button @click="openBookingModal(mentor)"
                                class="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                                💳 Book Session
                            </button>
                            <button
                                class="w-full px-4 py-2 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition">
                                Send Message
                            </button>
                        </div>

                        <div v-if="mentor.nextAvailable" class="mt-3 text-xs text-gray-500 text-center">
                            Next available: {{ mentor.nextAvailable }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredMentors.length === 0" class="bg-white rounded-2xl shadow-sm p-12 text-center">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                </svg>
                <p class="text-gray-500 text-lg mb-2">No mentors found</p>
                <p class="text-gray-400 text-sm mb-4">Try adjusting your filters</p>
                <button @click="resetMentorFilters"
                    class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                    Reset Filters
                </button>
            </div>
        </main>

        <!-- Bottom Navigation -->
        <Navbar />

        <!-- Payment Modal -->
        <PaymentModal
            v-if="showPaymentModal && selectedMentor"
            :isOpen="showPaymentModal"
            :amount="mentorSessionPrice"
            :description="mentorSessionDescription"
            paymentType="mentoring"
            @close="showPaymentModal = false"
            @success="onPaymentSuccess"
            @error="onPaymentError"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseData } from '../composables/useSupabaseData'
import PaymentModal from '../components/paymentmodal.vue'


const { fetchMentors } = useSupabaseData()

const user = ref(null)
const mentors = ref([])
const mentorFilters = ref({
    industry: '',
    expertise: '',
    availability: ''
})
const showPaymentModal = ref(false)
const selectedMentor = ref(null)
const mentorSessionPrice = ref(0)
const mentorSessionDescription = ref('')

const userInitial = computed(() => {
    if (user.value?.firstName) {
        return user.value.firstName.charAt(0).toUpperCase()
    }
    return 'U'
})

const loadMentors = async () => {
    try {
        const response = await fetchMentors({
            expertise: mentorFilters.value.expertise || null
        })

        if (response.success) {
            mentors.value = response.data.map(mentor => {
                const fullName = mentor.full_name || mentor.name || 'Anonymous Mentor'

                const initial = fullName
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()

                return {
                    id: mentor.id,
                    name: fullName,
                    initial: initial,
                    title: mentor.job_title || mentor.title || 'Mentor',
                    company: mentor.company || 'Independent',
                    industry: mentor.industry || 'Various',
                    experience: mentor.years_of_experience || mentor.experience || '0',
                    rating: mentor.rating || 0,
                    reviews: mentor.review_count || 0,
                    expertise: Array.isArray(mentor.expertise) ? mentor.expertise : [],
                    sessionsCompleted: mentor.sessions_completed || 0,
                    pricePerSession: mentor.session_price
                        ? `Rp ${parseInt(mentor.session_price).toLocaleString('id-ID')}`
                        : 'Rp 150000',
                    nextAvailable: mentor.next_available || 'Contact to schedule'
                }
            })
        }
    } catch (error) {
        console.error('Error loading mentors:', error)
    }
}

const filteredMentors = computed(() => {
    let result = mentors.value

    if (mentorFilters.value.industry) {
        result = result.filter(m => m.industry === mentorFilters.value.industry)
    }

    if (mentorFilters.value.expertise) {
        result = result.filter(m => m.expertise.includes(mentorFilters.value.expertise))
    }

    return result
})

const resetMentorFilters = () => {
    mentorFilters.value = {
        industry: '',
        expertise: '',
        availability: ''
    }
}

const openBookingModal = (mentor) => {
    try {
        selectedMentor.value = mentor

        // Debug: Log untuk lihat apa yang didapat
        console.log('Mentor selected:', mentor)
        console.log('Price per session:', mentor.pricePerSession)

        // Parse price - lebih robust
        let price = 0

        if (mentor.pricePerSession) {
            // Jika sudah angka
            if (typeof mentor.pricePerSession === 'number') {
                price = mentor.pricePerSession
            } else {
                // Jika string, extract angka
                const priceStr = mentor.pricePerSession.replace(/[^\d]/g, '')
                price = parseInt(priceStr) || 150000 // Default 150000 jika parsing gagal
            }
        } else {
            price = 150000 // Default price
        }

        console.log('Parsed price:', price)

        // Validasi
        if (isNaN(price) || price <= 0) {
            price = 150000 // Set default
        }

        // Set values
        mentorSessionPrice.value = price
        mentorSessionDescription.value = `Mentoring Session with ${mentor.name} - 1 Hour`

        // Debug: Cek state sebelum buka modal
        console.log('Modal state:', {
            showPaymentModal: true,
            selectedMentor: selectedMentor.value,
            price: mentorSessionPrice.value,
            description: mentorSessionDescription.value
        })

        // Buka modal
        showPaymentModal.value = true

        console.log('Modal should be visible now')

    } catch (error) {
        console.error('Error opening booking modal:', error)
        alert('Error opening booking. Please try again.')
    }
}

const onPaymentSuccess = async ({ transactionId, paymentUrl }) => {
    console.log('Payment success!', transactionId)
    localStorage.setItem('last-booking-transaction', transactionId)
    showPaymentModal.value = false
    alert('Booking successful! The mentor will contact you shortly.')
}

const onPaymentError = ({ message }) => {
    console.error('Payment error:', message)
    alert(`Payment failed: ${message}`)
    showPaymentModal.value = false
}

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

    await loadMentors()
})
</script>
