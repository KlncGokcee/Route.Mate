import React from 'react';
import {PersonAdd ,Notifications } from '@mui/icons-material';
import './Sidebar.css';

function Sidebar({ friends, groups, onSelectChat }) {
  return (
    <div className="sidebar">
      <div className="friend-buttons">
        <h2>Arkadaşlar</h2>
        <button className="addfriend-button" title="Arkadaş Ekle">
          <PersonAdd />
        </button>
        <button className="notification-button" title="Arkadaşlık İstekleri">
          <Notifications />
        </button>
      </div>
      <div className="list-section">
        <ul className="friend-list">
          {friends.map(friend => (
            <li key={friend.id} onClick={() => onSelectChat({ type: 'friend', ...friend })}>
              {/* Profil resmi eklenebilir */}
              {friend.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Grup Listesi */}
      <div className="list-section">
        <h2>Gruplar</h2>
        <ul className="group-list">
          {groups.map(group => (
            <li key={group.id} onClick={() => onSelectChat({ type: 'group', ...group })}>
              {/* Grup ikonu eklenebilir */}
              {group.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;