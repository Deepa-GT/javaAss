import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  useEffect(() => {
    const u = sessionStorage.getItem('u')
    const p = sessionStorage.getItem('p')
    if (u && p) {
      api.me().then(setUser).finally(() => setChecking(false))
    } else {
      setChecking(false)
    }
  }, [])
  return <AuthContext.Provider value={{ user, setUser, checking }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
