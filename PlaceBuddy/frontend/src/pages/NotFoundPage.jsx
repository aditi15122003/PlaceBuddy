import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <main className="notfound">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </main>
  )
}

export default NotFoundPage
