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
              <strong>Walks:</strong> {daycarePlan.walks || 'loading..'}
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
