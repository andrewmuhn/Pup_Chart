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
          <h1>Pup Chart</h1>
          <PetCards />
          <div className="row mt-4">
            <div className="col text-center">
              <button
                className="btn btn-primary"
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
          <h1>Welcome to Pup Chart!</h1>
          <h2>
            Please <a href="/login">login</a> to view your pets. Or{' '}
            <a href="/signup">signup</a> and join our pack of proud
            pet parents!
          </h2>
          <div>
            <p>
              <img
                src="/images/logo-slogan.png"
                alt="logo"
                className="company-logo"
              />
            </p>
          </div>
        </>
      )}
    </>
  );
}
