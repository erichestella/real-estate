import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Auth.css'

function Login() {
  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">

          <Link to="" className="auth-card__brand">Login</Link>
          {/* <p className="auth-card__intro">Log in to manage your listings and saved properties.</p> */}

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="identifier">Username / Email</label>
            <input id="identifier" type="text" placeholder="Enter your username or email" autoComplete="username" required />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="●●●●●●●" autoComplete="current-password" required />

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