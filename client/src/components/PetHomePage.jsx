import { useEffect, useState } from 'react';
import AddDaycarePlanModal from './AddDaycarePlanModal';
import { useParams } from 'react-router-dom';
import { fetchPetData } from '../utils/api/petCalls';
import calculateAge from '../utils/calculateAge';

export function PetHomePage() {
  const [show, setShow] = useState(false);
  const [pet, setPet] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  useEffect(() => {
    fetchPetData(id)
    .then(response => {
      setPet(response.data[0]);
    })

  }, [id]);

  return (
    <>
      <h1>{pet.name}</h1>
      <div className="row mt-4">
        <div className="col text-center">
          <img
                  src={'/images/' + pet.profile_picture}
                  className="card-img-top"
                  alt={pet.name}
                />
          <h3>{pet.breed}</h3>
          <p>Age: {calculateAge(pet.birthdate)}</p>
          <p>Birthdate: {new Date(pet.birthdate).toLocaleDateString()}</p>
          <button className="btn btn-primary" onClick={handleShow}>
            Add Daycare Plan
          </button>
        </div>
        <AddDaycarePlanModal show={show} handleClose={handleClose} pet={pet}/>
      </div>
    </>
  );
}