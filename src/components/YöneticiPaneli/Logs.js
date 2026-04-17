import React, { useState, useEffect } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({
    type: 'all',
    dateRange: 'all',
    search: ''
  });

  useEffect(() => {
    // Local storage'dan logları yükle
    const savedLogs = JSON.parse(localStorage.getItem('logs')) || [];
    setLogs(savedLogs);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFilteredLogs = () => {
    return logs.filter(log => {
      // Tip filtresi
      if (filter.type !== 'all' && log.type !== filter.type) {
        return false;
      }

      // Tarih filtresi
      const logDate = new Date(log.timestamp);
      const now = new Date();
      if (filter.dateRange !== 'all') {
        const days = parseInt(filter.dateRange);
        const diffTime = Math.abs(now - logDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > days) {
          return false;
        }
      }

      // Arama filtresi
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          log.message.toLowerCase().includes(searchLower) ||
          log.user.toLowerCase().includes(searchLower) ||
          log.ip.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  };

  const clearLogs = () => {
    if (window.confirm('Tüm loglar silinecek. Emin misiniz?')) {
      setLogs([]);
      localStorage.setItem('logs', JSON.stringify([]));
    }
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'error':
        return '#e74c3c';
      case 'warning':
        return '#f1c40f';
      case 'success':
        return '#2ecc71';
      default:
        return '#3498db';
    }
  };

  return (
    <div className="section">
      <h1>
        <i className="fas fa-history"></i>
        Sistem Logları
      </h1>

      {/* Filtreler */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
          <select
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
          >
            <option value="all">Tüm Loglar</option>
            <option value="info">Bilgi</option>
            <option value="warning">Uyarı</option>
            <option value="error">Hata</option>
            <option value="success">Başarılı</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
          <select
            name="dateRange"
            value={filter.dateRange}
            onChange={handleFilterChange}
          >
            <option value="all">Tüm Zamanlar</option>
            <option value="1">Son 24 Saat</option>
            <option value="7">Son 7 Gün</option>
            <option value="30">Son 30 Gün</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 2, minWidth: '300px' }}>
          <input
            type="text"
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
            placeholder="Log ara..."
          />
        </div>

        <button
          onClick={clearLogs}
          style={{ backgroundColor: '#e74c3c' }}
        >
          <i className="fas fa-trash"></i>
          Logları Temizle
        </button>
      </div>

      {/* Log Tablosu */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Tarih</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Tip</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Kullanıcı</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>IP Adresi</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Mesaj</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredLogs().length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  Log bulunamadı
                </td>
              </tr>
            ) : (
              getFilteredLogs().map((log, index) => (
                <tr
                  key={log.id}
                  style={{
                    borderBottom: '1px solid #eee',
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: getLogTypeColor(log.type),
                        color: 'white',
                        fontSize: '12px'
                      }}
                    >
                      {log.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{log.user}</td>
                  <td style={{ padding: '12px' }}>{log.ip}</td>
                  <td style={{ padding: '12px' }}>{log.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs; 