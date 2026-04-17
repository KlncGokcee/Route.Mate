import React, { useState, useEffect } from 'react';
import { FaUtensils, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    // Gerçek uygulamada bu veriler API'den gelecek
    const savedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurants(savedRestaurants);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const addRestaurant = () => {
    if (newRestaurant.trim() === '') {
      showNotification('Restoran adı boş olamaz!', 'error');
      return;
    }

    const updatedRestaurants = [...restaurants, { id: Date.now(), name: newRestaurant }];
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    setNewRestaurant('');
    showNotification('Restoran başarıyla eklendi!');
  };

  const editRestaurant = (id) => {
    const restaurant = restaurants.find(r => r.id === id);
    const newName = prompt('Yeni restoran adı:', restaurant.name);
    
    if (newName && newName.trim() !== '') {
      const updatedRestaurants = restaurants.map(r =>
        r.id === id ? { ...r, name: newName } : r
      );
      setRestaurants(updatedRestaurants);
      localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
      showNotification('Restoran güncellendi!');
    }
  };

  const deleteRestaurant = (id) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (window.confirm(`${restaurant.name} restoranını silmek istediğinizden emin misiniz?`)) {
      const updatedRestaurants = restaurants.filter(r => r.id !== id);
      setRestaurants(updatedRestaurants);
      localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
      showNotification('Restoran silindi!');
    }
  };

  return (
    <div className="section">
      <h1>
        <FaUtensils /> Restoran Yönetimi
      </h1>
      
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="restaurant-form">
        <input
          type="text"
          value={newRestaurant}
          onChange={(e) => setNewRestaurant(e.target.value)}
          placeholder="Restoran adı girin"
        />
        <button onClick={addRestaurant}>
          <FaPlus /> Ekle
        </button>
      </div>

      <ul className="restaurant-list">
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <span>{restaurant.name}</span>
            <div className="restaurant-actions">
              <button onClick={() => editRestaurant(restaurant.id)}>
                <FaEdit /> Düzenle
              </button>
              <button onClick={() => deleteRestaurant(restaurant.id)}>
                <FaTrash /> Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantManagement; 