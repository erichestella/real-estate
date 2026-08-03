import './PopularLocations.css'

const locations = [
  { name: 'Quezon City', count: 128, image: 'https://i.pinimg.com/1200x/c6/fd/19/c6fd19fe067e855c819567c2984dab67.jpg' },
  { name: 'Makati', count: 76, image: 'https://i.pinimg.com/736x/62/a1/e9/62a1e9846e7d2f6df00444ae009c648b.jpg' },
  { name: 'Taguig', count: 94, image: 'https://i.pinimg.com/736x/40/7b/e8/407be8f045de5ba54f3a8c3866f291ec.jpg' },
  { name: 'Pasig', count: 61, image: 'https://i.pinimg.com/736x/43/06/d7/4306d7a91d0c1b088a11ec1c240aa0d1.jpg' },
  { name: 'Mandaluyong', count: 48, image: 'https://i.pinimg.com/1200x/95/7d/1a/957d1a9bf7138c5377909e8a8272be03.jpg' },
  { name: 'Marikina', count: 33, image: 'https://i.pinimg.com/736x/6c/0b/10/6c0b1052a97ccff35b257d8994481b4a.jpg' },
]

function PopularLocations() {
  return (
    <section className="locations container">
      <div className="featured__heading">
        <h2>Popular Property Location</h2>
        <p>Browse listings by the areas people are searching for most.</p>
      </div>

      <div className="locations__grid">
        {locations.map((loc) => (
          <div className="location-chip" key={loc.name}>
            <div className="location-chip__image">
              <img src={loc.image} alt={loc.name} loading="lazy" />
            </div>
            <div className="location-chip__body">
              <span className="location-chip__name">{loc.name}</span>
              <p className="location-chip__count">{loc.count} listings available in this area.</p>
              <button type="button" className="location-chip__cta">View Listings Here</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularLocations