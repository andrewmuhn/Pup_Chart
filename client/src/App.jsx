import './App.css';
import 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
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
    localStorage.removeItem("jwt"); // Remove JWT token from local storage on logout
  };

  return (
    <div>
      <Header authenticated={authenticated} onLogout={handleLogout} />
      <Content />
      <Routes>
        {!authenticated && (
          <Route
            path="/signup"
            element={<Signup />}
          />
        )}
        {!authenticated && (
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
