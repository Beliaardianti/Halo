<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <h1 class="text-2xl font-bold text-gray-900">HaLo Apps</h1>
                        <span
                            class="hidden sm:inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Dashboard</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button @click="showNotifications = true"
                            class="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 relative">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                </path>
                            </svg>
                            <span v-if="notificationCount > 0"
                                class="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{{
                                    notificationCount }}</span>
                        </button>
                        <div class="flex items-center space-x-3">
                            <div class="text-right hidden sm:block">
                                <p class="text-sm font-medium text-gray-900">{{ user?.firstName || 'User' }}</p>
                                <p class="text-xs text-gray-500">{{ user?.email }}</p>
                            </div>
                            <button @click="showProfile = !showProfile"
                                class="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 transition">
                                {{ userInitial }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
            <!-- Welcome Banner -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white mb-8">
                <h2 class="text-3xl font-bold mb-2">Welcome back, {{ user?.firstName || 'User' }}! 👋</h2>
                <p class="text-blue-100 text-lg">Your personalized career journey starts here</p>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Active Goals</p>
                        <p class="text-2xl font-bold">{{ activeGoalsCount }}</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Opportunities</p>
                        <p class="text-2xl font-bold">{{ matchedOpportunitiesCount }}</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Applications</p>
                        <p class="text-2xl font-bold">{{ appliedOpportunities.length }}</p>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p class="text-blue-100 text-sm">Profile Match</p>
                        <p class="text-2xl font-bold">{{ profileCompleteness }}%</p>
                    </div>
                </div>
            </div>

            <!-- Main Action Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Share Your Goals Card -->
                <NuxtLink to="/goals"
                    class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-purple-300 block">
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Share Your Goals</h3>
                    <p class="text-gray-600 text-sm mb-4">Set and share your career goals with the community</p>
                    <div class="flex items-center justify-between">
                        <span class="text-purple-600 font-semibold text-sm">Manage Goals →</span>
                        <span class="text-xs text-gray-400">{{ personalGoalsCount }} goals</span>
                    </div>
                </NuxtLink>

                <!-- Get Opportunity Card -->
                <NuxtLink to="/opportunity"
                    class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-blue-300 block">
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Get Opportunity</h3>
                    <p class="text-gray-600 text-sm mb-4">Browse jobs, internships & scholarships matched for you</p>
                    <div class="flex items-center justify-between">
                        <span class="text-blue-600 font-semibold text-sm">Explore Now →</span>
                        <span class="text-xs text-gray-400">{{ matchedOpportunitiesCount }} matches</span>
                    </div>
                </NuxtLink>

                <!-- Meet Your Mentor Card -->
                <NuxtLink to="/mentor"
                    class="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-orange-300 block">
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Meet Your Mentor</h3>
                    <p class="text-gray-600 text-sm mb-4">Connect with experienced mentors in your field</p>
                    <div class="flex items-center justify-between">
                        <span class="text-orange-600 font-semibold text-sm">Find Mentors →</span>
                        <span class="text-xs text-gray-400">{{ mentorCount }} available</span>
                    </div>
                </NuxtLink>
            </div>

            <!-- Preferences Section -->
            <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-1">Your Preferences</h3>
                        <p class="text-gray-600 text-sm">Update your preferences to match with the best opportunities</p>
                    </div>
                    <button @click="openPreferencesModal"
                        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                        Update Preferences
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <p class="text-gray-500 text-xs font-medium mb-1">LOCATION</p>
                        <p class="text-gray-900 font-semibold">{{ preferences.location || 'Not set' }}</p>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <p class="text-gray-500 text-xs font-medium mb-1">CAREER INDUSTRY</p>
                        <p class="text-gray-900 font-semibold">{{ preferences.industry || 'Not set' }}</p>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <p class="text-gray-500 text-xs font-medium mb-1">EXPERIENCE LEVEL</p>
                        <p class="text-gray-900 font-semibold">{{ preferences.experience || 'Not set' }}</p>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <p class="text-gray-500 text-xs font-medium mb-1">SKILLS</p>
                        <p class="text-gray-900 font-semibold">{{ preferences.skills?.length || 0 }} skills</p>
                    </div>
                </div>
            </div>

            <!-- Recent Opportunities -->
            <div class="bg-white rounded-2xl shadow-sm p-8">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <h3 class="text-2xl font-bold text-gray-900">Recent Opportunities</h3>
                    </div>
                    <NuxtLink to="/opportunity"
                        class="text-green-600 hover:text-green-700 font-semibold text-sm">
                        View All →
                    </NuxtLink>
                </div>

                <!-- Filter Tabs -->
                <div class="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    <button v-for="filter in opportunityFilters" :key="filter" @click="selectedFilter = filter"
                        :class="selectedFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                        class="px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition">
                        {{ filter }}
                    </button>
                </div>

                <!-- Opportunities Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="opportunity in displayedOpportunities" :key="opportunity.id"
                        @click="openOpportunityDetail(opportunity)"
                        class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-200 cursor-pointer hover:border-blue-300">
                        <div class="flex items-center justify-between mb-4">
                            <span :class="getTypeBadgeClass(opportunity.type)"
                                class="px-3 py-1 text-xs font-semibold rounded-full">
                                {{ opportunity.type }}
                            </span>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    {{ opportunity.matchScore }}% Match
                                </span>
                                <svg class="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" @click.stop="toggleFavorite(opportunity.id)">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <h4 class="font-bold text-gray-900 mb-2 text-lg">{{ opportunity.title }}</h4>
                        <p class="text-sm text-gray-600 mb-3">{{ opportunity.company }}</p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span v-for="tag in opportunity.tags.slice(0, 3)" :key="tag"
                                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {{ tag }}
                            </span>
                        </div>

                        <div class="flex items-center justify-between text-sm pt-4 border-t border-gray-200">
                            <span class="text-gray-500">📍 {{ opportunity.location }}</span>
                            <span class="font-semibold text-blue-600">{{ opportunity.salary || opportunity.stipend ||
                                'View Details' }}</span>
                        </div>

                        <!-- Applied Badge -->
                        <div v-if="isApplied(opportunity.id)" class="mt-3">
                            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                ✓ Applied
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Load More Button -->
                <div v-if="displayedOpportunities.length < filteredOpportunities.length" class="flex justify-center mt-8">
                    <button @click="loadMoreOpportunities"
                        class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                        Load More ({{ displayedOpportunities.length }} of {{ filteredOpportunities.length }})
                    </button>
                </div>

                <!-- Empty State -->
                <div v-if="filteredOpportunities.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <p class="text-gray-500 text-lg mb-2">No opportunities found</p>
                    <p class="text-gray-400 text-sm mb-4">Try updating your preferences to see more matches</p>
                    <button @click="openPreferencesModal"
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Update Preferences
                    </button>
                </div>
            </div>
        </main>

        <!-- Bottom Navigation -->
        <Navbar />

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

        <!-- Opportunity Detail Modal -->
        <div v-if="showOpportunityDetail && selectedOpportunity" @click="closeOpportunityDetail"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 my-8 max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="flex items-start justify-between mb-6">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <span :class="getTypeBadgeClass(selectedOpportunity.type)"
                                class="px-3 py-1 text-xs font-semibold rounded-full">
                                {{ selectedOpportunity.type }}
                            </span>
                            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                {{ selectedOpportunity.matchScore }}% Match
                            </span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedOpportunity.title }}</h2>
                        <p class="text-lg text-gray-600 mb-2">{{ selectedOpportunity.company }}</p>
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                            <span class="flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{{ selectedOpportunity.location }}</span>
                            </span>
                            <span v-if="selectedOpportunity.salary || selectedOpportunity.stipend" class="flex items-center space-x-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                                <span>{{ selectedOpportunity.salary || selectedOpportunity.stipend }}</span>
                            </span>
                        </div>
                    </div>
                    <button @click="closeOpportunityDetail" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Description -->
                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
                    <p class="text-gray-700 leading-relaxed">
                        {{ selectedOpportunity.description || 'Join our dynamic team and contribute to exciting projects. We are looking for passionate individuals who are eager to learn and grow with us.' }}
                    </p>
                </div>

                <!-- Requirements -->
                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                    <ul class="space-y-2">
                        <li v-for="skill in selectedOpportunity.requiredSkills" :key="skill" class="flex items-start space-x-2">
                            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-gray-700">{{ skill }}</span>
                        </li>
                        <li v-if="selectedOpportunity.ageRequirement" class="flex items-start space-x-2">
                            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-gray-700">Age requirement: {{ selectedOpportunity.ageRequirement }} years old</span>
                        </li>
                    </ul>
                </div>

                <!-- Tags -->
                <div class="mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Tags</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in selectedOpportunity.tags" :key="tag"
                            class="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                            {{ tag }}
                        </span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-4">
                    <button v-if="!isApplied(selectedOpportunity.id)"
                        @click="applyToOpportunity(selectedOpportunity)"
                        class="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg">
                        🚀 Apply Now
                    </button>
                    <button v-else
                        class="flex-1 px-8 py-4 bg-green-100 text-green-700 font-bold rounded-xl cursor-not-allowed">
                        ✓ Already Applied
                    </button>
                    <button @click="closeOpportunityDetail"
                        class="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- Notifications Modal -->
        <div v-if="showNotifications" @click="showNotifications = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Notifications</h3>
                    <button @click="showNotifications = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div v-if="notifications.length > 0" class="space-y-3">
                    <div v-for="notif in notifications" :key="notif.id"
                        class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div class="flex-1">
                                <p class="font-semibold text-gray-900 text-sm">{{ notif.title }}</p>
                                <p class="text-gray-600 text-xs mt-1">{{ notif.message }}</p>
                                <p class="text-gray-400 text-xs mt-2">{{ notif.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-8">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                        </path>
                    </svg>
                    <p class="text-gray-500">No new notifications</p>
                </div>
            </div>
        </div>

        <!-- Preferences Modal -->
        <div v-if="showPreferencesModal" @click="showPreferencesModal = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Update Your Preferences</h3>
                    <button @click="showPreferencesModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select v-model="tempPreferences.location"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                            <option value="">Select location</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Bandung">Bandung</option>
                            <option value="Surabaya">Surabaya</option>
                            <option value="Yogyakarta">Yogyakarta</option>
                            <option value="Bali">Bali</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Career Industry</label>
                        <select v-model="tempPreferences.industry"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                            <option value="">Select industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                        <select v-model="tempPreferences.experience"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                            <option value="">Select experience</option>
                            <option value="Fresh Graduate">Fresh Graduate</option>
                            <option value="1-2 Years">1-2 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <input v-model="tempPreferences.age" type="number" placeholder="Enter your age"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                        <input v-model="tempPreferences.skillsInput" type="text"
                            placeholder="e.g. JavaScript, React, Node.js"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Certifications (comma separated)</label>
                        <input v-model="tempPreferences.certificationsInput" type="text"
                            placeholder="e.g. AWS Certified, Google Analytics"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                    </div>
                </div>

                <div class="flex space-x-4 mt-8">
                    <button @click="savePreferences"
                        class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                        Save Preferences
                    </button>
                    <button @click="showPreferencesModal = false"
                        class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <!-- Profile Modal -->
        <div v-if="showProfile" @click="showProfile = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div @click.stop class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div
                        class="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center">
                        {{ userInitial }}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">{{ user?.firstName || 'User' }} {{ user?.lastName ||
                            '' }}</h3>
                        <p class="text-gray-600">{{ user?.email }}</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <button @click="openPreferencesModal; showProfile = false"
                        class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition">
                        <span class="text-gray-700">⚙️ Preferences</span>
                    </button>
                    <button @click="handleLogout"
                        class="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition">
                        <span class="text-red-600">🚪 Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseData } from '~/composables/useSupabaseData'

