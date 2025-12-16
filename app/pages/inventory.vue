<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <NuxtLink to="/dashboard" class="text-gray-600 hover:text-gray-800 flex items-center mb-4">
                    ← Kembali ke Dashboard
                </NuxtLink>
                <h1 class="text-3xl font-bold text-gray-800">Inventory</h1>
                <p class="text-gray-600 mt-2">Kelola CV/Resume dan Profile Picture Anda</p>
            </div>

            <!-- Alert -->
            <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {{ error }}
            </div>
            <div v-if="success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {{ success }}
            </div>

            <!-- Tabs -->
            <div class="bg-white rounded-t-2xl shadow-sm border-b">
                <div class="flex space-x-1 p-2">
                    <button @click="activeTab = 'photo'"
                        :class="activeTab === 'photo' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="flex-1 py-3 px-4 rounded-lg font-medium transition">
                        📷 Profile Picture
                    </button>
                    <button @click="activeTab = 'cv'"
                        :class="activeTab === 'cv' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
                        class="flex-1 py-3 px-4 rounded-lg font-medium transition">
                        📄 CV/Resume
                    </button>
                </div>
            </div>

            <!-- Tab Content -->
            <div class="bg-white rounded-b-2xl shadow-2xl p-8">
                <!-- PROFILE PICTURE TAB -->
                <div v-if="activeTab === 'photo'" class="space-y-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Profile Pictures</h2>

                    <!-- Upload New Photo -->
                    <div
                        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition">
                        <input ref="photoInput" type="file" accept="image/*" @change="handlePhotoUpload"
                            class="hidden" />

                        <div class="text-6xl mb-4">📷</div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Upload Photo Baru</h3>
                        <p class="text-sm text-gray-600 mb-4">
                            JPG, PNG, atau GIF • Maksimal 5MB
                        </p>
                        <button @click="$refs.photoInput.click()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                            Pilih File
                        </button>
                    </div>

                    <!-- Upload Progress -->
                    <div v-if="photoUploadProgress > 0 && photoUploadProgress < 100" class="w-full">
                        <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div class="bg-blue-600 h-full transition-all duration-300"
                                :style="{ width: photoUploadProgress + '%' }"></div>
                        </div>
                        <p class="text-sm text-center mt-2 text-gray-600">Uploading... {{ photoUploadProgress }}%</p>
                    </div>

                    <!-- Photo Gallery -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">My Photos ({{ photos.length }})</h3>

                        <div v-if="photos.length === 0" class="text-center py-8 text-gray-500">
                            <p>Belum ada foto. Upload foto pertama Anda!</p>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div v-for="photo in photos" :key="photo.id" class="relative group">
                                <img :src="photo.url" :alt="photo.name"
                                    class="w-full aspect-square object-cover rounded-lg border-2"
                                    :class="photo.isActive ? 'border-green-500' : 'border-gray-200'" />

                                <!-- Overlay -->
                                <div
                                    class="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                                    <button @click="setActivePhoto(photo.id)"
                                        :class="photo.isActive ? 'bg-green-600' : 'bg-blue-600'"
                                        class="text-white p-2 rounded-lg hover:opacity-80 transition">
                                        {{ photo.isActive ? '✓' : '✓' }}
                                    </button>
                                    <button @click="downloadPhoto(photo)"
                                        class="bg-white text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition">
                                        ⬇️
                                    </button>
                                    <button @click="deletePhoto(photo.id)"
                                        class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition">
                                        🗑️
                                    </button>
                                </div>

                                <!-- Active Badge -->
                                <span v-if="photo.isActive"
                                    class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Active
                                </span>

                                <p class="text-sm text-gray-600 mt-2 truncate">{{ photo.name }}</p>
                                <p class="text-xs text-gray-500">{{ photo.uploadDate }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CV/RESUME TAB -->
                <div v-if="activeTab === 'cv'" class="space-y-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">CV/Resume</h2>

                    <!-- Upload New CV -->
                    <div
                        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition">
                        <input ref="cvInput" type="file" accept=".pdf,.doc,.docx" @change="handleCvUpload"
                            class="hidden" />

                        <div class="text-6xl mb-4">📄</div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Upload CV/Resume Baru</h3>
                        <p class="text-sm text-gray-600 mb-4">
                            PDF, DOC, atau DOCX • Maksimal 10MB
                        </p>
                        <button @click="$refs.cvInput.click()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                            Pilih File
                        </button>
                    </div>

                    <!-- Upload Progress -->
                    <div v-if="cvUploadProgress > 0 && cvUploadProgress < 100" class="w-full">
                        <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div class="bg-blue-600 h-full transition-all duration-300"
                                :style="{ width: cvUploadProgress + '%' }"></div>
                        </div>
                        <p class="text-sm text-center mt-2 text-gray-600">Uploading... {{ cvUploadProgress }}%</p>
                    </div>

                    <!-- CV List -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">My CV/Resume ({{ cvList.length }})</h3>

                        <div v-if="cvList.length === 0" class="text-center py-8 text-gray-500">
                            <p>Belum ada CV. Upload CV pertama Anda!</p>
                        </div>

                        <div class="space-y-4">
                            <div v-for="cv in cvList" :key="cv.id"
                                class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                                <div class="flex items-start justify-between">
                                    <div class="flex items-start space-x-4 flex-1">
                                        <div class="text-4xl">
                                            {{ getFileIcon(cv.fileType) }}
                                        </div>
                                        <div class="flex-1">
                                            <h4 class="text-lg font-semibold text-gray-800">{{ cv.name }}</h4>
                                            <div class="text-sm text-gray-600 space-y-1 mt-2">
                                                <p>📂 {{ cv.fileType.toUpperCase() }} • {{ cv.fileSize }}</p>
                                                <p>📅 Uploaded: {{ cv.uploadDate }}</p>
                                                <p v-if="cv.description" class="text-gray-500">{{ cv.description }}</p>
                                            </div>

                                            <!-- Active Badge -->
                                            <span v-if="cv.isActive"
                                                class="inline-block mt-2 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                                                ✓ Active CV
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex flex-col space-y-2 ml-4">
                                        <button @click="setActiveCv(cv.id)"
                                            :class="cv.isActive ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'"
                                            class="px-4 py-2 rounded-lg font-medium hover:opacity-80 transition text-sm whitespace-nowrap">
                                            {{ cv.isActive ? '✓ Active' : 'Set Active' }}
                                        </button>
                                        <button @click="editCv(cv)"
                                            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition text-sm">
                                            ✏️ Edit
                                        </button>
                                        <button @click="downloadCv(cv)"
                                            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition text-sm">
                                            ⬇️ Download
                                        </button>
                                        <button @click="deleteCv(cv.id)"
                                            class="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition text-sm">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Edit CV Modal -->
            <div v-if="showEditModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Edit CV Info</h3>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama CV</label>
                            <input v-model="editData.name" type="text"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi (Optional)</label>
                            <textarea v-model="editData.description" rows="3"
                                placeholder="Contoh: CV untuk posisi Software Engineer"
                                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-6">
                        <button @click="saveEdit"
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                            Save Changes
                        </button>
                        <button @click="showEditModal = false"
                            class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp()

// State
const activeTab = ref('photo')
const error = ref('')
const success = ref('')

// Photos
const photos = ref([])
const photoUploadProgress = ref(0)
const photoInput = ref(null)

// CV
const cvList = ref([])
const cvUploadProgress = ref(0)
const cvInput = ref(null)

// Edit Modal
const showEditModal = ref(false)
const editData = ref({
    id: null,
    name: '',
    description: ''
})

// Methods - Photos
const handlePhotoUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate
    if (!file.type.startsWith('image/')) {
        error.value = 'File harus berupa gambar'
        return
    }

    if (file.size > 5 * 1024 * 1024) {
        error.value = 'Ukuran file maksimal 5MB'
        return
    }

    error.value = ''
    photoUploadProgress.value = 10

    try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
            const newPhoto = {
                id: Date.now(),
                name: file.name,
                url: e.target.result,
                uploadDate: new Date().toLocaleDateString(),
                isActive: photos.value.length === 0,
                fileSize: formatFileSize(file.size)
            }

            photos.value.unshift(newPhoto)
            photoUploadProgress.value = 100

            setTimeout(() => {
                photoUploadProgress.value = 0
            }, 2000)

            success.value = '✅ Photo berhasil diupload!'

            // Save to localStorage
            savePhotos()
        }
        reader.readAsDataURL(file)

        // TODO: Upload to Supabase Storage
    } catch (err) {
        console.error('Upload error:', err)
        error.value = 'Gagal upload photo'
        photoUploadProgress.value = 0
    }
}

