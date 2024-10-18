import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams(); // для получения токена из URL
  const token = searchParams.get('token'); // Получаем токен из URL
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      console.log(token);
      const response = await axios.post(
        `http://localhost:9000/password-reset?token=${token}`,
        { password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Ошибка сброса пароля');
      }
    } catch (err) {
      setError('Токен не валиден или истек');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5">Сброс пароля</Typography>
        <form onSubmit={handleResetPassword} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Новый пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Подтвердите новый пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">Пароль успешно изменен!</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Сбросить пароль
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;


