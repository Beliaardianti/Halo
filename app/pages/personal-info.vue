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
                        <div class="flex items-center flex-1">
                            <div class="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-semibold">
                                ✓
                            </div>
                            <div class="hidden sm:block ml-2 text-xs text-gray-600">Akun</div>
                        </div>
                        <div class="flex-1 h-1 bg-blue-200 mx-2"></div>
                        <div class="flex items-center flex-1 justify-end">
                            <div class="hidden sm:block mr-2 text-xs text-blue-600 font-medium">Info Pribadi</div>
                            <div class="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                                2
                            </div>
                        </div>
                    </div>
                </div>

                <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Informasi Pribadi
                </h2>

                <div class="space-y-5">
                    <!-- Account Type -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Tipe Akun <span class="text-red-500">*</span>
                        </label>
                        <select 
                            v-model="accountType"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        >
                            <option value="user">Personal</option>
                            <option value="employer">Business</option>
                        </select>
                        <p class="mt-1 text-xs text-gray-500">Selected: {{ accountType }}</p>
                    </div>

                    <!-- Nama Depan -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nama Depan <span class="text-red-500">*</span>
                        </label>
                        <input v-model="firstName" type="text" placeholder="Masukkan nama depan"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <!-- Nama Tengah -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nama Tengah <span class="text-gray-400 text-xs">(opsional)</span>
                        </label>
                        <input v-model="middleName" type="text" placeholder="Masukkan nama tengah"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <!-- Nama Belakang -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nama Belakang <span class="text-red-500">*</span>
                        </label>
                        <input v-model="lastName" type="text" placeholder="Masukkan nama belakang"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                    </div>

                    <!-- Nomor Telepon -->
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">
                            Nomor Telepon <span class="text-red-500">*</span>
                        </label>
                        <input v-model="phone" type="tel" placeholder="Contoh: 081234567890"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            :class="{ 'border-red-300': phoneError }" />
                        <p class="mt-1 text-xs text-gray-500">Format: 08xxxxxxxxxx</p>
                        <p v-if="phoneError" class="mt-1 text-xs text-red-600">{{ phoneError }}</p>
                    </div>

                    <!-- Terms -->
                    <div class="flex items-start pt-2">
                        <input type="checkbox" v-model="agree"
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
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Memproses...
                        </span>
                    </button>
                </div>

                <div class="mt-6 text-center">
                    <button @click="navigateTo('/register')" class="text-gray-600 hover:text-gray-800 text-sm transition">
                        ← Kembali ke registrasi
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Separate ref untuk setiap field
const accountType = ref('user')
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const phone = ref('')
const agree = ref(false)

const loading = ref(false)
const error = ref('')
const success = ref('')
const phoneError = ref('')
const userId = ref(null)

onMounted(() => {
    const id = localStorage.getItem('user-id')
    if (!id) {
        navigateTo('/register')
        return
    }
    userId.value = id
    console.log('✅ User ID:', id)
})

const isFormValid = computed(() => {
    return accountType.value && firstName.value && lastName.value && phone.value && agree.value && !phoneError.value
})

watch(phone, (newPhone) => {
    if (!newPhone) {
        phoneError.value = ''
        return
    }
    const phoneRegex = /^08\d{8,11}$/
    phoneError.value = phoneRegex.test(newPhone) ? '' : 'Format nomor telepon tidak valid'
})

const handleSubmit = async () => {
    error.value = ''
    
    console.log('=== DEBUG START ===')
    console.log('accountType value:', accountType.value)
    console.log('accountType type:', typeof accountType.value)
    console.log('=== DEBUG END ===')

    if (!accountType.value || !firstName.value || !lastName.value || !phone.value || !agree.value) {
        error.value = 'Mohon lengkapi semua field yang wajib diisi'
        return
    }

    if (phoneError.value) {
        error.value = phoneError.value
        return
    }

    if (!userId.value) {
        error.value = 'User tidak ditemukan. Silakan login ulang.'
        return
    }

    loading.value = true

    try {
        const payload = {
            user_id: userId.value,
            account_type: accountType.value, // PASTI 'user' atau 'employer'
            first_name: firstName.value,
            middle_name: middleName.value || null,
            last_name: lastName.value,
            phone: phone.value
        }

        console.log('📤 Sending payload:', JSON.stringify(payload, null, 2))

        const response = await $fetch('/api/auth/update-profile', {
            method: 'POST',
            body: payload
        })

        console.log('✅ Success:', response)

        success.value = 'Data berhasil disimpan!'
        
        setTimeout(() => {
            navigateTo('/dashboard')
        }, 1500)

    } catch (err) {
        console.error('❌ Error:', err)
        error.value = err.data?.message || err.message || 'Terjadi kesalahan'
    } finally {
        loading.value = false
    }
}
</script>