const { fetchOpportunities } = useSupabaseData()

// ============================================
// User & Auth
// ============================================
const user = ref(null)
const showProfile = ref(false)
const showPreferencesModal = ref(false)
const showNotifications = ref(false)
const showOpportunityDetail = ref(false)
const selectedOpportunity = ref(null)
const appliedOpportunities = ref([])
const showSuccessToast = ref(false)
const toastMessage = ref('')

// ============================================
// Opportunities & Display
// ============================================
const allOpportunities = ref([])
const opportunityDisplayLimit = ref(6)
const opportunityFilters = ['All', 'Job', 'Internship', 'Scholarship']
const selectedFilter = ref('All')

// ============================================
// Goals Data
// ============================================
const personalGoalsCount = ref(0)
const mentorCount = ref(42)
const notificationCount = ref(3)
const notifications = ref([
    {
        id: 1,
        title: 'New Opportunity Match!',
        message: 'Frontend Developer position matches your profile 95%',
        time: '5 minutes ago'
    },
    {
        id: 2,
        title: 'Goal Reminder',
        message: 'Update your career goals this week',
        time: '2 hours ago'
    },
    {
        id: 3,
        title: 'Mentor Request',
        message: 'John Doe accepted your mentor connection request',
        time: '1 day ago'
    }
])

