import React, { useState, useEffect, useRef } from 'react';
import {Close, Minimize,Send} from '@mui/icons-material';
import './ChatWindow.css';

function ChatWindow({ chatInfo, isOpen, isMinimized, onClose, onToggleMinimize }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Mesaj listesinin sonuna gitmek için referans

  //chati en alta kaydırma fonksiyonu
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Mesajlar veya küçültme durumu değiştiğinde scroll'u ayarla
  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized]);


  // chatInfo değiştiğinde mesajları yükle
  useEffect(() => {
    if (chatInfo) {
      console.log(`Mesajlar yükleniyor: ${chatInfo.name} (${chatInfo.id})`);
      //Örnek API mesajları
      setMessages([
        { id: 'm1', sender: 'other', text: `Merhaba! (${chatInfo.name})` },
        { id: 'm2', sender: 'me', text: 'Selam!' },
        { id: 'm3', sender: 'other', text: 'Nasılsın?' },
        { id: 'm4', sender: 'me', text: 'İyiyim, sen nasılsın?' },
      ]);
    } else {
      setMessages([]);
    }
    setNewMessage('');
  }, [chatInfo]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatInfo) return;

    const msgToSend = { id: Date.now().toString(), sender: 'me', text: newMessage };
    setMessages(prevMessages => [...prevMessages, msgToSend]); // Önce state'i güncelle
    setNewMessage('');

    // api a gönderme örneği
    console.log(`Mesaj gönderiliyor: ${newMessage} -> ${chatInfo.name}`);
  };

  // Eğer pencere kapalıysa hiçbir şey renderlama
  if (!isOpen) {
    return null;
  }

  // Eğer küçültülmüşse, sadece isim çubuğunu render et
  if (isMinimized) {
    return (
      <div className="chat-minimized" onClick={onToggleMinimize} title="Sohbeti Aç">
        <span>{chatInfo ? chatInfo.name : 'Sohbet'}</span>
         <button className="chat-header-btn" onClick={(e) => {e.stopPropagation(); onClose();}} title="Kapat"><Close/></button> {/* Küçültülmüşken de kapatabilme */}
      </div>
    );
  }
  //tüm pencereyi renderla
  return (
    <div className="chat-window floating">
      <div className="chat-header">
        <h3>{chatInfo ? chatInfo.name : 'Sohbet'}</h3>
        <div className="chat-header-buttons">
          <button onClick={onToggleMinimize} className="chat-header-btn" title="Küçült">
            <Minimize/>
          </button>
          <button onClick={onClose} className="chat-header-btn" title="Kapat">
            <Close/>
          </button>
        </div>
      </div>
      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {/* Scroll'u en alta itmek için boş bir div */}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-input-area" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Bir mesaj yazın..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">
          <Send/>
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;