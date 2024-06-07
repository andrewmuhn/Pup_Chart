import axios from 'axios';
import { useState, useEffect } from 'react';

export function Login() {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // User is already authenticated, redirect to another page
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());

    axios
      .post('http://localhost:8083/api/users/sessions', params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.jwt;
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('user', response.data.user);
        event.target.reset();
        window.location.href = '/'; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(['Invalid email or password']);
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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" required />
                </div>
                <button type="submit" className="my-btn btn-primary">Submit</button>
            </form>
        </div>    
    </div>
);
}