// ============================================
// Preferences
// ============================================
const preferences = ref({
    location: '',
    industry: '',
    experience: '',
    age: null,
    skills: [],
    certifications: []
})

const tempPreferences = ref({
    location: '',
    industry: '',
    experience: '',
    age: null,
    skillsInput: '',
    certificationsInput: ''
})

// ============================================
// Computed Properties
// ============================================
const userInitial = computed(() => {
    if (user.value?.firstName) {
        return user.value.firstName.charAt(0).toUpperCase()
    }
    return 'U'
})

const activeGoalsCount = computed(() => {
    const goals = JSON.parse(localStorage.getItem('user-goals') || '[]')
    personalGoalsCount.value = goals.length
    return goals.filter(g => !g.completed).length
})

const matchedOpportunitiesCount = computed(() => allOpportunities.value.length)

const profileCompleteness = computed(() => {
    let score = 0
    if (preferences.value.location) score += 20
    if (preferences.value.industry) score += 20
    if (preferences.value.experience) score += 20
    if (preferences.value.age) score += 20
    if (preferences.value.skills.length > 0) score += 20
    return score
})

const filteredOpportunities = computed(() => {
    if (selectedFilter.value === 'All' || !selectedFilter.value) {
        return allOpportunities.value
    }

    return allOpportunities.value.filter(opp => {
        const oppType = opp.type?.toLowerCase() || ''
        const filterType = selectedFilter.value.toLowerCase()
        return oppType === filterType
    })
})

