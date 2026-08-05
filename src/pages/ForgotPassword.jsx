import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Auth.css'
import './ForgotPassword.css'

// Simple, standard email shape check: something@something.tld
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Email is required.')
      return
    }
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    // TODO: wire up to real password-reset flow once a backend is in place
    setError('')
    setEmail('')
    setShowToast(true)

    // Auto-dismiss the popup after 3 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">

          <Link to="" className="auth-card__brand">Forgot Password</Link>
          <p className="auth-card__intro">
            Enter the email address linked to your account and we'll send you a link to reset your password.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              className={error ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(error)}
            />
            {error && <p className="auth-form__error-text">{error}</p>}

            <button type="submit" className="auth-form__submit">Send Reset Link</button>
          </form>

          <p className="auth-card__footer">
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {showToast && (
        <>
          <div className="forgot-password-toast-backdrop" />
          <div className="forgot-password-toast" role="status">
            <span className="forgot-password-toast__icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="forgot-password-toast__text">
              <p className="forgot-password-toast__title">Reset link sent!</p>
              <p className="forgot-password-toast__desc">Check your inbox for instructions to reset your password.</p>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default ForgotPassword