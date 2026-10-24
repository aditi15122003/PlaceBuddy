import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main>
        <p className="auth-loading">Loading...</p>
      </main>
    )
  }

  // Not logged in -> go to /login, and come back here afterwards.
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />

  return children
}

export default ProtectedRoute
