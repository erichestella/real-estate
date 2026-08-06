import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchableSelect from './SearchableSelect.jsx'
import properties from '../data/properties.js'
import './SearchBar.css'

// No explicit "type" field exists on the listings data, so it's inferred
// from the title — good enough to power the Property Type filter without
// having to touch every entry in properties.js.
function inferPropertyType(title) {
  const t = title.toLowerCase()
  if (t.includes('condo')) return 'Condo'
  if (t.includes('townhouse')) return 'Townhouse'
  if (t.includes('apartment')) return 'Apartment'
  if (t.includes('commercial')) return 'Commercial'
  if (t.includes('house and lot') || t.includes('house')) return 'House'
  if (t.includes('lot')) return 'Lot'
  return 'Other'
}

const MIN_PRICE_OPTIONS = ['₱1,000,000', '₱5,000,000', '₱10,000,000']
const MAX_PRICE_OPTIONS = ['₱5,000,000', '₱10,000,000', '₱20,000,000']

function SearchBar() {
  const navigate = useNavigate()

  const [propertyId, setPropertyId] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const idFieldRef = useRef(null)

  const locationOptions = useMemo(
    () => [...new Set(properties.map((item) => item.location))].sort(),
    []
  )
  const propertyTypeOptions = useMemo(
    () => [...new Set(properties.map((item) => inferPropertyType(item.title)))].sort(),
    []
  )

  // Live matches as the person types a Property ID — checked against both
  // the ID itself and the title, so "roxas" or "YR-731" both work.
  const idMatches = useMemo(() => {
    const q = propertyId.trim().toLowerCase()
    if (!q) return []
    return properties
      .filter((item) => item.id.toLowerCase().includes(q) || item.title.toLowerCase().includes(q))
      .slice(0, 6)
  }, [propertyId])

  useEffect(() => {
    if (!showSuggestions) return
    const onClickOutside = (e) => {
      if (idFieldRef.current && !idFieldRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [showSuggestions])

  const goToProperty = (id) => {
    setShowSuggestions(false)
    navigate(`/property/${id}`)
  }

  const handleIdChange = (e) => {
    setPropertyId(e.target.value)
    setShowSuggestions(true)
    setNotFound(false)
  }

  const handleClear = () => {
    setPropertyId('')
    setLocation('')
    setPropertyType('')
    setMinPrice('')
    setMaxPrice('')
    setShowSuggestions(false)
    setNotFound(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = propertyId.trim()

    // Searching a specific ID takes priority — jump straight to that
    // listing's page instead of filtering a results list.
    if (q) {
      const exact = properties.find((item) => item.id.toLowerCase() === q.toLowerCase())
      if (exact) {
        goToProperty(exact.id)
        return
      }
      if (idMatches.length === 1) {
        goToProperty(idMatches[0].id)
        return
      }
      setNotFound(true)
      setShowSuggestions(true)
      return
    }

    // No ID typed — fall back to browsing All Listing, carrying over
    // whichever filters were picked (All Listing currently reads
    // ?location=, the rest are passed along for when it supports them).
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (propertyType) params.set('type', propertyType)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    const query = params.toString()
    navigate(query ? `/all-listing?${query}` : '/all-listing')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__field search-bar__field--id" ref={idFieldRef}>
        <label htmlFor="propertyId">Property ID</label>
        <input
          id="propertyId"
          type="text"
          placeholder="Any"
          value={propertyId}
          onChange={handleIdChange}
          onFocus={() => propertyId && setShowSuggestions(true)}
          autoComplete="off"
        />

        {showSuggestions && propertyId && (
          <ul className="search-bar__suggestions">
            {idMatches.length > 0 ? (
              idMatches.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => goToProperty(item.id)}>
                    <span className="search-bar__suggestion-id">{item.id}</span>
                    <span className="search-bar__suggestion-title">{item.title}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="search-bar__suggestion-empty">No listings match "{propertyId}"</li>
            )}
          </ul>
        )}

        {notFound && (
          <div className="search-bar__error">No listing found for that ID.</div>
        )}
      </div>

      <div className="search-bar__field">
        <label htmlFor="location">Location</label>
        <SearchableSelect
          id="location"
          value={location}
          onChange={setLocation}
          options={locationOptions}
        />
      </div>

      <div className="search-bar__field">
        <label htmlFor="propertyType">Property Type</label>
        <SearchableSelect
          id="propertyType"
          value={propertyType}
          onChange={setPropertyType}
          options={propertyTypeOptions}
        />
      </div>

      <div className="search-bar__field">
        <label htmlFor="minPrice">Min. Price</label>
        <SearchableSelect
          id="minPrice"
          value={minPrice}
          onChange={setMinPrice}
          options={MIN_PRICE_OPTIONS}
        />
      </div>

      <div className="search-bar__field">
        <label htmlFor="maxPrice">Max. Price</label>
        <SearchableSelect
          id="maxPrice"
          value={maxPrice}
          onChange={setMaxPrice}
          options={MAX_PRICE_OPTIONS}
        />
      </div>

      <button type="button" className="search-bar__clear" onClick={handleClear}>
        Clear
      </button>
      <button type="submit" className="search-bar__submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar