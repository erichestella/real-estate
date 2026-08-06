import { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import properties from '../data/properties.js'
import './PropertyDetails.css'

const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
    <path d="M2 18v2" />
    <path d="M22 18v2" />
    <path d="M6 10V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
  </svg>
)

const BathIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h16a1 1 0 0 1 1 1v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2a1 1 0 0 1 1-1z" />
    <path d="M6 12V6a2 2 0 0 1 3.2-1.6" />
    <path d="M10 20v2" />
    <path d="M16 20v2" />
  </svg>
)

const GarageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21V10l9-6 9 6v11" />
    <path d="M3 10h18" />
    <path d="M9 21v-6h6v6" />
  </svg>
)

const RulerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z" />
    <path d="m7.5 10.5 2 2" />
    <path d="m10.5 7.5 2 2" />
    <path d="m13.5 4.5 2 2" />
  </svg>
)

// Routed at /property/:id — reads the id from the URL and looks it up in
// the shared properties data so a full page refresh (or a direct link)
// still shows the right listing.
function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const property = properties.find((p) => p.id === id)

  // React Router keeps the browser's scroll position on navigation, which
  // left this page scrolled down when opened from further down another
  // page (e.g. the featured grid or the map). Jump to the top whenever the
  // listing shown here changes.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [id])

  // Where the user came from: Featured Properties on the main page ("/")
  // or the All Listing map page ("/all-listing"). Falls back to browser
  // history if the page was opened directly (e.g. a shared link/refresh).
  const fromPath = location.state?.from
  const backLabel =
    fromPath === '/all-listing'
      ? 'Back to All Listing'
      : fromPath === '/home'
        ? 'Back to Home'
        : 'Back to Listings'
  const goBack = () => {
    if (fromPath) {
      navigate(fromPath)
    } else {
      navigate(-1)
    }
  }

  if (!property) {
    return (
      <div>
        <Navbar />
        <section className="property-page">
          <div className="container property-page__empty">
            <p>We couldn't find that listing.</p>
            <button type="button" className="property-page__back-btn" onClick={() => navigate('/')}>
              &larr; Back to Home
            </button>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <section className="property-page">
        <div className="container">
          <button type="button" className="property-page__back-btn" onClick={goBack}>
            &larr; {backLabel}
          </button>

          <div className="property-page__grid">
            <div className="property-page__image-wrap">
              <img src={property.image} alt={property.title} className="property-page__image" />
            </div>

            <div className="property-page__body">
              <p className="property-page__id">Listing ID: {property.id}</p>
              <h1 className="property-page__price">{property.price}</h1>
              <h2 className="property-page__title">{property.title}</h2>
              {property.address && (
                <p className="property-page__address">{property.address}</p>
              )}

              <ul className="property-page__specs">
                {property.beds && (
                  <li>
                    <BedIcon /> {property.beds} Bedroom{property.beds > 1 ? 's' : ''}
                  </li>
                )}
                {property.baths && (
                  <li>
                    <BathIcon /> {property.baths} Bathroom{property.baths > 1 ? 's' : ''}
                  </li>
                )}
                {property.garage && (
                  <li>
                    <GarageIcon /> {property.garage}-Car Garage
                  </li>
                )}
                {property.sqm && (
                  <li>
                    <RulerIcon /> {property.sqm}
                  </li>
                )}
              </ul>

              {property.status && (
                <p
                  className={`property-page__status property-page__status--${property.status
                    .replace(/\s/g, '')
                    .toLowerCase()}`}
                >
                  {property.status}
                </p>
              )}

              {property.description && (
                <p className="property-page__desc">{property.description}</p>
              )}

              {property.lister && (
                <div className="property-page__lister">
                  <p className="property-page__lister-label">Listed by</p>
                  <p className="property-page__lister-name">{property.lister.name}</p>
                  {property.lister.phone && (
                    <p className="property-page__lister-contact">
                      <i className="fa-solid fa-phone" aria-hidden="true" />
                      {property.lister.phone}
                    </p>
                  )}
                  {property.lister.email && (
                    <p className="property-page__lister-contact">
                      <i className="fa-solid fa-envelope" aria-hidden="true" />
                      {property.lister.email}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PropertyDetails