import { Link } from 'react-router-dom';

export function Header({ authenticated, onLogout }) {
  return (
    <header className="bg-light p-3 d-flex justify-content-between align-items-center position-relative">
      <img
        src={'/images/logo.png'}
        className="App-logo d-inline-block"
        alt="logo"
      />

      <h1
        className="d-inline-block"
        style={{
          fontWeight: 700,
          position: 'absolute',
          left: '8%',
        }}
      >
        Pup Chart
      </h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={'/images/home.png'}
              alt="logo"
              style={{ width: '70px' }}
            />
          </Link>
          {!authenticated && (
            <Link className="custom-button mx-2" to="/signup">
              Sign Up
            </Link>
          )}
          {!authenticated && (
            <Link className="custom-button mx-2" to="/login">
              Login
            </Link>
          )}
          {authenticated && (
            <Link
              className="custom-button mx-2"
              onClick={onLogout}
              to="#"
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
