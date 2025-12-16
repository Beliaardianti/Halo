<template>
    <div class="flex flex-col h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold">AI Assistant</h1>
                        <p class="text-xs text-blue-100">{{ isTyping ? 'Sedang mengetik...' : 'Online' }}</p>
                    </div>
                </div>
                <button @click="clearChat" class="p-2 hover:bg-blue-500 rounded-lg transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Messages Container -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            <!-- Welcome Message -->
            <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Halo! 👋</h2>
                <p class="text-gray-600 mb-6">Saya AI Assistant Anda. Ada yang bisa saya bantu hari ini?</p>

                <!-- Quick Action Buttons -->
                <div class="grid grid-cols-2 gap-3 w-full max-w-md">
                    <button @click="sendQuickMessage('Apa itu AI?')"
                        class="p-3 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-sm font-medium text-gray-700">
                        💡 Apa itu AI?
                    </button>
                    <button @click="sendQuickMessage('Ceritakan lelucon')"
                        class="p-3 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-sm font-medium text-gray-700">
                        😄 Ceritakan lelucon
                    </button>
                    <button @click="sendQuickMessage('Tips produktivitas')"
                        class="p-3 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-sm font-medium text-gray-700">
                        ⚡ Tips produktivitas
                    </button>
                    <button @click="sendQuickMessage('Bagaimana cara belajar programming?')"
                        class="p-3 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition text-sm font-medium text-gray-700">
                        💻 Belajar coding
                    </button>
                </div>
            </div>

            <!-- Chat Messages -->
            <div v-for="(message, index) in messages" :key="index"
                :class="message.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
                <div
                    :class="message.role === 'user' ? 'flex flex-row-reverse items-end space-x-reverse space-x-2' : 'flex items-end space-x-2'">
                    <!-- Avatar -->
                    <div class="flex-shrink-0">
                        <div v-if="message.role === 'assistant'"
                            class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            AI
                        </div>
                        <div v-else
                            class="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            U
                        </div>
                    </div>

                    <!-- Message Bubble -->
                    <div :class="message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
                        : 'bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-md'"
                        class="max-w-[75%] px-4 py-3 relative group">
                        <!-- Delete Button -->
                        <button @click="deleteMessage(index)"
                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600 shadow-lg z-10">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <p class="text-sm whitespace-pre-wrap break-words">{{ message.content }}</p>
                        <p class="text-xs mt-1 opacity-70">{{ formatTime(message.timestamp) }}</p>
                    </div>
                </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex justify-start">
                <div class="flex items-end space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        AI
                    </div>
                    <div class="bg-white rounded-2xl rounded-bl-none shadow-md px-4 py-3">
                        <div class="flex space-x-2">
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Area -->
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div class="max-w-7xl mx-auto flex items-end space-x-2">
                <div class="flex-1 relative">
                    <textarea v-model="inputMessage" @keydown.enter.prevent="handleKeyDown"
                        placeholder="Ketik pesan Anda..." rows="1"
                        class="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 resize-none max-h-32 overflow-y-auto"></textarea>
                    <button @click="toggleEmojiPicker"
                        class="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 transition">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <button @click="sendMessage" :disabled="!inputMessage.trim() || isTyping"
                    :class="inputMessage.trim() && !isTyping ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'"
                    class="p-3 rounded-full text-white transition-all transform active:scale-95">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </button>
            </div>

            <!-- Emoji Picker -->
            <div v-if="showEmojiPicker"
                class="absolute bottom-20 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                <div class="grid grid-cols-8 gap-2">
                    <button v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)"
                        class="text-2xl hover:bg-gray-100 rounded p-1 transition">
                        {{ emoji }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

// State
const messages = ref<Message[]>([])
const inputMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const showEmojiPicker = ref(false)

// Emojis
const emojis = ['😀', '😂', '😍', '🥰', '😎', '🤔', '👍', '❤️', '🎉', '🔥', '💯', '✨', '🙏', '👏', '💪', '🚀']

// Send message
const sendMessage = async () => {
    if (!inputMessage.value.trim() || isTyping.value) return

    const userMessage: Message = {
        role: 'user',
        content: inputMessage.value.trim(),
        timestamp: new Date()
    }

    messages.value.push(userMessage)
    const question = inputMessage.value.trim()
    inputMessage.value = ''
    showEmojiPicker.value = false

    await scrollToBottom()

    // Show typing indicator
    isTyping.value = true

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Get AI response
    try {
        const aiResponse = await getAIResponse(question)
        messages.value.push({
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
        })
    } catch (error) {
        console.error('Error:', error)
        messages.value.push({
            role: 'assistant',
            content: '❌ Maaf, terjadi kesalahan. Silakan coba lagi.',
            timestamp: new Date()
        })
    } finally {
        isTyping.value = false
        await scrollToBottom()
    }
}

// Quick message
const sendQuickMessage = (message: string) => {
    inputMessage.value = message
    sendMessage()
}

// Get AI response from Gemini API (via Nuxt backend)
const getAIResponse = async (question: string): Promise<string> => {
    const conversationHistory = messages.value.map(msg => ({
        role: msg.role,
        content: msg.content
    }))

    console.log('Sending to API:', conversationHistory)

    try {
        const data = await $fetch('/api/chat/send', {
            method: 'POST',
            body: {
                conversation_history: conversationHistory
            }
        })

        console.log('API response:', data)
        return data?.data || 'Tidak ada response dari server'
    } catch (err) {
        console.error('Fetch error:', err)
        throw err
    }
}

// Delete message
const deleteMessage = (index: number) => {
    messages.value.splice(index, 1)
}

// Handle Enter key
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage()
    }
}

// Scroll to bottom
const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

// Format timestamp
const formatTime = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) {
        return 'Baru saja'
    } else if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000)
        return `${minutes} menit yang lalu`
    } else if (diff < 86400000) {
        return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    } else {
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    }
}

// Clear chat
const clearChat = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
        messages.value = []
    }
}

// Toggle emoji picker
const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value
}

// Add emoji
const addEmoji = (emoji: string) => {
    inputMessage.value += emoji
    showEmojiPicker.value = false
}
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Animation for bounce */
@keyframes bounce {
    0%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-8px);
    }
}

.animate-bounce {
    animation: bounce 1.4s infinite;
}
</style>
