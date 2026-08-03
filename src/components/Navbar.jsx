import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">Your RealState</Link>

        <nav className="navbar__links">
          <Link to="/">Home</Link>
          <Link to="/list-property">List My Property</Link>
          <Link to="/book-viewing">Book Viewing</Link>
          <Link to="/maps">Maps</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        <div className="navbar__actions">
          <Link to="/login" className="navbar__login">Login</Link>
          <Link to="/admin" className="navbar__icon" aria-label="Admin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar