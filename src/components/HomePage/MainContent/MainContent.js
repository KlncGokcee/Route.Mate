import React from 'react';
import TopBar from '../TopBar/TopBar';
import Sidebar from '../Sidebar/Sidebar';
import Dante from '../../../assets/Dante.svg';
import './MainContent.css';

function MainContent({ currentUser ,isOpen, onToggleSidebar ,friends, groups, onSelectChat }) {
  //sidebar açık mı
  if (!isOpen) {
    return(
      <div className="main-content">
      <TopBar 
        currentUser={currentUser}
        onToggleSidebar={onToggleSidebar}
      />
      <div className="main-content-area">
        <div className="image">
          <img src={Dante} alt="Dante" width="100" height="100"/>
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className="main-content">
      <TopBar 
        currentUser={currentUser}
        onToggleSidebar={onToggleSidebar}
      />
      <div className="smain-content-area">
        <Sidebar
          friends={friends}
          groups={groups}
          onSelectChat={onSelectChat}
          currentUser={currentUser}
          />
        <div className="image">
          <img src={Dante} alt="Dante" width="100" height="100"/>
        </div>
      </div>
    </div>
  );
}

export default MainContent;