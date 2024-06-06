import './App.css';
import 'react-bootstrap';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { HomePage } from './components/HomePage';
import { LogoutLink } from './components/LogoutLink';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <LogoutLink />
      <Footer />
    </div>
  );
}

export default App;
