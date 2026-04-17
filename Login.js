import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin(username, password);
    } else {
      setError('Hatalı kullanıcı adı veya şifre!');
    }
  };

  return (
    <div className="login-form">
      <h2>Yönetici Girişi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login; 