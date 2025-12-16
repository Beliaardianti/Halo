export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    console.log('🔍 Testing Supabase Config:')
    console.log('  Public URL:', config.public.supabaseUrl)
    console.log('  Public Key length:', config.public.supabaseKey?.length)
    
    // Import Supabase
    const { createClient } = await import('@supabase/supabase-js')
    
    // Create client
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    )
    
    // Test connection
    const { error } = await supabase.from('users').select('*').limit(1)
    
    return {
      success: true,
      message: '✅ Supabase connected!',
      config: {
        url: config.public.supabaseUrl ? 'Set ✅' : 'Missing ❌',
        key: config.public.supabaseKey ? 'Set ✅' : 'Missing ❌',
        urlValue: config.public.supabaseUrl,
        testQuery: error ? 'Failed: ' + error.message : 'Success ✅'
      }
    }
  } catch (err: any) {
    console.error('❌ Test failed:', err)
    return {
      success: false,
      error: err.message,
      stack: err.stack
    }
  }
})