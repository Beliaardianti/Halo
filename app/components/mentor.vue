<template>
    <!-- Mentors Component - Full Screen Modal -->
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
                            <h1 class="text-2xl font-bold text-gray-900">Find Your Mentor</h1>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Hero Section -->
                <div class="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-lg p-8 text-white mb-8">
                    <h2 class="text-3xl font-bold mb-3">Connect with Industry Experts</h2>
                    <p class="text-orange-100 text-lg mb-6">Get personalized guidance from experienced professionals in
                        your field</p>
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

                <!-- Filters -->
                <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Filter Mentors</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <select v-model="filters.industry"
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
                            <select v-model="filters.expertise"
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
                            <select v-model="filters.availability"
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
                        <!-- Mentor Header -->
                        <div class="relative">
                            <div class="h-24 bg-gradient-to-r from-orange-400 to-red-400"></div>
                            <div class="absolute -bottom-12 left-6">
                                <div class="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                                    <img v-if="mentor.photo" :src="mentor.photo" :alt="mentor.name"
                                        class="w-full h-full object-cover" />
                                    <div v-else
                                        class="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-2xl flex items-center justify-center">
                                        {{ mentor.initial }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mentor Info -->
                        <div class="pt-16 px-6 pb-6">
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h4 class="font-bold text-gray-900 text-lg">{{ mentor.name }}</h4>
                                    <p class="text-sm text-gray-600">{{ mentor.title }}</p>
                                    <p class="text-xs text-gray-500">{{ mentor.company }}</p>
                                </div>
                                <button class="p-2 hover:bg-gray-100 rounded-full transition">
                                    <svg class="w-5 h-5 text-gray-400 hover:text-red-500" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                        </path>
                                    </svg>
                                </button>
                            </div>

                            <!-- Rating -->
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

                            <!-- Industry & Experience -->
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

                            <!-- Sessions Info -->
                            <div class="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-200">
                                <span class="text-gray-600">{{ mentor.sessionsCompleted }} sessions</span>
                                <span class="font-semibold text-orange-600">{{ mentor.pricePerSession }}</span>
                            </div>

                            <!-- Actions -->
                            <div class="space-y-2">
                                <button @click="viewProfile(mentor)"
                                    class="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                                    View Profile
                                </button>
                                <button
                                    class="w-full px-4 py-2 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition">
                                    Send Message
                                </button>
                            </div>

                            <!-- Availability -->
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
                    <button @click="resetFilters"
                        class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>

        <!-- Mentor Detail Modal -->
        <div v-if="selectedMentor" @click="selectedMentor = null"
            class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 overflow-y-auto">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="relative">
                    <div class="h-32 bg-gradient-to-r from-orange-400 to-red-400"></div>
                    <button @click="selectedMentor = null"
                        class="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div class="absolute -bottom-16 left-8">
                        <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                            <div
                                class="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-4xl flex items-center justify-center">
                                {{ selectedMentor.initial }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="pt-20 px-8 pb-8">
                    <div class="mb-6">
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedMentor.name }}</h2>
                        <p class="text-lg text-gray-600 mb-1">{{ selectedMentor.title }}</p>
                        <p class="text-gray-500">{{ selectedMentor.company }}</p>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-2xl font-bold text-gray-900">{{ selectedMentor.rating }}</p>
                            <p class="text-sm text-gray-600">Rating</p>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-2xl font-bold text-gray-900">{{ selectedMentor.sessionsCompleted }}</p>
                            <p class="text-sm text-gray-600">Sessions</p>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-2xl font-bold text-gray-900">{{ selectedMentor.experience }}</p>
                            <p class="text-sm text-gray-600">Years Exp</p>
                        </div>
                    </div>

                    <!-- About -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">About</h3>
                        <p class="text-gray-600 leading-relaxed">{{ selectedMentor.bio }}</p>
                    </div>

                    <!-- Expertise -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Expertise</h3>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="expertise in selectedMentor.expertise" :key="expertise"
                                class="px-3 py-2 bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg">
                                {{ expertise }}
                            </span>
                        </div>
                    </div>

                    <!-- Pricing -->
                    <div class="mb-6 p-4 bg-orange-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Session Price</p>
                                <p class="text-2xl font-bold text-orange-600">{{ selectedMentor.pricePerSession }}</p>
                                <p class="text-xs text-gray-500">per 60-minute session</p>
                            </div>
                            <button
                                class="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition">
                                Book Session
                            </button>
                        </div>
                    </div>

                    <!-- Available Times -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">Available Times</h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <button v-for="slot in selectedMentor.availableSlots" :key="slot"
                                class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-sm">
                                {{ slot }}
                            </button>
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

const filters = ref({
    industry: '',
    expertise: '',
    availability: ''
})

