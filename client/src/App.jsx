import 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { HomePage } from './components/HomePage';
import { PetHomePage } from './components/PetHomePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PetProvider } from './contexts/PetContext';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    navigate('/'); // Redirect to the home page after login
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('jwt'); // Remove JWT token from local storage on logout
  };
  return (
    <div
      className="background"
      style={{ backgroundImage: `url('/images/dogbackground.jpg')` }}
    >
      <div className="overlay">
        <Header
          authenticated={authenticated}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!authenticated && (
            <Route path="/signup" element={<Signup />} />
          )}
          {!authenticated && (
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
          )}
          {authenticated && (
            <Route
              path="/pets/:id"
              element={
                <PetProvider>
                  <PetHomePage />
                </PetProvider>
              }
            />
          )}
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
