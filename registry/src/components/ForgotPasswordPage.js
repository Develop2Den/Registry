
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import qs from 'qs';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(
        'http://localhost:9000/password-forgot',
        qs.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Ошибка отправки письма');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5">Забыли пароль?</Typography>
        <form onSubmit={handleForgotPassword} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">Письмо отправлено на вашу почту. Вы можете закрыть эту вкладку</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Отправить
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;

