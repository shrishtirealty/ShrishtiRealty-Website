export async function sendEmail(formType, data) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, data }),
    })

    if (res.status === 404) {
      console.warn('Email API not available (dev mode). Form data:', { formType, data })
      return { success: true }
    }

    const text = await res.text()
    let json
    try {
      json = JSON.parse(text)
    } catch {
      console.error('Non-JSON response from API:', text.substring(0, 200))
      throw new Error('Server returned an unexpected response')
    }

    if (!res.ok) throw new Error(json.error || 'Failed to send')
    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    if (import.meta.env.DEV) {
      console.warn('Dev mode: email skipped. Data:', { formType, data })
      return { success: true }
    }
    return { success: false, error: err.message }
  }
}
