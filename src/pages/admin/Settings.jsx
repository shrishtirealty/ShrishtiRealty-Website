import { useState } from 'react'
import { FiMail, FiShield, FiSave } from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminApi } from '../../utils/adminApi'

export default function AdminSettings() {
  const [step, setStep] = useState('request') // 'request' | 'verify'
  const [otpToken, setOtpToken] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const requestOtp = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi('send-otp', { method: 'POST', body: {} })
      setOtpToken(res.otpToken)
      setMaskedEmail(res.maskedEmail)
      setStep('verify')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setError('')
    if (!newPassword || newPassword.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }

    setLoading(true)
    try {
      const res = await adminApi('change-password', { method: 'POST', body: { otp, otpToken, newUsername: newUsername || undefined, newPassword } })
      setSuccess(res.message || 'Credentials updated.')
      setStep('request')
      setOtp(''); setNewPassword(''); setConfirmPassword(''); setNewUsername('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout title="Settings">
      <div className="max-w-lg bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gold/10 grid place-items-center text-gold"><FiShield size={18} /></div>
          <div>
            <h2 className="font-display text-lg text-gray-900">Change Credentials</h2>
            <p className="text-[0.78rem] text-gray-400">Verified by a one-time password sent to the admin email.</p>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg mb-4">{error}</p>}
        {success && <p className="text-green text-sm bg-green-pale px-4 py-2.5 rounded-lg mb-4">{success}</p>}

        {step === 'request' ? (
          <button onClick={requestOtp} disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-green transition-colors disabled:opacity-60">
            <FiMail size={14} /> {loading ? 'Sending…' : 'Send OTP to Admin Email'}
          </button>
        ) : (
          <form onSubmit={changePassword} className="space-y-4">
            <p className="text-[0.8rem] text-gray-500">OTP sent to <span className="font-medium text-gray-700">{maskedEmail}</span>. Expires in 5 minutes.</p>
            <Field label="OTP Code">
              <input value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={6}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm tracking-[0.3em] focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="New Username (optional)">
              <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="New Password">
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <Field label="Confirm Password">
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gold/50" />
            </Field>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-dark-green text-white text-[0.72rem] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-green transition-colors disabled:opacity-60">
                <FiSave size={14} /> {loading ? 'Saving…' : 'Update Credentials'}
              </button>
              <button type="button" onClick={() => setStep('request')} className="text-[0.75rem] text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[0.7rem] font-medium text-gray-500 mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
