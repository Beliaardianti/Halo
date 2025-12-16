<template>
    <div class="forgot-password-page">
        <div class="container">
            <div class="card">
                <!-- Header -->
                <div class="header">
                    <h1>Lupa Password?</h1>
                    <p>Masukkan email Anda dan kami akan mengirimkan link untuk reset password</p>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ successMessage }}</span>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ errorMessage }}</span>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSubmit" class="form">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input id="email" v-model="email" type="email" placeholder="Masukkan email Anda" required
                            :disabled="loading || !!successMessage" />
                    </div>

                    <button type="submit" class="btn btn-primary" :disabled="loading || !!successMessage">
                        <span v-if="loading">
                            <svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Mengirim...
                        </span>
                        <span v-else>
                            Kirim Link Reset Password
                        </span>
                    </button>
                </form>

                <!-- Back to Login -->
                <div class="footer">
                    <NuxtLink to="/login" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-small" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Login
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

 

definePageMeta({
    layout: 'default'
})

// State
const email = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Handle form submit
const handleSubmit = async () => {
    // Reset messages
    successMessage.value = ''
    errorMessage.value = ''

    // Validasi
    if (!email.value) {
        errorMessage.value = 'Email wajib diisi'
        return
    }

    loading.value = true

    try {
        const response = await $fetch('/api/auth/forgot-password', {
            method: 'POST',
            body: {
                email: email.value
            }
        })

        successMessage.value = response.message

        // Reset form setelah 5 detik
        setTimeout(() => {
            navigateTo('/login')
        }, 5000)

    } catch (error: any) {
        errorMessage.value = error.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.forgot-password-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
}

.container {
    width: 100%;
    max-width: 450px;
}

.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    padding: 3rem;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
}

.header p {
    color: #718096;
    font-size: 0.95rem;
    line-height: 1.5;
}

/* Alert Styles */
.alert {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.alert-success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.alert-error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

.alert .icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

/* Form Styles */
.form {
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
}

.form-group input {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
}

/* Button Styles */
.btn {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

/* Spinner */
.spinner {
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* Footer */
.footer {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
}

.link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.link:hover {
    color: #764ba2;
    gap: 0.75rem;
}

.icon-small {
    width: 18px;
    height: 18px;
}

/* Responsive */
@media (max-width: 640px) {
    .forgot-password-page {
        padding: 1rem;
    }

    .card {
        padding: 2rem 1.5rem;
    }

    .header h1 {
        font-size: 1.5rem;
    }
}
</style>
