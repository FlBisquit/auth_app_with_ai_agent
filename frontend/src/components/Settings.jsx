import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="card animate-slide-in">
      <h1>Настройки</h1>
      <div className="profile-info">
        <div className="profile-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Уведомления</span>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
            style={{ width: 'auto' }}
          />
        </div>
        <div className="profile-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Темная тема</span>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
            style={{ width: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
