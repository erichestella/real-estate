import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './List.css';

export default function List() {
  // React Router doesn't reset scroll position on navigation, so clicking
  // "Selling a property" from further down another page (e.g. the Help
  // section) would otherwise land here scrolled to that same leftover
  // position instead of at the top of this page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const initialFormData = {
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
  };

  const MAX_IMAGES = 10;

  // Simple, standard email shape check: something@something.tld
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Accepts Google Maps links only: maps.google.com, google.com/maps,
  // goo.gl/maps, or maps.app.goo.gl short links.
  const googleMapsPattern = /^(https?:\/\/)?(www\.)?(maps\.google\.[a-z.]+|google\.[a-z.]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)\/.+/i;

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const [images, setImages] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number: digits only, strip anything else as the person types.
    if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, phoneNumber: digitsOnly }));
      if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
      return;
    }

    // Target price: digits only as well, no letters/symbols/commas.
    if (name === 'targetPrice') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, targetPrice: digitsOnly }));
      if (errors.targetPrice) setErrors(prev => ({ ...prev, targetPrice: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImages(prev => {
      const remainingSlots = MAX_IMAGES - prev.length;

      if (remainingSlots <= 0) {
        setErrors(prevErrors => ({
          ...prevErrors,
          images: `You can only upload up to ${MAX_IMAGES} photos.`,
        }));
        return prev;
      }

      const filesToAdd = files.slice(0, remainingSlots);
      const newImages = filesToAdd.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setErrors(prevErrors => ({
        ...prevErrors,
        images: files.length > remainingSlots
          ? `Only ${MAX_IMAGES} photos allowed — the rest weren't added.`
          : '',
      }));

      return [...prev, ...newImages];
    });

    // Allow re-selecting the same file again later
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.';

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.trim())) {
      nextErrors.phoneNumber = 'Enter a valid phone number (digits only).';
    }

    if (!formData.location) {
      nextErrors.location = 'Please select a property location.';
    }

    if (!formData.targetPrice.trim()) {
      nextErrors.targetPrice = 'Target selling price is required.';
    } else if (!/^\d+$/.test(formData.targetPrice.trim())) {
      nextErrors.targetPrice = 'Numbers only, please.';
    }

    if (formData.wazeLink.trim() && !googleMapsPattern.test(formData.wazeLink.trim())) {
      nextErrors.wazeLink = 'Please paste a valid Google Maps link.';
    }

    if (images.length === 0) {
      nextErrors.images = 'Please upload at least one property photo.';
    } else if (images.length > MAX_IMAGES) {
      nextErrors.images = `You can only upload up to ${MAX_IMAGES} photos.`;
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Show the popup, then clear all the form fields
    setErrors({});
    setShowToast(true);
    setFormData(initialFormData);
    setImages([]);

    // Auto-dismiss the popup after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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

        <form className="list-prop-form" onSubmit={handleSubmit} noValidate>
            
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
                    className={errors.firstName ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  {errors.firstName && <p className="list-error-text">{errors.firstName}</p>}
                </div>
                <div className="list-form-field">
                  <label>Last Name*</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Enter your last name" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    className={errors.lastName ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.lastName)}
                  />
                  {errors.lastName && <p className="list-error-text">{errors.lastName}</p>}
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
                    className={errors.email ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <p className="list-error-text">{errors.email}</p>}
                </div>
                <div className="list-form-field">
                  <label>Phone Number*</label>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    inputMode="numeric"
                    maxLength={15}
                    placeholder="0917XXXXXXX" 
                    value={formData.phoneNumber} 
                    onChange={handleChange}
                    className={errors.phoneNumber ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.phoneNumber)}
                  />
                  {errors.phoneNumber && <p className="list-error-text">{errors.phoneNumber}</p>}
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
                    className={errors.location ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.location)}
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
                  {errors.location && <p className="list-error-text">{errors.location}</p>}
                </div>
              </div>

              <div className="form-grid">
                <div className="list-form-field">
                  <label>What is your target selling price? (PHP)*</label>
                  <input 
                    type="text" 
                    name="targetPrice" 
                    inputMode="numeric"
                    placeholder="e.g., 25000000" 
                    value={formData.targetPrice} 
                    onChange={handleChange}
                    className={errors.targetPrice ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.targetPrice)}
                  />
                  {errors.targetPrice && <p className="list-error-text">{errors.targetPrice}</p>}
                </div>
                <div className="list-form-field">
                  <label>Google Maps Link (Optional)</label>
                  <input 
                    type="text" 
                    name="wazeLink" 
                    placeholder="Paste a Google Maps link..." 
                    value={formData.wazeLink} 
                    onChange={handleChange}
                    className={errors.wazeLink ? 'list-input--error' : ''}
                    aria-invalid={Boolean(errors.wazeLink)}
                  />
                  {errors.wazeLink && <p className="list-error-text">{errors.wazeLink}</p>}
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
                    <span className="upload-count">{images.length}/{MAX_IMAGES} photos</span>
                  </label>
                </div>

                {errors.images && <p className="list-error-text">{errors.images}</p>}

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

          {showToast && (
            <>
              <div className="list-toast-backdrop" />
              <div className="list-toast" role="status">
                <span className="list-toast__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div className="list-toast__text">
                  <p className="list-toast__title">Listing Submitted Successfully!</p>
                  <p className="list-toast__desc">Our acquisition team will review your property details and contact you within 24-48 hours.</p>
                </div>
              </div>
            </>
          )}

      </div>

      <Footer />
    </div>
  );
}