<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">💳 Confirm Payment</h2>
          <button 
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ×
          </button>
        </div>

        <!-- Payment Details -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="flex justify-between mb-3">
            <span class="text-gray-600">Type:</span>
            <span class="font-semibold capitalize">{{ paymentType }}</span>
          </div>
          <div class="flex justify-between mb-3">
            <span class="text-gray-600">Amount:</span>
            <span class="font-semibold text-blue-600 text-lg">
              IDR {{ amount.toLocaleString() }}
            </span>
          </div>
          <div class="border-t pt-3">
            <p class="text-sm text-gray-600">{{ description }}</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          ❌ {{ errorMessage }}
        </div>

        <!-- Loading State -->
        <div v-if="isProcessing" class="text-center py-6">
          <div class="inline-block">
            <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p class="mt-3 text-gray-600">Processing payment...</p>
        </div>

        <!-- Buttons -->
        <div v-else class="space-y-3">
          <button 
            @click="proceedPayment"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            💳 Pay Now
          </button>
          <button 
            @click="closeModal"
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>

        <!-- Footer -->
        <p class="text-xs text-gray-500 text-center mt-4">
          💳 Secure payment powered by Xendit
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isOpen: boolean
  amount: number
  description: string
  paymentType: 'topup' | 'mentoring'
}

interface Emits {
  (e: 'close'): void
  (e: 'success', data: { transactionId: string; paymentUrl: string }): void
  (e: 'error', data: { message: string }): void
}

const props = withDefaults(defineProps<Props>(), {
  amount: 0,
  description: '',
  paymentType: 'topup'
})

const emit = defineEmits<Emits>()

const isProcessing = ref(false)
const errorMessage = ref('')

// ============================================
// 1. CLOSE MODAL
// ============================================
const closeModal = () => {
  errorMessage.value = ''
  emit('close')
}

// ============================================
// 2. PROCEED PAYMENT
// ============================================
const proceedPayment = async () => {
  isProcessing.value = true
  errorMessage.value = ''

  try {
    // Get user ID dari localStorage
    const userData = localStorage.getItem('auth-user')
    if (!userData) {
      errorMessage.value = 'Please login first'
      return
    }

    const user = JSON.parse(userData)
    const userId = user.id

    console.log('📤 Sending payment request:', {
      userId,
      amount: props.amount,
      type: props.paymentType
    })

    // Call backend endpoint
    const response = await $fetch('/api/payment/create-transaction', {
      method: 'POST',
      body: {
        userId: userId,
        type: props.paymentType,
        amount: props.amount,
        description: props.description
      }
    })

    console.log('✅ Response:', response)

    if (response.success) {
      // Cast response to any to avoid TS errors
      const apiResponse = response as any
      const paymentUrl = apiResponse.paymentUrl || apiResponse.invoice_url
      const transactionId = apiResponse.transactionId || apiResponse.externalId
      
      emit('success', {
        transactionId: transactionId,
        paymentUrl: paymentUrl
      })

      // Redirect ke payment gateway Xendit
      if (paymentUrl) {
        window.location.href = paymentUrl
      }
    } else {
      errorMessage.value = 'Invalid response from server'
    }
  } catch (error: any) {
    console.error('❌ Payment error:', error)
    errorMessage.value = error.message || 'Payment failed. Please try again.'
    emit('error', { message: errorMessage.value })
  } finally {
    isProcessing.value = false
  }
}
</script>