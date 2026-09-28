export default function About() {
  return (
    <div className="card animate-slide-in">
      <h1>О проекте</h1>
      <p className="subtitle">Версия 1.0.0</p>
      <p>Это приложение представляет собой систему управления пользователями с защищенными маршрутами.</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Назначение</h3>
        <p>Демонстрация работы React Router, контекста авторизации и структуры макета приложения.</p>
      </div>
    </div>
  );
}
