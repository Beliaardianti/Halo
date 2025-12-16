<template>
    <!-- Main Content -->
    <div class="min-h-screen bg-gray-50 pb-20">
        <!-- Search Header -->
        <div class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <!-- Search Input -->
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input v-model="searchQuery" type="text"
                        placeholder="Search opportunities, mentors, or organizations..."
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
            </div>
        </div>

        <!-- Search Content -->
        <div class="max-w-7xl mx-auto px-4 py-6">
            <!-- Search Tabs -->
            <div class="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all',
                    activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                ]">
                    {{ tab.name }}
                </button>
            </div>

            <!-- Search Results -->
            <div v-if="activeTab === 'opportunities'">
                <!-- Filter Section -->
                <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Filter by:</h3>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="filter in opportunityFilters" :key="filter"
                            @click="toggleOpportunityFilter(filter)" :class="[
                                'px-3 py-1 text-sm rounded-full border transition-colors',
                                selectedOpportunityFilters.includes(filter)
                                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            ]">
                            {{ filter }}
                        </button>
                    </div>
                </div>

                <!-- Opportunity Results -->
                <div class="space-y-4">
                    <div v-for="opportunity in filteredOpportunities" :key="opportunity.id"
                        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <h3 class="font-semibold text-gray-900">{{ opportunity.title }}</h3>
                        <p class="text-sm text-gray-600 mt-1">{{ opportunity.company }} • {{ opportunity.location }}</p>
                        <div class="flex flex-wrap gap-1 mt-2">
                            <span v-for="tag in opportunity.tags" :key="tag"
                                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mentor Search -->
            <div v-if="activeTab === 'mentors'">
                <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Search mentors by:</h3>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="filter in mentorFilters" :key="filter" @click="toggleMentorFilter(filter)"
                            :class="[
                                'px-3 py-1 text-sm rounded-full border transition-colors',
                                selectedMentorFilters.includes(filter)
                                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            ]">
                            {{ filter }}
                        </button>
                    </div>
                </div>

                <!-- Mentor Results -->
                <div class="grid gap-4 md:grid-cols-2">
                    <div v-for="mentor in filteredMentors" :key="mentor.id"
                        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <span class="text-lg font-semibold text-gray-600">{{ mentor.name.charAt(0) }}</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900">{{ mentor.name }}</h3>
                                <p class="text-sm text-gray-600">{{ mentor.role }} at {{ mentor.organization }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Organization Search -->
            <div v-if="activeTab === 'organizations'">
                <!-- Organization Filters -->
                <div class="space-y-6">
                    <!-- Basic Filters -->
                    <div>
                        <h3 class="text-sm font-medium text-gray-700 mb-3">Filter by:</h3>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="filter in organizationFilters" :key="filter"
                                @click="toggleOrganizationFilter(filter)" :class="[
                                    'px-3 py-1 text-sm rounded-full border transition-colors',
                                    selectedOrganizationFilters.includes(filter)
                                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                ]">
                                {{ filter }}
                            </button>
                        </div>
                    </div>

                    <!-- Advanced Filters -->
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <!-- Organization Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
                            <select v-model="selectedOrgType"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">All Types</option>
                                <option value="For Profit">For Profit</option>
                                <option value="Non-Profit">Non-Profit</option>
                                <option value="Government">Government</option>
                            </select>
                        </div>

                        <!-- Industry -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <select v-model="selectedIndustry"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">All Industries</option>
                                <option value="Technology">Technology</option>
                                <option value="Education">Education</option>
                                <option value="Communication">Communication</option>
                            </select>
                        </div>

                        <!-- Location -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input v-model="locationFilter" type="text" placeholder="Enter location..."
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>

                        <!-- Scale -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                            <select v-model="selectedScale"
                                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">All Sizes</option>
                                <option value="<10">&lt; 10</option>
                                <option value="10-20">10-20</option>
                                <option value="<100">&lt; 100</option>
                                <option value="<500">&lt; 500</option>
                                <option value="<1000">&lt; 1000</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Organization Results -->
                <div class="mt-6 grid gap-4">
                    <div v-for="organization in filteredOrganizations" :key="organization.id"
                        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <h3 class="font-semibold text-gray-900">{{ organization.name }}</h3>
                        <p class="text-sm text-gray-600 mt-1">{{ organization.type }} • {{ organization.industry }}</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-xs text-gray-500">{{ organization.location }}</span>
                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {{ organization.scale }} employees
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-3">
            <div class="flex items-center justify-around">
                <button class="flex flex-col items-center text-gray-500 hover:text-gray-700 transition">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                        </path>
                    </svg>
                    <span class="text-xs mt-1">Home</span>
                </button>

                <button class="flex flex-col items-center text-gray-500 hover:text-gray-700 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                        </path>
                    </svg>
                    <span class="text-xs mt-1">Chat & Notifikasi</span>
                </button>

                <button class="flex flex-col items-center text-gray-500 hover:text-gray-700 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                        </path>
                    </svg>
                    <span class="text-xs mt-1">App</span>
                </button>

                <button class="flex flex-col items-center text-blue-600 hover:text-blue-700 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span class="text-xs mt-1 font-medium">Search</span>
                </button>

                <button class="flex flex-col items-center text-gray-500 hover:text-gray-700 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="text-xs mt-1">Settings</span>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'SearchPage',
    data() {
        return {
            searchQuery: '',
            activeTab: 'opportunities',
            tabs: [
                { id: 'opportunities', name: 'Opportunities' },
                { id: 'mentors', name: 'Mentor Profile' },
                { id: 'organizations', name: 'Organization Profile' }
            ],

            // Opportunity Filters
            opportunityFilters: ['Internship', 'Job', 'Scholarship', 'Remote', 'On-site'],
            selectedOpportunityFilters: [],

            // Mentor Filters
            mentorFilters: ['Name', 'Organization', 'Role'],
            selectedMentorFilters: [],

            // Organization Filters
            organizationFilters: ['Organization Name', 'Location', 'Industry'],
            selectedOrganizationFilters: [],
            selectedOrgType: '',
            selectedIndustry: '',
            locationFilter: '',
            selectedScale: '',

            // Sample Data
            opportunities: [
                {
                    id: 1,
                    title: 'Frontend Developer Intern',
                    company: 'Tech Corp',
                    location: 'Jakarta, Indonesia',
                    tags: ['Internship', 'Remote', 'Technology']
                },
                {
                    id: 2,
                    title: 'Data Scientist',
                    company: 'Data Insights',
                    location: 'Bandung, Indonesia',
                    tags: ['Job', 'On-site', 'Technology']
                },
                {
                    id: 3,
                    title: 'UI/UX Design Scholarship',
                    company: 'Design Academy',
                    location: 'Remote',
                    tags: ['Scholarship', 'Remote', 'Design']
                }
            ],

            mentors: [
                {
                    id: 1,
                    name: 'Seno',
                    role: 'Senior Product Manager',
                    organization: 'Tech Company'
                },
                {
                    id: 2,
                    name: 'Sarah Johnson',
                    role: 'UX Lead',
                    organization: 'Design Studio'
                }
            ],

            organizations: [
                {
                    id: 1,
                    name: 'Tech Innovation Inc',
                    type: 'For Profit',
                    industry: 'Technology',
                    location: 'Jakarta, Indonesia',
                    scale: '<100'
                },
                {
                    id: 2,
                    name: 'EduFuture Foundation',
                    type: 'Non-Profit',
                    industry: 'Education',
                    location: 'Bandung, Indonesia',
                    scale: '<50'
                }
            ]
        }
    },

    computed: {
        filteredOpportunities() {
            return this.opportunities.filter(opportunity => {
                const matchesSearch = opportunity.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    opportunity.company.toLowerCase().includes(this.searchQuery.toLowerCase())

                const matchesFilters = this.selectedOpportunityFilters.length === 0 ||
                    this.selectedOpportunityFilters.some(filter =>
                        opportunity.tags.includes(filter))

                return matchesSearch && matchesFilters
            })
        },

        filteredMentors() {
            return this.mentors.filter(mentor => {
                return mentor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    mentor.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    mentor.organization.toLowerCase().includes(this.searchQuery.toLowerCase())
            })
        },

        filteredOrganizations() {
            return this.organizations.filter(org => {
                const matchesSearch = org.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    org.industry.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    org.location.toLowerCase().includes(this.searchQuery.toLowerCase())

                const matchesType = !this.selectedOrgType || org.type === this.selectedOrgType
                const matchesIndustry = !this.selectedIndustry || org.industry === this.selectedIndustry
                const matchesLocation = !this.locationFilter || org.location.toLowerCase().includes(this.locationFilter.toLowerCase())
                const matchesScale = !this.selectedScale || org.scale === this.selectedScale

                return matchesSearch && matchesType && matchesIndustry && matchesLocation && matchesScale
            })
        }
    },

    methods: {
        toggleOpportunityFilter(filter) {
            const index = this.selectedOpportunityFilters.indexOf(filter)
            if (index > -1) {
                this.selectedOpportunityFilters.splice(index, 1)
            } else {
                this.selectedOpportunityFilters.push(filter)
            }
        },

        toggleMentorFilter(filter) {
            const index = this.selectedMentorFilters.indexOf(filter)
            if (index > -1) {
                this.selectedMentorFilters.splice(index, 1)
            } else {
                this.selectedMentorFilters.push(filter)
            }
        },

        toggleOrganizationFilter(filter) {
            const index = this.selectedOrganizationFilters.indexOf(filter)
            if (index > -1) {
                this.selectedOrganizationFilters.splice(index, 1)
            } else {
                this.selectedOrganizationFilters.push(filter)
            }
        }
    }
}
</script>