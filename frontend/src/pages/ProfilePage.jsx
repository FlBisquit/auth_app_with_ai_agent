import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="auth-container">Загрузка...</div>;
  if (!user) return <div className="auth-container"><div className="card">Ошибка при загрузке профиля</div></div>;

  return <ProfileContent user={user} logout={logout} />;
}

function ProfileContent({ user, logout }) {
  const navigate = useNavigate();
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await api.patch('auth/me/', {
        bio,
        avatar_url: avatarUrl,
      });
      
      setBio(response.data.bio || '');
      setAvatarUrl(response.data.avatar_url || '');
      setImgError(false);
      
      setMessage('Профиль успешно обновлен');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      if (error.response?.data) {
        const errors = error.response.data;
        const errorMsg = errors.bio || errors.avatar_url || 'Ошибка при сохранении профиля.';
        setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
      } else {
        setError('Ошибка при сохранении профиля. Попробуйте позже.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h1>Профиль</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {avatarUrl && !imgError ? (
            <img 
              src={avatarUrl} 
              alt={user.username} 
              onError={() => setImgError(true)} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bold' }}>
              {user.username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <div className="profile-label">Имя пользователя</div>
            <div className="profile-value">{user.username}</div>
          </div>
          <div className="profile-item">
            <div className="profile-label">Email</div>
            <div className="profile-value">{user.email}</div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>О себе (Bio)</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#334155', border: '1px solid #475569', borderRadius: '8px', color: 'white', boxSizing: 'border-box', minHeight: '80px' }}
            />
          </div>
          <div className="form-group">
            <label>URL аватара</label>
            <input 
              type="url" 
              value={avatarUrl} 
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          
          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </form>

        {message && <p style={{ color: '#4ADE80', textAlign: 'center', marginTop: '16px' }}>{message}</p>}
        {error && <p style={{ color: '#F87171', textAlign: 'center', marginTop: '16px' }}>{error}</p>}

        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #475569', marginTop: '10px' }}>Выйти</button>
      </div>
    </div>
  );
}
