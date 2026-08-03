import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './List.css';

export default function List() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    propertyType: 'Single Detached',
    location: '',
    targetPrice: '',
    sellerType: 'I am selling a property I personally own',
    sellingFrequency: 'This is my first time selling a property',
    wazeLink: '',
  });

  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="list-prop-wrapper">
      <Navbar />

      <div className="list-prop-container">

        <div className="presello-hero-banner">
          <div className="banner-overlay-dark">
            <h1 className="banner-title">List Your Property With Us</h1>
            <p className="banner-subtitle">Feature your luxury home or estate to high-end buyers</p>
          </div>
        </div>

        <div className="list-prop-header">
          <h2>Sell Your Property</h2>
          <p>Share a few details below so our real estate brokers can confidentially review your property for possible inclusion in Presello's curated listings.</p>
        </div>

        {submitted ? (
          <div className="success-state">
            <div className="success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3>Listing Submitted Successfully!</h3>
            <p>Our acquisition team will review your property details and contact you within 24-48 hours.</p>
            <button className="btn-reset" onClick={() => setSubmitted(false)}>
              Submit Another Property
            </button>
          </div>
        ) : (
          <form className="list-prop-form" onSubmit={handleSubmit}>
            
            {/* Section 1: Customer Info */}
            <div className="form-section">
              <h3>Customer Information</h3>
              
              <div className="form-grid">
                <div className="list-form-field">
                  <label>First Name*</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Enter your first name" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="list-form-field">
                  <label>Last Name*</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Enter your last name" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="list-form-field">
                  <label>Email Address*</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    value={formData.email} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="list-form-field">
                  <label>Phone Number*</label>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="0917XXXXXXX" 
                    value={formData.phoneNumber} 
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Property Details */}
            <div className="form-section">
              <h3>Property Information</h3>
              
              <div className="form-grid">
                <div className="list-form-field">
                  <label>What type of property are you selling?*</label>
                  <select 
                    name="propertyType" 
                    value={formData.propertyType} 
                    onChange={handleChange}
                  >
                    <option value="Single Detached">Single Detached</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Vacant Lot">Vacant Lot</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Preselling Project">Preselling Project</option>
                  </select>
                </div>

                <div className="list-form-field">
                  <label>Where is the property located?*</label>
                  <select 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Property Location</option>
                    <option value="Alabang">Ayala Alabang</option>
                    <option value="BGC">BGC</option>
                    <option value="Makati">Makati</option>
                    <option value="Quezon City">Quezon City</option>
                    <option value="San Juan">San Juan</option>
                    <option value="Tagaytay City">Tagaytay City</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="list-form-field">
                  <label>What is your target selling price? (PHP)*</label>
                  <input 
                    type="text" 
                    name="targetPrice" 
                    placeholder="e.g., 25000000" 
                    value={formData.targetPrice} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="list-form-field">
                  <label>Google Maps or Waze Link (Optional)</label>
                  <input 
                    type="text" 
                    name="wazeLink" 
                    placeholder="Paste a Google Maps or Waze link..." 
                    value={formData.wazeLink} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Property Image Upload Section */}
              <div className="list-form-field full-width" style={{ marginTop: '16px' }}>
                <label>Property Photos (Upload up to 10 photos)*</label>
                <div className="image-upload-dropzone">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    id="property-img-input"
                    className="file-input-hidden"
                  />
                  <label htmlFor="property-img-input" className="dropzone-label">
                    <span className="upload-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </span>
                    <span>Click to browse or drag and drop property images here</span>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="image-preview-grid">
                    {images.map((img, idx) => (
                      <div key={idx} className="preview-card">
                        <img src={img.preview} alt={`Preview ${idx}`} />
                        <button 
                          type="button" 
                          className="remove-img-btn" 
                          onClick={() => removeImage(idx)}
                          aria-label="Remove photo"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Section 3: Seller Profile */}
            <div className="form-section">
              <h3>Seller Background</h3>
              
              <div className="list-form-field full-width">
                <label>What kind of property seller are you?*</label>
                <select 
                  name="sellerType" 
                  value={formData.sellerType} 
                  onChange={handleChange}
                >
                  <option value="I am selling a property I personally own">I am selling a property I personally own</option>
                  <option value="I build properties and sell them after completion">I build properties and sell them after completion</option>
                  <option value="I buy properties and resell them as investments">I buy properties and resell them as investments</option>
                  <option value="I am a property developer selling as part of my business">I am a property developer selling as part of my business</option>
                </select>
              </div>

              <div className="list-form-field full-width" style={{ marginTop: '16px' }}>
                <label>How often do you sell properties?*</label>
                <select 
                  name="sellingFrequency" 
                  value={formData.sellingFrequency} 
                  onChange={handleChange}
                >
                  <option value="This is my first time selling a property">This is my first time selling a property</option>
                  <option value="I have sold a property before">I have sold a property before</option>
                  <option value="I sell 1–3 properties per year">I sell 1–3 properties per year</option>
                  <option value="I sell 4 or more properties per year">I sell 4 or more properties per year</option>
                </select>
              </div>
            </div>

            <div className="list-btn-container">
              <button type="submit" className="btn-submit-listing">
                Submit Property Listing
              </button>
            </div>

          </form>
        )}

      </div>

      <Footer />
    </div>
  );
}