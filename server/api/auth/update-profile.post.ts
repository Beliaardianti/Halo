import { readBody, createError, defineEventHandler, getHeader } from 'h3'
import { createServerSupabaseClient } from '../../../utils/supabaseClient'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    
    console.log('🔐 Auth header:', authHeader ? '✅' : '❌')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'Token tidak ditemukan'
      })
    }

    const token = authHeader.replace('Bearer ', '')
    console.log('🔐 Token:', `${token.substring(0, 20)}...`)

    // Buat client dengan token di header
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase env not found')
      throw createError({
        statusCode: 500,
        message: 'Server config error'
      })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    // Verify token
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    console.log('🔐 User verified:', user ? `✅ ${user.id}` : `❌ ${authError?.message}`)

    if (!user || authError) {
      throw createError({
        statusCode: 401,
        message: 'Token invalid atau expired'
      })
    }

    const body = await readBody(event)
    const { firstName, middleName, lastName, phone } = body

    if (!firstName || !lastName || !phone) {
      throw createError({
        statusCode: 400,
        message: 'First name, last name, and phone are required'
      })
    }

    // Update profile dengan service role (bypass RLS)
    const supabaseAdmin = createServerSupabaseClient()

    console.log('📝 Updating profile for:', user.id)

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .update({
        first_name: firstName,
        middle_name: middleName || null,
        last_name: lastName,
        phone: phone,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('❌ Update error:', error.message)
      throw createError({
        statusCode: 500,
        message: error.message
      })
    }

    console.log('✅ Profile updated')

    return {
      success: true,
      data: data,
      message: 'Profile updated successfully'
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message || error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update profile'
    })
  }
})