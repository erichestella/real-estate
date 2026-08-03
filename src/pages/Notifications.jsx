import { useState } from 'react'
import AdminNav from '../components/AdminNav.jsx'
import AdminFooter from '../components/AdminFooter.jsx'
import './Notifications.css'

// TODO: swap out with real notification events from the backend once ready.
// Front-end container/example only — shows the kind of events the admin panel would surface.
const initialNotifications = [
  {
    id: 'N-1001',
    type: 'inquiry',
    icon: 'fa-solid fa-house-circle-check',
    title: 'New viewing request',
    detail: 'J. dela Cruz requested to view "Modern Family Home with Landscaped Garden" (YR-1042).',
    time: '5m ago',
    read: false,
  },
  {
    id: 'N-1002',
    type: 'message',
    icon: 'fa-solid fa-comment-dots',
    title: 'New message',
    detail: 'Jordan Taylor sent a new message in Messages.',
    time: '18m ago',
    read: false,
  },
  {
    id: 'N-1003',
    type: 'listing',
    icon: 'fa-solid fa-tag',
    title: 'Listing status updated',
    detail: '"Skyline Condo Unit with Balcony View" (YR-1103) moved to Pending.',
    time: '1h ago',
    read: true,
  },
  {
    id: 'N-1004',
    type: 'system',
    icon: 'fa-solid fa-shield-halved',
    title: 'Security alert',
    detail: 'A new device signed in to the admin console.',
    time: '3h ago',
    read: true,
  },
  {
    id: 'N-1005',
    type: 'inquiry',
    icon: 'fa-solid fa-file-signature',
    title: 'New listing submission',
    detail: 'K. Bautista submitted a new property for review via "List My Property".',
    time: 'Yesterday',
    read: true,
  },
]

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'inquiry', label: 'Inquiries' },
  { key: 'message', label: 'Messages' },
  { key: 'listing', label: 'Listings' },
  { key: 'system', label: 'System' },
]

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.read
    return n.type === filter
  })

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    )
  }

  return (
    <div className="admin">
      <AdminNav />

      <main className="admin-main container" id="notifications">
        <div className="admin-main__header">
          <div>
            <h1>Notifications</h1>
            <p>Recent activity across listings, messages, and the admin console.</p>
          </div>
          <button className="admin-main__add" type="button" onClick={markAllRead}>
            <i className="fa-solid fa-check-double" aria-hidden="true"></i> Mark all as read
          </button>
        </div>

        <div className="notif-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`notif-filters__pill ${filter === f.key ? 'is-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.key === 'unread' && unreadCount > 0 && (
                <span className="notif-filters__count">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="notif-list">
          {filtered.map((n) => (
            <article key={n.id} className={`notif-card ${n.read ? '' : 'notif-card--unread'}`}>
              <div className={`notif-card__icon notif-card__icon--${n.type}`}>
                <i className={n.icon} aria-hidden="true"></i>
              </div>
              <div className="notif-card__body">
                <div className="notif-card__top">
                  <h3>{n.title}</h3>
                  <span className="notif-card__time">{n.time}</span>
                </div>
                <p>{n.detail}</p>
              </div>
              <button
                type="button"
                className="notif-card__toggle"
                title={n.read ? 'Mark as unread' : 'Mark as read'}
                onClick={() => toggleRead(n.id)}
              >
                <i className={n.read ? 'fa-regular fa-envelope-open' : 'fa-solid fa-envelope'} aria-hidden="true"></i>
              </button>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="notif-empty">
              <i className="fa-regular fa-bell-slash" aria-hidden="true"></i>
              <p>No notifications match this filter.</p>
            </div>
          )}
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}

export default Notifications
