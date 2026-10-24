

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/accounts'

function getCookie(name) {
  const row = document.cookie.split('; ').find((r) => r.startsWith(name + '='))
  return row ? decodeURIComponent(row.slice(name.length + 1)) : null
}

function errorMessage(data, status) {
  if (status === 429) return 'Too many attempts. Please wait a while and try again.'
  if (status === 403 && data && typeof data.detail === 'string' && data.detail.includes('CSRF')) {
    return 'Your session expired. Please refresh the page and try again.'
  }
  if (data && typeof data.error === 'string') return data.error
  if (data && typeof data.detail === 'string') return data.detail
  if (data && typeof data === 'object') {
    const messages = Object.values(data).flat().filter((m) => typeof m === 'string')
    if (messages.length) return messages.join(' ')
  }
  return 'Something went wrong. Please try again.'
}

export async function initCsrf() {
  await fetch(`${API_URL}/csrf/`, { credentials: 'include' })
}

async function request(path, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' }

  if (method !== 'GET') {
    if (!getCookie('csrftoken')) await initCsrf()
    // Read the cookie fresh every time: Django rotates it on login and logout.
    const token = getCookie('csrftoken')
    if (token) headers['X-CSRFToken'] = token
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = res.status === 204 ? null : await res.json().catch(() => null)
  return { ok: res.ok, status: res.status, data }
}


async function call(path, method, body) {
  let result
  try {
    result = await request(path, method, body)
  } catch {
    throw new Error('Cannot reach the server. Please check that the backend is running.')
  }
  if (!result.ok) throw new Error(errorMessage(result.data, result.status))
  return result.data
}

export const registerUser = (email, password) => call('/register/', 'POST', { email, password })
export const loginUser = (email, password) => call('/login/', 'POST', { email, password })
export const logoutUser = () => call('/logout/', 'POST')
export const sendContact = ({ name, email, subject, message }) =>
  call('/contact/', 'POST', { name, email, subject, message })


export async function fetchMe() {
  try {
    const { ok, data } = await request('/me/')
    return ok ? data : null
  } catch {
    return null
  }
}
