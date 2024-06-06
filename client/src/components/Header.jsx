import logo from '../images/logo.png';

export function Header() {
  return (
    <header>
      <nav>
        <a href="/">Home</a> | <a href="/signup">Signup</a> |
        <a href="/login">Login</a>
      </nav>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </header>
  );
}
