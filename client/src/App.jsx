import './App.css';
import 'react-bootstrap';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { LogoutLink } from './components/LogoutLink';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <LogoutLink />
      <Footer />
    </div>
  );
}

export default App;