const displayedOpportunities = computed(() => {
    return filteredOpportunities.value.slice(0, opportunityDisplayLimit.value)
})

// ============================================
// Methods
// ============================================
const openPreferencesModal = () => {
    tempPreferences.value = {
        location: preferences.value.location || '',
        industry: preferences.value.industry || '',
        experience: preferences.value.experience || '',
        age: preferences.value.age || null,
        skillsInput: preferences.value.skills?.join(', ') || '',
        certificationsInput: preferences.value.certifications?.join(', ') || ''
    }
    showPreferencesModal.value = true
}

const savePreferences = async () => {
    console.log('💾 Saving preferences...')

    preferences.value = {
        location: tempPreferences.value.location,
        industry: tempPreferences.value.industry,
        experience: tempPreferences.value.experience,
        age: tempPreferences.value.age,
        skills: tempPreferences.value.skillsInput ? tempPreferences.value.skillsInput.split(',').map(s => s.trim()) : [],
        certifications: tempPreferences.value.certificationsInput ? tempPreferences.value.certificationsInput.split(',').map(s => s.trim()) : []
    }

    console.log('✅ Updated preferences:', preferences.value)
    localStorage.setItem('user-preferences', JSON.stringify(preferences.value))

    showPreferencesModal.value = false
    selectedFilter.value = 'All'

    await loadOpportunities()

    toastMessage.value = 'Preferences updated! Reloading opportunities...'
    showSuccessToast.value = true
    setTimeout(() => {
        showSuccessToast.value = false
    }, 3000)

    console.log('🎉 Preferences saved and opportunities reloaded!')
}

