import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './AllListing.css'

// Property pins for the map. Uses the same kind of listing info as the
// Featured Properties section (name, sqm, short description, price, photo).
const mapProperties = [
  {
    id: 'YR-12238',
    name: '2-Bedroom House and Lot, Buenaventura Subdivision',
    sqm: '796 SQM',
    description: '2-bedroom, 2-toilet & bath home with a 4-car garage, situated in a quiet subdivision.',
    price: '₱123,567,902.05',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.5378,
    lng: 121.0014,
    bedrooms: 2,
    bathrooms: 2,
    garage: 4,
    address: '1223 St., Buenaventura Subdivision',
    lister: {
      name: 'Ms. Maria C. Dela Cruz',
      phone: '0949392292',
      email: 'mariacdc@gmail.com',
    },
  },
  {
    id: 'YR-73160',
    name: 'Commercial Property along Roxas Boulevard, Parañaque',
    sqm: '2,228 SQM',
    description: 'Prime commercial lot facing Roxas Boulevard, ideal for mixed-use development.',
    price: '₱5,000,000,000',
    image: 'https://i.pinimg.com/1200x/d4/53/15/d45315c6406925c66791f215c299364c.jpg',
    lat: 14.5083,
    lng: 120.9822,
    address: 'Roxas Boulevard, Parañaque City',
    lister: {
      name: 'Mr. Jerome A. Santos',
      phone: '0917 234 5678',
      email: 'jerome.santos@yourrealstate.com',
    },
  },
  {
    id: 'YR-73140',
    name: 'Aseana Business Park Lot, Parañaque City',
    sqm: '2,378 SQM',
    description: 'Corner commercial lot inside the growing Aseana Business Park district.',
    price: '₱3,500,000,000',
    image: 'https://i.pinimg.com/736x/7c/dd/d3/7cddd359e1f8df8b528c1f30cf16a6b1.jpg',
    lat: 14.5137,
    lng: 120.9865,
    address: 'Aseana Business Park, Parañaque City',
    lister: {
      name: 'Ms. Karen L. Villanueva',
      phone: '0918 345 6789',
      email: 'karen.villanueva@yourrealstate.com',
    },
  },
  {
    id: 'YR-95160',
    name: '2-Storey Mansion, South Forbes Park, Makati',
    sqm: '1,500 SQM',
    description: 'Grand 2-storey mansion with 3 bedrooms in a guarded Makati village.',
    price: '₱3,500,000,000',
    image: 'https://i.pinimg.com/1200x/0c/46/79/0c4679231cce2def3ec84134ee295b9a.jpg',
    lat: 14.5453,
    lng: 121.0198,
    bedrooms: 3,
    bathrooms: 4,
    garage: 3,
    address: 'South Forbes Park, Makati City',
    lister: {
      name: 'Ms. Patricia G. Reyes',
      phone: '0919 456 7890',
      email: 'patricia.reyes@yourrealstate.com',
    },
  },
  {
    id: 'YR-88120',
    name: 'Vacant Lot, Ayala Alabang Village, Muntinlupa',
    sqm: '1,000 SQM',
    description: 'Vacant residential lot ready for a custom-built family home.',
    price: '₱180,000,000',
    image: 'https://i.pinimg.com/736x/3d/f9/95/3df995674be1a35dac536b20fc78896e.jpg',
    lat: 14.4189,
    lng: 121.0311,
    address: 'Ayala Alabang Village, Muntinlupa City',
    lister: {
      name: 'Mr. Ramon T. Bautista',
      phone: '0920 567 8901',
      email: 'ramon.bautista@yourrealstate.com',
    },
  },
  {
    id: 'YR-64410',
    name: '4BR Family Home, Urdaneta Village, Makati',
    sqm: '650 SQM',
    description: 'Fully furnished 4-bedroom, 3-bathroom home in a premier Makati village.',
    price: '₱120,000,000',
    image: 'https://i.pinimg.com/736x/2c/0d/49/2c0d4915f8ff63ef037cabf7d88e5ad1.jpg',
    lat: 14.5570,
    lng: 121.0224,
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    address: 'Urdaneta Village, Makati City',
    lister: {
      name: 'Ms. Angela M. Cruz',
      phone: '0921 678 9012',
      email: 'angela.cruz@yourrealstate.com',
    },
  },
  {
    id: 'YR-51290',
    name: 'Commercial Building, Timog Avenue, Quezon City',
    sqm: '800 SQM',
    description: 'Corner commercial building along the busy Timog Avenue strip.',
    price: '₱250,000,000',
    image: 'https://i.pinimg.com/736x/6d/1e/2c/6d1e2c631542855931b1e22a3a1e993d.jpg',
    lat: 14.6392,
    lng: 121.0410,
    address: 'Timog Avenue, Quezon City',
    lister: {
      name: 'Mr. Dennis P. Aquino',
      phone: '0922 789 0123',
      email: 'dennis.aquino@yourrealstate.com',
    },
  },
]

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'

function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L)
      return
    }

    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = LEAFLET_CSS
      document.head.appendChild(link)
    }

    const existingScript = document.querySelector(`script[src="${LEAFLET_JS}"]`)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.L))
      existingScript.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.src = LEAFLET_JS
    script.async = true
    script.onload = () => resolve(window.L)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function Maps() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const detailsRef = useRef(null)
  const [activeProperty, setActiveProperty] = useState(null)

  useEffect(() => {
    let cancelled = false

    loadLeaflet().then((L) => {
      if (cancelled || !mapContainerRef.current || mapInstanceRef.current) return

      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: true,
      }).setView([14.55, 121.0], 11)

      // Free, no-API-key OpenStreetMap tiles (no Google Maps billing/quota used).
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      mapProperties.forEach((property) => {
        const specsHtml =
          property.bedrooms || property.bathrooms || property.garage
            ? `
              <div class="map-popup__specs">
                ${property.bedrooms ? `<span><i class="fa-solid fa-bed"></i>${property.bedrooms} Bed</span>` : ''}
                ${property.bathrooms ? `<span><i class="fa-solid fa-sink"></i>${property.bathrooms} Bath</span>` : ''}
                ${property.garage ? `<span><i class="fa-solid fa-warehouse"></i>${property.garage} Garage</span>` : ''}
              </div>
            `
            : ''

        const popupHtml = `
          <div class="map-popup">
            <img src="${property.image}" alt="${property.name}" class="map-popup__image" />
            <div class="map-popup__body">
              <p class="map-popup__price">${property.price}</p>
              <h4 class="map-popup__name">${property.name}</h4>
              <p class="map-popup__sqm">${property.sqm}</p>
              ${specsHtml}
              <p class="map-popup__desc">${property.description}</p>
              <button type="button" class="map-popup__btn" data-property-id="${property.id}">
                View Full Details
              </button>
            </div>
          </div>
        `

        const marker = L.marker([property.lat, property.lng])
          .addTo(map)
          .bindPopup(popupHtml, { maxWidth: 240 })

        // The popup is raw HTML injected by Leaflet (not React), so we wire
        // the button's click after each popup open to trigger React state.
        marker.on('popupopen', (e) => {
          const btn = e.popup.getElement()?.querySelector('.map-popup__btn')
          if (btn) {
            btn.addEventListener('click', () => setActiveProperty(property))
          }
        })
      })

      mapInstanceRef.current = map
    })

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (activeProperty && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [activeProperty])

  return (
    <div>
      <Navbar />

      <section className="maps-page">
        <div
          className="maps-page__banner"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526731955462-f6085f39e742?fm=jpg&q=80&w=1800&auto=format&fit=crop')",
          }}
        >
          <div className="maps-page__banner-overlay" aria-hidden="true" />
          <div className="container maps-page__header">
            <h1>All Listing</h1>
            <p>Explore our listings by location. Click a pin to see the size, price, and details of each property.</p>
          </div>
        </div>

        <div className="container">
          <div className="maps-page__map-frame">
            <div className="maps-page__map" ref={mapContainerRef} />
          </div>

          {activeProperty && (
            <div className="property-details" ref={detailsRef}>
              {/* <button
                type="button"
                className="property-details__close"
                aria-label="Close details"
                onClick={() => setActiveProperty(null)}
              >
                ×
              </button> */}
              <img
                src={activeProperty.image}
                alt={activeProperty.name}
                className="property-details__image"
              />
              <div className="property-details__body">
                <p className="property-details__id">Listing ID: {activeProperty.id}</p>
                <h2 className="property-details__price">{activeProperty.price}</h2>
                <h3 className="property-details__name">{activeProperty.name}</h3>
                {activeProperty.address && (
                  <p className="property-details__address">{activeProperty.address}</p>
                )}

                {(activeProperty.bedrooms || activeProperty.bathrooms || activeProperty.garage) && (
                  <ul className="property-details__specs">
                    {activeProperty.bedrooms && (
                      <li>
                        <i className="fa-solid fa-bed" aria-hidden="true" />
                        {activeProperty.bedrooms} Bedroom{activeProperty.bedrooms > 1 ? 's' : ''}
                      </li>
                    )}
                    {activeProperty.bathrooms && (
                      <li>
                        <i className="fa-solid fa-sink" aria-hidden="true" />
                        {activeProperty.bathrooms} Bathroom{activeProperty.bathrooms > 1 ? 's' : ''}
                      </li>
                    )}
                    {activeProperty.garage && (
                      <li>
                        <i className="fa-solid fa-warehouse" aria-hidden="true" />
                        {activeProperty.garage}-Car Garage
                      </li>
                    )}
                    <li>
                      <i className="fa-solid fa-ruler-combined" aria-hidden="true" />
                      {activeProperty.sqm}
                    </li>
                  </ul>
                )}

                <p className="property-details__desc">{activeProperty.description}</p>
                <p className="property-details__coords">
                  Coordinates: {activeProperty.lat}, {activeProperty.lng}
                </p>

                {activeProperty.lister && (
                  <div className="property-details__lister">
                    <p className="property-details__lister-label">Listed by</p>
                    <p className="property-details__lister-name">{activeProperty.lister.name}</p>
                    <p className="property-details__lister-contact">
                      <i className="fa-solid fa-phone" aria-hidden="true" />
                      {activeProperty.lister.phone}
                    </p>
                    <p className="property-details__lister-contact">
                      <i className="fa-solid fa-envelope" aria-hidden="true" />
                      {activeProperty.lister.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* <div className="maps-page__tile">
            <h3>How to read the map</h3>
            <p>
              Each pin marks a listed property. Tap or click a pin to open its details:
              size in square meters, name, a short description, price, and a photo.
              Zoom or drag the map to explore other areas around Metro Manila.
            </p>
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Maps