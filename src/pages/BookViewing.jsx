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

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: 'Philippines',
  phone: '',
  priceRange: '',
  location: '',
}

// Simple, standard email shape check: something@something.tld
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function BookViewing() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // Phone number field: strip out anything that isn't a digit as the
    // person types, so letters/symbols never make it into the field.
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      setForm((prev) => ({ ...prev, phone: digitsOnly }))
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: '' }))
      }
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear an existing error for this field as soon as the person edits it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required.'
    }
    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    } else if (!/^\d{7,15}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number (digits only).'
    }

    if (!form.priceRange) {
      nextErrors.priceRange = 'Please select a price range.'
    }
    if (!form.location) {
      nextErrors.location = 'Please select a location.'
    }

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // TODO: wire up to backend / booking service
    console.log('Book a viewing submission:', form)

    // Show the success popup, then clear the form
    setErrors({})
    setShowToast(true)
    setForm(initialFormState)

    // Auto-dismiss the popup after 3 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
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

          <form className="book-viewing__form" onSubmit={handleSubmit} noValidate>
            <div className="book-viewing__form-row">
              <div className="book-viewing__field">
                <label htmlFor="firstName">First name<span>*</span></label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'book-viewing__input--error' : ''}
                  value={form.firstName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <p className="book-viewing__error-text">{errors.firstName}</p>
                )}
              </div>
              <div className="book-viewing__field">
                <label htmlFor="lastName">Last name<span>*</span></label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  type="text"
                  className={errors.lastName ? 'book-viewing__input--error' : ''}
                  value={form.lastName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <p className="book-viewing__error-text">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="book-viewing__field">
              <label htmlFor="email">Email<span>*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="yourname@gmail.com"
                className={errors.email ? 'book-viewing__input--error' : ''}
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="book-viewing__error-text">{errors.email}</p>
              )}
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
                  inputMode="numeric"
                  placeholder="+630912345678"
                  maxLength={15}
                  className={errors.phone ? 'book-viewing__input--error' : ''}
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                />
              </div>
              {errors.phone && (
                <p className="book-viewing__error-text">{errors.phone}</p>
              )}
            </div>

            <div className="book-viewing__field">
              <label htmlFor="priceRange">Preferred Price Range<span>*</span></label>
              <select
                id="priceRange"
                name="priceRange"
                className={errors.priceRange ? 'book-viewing__input--error' : ''}
                value={form.priceRange}
                onChange={handleChange}
                aria-invalid={Boolean(errors.priceRange)}
              >
                <option value="" disabled>Please Select</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              {errors.priceRange && (
                <p className="book-viewing__error-text">{errors.priceRange}</p>
              )}
            </div>

            <div className="book-viewing__field">
              <label htmlFor="location">Property Location Preference<span>*</span></label>
              <select
                id="location"
                name="location"
                className={errors.location ? 'book-viewing__input--error' : ''}
                value={form.location}
                onChange={handleChange}
                aria-invalid={Boolean(errors.location)}
              >
                <option value="" disabled>Please Select</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && (
                <p className="book-viewing__error-text">{errors.location}</p>
              )}
            </div>

            <button type="submit" className="book-viewing__submit">Submit</button>
          </form>

          {showToast && (
            <>
              <div className="book-viewing__toast-backdrop" />
              <div className="book-viewing__toast" role="status">
                <span className="book-viewing__toast-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div className="book-viewing__toast-text">
                  <p className="book-viewing__toast-title">Viewing request sent!</p>
                  <p className="book-viewing__toast-desc">Our team will get back to you shortly.</p>
                </div>
              </div>
            </>
          )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default BookViewing