const setActivePhoto = (photoId) => {
    photos.value.forEach(photo => {
        photo.isActive = photo.id === photoId
    })
    savePhotos()
    success.value = '✅ Photo active berhasil diupdate!'
}

const deletePhoto = (photoId) => {
    if (confirm('Hapus photo ini?')) {
        photos.value = photos.value.filter(p => p.id !== photoId)
        savePhotos()
        success.value = '✅ Photo berhasil dihapus!'
    }
}

const downloadPhoto = (photo) => {
    const link = document.createElement('a')
    link.href = photo.url
    link.download = photo.name
    link.click()
}

// Methods - CV
const handleCvUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate
    const validTypes = ['.pdf', '.doc', '.docx']
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()

    if (!validTypes.includes(fileExt)) {
        error.value = 'File harus berupa PDF, DOC, atau DOCX'
        return
    }

    if (file.size > 10 * 1024 * 1024) {
        error.value = 'Ukuran file maksimal 10MB'
        return
    }

    error.value = ''
    cvUploadProgress.value = 10

    try {
        // Simulate upload
        const newCv = {
            id: Date.now(),
            name: file.name.replace(/\.[^/.]+$/, ''),
            fileName: file.name,
            fileType: fileExt.replace('.', ''),
            fileSize: formatFileSize(file.size),
            uploadDate: new Date().toLocaleDateString(),
            isActive: cvList.value.length === 0,
            description: '',
            url: URL.createObjectURL(file)
        }

        cvList.value.unshift(newCv)
        cvUploadProgress.value = 100

        setTimeout(() => {
            cvUploadProgress.value = 0
        }, 2000)

        success.value = '✅ CV berhasil diupload!'

        // Save to localStorage
        saveCvList()

        // TODO: Upload to Supabase Storage
    } catch (err) {
        console.error('Upload error:', err)
        error.value = 'Gagal upload CV'
        cvUploadProgress.value = 0
    }
}

