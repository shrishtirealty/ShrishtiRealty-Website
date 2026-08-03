const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

const ALLOWED_ORIGINS = [
  'https://shrishtirealty.com',
  'https://www.shrishtirealty.com',
]

function isAllowedOrigin(origin) {
  if (!origin) return false
  if (ALLOWED_ORIGINS.includes(origin)) return true
  return /^https?:\/\/localhost(:\d+)?$/.test(origin)
}

function cors(req, res) {
  const origin = req.headers.origin
  if (isAllowedOrigin(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Shrishti-Client')
  if (req.method === 'OPTIONS') { res.status(200).end(); return true }
  return false
}

export default async function handler(req, res) {
  if (cors(req, res)) return

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const origin = req.headers.origin
  const referer = req.headers.referer || ''
  const originOk = isAllowedOrigin(origin) || ALLOWED_ORIGINS.some((o) => referer.startsWith(o)) || referer.startsWith('http://localhost')
  if (!originOk) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  if (process.env.CHATBOT_CLIENT_TOKEN) {
    if (req.headers['x-shrishti-client'] !== process.env.CHATBOT_CLIENT_TOKEN) {
      return res.status(403).json({ error: 'Forbidden' })
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('[chatbot] OPENAI_API_KEY is not set')
    return res.status(500).json({ error: 'Server misconfigured: OPENAI_API_KEY is not set' })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Body must include a non-empty messages array' })
  }

  const trimmed = messages.slice(-25)
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  try {
    const r = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages: trimmed, max_tokens: 400, temperature: 0.7 }),
    })

    const data = await r.json().catch(() => null)

    if (!r.ok) {
      console.warn('[chatbot] OpenAI error:', r.status, data)
      return res.status(r.status).json({
        error: data?.error?.message || 'OpenAI request failed',
        status: r.status,
        model,
      })
    }

    const content = data?.choices?.[0]?.message?.content
    if (!content) {
      return res.status(502).json({ error: 'No content returned from OpenAI', model })
    }

    return res.status(200).json({ content, model })
  } catch (error) {
    console.error('[chatbot] network error:', error)
    return res.status(502).json({ error: 'Upstream network error', message: error?.message })
  }
}
