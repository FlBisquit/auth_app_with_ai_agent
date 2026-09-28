import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Settings from './components/Settings';
import './App.css';

function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="auth-container">Загрузка...</div>;
  if (!user) return <div className="auth-container"><div className="card">Ошибка при загрузке профиля</div></div>;

  return (
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
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
