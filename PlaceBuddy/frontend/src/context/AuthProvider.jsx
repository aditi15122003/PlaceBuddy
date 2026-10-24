import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth'
import { fetchMe, initCsrf, loginUser, logoutUser, registerUser } from '../api'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true while we check "am I already logged in?"

  useEffect(() => {
    let active = true

    async function restoreSession() {
      try {
        await initCsrf()
      } catch {
       
      }
      const me = await fetchMe()
      if (active) {
        setUser(me)
        setLoading(false)
      }
    }

    restoreSession()
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const u = await loginUser(email, password)
    setUser(u)
    return u
  }, [])

  const register = useCallback(async (email, password) => {
    const u = await registerUser(email, password) // backend logs the new user in
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {
      /* session was already gone */
    }
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
