import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import PopularLocations from '../components/PopularLocations.jsx'
import HelpSection from '../components/HelpSection.jsx'
import heroBg from '../assets/download-3.png'
import './MainPage.css'

function MainPage() {
  return (
    <div>
      <Navbar />

      <section className="hero">
        <div
          className="hero__bg"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div className="hero__bg-overlay" aria-hidden="true" />
        </div>

        <div className="container hero__inner">
          <h1>Invest in your future.<br />Invest in Your RealEstate.</h1>
          <p className="hero__subtitle">
            Find your next home in Metro Manila through a trusted and reliable real estate brokerage.
          </p>

          <div className="hero__search">
            <SearchBar />
          </div>
        </div>
      </section>

      <FeaturedProperties />
      <PopularLocations />
      <HelpSection />

      <Footer />
    </div>
  )
}

export default MainPage