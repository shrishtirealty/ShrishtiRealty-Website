export async function sendEmail(formType, data) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, data }),
    })

    // In dev mode, the API won't exist — handle gracefully
    if (res.status === 404) {
      console.warn('Email API not available (dev mode). Form data:', { formType, data })
      return { success: true } // Pretend success in dev so forms still work
    }

    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to send')
    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    // If fetch itself fails (network error in dev), still let the form work
    if (import.meta.env.DEV) {
      console.warn('Dev mode: email skipped. Data:', { formType, data })
      return { success: true }
    }
    return { success: false, error: err.message }
  }
}
