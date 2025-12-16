<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <NuxtLink to="/dashboard" class="text-gray-600 hover:text-gray-800 flex items-center mb-4">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Dashboard
                </NuxtLink>
                <h1 class="text-3xl font-bold text-gray-800">Pengaturan Profil</h1>
                <p class="text-gray-600 mt-2">Lengkapi profil Anda untuk menjadi mentor atau mencari mentor</p>
            </div>

            <!-- Alert -->
            <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {{ error }}
            </div>
            <div v-if="success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {{ success }}
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white rounded-t-2xl shadow-sm border-b overflow-x-auto">
                <div class="flex space-x-1 p-2 min-w-max">
                    <button @click="activeTab = 'photo'"
                        :class="activeTab === 'photo' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="py-3 px-4 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Foto Profil
                    </button>
                    <button @click="activeTab = 'account'"
                        :class="activeTab === 'account' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="py-3 px-4 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Akun
                    </button>
                    <button @click="activeTab = 'biodata'"
                        :class="activeTab === 'biodata' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="py-3 px-4 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Biodata
                    </button>
                    <button @click="activeTab = 'education'"
                        :class="activeTab === 'education' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="py-3 px-4 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        Pendidikan
                    </button>
                    <button @click="activeTab = 'experience'"
                        :class="activeTab === 'experience' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="py-3 px-4 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Pengalaman
                    </button>
                </div>
            </div>

            <!-- Tab Content -->
            <div class="bg-white rounded-b-2xl shadow-2xl p-8">
                <!-- PHOTO TAB -->
                <div v-if="activeTab === 'photo'" class="space-y-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Foto Profil</h2>

                    <div class="flex flex-col items-center space-y-6">
                        <!-- Current Photo -->
                        <div class="relative">
                            <img v-if="photoForm.photoUrl" :src="photoForm.photoUrl" alt="Profile"
                                class="w-48 h-48 rounded-full object-cover border-4 border-blue-100" />
                            <div v-else
                                class="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold border-4 border-blue-100">
                                {{ avatarInitials }}
                            </div>

                            <!-- Upload Button Overlay -->
                            <button @click="$refs.photoInput.click()"
                                class="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        <!-- File Input (Hidden) -->
                        <input ref="photoInput" type="file" accept="image/*" @change="handlePhotoUpload"
                            class="hidden" />

                        <!-- Upload Info -->
                        <div class="text-center">
                            <p class="text-sm text-gray-600 mb-2">Format: JPG, PNG, atau GIF</p>
                            <p class="text-sm text-gray-600">Ukuran maksimal: 5MB</p>
                        </div>

                        <!-- Upload Progress -->
                        <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-full max-w-md">
                            <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div class="bg-blue-600 h-full transition-all duration-300"
                                    :style="{ width: uploadProgress + '%' }"></div>
                            </div>
                            <p class="text-sm text-center mt-2 text-gray-600">Uploading... {{ uploadProgress }}%</p>
                        </div>

                        <!-- Save Button -->
                        <button v-if="photoForm.photoUrl" @click="savePhoto"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Simpan Foto Profil
                        </button>
                    </div>
                </div>

                <!-- ACCOUNT TAB -->
                <div v-if="activeTab === 'account'" class="space-y-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Informasi Akun</h2>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Email <span class="text-red-500">*</span>
                        </label>
                        <input v-model="accountForm.email" type="email"
                            class="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed text-gray-600"
                            disabled />
                        <p class="mt-1 text-xs text-gray-500">Email tidak dapat diubah</p>
                    </div>

                    <!-- Full Name -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Nama Depan <span class="text-red-500">*</span>
                            </label>
                            <input v-model="accountForm.firstName" type="text"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Nama Tengah
                            </label>
                            <input v-model="accountForm.middleName" type="text"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Nama Belakang <span class="text-red-500">*</span>
                            </label>
                            <input v-model="accountForm.lastName" type="text"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Nomor Telepon <span class="text-red-500">*</span>
                        </label>
                        <input v-model="accountForm.phone" type="tel" placeholder="08xxxxxxxxxx"
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <!-- Change Password Section -->
                    <div class="bg-gray-50 rounded-lg p-6 mt-8 space-y-4">
                        <h3 class="font-semibold text-gray-800">Ubah Password</h3>

                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                            <input v-model="accountForm.newPassword" :type="showPassword ? 'text' : 'password'"
                                placeholder="Minimal 8 karakter"
                                class="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-[42px] text-gray-500">
                                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>

                        <div class="relative">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                            <input v-model="accountForm.confirmPassword" :type="showPassword ? 'text' : 'password'"
                                class="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <button @click="saveAccount" :disabled="loadingAccount"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span v-if="loadingAccount">Menyimpan...</span>
                        <span v-else>Simpan Perubahan</span>
                    </button>
                </div>

                <!-- BIODATA TAB -->
                <div v-if="activeTab === 'biodata'" class="space-y-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Biodata Lengkap</h2>

                    <!-- Bio -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Bio / Tentang Saya <span class="text-red-500">*</span>
                        </label>
                        <textarea v-model="biodataForm.bio" rows="4"
                            placeholder="Ceritakan tentang diri Anda, keahlian, dan minat..."
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                        <p class="mt-1 text-xs text-gray-500">{{ biodataForm.bio?.length || 0 }} / 500 karakter</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Date of Birth -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Lahir <span class="text-red-500">*</span>
                            </label>
                            <input v-model="biodataForm.dateOfBirth" type="date"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <!-- Gender -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Jenis Kelamin <span class="text-red-500">*</span>
                            </label>
                            <select v-model="biodataForm.gender"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Pilih...</option>
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>

                        <!-- City -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Kota <span class="text-red-500">*</span>
                            </label>
                            <input v-model="biodataForm.city" type="text" placeholder="Jakarta"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <!-- Country -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Negara <span class="text-red-500">*</span>
                            </label>
                            <input v-model="biodataForm.country" type="text" placeholder="Indonesia"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <!-- LinkedIn -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                LinkedIn URL
                            </label>
                            <input v-model="biodataForm.linkedin" type="url"
                                placeholder="https://linkedin.com/in/username"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <!-- Portfolio -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Portfolio / Website
                            </label>
                            <input v-model="biodataForm.portfolio" type="url" placeholder="https://yoursite.com"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <button @click="saveBiodata" :disabled="loadingBiodata"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span v-if="loadingBiodata">Menyimpan...</span>
                        <span v-else>Simpan Biodata</span>
                    </button>
                </div>

                <!-- EDUCATION TAB -->
                <div v-if="activeTab === 'education'" class="space-y-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Riwayat Pendidikan</h2>
                        <button @click="openEducationModal()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Pendidikan
                        </button>
                    </div>

                    <!-- Education List -->
                    <div v-if="educationList.length === 0" class="text-center py-12 text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        <p class="text-lg mb-2">Belum ada riwayat pendidikan</p>
                        <p class="text-sm">Klik "Tambah Pendidikan" untuk memulai</p>
                    </div>

                    <div v-for="(edu, index) in educationList" :key="index" class="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-semibold text-gray-800">{{ edu.institution }}</h3>
                                <p class="text-sm text-gray-600">{{ edu.fieldOfStudy }} - {{ edu.degree }}</p>
                            </div>
                            <div class="flex gap-2">
                                <button @click="editEducation(index)"
                                    class="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button @click="removeEducation(index)"
                                    class="text-red-600 hover:text-red-700 flex items-center gap-1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>

                    <button @click="saveEducation" :disabled="loadingEducation"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span v-if="loadingEducation">Menyimpan...</span>
                        <span v-else>Simpan Pendidikan</span>
                    </button>
                </div>

                <!-- EXPERIENCE TAB -->
                <div v-if="activeTab === 'experience'" class="space-y-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Pengalaman Kerja</h2>
                        <button @click="openExperienceModal()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Pengalaman
                        </button>
                    </div>

                    <!-- Experience List -->
                    <div v-if="experienceList.length === 0" class="text-center py-12 text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p class="text-lg mb-2">Belum ada pengalaman kerja</p>
                        <p class="text-sm">Klik "Tambah Pengalaman" untuk memulai</p>
                    </div>

                    <div v-for="(exp, index) in experienceList" :key="index"
                        class="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-semibold text-gray-800">{{ exp.position }}</h3>
                                <p class="text-sm text-gray-600">{{ exp.company }} • {{ exp.employmentType }}</p>
                            </div>
                            <div class="flex gap-2">
                                <button @click="editExperience(index)"
                                    class="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                                <button @click="removeExperience(index)"
                                    class="text-red-600 hover:text-red-700 flex items-center gap-1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>

                    <button @click="saveExperience" :disabled="loadingExperience"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span v-if="loadingExperience">Menyimpan...</span>
                        <span v-else>Simpan Pengalaman</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- EDUCATION MODAL -->
        <div v-if="showEducationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-gray-800">
                        {{ editingEducationIndex !== null ? 'Edit Pendidikan' : 'Tambah Pendidikan' }}
                    </h2>
                    <button @click="closeEducationModal()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-6 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Institusi *</label>
                            <input v-model="currentEducation.institution" type="text" placeholder="Universitas Indonesia"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Jenjang *</label>
                            <select v-model="currentEducation.degree"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Pilih...</option>
                                <option value="SMA/SMK">SMA/SMK</option>
                                <option value="D3">D3</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Jurusan *</label>
                            <input v-model="currentEducation.fieldOfStudy" type="text" placeholder="Teknik Informatika"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">IPK/Nilai</label>
                            <input v-model="currentEducation.gpa" type="text" placeholder="3.75"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Mulai *</label>
                            <input v-model="currentEducation.startYear" type="number" placeholder="2020"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Selesai</label>
                            <input v-model="currentEducation.endYear" type="number" placeholder="2024" :disabled="currentEducation.isCurrent"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100" />
                        </div>

                        <div class="md:col-span-2 flex items-center">
                            <input v-model="currentEducation.isCurrent" type="checkbox" class="w-4 h-4 text-blue-600" />
                            <label class="ml-2 text-sm text-gray-700">Masih bersekolah/kuliah disini</label>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                            <textarea v-model="currentEducation.description" rows="3"
                                placeholder="Aktivitas, prestasi, atau pencapaian..."
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                        </div>
                    </div>
                </div>

                <div class="sticky bottom-0 bg-gray-50 border-t p-6 flex gap-3">
                    <button @click="closeEducationModal()"
                        class="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
                        Batal
                    </button>
                    <button @click="saveEducationItem"
                        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition">
                        {{ editingEducationIndex !== null ? 'Perbarui' : 'Tambah' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- EXPERIENCE MODAL -->
        <div v-if="showExperienceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-gray-800">
                        {{ editingExperienceIndex !== null ? 'Edit Pengalaman' : 'Tambah Pengalaman' }}
                    </h2>
                    <button @click="closeExperienceModal()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-6 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Posisi/Jabatan *</label>
                            <input v-model="currentExperience.position" type="text" placeholder="Software Engineer"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Perusahaan *</label>
                            <input v-model="currentExperience.company" type="text" placeholder="PT. Example Indonesia"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tipe Pekerjaan</label>
                            <select v-model="currentExperience.employmentType"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Pilih...</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                            <input v-model="currentExperience.location" type="text" placeholder="Jakarta, Indonesia"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Mulai *</label>
                            <input v-model="currentExperience.startDate" type="month"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Selesai</label>
                            <input v-model="currentExperience.endDate" type="month" :disabled="currentExperience.isCurrent"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100" />
                        </div>

                        <div class="md:col-span-2 flex items-center">
                            <input v-model="currentExperience.isCurrent" type="checkbox" class="w-4 h-4 text-blue-600" />
                            <label class="ml-2 text-sm text-gray-700">Saya masih bekerja disini</label>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Pekerjaan *</label>
                            <textarea v-model="currentExperience.description" rows="4"
                                placeholder="Jelaskan tanggung jawab, pencapaian, dan kontribusi Anda..."
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                        </div>
                    </div>
                </div>

                <div class="sticky bottom-0 bg-gray-50 border-t p-6 flex gap-3">
                    <button @click="closeExperienceModal()"
                        class="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
                        Batal
                    </button>
                    <button @click="saveExperienceItem"
                        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition">
                        {{ editingExperienceIndex !== null ? 'Perbarui' : 'Tambah' }}
                    </button>
                </div>
            </div>
        </div>

        <navbar/>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp()

const activeTab = ref('photo')
const error = ref('')
const success = ref('')
const loadingAccount = ref(false)
const loadingBiodata = ref(false)
const loadingEducation = ref(false)
const loadingExperience = ref(false)
const uploadProgress = ref(0)
const showPassword = ref(false)

// Photo Form
const photoForm = ref({
    photoUrl: ''
})

// Account Form
const accountForm = ref({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    newPassword: '',
    confirmPassword: ''
})

// Biodata Form
const biodataForm = ref({
    bio: '',
    dateOfBirth: '',
    gender: '',
    height: null,
    weight: null,
    address: '',
    city: '',
    country: 'Indonesia',
    linkedin: '',
    portfolio: ''
})

const educationList = ref([])
const experienceList = ref([])

const avatarInitials = computed(() => {
    if (!accountForm.value) return '?'
    const first = accountForm.value.firstName?.charAt(0) || ''
    const last = accountForm.value.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || '?'
})

// PHOTO FUNCTIONS
const handlePhotoUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
        error.value = 'File harus berupa gambar'
        return
    }

    if (file.size > 5 * 1024 * 1024) {
        error.value = 'Ukuran file maksimal 5MB'
        return
    }

    try {
        uploadProgress.value = 10
        const reader = new FileReader()
        reader.onload = (e) => {
            photoForm.value.photoUrl = e.target.result
        }
        reader.readAsDataURL(file)
        uploadProgress.value = 50
        uploadProgress.value = 100
        setTimeout(() => { uploadProgress.value = 0 }, 2000)
        success.value = 'Foto berhasil diupload! Jangan lupa klik Simpan.'
    } catch (err) {
        console.error('Upload error:', err)
        error.value = 'Gagal upload foto'
        uploadProgress.value = 0
    }
}

const savePhoto = () => {
    error.value = ''
    localStorage.setItem('profile-photo', photoForm.value.photoUrl)
    success.value = 'Foto profil berhasil disimpan!'
    setTimeout(() => { success.value = '' }, 3000)
}

// ACCOUNT FUNCTIONS
const saveAccount = async () => {
    error.value = ''
    success.value = ''

    if (!accountForm.value.firstName || !accountForm.value.lastName || !accountForm.value.phone) {
        error.value = 'Nama dan nomor telepon wajib diisi'
        return
    }

    loadingAccount.value = true

    try {
        localStorage.setItem('account-info', JSON.stringify(accountForm.value))

        // Update auth-user juga
        const userData = JSON.parse(localStorage.getItem('auth-user') || '{}')
        userData.firstName = accountForm.value.firstName
        userData.middleName = accountForm.value.middleName
        userData.lastName = accountForm.value.lastName
        userData.phone = accountForm.value.phone
        localStorage.setItem('auth-user', JSON.stringify(userData))

        if (accountForm.value.newPassword) {
            if (accountForm.value.newPassword !== accountForm.value.confirmPassword) {
                error.value = 'Password tidak cocok'
                loadingAccount.value = false
                return
            }

            const { error: pwError } = await $supabase.auth.updateUser({
                password: accountForm.value.newPassword
            })

            if (pwError) throw pwError

            accountForm.value.newPassword = ''
            accountForm.value.confirmPassword = ''
        }

        success.value = 'Informasi akun berhasil disimpan!'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
        console.error('Save account error:', err)
        error.value = 'Gagal menyimpan data'
    } finally {
        loadingAccount.value = false
    }
}

