import { createXenditInvoice } from '../../utils/xenditClient'
import { supabase } from '../../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, amount, type, description } = body

    console.log('[Payment API] Request:', { userId, amount, type })

    // ============================================
    // VALIDATE
    // ============================================
    if (!userId || !amount) {
      throw createError({
        statusCode: 400,
        message: 'userId and amount required'
      })
    }

    if (amount < 10000) {
      throw createError({
        statusCode: 400,
        message: 'Minimum amount: IDR 10,000'
      })
    }

    // ============================================
    // CREATE UNIQUE ID
    // ============================================
    const externalId = `${type}-${userId.slice(0, 8)}-${Date.now()}`
    console.log('[Payment API] External ID:', externalId)

    // ============================================
    // CREATE XENDIT INVOICE
    // ============================================
    console.log('[Payment API] Calling Xendit...')
    
    const invoice = await createXenditInvoice({
      external_id: externalId,
      amount: amount,
      description: description || `Payment for ${type}`,
      customer: {
        given_names: 'User',
        email: 'user@haloapp.com'
      },
      success_redirect_url: `${process.env.APP_URL}/payment/success?id=${externalId}`,
      failure_redirect_url: `${process.env.APP_URL}/payment/failed?id=${externalId}`
    })

    console.log('[Payment API] Xendit invoice created:', invoice.id)

    // ============================================
    // SAVE TO DATABASE
    // ============================================
    console.log('[Payment API] Saving to database...')
    
    const { data: savedTxn, error: dbError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: type,
          amount: amount,
          currency: 'IDR',
          status: 'pending',
          xendit_invoice_id: invoice.id,
          description: description || `Payment for ${type}`
        }
      ] as any)
      .select()
      .single()

    if (dbError) {
      console.error('[Payment API] Database error:', dbError)
      throw dbError
    }

    console.log('[Payment API] Transaction saved:', (savedTxn as any)?.id)

    // ============================================
    // RETURN RESPONSE
    // ============================================
    const response = {
      success: true,
      transactionId: (savedTxn as any)?.id || externalId,
      invoiceId: invoice.id,
      paymentUrl: invoice.invoice_url,
      externalId: externalId,
      amount: amount
    }

    console.log('[Payment API] Success response ready')
    return response

  } catch (error: any) {
    console.error('[Payment API] Error:', error.message || error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Payment creation failed'
    })
  }
})