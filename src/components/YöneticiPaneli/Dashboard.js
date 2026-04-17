import React, { useState, useEffect } from 'react';
import { FaUsers, FaSignInAlt, FaBell, FaUtensils, FaChartLine } from 'react-icons/fa';

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    recentLogins: 0,
    notifications: 0,
    activeRestaurants: 0
  });

  useEffect(() => {
    // Gerçek uygulamada bu veriler API'den gelecek
    setStats({
      users: 120,
      recentLogins: 5,
      notifications: 2,
      activeRestaurants: 15
    });
  }, []);

  const cards = [
    {
      id: 'users',
      title: 'Kullanıcı Sayısı',
      value: stats.users,
      icon: <FaUsers />
    },
    {
      id: 'logins',
      title: 'Son Girişler',
      value: stats.recentLogins,
      icon: <FaSignInAlt />
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      value: stats.notifications,
      icon: <FaBell />
    },
    {
      id: 'restaurants',
      title: 'Aktif Restoranlar',
      value: stats.activeRestaurants,
      icon: <FaUtensils />
    }
  ];

  return (
    <div className="section">
      <h1>
        <FaChartLine /> Kontrol Paneli
      </h1>
      <div className="cards">
        {cards.map(card => (
          <div key={card.id} className="card">
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard; 