import { useState } from 'react'
import { api } from '../api'
import { useToast } from '../context/ToastContext.jsx'

export default function Admin() {
  const [form, setForm] = useState({ name: '', duration: 'MONTHLY', price: '', features: '' })
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()

  const validate = () => {
    const newErrors = {}
    if (!form.name) newErrors.name = 'Plan name is required'
    if (!form.price) newErrors.price = 'Price is required'
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) newErrors.price = 'Price must be a positive number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async e => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please correct the errors in the form', 'error')
      return
    }
    const body = { ...form, price: Number(form.price) }
    try {
      await api.createPlan(body)
      showToast('Plan created', 'success')
      setForm({ name: '', duration: 'MONTHLY', price: '', features: '' })
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create plan. Use admin credentials.'
      showToast(errorMessage, 'error')
    }
  }
  return (
    <section className="panel">
      <h2>Admin</h2>
      <form onSubmit={submit}>
        <label>Plan name</label>
        <input placeholder="Plan name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        {errors.name && <div className="error">{errors.name}</div>}
        <label>Duration</label>
        <select value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})}>
          <option>MONTHLY</option>
          <option>QUARTERLY</option>
          <option>YEARLY</option>
        </select>
        <label>Price</label>
        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        {errors.price && <div className="error">{errors.price}</div>}
        <label>Features</label>
        <input placeholder="Features" value={form.features} onChange={e=>setForm({...form, features:e.target.value})} />
        <button className="btn btn-primary" type="submit">Create Plan</button>
      </form>
    </section>
  )
}
