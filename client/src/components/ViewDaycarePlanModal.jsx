import { Modal, Button } from 'react-bootstrap';
import { useContext } from 'react';
import PetContext from '../contexts/PetContext';

export default function ViewDaycarePlanModal({
  show,
  handleClose,
  handleEdit,
  daycarePlan,
}) {
  const { pet } = useContext(PetContext);

  const mealLabels = {
    'morning': 'Morning',
    'mid-day': 'Mid-day',
    'evening': 'Evening',
    'breakfast-dinner': 'Breakfast & Dinner',
  };

  const walksLabels = {
    1: 'Every Hour',
    2: 'Every 2 Hours',
    4: 'Every 4 Hours',
    8: 'Every 8 Hours',
  };

  return (
    <>
      {daycarePlan && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Daycare Plan for {pet.name || 'loading..'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Food:</strong> {daycarePlan.food || 'loading..'}
            </p>
            <p>
              <strong>Meal Schedule:</strong> {mealLabels[daycarePlan.meal_schedule] || 'loading..'}
            </p>
            <p>
              <strong>Walks:</strong> {walksLabels[daycarePlan.walks] || 'loading..'}
            </p>
            <p>
              <strong>Cat Friendly:</strong> {daycarePlan.cat_friendly ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Dog Friendly:</strong> {daycarePlan.dog_friendly ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Kid Friendly:</strong> {daycarePlan.kid_friendly ? 'Yes' : 'No'}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => handleEdit(daycarePlan)}
            >
              Edit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
