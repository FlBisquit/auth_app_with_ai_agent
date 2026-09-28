import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <h1>Панель управления</h1>
      <p className="subtitle">Привет, {user?.username || 'пользователь'}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="card">
          <h3>Статистика сессии</h3>
          <p>Статус: Активен</p>
          <p>Последний вход: Сегодня</p>
        </div>
        <div className="card">
          <h3>Последние действия</h3>
          <ul>
            <li>Вход в систему</li>
            <li>Просмотр профиля</li>
            <li>Навигация по дашборду</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
