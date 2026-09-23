import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/authSchemas';
import api from '../api/axios';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMessage('');
    try {
      const response = await api.post('auth/login/', data);

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      navigate('/profile');
    } catch {
      setMessage('Ошибка авторизации. Проверьте имя пользователя и пароль.');
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h1>Вход</h1>
        <p className="subtitle">Войдите в свой аккаунт</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Имя пользователя</label>
            <input type="text" {...register('username')} />
            {errors.username && <p className="error-text">{errors.username.message}</p>}
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" {...register('password')} />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>
          <button type="submit">Войти</button>
        </form>

        {message && <p className="message">{message}</p>}
        
        <div className="message">
          Нет аккаунта? <Link to="/register" className="link">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
