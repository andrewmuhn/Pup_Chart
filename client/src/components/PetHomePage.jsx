import { useEffect, useState } from 'react';
import AddDaycarePlanModal from './AddDaycarePlanModal';
import ViewDaycarePlanModal from './ViewDaycarePlanModal';
import { useParams } from 'react-router-dom';
import { fetchPetData } from '../utils/api/petCalls';
import { fetchDaycarePlanByPetId } from '../utils/api/daycareCalls';
import calculateAge from '../utils/calculateAge';

export function PetHomePage() {
  const [showAddDaycare, setShowAddDaycare] = useState(false);
  const [showViewDaycare, setShowViewDaycare] = useState(false);
  const [pet, setPet] = useState([]);
  const [daycarePlan, setDaycarePlan] = useState([]);
  const { id } = useParams();
  const handleCloseAddDaycare = () => setShowAddDaycare(false);
  const handleShowAddDaycare = () => setShowAddDaycare(true);
  const handleCloseViewDaycare = () => setShowViewDaycare(false);
  const handleShowViewDaycare = () => setShowViewDaycare(true);

  const handleEdit = () => {
    handleCloseViewDaycare();
    handleShowAddDaycare();
    console.log('Edit');
  }

  useEffect(() => {
    fetchPetData(id)
    .then((response) => {
      setPet(response.data[0]);
    });
    fetchDaycarePlanByPetId(id)
    .then((response) => {
      console.log(response.data[0]);
      setDaycarePlan(response.data[0]);
    });
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
          <p>
            Birthdate: {new Date(pet.birthdate).toLocaleDateString()}
          </p>
          {daycarePlan ? (
            <button className="btn btn-primary" onClick={handleShowViewDaycare}>View Daycare Plan</button>
          ) : (
          <button className="btn btn-primary" onClick={handleShowAddDaycare}>
            Add Daycare Plan
          </button>
          )}
        </div>
        <AddDaycarePlanModal
          show={showAddDaycare}
          handleClose={handleCloseAddDaycare}
          pet={pet}
          daycarePlan={daycarePlan}
        />
        <ViewDaycarePlanModal
          show={showViewDaycare}
          handleClose={handleCloseViewDaycare}
          pet={pet}
          daycarePlan={daycarePlan}
          handleEdit={handleEdit}
        />
      </div>
    </>
  );
}
