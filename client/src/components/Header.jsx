import { Link } from 'react-router-dom';

export function Header({ authenticated, onLogout }) {
  return (
    <header
      style={{ fontFamily: 'Georgia' }}
      className="bg-light p-3 d-flex justify-content-between align-items-center"
    >
      <img
        src={'/images/logo.png'}
        className="App-logo d-inline-block"
        alt="logo"
        style={{ width: '50px', height: '50px' }}
      />

      <h1 className="h4 d-inline-block" style={{ fontWeight: 700 }}>
        Unleash the Knowledge, Fetch the Best Care
      </h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          {!authenticated && (
            <Link className="btn btn-primary mx-2" to="/signup">
              Signup
            </Link>
          )}
          {!authenticated && (
            <Link className="btn btn-success mx-2" to="/login">
              Login
            </Link>
          )}
          {authenticated && (
            <Link
              className="btn btn-danger mx-2"
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
