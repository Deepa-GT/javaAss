import { useState } from 'react'
import { api } from '../api'
import { useToast } from '../context/ToastContext.jsx'
import { Link } from 'react-router-dom'

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '', email: '', fullName: '' })
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()

  const validate = () => {
    const newErrors = {}
    if (!form.username) newErrors.username = 'Username is required'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async e => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please correct the errors in the form', 'error')
      return
    }
    showToast('Submitting...', 'info')
    try {
      await api.register(form)
      showToast('Registered. You can login now.', 'success')
      if (onSuccess) onSuccess()
    } catch (error) {
      const errorMessage = error.data?.message || error.data?.error || 'Registration failed'
      showToast(errorMessage, 'error')
    }
  }
  return (
    <section className="panel">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
        {errors.username && <div className="error">{errors.username}</div>}
        <label>Password</label>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        {errors.password && <div className="error">{errors.password}</div>}
        <label>Email</label>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        {errors.email && <div className="error">{errors.email}</div>}
        <label>Full name</label>
        <input placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} />
        <button className="btn btn-primary" type="submit">Create Account</button>
      </form>
      <div className="muted" style={{marginTop: 15, textAlign: 'center', fontSize: 'var(--font-size-sm)'}}>
        Already have an account? <Link to="/login" style={{color: 'var(--brand)', fontWeight: 600}}>Login</Link>
      </div>
    </section>
  )
}
