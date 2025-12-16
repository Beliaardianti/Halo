

export function initXenditClient() {
  const secretKey = process.env.XENDIT_SECRET_KEY

  console.log('[XENDIT] Initializing client...')
  console.log('[XENDIT] Secret key exists:', !!secretKey)
  console.log('[XENDIT] Key length:', secretKey ? secretKey.length : 0)

  if (!secretKey) {
    const errorMsg = 'XENDIT_SECRET_KEY is not set in .env file'
    console.error('[XENDIT] ❌', errorMsg)
    throw new Error(errorMsg)
  }

  if (!secretKey.startsWith('xnd_')) {
    const errorMsg = `Invalid Xendit key format. Should start with 'xnd_', got: ${secretKey.substring(0, 20)}...`
    console.error('[XENDIT] ❌', errorMsg)
    throw new Error(errorMsg)
  }

  console.log('[XENDIT] ✅ Client initialized successfully')

  return {
    secretKey,
    environment: process.env.XENDIT_ENV || 'development',
    baseUrl: 'https://api.xendit.co'
  }
}

export async function callXenditAPI(
  method: 'GET' | 'POST' | 'PUT',
  endpoint: string,
  body?: any
) {
  const config = initXenditClient()

  try {
    console.log(`[XENDIT API] ${method} ${endpoint}`)

    // Create Basic Auth
    const credentials = config.secretKey + ':'
    const base64Credentials = Buffer.from(credentials).toString('base64')

    console.log('[XENDIT AUTH] Basic auth header created')

    const url = `${config.baseUrl}${endpoint}`
    console.log('[XENDIT URL]', url)

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Credentials}`
      },
      body: body ? JSON.stringify(body) : undefined
    })

    const responseData = await response.json()

    console.log('[XENDIT] Response status:', response.status)

    if (!response.ok) {
      console.error('[XENDIT] ❌ Error response:', responseData)
      throw new Error(responseData.message || `Xendit API error: ${response.status}`)
    }

    console.log('[XENDIT] ✅ API call successful')
    return responseData

  } catch (error: any) {
    console.error('[XENDIT] ❌ API Error:', error.message)
    throw error
  }
}

export async function createXenditInvoice(payload: {
  external_id: string
  amount: number
  description?: string
  customer?: { given_names: string; email: string }
  success_redirect_url?: string
  failure_redirect_url?: string
}) {
  console.log('[XENDIT INVOICE] Creating invoice...')
  console.log('[XENDIT INVOICE] Amount:', payload.amount)
  console.log('[XENDIT INVOICE] External ID:', payload.external_id)

  return await callXenditAPI('POST', '/v2/invoices', payload)
}

export async function getXenditInvoiceStatus(invoiceId: string) {
  console.log('[XENDIT] Getting invoice status:', invoiceId)
  return await callXenditAPI('GET', `/v2/invoices/${invoiceId}`)
}
