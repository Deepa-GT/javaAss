import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Schedules() {
  const [items, setItems] = useState([])
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    api.schedules(level || undefined)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [level])
  return (
    <>
      <section>
        <h2>Workout Schedules</h2>
        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
          <div className="muted">Filter by level</div>
          <select value={level} onChange={e => setLevel(e.target.value)}>
            <option value="">All</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        {loading ? (
          <div className="grid">
            {[1,2,3].map(i => (
              <div key={i} className="card">
                <div className="skeleton" style={{height:18,width:'30%',marginBottom:8}} />
                <div className="skeleton" style={{height:24,width:'70%',marginBottom:12}} />
                <div className="skeleton" style={{height:60,width:'100%'}} />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="panel">No schedules found</div>
        ) : (
          <div className="grid">
            {items.map(s => (
              <div key={s.id} className="card">
                <div className="muted" style={{textTransform:'capitalize'}}>{s.level}</div>
                <h3 style={{marginTop:4}}>{s.title}</h3>
                <p className="muted">{s.description || ''}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
