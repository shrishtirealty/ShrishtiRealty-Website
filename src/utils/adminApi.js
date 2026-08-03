const TOKEN_KEY = 'shrishti_admin_token'
const USER_KEY = 'shrishti_admin_user'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getAdminUser() {
  return localStorage.getItem(USER_KEY)
}

export function setAdminSession(token, username) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, username)
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// Centralized fetch wrapper for the /api/admin action-router: attaches the
// bearer token, redirects to login on 401, and degrades gracefully when the
// API returns something that isn't JSON (e.g. Vercel's default error page).
export async function adminApi(action, { method = 'GET', body, params } = {}) {
  const token = getAdminToken()
  const query = new URLSearchParams({ action, ...(params || {}) }).toString()

  const res = await fetch(`/api/admin?${query}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    clearAdminSession()
    window.location.href = '/admin/login'
    throw new Error('Session expired')
  }

  const text = await res.text()
  let json
  try {
    json = text ? JSON.parse(text) : {}
  } catch {
    throw new Error(text ? text.replace(/<[^>]+>/g, '').slice(0, 200) : 'Server returned an unexpected response')
  }

  if (!res.ok) throw new Error(json.error || 'Request failed')
  return json
}
