import React, { useState, useEffect } from 'react';

const Account = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    fullName: '',
    role: 'admin',
    avatar: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Local storage'dan kullanıcı bilgilerini yükle
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(prev => ({
        ...prev,
        ...savedUser,
        password: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // Profil bilgilerini güncelle
    const updatedUser = {
      ...user,
      password: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setMessage({
      type: 'success',
      text: 'Profil bilgileri başarıyla güncellendi!'
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (user.newPassword !== user.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Yeni şifreler eşleşmiyor!'
      });
      return;
    }

    if (user.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Şifre en az 8 karakter olmalıdır!'
      });
      return;
    }

    // Şifreyi güncelle
    const updatedUser = {
      ...user,
      password: user.newPassword,
      newPassword: '',
      confirmPassword: ''
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setMessage({
      type: 'success',
      text: 'Şifre başarıyla güncellendi!'
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="section">
      <h1>
        <i className="fas fa-user"></i>
        Hesap Ayarları
      </h1>

      {message.text && (
        <div className={`notification ${message.type}`} style={{ marginBottom: '20px' }}>
          {message.text}
        </div>
      )}

      {/* Sekmeler */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            backgroundColor: activeTab === 'profile' ? '#3498db' : 'transparent',
            color: activeTab === 'profile' ? 'white' : '#2c3e50',
            border: 'none',
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-user-circle"></i>
          Profil
        </button>
        <button
          onClick={() => setActiveTab('security')}
          style={{
            backgroundColor: activeTab === 'security' ? '#3498db' : 'transparent',
            color: activeTab === 'security' ? 'white' : '#2c3e50',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-lock"></i>
          Güvenlik
        </button>
      </div>

      {/* Profil Sekmesi */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit}>
          <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
            {/* Avatar */}
            <div style={{ flex: '0 0 200px' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '15px',
                  overflow: 'hidden'
                }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <i className="fas fa-user" style={{ fontSize: '80px', color: '#ccc' }}></i>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ width: '100%' }}
              />
            </div>

            {/* Profil Bilgileri */}
            <div style={{ flex: 1 }}>
              <div className="form-group">
                <label htmlFor="username">Kullanıcı Adı</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Ad Soyad</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleInputChange}
                >
                  <option value="admin">Yönetici</option>
                  <option value="editor">Editör</option>
                  <option value="user">Kullanıcı</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit">
            <i className="fas fa-save"></i>
            Profili Güncelle
          </button>
        </form>
      )}

      {/* Güvenlik Sekmesi */}
      {activeTab === 'security' && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="password">Mevcut Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Yeni Şifre</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">
            <i className="fas fa-key"></i>
            Şifreyi Güncelle
          </button>
        </form>
      )}
    </div>
  );
};

export default Account; 