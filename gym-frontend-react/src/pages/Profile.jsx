import { useState } from 'react'
import { api } from '../api'

export default function Profile() {
  const [me, setMe] = useState(null)
  const [sub, setSub] = useState(null)
  const refresh = async () => {
    try {
      const info = await api.me()
      setMe(info)
      const s = await api.mySubscription()
      setSub(s)
    } catch {
      setMe(null)
      setSub(null)
    }
  }
  return (
    <section className="panel">
      <h2>My Profile</h2>
      <button className="btn" onClick={refresh}>Refresh</button>
      <pre style={{whiteSpace:'pre-wrap',background:'transparent',border:'none',padding:0,marginTop:10}}>{me ? JSON.stringify(me, null, 2) : 'Not authenticated'}</pre>
      <h3>Membership</h3>
      <pre style={{whiteSpace:'pre-wrap',background:'transparent',border:'none',padding:0}}>{sub ? JSON.stringify(sub, null, 2) : ''}</pre>
    </section>
  )
}
