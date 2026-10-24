import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">
            Place<span>Buddy</span>
          </Link>
          <p>Your AI study buddy for placements.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/ai-interview">AI Mock Interviewer</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} PlaceBuddy. All rights reserved.</p>
    </footer>
  )
}

export default Footer
