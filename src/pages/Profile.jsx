import React, { useState } from 'react';
import AdminNav from '../components/AdminNav.jsx';
import AdminFooter from '../components/AdminFooter.jsx';
import './Profile.css';

export default function Profile() {
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

  const [profilePic, setProfilePic] = useState(null);

  // Admin settings state
  const [settings, setSettings] = useState({
    darkMode: true,
    twoFactorAuth: true,
    auditLogs: true,
    autoBackup: true,
    estimateAlerts: true,
    pushNotifications: true,
    emailNotifications: true,
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setName((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleToggle = (settingKey) => {
    setSettings((prev) => ({
      ...prev,
      [settingKey]: !prev[settingKey],
    }));
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    alert(`Admin profile updated: ${name.firstName} ${name.lastName}`);
  };

  const displayName =
    name.firstName || name.lastName
      ? `${name.firstName} ${name.lastName}`.trim()
      : 'Admin User';

  return (
    <div className={`profile-page ${settings.darkMode ? 'dark-theme' : 'light-theme'}`}>
      <AdminNav />
      <div className={`profile-wrapper ${settings.darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="profile-container">
        <h2 className="profile-header-title">Admin Profile</h2>

        {/* 1. PROFILE PICTURE SECTION */}
        <div className="profile-card">
          <div className="avatar-wrapper">
            {profilePic ? (
              <img src={profilePic} alt="Admin Avatar" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <label htmlFor="avatar-file" className="avatar-upload-btn" title="Upload Admin Photo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </label>
            <input
              type="file"
              id="avatar-file"
              accept="image/*"
              className="hidden-input"
              onChange={handleImageUpload}
            />
          </div>
          <div className="profile-info">
            <h3>{displayName}</h3>
            <p className="role-badge">System Administrator — TOC Construction</p>
          </div>
        </div>

        {/* 2. CHANGE NAME SECTION */}
        <div className="profile-section">
          <div className="section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <h3 className="section-subtitle">Change Name</h3>
          </div>
          
          <form onSubmit={handleSaveName}>
            <div className="name-grid">
              <div className="form-field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={name.firstName}
                  placeholder="Enter your first name"
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={name.lastName}
                  placeholder="Enter your last name"
                  onChange={handleNameChange}
                  required
                />
              </div>
            </div>
            <div className="btn-container">
              <button type="submit" className="btn-save">SAVE CHANGES</button>
            </div>
          </form>
        </div>

        {/* 3. ADMIN SETTINGS SECTION */}
        <div className="profile-section">
          <div className="section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <h3 className="section-subtitle">Admin System Controls</h3>
          </div>

          {/* Dark / Light Theme */}
          <div className="setting-row">
            <div className="setting-left">
              <div className="icon-badge">
                {settings.darkMode ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                )}
              </div>
              <div className="setting-text-group">
                <div className="setting-title">{settings.darkMode ? 'Dark Theme' : 'Light Theme'}</div>
                <div className="setting-desc">Toggle administrative dashboard appearance</div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Two-Factor Authentication */}
          <div className="setting-row">
            <div className="setting-left">
              <div className="icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div className="setting-text-group">
                <div className="setting-title">Two-Factor Authentication (2FA)</div>
                <div className="setting-desc">Require verification code when logging into admin panel</div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* System Audit Logging */}
          <div className="setting-row">
            <div className="setting-left">
              <div className="icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div className="setting-text-group">
                <div className="setting-title">System Audit Logs</div>
                <div className="setting-desc">Record content modifications, logins, and project status updates</div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.auditLogs}
                onChange={() => handleToggle('auditLogs')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Automated Data Backups */}
          <div className="setting-row">
            <div className="setting-left">
              <div className="icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <div className="setting-text-group">
                <div className="setting-title">Daily Automated Database Backups</div>
                <div className="setting-desc">Auto-backup construction client requests and project data</div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={() => handleToggle('autoBackup')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Project & Estimate Alerts */}
          <div className="setting-row">
            <div className="setting-left">
              <div className="icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <div className="setting-text-group">
                <div className="setting-title">New Estimate Request Alerts</div>
                <div className="setting-desc">Get notified immediately when client submits a project inquiry</div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.estimateAlerts}
                onChange={() => handleToggle('estimateAlerts')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Email Notifications */}
          <div className="setting-row">
            <div className="setting-left">
              <div className="icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className="setting-text-group">
                <div className="setting-title">Email Notifications</div>
                <div className="setting-desc">Send automated admin digests to corporate TOC email address</div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

      </div>
      </div>

      <AdminFooter />
    </div>
  );
}