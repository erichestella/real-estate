import './SearchBar.css'

function SearchBar() {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <div className="search-bar__field">
        <label htmlFor="propertyId">Property ID</label>
        <input id="propertyId" type="text" placeholder="Any" />
      </div>

      <div className="search-bar__field">
        <label htmlFor="location">Location</label>
        <select id="location" defaultValue="">
          <option value="">Any</option>
          <option value="quezon-city">Quezon City</option>
          <option value="makati">Makati</option>
          <option value="taguig">Taguig</option>
          <option value="pasig">Pasig</option>
        </select>
      </div>

      <div className="search-bar__field">
        <label htmlFor="propertyType">Property Type</label>
        <select id="propertyType" defaultValue="">
          <option value="">Any</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="lot">Lot</option>
        </select>
      </div>

      <div className="search-bar__field">
        <label htmlFor="minPrice">Min. Price</label>
        <select id="minPrice" defaultValue="">
          <option value="">Any</option>
          <option value="1000000">₱1M</option>
          <option value="5000000">₱5M</option>
          <option value="10000000">₱10M</option>
        </select>
      </div>

      <div className="search-bar__field">
        <label htmlFor="maxPrice">Max. Price</label>
        <select id="maxPrice" defaultValue="">
          <option value="">Any</option>
          <option value="5000000">₱5M</option>
          <option value="10000000">₱10M</option>
          <option value="20000000">₱20M+</option>
        </select>
      </div>

      <button type="button" className="search-bar__clear">Clear</button>
      <button type="submit" className="search-bar__submit">Search</button>
    </form>
  )
}

export default SearchBar
