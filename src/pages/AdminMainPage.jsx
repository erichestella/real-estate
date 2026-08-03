import { useState } from 'react'
import AdminNav from '../components/AdminNav.jsx'
import AdminFooter from '../components/AdminFooter.jsx'
import './AdminMainPage.css'

// TODO: swap out with real listings from the backend/db once ready.
// Random/placeholder properties added first, Shopee/Lazada-style card layout:
// picture -> title -> price -> description (sqm, location).
const listings = [
  {
    id: 'YR-1042',
    title: 'Modern Family Home with Landscaped Garden',
    image: 'https://i.pinimg.com/736x/db/ab/5e/dbab5e951d006c664c4578fd9a26c54e.jpg',
    location: 'Quezon City',
    sqm: 180,
    price: 8500000,
    status: 'For Sale',
    postedBy: 'J. Santos',
  },
  {
    id: 'YR-1077',
    title: 'Riverside Townhouse, 3BR Corner Unit',
    image: 'https://i.pinimg.com/736x/35/a0/60/35a0605cb34797410b3aa68118b82b51.jpg',
    location: 'Pasig',
    sqm: 120,
    price: 6200000,
    status: 'For Rent',
    postedBy: 'M. Cruz',
  },
  {
    id: 'YR-1103',
    title: 'Skyline Condo Unit with Balcony View',
    image: 'https://i.pinimg.com/1200x/ee/b3/07/eeb307b4d32be27279a8136a7d7893c3.jpg',
    location: 'Taguig',
    sqm: 45,
    price: 4750000,
    status: 'Pending',
    postedBy: 'A. Reyes',
  },
  {
    id: 'YR-1129',
    title: 'Garden Bungalow near Marikina River Park',
    image: 'https://i.pinimg.com/1200x/2a/fe/e6/2afee6d5bcb47c9026d1f5b3d138adcd.jpg',
    location: 'Marikina',
    sqm: 150,
    price: 5900000,
    status: 'For Sale',
    postedBy: 'J. Santos',
  },
  {
    id: 'YR-1156',
    title: 'Downtown Loft, Fully Furnished',
    image: 'https://i.pinimg.com/736x/07/3a/21/073a21ca95dd8aecda123fd1b0c5e25c.jpg',
    location: 'Makati',
    sqm: 60,
    price: 7300000,
    status: 'Sold',
    postedBy: 'K. Bautista',
  },
  {
    id: 'YR-1188',
    title: 'Cozy Studio Unit Near Transit Hub',
    image: 'https://i.pinimg.com/736x/4a/ea/9a/4aea9a9666cfe6ddab9c5c61765dd733.jpg',
    location: 'Quezon City',
    sqm: 28,
    price: 2450000,
    status: 'For Rent',
    postedBy: 'A. Reyes',
  },
]

const peso = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

function AdminMainPage() {
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')
  const [postedBy, setPostedBy] = useState('')

  const filtered = listings.filter((item) =>
    (status ? item.status === status : true) &&
    (location ? item.location === location : true) &&
    (postedBy ? item.postedBy === postedBy : true)
  )

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
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Pending</option>
              <option>Sold</option>
            </select>
          </div>

          <div className="admin-sort__field">
            <label htmlFor="sortLocation">Location</label>
            <select id="sortLocation" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All</option>
              <option>Quezon City</option>
              <option>Pasig</option>
              <option>Taguig</option>
              <option>Marikina</option>
              <option>Makati</option>
            </select>
          </div>

          <div className="admin-sort__field">
            <label htmlFor="sortPostedBy">Posted By</label>
            <select id="sortPostedBy" value={postedBy} onChange={(e) => setPostedBy(e.target.value)}>
              <option value="">All</option>
              <option>J. Santos</option>
              <option>M. Cruz</option>
              <option>A. Reyes</option>
              <option>K. Bautista</option>
            </select>
          </div>
        </div>

        <div className="admin-listing-grid">
          {filtered.map((item) => (
            <article className="admin-listing-card" key={item.id}>
              <div className="admin-listing-card__image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className={`status-pill status-pill--${item.status.replace(/\s/g, '').toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="admin-listing-card__body">
                <span className="admin-listing-card__id">{item.id}</span>
                <h3>{item.title}</h3>
                <p className="admin-listing-card__price">{peso.format(item.price)}</p>
                <p className="admin-listing-card__desc">{item.location} · {item.sqm} sqm</p>
                <div className="admin-listing-card__footer">
                  <span className="admin-listing-card__posted">
                    <i className="fa-regular fa-user" aria-hidden="true"></i> Posted by {item.postedBy}
                  </span>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p>No listings match those filters.</p>}
        </div>
      </main>

      <AdminFooter />
    </div>
  )
}

export default AdminMainPage