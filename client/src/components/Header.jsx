import logo from '../logo.svg';

export function Header() {
    return (
      <header>
        <nav>
          <a href="#">Home</a> | <a href="#">Link</a>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    )
  }