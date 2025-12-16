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
                <NuxtLink to="/" class="mb-6 text-gray-600 hover:text-gray-800 flex items-center transition">
                    ← Kembali
                </NuxtLink>

                <!-- Judul -->
                <h2 class="text-3xl font-bold text-gray-800 mb-2">
                    {{ isForgot ? 'Lupa Password' : 'Masuk' }}
                </h2>
                <p class="text-gray-600 mb-8">
                    {{ isForgot
                        ? 'Masukkan email kamu untuk mengatur ulang password.'
                        : 'Selamat datang kembali!' }}
                </p>

                <!-- FORM LOGIN -->
                <div v-if="!isForgot" class="space-y-6">
                    <!-- Email -->
                    <div>
                        <input v-model="loginForm.email" type="email" placeholder="Email" @keyup.enter="handleLogin"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            :class="{ 'border-red-300': emailError }" />
                        <p v-if="emailError" class="mt-1 text-xs text-red-600">{{ emailError }}</p>
                    </div>

                    <!-- Password + Toggle Mata -->
                    <div class="relative">
                        <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Password" @keyup.enter="handleLogin"
                            class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            :class="{ 'border-red-300': passwordError }" />

                        <!-- Tombol Mata -->
                        <button type="button"
                            class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            @click="showPassword = !showPassword">
                            <span v-if="showPassword">🙈</span>
                            <span v-else>👁️</span>
                        </button>

                        <p v-if="passwordError" class="mt-1 text-xs text-red-600">
                            {{ passwordError }}
                        </p>

                        <!-- Link Lupa Password -->
                        <div class="text-right mt-2">
                            <button class="text-sm text-blue-600 hover:underline font-medium" @click="isForgot = true">
                                Lupa password?
                            </button>
                        </div>
                    </div>

                    <!-- Tombol Login -->
                    <button @click="handleLogin" :disabled="loading"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="!loading">Masuk</span>
                        <span v-else class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
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

                    <!-- Link ke Register -->
                    <div class="mt-6 text-center">
                        <p class="text-gray-600 text-sm">
                            Belum punya akun?
                            <NuxtLink to="/register" class="text-blue-600 font-semibold hover:underline">
                                Daftar sekarang
                            </NuxtLink>
                        </p>
                    </div>
                </div>

                <!-- FORM LUPA PASSWORD -->
                <div v-else class="space-y-6">
                    <div>
                        <input v-model="forgotEmail" type="email" placeholder="Email" @keyup.enter="handleForgot"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <button @click="handleForgot" :disabled="loading"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="!loading">Kirim Link Reset</span>
                        <span v-else class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0
                     0 5.373 0 12h4zm2 5.291A7.962
                     7.962 0 014 12H0c0 3.042
                     1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                        </span>
                    </button>

                    <div class="text-center">
                        <button class="text-sm text-gray-600 hover:text-blue-600 font-medium" @click="isForgot = false">
                            ← Kembali ke login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const loginForm = ref({
    email: '',
    password: ''
})
const forgotEmail = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')
const emailError = ref('')
const passwordError = ref('')
const isForgot = ref(false) // mode form

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const handleLogin = async () => {
    error.value = ''
    emailError.value = ''
    passwordError.value = ''

    if (!loginForm.value.email) {
        emailError.value = 'Email harus diisi'
        error.value = 'Email harus diisi'
        return
    }

    if (!validateEmail(loginForm.value.email)) {
        emailError.value = 'Format email tidak valid'
        error.value = 'Format email tidak valid'
        return
    }

    if (!loginForm.value.password) {
        passwordError.value = 'Password harus diisi'
        error.value = 'Password harus diisi'
        return
    }

    if (loginForm.value.password.length < 6) {
        passwordError.value = 'Password minimal 6 karakter'
        error.value = 'Password minimal 6 karakter'
        return
    }

    loading.value = true

    try {
        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: loginForm.value.email,
                password: loginForm.value.password
            }
        })

        if (response.success) {
            localStorage.setItem('auth-token', response.data.token)
            localStorage.setItem('auth-user', JSON.stringify(response.data.user))
            success.value = 'Login berhasil! Mengalihkan...'
            setTimeout(() => navigateTo('/dashboard'), 1000)
        } else {
            error.value = response.message || 'Login gagal'
        }
    } catch (err) {
        console.error('Login error:', err)
        if (err.data?.message) {
            error.value = err.data.message
        } else if ([400, 401].includes(err.statusCode)) {
            error.value = 'Email atau password salah'
        } else {
            error.value = 'Terjadi kesalahan. Silakan coba lagi.'
        }
    } finally {
        loading.value = false
    }
}

const handleForgot = async () => {
    error.value = ''
    success.value = ''

    // Validasi email
    if (!forgotEmail.value) {
        error.value = 'Email harus diisi'
        return
    }

    if (!validateEmail(forgotEmail.value)) {
        error.value = 'Format email tidak valid'
        return
    }

    loading.value = true

    try {
        // Call API Supabase forgot password
        const response = await $fetch('/api/auth/forgot-password', {
            method: 'POST',
            body: {
                email: forgotEmail.value
            }
        })

        if (response.success) {
            success.value = `Link reset password telah dikirim ke ${forgotEmail.value}. Silakan cek inbox atau folder spam Anda.`

            // Clear form
            forgotEmail.value = ''

            // Kembali ke form login setelah 5 detik
            setTimeout(() => {
                isForgot.value = false
                success.value = ''
            }, 5000)
        } else {
            error.value = response.message || 'Gagal mengirim email reset password'
        }
    } catch (err) {
        console.error('Forgot password error:', err)


        success.value = `Jika email ${forgotEmail.value} terdaftar, link reset password akan dikirim.`

        // Clear form
        forgotEmail.value = ''

        // Kembali ke form login setelah 5 detik
        setTimeout(() => {
            isForgot.value = false
            success.value = ''
        }, 5000)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    const token = localStorage.getItem('auth-token')
    if (token) navigateTo('/dashboard')
})
</script>
