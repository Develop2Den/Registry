
import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import qs from 'qs';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Sending request:', { email, password, rememberMe });
      const response = await axios.post(
        'http://localhost:9000/login',
        qs.stringify({ username: email, password, 'remember-me': rememberMe }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const id = response.data.id;
        localStorage.setItem("email", email);
        localStorage.setItem("ID", id);
        navigate('/customer');
      } else {
        setError('Ошибка авторизации');
      }
    } catch (err) {
      setError('Ошибка ввода данных на сервере!');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/customer');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5">Войти</Typography>
        <form onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Запомнить меня"
          />
          {error && <Typography color="error">{error}</Typography>}

          <Link to="/forgot-password" style={{ display: 'block', marginTop: '10px' }}>
            Забыли пароль?
          </Link>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Войти
          </Button>

          {/* Кнопка входа через Google */}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            style={{ marginTop: 16, backgroundColor: '#db4437' }} // Цвет Google
            onClick={() => {
              window.location.href = 'http://localhost:9000/oauth2/authorization/google'; // ссылка для Google авторизации
            }}
          >
            Войти через Google
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;

