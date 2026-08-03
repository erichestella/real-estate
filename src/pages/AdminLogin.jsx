import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import '../pages/Auth.css'
import './AdminLogin.css'

function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const redirectTo = location.state?.from && location.state.from !== '/admin/login'
    ? location.state.from
    : '/admin'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!identifier.trim() || !password.trim()) {
      setError('Please enter both your admin username/email and password.')
      return
    }
    setError('')
    login(identifier)
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="auth-page-wrapper admin-login-wrapper">
      <header className="admin-login-topbar">
        <Link to="/" className="admin-login-topbar__brand">
          <i className="fa-solid fa-building" aria-hidden="true"></i>
          Your RealState
        </Link>
        <span className="admin-login-topbar__tag">Admin Console</span>
      </header>

      <div className="auth-page">
        <div className="auth-card admin-login-card">
          <h1 className="auth-card__brand">Admin Access</h1>

          <p className="auth-card__intro">Sign in to manage listings, messages, and system settings.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-identifier">Admin Username / Email</label>
            <input
              id="admin-identifier"
              type="text"
              placeholder="Enter your admin username or email"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="admin-login-card__error"><i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> {error}</p>}

            <button type="submit" className="auth-form__submit">
              <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i> Login to Admin
            </button>
          </form>

          <p className="auth-card__footer">
            Not an admin? <Link to="/login">Go to member login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin