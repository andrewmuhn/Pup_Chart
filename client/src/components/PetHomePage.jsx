import { useEffect, useState } from 'react';
import AddDaycarePlanModal from './AddDaycarePlanModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import calculateAge from '../utils/calculateAge';

export function PetHomePage() {
  const [show, setShow] = useState(false);
  const [pet, setPet] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  const fetchPetData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8083/api/pets/pet/${id}`);
      setPet(response.data[0]);
    } catch (error) {
      console.error('Error fetching pet:', error);
    }
  };

  useEffect(() => {
    fetchPetData(id);
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