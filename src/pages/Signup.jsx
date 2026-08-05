import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Auth.css'
import './Signup.css'

// Simple, standard email shape check: something@something.tld
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  contactNumber: '',
  password: '',
  confirmPassword: '',
}

function Signup() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // Contact number: digits only, strip anything else as the person types.
    if (name === 'contactNumber') {
      const digitsOnly = value.replace(/\D/g, '')
      setFormData((prev) => ({ ...prev, contactNumber: digitsOnly }))
      if (errors.contactNumber) setErrors((prev) => ({ ...prev, contactNumber: '' }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!formData.username.trim()) nextErrors.username = 'Username is required.'

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.contactNumber.trim()) {
      nextErrors.contactNumber = 'Contact number is required.'
    } else if (!/^\d{7,15}$/.test(formData.contactNumber.trim())) {
      nextErrors.contactNumber = 'Enter a valid contact number (digits only).'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // All good — clear the whole form, show the success popup
    setErrors({})
    setFormData(initialFormData)
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
        <div className="auth-card auth-card--wide">
          <Link to="" className="auth-card__brand">Create an Account</Link>
          {/* <p className="auth-card__intro">Create an account to list, save, and manage properties.</p> */}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* <span className="auth-form__section">Name</span> */}
            <div className="auth-form__row">
              <div className="auth-form__field">
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'auth-form__input--error' : ''}
                  aria-invalid={Boolean(errors.firstName)}
                />
                {errors.firstName && <p className="auth-form__error-text">{errors.firstName}</p>}
              </div>
              <div className="auth-form__field">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'auth-form__input--error' : ''}
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName && <p className="auth-form__error-text">{errors.lastName}</p>}
              </div>
            </div>

            <label htmlFor="username">Username *</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.username)}
            />
            {errors.username && <p className="auth-form__error-text">{errors.username}</p>}

            {/* <span className="auth-form__section">Contact Information</span> */}
            <label htmlFor="email">E-mail Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="auth-form__error-text">{errors.email}</p>}

            <label htmlFor="contactNumber">Contact Number *</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              inputMode="numeric"
              maxLength={15}
              placeholder="Contact Number"
              autoComplete="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              className={errors.contactNumber ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.contactNumber)}
            />
            {errors.contactNumber && <p className="auth-form__error-text">{errors.contactNumber}</p>}

            {/* <span className="auth-form__section">Password</span> */}
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="●●●●●●●"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && <p className="auth-form__error-text">{errors.password}</p>}

            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="●●●●●●●"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'auth-form__input--error' : ''}
              aria-invalid={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword && <p className="auth-form__error-text">{errors.confirmPassword}</p>}

            <button type="submit" className="auth-form__submit">Sign Up </button>
          </form>

          <p className="auth-card__footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {showToast && (
        <>
          <div className="signup-toast-backdrop" />
          <div className="signup-toast" role="status">
            <span className="signup-toast__icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="signup-toast__text">
              <p className="signup-toast__title">Account created!</p>
              <p className="signup-toast__desc">You've successfully signed up.</p>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default Signup