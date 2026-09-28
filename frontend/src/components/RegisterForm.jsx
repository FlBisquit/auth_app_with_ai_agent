import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation/authSchemas';
import api from '../api/axios';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setMessage('');
    setIsLoading(true);
    try {
      await api.post('auth/register/', data);
      setMessage('Регистрация прошла успешно!');
      reset();
    } catch {
      setMessage('Ошибка при регистрации. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h1>Создание аккаунта</h1>
        <p className="subtitle">Зарегистрируйтесь, чтобы продолжить</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Имя пользователя</label>
            <input type="text" {...register('username')} />
            {errors.username && <p className="error-text">{errors.username.message}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register('email')} />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" {...register('password')} />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isLoading || !isValid}>
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
        
        <div className="message">
          Уже есть аккаунт? <Link to="/login" className="link">Войти</Link>
        </div>
      </div>
    </div>
  );
}