// BIODATA FUNCTIONS
const saveBiodata = () => {
    error.value = ''
    success.value = ''

    if (!biodataForm.value.bio || !biodataForm.value.city || !biodataForm.value.country) {
        error.value = 'Bio, kota, dan negara wajib diisi'
        return
    }

    loadingBiodata.value = true

    setTimeout(() => {
        localStorage.setItem('biodata-info', JSON.stringify(biodataForm.value))

        // Update auth-user dengan nama dari account form
        const userData = JSON.parse(localStorage.getItem('auth-user') || '{}')
        userData.firstName = accountForm.value.firstName
        userData.middleName = accountForm.value.middleName
        userData.lastName = accountForm.value.lastName
        userData.phone = accountForm.value.phone
        localStorage.setItem('auth-user', JSON.stringify(userData))

        success.value = 'Biodata berhasil disimpan!'
        loadingBiodata.value = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1000)
}

// EDUCATION MODAL
const showEducationModal = ref(false)
const editingEducationIndex = ref(null)
const currentEducation = ref({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    gpa: '',
    startYear: '',
    endYear: '',
    isCurrent: false,
    description: ''
})
const showExperienceModal = ref(false)
const editingExperienceIndex = ref(null)
const currentExperience = ref({
    position: '',
    company: '',
    employmentType: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: ''
})

const openEducationModal = () => {
    editingEducationIndex.value = null
    currentEducation.value = {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        gpa: '',
        startYear: '',
        endYear: '',
        isCurrent: false,
        description: ''
    }
    showEducationModal.value = true
}

const closeEducationModal = () => {
    showEducationModal.value = false
}

const editEducation = (index) => {
    editingEducationIndex.value = index
    currentEducation.value = JSON.parse(JSON.stringify(educationList.value[index]))
    showEducationModal.value = true
}

const saveEducationItem = () => {
    error.value = ''

    if (!currentEducation.value.institution || !currentEducation.value.degree || !currentEducation.value.fieldOfStudy || !currentEducation.value.startYear) {
        error.value = 'Institusi, jenjang, jurusan, dan tahun mulai wajib diisi'
        return
    }

    if (editingEducationIndex.value !== null) {
        educationList.value[editingEducationIndex.value] = JSON.parse(JSON.stringify(currentEducation.value))
        success.value = 'Pendidikan berhasil diperbarui!'
    } else {
        educationList.value.push(JSON.parse(JSON.stringify(currentEducation.value)))
        success.value = 'Pendidikan berhasil ditambahkan!'
    }

    setTimeout(() => {
        success.value = ''
    }, 3000)

    closeEducationModal()
}

const removeEducation = (index) => {
    if (confirm('Hapus pendidikan ini?')) {
        educationList.value.splice(index, 1)
        success.value = 'Pendidikan berhasil dihapus'
        setTimeout(() => { success.value = '' }, 3000)
    }
}

const saveEducation = () => {
    error.value = ''
    success.value = ''
    loadingEducation.value = true

    setTimeout(() => {
        localStorage.setItem('education-list', JSON.stringify(educationList.value))
        success.value = 'Riwayat pendidikan berhasil disimpan!'
        loadingEducation.value = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1000)
}

const openExperienceModal = () => {
    editingExperienceIndex.value = null
    currentExperience.value = {
        position: '',
        company: '',
        employmentType: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: ''
    }
    showExperienceModal.value = true
}

const closeExperienceModal = () => {
    showExperienceModal.value = false
}

const editExperience = (index) => {
    editingExperienceIndex.value = index
    currentExperience.value = JSON.parse(JSON.stringify(experienceList.value[index]))
    showExperienceModal.value = true
}

const saveExperienceItem = () => {
    error.value = ''

    if (!currentExperience.value.position || !currentExperience.value.company || !currentExperience.value.startDate || !currentExperience.value.description) {
        error.value = 'Posisi, perusahaan, tanggal mulai, dan deskripsi wajib diisi'
        return
    }

    if (editingExperienceIndex.value !== null) {
        experienceList.value[editingExperienceIndex.value] = JSON.parse(JSON.stringify(currentExperience.value))
        success.value = 'Pengalaman berhasil diperbarui!'
    } else {
        experienceList.value.push(JSON.parse(JSON.stringify(currentExperience.value)))
        success.value = 'Pengalaman berhasil ditambahkan!'
    }

    setTimeout(() => {
        success.value = ''
    }, 3000)

    closeExperienceModal()
}

const removeExperience = (index) => {
    if (confirm('Hapus pengalaman ini?')) {
        experienceList.value.splice(index, 1)
        success.value = 'Pengalaman berhasil dihapus'
        setTimeout(() => { success.value = '' }, 3000)
    }
}

const saveExperience = () => {
    error.value = ''
    success.value = ''
    loadingExperience.value = true

    setTimeout(() => {
        localStorage.setItem('experience-list', JSON.stringify(experienceList.value))
        success.value = 'Pengalaman kerja berhasil disimpan!'
        loadingExperience.value = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1000)
}

onMounted(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) {
        navigateTo('/login')
        return
    }

    try {
        // Load user data (from register)
        const userData = localStorage.getItem('auth-user')
        if (userData) {
            const user = JSON.parse(userData)
            accountForm.value.email = user.email || ''
            accountForm.value.firstName = user.firstName || ''
            accountForm.value.middleName = user.middleName || ''
            accountForm.value.lastName = user.lastName || ''
            accountForm.value.phone = user.phone || ''
        }

        // Load account info (if already edited)
        const accountInfo = localStorage.getItem('account-info')
        if (accountInfo) {
            const saved = JSON.parse(accountInfo)
            accountForm.value.firstName = saved.firstName || accountForm.value.firstName
            accountForm.value.middleName = saved.middleName || accountForm.value.middleName
            accountForm.value.lastName = saved.lastName || accountForm.value.lastName
            accountForm.value.phone = saved.phone || accountForm.value.phone
        }

        // Load biodata
        const biodataInfo = localStorage.getItem('biodata-info')
        if (biodataInfo) {
            Object.assign(biodataForm.value, JSON.parse(biodataInfo))
        }

        // Load education
        const educationData = localStorage.getItem('education-list')
        if (educationData) {
            educationList.value = JSON.parse(educationData)
        }

        // Load experience
        const experienceData = localStorage.getItem('experience-list')
        if (experienceData) {
            experienceList.value = JSON.parse(experienceData)
        }

        // Load profile photo
        const profilePhoto = localStorage.getItem('profile-photo')
        if (profilePhoto) {
            photoForm.value.photoUrl = profilePhoto
        }
    } catch (err) {
        console.error('Error loading data:', err)
    }
})
</script>
