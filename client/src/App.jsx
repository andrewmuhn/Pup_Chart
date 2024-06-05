import './App.css';
import 'react-bootstrap';
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { LogoutLink } from "./components/LogoutLink";

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
      <Signup /> 
      <Login />
      <LogoutLink />
    </div>
  )
}

export default App;