const setActiveCv = (cvId) => {
    cvList.value.forEach(cv => {
        cv.isActive = cv.id === cvId
    })
    saveCvList()
    success.value = '✅ Active CV berhasil diupdate!'
}

const editCv = (cv) => {
    editData.value = {
        id: cv.id,
        name: cv.name,
        description: cv.description || ''
    }
    showEditModal.value = true
}

const saveEdit = () => {
    const cv = cvList.value.find(c => c.id === editData.value.id)
    if (cv) {
        cv.name = editData.value.name
        cv.description = editData.value.description
        saveCvList()
        success.value = '✅ CV info berhasil diupdate!'
    }
    showEditModal.value = false
}

const deleteCv = (cvId) => {
    if (confirm('Hapus CV ini?')) {
        cvList.value = cvList.value.filter(c => c.id !== cvId)
        saveCvList()
        success.value = '✅ CV berhasil dihapus!'
    }
}

const downloadCv = (cv) => {
    const link = document.createElement('a')
    link.href = cv.url
    link.download = cv.fileName
    link.click()
}

// Utilities
const getFileIcon = (type) => {
    const icons = {
        pdf: '📕',
        doc: '📘',
        docx: '📘'
    }
    return icons[type] || '📄'
}

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const savePhotos = () => {
    localStorage.setItem('inventory-photos', JSON.stringify(photos.value))
}

const saveCvList = () => {
    localStorage.setItem('inventory-cv', JSON.stringify(cvList.value))
}

// Load data on mount
onMounted(() => {
    const savedPhotos = localStorage.getItem('inventory-photos')
    if (savedPhotos) {
        photos.value = JSON.parse(savedPhotos)
    }

    const savedCvs = localStorage.getItem('inventory-cv')
    if (savedCvs) {
        cvList.value = JSON.parse(savedCvs)
    }
})
</script>
