import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AuctionList from './components/AuctionList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuctionPage from './pages/AuctionPage';
import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center', marginTop: '30px', color: '#222' }}>
        System aukcyjny :D
        </h1>


        {token && <button onClick={handleLogout}>Wyloguj się</button>}

        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <AuctionList token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm onRegisterSuccess={() => window.location.href = '/login'} />} />
          <Route path="/auctions/:id" element={<AuctionPage />} />
        </Routes>

        {!token && (
          <p>
            Nie masz konta? <Link to="/register">Zarejestruj się</Link>
          </p>
        )}
      </div>
    </Router>
  );
}

export default App;
