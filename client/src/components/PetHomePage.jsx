import { useEffect, useState, useRef } from 'react';
import AddDaycarePlanModal from './AddDaycarePlanModal';
import ViewDaycarePlanModal from './ViewDaycarePlanModal';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchPetData } from '../utils/api/petCalls';
import { fetchDaycarePlanByPetId } from '../utils/api/daycareCalls';
import calculateAge from '../utils/calculateAge';

export function PetHomePage() {
  const [showAddDaycare, setShowAddDaycare] = useState(false);
  const [showViewDaycare, setShowViewDaycare] = useState(false);
  const [pet, setPet] = useState([]);
  const [daycarePlan, setDaycarePlan] = useState([]);
  
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const openModalRef = useRef();

  const handleCloseAddDaycare = () => setShowAddDaycare(false);
  const handleShowAddDaycare = () => setShowAddDaycare(true);
  const handleCloseViewDaycare = () => setShowViewDaycare(false);
  const handleShowViewDaycare = () => setShowViewDaycare(true);
  const handleEdit = () => {
    handleCloseViewDaycare();
    handleShowAddDaycare();
  }

  useEffect(() => {
    openModalRef.current = location.state?.openModal;
  }, [location.state?.openModal]);

  useEffect(() => {
    const fetchData = async () => {
      const petResponse = await fetchPetData(id);
      setPet(petResponse.data[0]);
  
      const daycarePlanResponse = await fetchDaycarePlanByPetId(id);
      setDaycarePlan(daycarePlanResponse.data[0]);
  
      if (openModalRef.current) {
        handleShowViewDaycare();
        navigate(window.location.pathname, { replace: true });
      }
    };
  
    fetchData();
  }, [id, navigate]);

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
          handleShowViewDaycare={handleShowViewDaycare}
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
