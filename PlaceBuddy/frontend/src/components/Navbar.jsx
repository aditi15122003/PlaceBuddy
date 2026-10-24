import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Place<span>Buddy</span>
      </Link>

      <ul className={`nav-links ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/ai-interview">AI Mock Interviewer</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

     
      {!loading && (
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user" title={user.email}>{user.email}</span>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        className="menu-btn"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
    </nav>
  )
}

export default Navbar
