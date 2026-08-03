import './HelpSection.css'

const options = [
  { title: 'Buying a home', desc: 'Get matched with listings that fit your budget and lifestyle.', cta: 'Go here' },
  { title: 'Selling a property', desc: 'List with us and reach verified, ready-to-move buyers.', cta: 'Go Here' },
  { title: 'Renting', desc: 'Find a place to move into, from studios to family homes.', cta: 'Go Here' },
  { title: 'Talk to an agent', desc: 'Book a call with a Your RealState broker for guidance.', cta: 'Go Here' },
]

const icons = {
  'Buying a home': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <circle cx="12" cy="14" r="2.2" />
    </svg>
  ),
  'Selling a property': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 12l3 3 7-7" />
      <path d="M4 20l4-4" />
      <path d="M20 20l-4-4" />
    </svg>
  ),
  Renting: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M9 20v-6h6v6" />
      <path d="M2 9l10-6 10 6" />
    </svg>
  ),
  'Talk to an agent': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 1H6a2 2 0 0 1 2 1.7 12.6 12.6 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L7 8.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.8.7A2 2 0 0 1 22 16.9z" />
    </svg>
  ),
}

function HelpSection() {
  return (
    <section className="help container">
      <div className="featured__heading">
        <h2>How Can We Help You</h2>
        <p>Tell us what you need, and we'll point you the right way.</p>
      </div>

      <div className="help__grid">
        {options.map((opt) => (
          <div className="help-card" key={opt.title}>
            <div className="help-card__icon">{icons[opt.title]}</div>
            <h3>{opt.title}</h3>
            <p>{opt.desc}</p>
            <button type="button" className="help-card__cta">{opt.cta}</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HelpSection