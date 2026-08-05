import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Auth.css'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ identifier: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!formData.identifier.trim()) nextErrors.identifier = 'Username or email is required.'
    if (!formData.password) nextErrors.password = 'Password is required.'
    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // TODO: wire up to real authentication once a backend is in place
    setErrors({})
    navigate('/')
  }

  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">

          <Link to="" className="auth-card__brand">Login</Link>
          {/* <p className="auth-card__intro">Log in to manage your listings and saved properties.</p> */}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="identifier">Username / Email</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Enter your username or email"
              autoComplete="username"
              value={formData.identifier}
              onChange={handleChange}
              className={errors.identifier ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.identifier)}
            />
            {errors.identifier && <p className="auth-form__error-text">{errors.identifier}</p>}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="●●●●●●●"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && <p className="auth-form__error-text">{errors.password}</p>}

            <Link to="/forgot-password" className="auth-form__forgot">Forgot Password?</Link>

            <button type="submit" className="auth-form__submit">Login</button>
          </form>

          <p className="auth-card__footer">
            New? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login