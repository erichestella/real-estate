import { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav.jsx'
import AdminFooter from '../components/AdminFooter.jsx'
import properties from '../data/properties.js'
import './AdminMainPage.css'

// Same shared listings data used by Featured Properties (main page) and
// All Listing, so the pictures/info here always match what's shown
// publicly — just displayed in the admin's own Shopee/Lazada-style card.
const statusSlug = (status) => status.replace(/\s/g, '').toLowerCase()

function AdminMainPage() {
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')
  const [postedBy, setPostedBy] = useState('')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const statusOptions = [...new Set(properties.map((item) => item.status))]
  const locationOptions = [...new Set(properties.map((item) => item.location))]
  const postedByOptions = [...new Set(properties.map((item) => item.lister?.name).filter(Boolean))]

  const filtered = properties.filter((item) =>
    (status ? item.status === status : true) &&
    (location ? item.location === location : true) &&
    (postedBy ? item.lister?.name === postedBy : true)
  )

  const openPanel = (property) => {
    setSelected(property)
    setForm({
      title: property.title,
      price: property.price,
      status: property.status,
      location: property.location,
      sqm: property.sqm,
      beds: property.beds ?? '',
      baths: property.baths ?? '',
      garage: property.garage ?? '',
      description: property.description ?? '',
    })
    setIsOpen(true)
  }

  // Only toggle the open flag here — keep `selected`/`form` around so the
  // panel still has its content to show while it slides back out. They're
  // cleared once the slide-out transition actually finishes (see below).
  const closePanel = () => {
    setIsOpen(false)
  }

  const handleFieldChange = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Close on Escape, and stop the page from scrolling behind the drawer.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closePanel()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Clear the selected listing only once the slide-out transition on the
  // panel has actually finished, instead of the instant "is-open" is off.
  const handlePanelTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (!isOpen) {
      setSelected(null)
      setForm(null)
    }
  }

  return (
    <div className="admin">
      <AdminNav />

      <main className="admin-main container" id="listings">
        <div className="admin-main__header">
          <div>
            <h1>All Listing</h1>
            <p>House and land posts with location details.</p>
          </div>
          <button className="admin-main__add" type="button">
            <i className="fa-solid fa-plus" aria-hidden="true"></i> List Another
          </button>
        </div>

        <div className="admin-sort">
          <div className="admin-sort__field">
            <label htmlFor="sortStatus">Status</label>
            <select id="sortStatus" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="admin-sort__field">
            <label htmlFor="sortLocation">Location</label>
            <select id="sortLocation" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All</option>
              {locationOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="admin-sort__field">
            <label htmlFor="sortPostedBy">Posted By</label>
            <select id="sortPostedBy" value={postedBy} onChange={(e) => setPostedBy(e.target.value)}>
              <option value="">All</option>
              {postedByOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-listing-grid">
          {filtered.map((item) => (
            <article
              className="admin-listing-card"
              key={item.id}
              onClick={() => openPanel(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openPanel(item)
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="admin-listing-card__image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className={`status-pill status-pill--${statusSlug(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="admin-listing-card__body">
                <span className="admin-listing-card__id">{item.id}</span>
                <h3>{item.title}</h3>
                <p className="admin-listing-card__price">₱ {item.price.replace('₱', '')}</p>
                <p className="admin-listing-card__desc">{item.location} · {item.sqm}</p>
                <div className="admin-listing-card__footer">
                  <span className="admin-listing-card__posted">
                    <i className="fa-regular fa-user" aria-hidden="true"></i> Posted by {item.lister?.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p>No listings match those filters.</p>}
        </div>
      </main>

      <AdminFooter />

      {/* Slide-in panel: click a card above to view + edit its full info
          without leaving the All Listing page. */}
      <div className={`admin-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="admin-drawer__backdrop" onClick={closePanel} />

        <div className="admin-drawer__panel" onTransitionEnd={handlePanelTransitionEnd}>
          {selected && form && (
            <>
              <div className="admin-drawer__header">
                <div>
                  <span className="admin-drawer__id">{selected.id}</span>
                  <h2>Edit Listing</h2>
                </div>
                <button type="button" className="admin-drawer__close" onClick={closePanel} aria-label="Close panel">
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              <div className="admin-drawer__body">
                <div className="admin-drawer__image">
                  <img src={selected.image} alt={selected.title} />
                  <span className={`status-pill status-pill--${statusSlug(form.status)}`}>
                    {form.status}
                  </span>
                </div>

                <label className="admin-drawer__field">
                  <span>Title</span>
                  <input type="text" value={form.title} onChange={handleFieldChange('title')} />
                </label>

                <div className="admin-drawer__row">
                  <label className="admin-drawer__field">
                    <span>Price</span>
                    <input type="text" value={form.price} onChange={handleFieldChange('price')} />
                  </label>
                  <label className="admin-drawer__field">
                    <span>Status</span>
                    <select value={form.status} onChange={handleFieldChange('status')}>
                      <option>For Sale</option>
                      <option>For Rent</option>
                      <option>Sold Out</option>
                    </select>
                  </label>
                </div>

                <label className="admin-drawer__field">
                  <span>Location</span>
                  <input type="text" value={form.location} onChange={handleFieldChange('location')} />
                </label>

                <div className="admin-drawer__row admin-drawer__row--four">
                  <label className="admin-drawer__field">
                    <span>SQM</span>
                    <input type="text" value={form.sqm} onChange={handleFieldChange('sqm')} />
                  </label>
                  <label className="admin-drawer__field">
                    <span>Beds</span>
                    <input type="number" min="0" value={form.beds} onChange={handleFieldChange('beds')} />
                  </label>
                  <label className="admin-drawer__field">
                    <span>Baths</span>
                    <input type="number" min="0" value={form.baths} onChange={handleFieldChange('baths')} />
                  </label>
                  <label className="admin-drawer__field">
                    <span>Garage</span>
                    <input type="number" min="0" value={form.garage} onChange={handleFieldChange('garage')} />
                  </label>
                </div>

                <label className="admin-drawer__field">
                  <span>Description</span>
                  <textarea rows={4} value={form.description} onChange={handleFieldChange('description')} />
                </label>

                {selected.lister && (
                  <div className="admin-drawer__lister">
                    <p className="admin-drawer__lister-label">Listed by</p>
                    <p className="admin-drawer__lister-name">{selected.lister.name}</p>
                    {selected.lister.phone && (
                      <p className="admin-drawer__lister-contact">
                        <i className="fa-solid fa-phone" aria-hidden="true"></i> {selected.lister.phone}
                      </p>
                    )}
                    {selected.lister.email && (
                      <p className="admin-drawer__lister-contact">
                        <i className="fa-solid fa-envelope" aria-hidden="true"></i> {selected.lister.email}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="admin-drawer__footer">
                <button type="button" className="admin-drawer__cancel" onClick={closePanel}>
                  Cancel
                </button>
                <button type="button" className="admin-drawer__save" onClick={closePanel}>
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminMainPage