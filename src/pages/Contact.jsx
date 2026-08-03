import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './Contact.css';

export default function Contact() {
  const [lightFormData, setLightFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    customerType: '',
    notes: '',
  });

  const [expertFormData, setExpertFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    action: '',
    preferredTime: '',
  });

  const [expertSubmitted, setExpertSubmitted] = useState(false);

  const handleLightChange = (e) => {
    const { name, value } = e.target;
    setLightFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpertChange = (e) => {
    const { name, value } = e.target;
    setExpertFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLightSubmit = (e) => {
    e.preventDefault();
    console.log('Light Form Submitted:', lightFormData);
    alert('Thank you! Message sent.');
  };

  const handleExpertSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${expertFormData.firstName}! A real estate expert will contact you shortly.`);
    setExpertSubmitted(true);
  };

  return (
    <div className="contact-wrapper">

      <Navbar />

      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>CONTACT US</h1>
        </div>
      </section>

      {/* SECTION 1: Light Contact Section */}
      <section className="light-contact-section">
        <div className="light-grid">
          {/* Left Column containing Intro Text + Form */}
          <div className="left-column">
            <div className="intro-text-box">
              <p className="intro-text">
                With our partners and clients at the core of our hearts, we aim to bring positive changes into each home owner's life. Our objective is not just to sell real estate, but to deliver the best property and housing service in the market. By being open, honest, and connecting with our clients we hope to foster partnerships that would help form meaningful relationships with those around us. Bringing integrity, passion and friendship altogether.
              </p>
              <p className="intro-subtext">
                Fill the contact form below and our team will get in touch with you.
              </p>
            </div>

            <form onSubmit={handleLightSubmit} className="light-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={lightFormData.firstName}
                    onChange={handleLightChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lightFormData.lastName}
                    onChange={handleLightChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email<span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={lightFormData.email}
                  onChange={handleLightChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number<span className="required">*</span></label>
                <div className="phone-input">
                  <select disabled defaultValue="+63">
                    <option value="+63">PH +63</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={lightFormData.phone}
                    onChange={handleLightChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Customer Type<span className="required">*</span></label>
                <select
                  name="customerType"
                  value={lightFormData.customerType}
                  onChange={handleLightChange}
                  required
                >
                  
                  <option value="" disabled>Please Select</option>
                  <option value="residential">Residential Buyer</option>
                  <option value="commercial">Commercial Investor</option>
                  <option value="partner">Property Partner</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Notes<span className="required">*</span></label>
                <textarea
                  name="notes"
                  rows="4"
                  value={lightFormData.notes}
                  onChange={handleLightChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-gold-fill">SEND MESSAGE</button>
            </form>
          </div>

          {/* Right Column Sidebar */}
          <div className="info-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">GET IN TOUCH</h3>

              <div className="sidebar-item">
                <div className="sidebar-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="14" x="2" y="5" rx="2"/></svg>
                </div>
                <a href="mailto:realstate@gmail.com" className="sidebar-value">realstate@gmail.com</a>
                <span className="sidebar-label">EMAIL YOUR INQUIRIES</span>
              </div>

              <div className="sidebar-item">
                <div className="sidebar-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <a href="tel:09123456789" className="sidebar-value">0912 345 6789</a>
                <span className="sidebar-label">CLICK TO CALL</span>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">CONNECT WITH US</h3>
              <div className="social-links">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Dark Theme Expert Section */}
      <section className="dark-expert-section">
        <div className="expert-container">
          <h2>SPEAK TO A REAL ESTATE EXPERT</h2>
          <p className="expert-subtitle">RealState Clients gain personalized property advice</p>

          {expertSubmitted ? (
            <div className="expert-confirmation">
              <div className="expert-confirmation__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3>Request received, {expertFormData.firstName}!</h3>
              <p>One of our real estate experts will reach out to you at {expertFormData.email || 'the email you provided'} soon.</p>
            </div>
          ) : (
            <form onSubmit={handleExpertSubmit} className="expert-form">
              <div className="expert-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  value={expertFormData.firstName}
                  onChange={handleExpertChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name*"
                  value={expertFormData.lastName}
                  onChange={handleExpertChange}
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Your email address*"
                value={expertFormData.email}
                onChange={handleExpertChange}
                required
              />

              <div className="expert-phone-row">
                <select disabled defaultValue="Philippines">
                  <option value="Philippines">Philippines</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+63"
                  value={expertFormData.phone}
                  onChange={handleExpertChange}
                  required
                />
              </div>

              <div className="expert-field">
                <label>What would you like to do?</label>
                <select
                  name="action"
                  value={expertFormData.action}
                  onChange={handleExpertChange}
                >
                  <option value="" disabled>Please Select</option>
                  <option value="buy">Buy a New Property</option>
                  <option value="sell">Sell or Rent Out Property</option>
                  <option value="consult">Schedule Property Consultation</option>
                </select>
              </div>

              <div className="expert-field">
                <label>When is your preferred time to be contacted?</label>
                <select
                  name="preferredTime"
                  value={expertFormData.preferredTime}
                  onChange={handleExpertChange}
                >
                  <option value="" disabled>Please Select</option>
                  <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>

              <button type="submit" className="btn-expert-action">REQUEST A CALL</button>
            </form>
          )}

          <div className="expert-socials">
            <p>CONNECT WITH US</p>
            <div className="social-links-inline">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 0 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}