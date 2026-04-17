import { useState } from 'react'
import './App.css'

const tabs = [
  { key: 'kaydedilenler', label: 'Kaydedilenler' },
  { key: 'favoriler', label: 'Favoriler' },
]

const settings = [
  { icon: '🖊️', label: 'Profil Düzenle' },
  { icon: '🔔', label: 'Bildirimler' },
  { icon: '🌐', label: 'Dil & Tema' },
  { icon: '📞', label: 'Destek' },
]

function App() {
  const [activeTab, setActiveTab] = useState('kaydedilenler')

  return (
    <div className="profile-outer">
      <div className="profile-card">
        {/* Profil Header */}
        <div className="profile-header-v2">
          <div className="profile-photo">
            <div className="photo-circle">
              <span className="photo-text">Profil<br />Fotoğrafı</span>
            </div>
          </div>
          <div className="profile-main-info">
            <h2>Ad Soyad</h2>
            <div className="profile-username">RouteMate@kullaniciadi</div>
            <div className="profile-location"> <span className="loc-icon">📍</span> Trabzon, Türkiye</div>
          </div>
        </div>
        {/* Sekmeler */}
        <div className="profile-tabs-v2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-v2${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Ayarlar */}
        <div className="settings-v2">
          <div className="settings-title">⚙️ Ayarlar</div>
          <ul className="settings-list">
            {settings.map((item) => (
              <li key={item.label}><span className="settings-icon">{item.icon}</span> {item.label}</li>
            ))}
            <li className="danger"><span className="settings-icon">🗑️</span> <span className="danger-text">Hesabı Sil</span></li>
          </ul>
        </div>
        <div className="tab-content">
          {/* No placeholder content for any tab */}
        </div>
      </div>
    </div>
  )
}

export default App 