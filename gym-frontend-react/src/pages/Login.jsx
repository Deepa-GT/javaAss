import { useContext, useState } from 'react'
import { api, setAuth, clearAuth } from '../api'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext.jsx'

export default function Login() {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const { setUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const submit = async e => {
    e.preventDefault()
    setAuth(u, p)
    showToast('Checking...', 'info')
    try {
      const me = await api.me()
      setUser(me)
      showToast(`Hello ${me.username}`, 'success')
      navigate('/profile')
    } catch (error) {
      clearAuth()
      const errorMessage = error.data?.message || error.data?.error || 'Login failed'
      showToast(errorMessage, 'error')
    }
  }
  return (
    <section className="panel">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input placeholder="Username" value={u} onChange={e=>setU(e.target.value)} required />
        <label>Password</label>
        <input type="password" placeholder="Password" value={p} onChange={e=>setP(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <div className="muted" style={{marginTop: 15, textAlign: 'center', fontSize: 'var(--font-size-sm)'}}>
        Don't have an account? <Link to="/register" style={{color: 'var(--brand)', fontWeight: 600}}>Sign up</Link>
      </div>
    </section>
  )
}
