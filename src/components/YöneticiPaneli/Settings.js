import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    emailNotifications: true,
    darkMode: false,
    language: 'tr',
    timezone: 'Europe/Istanbul',
    maintenanceMode: false
  });

  useEffect(() => {
    // Local storage'dan ayarları yükle
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('settings', JSON.stringify(settings));
    alert('Ayarlar başarıyla kaydedildi!');
  };

  return (
    <div className="section">
      <h1>
        <i className="fas fa-cog"></i>
        Ayarlar
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Genel Ayarlar */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Genel Ayarlar</h2>
          
          <div className="form-group">
            <label htmlFor="siteName">RouteMate</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
              placeholder="Site adını girin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="siteDescription">Site Açıklaması</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleInputChange}
              placeholder="Site açıklamasını girin"
              style={{
                width: '100%',
                padding: '12px',
                margin: '10px 0',
                border: '1px solid #ddd',
                borderRadius: '5px',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Bildirim Ayarları</h2>
          
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleInputChange}
            />
            <label htmlFor="emailNotifications">E-posta Bildirimleri</label>
          </div>
        </div>

        {/* Görünüm Ayarları */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Görünüm Ayarları</h2>
          
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleInputChange}
            />
            <label htmlFor="darkMode">Karanlık Mod</label>
          </div>
        </div>

        {/* Dil ve Saat Dilimi */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Dil ve Saat Dilimi</h2>
          
          <div className="form-group">
            <label htmlFor="language">Dil</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timezone">Saat Dilimi</label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleInputChange}
            >
              <option value="Europe/Istanbul">İstanbul (UTC+3)</option>
              <option value="Europe/London">Londra (UTC+0)</option>
              <option value="America/New_York">New York (UTC-5)</option>
              <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
            </select>
          </div>
        </div>

        {/* Bakım Modu */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Sistem</h2>
          
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleInputChange}
            />
            <label htmlFor="maintenanceMode">Bakım Modu</label>
          </div>
        </div>

        <button type="submit">
          <i className="fas fa-save"></i>
          Ayarları Kaydet
        </button>
      </form>
    </div>
  );
};

export default Settings; 