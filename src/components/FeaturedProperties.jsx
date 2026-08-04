import { Link, useNavigate } from 'react-router-dom'
import properties from '../data/properties.js'
import './FeaturedProperties.css'

// How many cards to show here. Raise/lower this number to show more or
// fewer — nothing is deleted, the rest just stay available on the
// All Listing page (and via "View All Properties" below).
const FEATURED_LIMIT = 6

function FeaturedProperties() {
  const navigate = useNavigate()
  const featured = properties.slice(0, FEATURED_LIMIT)

  const goToProperty = (id) => {
    navigate(`/property/${id}`, { state: { from: '/' } })
  }

  return (
    <section className="featured container">
      <h2 className="featured__title">Featured Properties</h2>

      <div className="featured__grid">
        {featured.map((property) => (
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
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {property.location.toUpperCase()}
              </span>
            </div>

            <div className="property-card__body">
              <p className="property-card__price">₱ {property.price.replace('₱', '')}</p>
              <p className="property-card__ref">Your RealState ID No.{property.id.replace('YR-', '')}</p>
              <h3>{property.title}</h3>

              <div className="property-card__specs">
                <span><i className="fa-solid fa-bed" aria-hidden="true"></i> {property.beds ? `${property.beds} Bedrooms` : 'Bedrooms'}</span>
                <span><i className="fa-solid fa-bath" aria-hidden="true"></i> {property.baths ? `${property.baths} Bathrooms` : 'Bathrooms'}</span>
              </div>

              <p
                className={`property-card__status property-card__status--${property.status
                  .replace(/\s/g, '')
                  .toLowerCase()}`}
              >
                {property.status}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProperties