import Plans from './Plans.jsx'
import Schedules from './Schedules.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero" id="home">
        <h2>Transform your fitness</h2>
        <p className="muted">Personalized plans, expert trainers, and structured workout schedules designed to help you hit your goals faster. Join the community and start your journey today.</p>
        <div style={{marginTop:12,display:'flex',gap:10,justifyContent:'center'}}>
          <Link to="/plans" className="btn btn-primary">Explore Plans</Link>
          <Link to="/register" className="btn">Get Started</Link>
        </div>
      </section>

      <div id="plans-section">
        <Plans />
      </div>

      <div id="schedules-section">
        <Schedules />
      </div>

      <section className="grid" style={{marginTop: 'var(--space-12)'}}>
        <div className="card">
          <div className="brand-badge" style={{marginBottom: 'var(--space-4)'}}>★</div>
          <h3>Expert Trainers</h3>
          <p className="muted">Guidance from certified professionals to keep you on track and motivated.</p>
        </div>
        <div className="card">
          <div className="brand-badge" style={{marginBottom: 'var(--space-4)'}}>♥</div>
          <h3>Community</h3>
          <p className="muted">Join a supportive community of like-minded people on their fitness journey.</p>
        </div>
        <div className="card">
          <div className="brand-badge" style={{marginBottom: 'var(--space-4)'}}>⚙</div>
          <h3>Modern Equipment</h3>
          <p className="muted">Access to high-quality, modern gym equipment for optimal performance.</p>
        </div>
      </section>
    </>
  )
}
