import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

export function Header({ authenticated, onLogout }) {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {!authenticated && <Link to="/signup">Signup</Link>}
        {!authenticated && <Link to="/login">Login</Link>}
        {authenticated && <Link onClick={onLogout}>Logout</Link>}
      </nav>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  );
}


