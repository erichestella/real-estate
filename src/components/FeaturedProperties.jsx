import './FeaturedProperties.css'

const properties = [
  {
    id: 'YR-73160',
    title: '2,228 SQM Commercial Property for Sale along Roxas Boulevard, Parañaque',
    location: 'Parañaque',
    price: '₱5,000,000,000',
    beds: null,
    baths: null,
    status: 'AVAILABLE',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
  },
  {
    id: 'YR-73140',
    title: '2,378 SQM Commercial Property for Sale in Aseana Business Park, Brgy. Tambo, Parañaque City',
    location: 'Parañaque',
    price: '₱3,500,000,000',
    beds: null,
    baths: null,
    status: 'AVAILABLE',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
  },
  {
    id: 'YR-95160',
    title: 'Grand 2-Storey Mansion for Sale in South Forbes Park, Makati',
    location: 'Forbes Park, Makati',
    price: '₱3,500,000,000',
    beds: 3,
    baths: null,
    status: 'AVAILABLE',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
  },
  {
    id: 'YR-88120',
    title: 'Vacant Residential Lot in Ayala Alabang Village, Muntinlupa',
    location: 'Ayala Alabang, Muntinlupa',
    price: '₱180,000,000',
    beds: null,
    baths: null,
    status: 'AVAILABLE',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
  },
  {
    id: 'YR-64410',
    title: 'Fully Furnished 4BR Family Home in Urdaneta Village, Makati',
    location: 'Makati',
    price: '₱120,000,000',
    beds: 4,
    baths: 3,
    status: 'AVAILABLE',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
  },
  {
    id: 'YR-51290',
    title: 'Corner Commercial Building along Timog Avenue, Quezon City',
    location: 'Quezon City',
    price: '₱250,000,000',
    beds: null,
    baths: null,
    status: 'AVAILABLE',
    image: 'https://i.pinimg.com/736x/6d/1e/2c/6d1e2c631542855931b1e22a3a1e993d.jpg',
  },
]

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
  return (
    <section className="featured container">
      <h2 className="featured__title">Featured Properties</h2>

      <div className="featured__grid">
        {properties.map((property) => (
          <article className="property-card" key={property.id}>
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