import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageSquare, FiX, FiSend, FiMic, FiPause, FiTrash2, FiCheckCircle, FiLoader, FiChevronDown,
} from 'react-icons/fi'
import { sendEmail } from '../utils/sendEmail'
import { COUNTRY_CODES } from '../data/countryCodes'

const BRAND = {
  name: 'Aria',
  role: 'Shrishti Realty Concierge',
  avatar: 'https://ui-avatars.com/api/?name=Aria&background=1a3c2a&color=c9a84c&bold=true&size=128&font-size=0.42',
}

const SYSTEM_PROMPT = `You are Aria, the AI concierge for Shrishti Realty's website. You are warm, professional, knowledgeable, and sales-oriented. Your goal is to help visitors understand Shrishti Realty's services, guide them toward the right solution, and encourage genuinely interested visitors to book a consultation with the team.

CRITICAL RESPONSE RULES:
- Keep replies short and conversational: 1-3 sentences for casual chat, 3-5 sentences for detailed questions. Never info-dump unless the visitor explicitly asks for detail or a comparison.
- Never invent pricing, timelines, or availability you don't actually know — for exact figures, say you'll connect them with the team.
- If you don't know something, say so honestly and offer to connect them with the team.
- Use minimal markdown: bold key phrases only. No headers or bullet lists unless comparing multiple options.
- A tasteful occasional emoji is fine; don't overuse it.
- Don't repeat information you've already given earlier in this conversation.

NAME HANDLING:
- If the visitor greets you by name ("hi aria"), that is addressing you, not introducing themselves.
- Only treat a message as the visitor's own name when they explicitly say things like "my name is X" or "I'm X".

LEAD CAPTURE RULES:
- Append the exact marker [CONSULTATION_FORM] at the very end of your reply (after your natural-language response, on its own) whenever the visitor: asks to book a consultation, asks for pricing or a quote, asks to be contacted, says things like "I'm interested", "reach out to me", "let's talk", "sign me up", "schedule a call" — or expresses strong interest in a specific service along with wanting next steps.
- Do NOT show it for purely informational questions.
- Only trigger it once per conversation. If the visitor already saw the form (submitted or skipped), don't show it again — just share contact info in plain text instead.
- Never describe the form's fields yourself — it renders automatically when you include the marker.

COMPANY OVERVIEW:
Shrishti Realty is a multi-disciplinary luxury design-build brand — from a boutique interior design practice in Thane to a globally recognized brand operating across Mumbai (headquarters), Dubai, Doha and London. 15+ years of experience, 500+ projects delivered, and a Guinness World Record for the longest AI platform development hackathon (24 hours, achieved 19 May 2026 in Pune, Maharashtra, in association with Glimmora International).

SERVICES (7):
1. Real Estate Development — boutique residences, signature villas, high-end apartments and commercial spaces across Thane, Mumbai, Dubai and Doha.
2. Interior Design & Turnkey Execution — immersive, functional interiors from furniture customization to on-site execution and handover.
3. Architecture Planning — creative, climate-responsive and culturally sensitive architecture for residential, commercial and mixed-use developments.
4. Project Management — schedule control, procurement, vendor management and quality assurance for projects in India and overseas.
5. Global Consultancy — strategic design and development advisory for India, GCC and international markets.
6. 3D Visualization & VR Studio — photorealistic renderings, VR walkthroughs and 360-degree tours so clients can experience a space before it's built.
7. Smart Portable Cabins — modular, prefabricated structures (homes, offices, cabins, retail kiosks) built fast and delivered anywhere.

CONTACT INFO:
Phone/WhatsApp: +91-7498388944. Email: info@shrishtirealty.com. Instagram: @nuvibeshrishtirealty. Headquarters: Mumbai, Maharashtra, India.

The typical next step for an interested visitor is a free consultation with our design and development team — encourage this naturally once genuine interest is clear, don't push it on every message.`

const SERVICE_OPTIONS = [
  'Real Estate Development',
  'Interior Design & Turnkey',
  'Architecture Planning',
  'Project Management',
  'Global Consultancy',
  '3D Visualization & VR Studio',
  'Smart Portable Cabins',
  'Book a Consultation',
  'General Inquiry',
]

