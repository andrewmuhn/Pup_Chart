import { useEffect, useState } from 'react';
import AddDaycarePlanModal from './AddDaycarePlanModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function PetHomePage() {
  const [show, setShow] = useState(false);
  const [pet, setPet] = useState();
  console.log(pet);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

useEffect(() => {
  axios
    .get(`http://localhost:8083/api/pets/pet/${id}`)
    .then((response) => {
      console.log(response);
      setPet(response.data[0])
    })
    .catch((error) => {
      console.error('Error fetching pet:', error);
    });
}, [])

  return (
    <>
      <h1>{pet.name}</h1>
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary" onClick={handleShow}>
            Add Daycare Plan
          </button>
        </div>
        <AddDaycarePlanModal show={show} handleClose={handleClose} />
      </div>
    </>
  );
}