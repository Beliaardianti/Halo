
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validation required fields
    const requiredFields = [
      'user_id', 'firstName', 'lastName', 'email',
      'expertise', 'yearsOfExperience', 'currentRole',
      'currentCompany', 'whyMentor', 'whatToTeach', 'availability'
    ]

    const missingFields = requiredFields.filter(field => !body[field])
    if (missingFields.length > 0) {
      throw createError({
        statusCode: 400,
        message: `Missing: ${missingFields.join(', ')}`
      })
    }

    console.log('✅ Mentor application submitted:', {
      name: `${body.firstName} ${body.lastName}`,
      expertise: body.expertise,
      status: 'pending'
    })

    return {
      success: true,
      message: 'Aplikasi mentor berhasil dikirim! Tim kami akan review dalam 1-3 hari kerja.',
      data: {
        status: 'pending',
        submittedAt: new Date().toISOString(),
        applicantName: `${body.firstName} ${body.lastName}`
      }
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Gagal mengirim aplikasi'
    })
  }
})
