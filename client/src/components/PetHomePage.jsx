import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import AddDaycarePlanModal from './AddDaycarePlanModal';
import ViewDaycarePlanModal from './ViewDaycarePlanModal';
import PetContext from '../contexts/PetContext';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { fetchPetData } from '../utils/api/petCalls';
import { fetchDaycarePlanByPetId } from '../utils/api/daycareCalls';
import calculateAge from '../utils/calculateAge';

export function PetHomePage() {
  const [showAddDaycare, setShowAddDaycare] = useState(false);
  const [showViewDaycare, setShowViewDaycare] = useState(false);
  const { pet, setPet } = useContext(PetContext);
  const [daycarePlan, setDaycarePlan] = useState([]);
  const { name, profile_picture, breed, birthdate } = pet;
  const imageUrl = `${profile_picture}`;
  const age = calculateAge(birthdate);
  const formattedBirthdate = new Date(birthdate).toLocaleDateString();

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
  };

  const renderButton = () => {
    return daycarePlan ? (
      <button
        className="btn btn-primary"
        onClick={handleShowViewDaycare}
      >
        View Daycare Plan
      </button>
    ) : (
      <button
        className="btn btn-primary"
        onClick={handleShowAddDaycare}
      >
        Add Daycare Plan
      </button>
    );
  };

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
  }, [id, navigate, setPet]);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="card text-center">
            <h1 className="card-title">{name}</h1>
            <img
              src={imageUrl || 'loading..'}
              className="card-img-top"
              alt={name || 'loading..'}
            />
            <div className="card-body">
              <h3>{breed || 'loading..'}</h3>
              <p>Age: {age || 'loading..'}</p>
              <p>Birthdate: {formattedBirthdate || 'loading..'}</p>
              {renderButton()}
            </div>
          </div>
        </div>
        <AddDaycarePlanModal
          show={showAddDaycare}
          handleClose={handleCloseAddDaycare}
          daycarePlan={daycarePlan}
          handleShowViewDaycare={handleShowViewDaycare}
        />
        <ViewDaycarePlanModal
          show={showViewDaycare}
          handleClose={handleCloseViewDaycare}
          daycarePlan={daycarePlan}
          handleEdit={handleEdit}
        />
      </div>
    </>
  );
}
