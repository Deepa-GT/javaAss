import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Plans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  useEffect(() => {
    api.plans()
      .then(setPlans)
      .catch(() => setErr('Failed to load plans'))
      .finally(() => setLoading(false))
  }, [])
  return (
    <>
      <section>
        <h2>Membership Plans</h2>
        {err && <div className="panel">{err}</div>}
        {loading ? (
          <div className="grid">
            {[1,2,3].map(i => (
              <div key={i} className="card">
                <div className="skeleton" style={{height:24,width:'60%',marginBottom:12}} />
                <div className="skeleton" style={{height:32,width:'40%',marginBottom:12}} />
                <div className="skeleton" style={{height:48,width:'100%',marginBottom:12}} />
                <div className="skeleton" style={{height:40,width:'100%'}} />
              </div>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="panel">No plans available</div>
        ) : (
          <div className="grid">
            {plans.map(p => (
              <div key={p.id} className="card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                  <h3>{p.name}</h3>
                  <div className="muted">{p.duration}</div>
                </div>
                <div style={{fontSize:28,margin:'6px 0'}}>₹{p.price}</div>
                <div className="muted" style={{minHeight:36}}>{p.features || ''}</div>
                <div style={{marginTop:10}}>
                  <a href="/register" className="btn btn-primary">Choose</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
