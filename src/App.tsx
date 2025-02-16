import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/LoginForm';
import { Header } from './pages/Header'
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import GlobalSnackbar from './components/util/GlobalSnackBar';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/registration" element={<RegistrationPage/>}/>
      </Routes>
      <GlobalSnackbar/>
    </Router>

  );
}

export default App;
