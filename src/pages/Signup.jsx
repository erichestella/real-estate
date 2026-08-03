import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Auth.css'

function Signup() {
  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <div className="auth-page">
        <div className="auth-card auth-card--wide">
          <Link to="" className="auth-card__brand">Sign Up </Link>
          <p className="auth-card__intro">Create an account to list, save, and manage properties.</p>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <span className="auth-form__section">Name</span>
            <div className="auth-form__row">
              <div className="auth-form__field">
                <label htmlFor="firstName">First Name *</label>
                <input id="firstName" type="text" placeholder="First Name" autoComplete="given-name" required />
              </div>
              <div className="auth-form__field">
                <label htmlFor="lastName">Last Name *</label>
                <input id="lastName" type="text" placeholder="Last Name" autoComplete="family-name" required />
              </div>
            </div>

            <label htmlFor="username">Username *</label>
            <input id="username" type="text" placeholder="Username" autoComplete="username" required />

            <span className="auth-form__section">Contact Information</span>
            <label htmlFor="email">E-mail Address *</label>
            <input id="email" type="email" placeholder="Email Address" autoComplete="email" required />

            <label htmlFor="contactNumber">Contact Number *</label>
            <input id="contactNumber" type="tel" placeholder="Contact Number" autoComplete="tel" required />

            <span className="auth-form__section">Password</span>
            <label htmlFor="password">Password *</label>
            <input id="password" type="password" placeholder="Create a password" autoComplete="new-password" required />

            <button type="submit" className="auth-form__submit">Register</button>
          </form>

          <p className="auth-card__footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Signup