// src/components/TopBar/TopBar.js
import React, { useState } from 'react';
import {People ,Search, FilterList, Favorite, Person } from '@mui/icons-material';
import './TopBar.css';

function TopBar({currentUser,onToggleSidebar}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="top-bar">
      <div className="menu-buttons">
        <button className="Sidebar-button" onClick={onToggleSidebar}>
          <People />
        </button>
        <button className="profile-button">
          <Person/>
          <span className="username">{currentUser.username}</span>
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Konumlarda ara..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {/*şimdilik search buton ile serach ontainerin komut bağantısı yok*/}
        <button className='search-button'>
          <Search/>
        </button>
      </div>
      <div className="top-bar-actions">
        <button className="filter-button">
          <FilterList />
        </button>
        <button className="favorites-button">
          <Favorite />
        </button>
      </div>
    </div>
  );
}

export default TopBar;