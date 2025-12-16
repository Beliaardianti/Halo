<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {{ error }}
            </div>

            <div v-if="success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {{ success }}
            </div>

            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <NuxtLink to="/" class="mb-8 text-gray-600 hover:text-gray-800 flex items-center">
                    ← Kembali
                </NuxtLink>

                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Daftar ke HaLo Apps
                </h2>

                <div class="space-y-5">
                    <select v-model="registerForm.accountType"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="Personal">Personal</option>
                        <option value="Business">Business</option>
                    </select>

                    <input v-model="registerForm.email" type="email" placeholder="Email"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

                    <!-- Password Field with Toggle -->
                    <div>
                        <div class="relative">
                            <input 
                                v-model="registerForm.password" 
                                :type="showPassword ? 'text' : 'password'" 
                                placeholder="Password"
                                class="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                :class="{ 'border-red-300': passwordError }" 
                            />
                            <button 
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <!-- Eye Icon (Show) -->
                                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <!-- Eye Slash Icon (Hide) -->
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </button>
                        </div>

                        <!-- Password Strength Indicator -->
                        <div v-if="registerForm.password" class="mt-2 text-xs space-y-1">
                            <div :class="hasMinLength ? 'text-green-600' : 'text-gray-400'">
                                {{ hasMinLength ? '✓' : '○' }} Minimal 8 karakter
                            </div>
                            <div :class="hasLowerCase ? 'text-green-600' : 'text-gray-400'">
                                {{ hasLowerCase ? '✓' : '○' }} Huruf kecil (a-z)
                            </div>
                            <div :class="hasUpperCase ? 'text-green-600' : 'text-gray-400'">
                                {{ hasUpperCase ? '✓' : '○' }} Huruf besar (A-Z)
                            </div>
                            <div :class="hasNumber ? 'text-green-600' : 'text-gray-400'">
                                {{ hasNumber ? '✓' : '○' }} Angka (0-9)
                            </div>
                        </div>

                        <p v-if="passwordError" class="mt-1 text-xs text-red-600">
                            {{ passwordError }}
                        </p>
                    </div>

                    <!-- Confirm Password Field with Toggle -->
                    <div class="relative">
                        <input 
                            v-model="registerForm.confirmPassword" 
                            :type="showConfirmPassword ? 'text' : 'password'" 
                            placeholder="Konfirmasi Password"
                            class="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            :class="{ 'border-red-300': passwordMismatch }" 
                        />
                        <button 
                            type="button"
                            @click="showConfirmPassword = !showConfirmPassword"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <!-- Eye Icon (Show) -->
                            <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <!-- Eye Slash Icon (Hide) -->
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </button>
                    </div>

                    <p v-if="passwordMismatch" class="text-xs text-red-600">
                        Kata sandi tidak cocok
                    </p>

                    <button @click="handleRegister" :disabled="loading || !isPasswordValid || passwordMismatch"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="!loading">Selanjutnya</span>
                        <span v-else>Memproses...</span>
                    </button>
                </div>

                <div class="mt-6 text-center">
                    <p class="text-gray-600 text-sm">
                        Sudah punya akun?
                        <NuxtLink to="/login" class="text-blue-600 font-semibold">Masuk</NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const registerForm = ref({
    accountType: 'Personal',
    email: '',
    password: '',
    confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const passwordError = ref('')

// Toggle password visibility
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password validation computed properties
const hasMinLength = computed(() => registerForm.value.password.length >= 8)
const hasLowerCase = computed(() => /[a-z]/.test(registerForm.value.password))
const hasUpperCase = computed(() => /[A-Z]/.test(registerForm.value.password))
const hasNumber = computed(() => /[0-9]/.test(registerForm.value.password))

const isPasswordValid = computed(() => {
    return hasMinLength.value &&
        hasLowerCase.value &&
        hasUpperCase.value &&
        hasNumber.value
})

const passwordMismatch = computed(() => {
    return registerForm.value.confirmPassword &&
        registerForm.value.password &&
        registerForm.value.password !== registerForm.value.confirmPassword
})

// Validate password requirements
const validatePassword = () => {
    if (!registerForm.value.password) {
        passwordError.value = 'Password harus diisi'
        return false
    }

    if (!hasMinLength.value) {
        passwordError.value = 'Password minimal 8 karakter'
        return false
    }

    if (!hasLowerCase.value) {
        passwordError.value = 'Password harus mengandung huruf kecil'
        return false
    }

    if (!hasUpperCase.value) {
        passwordError.value = 'Password harus mengandung huruf besar'
        return false
    }

    if (!hasNumber.value) {
        passwordError.value = 'Password harus mengandung angka'
        return false
    }

    passwordError.value = ''
    return true
}

const handleRegister = async () => {
    // Clear previous errors
    error.value = ''
    passwordError.value = ''

    // Validate email
    if (!registerForm.value.email) {
        error.value = 'Email harus diisi'
        return
    }

    // Validate password
    if (!validatePassword()) {
        error.value = passwordError.value
        return
    }

    // Check password match
    if (passwordMismatch.value) {
        error.value = 'Kata sandi tidak cocok!'
        return
    }

    loading.value = true

    try {
        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                accountType: registerForm.value.accountType,
                email: registerForm.value.email,
                password: registerForm.value.password
            }
        })

        if (response.success) {
            // ✅ Simpan data ke localStorage
            localStorage.setItem('auth-token', response.data.token)
            localStorage.setItem('auth-user', JSON.stringify(response.data.user))
            
            // ✅ TAMBAH BARIS INI - Simpan user ID
            localStorage.setItem('user-id', response.data.user.id)

            console.log('✅ User registered:', response.data.user.id)

            success.value = 'Registrasi berhasil!'

            // Redirect ke personal info page
            setTimeout(() => {
                navigateTo('/personal-info')
            }, 1000)
        }
    } catch (err) {
        console.error('Register error:', err)
        error.value = err.data?.message || 'Registrasi gagal. Silakan coba lagi.'
    } finally {
        loading.value = false
    }
}
</script>