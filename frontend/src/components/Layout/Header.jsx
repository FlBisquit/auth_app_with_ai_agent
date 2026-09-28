import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

  return (
    <header className="header">
      <div className="user-info" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
        <div className="avatar">{getInitials(user?.username)}</div>
        <span className="email">{user?.email || user?.username}</span>
      </div>
      <button className="logout-btn" onClick={logout}>Выйти</button>
    </header>
  );
}