const loadOpportunities = async () => {
    try {
        console.log('🔄 Loading opportunities with filters:', {
            location: preferences.value.location || 'All',
            experience: preferences.value.experience || 'All'
        })

        const response = await fetchOpportunities({
            type: null,
            location: preferences.value.location || null,
            experience: preferences.value.experience || null
        })

        console.log('📦 API Response:', response)

        if (response.success && response.data) {
            allOpportunities.value = response.data.map(opp => {
                return {
                    id: opp.id,
                    type: opp.job_type || 'Job',
                    title: opp.title || 'Untitled Opportunity',
                    company: opp.company || 'Company Name',
                    location: opp.location || 'Remote',
                    salary: opp.salary_range || '',
                    stipend: opp.stipend || '',
                    matchScore: opp.match_score || 85,
                    tags: Array.isArray(opp.tags) ? opp.tags : [],
                    ageRequirement: opp.age_requirement || '',
                    requiredSkills: Array.isArray(opp.required_skills) ? opp.required_skills : [],
                    description: opp.description || ''
                }
            })

            console.log(`✅ Loaded ${allOpportunities.value.length} opportunities`)
            opportunityDisplayLimit.value = 6

        } else {
            console.warn('⚠️ No opportunities found with current filters')
            allOpportunities.value = []
        }
    } catch (error) {
        console.error('❌ Error loading opportunities:', error)
        allOpportunities.value = []
    }
}

const loadMoreOpportunities = () => {
    opportunityDisplayLimit.value += 6
    console.log('📈 Load more opportunities. Now showing:', opportunityDisplayLimit.value)
}

const openOpportunityDetail = (opportunity) => {
    selectedOpportunity.value = opportunity
    showOpportunityDetail.value = true
}

const closeOpportunityDetail = () => {
    showOpportunityDetail.value = false
    selectedOpportunity.value = null
}

const applyToOpportunity = (opportunity) => {
    if (isApplied(opportunity.id)) {
        return
    }

    appliedOpportunities.value.push({
        id: opportunity.id,
        title: opportunity.title,
        company: opportunity.company,
        appliedAt: new Date().toISOString()
    })

    localStorage.setItem('applied-opportunities', JSON.stringify(appliedOpportunities.value))

    toastMessage.value = `Successfully applied to ${opportunity.title}!`
    showSuccessToast.value = true
    setTimeout(() => {
        showSuccessToast.value = false
    }, 3000)

    closeOpportunityDetail()
}

const isApplied = (opportunityId) => {
    return appliedOpportunities.value.some(app => app.id === opportunityId)
}

const toggleFavorite = (opportunityId) => {
    console.log('Toggle favorite:', opportunityId)
}

const getTypeBadgeClass = (type) => {
    switch (type) {
        case 'Job': return 'bg-green-100 text-green-700'
        case 'Internship': return 'bg-blue-100 text-blue-700'
        case 'Scholarship': return 'bg-purple-100 text-purple-700'
        default: return 'bg-gray-100 text-gray-700'
    }
}

const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    localStorage.removeItem('personal-info')
    localStorage.removeItem('user-preferences')
    localStorage.removeItem('user-goals')
    localStorage.removeItem('applied-opportunities')
    navigateTo('/')
}

// ============================================
// Lifecycle
// ============================================
onMounted(async () => {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('auth-user')
    const personalInfo = localStorage.getItem('personal-info')
    const savedPreferences = localStorage.getItem('user-preferences')
    const savedApplications = localStorage.getItem('applied-opportunities')

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

    if (savedPreferences) {
        preferences.value = JSON.parse(savedPreferences)
        tempPreferences.value = {
            location: preferences.value.location,
            industry: preferences.value.industry,
            experience: preferences.value.experience,
            age: preferences.value.age,
            skillsInput: preferences.value.skills?.join(', ') || '',
            certificationsInput: preferences.value.certifications?.join(', ') || ''
        }
    }

    if (savedApplications) {
        appliedOpportunities.value = JSON.parse(savedApplications)
    }

    const userGoals = JSON.parse(localStorage.getItem('user-goals') || '[]')
    personalGoalsCount.value = userGoals.length

    await loadOpportunities()
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

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
