const API = import.meta.env.VITE_API_BASE || 'http://localhost:8080'
export function setAuth(u, p) {
  sessionStorage.setItem('u', u)
  sessionStorage.setItem('p', p)
}
export function clearAuth() {
  sessionStorage.removeItem('u')
  sessionStorage.removeItem('p')
}
function authHeader() {
  const u = sessionStorage.getItem('u')
  const p = sessionStorage.getItem('p')
  if (!u || !p) return {}
  return { Authorization: 'Basic ' + btoa(u + ':' + p) }
}
export async function http(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, authHeader(), opts.headers || {})
  const res = await fetch(API + path, Object.assign({}, opts, { headers }))
  const txt = await res.text()
  let data = null
  try { data = txt ? JSON.parse(txt) : null } catch { data = txt }
  if (!res.ok) throw { status: res.status, data }
  return data
}
export const api = {
  plans: () => http('/api/plans'),
  schedules: (level) => http('/api/schedules' + (level ? `?level=${level}` : '')),
  register: (body) => http('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me: () => http('/api/auth/me'),
  mySubscription: () => http('/api/me/subscription'),
  createPlan: (plan) => http('/api/plans', { method: 'POST', body: JSON.stringify(plan) })
}
export function isAdmin(user) {
  if (!user || !user.authorities) return false
  return Array.isArray(user.authorities) && user.authorities.find(a => (a.authority || a) === 'ROLE_ADMIN')
}
