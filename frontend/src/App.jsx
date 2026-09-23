import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import api from './api/axios';
import './App.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('auth/me/');
        setUser(response.data);
      } catch {
        setError('Ошибка при загрузке профиля');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  if (loading) return <div className="auth-container">Загрузка...</div>;
  if (error) return <div className="auth-container"><div className="card">{error}</div></div>;

  return (
    <div className="auth-container">
      <div className="card">
        <h1>Профиль</h1>
        <p className="subtitle">Информация о вашем аккаунте</p>
        
        <div className="profile-info">
          <div className="profile-item">
            <div className="profile-label">ID</div>
            <div className="profile-value">{user.id}</div>
          </div>
          <div className="profile-item">
            <div className="profile-label">Имя пользователя</div>
            <div className="profile-value">{user.username}</div>
          </div>
          <div className="profile-item">
            <div className="profile-label">Email</div>
            <div className="profile-value">{user.email}</div>
          </div>
        </div>

        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