const selectedMentor = ref(null)

const mentors = ref([
    {
        id: 1,
        name: 'David Anderson',
        initial: 'DA',
        title: 'Senior Software Engineer',
        company: 'Google',
        industry: 'Technology',
        experience: 8,
        rating: 4.9,
        reviews: 127,
        expertise: ['Career Transition', 'Technical Skills', 'Interview Prep'],
        sessionsCompleted: 145,
        pricePerSession: 'Rp 500K',
        nextAvailable: 'Tomorrow, 2PM',
        bio: 'Experienced software engineer with 8+ years at top tech companies. Passionate about helping others break into tech and advance their careers.',
        availableSlots: ['Mon 2PM', 'Tue 10AM', 'Wed 4PM', 'Thu 11AM', 'Fri 3PM']
    },
    {
        id: 2,
        name: 'Sarah Martinez',
        initial: 'SM',
        title: 'Product Manager',
        company: 'Meta',
        industry: 'Product Management',
        experience: 6,
        rating: 5.0,
        reviews: 98,
        expertise: ['Product Strategy', 'Leadership', 'Career Growth'],
        sessionsCompleted: 112,
        pricePerSession: 'Rp 450K',
        nextAvailable: 'This Week',
        bio: 'Product leader who has shipped products used by millions. Love mentoring aspiring PMs and helping them navigate their career journey.',
        availableSlots: ['Mon 10AM', 'Tue 2PM', 'Thu 9AM', 'Fri 1PM']
    },
    {
        id: 3,
        name: 'Michael Chen',
        initial: 'MC',
        title: 'UX Design Lead',
        company: 'Airbnb',
        industry: 'Design',
        experience: 10,
        rating: 4.8,
        reviews: 156,
        expertise: ['UX Design', 'Portfolio Review', 'Design Thinking'],
        sessionsCompleted: 189,
        pricePerSession: 'Rp 400K',
        nextAvailable: 'Next Week',
        bio: 'Award-winning UX designer with a decade of experience. I help designers build amazing portfolios and land their dream jobs.',
        availableSlots: ['Mon 3PM', 'Wed 10AM', 'Thu 2PM', 'Sat 11AM']
    },
    {
        id: 4,
        name: 'Emily Watson',
        initial: 'EW',
        title: 'Marketing Director',
        company: 'HubSpot',
        industry: 'Marketing',
        experience: 7,
        rating: 4.9,
        reviews: 89,
        expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
        sessionsCompleted: 98,
        pricePerSession: 'Rp 350K',
        nextAvailable: 'Tomorrow',
        bio: 'Marketing executive specializing in growth and digital strategy. Helping marketers level up their skills and career.',
        availableSlots: ['Tue 11AM', 'Wed 3PM', 'Thu 10AM', 'Fri 2PM']
    },
    {
        id: 5,
        name: 'James Wilson',
        initial: 'JW',
        title: 'VP of Engineering',
        company: 'Stripe',
        industry: 'Technology',
        experience: 12,
        rating: 5.0,
        reviews: 203,
        expertise: ['Leadership', 'Engineering Management', 'System Design'],
        sessionsCompleted: 234,
        pricePerSession: 'Rp 600K',
        nextAvailable: 'This Month',
        bio: 'Engineering leader with extensive experience building and scaling teams. Passionate about developing the next generation of tech leaders.',
        availableSlots: ['Mon 4PM', 'Wed 1PM', 'Fri 10AM']
    },
    {
        id: 6,
        name: 'Lisa Thompson',
        initial: 'LT',
        title: 'Financial Analyst',
        company: 'Goldman Sachs',
        industry: 'Finance',
        experience: 9,
        rating: 4.7,
        reviews: 67,
        expertise: ['Finance Career', 'Investment Banking', 'Interview Prep'],
        sessionsCompleted: 76,
        pricePerSession: 'Rp 550K',
        nextAvailable: 'This Week',
        bio: 'Finance professional with deep expertise in investment banking. I help candidates prepare for finance roles and interviews.',
        availableSlots: ['Tue 9AM', 'Thu 1PM', 'Fri 11AM', 'Sat 2PM']
    }
])

const filteredMentors = computed(() => {
    let result = mentors.value

    if (filters.value.industry) {
        result = result.filter(m => m.industry === filters.value.industry)
    }

    if (filters.value.expertise) {
        result = result.filter(m => m.expertise.includes(filters.value.expertise))
    }

    // You can add more filter logic here based on availability

    return result
})

const viewProfile = (mentor) => {
    selectedMentor.value = mentor
}

const resetFilters = () => {
    filters.value = {
        industry: '',
        expertise: '',
        availability: ''
    }
}

const closeModal = () => {
    emit('close')
}
</script>
