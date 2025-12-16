<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Logo -->
            <div class="text-center mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                    <span class="bg-gray-800 text-white px-3 py-1 rounded">Ha</span>Lo
                </h1>
            </div>

            <!-- Illustration -->
            <div class="mb-8">
                <div class="flex justify-center items-center space-x-4 mb-6">
                    <div class="relative">
                        <!-- Person 1 -->
                        <div
                            class="w-24 h-24 md:w-32 md:h-32 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg class="w-16 h-16 md:w-20 md:h-20 text-blue-600" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <!-- Chat bubble -->
                        <div class="absolute -top-4 -right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg">
                            💬
                        </div>
                    </div>

                    <!-- Document icon -->
                    <div class="bg-amber-400 p-4 rounded-lg shadow-lg transform rotate-6">
                        <svg class="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>

                    <div class="relative">
                        <!-- Person 2 -->
                        <div
                            class="w-24 h-24 md:w-32 md:h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                            <svg class="w-16 h-16 md:w-20 md:h-20 text-indigo-600" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <!-- Red badge -->
                        <div class="absolute -top-4 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
                            🔔
                        </div>
                    </div>
                </div>
            </div>

            <!-- Welcome Text -->
            <div class="text-center mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    Selamat Datang di HaLo App!
                </h2>
                <p class="text-gray-600 text-sm md:text-base px-4">
                    Yuk kenalan dengan Kami sebagai temanmu untuk berkelana menjelajahi dunia.
                </p>
            </div>

            <!-- Pagination dots -->
            <div class="flex justify-center space-x-2 mb-8">
                <div class="w-8 h-1 bg-blue-600 rounded-full"></div>
                <div class="w-2 h-1 bg-gray-300 rounded-full"></div>
                <div class="w-2 h-1 bg-gray-300 rounded-full"></div>
            </div>

            <!-- Buttons -->
            <div class="space-y-3">
                <NuxtLink to="/login"
                    class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center">
                    Masuk
                </NuxtLink>
                <NuxtLink to="/register"
                    class="block w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-6 rounded-lg border-2 border-blue-600 transition duration-200 shadow hover:shadow-lg transform hover:-translate-y-0.5 text-center">
                    Daftar
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
// Set page meta
definePageMeta({
    layout: false
})
</script>
