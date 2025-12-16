<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Alert -->
            <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {{ error }}
            </div>
            <div v-if="success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {{ success }}
            </div>

            <div class="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300">
                <!-- Loading State (saat exchange token) -->
                <div v-if="exchangingToken" class="text-center py-8">
                    <div class="mb-4">
                        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>
                    <p class="text-gray-600">Memverifikasi link reset password...</p>
                </div>

                <!-- Success State -->
                <div v-else-if="success" class="text-center">
                    <div class="mb-6">
                        <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Password Berhasil Direset!</h2>
                    <p class="text-gray-600 mb-6">Anda akan diarahkan ke halaman login...</p>
                </div>

                <!-- Form State -->
                <div v-else-if="!error">
                    <NuxtLink to="/login" class="mb-6 text-gray-600 hover:text-gray-800 flex items-center transition">
                        ← Kembali ke Login
                    </NuxtLink>

                    <h2 class="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                    <p class="text-gray-600 mb-8">Masukkan password baru Anda</p>

                    <form @submit.prevent="handleReset" class="space-y-6">
                        <!-- Password Baru -->
                        <div class="relative">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Password Baru (minimal 6 karakter)"
                                class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                :class="{ 'border-red-300': passwordError }" />

                            <!-- Toggle Mata -->
                            <button type="button"
                                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                @click="showPassword = !showPassword">
                                <span v-if="showPassword">🙈</span>
                                <span v-else>👁️</span>
                            </button>

                            <p v-if="passwordError" class="mt-1 text-xs text-red-600">{{ passwordError }}</p>
                        </div>

                        <!-- Password Strength Indicator -->
                        <div v-if="password" class="space-y-2">
                            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div class="h-full transition-all duration-300" :class="passwordStrengthColor"
                                    :style="{ width: passwordStrengthPercentage + '%' }"></div>
                            </div>
                            <p class="text-xs" :class="passwordStrengthTextColor">
                                {{ passwordStrengthText }}
                            </p>
                        </div>

                        <!-- Konfirmasi Password -->
                        <div class="relative">
                            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                                placeholder="Konfirmasi Password"
                                class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                :class="{ 'border-red-300': confirmPasswordError }" />

                            <!-- Toggle Mata -->
                            <button type="button"
                                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                @click="showConfirmPassword = !showConfirmPassword">
                                <span v-if="showConfirmPassword">🙈</span>
                                <span v-else>👁️</span>
                            </button>

                            <p v-if="confirmPasswordError" class="mt-1 text-xs text-red-600">{{ confirmPasswordError }}
                            </p>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" :disabled="loading"
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!loading">Reset Password</span>
                            <span v-else class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0
                         0 5.373 0 12h4zm2 5.291A7.962
                         7.962 0 014 12H0c0 3.042
                         1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses...
                            </span>
                        </button>
                    </form>
                </div>

                <!-- Error State -->
                <div v-else class="text-center py-4">
                    <div class="mb-4">
                        <svg class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <NuxtLink to="/login" class="inline-block mt-4 text-blue-600 hover:underline font-medium">
                        Kembali ke Login
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const { $supabase } = useNuxtApp()
const route = useRoute()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const exchangingToken = ref(true)
const error = ref('')
const success = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

// Password strength checker
const passwordStrength = computed(() => {
    const pass = password.value
    let strength = 0

    if (pass.length >= 6) strength++
    if (pass.length >= 8) strength++
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++
    if (/\d/.test(pass)) strength++
    if (/[^a-zA-Z0-9]/.test(pass)) strength++

    return strength
})

const passwordStrengthPercentage = computed(() => {
    return (passwordStrength.value / 5) * 100
})

const passwordStrengthColor = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
})

const passwordStrengthTextColor = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return 'text-red-600'
    if (strength <= 3) return 'text-yellow-600'
    return 'text-green-600'
})

const passwordStrengthText = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return 'Password Lemah'
    if (strength <= 3) return 'Password Sedang'
    return 'Password Kuat'
})

const handleReset = async () => {
    // Reset errors
    error.value = ''
    passwordError.value = ''
    confirmPasswordError.value = ''

    // Validasi
    if (!password.value) {
        passwordError.value = 'Password harus diisi'
        error.value = 'Password harus diisi'
        return
    }

    if (password.value.length < 6) {
        passwordError.value = 'Password minimal 6 karakter'
        error.value = 'Password minimal 6 karakter'
        return
    }

    if (!confirmPassword.value) {
        confirmPasswordError.value = 'Konfirmasi password harus diisi'
        error.value = 'Konfirmasi password harus diisi'
        return
    }

    if (password.value !== confirmPassword.value) {
        confirmPasswordError.value = 'Password tidak cocok'
        error.value = 'Password dan konfirmasi password tidak cocok'
        return
    }

    loading.value = true

    try {
        // Update password menggunakan Supabase
        const { data, error: updateError } = await $supabase.auth.updateUser({
            password: password.value
        })

        if (updateError) {
            throw updateError
        }

        if (data.user) {
            success.value = 'Password berhasil direset! Mengalihkan ke halaman login...'

            // Sign out user setelah reset password
            await $supabase.auth.signOut()

            // Redirect ke login setelah 3 detik
            setTimeout(() => {
                navigateTo('/login')
            }, 3000)
        } else {
            throw new Error('Gagal update password')
        }
    } catch (err) {
        console.error('Reset password error:', err)

        if (err.message?.includes('same password')) {
            error.value = 'Password baru tidak boleh sama dengan password lama'
        } else {
            error.value = err.message || 'Terjadi kesalahan. Silakan coba lagi.'
        }
    } finally {
        loading.value = false
    }
}


onMounted(async () => {
    exchangingToken.value = true

    try {
        // Supabase mengirim token di URL hash (#access_token=...)
        // Kita perlu explicitly exchange token ini

        // Get hash dari URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        console.log('URL params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type })

        if (type === 'recovery' && accessToken) {
            // Exchange token dengan Supabase untuk mendapatkan session
            const { data, error: sessionError } = await $supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken || ''
            })

            if (sessionError) {
                throw sessionError
            }

            if (data.session) {
                console.log('Session successfully set!')
                exchangingToken.value = false
            } else {
                throw new Error('Failed to set session')
            }
        } else {
            // Coba check session yang ada
            const { data: sessionData } = await $supabase.auth.getSession()

            if (sessionData.session) {
                console.log('Existing session found!')
                exchangingToken.value = false
            } else {
                throw new Error('No valid recovery token found in URL')
            }
        }
    } catch (err) {
        console.error('Token exchange error:', err)
        exchangingToken.value = false
        error.value = 'Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru dari halaman login.'
    }
})
</script>

