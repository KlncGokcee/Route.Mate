import React from 'react';
import { FaUserShield, FaChartLine, FaUtensils, FaBell, FaCog, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ currentSection, onSectionChange, onLogout }) {
  const menuItems = [
    { id: 'dashboard', icon: <FaChartLine />, text: 'Kontrol Paneli' },
    { id: 'restaurants', icon: <FaUtensils />, text: 'Restoran Yönetimi' },
    { id: 'notifications', icon: <FaBell />, text: 'Bildirimler' },
    { id: 'settings', icon: <FaCog />, text: 'Ayarlar' },
    { id: 'logs', icon: <FaHistory />, text: 'Kayıtlar' },
    { id: 'account', icon: <FaUser />, text: 'Hesap' }
  ];

  return (
    <div className="sidebar">
      <h2>
        <FaUserShield /> Yönetici Paneli
      </h2>
      <ul>
        {menuItems.map(item => (
          <li
            key={item.id}
            className={currentSection === item.id ? 'active' : ''}
            onClick={() => onSectionChange(item.id)}
          >
            {item.icon} {item.text}
          </li>
        ))}
        <li onClick={onLogout}>
          <FaSignOutAlt /> Çıkış Yap
        </li>
      </ul>
    </div>
  );
}

export default Sidebar; 