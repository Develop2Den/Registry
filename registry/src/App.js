
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from "./components/NotFoundPage";
import CustomerPage from "./components/CustomerPage";
import { AuthProvider } from "./components/AuthProvider";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password-reset" element={<ResetPasswordPage />} />
        <Route path="/registrations" element={<RegisterPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;


