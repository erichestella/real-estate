import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import heroImage from '../assets/download.jpeg'
import bgImage from '../assets/download-2.jpeg'
import './BookViewing.css'

const testimonials = [
  {
    quote: 'Superb service from accommodating and friendly staff.',
    author: 'Jennylyn',
  },
  {
    quote: 'They found us our dream home faster than we expected.',
    author: 'Marco',
  },
  {
    quote: 'Professional, honest, and always quick to respond.',
    author: 'Angela',
  },
  {
    quote: 'Made the whole home-buying process stress-free.',
    author: 'Ramon',
  },
]

const priceRanges = [
  'Under ₱3M',
  '₱3M - ₱6M',
  '₱6M - ₱10M',
  '₱10M - ₱20M',
  '₱20M and above',
]

const locations = [
  'Quezon City',
  'Makati',
  'Taguig',
  'Manila',
  'Pasig',
  'Mandaluyong',
]

function BookViewing() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: 'Philippines',
    phone: '',
    priceRange: '',
    location: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to backend / booking service
    console.log('Book a viewing submission:', form)
  }

  return (
    <div className="book-viewing">
      <Navbar />

      {/* Shared full-page background photo behind both columns */}
      <div
        className="book-viewing__bg"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />

      <div className="book-viewing__row">
        {/* Left: text directly over the photo, no card */}
        <aside className="book-viewing__side">
          <h2 className="book-viewing__side-title">Book a Viewing</h2>
          <p className="book-viewing__side-copy">
            Find your next home in Metro Manila through the most trusted and
            reliable real estate advisors.
          </p>

          <div className="book-viewing__slider">
            <div
              className="book-viewing__slider-track"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div className="book-viewing__slide" key={item.author}>
                  <div className="book-viewing__stars" aria-hidden="true">★★★★★</div>
                  <p className="book-viewing__quote">"{item.quote}"</p>
                  <p className="book-viewing__quote-author">{item.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="book-viewing__dots">
            {testimonials.map((item, i) => (
              <button
                key={item.author}
                type="button"
                className={i === slide ? 'is-active' : ''}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </aside>

        {/* Right: white form card, next to the text, not stacked on top */}
        <main className="book-viewing__panel">
          <div className="book-viewing__card">
          <h1 className="book-viewing__title">Begin Your Private Viewing</h1>

          <p className="book-viewing__intro">You've made it.</p>
          <p className="book-viewing__intro">
            Buying a home is no longer just an idea—it's now a real intention.
            Welcome to a more thoughtful way of discovering exceptional homes.
          </p>
          <p className="book-viewing__intro">
            Tell us what you're looking for, and our realtors will curate a
            selection of homes for you.
          </p>

            <img
            className="book-viewing__image"
            src={bgImage}
            alt="Interior of a featured property"
          />

          <p className="book-viewing__form-note">
            Fill out the details below and we'll take care of the rest.
          </p>

          <form className="book-viewing__form" onSubmit={handleSubmit}>
            <div className="book-viewing__form-row">
              <div className="book-viewing__field">
                <label htmlFor="firstName">First name<span>*</span></label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="book-viewing__field">
                <label htmlFor="lastName">Last name<span>*</span></label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="book-viewing__field">
              <label htmlFor="email">Email<span>*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="book-viewing__field">
              <label htmlFor="phone">Phone number<span>*</span></label>
              <div className="book-viewing__phone-row">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  aria-label="Country"
                >
                  <option>Philippines</option>
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+63"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="book-viewing__field">
              <label htmlFor="priceRange">Preferred Price Range<span>*</span></label>
              <select
                id="priceRange"
                name="priceRange"
                required
                value={form.priceRange}
                onChange={handleChange}
              >
                <option value="" disabled>Please Select</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="book-viewing__field">
              <label htmlFor="location">Property Location Preference<span>*</span></label>
              <select
                id="location"
                name="location"
                required
                value={form.location}
                onChange={handleChange}
              >
                <option value="" disabled>Please Select</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="book-viewing__submit">Submit</button>
          </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default BookViewing