const SERVICE_KEYWORDS = [
  { keywords: /real estate|development|villa|apartment|residence|property/i, value: 'Real Estate Development' },
  { keywords: /interior|turnkey|furnitur|d[ée]cor/i, value: 'Interior Design & Turnkey' },
  { keywords: /architect|planning|blueprint|layout/i, value: 'Architecture Planning' },
  { keywords: /project management|timeline|schedule|budget/i, value: 'Project Management' },
  { keywords: /consultan|advisory|\bgcc\b|overseas|international/i, value: 'Global Consultancy' },
  { keywords: /\b3d\b|\bvr\b|virtual|render|visuali[sz]/i, value: '3D Visualization & VR Studio' },
  { keywords: /portable|cabin|prefab|modular/i, value: 'Smart Portable Cabins' },
]

function detectServiceFromText(text = '') {
  for (const { keywords, value } of SERVICE_KEYWORDS) {
    if (keywords.test(text)) return value
  }
  return 'General Inquiry'
}

const QUICK_SUGGESTIONS = [
  'What services does Shrishti Realty offer?',
  "Tell me about your Guinness World Record",
  "I'd like to book a consultation",
  'Which cities do you operate in?',
]

const USER_INTENT_RE = /book.*consultation|schedule.*(call|demo|meeting)|contact me|reach out|call me back|sign me up|interested in (booking|working)|get in touch|talk to (sales|someone|your team)|price|quote|cost estimate/i
const AI_PROMISED_FORM_RE = /fill (out|in) the form|form below|share your (details|contact)|provide your (details|contact)/i
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function sendToAI(history) {
  const apiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content.replace('[CONSULTATION_FORM]', '').trim() })),
  ]
  const clientToken = import.meta.env.VITE_CHATBOT_CLIENT_TOKEN
  const res = await fetch('/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(clientToken ? { 'X-Shrishti-Client': clientToken } : {}),
    },
    body: JSON.stringify({ messages: apiMessages }),
  })
  const text = await res.text()
  let json
  try { json = JSON.parse(text) } catch { throw new Error('Server returned an unexpected response') }
  if (!res.ok) throw new Error(json.error || 'Request failed')
  return json.content
}

function renderContent(text) {
  const clean = text.replace('[CONSULTATION_FORM]', '').trim()
  return clean.split('\n').map((line, i) => (
    <span key={i}>
      {line.split(/(\*\*.+?\*\*)/g).map((part, j) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={j}>{part.slice(2, -2)}</strong>
          : <span key={j}>{part}</span>
      )}
      {i < clean.split('\n').length - 1 && <br />}
    </span>
  ))
}

function LeadForm({ detectedInterest, conversationExcerpt, onSubmitted, onSkip }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState(detectedInterest || 'General Inquiry')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Please enter your name.')
    if (!EMAIL_RE.test(email)) return setError('Please enter a valid email address.')
    if (!phone.trim()) return setError('Please enter your phone number.')
    setError('')
    setSubmitting(true)
    await sendEmail('chatbot-lead', {
      name, email, phone: `${countryCode} ${phone}`, interest, message: conversationExcerpt,
    })
    setSubmitting(false)
    setDone(true)
    onSubmitted(name)
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-pale text-green text-sm">
        <FiCheckCircle size={16} /> Details sent! Our team will be in touch shortly.
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="p-4 rounded-2xl border border-gold/20 bg-white space-y-3">
      <p className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-gold">Let's Connect You With Our Team</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
        className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email"
        className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
      <div className="flex gap-2">
        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
          className="px-2 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50">
          {COUNTRY_CODES.map((c) => <option key={c.name} value={c.code}>{c.code} {c.name}</option>)}
        </select>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone number"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
      </div>
      <div className="relative">
        <select value={interest} onChange={(e) => setInterest(e.target.value)}
          className="w-full appearance-none px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50">
          {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
      </div>
      {error && <p className="text-[0.75rem] text-red-500">{error}</p>}
      <div className="flex items-center gap-2 pt-1">
        <button type="submit" disabled={submitting}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-green transition-colors disabled:opacity-60">
          {submitting ? <FiLoader className="animate-spin" size={13} /> : 'Send'}
        </button>
        <button type="button" onClick={onSkip} className="px-4 py-2.5 text-[0.72rem] text-gray-400 hover:text-gray-600 transition-colors">
          Skip
        </button>
      </div>
    </form>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-gray-100 w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"
          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  )
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'greeting', role: 'assistant', content: "Hi, I'm Aria — Shrishti Realty's concierge. Ask me about our services, our Guinness World Record, or let's find the right fit for your project." },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [formShownId, setFormShownId] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [detectedInterest, setDetectedInterest] = useState('General Inquiry')

  // Voice input
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [voiceUnsupported, setVoiceUnsupported] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const timerRef = useRef(null)
  const transcriptAccumRef = useRef('')
  const isRecordingRef = useRef(false)
  const isPausedRef = useRef(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  useEffect(() => () => stopRecognition(), [])

  const send = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    setShowSuggestions(false)
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: trimmed }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const content = await sendToAI(nextMessages.slice(-20))
      const assistantId = `a-${Date.now()}`
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content }])

      const shouldOfferForm = !formSubmitted && !formShownId && (
        content.includes('[CONSULTATION_FORM]') || AI_PROMISED_FORM_RE.test(content) || USER_INTENT_RE.test(trimmed)
      )
      if (shouldOfferForm) {
        setDetectedInterest(detectServiceFromText(`${trimmed} ${content}`))
        setFormShownId(assistantId)
      }
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: `err-${Date.now()}`, role: 'assistant',
        content: "I'm having a brief connection hiccup. Feel free to reach us directly at +91-7498388944 or info@shrishtirealty.com, or try again in a moment.",
      }])
      console.error('[chatbot] error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmitted = (name) => {
    setFormSubmitted(true)
    setMessages((prev) => [...prev, {
      id: `thanks-${Date.now()}`, role: 'assistant',
      content: `Thank you, ${name.split(' ')[0]}! Our team will reach out shortly. Anything else I can help with in the meantime?`,
    }])
  }

  const handleFormSkip = () => setFormShownId(null)

  // ── Voice input (Web Speech API) ──
  function stopRecognition() {
    try { recognitionRef.current?.stop() } catch { /* noop */ }
    clearInterval(timerRef.current)
  }

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceUnsupported(true)
      setTimeout(() => setVoiceUnsupported(false), 3000)
      return
    }
    transcriptAccumRef.current = ''
    setVoiceTranscript('')
    setRecordingTime(0)
    isRecordingRef.current = true
    isPausedRef.current = false
    setIsRecording(true)
    setIsPaused(false)

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) transcriptAccumRef.current += transcript + ' '
        else interim += transcript
      }
      setVoiceTranscript((transcriptAccumRef.current + interim).trim())
    }
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'audio-capture') {
        cancelRecording()
        setMessages((prev) => [...prev, {
          id: `voice-err-${Date.now()}`, role: 'assistant',
          content: "I couldn't access your microphone. Please check your browser permissions, or just type your message instead.",
        }])
      }
    }
    recognition.onend = () => {
      if (isRecordingRef.current && !isPausedRef.current) {
        try { recognition.start() } catch { /* already starting */ }
      }
    }
    recognitionRef.current = recognition
    recognition.start()

    timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000)
  }

  const pauseRecording = () => {
    isPausedRef.current = true
    setIsPaused(true)
    try { recognitionRef.current?.stop() } catch { /* noop */ }
    clearInterval(timerRef.current)
  }

  const resumeRecording = () => {
    isPausedRef.current = false
    setIsPaused(false)
    try { recognitionRef.current?.start() } catch { /* noop */ }
    timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000)
  }

  const cancelRecording = () => {
    isRecordingRef.current = false
    isPausedRef.current = false
    stopRecognition()
    setIsRecording(false)
    setIsPaused(false)
    setRecordingTime(0)
    setVoiceTranscript('')
    transcriptAccumRef.current = ''
  }

  const sendRecording = () => {
    const text = transcriptAccumRef.current.trim()
    isRecordingRef.current = false
    stopRecognition()
    setIsRecording(false)
    setIsPaused(false)
    setRecordingTime(0)
    setVoiceTranscript('')
    transcriptAccumRef.current = ''
    if (text) send(text)
  }

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Chat with Aria"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[120] w-14 h-14 rounded-full bg-dark-green text-gold grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
        animate={{ boxShadow: ['0 0 0 0 rgba(201,168,76,0.4)', '0 0 0 14px rgba(201,168,76,0)', '0 0 0 0 rgba(201,168,76,0)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        whileHover={{ scale: 1.06 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={isOpen ? 'x' : 'chat'} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}>
            {isOpen ? <FiX size={22} /> : <FiMessageSquare size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 sm:right-6 z-[120] w-[calc(100vw-2.5rem)] max-w-[400px] h-[600px] max-h-[70vh] bg-[#f9f8f6] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-black/[0.05] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark-green px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="relative shrink-0">
                <img src={BRAND.avatar} alt={BRAND.name} className="w-10 h-10 rounded-full border border-gold/40 object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-light border-2 border-dark-green" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{BRAND.name}</p>
                <p className="text-white/45 text-[0.7rem] truncate">{BRAND.role}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto text-white/50 hover:text-white transition-colors shrink-0" aria-label="Close chat">
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id}>
                  <div className={`max-w-[85%] px-4 py-2.5 text-[0.85rem] leading-relaxed ${
                    m.role === 'user'
                      ? 'ml-auto bg-dark-green text-white rounded-2xl rounded-tr-sm'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-sm'
                  }`}>
                    {renderContent(m.content)}
                  </div>
                  {m.role === 'assistant' && formShownId === m.id && (
                    <div className="mt-3">
                      <LeadForm
                        detectedInterest={detectedInterest}
                        conversationExcerpt={messages.slice(-4).map((mm) => `${mm.role}: ${mm.content}`).join('\n')}
                        onSubmitted={handleFormSubmitted}
                        onSkip={handleFormSkip}
                      />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && <TypingIndicator />}
              {voiceUnsupported && (
                <p className="text-[0.72rem] text-gray-400 italic">Voice input isn't supported in this browser — please type instead.</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions */}
            {showSuggestions && messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {QUICK_SUGGESTIONS.map((q) => (
                  <button key={q} onClick={() => send(q)}
                    className="px-3 py-1.5 rounded-full border border-gold/25 text-[0.7rem] text-dark-green hover:bg-gold/10 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="p-3 border-t border-black/[0.05] bg-white shrink-0">
              {isRecording ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span className="text-[0.75rem] text-gray-500 shrink-0 tabular-nums">{formatTime(recordingTime)}</span>
                  <p className="flex-1 min-w-0 truncate text-[0.8rem] text-gray-600">{voiceTranscript || 'Listening…'}</p>
                  <button onClick={cancelRecording} aria-label="Cancel" className="w-8 h-8 shrink-0 rounded-full grid place-items-center text-gray-400 hover:bg-gray-100"><FiTrash2 size={14} /></button>
                  <button onClick={isPaused ? resumeRecording : pauseRecording} aria-label={isPaused ? 'Resume' : 'Pause'} className="w-8 h-8 shrink-0 rounded-full grid place-items-center text-gray-500 hover:bg-gray-100"><FiPause size={14} /></button>
                  <button onClick={sendRecording} aria-label="Send recording" className="w-8 h-8 shrink-0 rounded-full bg-dark-green text-white grid place-items-center hover:bg-green transition-colors"><FiSend size={13} /></button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); send(inputValue) }} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Aria anything…"
                    disabled={isLoading}
                    className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-[0.85rem] focus:outline-none focus:border-gold/50 disabled:opacity-60"
                  />
                  <button type="button" onClick={startRecording} disabled={isLoading} aria-label="Voice input"
                    className="w-9 h-9 shrink-0 rounded-full grid place-items-center text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-40">
                    <FiMic size={15} />
                  </button>
                  <button type="submit" disabled={isLoading || !inputValue.trim()} aria-label="Send"
                    className="w-9 h-9 shrink-0 rounded-full bg-dark-green text-white grid place-items-center hover:bg-green transition-colors disabled:opacity-40">
                    {isLoading ? <FiLoader className="animate-spin" size={14} /> : <FiSend size={14} />}
                  </button>
                </form>
              )}
              <p className="text-center text-[0.62rem] text-gray-300 mt-2">Powered by Shrishti Realty</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
