import { useNavigate } from 'react-router-dom'
import properties from '../data/properties.js'
import './FeaturedProperties.css'

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 11.5 7.3 11.76a1 1 0 0 0 1.4 0C13 21.5 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
)

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

function FeaturedProperties() {
  const navigate = useNavigate()

  const goToProperty = (id) => {
    navigate(`/property/${id}`)
  }

  return (
    <section className="featured container">
      <h2 className="featured__title">Featured Properties</h2>

      <div className="featured__grid">
        {properties.map((property) => (
          <article
            className="property-card"
            key={property.id}
            onClick={() => goToProperty(property.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                goToProperty(property.id)
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="property-card__image">
              <img src={property.image} alt={property.title} loading="lazy" />
              <span className="property-card__location">
                <PinIcon /> {property.location.toUpperCase()}
              </span>
            </div>

            <div className="property-card__body">
              <p className="property-card__price">₱ {property.price.replace('₱', '')}</p>
              <p className="property-card__ref">Your RealState ID No.{property.id.replace('YR-', '')}</p>
              <h3>{property.title}</h3>

              <div className="property-card__specs">
                <span><BedIcon /> {property.beds ? `${property.beds} Bedrooms` : 'Bedrooms'}</span>
                <span><BathIcon /> {property.baths ? `${property.baths} Bathrooms` : 'Bathrooms'}</span>
              </div>

              <p className="property-card__status">{property.status}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProperties