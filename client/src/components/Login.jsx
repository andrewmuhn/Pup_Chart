import axios from "axios";
import { useState, useEffect } from "react";

export function Login() {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // User is already authenticated, redirect to another page
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());

    axios
      .post("http://localhost:8083/api/users/sessions", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(["Invalid email or password"]);
        }
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" required />
        </div>
        <div>
          Password: <input name="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
