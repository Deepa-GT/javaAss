import { NavLink, Route, Routes, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home.jsx'
import Plans from './pages/Plans.jsx'
import Schedules from './pages/Schedules.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { useToast } from './context/ToastContext.jsx'
import { clearAuth } from './api'
import Toast from './components/Toast.jsx'
import MenuIcon from './components/MenuIcon.jsx'

function Shell() {
  const { user, setUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const logout = () => {
    clearAuth()
    setUser(null)
    navigate('/')
    showToast('Logged out successfully', 'info')
  }
  return (
    <>
      <header>
        <div className="container header-inner">
          <Link to="/" className="brand">
            <div className="brand-badge">LM</div>
            <div>Landmine Soft Gym</div>
          </Link>
          <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
            <MenuIcon open={menuOpen} />
          </button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/" end className={({isActive})=> isActive ? 'active' : ''} onClick={() => { setMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}>Home</NavLink>
            <a href="/#plans-section" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('plans-section')?.scrollIntoView({behavior:'smooth'}); }}>Plans</a>
            <a href="/#schedules-section" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('schedules-section')?.scrollIntoView({behavior:'smooth'}); }}>Schedules</a>
            <NavLink to="/register" className={({isActive})=> isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Register</NavLink>
            <NavLink to="/profile" className={({isActive})=> isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Profile</NavLink>
            <NavLink to="/admin" className={({isActive})=> isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Admin</NavLink>
          </nav>
          <div className="nav header-right">
            {user ? (
              <>
                <span className="muted user-name">Hello {user.username}</span>
                <button className="btn btn-sm" onClick={logout}>Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Sign in</NavLink>
            )}
          </div>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/register" element={<Register onSuccess={() => navigate('/login')} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<ProtectedRoute admin><Admin /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">© Landmine Soft Gym • Stronger every day</div>
      </footer>
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  )
}
