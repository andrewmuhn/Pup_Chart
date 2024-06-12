import { useState } from 'react';
import PetCards from './PetCards';
import AddPetModal from './AddPetModal';

export function HomePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const jwt = localStorage.getItem('jwt');
  return (
    <>
      {jwt ? (
        <>
          <PetCards />
          <div className="row mt-4">
            <div className="col text-center">
              <button
                className="btn btn-primary add-pet"
                onClick={handleShow}
              >
                Add Pet
              </button>
            </div>
            <AddPetModal show={show} handleClose={handleClose} />
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 className="h1-white">Welcome!</h1>
            <p>
              <img
                src="/images/logo-slogan.png"
                alt="logo"
                className="company-logo"
              />
            </p>
          </div>
          <h2
            style={{
              color: 'white',
            }}
          >
            <a className="home-link" href="/signup">
              Create an account
            </a>{' '}
            and join our pack of proud pet parents!
            <br /> Already a member?{' '}
            <a className="home-link" href="/login">
              Log in
            </a>{' '}
            to view your pets.
          </h2>
        </>
      )}
    </>
  );
}
