import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info'
  });

  useEffect(() => {
    // Local storage'dan bildirimleri yükle
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const notification = {
      ...newNotification,
      id: Date.now(),
      date: new Date().toISOString(),
      read: false
    };

    const updatedNotifications = [notification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    // Formu sıfırla
    setNewNotification({
      title: '',
      message: '',
      type: 'info'
    });
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  return (
    <div className="section">
      <h1>
        <i className="fas fa-bell"></i>
        Bildirimler
      </h1>

      {/* Yeni Bildirim Formu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={newNotification.title}
            onChange={handleInputChange}
            placeholder="Bildirim Başlığı"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={newNotification.message}
            onChange={handleInputChange}
            placeholder="Bildirim Mesajı"
            required
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
        <div className="form-group">
          <select
            name="type"
            value={newNotification.type}
            onChange={handleInputChange}
          >
            <option value="info">Bilgi</option>
            <option value="success">Başarılı</option>
            <option value="error">Hata</option>
          </select>
        </div>
        <button type="submit">
          <i className="fas fa-plus"></i>
          Bildirim Ekle
        </button>
      </form>

      {/* Bildirim Listesi */}
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Henüz bildirim bulunmuyor.</p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification ${notification.type} ${notification.read ? 'read' : ''}`}
              style={{
                opacity: notification.read ? 0.7 : 1,
                marginBottom: '15px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{notification.title}</h3>
                  <p style={{ margin: '0' }}>{notification.message}</p>
                  <small style={{ color: 'rgba(255,255,255,0.8)' }}>
                    {new Date(notification.date).toLocaleString()}
                  </small>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid white',
                        padding: '5px 10px'
                      }}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid white',
                      padding: '5px 10px'
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications; 