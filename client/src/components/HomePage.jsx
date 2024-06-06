import axios from 'axios';
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
      <h1>Pup Chart</h1>
      {jwt && <PetCards />}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary" onClick={handleShow}>
            Add Pet
          </button>
        </div>
        <AddPetModal show={show} handleClose={handleClose} />
      </div>
    </>
  );
}
