<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Alert Messages -->
            <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {{ error }}
            </div>

            <div v-if="success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {{ success }}
            </div>

            <div class="bg-white rounded-2xl shadow-2xl p-8">
                <!-- Progress Steps -->
                <div class="mb-8">
                    <div class="flex items-center justify-between">
                        <!-- Step 1 -->
                        <div class="flex items-center flex-1">
                            <div
                                class="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-semibold">
                                ✓
                            </div>
                            <div class="hidden sm:block ml-2 text-xs text-gray-600">Akun</div>
                        </div>

                        <!-- Connector Line -->
                        <div class="flex-1 h-1 bg-blue-200 mx-2"></div>

                        <!-- Step 2 -->
                        <div class="flex items-center flex-1 justify-end">
                            <div class="hidden sm:block mr-2 text-xs text-blue-600 font-medium">Info Pribadi</div>
                            <div
                                class="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                                2
                            </div>
                        </div>
                    </div>
                </div>

                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Informasi Pribadi
                </h2>

                <div class="space-y-5">
                    <!-- Nama Depan -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nama Depan <span class="text-red-500">*</span>
                        </label>
                        <input v-model="personalInfo.firstName" type="text" placeholder="Masukkan nama depan"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <!-- Nama Tengah -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nama Tengah <span class="text-gray-400 text-xs">(opsional)</span>
                        </label>
                        <input v-model="personalInfo.middleName" type="text" placeholder="Masukkan nama tengah"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <!-- Nama Belakang -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nama Belakang <span class="text-red-500">*</span>
                        </label>
                        <input v-model="personalInfo.lastName" type="text" placeholder="Masukkan nama belakang"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <!-- Nomor Telepon -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nomor Telepon <span class="text-red-500">*</span>
                        </label>
                        <input v-model="personalInfo.phone" type="tel" placeholder="Contoh: 081234567890"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            :class="{ 'border-red-300': phoneError }" />
                        <p class="mt-1 text-xs text-gray-500">Format: 08xxxxxxxxxx</p>
                        <p v-if="phoneError" class="mt-1 text-xs text-red-600">
                            {{ phoneError }}
                        </p>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="flex items-start pt-2">
                        <input type="checkbox" v-model="personalInfo.agree"
                            class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label class="ml-2 text-sm text-gray-700">
                            Saya menyetujui
                            <a href="#" class="text-blue-600 hover:underline">Syarat dan Ketentuan</a>
                            serta
                            <a href="#" class="text-blue-600 hover:underline">Kebijakan Privasi</a>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button @click="handleSubmit" :disabled="loading || !isFormValid"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-lg transition duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-8">
                        <span v-if="!loading">Daftar Akun</span>
                        <span v-else class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Memproses...
                        </span>
                    </button>
                </div>

                <div class="mt-6 text-center">
                    <button @click="navigateTo('/register')"
                        class="text-gray-600 hover:text-gray-800 text-sm transition">
                        ← Kembali ke registrasi
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const personalInfo = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    agree: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const phoneError = ref('')

// Check if user is authenticated
onMounted(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) {
        // Redirect to register if not authenticated
        navigateTo('/register')
    }
})

// Form validation
const isFormValid = computed(() => {
    return personalInfo.value.firstName &&
        personalInfo.value.lastName &&
        personalInfo.value.phone &&
        personalInfo.value.agree &&
        !phoneError.value
})

// Phone validation
watch(() => personalInfo.value.phone, (newPhone) => {
    if (!newPhone) {
        phoneError.value = ''
        return
    }

    const phoneRegex = /^08\d{8,11}$/
    if (!phoneRegex.test(newPhone)) {
        phoneError.value = 'Format nomor telepon tidak valid'
    } else {
        phoneError.value = ''
    }
})

const handleSubmit = async () => {
    // Clear previous errors
    error.value = ''

    // Validate required fields
    if (!personalInfo.value.firstName) {
        error.value = 'Nama depan harus diisi'
        return
    }

    if (!personalInfo.value.lastName) {
        error.value = 'Nama belakang harus diisi'
        return
    }

    if (!personalInfo.value.phone) {
        error.value = 'Nomor telepon harus diisi'
        return
    }

    // Validate phone format
    const phoneRegex = /^08\d{8,11}$/
    if (!phoneRegex.test(personalInfo.value.phone)) {
        error.value = 'Format nomor telepon tidak valid. Gunakan format: 08xxxxxxxxxx'
        return
    }

    if (!personalInfo.value.agree) {
        error.value = 'Anda harus menyetujui syarat dan ketentuan'
        return
    }

    loading.value = true

    try {
        // Get existing user data from localStorage
        const userData = localStorage.getItem('auth-user')
        const user = userData ? JSON.parse(userData) : {}

        // Update auth-user dengan data personal info
        const updatedUser = {
            ...user,
            firstName: personalInfo.value.firstName,
            middleName: personalInfo.value.middleName,
            lastName: personalInfo.value.lastName,
            phone: personalInfo.value.phone
        }

        // Save updated user to localStorage
        localStorage.setItem('auth-user', JSON.stringify(updatedUser))

        // Save personal info to localStorage
        localStorage.setItem('personal-info', JSON.stringify(personalInfo.value))

        // Optional: Send to backend API to update user profile
        // const token = localStorage.getItem('auth-token')
        // await $fetch('/api/user/update-profile', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: {
        //         userId: user?.id,
        //         ...personalInfo.value
        //     }
        // })

        success.value = 'Data berhasil disimpan!'

        // Redirect to dashboard after short delay
        setTimeout(() => {
            navigateTo('/dashboard')
        }, 1000)

    } catch (err) {
        console.error('Error saving personal info:', err)
        error.value = err.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
    } finally {
        loading.value = false
    }
}
</script>