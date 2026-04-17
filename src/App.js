
import React, { useState } from 'react';
import MainContent from './components/HomePage/MainContent/MainContent';
import ChatWindow from './components/HomePage/ChatWindow/ChatWindow';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar açık mı
  const [selectedChat, setSelectedChat] = useState(null); // Hangi sohbetin seçili olduğu
  const [isChatOpen, setIsChatOpen] = useState(false); // chat açık mı
  const [isChatMinimized, setIsChatMinimized] = useState(false); // Sohbet penceresi minimized mı

  // chat Örnek kişiler
  const friends = [
    { id: 'f1', name: 'Emre CAMUZOĞLU' },
    { id: 'f2', name: 'Buğra Kaya' },
    { id: 'f3', name: 'Selim KIRIM' },
  ];
  const groups = [
    { id: 'g1', name: 'Proje Ekibi' },
    { id: 'g2', name: 'Aile Grubu' },
  ];
  //kullanıcı adı
  const currentUser = {
    username: 'Kullanıcı Adınız',
  };
  //sidebarı aç / kapa
 const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }
  // Sidebardan sohbet seçilince
  const handleSelectChat = (chatInfo) => {
    console.log('Seçilen Sohbet:', chatInfo);
    setSelectedChat(chatInfo); // Hangi sohbetin aktif ayarla
    setIsChatOpen(true); // Pencereyi aç
    setIsChatMinimized(false); // Açıldığında küçültülmüş olmasın
  };

  // Chati kapat
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedChat(null); // Seçili chati sıfırla
  };

  // Chat penceresini küçült/büyüt
  const handleToggleMinimizeChat = () => {
    //chat açıksa küçült
    if (isChatOpen) {
       setIsChatMinimized(!isChatMinimized);
    }
  };


  return (
    <div className="app-container">
      <MainContent 
        currentUser={currentUser}
        friends={friends}
        groups={groups}
        onSelectChat={handleSelectChat}
        onToggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen}
      />
      <ChatWindow
        chatInfo={selectedChat}
        isOpen={isChatOpen}
        isMinimized={isChatMinimized}
        onClose={handleCloseChat}
        onToggleMinimize={handleToggleMinimizeChat}
      />
    </div>
  );
}

export default App;