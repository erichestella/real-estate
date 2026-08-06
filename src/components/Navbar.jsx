import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Prevent background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <img src={logo} alt="Your RealState logo" className="navbar__logo" />
          Your RealEstate
        </Link>

        <nav className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/all-listing">All Listing</Link>
          <Link to="/list-property">List My Property</Link>
          <Link to="/book-viewing">Book Viewing</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login" className="navbar__login navbar__login--mobile">Login</Link>
        </nav>

        <div className="navbar__actions">
          <Link to="/login" className="navbar__login navbar__login--desktop">Login</Link>
          <Link to="/admin" className="navbar__icon" aria-label="Admin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button
            type="button"
            className={`navbar__toggle ${isOpen ? 'is-active' : ''}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isOpen && <div className="navbar__backdrop" onClick={() => setIsOpen(false)} />}
    </header>
  )
}

export default Navbar