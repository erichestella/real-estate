import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import logo from '../assets/logo.png'
import './AdminNav.css'

const NAV_ITEMS = [
  { to: '/admin', label: 'All Listing', icon: 'fa-solid fa-house-chimney' },
  { to: '/messages', label: 'Messages', icon: 'fa-solid fa-comment-dots' },
  { to: '/admin/notifications', label: 'Notification', icon: 'fa-solid fa-bell' },
  { to: '/profile', label: 'Profile', icon: 'fa-solid fa-user' },
]

function AdminNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAdminAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <header className="admin-nav">
      <div className="admin-nav__inner">
        <Link to="/admin" className="admin-nav__brand">
          <img src={logo} alt="Your RealState logo" className="admin-nav__brand-icon" />
          Your RealState <span>— Admin</span>
        </Link>

        <nav className="admin-nav__links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? 'is-active' : ''}
            >
              <i className={item.icon} aria-hidden="true"></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-nav__account">
          <button type="button" className="admin-nav__logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminNav