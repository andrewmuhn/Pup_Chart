import axios from 'axios';
import { useState } from 'react';

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());

    console.log(params, 'form data');
    axios
      .post('http://localhost:8083/api/users', params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = 'http://localhost:3000'; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          console.log(error.response.data.errors);
          setErrors(error.response.data.errors);
        } else {
          console.log(error);
          setErrors(['An error occurred. Please try again.']);
        }
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {/* {errors.map((error) => (
          <li key={error}>{error}</li>
        ))} */}
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
