import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const CustomerPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Вызываем функцию logout из контекста
      localStorage.removeItem("email");
      localStorage.removeItem("ID");
      navigate("/");
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <div style={{textAlign: "center"}}>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: 2, marginTop: 2, marginRight: 5}}>
        <Button variant="contained" color="primary" onClick={handleLogout} startIcon={<Logout/>}>
          Logout
        </Button>
      </Box>
      <h1>WTF?</h1>
    </div>

  );
}


export default CustomerPage;