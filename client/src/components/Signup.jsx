import { postNewUser } from '../utils/api/userCalls';

export function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());
    postNewUser(params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = 'http://localhost:3000/login'; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          console.log(error.response.data.errors);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div id="signup">
      <h1 className="h1-white">Signup</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" className="my-btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
