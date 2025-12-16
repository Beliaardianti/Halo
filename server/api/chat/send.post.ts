import Groq from 'groq-sdk'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'GROQ_API_KEY tidak ditemukan di .env'
      })
    }

    const groq = new Groq({ apiKey })

const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  max_tokens: 1024,
  messages: [
    {
      role: 'system',
      content: 'Kamu adalah asisten AI yang helpful, ramah, dan berbicara dalam bahasa Indonesia. Berikan jawaban yang jelas dan ringkas.'
    },
    ...body.conversation_history
  ]
})

    return {
      success: true,
      data: response.choices[0].message.content
    }
  } catch (error: any) {
    console.error('Error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Server error'
    })
  }
})
